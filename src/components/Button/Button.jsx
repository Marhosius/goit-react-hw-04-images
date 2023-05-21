import css from './Button.module.css'
import propTypes from 'prop-types';

export const Button = ({ handleNextPage }) => {
    return (
        <button className={css.Button} onClick={handleNextPage}>Load more</button>
    )
}

Button.propTypes = {
    handleNextPage: propTypes.func.isRequired,
}

export default Button
