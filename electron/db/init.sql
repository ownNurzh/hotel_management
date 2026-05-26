PRAGMA foreign_keys = ON;

--User
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    first_name TEXT NOT NULL,
    second_name TEXT NOT NULL,

    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT OR IGNORE INTO roles (name) VALUES ('admin');
INSERT OR IGNORE INTO roles (name) VALUES ('reception');

--Room

CREATE TABLE IF NOT EXISTS room_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    capacity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    room_number TEXT UNIQUE NOT NULL,
    room_type_id INTEGER NOT NULL,
    status INTEGER NOT NULL DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (room_type_id) REFERENCES room_types(id)
);

--Guest

CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    first_name TEXT NOT NULL,
    second_name TEXT NOT NULL,

    document_number TEXT UNIQUE NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--Reservation

CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    guest_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,

    check_in DATE NOT NULL,
    check_out DATE NOT NULL,

    status INTEGER NOT NULL DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);