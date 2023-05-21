import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from "./App.module.css"
import Notiflix from 'notiflix';
import { getPixabay } from "../api/apiFetch";


export const App = () => {
    const [searchingValue, setSearchingValue] = useState("")
    const [page, setPage] = useState(1)
    const [hits, setHits] = useState([])
    const [loadMore, setLoadMore] = useState(false)

    const onSubmit = async (value) => {
        setSearchingValue(value)
        setHits([])
        setPage(1)

        Notiflix.Loading.dots()
        try {
            const { data } = await getPixabay(value, 1);
            const answear = data.hits.map(({ id, webformatURL, largeImageURL }) => { return { webformatURL, largeImageURL, id } })
            setHits(() => { return [...answear] })
            if (data.totalHits > 12) {
                setLoadMore(true)
            }
            if (data.totalHits < 12) {
                setLoadMore(false)
            }
        } catch (error) {
            console.log(error)
        }
        Notiflix.Loading.remove(200)
    }

    const handleNextPage = async () => {
        setPage(() => { return page + 1 })
        try {
            const { data } = await getPixabay(searchingValue, (page + 1));
            const answear = data.hits.map(({ id, webformatURL, largeImageURL }) => { return { webformatURL, largeImageURL, id } })
            setHits(() => { return [...hits, ...answear] })
            if (data?.totalHits < ((hits.length) + 12)) {
                setLoadMore(false)
            }

        } catch (error) {
            console.log(error)
        }

        Notiflix.Loading.remove(400)
        return
    }


    return (
        <div className={css.App}>
            <Searchbar onSubmit={onSubmit} />
            <ImageGallery hits={hits} handleNextPage={handleNextPage} loadMore={loadMore}></ImageGallery>
        </div>
    )
}
