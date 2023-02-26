import { useEffect, useState } from "react"
import WeatherForm from "./weatherForm"
import WeatherMainInfo from "./weatherMainInfo"
import Loading from "./loading"

import styles from './weatherApp.module.css'

function WeatherApp() {
    const [weather, setWeather] = useState(null)
   
    useEffect(() => {
        loadInfo()
    }, []) // [] to execute just 1 time

    useEffect(() => {
        document.title = `Weather | ${weather?.name}`
    }, [weather]) 

    async function loadInfo(city = 'london'){
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}${city}&units=metric&appid=${process.env.REACT_APP_KEY}`)
            const json = await request.json()
            setTimeout(() => {
                setWeather(json)
            }, 6000)
            
        } catch(error){ console.log('ERROR')}
    }

    function handleChangeCity(city){
        setWeather(null)
        loadInfo(city)
    }

    return (
        <div className={styles.back} style={{ backgroundImage: `url(https://source.unsplash.com/1600x900/?${weather?.name ?? 'landscape'})` }}>
            <div className={styles.card}>
                <WeatherForm onChangeCity={handleChangeCity} />
                {weather? <WeatherMainInfo weather={weather}/> : <Loading />}
            </div>
        </div>
    ) 
}


export default WeatherApp