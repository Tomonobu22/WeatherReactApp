import styles from './weatherMainInfo.module.css'

function WeatherMainInfo({ weather }) {
    return <div>
        <div className={styles.mainWeather}>
            <img src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`} alt={weather?.description} />
            <div>
                <h1>{Math.round(weather?.temperature)} ºC</h1>
                <div className={styles.description}>{weather?.description}</div>
            </div>
        </div>
        <div>{weather?.city}</div>
        <div className={styles.data}>
            {`Feels like: ${Math.round(weather?.feelsLike)}°C`}
        </div>
        <div className={styles.data}>{`Humidity: ${weather?.humidity}%`}</div>
        <div className={styles.data}>{`Wind Speed: ${weather?.windspeed} km/h`}</div>
    </div>
}

export default WeatherMainInfo