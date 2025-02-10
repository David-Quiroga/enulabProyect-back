-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
-- );

-- Crear la tabla de Menús
--CREATE TABLE menus (
--    id SERIAL PRIMARY KEY,
--    name VARCHAR(255) NOT NULL,
--    description TEXT NOT NULL
--);
--
---- Crear la tabla de Platos (Dishes)
--CREATE TABLE dishes (
--    id SERIAL PRIMARY KEY,
--    menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
--    name VARCHAR(255) NOT NULL,
--    description TEXT NOT NULL
--);
--
---- Crear la tabla de Postres (Desserts)
--CREATE TABLE desserts (
--    id SERIAL PRIMARY KEY,
--    dish_id INTEGER REFERENCES dishes(id) ON DELETE CASCADE,
--    name VARCHAR(255) NOT NULL,
--    description TEXT NOT NULL
--);
-- Crea la tabla de restaurante (restaurant)
/*
CREATE TABLE restaurant (
    id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    ubicacion VARCHAR(255),
    objetivos TEXT,
    logo VARCHAR(500),
    descripcion TEXT
);
-- Crea la tabla empleados (employee)
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurant(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    cedula VARCHAR(10) UNIQUE NOT NULL,
    edad INTEGER, 
    genero VARCHAR(20), 
    sueldo DECIMAL(10,2),
    telefono VARCHAR(15),
    horario VARCHAR(100)
);
-- Crea la tabla inventario (inventory)
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurant(id) ON DELETE CASCADE, 
    nombreProductos VARCHAR(500),
    cantidad INTEGER,
    categoria VARCHAR(500),
    descripcion TEXT
);
-- Crea la tabla usuarios (users)
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	nombreCompleto VARCHAR(100),
	correoElectronico VARCHAR(100) UNIQUE,
	password VARCHAR(10),
	ruc VARCHAR(30),
	contacto VARCHAR(30)
	);

-- Crea la tabla de proveedores
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurant(id) ON DELETE CASCADE,
    namesupplier VARCHAR(255),
    numcontact VARCHAR(20),
    email VARCHAR(255),
    direction TEXT,
    city VARCHAR(100),
    country VARCHAR(100)

);

-- Crea la tabla de tipo de comida

CREATE TABLE food_type (
    id SERIAL PRIMARY KEY,
     menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
    name_type VARCHAR(255) ,
    state BOOLEAN NOT NULL DEFAULT TRUE,
    descripcion VARCHAR(255)
);

-- Crea la tabla de reserva
CREATE TABLE reserve(
	id SERIAL PRIMARY KEY,
	restaurant_id INTEGER REFERENCES restaurant(id) ON DELETE CASCADE,
	name VARCHAR (200) NOT NULL,
	date TIMESTAMP,
	people INTEGER,
	comments TEXT	
)
-- Create the Comment table
CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurant(id) ON DELETE CASCADE,
    rating VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    content TEXT
);

*/