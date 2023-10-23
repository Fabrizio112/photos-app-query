import React from 'react'
import ReactDOM from 'react-dom/client'
import PhotosApp from './components/PhotosApp'
import { Provider } from 'react-redux'
import { store } from './store/store'
import "./assets/css/styles.css"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <>

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <PhotosApp />
      </QueryClientProvider>
    </Provider>

  </>)
