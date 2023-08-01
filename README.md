# weather-app

Виджет для отображения информации о погоде в выбранном регионе.

Для использования виджета достаточно скопировать приведенный блок кода на HTML-страницу.
```
<weather-widget/>
<script src="http://cdn.jsdelivr.net/gh/dzyabenkoea/weather-widget/dist/weather-widget.umd.min.js"/>
```

## Главный экран

![img.png](./readme-images/img.png)

## Настройка городов

![img_1.png](./readme-images/img_1.png)

### Добавление города

![img_2.png](./readme-images/img_2.png)

![img_3.png](./readme-images/img_3.png)

![img_4.png](./readme-images/img_4.png)

Поднимем добавленный город вверх, чтобы отобразить погоду в нем:

![img_5.png](./readme-images/img_5.png)

![img_6.png](./readme-images/img_6.png)

## Вывод ошибок

### Ошибка получения данных

![img.png](./readme-images/retrieve-fail.png)

### Не указан API-ключ

![img_1.png](./readme-images/api-key-not-set.png)

---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
