import { useState } from "react"
import { FaSearch } from "react-icons/fa"

import styles from './weatherForm.module.css'

function WeatherForm({ onChangeCity, error, clearError }) {
    const [city, setCity] = useState('')

    function onChange(e) {
        const value = e.target.value
        if (error) clearError()
        if (value !== '') setCity(value)
    }

    function handleSubmit(e){   
        e.preventDefault()
        onChangeCity(city)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.search}>
            {/* Only render this <p> if error exists */}
            {error && <p className={styles.popupError}>{error}</p>}
            <input type="text" onChange={onChange} className={styles.searchBar}/>
            <button><FaSearch /></button>
        </form>
    )
}


export default WeatherForm