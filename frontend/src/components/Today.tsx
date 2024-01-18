import { ThisWeekData } from "../typeAliases/ThisWeek";
import Icons from "./Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import useSetWeather from "./useSetWeather";
import { useContext } from "react";
import { UnitsContext } from "../contexts/UnitsContext";

const Today = () => {
    const { location, weather, loading, error } = useSetWeather<ThisWeekData>('https://weather-guide-seven.vercel.app/server/weather/onecall', 'hourly, current, minutely');

    const unitsContext = useContext(UnitsContext);

    return (
        <div className={!loading ? 'container' : 'container-loading'}>
            {weather && !Array.isArray(weather) && location && !Array.isArray(location) && (
                <div className='today-container'>
                    <h3>Weather today in {location.name}, {location.state}</h3>
                    <div className='today'>
                        <div>
                            <p>{ new Date(weather.daily[0].dt * 1000).toString().slice(0, 11) }</p>

                            {
                                unitsContext?.units === 'metric' ? 
                                <p>Day: { Math.floor(weather.daily[0].temp.day) }&deg; C</p> :
                                <p>Day: { Math.floor(weather.daily[0].temp.day) }&deg; F</p>
                            }
                            {
                                unitsContext?.units === 'metric' ? 
                                <p>Day: { Math.floor(weather.daily[0].temp.night) }&deg; C</p> :
                                <p>Day: { Math.floor(weather.daily[0].temp.night) }&deg; F</p>
                            }
                            
                            <p>
                                <span className='flex-span'>
                                    { weather.daily[0].weather[0].description.slice(0, 1).toUpperCase() }{ weather.daily[0].weather[0].description.slice(1) }
                                    <Icons icon={ weather.daily[0].weather[0].icon } height='3rem' />
                                </span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className='flex-span'>
                                    {
                                        unitsContext?.units === 'metric' ? 
                                        `${Math.floor( (weather.daily[0].wind_speed / 1000) * 3600)} km/h` :
                                        `${Math.floor(weather.daily[0].wind_speed * 1.60934)} km/h`
                                    }
                                    <FontAwesomeIcon icon={faWind} style={{color: "#467ad2",}} />
                                </span>
                            </p> 
                            {
                                unitsContext?.units === 'metric' ? 
                                <p>High: {Math.floor(weather.daily[0].temp.max)}&deg; C | Low: {Math.floor(weather.daily[0].temp.min)}&deg; C</p> :
                                <p>High: {Math.floor(weather.daily[0].temp.max)}&deg; F | Low: {Math.floor(weather.daily[0].temp.min)}&deg; F</p>
                            }
                            <p>Humidity: {weather.daily[0].humidity}%</p>
                            {
                                unitsContext?.units === 'metric' ? 
                                <p>Feels like: {Math.floor(weather.daily[0].feels_like.day)}&deg; C</p> :
                                <p>Feels like: {Math.floor(weather.daily[0].feels_like.day)}&deg; F</p>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Today;