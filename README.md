#                                               PROYECTO FINAL CODERHOUSE

# Backend de Ecommerce

¡Bienvenido al backend de nuestro e-commerce!

Esta aplicación está diseñada para respaldar las funciones esenciales de nuestro e-commerce, como la gestión de productos, pedidos, usuarios y más. Está construida utilizando Node js y Express como framework y se integra con una base de datos MongoDB para proporcionar una solución completa y eficiente para nuestra tienda en línea.

## Características

    - Gestión de productos
    - Administración de pedidos
    - Autenticación y autorización de usuarios

## INSTALACIÓN
Para instalar la app es necesario descargar los archivos del repositorio o bien, si se utiliza la aplicación Git, se puede clonar el repositorio directamente desde consola.

A través del siguiente link se puede acceder al proyecto: [a link] https://github.com/Giovi-22/Proyecto-final-Backend

Una vez dentro del repositorio se puede hacer click en el botón "<>Code" en donde se descarga el proyecto en formato .zip como así también se puede copiar el link para realizar el clonado a través de Git.

Descargado el proyecto, abrir la consola de comandos, ingresar a la carpeta principal del proyecto y ejecutar los siguientes comandos:

    * $ cd <dirección a la carpeta principal del proyecto> 
    * $ npm install - para instalar la aplicación y sus dependencias. 
    * ....
    * Una vez completada la instalación ejecute el comando 
    * $ npm run dev - para correr la aplicación.
## Documentación

Para acceder a la documentación de nuestra API puede acceder al siguiente link:
    http://localhost:8083/apidocs/

## Comandos de inicio

#### -- addUser
``
npm run command --addUser
``

Se utiliza para crear un usuario administrador en la aplicación. 
Es necesario crear el administrador pasando los siguientes parámetros al comando:

    -e, --email < email del usuario >
    -fn, --firstName < nombre del usuario>
    -ln, --lastName < apellido del usuario >
    -p, --password < password del usuario >
    -a, --age < edad del usuario >
    -ia, --isAdmin < si se coloca este parámetro el usuario se crea como administrador>

Ejemplo:
``````Shell
npm run command -- addUser -e admin@admin.com -fn admin -ln admin -p 12345678 -a 34 -ia

``````

#### -- setAdmin
``
npm run command -- setAdmin
``

Permite asignar el permiso de administrador a un usuario existente.
Se debe pasar al comando el email del usuario como parámetro.

Ejemplo:

``
npm run command -- setAdmin -e usuario_x@prueba.com
``