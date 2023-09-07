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

Para acceder a la documentación de la api:

    url-server/apidocs/

# NOTAS
Solamente usuarios registrados en la app tienen acceso a generar un carrito de compras. 

Solamente el administrador o el usuario que creo el carrito puede agregar, actualizar, borrar productos de este.

Una vez finalizado el carrito a través del endpoint

    url-server/api/carts/:cid/purchase

se genera una respuesta que contiene un arreglo con los productos disponibles y no disponibles antes de realizar la compra.

Si el usuario  desea finalizar la compra, solo se incluirán los productos que estan disponibles.

El flujo de compra sería:

    url-server/api/carts/               - crear el carrito
    url-server/api/carts/:cid/:pid      - agregar un producto al carrito
    url-sever/api/carts:cid             - agregar varios productos al carrito.(ver documentacion!)
    url-server/api/carts/:cid/purchase  - finalizar el carrito. (productos diponibles y no disponibles)
    url-server/api/tickets/:cid         - Generara el ticket pasando el id del carrito que se desea comprar

Al finalizar el proceso de compra,  se manda un email al usuario con los detalles del ticket.

![Ticket generado](https://github.com/Giovi-22/Proyecto-final-Backend/assets/98109747/bbfeaa55-ac35-4e4a-8fd8-37ac507e3a72)


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
