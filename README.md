# Gestión de Asistentes

Aplicación desarrollada con **Angular CLI**, **Angular Material**, **Bootstrap** y **SweetAlert2**, que permite gestionar alumnos, cursos e inscripciones en un entorno modular, interactivo y profesional.  
Proyecto correspondiente al **Proyecto Final** del Curso de Desarrollador Frontend con Angular de Coderhouse.

---

## 🎯 Funcionalidades principales

- **Navbar** (menú lateral) y **Toolbar** (barra superior) para navegación estructurada.
- **Gestión modular con Lazy Loading** para Alumnos, Cursos e Inscripciones.
- **ABM completo** para:
  - Alumnos: nombre, apellido y email.
  - Cursos: nombre, profesor, cupos.
  - Inscripciones: selección dinámica de alumno, curso y fecha.
- **Validación de cupos**: no permite inscribir alumnos si el curso ya no tiene vacantes.
- **Edición inmediata** de registros con formularios reactivos prellenados.
- **Eliminación con confirmación visual** usando SweetAlert2.
- **Sincronización entre módulos**:  
  - Cursos y alumnos se cargan dinámicamente en el formulario de inscripción.
- **Autenticación básica**:  
  - Login con rol (admin/user).  
  - Navegación condicional según rol autenticado.
- **Validación de roles en login**:  
  - Muestra alerta visual si el usuario ingresado no corresponde al rol seleccionado.
- **Pipe personalizado**: muestra el nombre completo del alumno (Nombre + Apellido).
- **Directiva personalizada**: aplica un estilo de fuente de 20px a los encabezados.
- **Botones de Cancelar**: permiten volver al listado sin modificar datos.
- **Estilo moderno y responsivo**: combinación de Angular Material y Bootstrap.

---

## 🧪 Credenciales de prueba

Para acceder a la aplicación y navegar como **admin** o **usuario**, puedes usar las siguientes credenciales de prueba:

| Rol   | Usuario | Contraseña |
|-------|---------|------------|
| Admin | admin   | 12345      |
| User  | user    | 12345      |

✅ Puedes usar cualquiera de estas cuentas para evaluar las funcionalidades y la navegación condicional.

---

## 🖥️ Servidor de API (json-server)

Este proyecto utiliza un servidor simulado con **json-server** para manejar la persistencia de datos (alumnos, cursos, inscripciones).  
Es importante que levantes este servidor antes de ejecutar la aplicación en local, para que todas las funcionalidades estén disponibles.

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