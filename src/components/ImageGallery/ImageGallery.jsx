import React, { useState, useEffect } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import css from "./ImageGallery.module.css";
import propTypes from 'prop-types';
import Notiflix from 'notiflix';

export const ImageGallery = ({ hits, loadMore, handleNextPage }) => {
    const [modal, setModal] = useState(false)
    const [modalURL, setModalURL] = useState("")

    useEffect(() => {
        Notiflix.Loading.dots()
        Notiflix.Loading.remove(200)

    }, [modal])

    const modalTogle = () => setModal(() => { return !modal })
    const modalURLHandler = (newUrl) => setModalURL(newUrl)

    return (
        <div>
            <ul className={css.ImageGallery}>
                {hits.length >= 1 && hits.map(({ id, webformatURL, largeImageURL }) =>
                    <ImageGalleryItem
                        key={id}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        modalTogle={modalTogle}
                        modalURLHandler={modalURLHandler} />)}
            </ul>
            {loadMore && (<Button handleNextPage={handleNextPage}></Button>)}
            {modal && (<Modal modalTogle={modalTogle} modalURL={modalURL}></Modal>)}
        </div>

    )
}

ImageGallery.propTypes = {
    handleNextPage: propTypes.func.isRequired,
    loadMore: propTypes.bool.isRequired,
    hits: propTypes.array.isRequired,
}

export default ImageGallery
