CREATE DATABASE EcoMarket_app;
USE EcoMarket_app;

-- =============================================
-- TABLA: Roles
-- =============================================

CREATE TABLE Roles (
    rol_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: Usuarios
-- =============================================
CREATE TABLE Usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    rol_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    codigo_postal VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_login TIMESTAMP NULL,
    esta_activo BOOLEAN DEFAULT TRUE,
    es_verificado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id)
);

-- =============================================
-- TABLA: Categorias
-- =============================================
CREATE TABLE Categorias (
    categoria_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    esta_activa BOOLEAN DEFAULT TRUE
);

-- =============================================
-- TABLA: Productos
-- =============================================
CREATE TABLE Productos (
    producto_id INT PRIMARY KEY AUTO_INCREMENT,
    vendedor_id INT NOT NULL,
    categoria_id INT NOT NULL,
    nombre_producto VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    precio_original DECIMAL(10,2),
    stock INT NOT NULL DEFAULT 0,
    imagen_principal VARCHAR(255),
    imagenes_secundarias JSON,
    es_organico BOOLEAN DEFAULT FALSE,
    es_vegano BOOLEAN DEFAULT FALSE,
    certificaciones JSON,
    peso DECIMAL(8,2),
    unidad_medida VARCHAR(20),
    calificacion_promedio DECIMAL(3,2) DEFAULT 0,
    total_calificaciones INT DEFAULT 0,
    esta_activo BOOLEAN DEFAULT TRUE,
    esta_verificado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendedor_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id),
    INDEX idx_categoria (categoria_id),
    INDEX idx_vendedor (vendedor_id),
    INDEX idx_activo_verificado (esta_activo, esta_verificado)
);

-- =============================================
-- TABLA: CarritoCompras
-- =============================================
CREATE TABLE CarritoCompras (
    carrito_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- =============================================
-- TABLA: ItemsCarrito
-- =============================================
CREATE TABLE ItemsCarrito (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (carrito_id) REFERENCES CarritoCompras(carrito_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    UNIQUE KEY unique_carrito_producto (carrito_id, producto_id)
);

-- =============================================
-- TABLA: Cupones (DEBE CREARSE ANTES DE Ordenes)
-- =============================================
CREATE TABLE Cupones (
    cupon_id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    tipo_descuento ENUM('porcentaje', 'monto_fijo') NOT NULL,
    valor_descuento DECIMAL(10,2) NOT NULL,
    maximo_descuento DECIMAL(10,2),
    min_compra DECIMAL(10,2) DEFAULT 0,
    usos_maximos INT,
    usos_actuales INT DEFAULT 0,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_codigo_activo (codigo, esta_activo)
);

-- =============================================
-- TABLA: Ordenes (AHORA SÍ PUEDE REFERENCIAR Cupones)
-- =============================================
CREATE TABLE Ordenes (
    orden_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    estado ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    total DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    impuestos DECIMAL(10,2) NOT NULL,
    costo_envio DECIMAL(10,2) DEFAULT 0,
    direccion_envio TEXT NOT NULL,
    ciudad_envio VARCHAR(100) NOT NULL,
    pais_envio VARCHAR(100) NOT NULL,
    codigo_postal_envio VARCHAR(20) NOT NULL,
    metodo_pago ENUM('tarjeta', 'paypal', 'transferencia') NOT NULL,
    cupon_id INT NULL,
    descuento_aplicado DECIMAL(10,2) DEFAULT 0,
    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (cupon_id) REFERENCES Cupones(cupon_id),
    INDEX idx_usuario_estado (usuario_id, estado)
);

-- =============================================
-- TABLA: DetallesOrden
-- =============================================
CREATE TABLE DetallesOrden (
    detalle_id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES Ordenes(orden_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    INDEX idx_orden (orden_id)
);

-- =============================================
-- TABLA: Reseñas
-- =============================================
CREATE TABLE Reseñas (
    reseña_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    orden_id INT NOT NULL,
    calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    es_verificado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    FOREIGN KEY (orden_id) REFERENCES Ordenes(orden_id),
    UNIQUE KEY unique_usuario_producto_orden (usuario_id, producto_id, orden_id),
    INDEX idx_producto_calificacion (producto_id, calificacion)
);

-- =============================================
-- TABLA: Wishlist
-- =============================================
CREATE TABLE Wishlist (
    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    UNIQUE KEY unique_usuario_producto (usuario_id, producto_id)
);

-- =============================================
-- TABLA: CuponesUsados
-- =============================================
CREATE TABLE CuponesUsados (
    cupon_usado_id INT PRIMARY KEY AUTO_INCREMENT,
    cupon_id INT NOT NULL,
    usuario_id INT NOT NULL,
    orden_id INT NOT NULL,
    fecha_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cupon_id) REFERENCES Cupones(cupon_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (orden_id) REFERENCES Ordenes(orden_id),
    UNIQUE KEY unique_cupon_orden (cupon_id, orden_id)
);

-- =============================================
-- NUEVAS TABLAS PARA REQUERIMIENTOS FALTANTES
-- =============================================

-- TABLA: SeguimientoEnvios
CREATE TABLE SeguimientoEnvios (
    seguimiento_id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT NOT NULL,
    estado_envio ENUM('preparando', 'en_transito', 'en_reparto', 'entregado', 'devuelto') DEFAULT 'preparando',
    ubicacion_actual VARCHAR(255),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fecha_estimada_entrega DATE,
    codigo_seguimiento VARCHAR(100) UNIQUE,
    transportista VARCHAR(100),
    FOREIGN KEY (orden_id) REFERENCES Ordenes(orden_id),
    INDEX idx_orden_estado (orden_id, estado_envio)
);

-- TABLA: Notificaciones
CREATE TABLE Notificaciones (
    notificacion_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo ENUM('orden', 'envio', 'promocion', 'sistema') NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_leida TIMESTAMP NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    INDEX idx_usuario_leida (usuario_id, leida)
);

-- TABLA: Devoluciones
CREATE TABLE Devoluciones (
    devolucion_id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT NOT NULL,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    motivo TEXT NOT NULL,
    estado ENUM('solicitada', 'en_revision', 'aprobada', 'rechazada', 'reembolsada') DEFAULT 'solicitada',
    monto_reembolso DECIMAL(10,2),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion TIMESTAMP NULL,
    comentario_admin TEXT,
    FOREIGN KEY (orden_id) REFERENCES Ordenes(orden_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    INDEX idx_estado (estado)
);

-- TABLA: TransaccionesPagos
CREATE TABLE TransaccionesPagos (
    transaccion_id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT NOT NULL,
    metodo_pago ENUM('tarjeta', 'paypal', 'transferencia') NOT NULL,
    estado ENUM('pendiente', 'completado', 'fallido', 'reembolsado') DEFAULT 'pendiente',
    monto DECIMAL(10,2) NOT NULL,
    id_transaccion_proveedor VARCHAR(255),
    fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (orden_id) REFERENCES Ordenes(orden_id),
    UNIQUE KEY unique_orden_transaccion (orden_id)
);

-- TABLA: ProductoCupones
CREATE TABLE ProductoCupones (
    producto_cupon_id INT PRIMARY KEY AUTO_INCREMENT,
    cupon_id INT NOT NULL,
    producto_id INT NOT NULL,
    FOREIGN KEY (cupon_id) REFERENCES Cupones(cupon_id),
    FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
    UNIQUE KEY unique_cupon_producto (cupon_id, producto_id)
);

-- =============================================
-- INSERCIÓN DE DATOS INICIALES
-- =============================================
INSERT INTO Roles (nombre_rol, descripcion)
VALUES ('ROLE_USER','Comprador'), ('ROLE_SELLER','Vendedor'), ('ROLE_ADMIN','Administrador');
select * from Usuarios;

-- Insertar roles básicos
INSERT INTO Roles (nombre_rol, descripcion) VALUES 
('administrador', 'Administrador completo del sistema'),
('vendedor', 'Usuario que vende productos en la plataforma'),
('comprador', 'Usuario que compra productos');

-- Insertar categorías de ejemplo
INSERT INTO Categorias (nombre_categoria, descripcion) VALUES 
('Frutas Orgánicas', 'Frutas cultivadas de manera orgánica y sostenible'),
('Verduras Ecológicas', 'Verduras frescas de cultivo ecológico'),
('Productos Lácteos', 'Lácteos orgánicos y de producción responsable'),
('Panadería Artesanal', 'Productos de panadería hechos de forma artesanal'),
('Bebidas Naturales', 'Jugos y bebidas naturales sin conservantes');

-- Insertar usuario administrador por defecto (password: Admin123)
INSERT INTO Usuarios (rol_id, nombre, apellido, email, password_hash, telefono, esta_activo, es_verificado) 
VALUES (1, 'Admin', 'Sistema', 'admin@ecomarket.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1234567890', TRUE, TRUE);

-- Insertar cupón de ejemplo
INSERT INTO Cupones (codigo, descripcion, tipo_descuento, valor_descuento, maximo_descuento, min_compra, usos_maximos, fecha_inicio, fecha_fin) 
VALUES ('BIENVENIDA10', 'Cupón de bienvenida del 10% de descuento', 'porcentaje', 10.00, 50.00, 100.00, 1000, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY));
