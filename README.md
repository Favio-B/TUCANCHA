Descripción del Proyecto:

TU CANCHA es una plataforma web que permite a los usuarios reservar canchas de fútbol de manera fácil, rápida y sin intermediarios. El sistema ofrece funcionalidades como registro e inicio de sesión de usuarios, consulta de disponibilidad de canchas, gestión de reservas y administración de usuarios y canchas. Está diseñado para ser accesible desde dispositivos móviles y escritorio, con una interfaz intuitiva y segura.
El proyecto busca promover el deporte comunitario y facilitar la gestión de instalaciones deportivas, apoyándose en una arquitectura escalable y un modelo ágil de desarrollo.
Se adjuntan los enlaces correspondientes a la documentación técnica y funcional del proyecto TU CANCHA, dividida en dos partes para una mejor organización y comprensión del desarrollo del sistema.
📂 Estructura del Proyecto
El repositorio del proyecto TU CANCHA está organizado de la siguiente manera:

static/
 ├── img/                  # Imágenes utilizadas en la plataforma (logos y fotos de canchas)
 │    ├── hayuelos.png
 │    ├── modelia.png
 │    ├── parque el ruby.png
 │    ├── SALITRE.png
 │    ├── villemar.png
 │    └── logo.png
 ├── js/                   # Archivos JavaScript para manejo de funcionalidades
 │    ├── login.js         # Lógica de inicio de sesión
 │    ├── registro.js      # Lógica de registro de usuarios
 │    └── reservar.js      # Lógica de reservas de canchas
templates/                  # Plantillas HTML de la aplicación
 ├── 1_registro.html        # Página de registro de usuarios
 ├── 2_login.html           # Página de inicio de sesión
 ├── 3_bienvenida.html      # Página de bienvenida tras iniciar sesión
 ├── 4_reservar.html        # Página para realizar reservas
 └── editar_reserva.html    # Página para editar reservas existentes
app.py                      # Archivo principal de la aplicación (backend con Flask)
database.db                 # Base de datos SQLite con la información de usuarios y reservas
schema.sql                  # Script de creación de la base de datos


Notas adicionales:
La carpeta static/img contiene imágenes de las canchas disponibles para reservar.

Los archivos en static/js implementan la lógica de la aplicación en el cliente.

Las vistas (páginas web) están en templates/, siguiendo el flujo: registro → login → bienvenida → reserva.

app.py actúa como el servidor que sirve las páginas y gestiona las rutas principales de la aplicación.
🔗 Documentación Parte 1: https://docs.google.com/document/d/15c38m25QaABokXzHGOvgOSP50tmCd8YDfjw46I79sj0/edit?usp=sharing

🔗 Documentación Parte 2: https://docs.google.com/document/d/1sjwNEq5OkoIOw7wAbyo0hHKyy2dNDR70ioUZMSYYjE0/edit?usp=sharing

Estos documentos contienen toda la información relacionada con la planificación, modelado, codificación, pruebas y visión futura del proyecto.
