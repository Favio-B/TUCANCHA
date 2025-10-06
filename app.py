from flask import Flask, request, redirect, url_for, session, jsonify, g, send_from_directory
from flask_mail import Mail, Message
from flask_cors import CORS
import sqlite3
import hashlib
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.secret_key = os.urandom(24)
DATABASE = 'database.db'

# Configuración del correo
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'tu.cancha.bog@gmail.com'
app.config['MAIL_PASSWORD'] = 'ktsa ucci cjrb dhob'
app.config['MAIL_DEFAULT_SENDER'] = ('Tu Cancha', 'tu.cancha.bog@gmail.com')

mail = Mail(app)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def verify_password(stored_password_hash, provided_password):
    return stored_password_hash == hashlib.sha256(provided_password.encode('utf-8')).hexdigest()

# Static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('frontend/build/static', filename)

@app.route('/static/js/<filename>')
def serve_js(filename):
    return send_from_directory('frontend/build/static/js', filename)

@app.route('/static/css/<filename>')
def serve_css(filename):
    return send_from_directory('frontend/build/static/css', filename)

@app.route('/static/img/<filename>')
def serve_img(filename):
    return send_from_directory('frontend/build/img', filename)

@app.route('/manifest.json')
def serve_manifest():
    return send_from_directory('frontend/build', 'manifest.json')

@app.route('/favicon.ico')
def serve_favicon():
    return send_from_directory('frontend/build', 'favicon.ico')

@app.route('/logo192.png')
def serve_logo192():
    return send_from_directory('frontend/build', 'logo192.png')

@app.route('/logo512.png')
def serve_logo512():
    return send_from_directory('frontend/build', 'logo512.png')

@app.route('/robots.txt')
def serve_robots():
    return send_from_directory('frontend/build', 'robots.txt')

# React routes - serve React for all main pages
@app.route('/')
def index():
    return send_from_directory('frontend/build', 'index.html')

@app.route('/login')
def login_page():
    return send_from_directory('frontend/build', 'index.html')

@app.route('/register')
def register_page():
    return send_from_directory('frontend/build', 'index.html')

@app.route('/bienvenida')
def bienvenida():
    return send_from_directory('frontend/build', 'index.html')

@app.route('/reservar_page')
def reservar_page_get():
    return send_from_directory('frontend/build', 'index.html')

@app.route('/editar_reserva/<int:reserva_id>')
def editar_reserva(reserva_id):
    return send_from_directory('frontend/build', 'index.html')

# API endpoints for React
@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Correo y contraseña son obligatorios.'}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if user:
        return jsonify({'message': 'El correo electrónico ya está registrado.'}), 409

    hashed_pw = hash_password(password)
    try:
        cursor.execute("INSERT INTO users (email, password_hash) VALUES (?, ?)", (email, hashed_pw))
        db.commit()
        return jsonify({'message': 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.'}), 201
    except sqlite3.Error as e:
        db.rollback()
        return jsonify({'message': f'Error en la base de datos: {e}'}), 500

@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Correo y contraseña son obligatorios.'}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if user and verify_password(user['password_hash'], password):
        session['user_id'] = user['id']
        session['user_email'] = user['email']
        return jsonify({'message': 'Inicio de sesión exitoso.', 'user': {'id': user['id'], 'email': user['email']}}), 200
    else:
        return jsonify({'message': 'Correo o contraseña incorrectos.'}), 401

@app.route('/api/bienvenida')
def api_bienvenida():
    if 'user_id' not in session:
        return jsonify({'message': 'No autorizado'}), 401

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        SELECT id, name, email, phone, location, reservation_time, reservation_date
        FROM reservations
        WHERE user_id = ?
        ORDER BY reservation_date, reservation_time
    """, (session['user_id'],))
    reservas = [dict(row) for row in cursor.fetchall()]

    return jsonify({
        'user': {'email': session['user_email']},
        'reservas': reservas
    })

@app.route('/api/reservas/<int:reserva_id>')
def api_get_reserva(reserva_id):
    if 'user_id' not in session:
        return jsonify({'message': 'No autorizado'}), 401

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM reservations WHERE id = ? AND user_id = ?", (reserva_id, session['user_id']))
    reserva = cursor.fetchone()
    
    if not reserva:
        return jsonify({'message': 'Reserva no encontrada'}), 404
    
    return jsonify(dict(reserva))

# Keep the old routes for backward compatibility but redirect to APIs
@app.route('/login', methods=['POST'])
def login_post():
    return api_login()


@app.route('/submit_reservation', methods=['POST'])
def submit_reservation():
    if 'user_id' not in session:
        return jsonify({'message': 'No autorizado. Debes iniciar sesión.'}), 401

    try:
        data = request.get_json()
        nombre = data.get('nombre')
        email = data.get('email')
        telefono = data.get('telefono')
        ubicacion = data.get('ubicacion')
        hora = data.get('hora')
        fecha = data.get('fecha')
        user_id = session['user_id']

        if not all([nombre, email, ubicacion, hora, fecha]):
            return jsonify({'message': 'Todos los campos (excepto teléfono) son obligatorios.'}), 400

        db = get_db()
        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO reservations (user_id, name, email, phone, location, reservation_time, reservation_date)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (user_id, nombre, email, telefono, ubicacion, hora, fecha))
        db.commit()

        msg = Message(
            subject='Confirmación de Reserva - Tu Cancha',
            recipients=[email],
            body=f"""Hola {nombre},

Tu reserva ha sido confirmada

Ubicación: {ubicacion}
Fecha: {fecha}
Hora: {hora}

Gracias por reservar con Tu Cancha
""")
        mail.send(msg)

        return jsonify({'message': 'Reserva realizada con éxito. Se envió confirmación por correo electrónico.'}), 201

    except sqlite3.Error as e:
        db.rollback()
        return jsonify({'message': f'Error al guardar la reserva: {e}'}), 500
    except Exception as e:
        return jsonify({'message': f'Error inesperado: {str(e)}'}), 500

@app.route('/api/eliminar_reserva/<int:reserva_id>', methods=['POST'])
def api_eliminar_reserva(reserva_id):
    if 'user_id' not in session:
        return jsonify({'message': 'No autorizado'}), 401

    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM reservations WHERE id = ? AND user_id = ?", (reserva_id, session['user_id']))
    db.commit()
    return jsonify({'message': 'Reserva eliminada exitosamente'})

@app.route('/api/actualizar_reserva/<int:reserva_id>', methods=['POST'])
def api_actualizar_reserva(reserva_id):
    if 'user_id' not in session:
        return jsonify({'message': 'No autorizado'}), 401

    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    telefono = data.get('telefono')
    ubicacion = data.get('ubicacion')
    hora = data.get('hora')
    fecha = data.get('fecha')

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        UPDATE reservations
        SET name = ?, email = ?, phone = ?, location = ?, reservation_time = ?, reservation_date = ?
        WHERE id = ? AND user_id = ?
    """, (nombre, email, telefono, ubicacion, hora, fecha, reserva_id, session['user_id']))
    db.commit()
    return jsonify({'message': 'Reserva actualizada exitosamente'})

@app.route('/api/logout')
def api_logout():
    session.pop('user_id', None)
    session.pop('user_email', None)
    return jsonify({'message': 'Sesión cerrada exitosamente'})

# Catch-all route for React Router (must be last)
@app.route('/<path:path>')
def serve_react_app(path):
    return send_from_directory('frontend/build', 'index.html')

if __name__ == '__main__':
    if not os.path.exists(DATABASE):
        with open('schema.sql', 'w') as f:
            f.write("""
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS reservations;

            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            );

            CREATE TABLE reservations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                location TEXT NOT NULL,
                reservation_time TEXT NOT NULL,
                reservation_date TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
            """)
        init_db()
        print("Base de datos inicializada.")

    app.run(debug=True)
