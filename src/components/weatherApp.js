import { useEffect } from "react"
import WeatherForm from "./weatherForm"
import WeatherMainInfo from "./weatherMainInfo"
import WeatherMap from "./weatherMap"
import Loading from "./loading"
import { useWeather } from '../hooks/useWeather';

import styles from './weatherApp.module.css'

function WeatherApp() {

    const { weather, error, loading, loadInfo, clearError } = useWeather();

    useEffect(() => {
        document.title = `Weather | ${weather?.city ?? ''}`
    }, [weather]) // run on the first render and any timy any dependecy value changes

    return (
        <div className={styles.back} style={{ backgroundImage: `url(https://source.unsplash.com/1600x900/?${weather?.city ?? 'landscape'})` }}>
            <div className={styles.card}>
                <WeatherForm onChangeCity={loadInfo} error={error} clearError={clearError} />
                {loading ? <Loading /> : weather && <WeatherMainInfo weather={weather}/>}
                {weather? <WeatherMap latitude={weather.latitude} longitude={weather.longitude}/> : null}
            </div>
        </div>
    ) 
}


export default WeatherApp