import { Dispatch, SetStateAction, createContext, useState} from 'react';

type UnitsProps = {
    units: string,
    setUnits: Dispatch<SetStateAction<string>>
}

type UnitsContextProviderProps = {
    children: React.ReactNode;
}

export const UnitsContext = createContext<UnitsProps | null>(null);

export const UnitsContextProvider = ({ children }: UnitsContextProviderProps) => {
    const [units, setUnits] = useState('metric');

    return (
        <UnitsContext.Provider value={{ units, setUnits }}>
            { children }
        </UnitsContext.Provider>
    )
}