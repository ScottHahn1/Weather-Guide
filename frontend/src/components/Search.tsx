import { useState, useContext, useEffect } from 'react';
import { LocationContext } from '../contexts/LocationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/Search.css';

const Search = () => {
    const [location, setLocation] = useState<string>('');
    const locationContext = useContext(LocationContext);

    useEffect(() => {
        locationContext?.setSearchLocation(sessionStorage.getItem('location'));
    }, [])

    const changeLocation = (e: React.ChangeEvent<HTMLInputElement>)  => {
        setLocation(e.target.value);
    }

    const handleClick = () => {
        if (location) {
            sessionStorage.setItem('location', location);
            locationContext?.setSearchLocation(sessionStorage.getItem('location'));
        } else {
            alert('Please enter a valid name');
        }
        setLocation('');
    }

    return (
        <div className='search'>
            <input className='search-bar' type='search' value={location} onChange={changeLocation} placeholder='Search for a city, town, suburb, etc...'>
            </input>
            <button className='search-btn' onClick={ handleClick }>
                <FontAwesomeIcon className='magnifying-glass' icon={faMagnifyingGlass} />
            </button>
        </div>
    )
}
  
export default Search;