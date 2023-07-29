import {WeatherData} from "@/types";

export default {
    "coord": {
        "lon": 57.1522,
        "lat": 65.5272
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 21.94,
        "feels_like": 21.5,
        "temp_min": 21.94,
        "temp_max": 21.94,
        "pressure": 1004,
        "humidity": 50,
        "sea_level": 1004,
        "grnd_level": 999
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.69,
        "deg": 353,
        "gust": 7.14
    },
    "clouds": {
        "all": 100
    },
    "dt": 1690532177,
    "sys": {
        "country": "RU",
        "sunrise": 1690497974,
        "sunset": 1690566558
    },
    "timezone": 10800,
    "id": 583744,
    "name": "Akis'",
    "cod": 200
} as WeatherData