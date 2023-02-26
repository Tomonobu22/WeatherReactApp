import styles from './weatherMainInfo.module.css'

function WeatherMainInfo({ weather }) {
    return <div>
        <div>{weather?.name}</div>
        <div>
            <div className={styles.imganddescription}>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`} alt="Weather Icon"/>
                <div className={styles.description}>{weather?.weather[0].description}</div>
            </div>
            <div>
                <div>{`${weather?.main.temp} ºC`}</div>
                <div>{`Humidity: ${weather?.main.humidity}%`}</div>
                <div>{`Wind Speed: ${weather?.wind.speed} km/h`}</div>
            </div>
            <iframe 
                title="map"
                src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d37499.38193705278!2d${weather?.coord.lon}!3d${weather?.coord.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sca!4v1677089889189!5m2!1ses!2sca`} 
                width="400"
                height="300" 
                style={{ border:0 }} 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    </div>
}

export default WeatherMainInfo