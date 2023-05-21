import React, { useCallback, useEffect } from 'react';
import css from "./Modal.module.css"
import propTypes from 'prop-types';
import Notiflix from 'notiflix';

export const Modal = ({ modalTogle, modalURL }) => {

    const onESK = useCallback((e) => {
        if (e.code === 'Escape') {
            modalTogle()
        }
    }, [modalTogle])

    useEffect(() => {
        Notiflix.Loading.remove(200)
        document.addEventListener('keydown', onESK)
        return () => {
            document.removeEventListener('keydown', onESK)
            Notiflix.Loading.remove(200)
        }
    }, [onESK])


    return (
        <div onClick={modalTogle} className={css.Overlay}>
            <div className={css.Modal}>
                <img src={modalURL} alt="modal" />
            </div>
        </div>
    )
}

Modal.propTypes = {
    modalURL: propTypes.string.isRequired,
    modalTogle: propTypes.func.isRequired,
}

export default Modal
