export type LocationData = {
    lat: number,
    lon: number,
    name: string,
    state: string
}

export type CurrentData = {
    current: {
        feels_like: number,
        humidity: number,
        pressure: number,
        clouds: number,
        temp: number,
        sunset: number,
        sunrise: number,
        dt: number,
        wind_speed: number,
        wind_deg: number,
        weather: {
            id: number,
            main: string,
            description: string,
            icon: string
        }[],
        rain?: {
            '1h': number
        }
    }
}

export type Params = {
    lat: number,
    lon: number,
    exclude: string,
    units: string
}