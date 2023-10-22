import { useContext, useEffect, useState } from 'react'
import { LocationContext } from '../contexts/LocationContext';
import useAxios from './useAxios';
import { UnitsContext } from '../contexts/UnitsContext';

type LocationParams = {
    location: string 
}

type WeatherParams = {
    lat: number,
    lon: number,
    exclude?: string,
    units: string
}

type LocationData = {
    lat: number,
    lon: number,
    name?: string,
    state?: string
}

const useSetWeather = <WeatherData>(weatherUrl: string, excluded?: string) => {
    const [locationParams, setLocationParams] = useState<LocationParams>({} as LocationParams);
    const [location, setLocation] = useState<LocationData | []>([]);
    const [weather, setWeather] = useState<WeatherData | []>([]);
    const locationUrl = 'https://weather-app-z2e6.onrender.com/server/weather/location';
    const [weatherParams, setWeatherParams] = useState<WeatherParams>({} as WeatherParams);
    const [error, setError] = useState(false);

    const locationContext = useContext(LocationContext);
    const unitsContext = useContext(UnitsContext);

    const { data: locationData, error: locationError } = useAxios<LocationData[]>(locationUrl, [], locationParams);
    const { data: weatherData, loading, error: weahterError } = useAxios<WeatherData[]>(weatherUrl, [], weatherParams);

    useEffect(() => {
        if (locationContext && locationContext.searchLocation) {
            setLocationParams({ location: locationContext.searchLocation });
        } else {
            setLocationParams({ location: 'Cape Town' });
        }
    }, [locationContext])

    useEffect(() => {
        locationData.length > 0 && setLocation(locationData[0]);
    }, [locationData])

    useEffect(() => {
        if (!Array.isArray(location) && location && sessionStorage.getItem('units')) {
            setWeatherParams({
                lat: location.lat,
                lon: location.lon,
                exclude: excluded,
                units: sessionStorage.getItem('units') as string
            })
        }
    }, [location, unitsContext?.units, sessionStorage.getItem('units')])

    useEffect(() => {
        if (weatherData && !Array.isArray(weatherData)) {
            setWeather(weatherData);
        }
    }, [weatherData])

    useEffect(() => {
        if (locationError || weahterError) {
            setError(true);
        }
    }, [locationData, weatherData])

    return { location, weather, loading, error };
}

export default useSetWeather;