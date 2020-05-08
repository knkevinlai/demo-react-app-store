import React from 'react'

import { DataStoreContextProvider } from './contexts/data-store'
import { ThemeContextProvider } from './contexts/theme'
import { ServiceWorkerContextProvider } from './contexts/service-worker'
import ThemeProvider from './components/Material/ThemeProvider'
import Layout from './components/Layout/Layout'
import ServiceWorkerHandler from './components/ServiceWorkerHandler/ServiceWorkerHandler'

import './App.css' // GLOBAL STYLES

const App = () => {
  return (
    <ServiceWorkerContextProvider>
      <ThemeContextProvider>
        <DataStoreContextProvider>
          <ThemeProvider>
            <ServiceWorkerHandler/>
            <Layout/>
          </ThemeProvider>
        </DataStoreContextProvider>
      </ThemeContextProvider>
    </ServiceWorkerContextProvider>
  )
}

export default App
