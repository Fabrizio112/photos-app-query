import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_KEY } from "../../helpers/constants";


export const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://pixabay.com/api`
    }),
    endpoints: (builder) => ({

        getPhotos: builder.query({
            query: query => `/?key=${API_KEY}&q=${query}&per_page=10`,
            providesTags: ['photos']
        }),
        getMorePhotos: builder.query({
            query: (args) => {
                const { query, page } = args
                return {
                    url: `/?key=${API_KEY}&q=${query}&per_page=10&page=${page}`
                }
            }
        })

    })
})
export const { useLazyGetPhotosQuery, useLazyGetMorePhotosQuery } = photosApi;