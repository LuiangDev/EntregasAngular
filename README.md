# Gestión de Asistentes

Aplicación web desarrollada con **Angular**, **Angular Material**, **Bootstrap** y **SweetAlert2** para la gestión integral de alumnos, cursos, usuarios e inscripciones.  

---

## 🎯 Funcionalidades principales

- **Autenticación real con validación contra backend (`json-server`)**
- **Inicio de sesión con correo, contraseña y selección de rol**
- **Validación del perfil del usuario**: solo puede acceder al sistema con el rol que le corresponde
- **Navbar lateral persistente** con el nombre del usuario logueado y navegación contextual
- **Gestión CRUD completa**:
  - **Alumnos**: nombre, apellido, email
  - **Cursos**: nombre, profesor, clases, horas y cupos
  - **Usuarios**: email, contraseña, nombre, dirección, teléfono, rol
  - **Inscripciones**: registro de alumno a curso con fecha, validando cupos y registrando al autor
- **Botones de cancelar** en formularios para no generar cambios accidentales
- **SweetAlert2** para feedback visual de éxito, error y confirmación
- **Visualización condicional por rol**:
  - Admin puede ver y gestionar todo
  - Usuario común solo puede listar cursos, alumnos y gestionar sus propias inscripciones
- **Roles protegidos mediante `AuthGuard` y `RoleGuard`**
- **Datos almacenados y recuperados desde `json-server`** (simulación de backend REST)
- **Estilo moderno y responsivo** con Angular Material y Bootstrap
- **Formulario de login totalmente adaptado con select de rol y validación contextual**

---

## 🔐 Inicio de sesión y validación de acceso

### 💼 Formulario de Login:
- Tipo de Rol (`Administrador` o `Usuario`)
- Correo electrónico
- Contraseña

### 🛡️ Validaciones implementadas:
- Se verifica que el correo exista en el backend
- Se compara la contraseña ingresada con la real
- Se valida que el tipo de rol seleccionado coincida con el del usuario

### 🚪 Redirecciones por perfil:
- `admin` → redirige a `/alumnos`
- `user` → redirige a `/inscripciones`

---

## 👥 Roles disponibles

| Rol     | Acceso a                     | Restricciones                          |
|---------|------------------------------|----------------------------------------|
| Administrador   | Alumnos, Cursos, Usuarios, Inscripciones | Acceso total                          |
| Usuario | Alumnos, Cursos, Inscripciones | No puede ver ni modificar usuarios     |

---

## 🧪 Credenciales de prueba

Puedes usar los siguientes usuarios ya creados en `db.json`:

| Nombre         | Email               | Contraseña | Perfil   |
|----------------|---------------------|------------|----------|
| Luis Angel     | admin@example.com   | 12345      | admin    |
| Angel          | angel@example.com   | 123456     | user     |

✅ O bien, crea nuevos usuarios desde la vista de "Gestión de Usuarios" a través del usuario `Admin`.

---

## 🖥️ Servidor de API (json-server)

Este proyecto utiliza un servidor simulado con **json-server** para manejar la persistencia de datos (alumnos, cursos, inscripciones).  
Es importante que levantes este servidor antes de ejecutar la aplicación en local, para que todas las funcionalidades estén disponibles.

### ✅ ¿Qué gestiona?

- Usuarios (`/usuarios`)
- Alumnos (`/alumnos`)
- Cursos (`/cursos`)
- Inscripciones (`/inscripciones`)

### Pasos para levantar el servidor de API:

```bash
# Instala json-server de manera global (si no lo tienes)
npm install -g json-server

# Dentro del proyecto, ejecuta:
json-server --watch db.json --port 3000
```
✅ El archivo db.json contiene los datos simulados.
✅ Por defecto, el servidor estará disponible en: http://localhost:3000/

💡 Recuerda: Si no levantas json-server, la aplicación no podrá cargar datos y las funciones estarán inactivas.
---

## 📌 Estructura modular y técnicas aplicadas

- Lazy Loading por módulo (Alumnos, Cursos, Usuarios, Inscripciones)
- Formularios reactivos (FormGroup, Validators)
- Servicios centralizados por entidad
- Observables con BehaviorSubject para manejar estado de autenticación
- Guards personalizados (AuthGuard, RoleGuard)
- Custom Pipes y Directivas para formato y estilo

---

## ✅ Cobertura de testing

- Configuración completa con **Jasmine** y **Karma**.  
- **22 pruebas unitarias** abarcando componentes y servicios clave.  
- Validación de creación de componentes, flujos de login, renderizado de vistas, y lógica de roles.  
- **100% sin errores** ni advertencias en las pruebas.

---

## 🛠 Tecnologías utilizadas

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-1976D2?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF5A5F?style=for-the-badge&logo=sweetalert2&logoColor=white)
![Jasmine](https://img.shields.io/badge/Jasmine-8A4182?style=for-the-badge&logo=jasmine&logoColor=white)
![Karma](https://img.shields.io/badge/Karma-47A248?style=for-the-badge&logo=karma&logoColor=white)

---

## 🚀 Instalación y ejecución local

```bash
# Clona el repositorio
git clone https://github.com/LuiangDev/EntregasAngular.git

# Accede al proyecto
cd Entregable3-LuisQuispe

# Instala las dependencias
npm install

# Ejecuta en entorno local
ng serve

# Ejecuta las pruebas unitarias
ng test
```
#
**Luis Angel Quispe Navarro**  
Desarrollador Front-End | Ingeniero de Sistemas Computacionales | Diseñador UI  
✉️ angel.quispe.navarro@outlook.com  
[![GitHub](https://img.shields.io/badge/GitHub-LuiangDev-181717?style=for-the-badge&logo=github)](https://github.com/LuiangDev)  
📌 Lima, Perú