export type HourlyData = {
    hourly: {
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
    }[]
}