import { useContext, useState } from 'react';
import Icons from '../components/Icons';
import { ThisWeekData } from '../typeAliases/ThisWeek';
import useSetWeather from '../components/useSetWeather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { UnitsContext } from '../contexts/UnitsContext';
import '../styles/ThisWeek.css';

const ThisWeek = () => {
    const [collapsed, setCollapsed] = useState<number | null>(null);
    const { location, weather, loading, error } = useSetWeather<ThisWeekData>('https://weather-guide-seven.vercel.app/server/weather/onecall', 'current, hourly, minutely');
    
    const unitsContext = useContext(UnitsContext);

    return (
        <div className='daily-container'>
            { location && !loading && !Array.isArray(location) && (
                <h2>{ location.name }, { location.state }</h2> 
            )}
            <div className={ loading ? 'hidden' : 'weather show-flex' }>
                {weather && !Array.isArray(weather) && weather.daily.map((item, index) => (
                        <div key={index} className='this-week' onClick={(() => {
                            !collapsed ? setCollapsed(item.dt) : setCollapsed(null);
                        })}>
                            <p>{ new Date(item.dt * 1000).toString().slice(0, 11) } </p>
                            {
                                unitsContext?.units === 'metric' ? 
                                <p>Day: {Math.floor(item.temp.day)}&deg; C</p> :
                                <p>Day: {Math.floor(item.temp.day)}&deg; F</p>
                            }
                            {
                                unitsContext?.units === 'metric' ? 
                                <p>Night: {Math.floor(item.temp.night)}&deg; C</p> :
                                <p>Night: {Math.floor(item.temp.night)}&deg; F</p>
                            }
                            <p>{item.weather[0].description.slice(0, 1).toUpperCase()}{item.weather[0].description.slice(1)}</p>

                            <div className='flex'>
                                {
                                    unitsContext?.units === 'metric' ? 
                                    <p>{ Math.floor( (item.wind_speed / 1000) * 3600) } km/h</p> :
                                    <p>{ Math.floor(item.wind_speed * 1.60934) } km/h</p>
                                }
                                <Icons icon={item.weather[0].icon} width='40%' />
                            </div>

                            {collapsed === item.dt && (
                                <div className='collapse'>
                                    {
                                        unitsContext?.units === 'metric' ? 
                                        <p>Feels like: {Math.floor(item.feels_like.day)}&deg; C</p> :
                                        <p>Feels like: {Math.floor(item.feels_like.day)}&deg; F</p>
                                    }
                                    <p>Humidity: {item.humidity}%</p>
                                    <p>Clouds: {item.clouds}%</p>
                                    { 
                                        item.rain ? <p><FontAwesomeIcon icon={faDroplet} />{ item.rain?.['1h'] } mm</p> 
                                        : <p><FontAwesomeIcon icon={faDroplet} /> 0mm</p> 
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

export default ThisWeek;