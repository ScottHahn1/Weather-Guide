import { Dispatch, SetStateAction, createContext, useState} from 'react';

type SearchProps = {
    searchLocation: string | null,
    setSearchLocation: Dispatch<SetStateAction<string | null>>
}

type LocationContextProviderProps = {
    children: React.ReactNode;
}

export const LocationContext = createContext<SearchProps | null>(null);

export const LocationContextProvider = ({ children }: LocationContextProviderProps) => {
    const [searchLocation, setSearchLocation] = useState<string | null>(null);

    return (
        <LocationContext.Provider value={{ searchLocation, setSearchLocation }}>
            { children }
        </LocationContext.Provider>
    )
}