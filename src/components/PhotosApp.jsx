import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppPhotosContainer, ButtonCategory, ButtonMorePhotos, ContainerPhotos, FavoritePhotosCategory, Photo, PrincipalTitle, TitleResults } from "../assets/StyledComponents/Components";
import { doANewSearch, resultsSearch } from "../store/searchSlice";
import { useLazyGetMorePhotosQuery, useLazyGetPhotosQuery } from "../store/apis/photosApi";

function PhotosApp() {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)
    const [searchBar, setSearchBar] = useState("")
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)

    const [getPhotos, { data: photos, isLoading: photosLoading, isFetching: photosFetching }] = useLazyGetPhotosQuery()
    const [getMorePhotos, { data: morePhotos, isLoading: morePhotosLoading, isFetching: morePhotosFetching }] = useLazyGetMorePhotosQuery()

    useEffect(() => {
        if (page != 1) {
            getMorePhotos({ query, page })
        }
    }, [page])

    useEffect(() => {
        if (query === "") return
        setPage(1)
        getPhotos(query)

    }, [query])
    useEffect(() => {
        if (page != 1) {
            dispatch(resultsSearch(morePhotos.hits))
        }
    }, [morePhotos])
    useEffect(() => {
        if (page === 1 && query != "") {
            console.log(photos)
            dispatch(doANewSearch(photos.hits))
        }
    }, [photos])
    const handleSearchBar = (e) => {
        setSearchBar(e.target.value)
    }
    const handleQuery = () => {
        setQuery(searchBar)
    }
    const handleChangeQuery = (e) => {
        setQuery(e.target.innerText)
    }
    const handlePage = () => {
        setPage(page + 1)
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
                    {photosLoading && <h1>Loading images ...</h1>}
                    {morePhotosFetching && <h1>Loading images ...</h1>}
                </ContainerPhotos>
                {query != "" && <ButtonMorePhotos onClick={handlePage}>View More</ButtonMorePhotos>}
            </AppPhotosContainer>
        </>);
}

export default PhotosApp;