**Bookmarks app**

Vue.js frontend

**Installation**

Clone repository to your folder

Copy **.env.development.example** or **.env.production.example**, to **.env.development** or **.env.production** 
It depends on what you need.

Edit them with your settings. Change **VUE_APP_API_HOST** with your laravel url. 
Change **VUE_APP_CLIENT_ID** and **VUE_APP_CLIENT_SECRET** with those from command 

`php artisan passport:install`

Install dependencies

`npm install`

_(install npm first... Duh! https://nodejs.org/en/)_ 

**Run the application development environment**

`npm run serve`

or 

**Run the application production environment**

`npm run build`

You can use docker (with apache) to install vue
https://bitbucket.org/rocean/apache-for-vue-app

You can find the backend code (Laravel API) here https://bitbucket.org/rocean/bookmarks-api