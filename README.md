# Event Factorial - Система управления мероприятиями

Добро пожаловать в систему управления мероприятиями! Этот проект представляет собой веб-приложение, которое обеспечивает удобное управление мероприятиями в городе Алматы. Пользователи могут легко [просматривать предстоящие события](#главная-страница), [регистрироваться на них](#регистрация-на-события), [управлять своими бронированиями](#страница-управление-билетами) и [управлять учетными записями](#страница-login).

## Базовая инструкция по локальному развертыванию 
Этот проект был создан с помощью [Angular CLI](https://github.com/angular/angular-cli) версии 17.3.6.

Для оптимальной сборки и развертывания приложения, используйте Angular DevKit.Выполните следующую команду в терминале, находясь в ```front``` директории проекта:

Открываем первый терминал для `node`:


```cd front```

```npm install --save-dev @angular-devkit/build-angular```


## Запуск сервера разработки

Запустите `ng serve` для запуска сервера разработки. Перейдите по адресу `http://localhost:4200/`. Приложение будет автоматически перезагружаться при изменении исходных файлов.

## Создание компонентов

Вы можете использовать `ng generate component component-name` для создания нового компонента. Также вы можете использовать `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Сборка проекта

Запустите `ng build` для сборки проекта. Собранные файлы будут храниться в директории `dist/`.

## Запуск модульных тестов

Запустите `ng test` для выполнения модульных тестов с помощью [Karma](https://karma-runner.github.io).

## Запуск интеграционных тестов

Запустите `ng e2e` для выполнения интеграционных тестов на платформе вашего выбора. Для использования этой команды сначала нужно добавить пакет, реализующий возможности интеграционного тестирования.

## Получение дополнительной помощи

Для получения дополнительной помощи по Angular CLI используйте `ng help` или посетите страницу [Angular CLI Overview and Command Reference](https://angular.io/cli).

## Django 

Создаем второй терминал для `python` (`ng serve` запущен):

```cd backend```


```python manage.py runserver```

# В целом
Веб-приложение создано с помощью фронтенд-фреймковорка Angular и бэкенд-фреймворка Django. 
Данные взяты из [sxodim](https://sxodim.com/almaty). 

## Этапы разработки
Frontend сторона была собрана на компонентах и сервисах(которые связывают frontend и backend api). Компоненты: 
 * [home-page](#главная-страница) - компонент, отвечающий за события. 
 * [booking](#страница-управление-билетами) - компонент, отвечающий за управлениями билетов. Билеты пользователя - это те события, на которые пользователь зарегестрировался.
 * delete-success - активируется когда пользователь нажимает на кнопку **Удалить** на странице **Управление билетами**
 * success-page - активируется когда пользователь нажимает на кнопку **Регистрация / Хочу пойти** на **главной странице**

Навигация между страницами построена на ```RouterModule```. Получение информаций из backend Django благодаря ```Observable``` и ```HttpClient```, кастомным сервисам(```ticket.service.ts```, ```event.service.ts```) с помощью которых делаются ```GET``` запросы. Удаление билета/ регистрация на событие/ логин работают благодаря кастомным сервисам(```ticket.service.ts```, ```event.service.ts```) с помощью которых делаются ```POST``` запросы.

![alt text](./preview/terminal_outs.png)

Для [авторизации](#страница-login) использовано Django Rest framework Simple JWT: ```TokenObtainPairView, TokenRefreshView```, Cross-Origin Resource Sharing(CORS) и токены доступа:
Когда пользователь пытается войти в систему, его имя пользователя и пароль отправляются на серверную конечную точку входа. Метод ```login(username: string, password: string):``` отправляет POST-запрос к конечной точке входа на сервере ```/api/login/``` с предоставленным именем пользователя и паролем. Он ожидает получить Observable типа Token(кастомный интерфейс) в качестве ответа.
Если учетные данные верны, сервер отвечает токеном, содержащим токены доступа и обновления.
Сервис Angular сохраняет эти токены в localStorage браузера.
При повторном посещении приложения токен доступа извлекается из localStorage. Если он существует, пользователь считается вошедшим в систему.


В админке Django (`admin.py`) я создала классы `EventAdmin` и `TicketAdmin`, которые определяют, как модели `Event` и `Ticket` будут отображаться в административном интерфейсе. Это облегчает управление этими моделями для администратора сайта.

Модели `Event` и `Ticket` определены в файле `models.py`. Я использовала модели для описания сущностей приложения, таких как события и билеты на эти события.

Для сериализации моделей в формат JSON создала классы `EventSerializer` и `TicketSerializer` в файле `serializers.py`. Это необходимо для взаимодействия с данными в формате JSON в API.

Также определила несколько эндпоинтов API в файле `views.py`, таких как получение списка событий, получение отдельного события, регистрация пользователя на событие и удаление бронирования билета. Event добавляется в admin панеле по адресу `http://127.0.0.1:8000/admin/`

Сериализеры преобразуют объекты моделей Django в формат, который может быть легко обработан и передан через веб-сервисы. Это упрощает взаимодействие между клиентом и сервером, позволяя передавать данные в формате JSON.

### Страница "Login"
***username:*** swnazzy

***password:*** 111
![alt text](./preview/image-8.png)
### Главная страница
Если события на главной странице не открываются, нужно будет нажать на кнопку "**Выход**" в правом верхнем углу, авторизоваться снова, тогда события будут отображены.
![alt text](./preview/image-9.png)
![alt text](./preview/image_home2.png)
### Регистрация на события
При наведении курсора на кнопку **Регистрация / Хочу пойти** кнопка засвечивается 
![alt text](./preview/image-10.png)
При нажатии на кнопку **Регистрация / Хочу пойти** навигация переходит на компонент **success-page**
![alt text](/preview/rega.png)
### Страница "**Управление билетами**"
 ![alt text](./preview/image.png) 
![alt text](./preview/image-5.png)
![alt text](./preview/image-6.png)
 Пользователь может удалить билет и просмотреть детали билета(на какое событие регистрировался, где пройдет событие, когда оно будет и т.д):
![alt text](./preview/image-2.png)
 При нажатии на **удалить билет**, билет успешно удаляется у самого пользователя, номер билета удаляется и тот билет не будет отображаться на странице **Управление билетами**. После удаления билета на [главной странице](#главная-страница) к событию, к которому был привязан билет который удалился, прибавляется место(**Билеты доступны** становятся на один билет больше):
 ![alt text](./preview/image-3.png)
 ![alt text](./preview/image-4.png)

Можно вернуться на главную страницу где отображаются события, нажав на кнопку **Вернуться на главную страницу**
![alt text](./preview/image-7.png)