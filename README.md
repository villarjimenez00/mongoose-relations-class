# Deploy a Heroku



### 1. signup en https://www.heroku.com


### 2. Creación de una nueva app en heroku


### 3. Instalación de heroku CLI


### 4. Configuración de heroku CLI en la terminal.

  ```
  $ heroku login
  ```
  
### 5. configuración remota de git del proyecto para heroku
  ```
    $ heroku git:remote -a <nombre de la app en heroku>
  ```
  
### 6. Configuración de mongoDB.

 #### 6.1. Introducir tarjeta de crédito en Account settings/Billing.
 
 #### 6.2. Configuración de mongolab (servicio que permite una base de datos de mongoDB en producción)
 ```
    $ heroku addons:create mongolab:sandbox
 ```
 
 #### 6.3. Abrimos la instancia de Mongolab
 ```
    $ heroku addons:open mongolab
 ```
 
 #### 6.4. Configuramos la variable de entorno de mongoDB en heroku
 
 ```
    $ heroku config:get MONGODB_URI
 ```
 
 #### 6.5. Configuramos la variable de entorno MONGODB_URI en local
 
 
