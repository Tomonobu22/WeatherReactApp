import { useEffect, useState } from "react"
import { getWeather } from "../services/weatherService";
import { createWeatherModel } from "../models/weatherModel";

export function useWeather() {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function loadInfo(city = "london") {
        try {
            setError(null);
            setLoading(true);
            const json = await getWeather(city);

            if (json.cod === 200) {
                setWeather(createWeatherModel(json));
            }
            else {
                setError("City not found");
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // useEffect Hook allow you to perform side effects in your component like fetching data, directly updating the DOM.
    useEffect(() => {
        loadInfo();
    }, []); // [] to execute just 1 time

    return {
        weather,
        error,
        loading,
        loadInfo,
        clearError: () => setError(null)
    };
}