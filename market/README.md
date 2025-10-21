# EcoMarket API - Guía de Pruebas con Postman

## Configuración Inicial

1. **Configurar Base de Datos:**
   - Crear la base de datos `EcoMarket_app` en MySQL
   - Ejecutar el script SQL proporcionado
   - Actualizar credenciales en `application.properties`

2. **Configurar Email (Opcional):**
   - Actualizar configuración de email en `application.properties`
   - Para Gmail: usar contraseña de aplicación

## Endpoints Disponibles

### 1. Registro de Usuario
**POST** `http://localhost:8080/api/auth/registro`

**Body (JSON):**
```json
{
    "nombre": "María",
    "apellido": "García",
    "email": "maria@example.com",
    "password": "123456",
    "telefono": "555-1234",
    "direccion": "Calle 123",
    "ciudad": "Lima",
    "pais": "Perú",
    "codigoPostal": "15001"
}
```

**Respuesta Exitosa:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "tipo": "Bearer",
    "email": "maria@example.com",
    "nombre": "María",
    "rol": "COMPRADOR"
}
```

### 2. Login de Usuario
**POST** `http://localhost:8080/api/auth/login`

**Body (JSON):**
```json
{
    "email": "maria@example.com",
    "password": "123456"
}
```

**Respuesta Exitosa:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "tipo": "Bearer",
    "email": "maria@example.com",
    "nombre": "María",
    "rol": "COMPRADOR"
}
```

### 3. Obtener Todos los Productos
**GET** `http://localhost:8080/api/productos`

**Respuesta:**
```json
[
    {
        "productoId": 1,
        "nombreProducto": "Manzanas Orgánicas",
        "descripcion": "Manzanas rojas orgánicas, frescas y deliciosas",
        "precio": 15.50,
        "stock": 100,
        "esOrganico": true,
        "nombreCategoria": "Frutas Orgánicas",
        "nombreVendedor": "Juan Pérez"
    }
]
```

### 4. Obtener Producto por ID
**GET** `http://localhost:8080/api/productos/1`

### 5. Obtener Productos por Categoría
**GET** `http://localhost:8080/api/productos/categoria/1`

### 6. Obtener Categorías
**GET** `http://localhost:8080/api/categorias`

**Respuesta:**
```json
[
    {
        "categoriaId": 1,
        "nombreCategoria": "Frutas Orgánicas",
        "descripcion": "Frutas frescas y orgánicas",
        "estaActiva": true
    }
]
```

### 7. Ver Notificaciones de Usuario (DEMOSTRACIÓN DE NOTIFICACIONES)
**GET** `http://localhost:8080/api/notificaciones/usuario/{usuarioId}`

**Ejemplo:** `http://localhost:8080/api/notificaciones/usuario/1`

**Respuesta:**
```json
[
    {
        "notificacionId": 1,
        "titulo": "¡Bienvenido a EcoMarket!",
        "mensaje": "Tu cuenta ha sido creada exitosamente. ¡Comienza a explorar nuestros productos ecológicos!",
        "tipo": "sistema",
        "leida": false,
        "fechaCreacion": "2024-01-15T10:30:00",
        "fechaLeida": null
    }
]
```

## Funcionalidades Implementadas

### ✅ Registro y Autenticación de Usuarios
- Registro con validación de datos
- Login con JWT
- Encriptación de contraseñas
- Roles de usuario (COMPRADOR, VENDEDOR, ADMIN)

### ✅ Visualización de Catálogo
- Listado de todos los productos activos
- Filtrado por categoría
- Detalles de producto individual
- Listado de categorías disponibles

### ✅ Integración de Notificaciones
- **Confirmación de Registro:**
  - Notificación en base de datos
  - Email de bienvenida
- **Preparado para Pedidos:**
  - Servicio de email configurado
  - Estructura de notificaciones lista

## Datos de Prueba Incluidos

El sistema incluye datos iniciales:
- **Roles:** COMPRADOR, VENDEDOR, ADMIN
- **Categorías:** Frutas Orgánicas, Verduras Orgánicas, Lácteos Orgánicos
- **Usuario Vendedor:** vendedor@ecomarket.com / 123456
- **Productos:** Manzanas y Plátanos Orgánicos

## Instrucciones de Ejecución

1. **Compilar y ejecutar:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

2. **Probar en Postman:**
   - Importar la colección de endpoints
   - Comenzar con registro de usuario
   - Usar el token JWT para endpoints protegidos (cuando se implementen)

## 📧 DEMOSTRACIÓN DE NOTIFICACIONES PARA EL DOCENTE

### Pasos para Demostrar la Funcionalidad de Notificaciones:

#### **Paso 1: Registrar un Usuario**
1. **POST** `http://localhost:8080/api/auth/registro`
2. **Body:**
```json
{
    "nombre": "Carlos",
    "apellido": "Mendoza",
    "email": "carlos@test.com",
    "password": "123456",
    "telefono": "555-9999",
    "direccion": "Av. Test 456",
    "ciudad": "Lima",
    "pais": "Perú",
    "codigoPostal": "15002"
}
```
3. **Resultado:** Se crea automáticamente una notificación de bienvenida en la BD

#### **Paso 2: Verificar la Notificación Creada**
1. **GET** `http://localhost:8080/api/notificaciones/usuario/2` (o el ID del usuario creado)
2. **Resultado Esperado:**
```json
[
    {
        "notificacionId": 1,
        "titulo": "¡Bienvenido a EcoMarket!",
        "mensaje": "Tu cuenta ha sido creada exitosamente. ¡Comienza a explorar nuestros productos ecológicos!",
        "tipo": "sistema",
        "leida": false,
        "fechaCreacion": "2024-01-15T10:30:00"
    }
]
```

#### **Paso 3: Verificar Email (Si está configurado)**
- Revisar la bandeja de entrada del email usado en el registro
- Debería llegar un email con el asunto: "¡Bienvenido a EcoMarket!"

### 📝 **Evidencia para el Docente:**
1. **Notificación en BD:** Endpoint GET muestra la notificación guardada
2. **Email enviado:** Mensaje de bienvenida (si email está configurado)
3. **Integración automática:** Todo sucede al registrar un usuario

### 🔧 **Cómo obtener el ID del usuario:**
- Después del registro, usar la base de datos para ver el último usuario creado
- O modificar el endpoint de registro para devolver el ID del usuario

## Próximos Pasos

Para completar el sistema, se pueden agregar:
- Gestión de carrito de compras
- Procesamiento de órdenes
- Sistema de reseñas
- Panel de administración
- Gestión de inventario para vendedores