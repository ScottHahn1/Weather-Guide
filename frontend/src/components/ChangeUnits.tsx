import { useContext, useEffect } from 'react';
import { UnitsContext } from '../contexts/UnitsContext';

const ChangeUnits = () => {
    const unitsContext = useContext(UnitsContext);

    const changeUnitsOfMesurement = (unit: string) => {
        if (unit === 'metric') {
          unitsContext?.setUnits('metric');
        } else {
          unitsContext?.setUnits('imperial');
        }
    }

    useEffect(() => {
      if (unitsContext?.units) {
        sessionStorage.setItem('units', unitsContext.units);
      }
    }, [unitsContext?.units])

    return (
      <div className='units'>
        <button onClick={ () => changeUnitsOfMesurement('metric') }>&deg;C</button>
        <div className='line'></div>
        <button onClick={ () => changeUnitsOfMesurement('imperial') }>&deg;F</button>
      </div>
    )
}

export default ChangeUnits;