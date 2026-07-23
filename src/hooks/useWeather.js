import { useCallback, useEffect, useState } from "react"
import { getWeather } from "../services/weatherService";
import { createWeatherModel } from "../models/weatherModel";

export function useWeather() {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const loadInfo = useCallback(async (city = "london") => {
        try {
            setError(null);
            setLoading(true);
            const json = await getWeather(city);

            if (json.cod === 200) {
                setWeather(createWeatherModel(json));
                const image = await fetchBackgroundImage(city);
                setBackgroundImage(image);
            }
            else {
                setError("City not found");
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);



    async function fetchBackgroundImage(city) {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=${city}&orientation=landscape`,
            {
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.urls.regular;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    


    useEffect(() => {
        loadInfo();
    }, [loadInfo]); 

    return {
        weather,
        error,
        loading,
        loadInfo,
        backgroundImage,
        clearError: () => setError(null)
    };
}