import { useState } from "react"
import { FaSearch } from "react-icons/fa"

import styles from './weatherForm.module.css'

function WeatherForm({ onChangeCity }) {
    const [city, setCity] = useState('')

    function onChange(e) {
        const value = e.target.value
        if (value !== '') setCity(value)
    }

    function handleSubmit(e){   
        e.preventDefault()
        onChangeCity(city)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.search}>
            <input type="text" onChange={onChange} className={styles.searchBar}/>
            <button><FaSearch /></button>
        </form>
    )
}


export default WeatherForm