import React, {
  useState,
  useEffect,
  useCallback,
} from 'react'
import { createContext } from 'react'

import axios from '../lib/axios'

import AppFeedsModel from '../model/AppFeedsModel'
import AppDetailResponseModel from '../model/AppDetailResponseModel'

import useDebounce from '../hooks/useDebounce'

const DataStoreContext = createContext({})

const fetchAppRecom = async ({ limit = 10 } = {}) => {
  const response = await axios.get(`https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/${limit}/explicit.json`)

  // VALIDATE SCHEMA FROM API
  const appFeedsModel = AppFeedsModel.of(response.data)
  appFeedsModel.validate()

  return appFeedsModel.data.feed.results || []
}

const fetchAppListing = async ({ limit = 10 } = {}) => {
  const response = await axios.get(`https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/${limit}/explicit.json`)

  // VALIDATE SCHEMA FROM API
  const appFeedsModel = AppFeedsModel.of(response.data)
  appFeedsModel.validate()

  return appFeedsModel.data.feed.results || []
}

export const fetchAppDetail = async ({ ids = [] } = {}) => {
  const response = await axios.get(`https://itunes.apple.com/hk/lookup?id=${ids.join(',')}`)

  // VALIDATE SCHEMA FROM API
  const appDetailResponseModel = AppDetailResponseModel.of(response.data)
  appDetailResponseModel.validate()

  return appDetailResponseModel.data.results || []
}

export const DataStoreContextProvider = props => {
  const [ searchText, setSearchText ] = useState()

  // APP RECOMMENDATION
  const [ appRecom, setAppRecom ] = useState([])
  const [ appRecomFiltered, setAppRecomFiltered ] = useState(appRecom)
  const [ isFetchingAppRecom, setIsFetchingAppRecom ] = useState(false)

  // APP LISTING
  const [ appListing, setAppListing ] = useState([])
  const [ appListingFiltered, setAppListingFiltered ] = useState(appListing)
  const [ appIdsToFetchDetail, setAppIdsToFetchDetail ] = useState([])
  const [ isFetchingAppListing, setIsFetchingAppListing ] = useState(false)

  // APP DETAIL
  const [ appDetails, setAppDetails ] = useState(new Map())

  // METHODS
  const updateAppRecom = useCallback(async payload => {
    setIsFetchingAppRecom(true)
    const _appRcom = await fetchAppRecom(payload)

    setAppRecom(_appRcom)
    setIsFetchingAppRecom(false)
  }, [])

  const updateAppListing = useCallback(async payload => {
    setIsFetchingAppListing(true)
    const _appListing = await fetchAppListing(payload)
    const appIds = _appListing.map(({ id }) => id)

    setAppIdsToFetchDetail(appIds)

    setAppListing(_appListing)
    setIsFetchingAppListing(false)
  }, [])

  // AUTO FETCH APP DETAIL ON FETCHING NEW APP LISTING
  useEffect(() => {
    (async () => {
      if (appIdsToFetchDetail.length > 0) {
        const _appDetails = await fetchAppDetail({ ids: appIdsToFetchDetail })
        setAppDetails(new Map([
          ..._appDetails.map(_appDetail => ([ `${_appDetail.trackId}`, _appDetail ]))
        ]))
      }
    })()
  }, [ appIdsToFetchDetail ])

  // SIDE EFFECT + DEBOUNCING 300 MILLISECOND TO PERFORM TEXT SEARCH FILTERING
  const debouncedSearchText = useDebounce(searchText, 300)

  useEffect(() => {
    const _searchText = (debouncedSearchText || '').toLowerCase()

    // RESET FILTERING
    if (_searchText === '') {
      setAppListingFiltered(appListing)
      setAppRecomFiltered(appRecom)
      return
    }

    // FILTER appListing
    if (appListing) {
      setAppListingFiltered(appListing.filter(appFeed => {
        const appDetail = appDetails.get(appFeed.id)

        return [
          (appFeed.name || '').toLowerCase().includes(_searchText),
          (appFeed.artistName || '').toLowerCase().includes(_searchText),
          appFeed.genres && appFeed.genres.some(genre => (genre.name || '').toLowerCase().includes(_searchText)),
          appDetail && (appDetail.description || '').toLowerCase().includes(_searchText),
        ].some(cond => cond)
      }))
    }

    // FILTER appRecom
    if (appRecom) {
      setAppRecomFiltered(appRecom.filter(appFeed => {
        const appDetail = appDetails.get(appFeed.id)

        return [
          (appFeed.name || '').toLowerCase().includes(_searchText),
          (appFeed.artistName || '').toLowerCase().includes(_searchText),
          appFeed.genres && appFeed.genres.some(genre => (genre.name || '').toLowerCase().includes(_searchText)),
          appDetail && (appDetail.description || '').toLowerCase().includes(_searchText),
        ].some(cond => cond)
      }))
    }
  }, [ debouncedSearchText, appRecom, appListing, appDetails ])

  return (
    <DataStoreContext.Provider
      value={{
        // APP SEARCH
        searchText, setSearchText,

        // APP RECOMMENDATION
        appRecom, setAppRecom,
        updateAppRecom,
        isFetchingAppRecom,

        appRecomFiltered,

        // APP LISTING
        appListing, setAppListing,
        updateAppListing,
        isFetchingAppListing,

        appListingFiltered,

        // APP DETAIL
        appDetails, setAppDetails,
      }}
      {...props}
    />
  )
}

export default DataStoreContext
