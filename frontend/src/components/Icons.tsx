import { useState, useEffect } from 'react';
import clearDay from '../assets/icons/clearDay.png';
import clearNight from '../assets/icons/clearNight.png';
import fewCloudsDay from '../assets/icons/fewCloudsDay.png';
import fewCloudsNight from '../assets/icons/fewCloudsNight.png';
import scatteredClouds from '../assets/icons/scatteredClouds.png';
import brokenClouds from '../assets/icons/brokenClouds.png';
import showerRain from '../assets/icons/showerRain.png';
import rainDay from '../assets/icons/rainDay.png';
import rainNight from '../assets/icons/rainNight.png';
import thunderstorm from '../assets/icons/thunderstorm.png';
import snow from '../assets/icons/snow.png';
import mist from '../assets/icons/mist.png';

type IconProps = {
    icon: string,
    height?: string 
    width?: string,
}

const Icons = ({ icon, height, width }: IconProps) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        switch (icon) {
            case '01d':
                setImage(clearDay);
                break;
            case '01n':
                setImage(clearNight);
                break;
            case '02d':
                setImage(fewCloudsDay);
                break;
            case '02n':
                setImage(fewCloudsNight);
                break;
            case '03d':
                setImage(scatteredClouds);
                break;
            case '03n':
                setImage(scatteredClouds);
                break;
            case '04d':
                setImage(brokenClouds);
                break;
            case '04n':
                setImage(brokenClouds);
                break;
            case '09d':
                setImage(showerRain);
                break;
            case '09n':
                setImage(showerRain);
                break;
            case '10d':
                setImage(rainDay);
                break;
            case '10n':
                setImage(rainNight);
                break;
            case '11d':
                setImage(thunderstorm);
                break;
            case '11n':
                setImage(thunderstorm);
                break;
            case '13d':
                setImage(snow);
                break;
            case '13n':
                setImage(snow);
                break;
            case '50d':
                setImage(mist);
                break;
            case '50m=n':
                setImage(mist);
                break;
        }
    }, [])

    return (
        <img className='weather-icon' src={image} style={{height: height}} width={width} />
    )
}

export default Icons;