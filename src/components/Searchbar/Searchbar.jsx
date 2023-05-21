import React, { useState } from 'react';
import Notiflix from 'notiflix';
import css from "./Searchbar.module.css"
import propTypes from 'prop-types';

export const Searchbar = ({ onSubmit, }) => {
    const [value, setValue] = useState("")

    const onInputChange = ({ target }) => { if (target.value.trim()) setValue(target.value) }

    const submitHandler = (e) => {
        e.preventDefault()
        if (value.length <= 1) {
            Notiflix.Notify.warning("use more specifically request", { position: 'center-top' })
            return
        }
        onSubmit(value)
        setValue("")
    }

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={submitHandler}>
                <button type="submit" className={css.SearchFormButton}>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    onChange={onInputChange}
                    value={value}
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,
}

export default Searchbar
