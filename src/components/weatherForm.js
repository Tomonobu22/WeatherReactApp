import { useState } from "react"
import { FaSearch } from "react-icons/fa"

import styles from './weatherForm.module.css'

function WeatherForm({ onChangeCity, error, clearError }) {
    const [city, setCity] = useState('')

    function onChange(e) {
        const value = e.target.value
        if (error) clearError()
        setCity(value)
    }

    function handleSubmit(e){   
        e.preventDefault()
        onChangeCity(city)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.search}>
            {/* Only render this <p> if error exists */}
            {error && <p className={styles.popupError}>{error}</p>}
            <input
                type="text"
                onChange={onChange}
                value={city}
                className={styles.searchBar}
                placeholder="Enter city"
                aria-label="City"
            />
            <button aria-label="Search"><FaSearch /></button>
        </form>
    )
}


export default WeatherForm