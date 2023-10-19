export type LocationData = {
    lat: number,
    lon: number
}

export type ThisWeekData = {
    daily: {
        feels_like: {
            day: number
        },
        humidity: number,
        pressure: number,
        clouds: number,
        temp: {
            day: number,
            night: number,
            max: number,
            min: number
        },
        summary: string,
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
    }[]
}

export type Params = {
    lat: number,
    lon: number,
    exclude: string,
    units: string
}