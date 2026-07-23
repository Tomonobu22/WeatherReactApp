import { useEffect } from "react"
import WeatherForm from "./weatherForm"
import WeatherMainInfo from "./weatherMainInfo"
import WeatherMap from "./weatherMap"
import Loading from "./loading"
import { useWeather } from '../hooks/useWeather';

import styles from './weatherApp.module.css'

function WeatherApp() {

    const { weather, error, loading, loadInfo, backgroundImage, image, clearError } = useWeather();

    useEffect(() => {
        document.title = `Weather | ${weather?.city ?? ''}`
    }, [weather]) // run on the first render and any timy any dependecy value changes

    return (
        <div className={styles.back} style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}>
            <div className={styles.card}>
                <WeatherForm onChangeCity={loadInfo} error={error} clearError={clearError} />
                {loading ? <Loading /> : weather && <WeatherMainInfo weather={weather}/>}
                {weather? <WeatherMap latitude={weather.latitude} longitude={weather.longitude}/> : null}
            </div>
            {image && (
                <div className={styles.photoCredit}>
                    Photo by <a href={image.user.links.html} target="_blank" rel="noopener noreferrer">{image.user.name}</a> on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
                </div>
            )}
        </div>
    ) 
}


export default WeatherApp