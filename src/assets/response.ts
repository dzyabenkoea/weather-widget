import {WeatherData} from "@/types";

export default {
    "coord": {
        "lon": 65.5333,
        "lat": 57.15
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 26.85,
        "feels_like": 26.57,
        "temp_min": 26.85,
        "temp_max": 27.04,
        "pressure": 1008,
        "humidity": 36,
    },
    "visibility": 10000,
    "wind": {
        "speed": 6,
        "deg": 10
    },
    "clouds": {
        "all": 0
    },
    "dt": 1690633439,
    "sys": {
        "type": 2,
        "id": 49589,
        "country": "RU",
        "sunrise": 1690586924,
        "sunset": 1690646385
    },
    "timezone": 18000,
    "id": 1488754,
    "name": "Tyumen",
    "cod": 200
} as WeatherData