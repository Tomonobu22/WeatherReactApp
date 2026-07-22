import styles from './weatherMap.module.css'
function WeatherMap({ latitude, longitude }) {
    return (
        <iframe className={styles.map}
            title="map"
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d37499.38193705278!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sca!4v1677089889189!5m2!1ses!2sca`}
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    );
}
export default WeatherMap
