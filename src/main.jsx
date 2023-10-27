import React from 'react'
import ReactDOM from 'react-dom/client'
import PhotosApp from './components/PhotosApp'
import { Provider } from 'react-redux'
import { store } from './store/store'
import "./assets/css/styles.css"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>

    <Provider store={store}>
      <PhotosApp />
    </Provider>

  </>)
