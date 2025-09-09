# 🏆 TU CANCHA

**TU CANCHA** es una plataforma web que permite a los usuarios reservar canchas de fútbol de manera fácil, rápida y sin intermediarios.  
El sistema ofrece funcionalidades como registro e inicio de sesión de usuarios, consulta de disponibilidad de canchas, gestión de reservas y administración de usuarios y canchas.  
Está diseñado para ser accesible desde dispositivos móviles y escritorio, con una interfaz intuitiva y segura.  
El proyecto busca promover el deporte comunitario y facilitar la gestión de instalaciones deportivas, apoyándose en una arquitectura escalable y un modelo ágil de desarrollo.

## 📂 Estructura del Proyecto
```
TUCANCHA/
├── app.py                    # Servidor Flask (backend)
├── database.db              # Base de datos SQLite
├── schema.sql               # Script de creación de la base de datos
├── README.md                # Este archivo
└── frontend/                # Aplicación React (frontend)
    ├── public/              # Archivos públicos
    │   ├── img/             # Imágenes de canchas
    │   │   ├── hayuelos.png
    │   │   ├── modelia.png
    │   │   ├── parque el ruby.png
    │   │   ├── SALITRE.png
    │   │   ├── villemar.png
    │   │   └── logo.png
    │   ├── index.html       # Plantilla HTML principal
    │   └── manifest.json    # Configuración PWA
    ├── src/                 # Código fuente React
    │   ├── components/      # Componentes React
    │   │   ├── Bienvenida.js
    │   │   ├── EditarReserva.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Reservar.js
    │   ├── App.js           # Componente principal
    │   └── index.js         # Punto de entrada
    ├── build/               # Build de producción (generado)
    ├── package.json         # Dependencias del frontend
    └── README.md            # Documentación del frontend
```
## ✅ Requisitos previos
- Python 3.x instalado
- pip instalado
- Node.js 14+ instalado
- npm instalado
- Recomendado: crear un entorno virtual (venv)

## 🛠️ Tecnologías usadas
### Backend
- Python + Flask
- SQLite
- Flask-Mail para notificaciones por correo

### Frontend
- React 18+
- JavaScript ES6+
- CSS3
- React Router para navegación SPA

### Herramientas
- Create React App
- npm para gestión de dependencias
## 🚀 Ejecución del Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/Favio-B/TUCANCHA.git
cd TUCANCHA
```

### 2. Configurar Backend (Flask)
```bash
# Crear entorno virtual (recomendado)
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias del backend
pip install flask flask-mail
```

### 3. Configurar Frontend (React)
```bash
# Navegar a la carpeta del frontend
cd frontend

# Instalar dependencias de React
npm install

# Construir la aplicación para producción
npm run build

# Volver al directorio raíz
cd ..
```

### 4. Ejecutar la aplicación
```bash
# Desde el directorio raíz del proyecto
python app.py
```

La aplicación estará disponible en: `http://localhost:5000`

### 🔧 Desarrollo
Para desarrollo con hot-reload del frontend:
```bash
# Terminal 1: Backend
python app.py

# Terminal 2: Frontend (en la carpeta frontend/)
npm start
```
## 📌 Flujo de la aplicación

La aplicación es una **Single Page Application (SPA)** construida con React que se comunica con un backend Flask a través de APIs REST.

### Navegación
- **`/`** - Página principal (redirige a login si no está autenticado)
- **`/login`** - Página de inicio de sesión
- **`/register`** - Página de registro de usuarios
- **`/bienvenida`** - Dashboard principal (requiere autenticación)
- **`/reservar_page`** - Página para crear nuevas reservas
- **`/editar_reserva/:id`** - Página para editar reservas existentes

### Flujo de usuario
1. **Registro/Login**: El usuario se registra o inicia sesión
2. **Autenticación**: El backend valida las credenciales y crea una sesión
3. **Dashboard**: Una vez autenticado, accede al panel principal donde puede ver sus reservas
4. **Gestión de reservas**: Puede crear nuevas reservas o editar las existentes
5. **Notificaciones**: Recibe confirmaciones por correo electrónico

### Arquitectura
- **Frontend**: React maneja la interfaz de usuario y el enrutamiento
- **Backend**: Flask sirve las APIs REST y maneja la lógica de negocio
- **Base de datos**: SQLite almacena usuarios y reservas
- **Comunicación**: JSON a través de APIs REST entre frontend y backend


🔗 Documentación Parte 1: https://docs.google.com/document/d/15c38m25QaABokXzHGOvgOSP50tmCd8YDfjw46I79sj0/edit?usp=sharing
🔗 Documentación Parte 2: https://docs.google.com/document/d/1sjwNEq5OkoIOw7wAbyo0hHKyy2dNDR70ioUZMSYYjE0/edit?usp=sharing

Estos documentos contienen toda la información relacionada con la planificación, modelado, codificación, pruebas y visión futura del proyecto.
