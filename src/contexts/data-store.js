import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { createContext } from 'react'
import uniq from 'lodash/uniq'

import axios from '../lib/axios'

import AppFeedsModel from '../model/AppFeedsModel'
import AppDetailResponseModel from '../model/AppDetailResponseModel'

import useDebounce from '../hooks/useDebounce'

import topGrossing100Mock from '../json/top-grossing-100.json'
import topFree100Mock from '../json/top-free-100.json'

const isUseMock = false // FOR LOCAL TESTING

const DataStoreContext = createContext({})

const fetchAppRecomMock = async ({ limit = 10 } = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return topGrossing100Mock.feed.results.slice(0, limit) || []
}
const fetchAppRecom = async ({ limit = 10 } = {}) => {
  const response = await axios.get(`https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/${limit}/explicit.json`)

  // VALIDATE SCHEMA FROM API
  const appFeedsModel = AppFeedsModel.of(response.data)
  appFeedsModel.validate()

  return appFeedsModel.data.feed.results || []
}

const fetchAppListingMock = async ({ limit = 10 } = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return topFree100Mock.feed.results.slice(0, limit) || []
}

const fetchAppListing = async ({ limit = 10 } = {}) => {
  const response = await axios.get(`https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/${limit}/explicit.json`)

  // VALIDATE SCHEMA FROM API
  const appFeedsModel = AppFeedsModel.of(response.data)
  appFeedsModel.validate()

  return appFeedsModel.data.feed.results || []
}

export const fetchAppDetail = async ({ ids = [] } = {}) => {
  if (ids.length === 0) { return [] }

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
  const [ isFetchingAppListing, setIsFetchingAppListing ] = useState(false)

  // APP DETAIL
  const [ appDetails, setAppDetails ] = useState(new Map())
  const appDetailsRef = useRef(appDetails)

  // METHODS
  const updateAppDetails = useCallback(async ({ ids }) => {
    if (!ids || ids.length === 0) { return }
    const idsNotFetchedYet = ids.filter(_id => ![ ...(appDetailsRef.current || (new Map())).keys() ].includes(_id))

    if (idsNotFetchedYet.length > 0) {
      const _appDetails = await fetchAppDetail({ ids: idsNotFetchedYet })

      const newAppDetails = new Map([
        ...(appDetailsRef.current || []),
        ..._appDetails.map(_appDetail => ([ `${_appDetail.trackId}`, _appDetail ]))
      ])
      appDetailsRef.current = newAppDetails
      setAppDetails(newAppDetails)
    }
  }, [])

  const updateAppRecom = useCallback(async payload => {
    setIsFetchingAppRecom(true)
    const _appRcom = isUseMock
      ? await fetchAppRecomMock(payload)
      : await fetchAppRecom(payload)
    // AUTO FETCH APP DETAILS
    const appIds = _appRcom.map(({ id }) => id)

    // setAppIdsToFetchDetail(appIds) // DEPREPCATED
    await updateAppDetails({ ids: appIds })

    setAppRecom(_appRcom)
    setIsFetchingAppRecom(false)
  }, [ updateAppDetails ])

  const updateAppListing = useCallback(async payload => {
    setIsFetchingAppListing(true)

    const fetchPromise = isUseMock
      ? fetchAppListingMock(payload)
      : fetchAppListing(payload)

    const _appListing = await fetchPromise

    const appIds = _appListing.map(({ id }) => id)

    await updateAppDetails({ ids: appIds })

    setAppListing(_appListing)
    setIsFetchingAppListing(false)
  }, [ updateAppDetails ])


  // SIDE EFFECT + DEBOUNCING 300 MILLISECOND TO PERFORM TEXT SEARCH FILTERING
  const debouncedSearchText = useDebounce(searchText, 400)

  useEffect(() => {
    const _searchText = (debouncedSearchText || '').toLowerCase()

    // RESET FILTERING
    if (_searchText === '') {
      setAppListingFiltered(appListing)
      setAppRecomFiltered(appRecom)
      return
    }

    // FETCH FROM API AGAIN WITH EVERY TEXT SEARCH
    (async () => {
      setIsFetchingAppRecom(true)
      setIsFetchingAppListing(true)
      const [ _appRecom, _appListing ] = await Promise.all([
        isUseMock ? fetchAppRecomMock({ limit: 100 }) : fetchAppRecom({ limit: 100 }),
        isUseMock ? fetchAppListingMock({ limit: 100 }) : fetchAppListing({ limit: 100 }),
      ])

      const _appListingFiltered = (_appListing || []).filter(appFeed => {
        const appDetail = appDetailsRef.current.get(appFeed.id)

        return [
          (appFeed.name || '').toLowerCase().includes(_searchText),
          (appFeed.artistName || '').toLowerCase().includes(_searchText),
          appFeed.genres && appFeed.genres.some(genre => (genre.name || '').toLowerCase().includes(_searchText)),
          appDetail && (appDetail.description || '').toLowerCase().includes(_searchText),
        ].some(cond => cond)
      })

      const _appRecomFiltered = (_appRecom || []).filter(appFeed => {
        const appDetail = appDetailsRef.current.get(appFeed.id)

        return [
          (appFeed.name || '').toLowerCase().includes(_searchText),
          (appFeed.artistName || '').toLowerCase().includes(_searchText),
          appFeed.genres && appFeed.genres.some(genre => (genre.name || '').toLowerCase().includes(_searchText)),
          appDetail && (appDetail.description || '').toLowerCase().includes(_searchText),
        ].some(cond => cond)
      })

      setAppListingFiltered(_appListingFiltered)
      setAppRecomFiltered(_appRecomFiltered)

      const appIds = uniq([
        ...(_appListingFiltered || []).map(({ id }) => id),
        ...(_appRecomFiltered || []).map(({ id }) => id),
      ])

      await updateAppDetails({ ids: appIds })

      setIsFetchingAppRecom(false)
      setIsFetchingAppListing(false)
    })()
  }, [ debouncedSearchText, appRecom, appListing, appDetailsRef, updateAppDetails ])

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
