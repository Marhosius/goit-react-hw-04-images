import css from "./ImageGalleryItem.module.css";
import propTypes from 'prop-types';

export const ImageGalleryItem = ({ modalURLHandler, modalTogle, largeImageURL, webformatURL }) => {
    const onImgClick = ({ target: { attributes } }) => {
        modalURLHandler(attributes.js.value)
        modalTogle()
    }
    return (
        <li className={css.ImageGalleryItem}>
            <img onClick={onImgClick} js={largeImageURL} src={webformatURL} className={css.ImageGalleryItemImage} alt="" />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    webformatURL: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
    modalTogle: propTypes.func.isRequired,
    modalURLHandler: propTypes.func.isRequired,
}
export default ImageGalleryItem

