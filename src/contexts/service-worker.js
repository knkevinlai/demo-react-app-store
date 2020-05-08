/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  createContext,
  useState,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import * as serviceWorker from '../serviceWorker';

const ServiceWorkerContext = createContext({})

export const ServiceWorkerContextProvider = props => {
  const [ serviceWorkerInitialized, setServiceWorkerInitialized ] = useState(false)
  const [ serviceWorkerUpdated, setServiceWorkerUpdated ] = useState(false)
  const [ serviceWorkerRegistration, setServiceWorkerRegistration ] = useState(null)

  useEffect(() => {
    serviceWorker.register({
      onSuccess: reg => {
        setServiceWorkerInitialized(true)
        setServiceWorkerRegistration(reg)
      },
      onUpdate: reg => {
        setServiceWorkerUpdated(true)
        setServiceWorkerRegistration(reg)
      },
    })    
  }, [])

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' })

      registrationWaiting.addEventListener('statechange', e => {
        if (e.target.state === 'activated') {
          window.location.reload()
        }
      })
    }    
  }

  return (
    <ServiceWorkerContext.Provider
      value={{
        serviceWorkerInitialized, setServiceWorkerInitialized,
        serviceWorkerUpdated, setServiceWorkerUpdated,
        serviceWorkerRegistration,
        updateServiceWorker,
      }}
      {...props}
    />
  )
}
ServiceWorkerContextProvider.propTypes = { serviceWorkerRegistration: PropTypes.any }

export default ServiceWorkerContext
