import { useContext, useEffect, useState } from 'react';
import Icons from '../components/Icons';
import { DailyData, GroupedData, Params } from '../typeAliases/Daily';
import useSetWeather from '../components/useSetWeather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { UnitsContext } from '../contexts/UnitsContext';
import '../styles/Daily.css';

const Daily = () => {
    const [weatherGrouped, setWeatherGrouped] = useState<GroupedData[]>([]);
    const [collapsed, setCollapsed] = useState<number | null>(null);
    const { location, weather, loading, error } = useSetWeather<DailyData>('/.netlify/functions/server/weather/daily');

    const unitsContext = useContext(UnitsContext);

    //Group data by date
    useEffect(() => {
        if (weather && !Array.isArray(weather)) {
            const grouped = weather.list.reduce((acc: any, obj: any) => {
                const key = obj['dt_txt'].slice(0, 10);
                if (!acc[key]) {
                   acc[key] = [];
                }
              
                acc[key].push(obj);
                return acc;
            }, {});
            
            setWeatherGrouped(Object.entries(grouped));
        }
    }, [weather])

    return (
        <div className='daily-container'>
            { 
                location && !loading && !Array.isArray(location) && 
                <h2>{ location.name }, { location.state }</h2> 
            }
            <div className={ loading ? 'hidden' : 'weather show-flex' }>
                {weatherGrouped.length > 0 && weatherGrouped.map((date, index) => ( 
                    <div key={index}>
                        <h3>{ new Date(date[0].slice(0, 11)).toDateString() }</h3>
                        { 
                            date[1].map(item => (
                                <div className='daily' key={item.dt} onClick={(() => {
                                    !collapsed ? setCollapsed(item.dt) : setCollapsed(null);
                                })}>
                                    <p>
                                        { new Date(item.dt * 1000).toString().slice(15, 21) } 
                                        { parseInt(new Date(item.dt * 1000).toString().slice(15, 18)) < 12 ? ' am' : ' pm' }
                                    </p>
                                    
                                    {
                                        unitsContext?.units === 'metric' ? 
                                        <p>{ Math.floor(item.main.temp) }&deg; C</p> :
                                        <p>{ Math.floor(item.main.temp) }&deg; F</p> 
                                    }

                                    <p>{ item.weather[0].description.slice(0, 1).toUpperCase()}{item.weather[0].description.slice(1) }</p>

                                    <Icons icon={item.weather[0].icon} />

                                    {
                                        unitsContext?.units === 'metric' ? 
                                        <p>{ Math.floor( (item.wind.speed / 1000) * 3600) } km/h</p> :
                                        <p>{ Math.floor(item.wind.speed * 1.60934) } km/h</p>
                                    }

                                    {collapsed === item.dt && (
                                        <div className='collapse'>
                                            { 
                                                unitsContext?.units === 'metric' ? 
                                                <p>Feels like: { Math.floor(item.main.feels_like) }&deg; C</p> :
                                                <p>Feels like: { Math.floor(item.main.feels_like) }&deg; F</p>
                                            }
                                            <p>Humidity: { item.main.humidity }%</p>
                                            <p>Clouds: { item.clouds.all }%</p>
                                            { 
                                                item.rain ? 
                                                <p><FontAwesomeIcon icon={faDroplet} />{ item.rain?.['1h'] } mm</p> 
                                                : 
                                                <p><FontAwesomeIcon icon={faDroplet} /> 0mm</p> 
                                            }
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                ))}
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

export default Daily;