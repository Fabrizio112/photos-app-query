import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppPhotosContainer, ButtonCategory, ButtonMorePhotos, ContainerPhotos, FavoritePhotosCategory, Photo, PrincipalTitle, TitleResults } from "../assets/StyledComponents/Components";
import { doANewSearch, resultsSearch } from "../store/searchSlice";
import { useData } from "../hooks/useData";
import { API_KEY } from "../helpers/constants";
import { useQueryClient } from "@tanstack/react-query";

function PhotosApp() {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)
    const [searchBar, setSearchBar] = useState("")
    const [query, setQuery] = useState("")
    const { photosData, fetch, setFetch, page, setPage, nextPage } = useData(API_KEY, query)

    let queryClient = useQueryClient()

    useEffect(() => {
        if (page != 1 && photosData.data) {
            dispatch(resultsSearch(photosData.data.hits))
            photosData.refetch()

        }
    }, [page])

    useEffect(() => {
        if (query === "") return
        if (page === 1 && photosData.data) {
            queryClient.invalidateQueries["photos"]
            photosData.refetch()
            dispatch(doANewSearch(photosData.data.hits))
            setPage(1)
        }

    }, [photosData.data, query])

    const handleSearchBar = (e) => {
        setSearchBar(e.target.value)
    }
    const handleQuery = () => {
        setQuery(searchBar)
        setFetch(true)
        if (fetch === true) {
            setFetch(false)
        }
    }
    const handleChangeQuery = (e) => {
        setQuery(e.target.innerText)
        setFetch(true)
        if (fetch === true) {
            setFetch(false)
        }
    }
    const handlePage = () => {
        console.log(page)
        nextPage()
        console.log(page)
    }
    return (
        <>
            <AppPhotosContainer >
                <PrincipalTitle>Photos App </PrincipalTitle>
                <SearchBar handleSearchBar={handleSearchBar} searchBar={searchBar} handleQuery={handleQuery} />
                <FavoritePhotosCategory className="favorites-categories">
                    <ButtonCategory onClick={handleChangeQuery}>Food</ButtonCategory>
                    <ButtonCategory onClick={handleChangeQuery}>Technology</ButtonCategory>
                    <ButtonCategory onClick={handleChangeQuery}>Clothes</ButtonCategory>
                    <ButtonCategory onClick={handleChangeQuery}>Social Media</ButtonCategory>
                </FavoritePhotosCategory>
                <TitleResults>Results for {query} :</TitleResults>
                <ContainerPhotos>
                    {search.length > 0 && search.map(photo => <Photo key={photo.id} src={photo.webformatURL} alt={photo.tags} />)}
                    {photosData.isFetching && <h2>Cargando ...</h2>}
                </ContainerPhotos>
                {query != "" && <ButtonMorePhotos onClick={handlePage}>View More</ButtonMorePhotos>}
            </AppPhotosContainer>
        </>);
}

export default PhotosApp;