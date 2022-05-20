# Desafio Roommates

En esta prueba se ha creador un servidor con Node que sirve a una interfaz HTML que cuya temática está basada en el registro de gastos entre roommates y sus gastos.

IMPORTANTE: En el archivo send-mail.js, cambiar los campos de las lineas 17, 18, 22 y 23 con su correo y contraseña respectivamente para comprobar que se envie el correo.

### Habilidades a evaluar

 - Manipular archivos con File System 
 - Manejar errores
 - Construir una API RESTful
 - Manejar códigos de estado HTTP
 - Utilizar paquetes de npm

### Requerimientos

- Ocupar el módulo File System
- Capturar los errores para condicionar el código a través del manejo de excepciones
- El botón “Agregar roommate” de la aplicación cliente genera una petición POST (sin payload) esperando que el servidor registre un nuevo roommate random con la API randomuse
- El objeto correspondiente al usuario que se almacenará debe tener un id generado con el paquete UUID
- Crear una API REST
- Devolver los códigos de estado HTTP correspondientes a cada situación
- Enviar un correo electrónico a todos los roommates cuando se registre un nuevo gasto