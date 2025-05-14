# Gestión de Asistentes

Aplicación desarrollada con **Angular CLI**, **Angular Material**, **Bootstrap** y **SweetAlert2**, que permite gestionar alumnos, cursos e inscripciones en un entorno modular, interactivo y profesional.  
Proyecto correspondiente a la **Segunda Entrega del Proyecto Final**.

---

## 🎯 Funcionalidades principales

- **Navbar** (menú lateral) y **Toolbar** (barra superior) para navegación estructurada.
- **Gestión modular con Lazy Loading** para Alumnos, Cursos e Inscripciones.
- **ABM completo** para:
  - Alumnos: nombre, apellido y email.
  - Cursos: nombre, profesor, cupos.
  - Inscripciones: selección dinámica de alumno, curso y fecha.
- **Sincronización entre módulos**: 
  - Cursos y alumnos se cargan dinámicamente en el formulario de inscripción.
- **Validación de cupos**: no permite inscribir alumnos si el curso ya no tiene vacantes.
- **Eliminación con confirmación visual** usando SweetAlert2.
- **Edición inmediata de registros** con formularios reactivos prellenados.
- **Pipe personalizado**: muestra el nombre completo del alumno (Nombre + Apellido).
- **Directiva personalizada**: aplica un estilo de fuente de 20px a los encabezados.
- **Botones de Cancelar**: permiten volver al listado sin modificar datos.
- **Estilo moderno y responsivo**: combinación de Angular Material y Bootstrap.

---

## 🛠 Tecnologías utilizadas

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-1976D2?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF5A5F?style=for-the-badge&logo=sweetalert2&logoColor=white)

---

## 🚀 Instalación y ejecución local

```bash
# Clona el repositorio
git clone https://github.com/LuiangDev/EntregasAngular.git

# Accede al proyecto
cd Entregable2-LuisQuispe

# Instala las dependencias
npm install

# Ejecuta en entorno local
ng serve
```
#
**Luis Angel Quispe Navarro**  
Desarrollador Front-End | Ingeniero de Sistemas Computacionales  
✉️ angel.quispe.navarro@outlook.com  
[![GitHub](https://img.shields.io/badge/GitHub-LuiangDev-181717?style=for-the-badge&logo=github)](https://github.com/LuiangDev)  
📌 Lima, Perú