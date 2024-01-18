import { useContext, useState } from 'react';
import Icons from '../components/Icons';
import useSetWeather from '../components/useSetWeather';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Hourly.css';
import { HourlyData } from '../typeAliases/Hourly';
import { UnitsContext } from '../contexts/UnitsContext';

const Hourly = () => {
    const [collapsed, setCollapsed] = useState<number | null>(null);
    const { location, weather, loading, error } = useSetWeather<HourlyData>('https://weather-guide-seven.vercel.app/server/weather/onecall', 'current, daily, minutely');
    
    const unitsContext = useContext(UnitsContext);

    return (
        <div className='daily-container'>
            { 
                location && !loading && !Array.isArray(location) && 
                <h2>{ location.name }, { location.state }</h2> 
            }
            <div className={ loading ? 'hidden' : 'weather show-flex' }>
                {weather && !Array.isArray(weather) && weather.hourly.map((item, index) => (
                        <div key={index} onClick={(() => {
                            !collapsed ? setCollapsed(item.dt) : setCollapsed(null);
                        })} className='hourly'>
                            <p>
                                { new Date(item.dt * 1000).toString().slice(15, 21) } 
                                { parseInt(new Date(item.dt * 1000).toString().slice(15, 18)) < 12 ? ' am' : ' pm' }
                            </p>
                            
                            {
                                unitsContext?.units === 'metric' ? 
                                <p>{Math.floor(item.temp)}&deg; C</p> : 
                                <p>{Math.floor(item.temp)}&deg; F</p>
                            }

                            <p>{item.weather[0].description.slice(0, 1).toUpperCase()}{item.weather[0].description.slice(1)}</p>
                            <Icons icon={item.weather[0].icon} />

                            {
                                unitsContext?.units === 'metric' ? 
                                <p>{ Math.floor( (item.wind_speed / 1000) * 3600) } km/h</p> :
                                <p>{ Math.floor(item.wind_speed * 1.60934) } km/h</p>
                            }

                            {collapsed === item.dt && (
                                <div className='collapse'>
                                    {
                                        unitsContext?.units === 'metric' ? 
                                        <p>Feels like: {Math.floor(item.feels_like)}&deg; C</p> : 
                                        <p>Feels like: {Math.floor(item.feels_like)}&deg; F</p>
                                    }
                                    <p>Humidity: {item.humidity}%</p>
                                    <p>Clouds: {item.clouds}%</p>
                                    { 
                                        item.rain ? <p><FontAwesomeIcon icon={faDroplet} />{ item.rain?.['1h'] } mm</p> 
                                        : 
                                        <p><FontAwesomeIcon icon={faDroplet} /> 0mm</p> 
                                    }
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
            { loading && <div className='loading'></div> }
            { 
                error && (
                    <div className='error'>
                        <h2>Error! Try reloading the page</h2>
                    </div> 
                )
            }
        </div>
    )
}

export default Hourly;