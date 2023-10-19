export type DailyData = {
    list: {
        dt: number,
        dt_txt: string,
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            humidity: number
        },
        clouds: {
            all: number
        }
        wind: {
            speed: number,
            deg: number
        },
        weather: {
            id: number,
            main: string,
            description: string,
            icon: string
        }[],
        rain?: {
            '1h': number
        }
    }[],
    city: {
        sunrise: number,
        sunset: number
    }
}

export type Params = {
    lat: number,
    lon: number,
    units: string
}

export type GroupedData = [
    string, {
        dt: number,
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            humidity: number
        },
        clouds: {
            all: number
        }
        wind: {
            speed: number,
            deg: number
        },
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
]