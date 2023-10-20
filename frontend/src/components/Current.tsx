import { CurrentData } from '../typeAliases/Current';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import useSetWeather from './useSetWeather';
import { useContext, useEffect } from 'react';
import { UnitsContext } from '../contexts/UnitsContext';

const Current = () => {
    const { location, weather, loading, error } = useSetWeather<CurrentData>('/.netlify/functions/server/weather/onecall', 'hourly, daily, minutely');

    const unitsContext = useContext(UnitsContext);

    return (
        <div className={!loading ? 'container' : 'container-loading'}>
            {!Array.isArray(weather) && !Array.isArray(location) && (
                <div className='today-container'>
                    <h3>
                        { location.name }, &nbsp;
                        { location.state } at 
                        { new Date(weather.current.dt * 1000).toString().slice(15, 21) } 
                        { parseInt(new Date(weather.current.dt * 1000).toString().slice(15, 18)) < 12 ? ' am' : ' pm' } 
                    </h3>

                    <div className='current'>
                        {
                            unitsContext?.units === 'metric' ? 
                            <p>{ Math.floor(weather.current.temp) }&deg; C</p> :
                            <p>{ Math.floor(weather.current.temp) }&deg; F</p>
                        }
                        <p>{ weather.current.weather[0].description.slice(0, 1).toUpperCase() }{ weather.current.weather[0].description.slice(1) }</p>

                        <p>
                            <span className='flex-span'>
                                {
                                    unitsContext?.units === 'metric' ? 
                                    `${ Math.floor( (weather.current.wind_speed / 1000) * 3600) } km/h` :
                                    `${ Math.floor(weather.current.wind_speed * 1.60934) } km/h`
                                }
                                <FontAwesomeIcon icon={faWind} style={{color: "#467ad2",}} />
                            </span>
                        </p>
                        {   
                            unitsContext?.units === 'metric' ? 
                            <p>Feels Like: <span>{ Math.floor(weather.current.feels_like) }&deg;C</span></p> :
                            <p>Feels Like: <span>{ Math.floor(weather.current.feels_like) }&deg;F</span></p>
                        }
                    </div> 
                </div>
            )}
            { loading && <div className='loading'></div> } 
            { 
                error && (
                    <div className='error'>
                        <h2>Error! Try reloading the page</h2>
                    </div> 
                )
            }
        </div>
    );
}

export default Current;