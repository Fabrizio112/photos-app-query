import { useState } from "react"
import { useQuery } from "@tanstack/react-query"


export async function getFotos(key, query, page) {
    try {
        let res = await fetch(`https://pixabay.com/api/?key=${key}&q=${query}&per_page=5&page=${page}`)
        let data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export function useData(key, query) {
    const [fetch, setFetch] = useState(false)
    const [page, setPage] = useState(1)
    const photosData = useQuery({
        queryKey: ["photos"],
        queryFn: () => getFotos(key, query, page),
        enabled: fetch

    })
    const nextPage = () => {
        if (photosData.data.length === 0) return
        setPage(page + 1)
    }
    return {
        photosData,
        fetch,
        setFetch,
        nextPage,
        setPage,
        page
    }
}



