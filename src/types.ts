export interface WeatherData {
    coord: Coords,
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level?: number,
        grnd_level?: number
    },
    visibility: number,
    wind: Wind,
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export interface Coords {
    lon: number,
    lat: number
}

export interface Location {
    id: number,
    city: string,
    lat: number,
    lng: number,
    country: string,
    "city_ascii": string,
    "iso2": string,
    "iso3": string,
    "admin_name": string,
    "capital": string,
    "population": number,
}

export interface Wind {
    speed: number,
    deg: number,
    gust?: number
}

