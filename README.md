# Custom Hash Map Implementation

Una implementación eficiente y completa de una estructura de datos **Hash Map** (Tabla Hash) en JavaScript. Este proyecto demuestra el manejo profundo de la asignación de memoria, funciones de hash y resolución de colisiones mediante listas enlazadas.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-5.0+-8DD6F9?logo=webpack&logoColor=black)
![Data Structures](https://img.shields.io/badge/CS-Data%20Structures-red)

## 📋 Descripción

Este repositorio contiene una implementación desde cero de un Hash Map. A diferencia de los objetos nativos de JavaScript o la clase `Map`, esta implementación expone la lógica interna de cómo se almacenan los pares clave-valor, cómo se distribuyen en "buckets" y cómo se gestiona el rendimiento a medida que los datos crecen.

### Características Principales

- **Algoritmo de Hashing:** Convierte claves (strings) en índices numéricos para su almacenamiento optimizado.
- **Manejo de Colisiones:** Implementa la estrategia de **Separate Chaining** (Encadenamiento Separado) utilizando una clase `LinkedList` personalizada para gestionar múltiples entradas en el mismo bucket.
- **Redimensionamiento Dinámico:** El mapa monitorea su "Factor de Carga" (Load Factor). Cuando la capacidad supera el umbral (0.75), el mapa duplica su tamaño y re-distribuye (re-hash) todos los elementos automáticamente.
- **Operaciones CRUD Completas:**
  - `set(key, value)`: Inserta o actualiza valores.
  - `get(key)`: Recupera valores instantáneamente.
  - `remove(key)`: Elimina entradas específicas.
  - `has(key)`: Verifica existencia.
- **Métodos Auxiliares:** `keys()`, `values()`, `entries()`, `length()` y `clear()`.

## 🚀 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/rodrigobernahola/hash-map-repo.git](https://github.com/rodrigobernahola/hash-map-repo.git)
    cd hash-map-repo
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar modo desarrollo:**
    ```bash
    npm start
    ```
    Esto compilará el proyecto con Webpack y ejecutará el script principal (`src/index.js`), donde podrás ver las pruebas de funcionamiento en la consola del navegador o terminal.

## 🛠️ Tecnologías y Estructura

- **Lenguaje:** JavaScript (ES6 Modules)
- **Herramientas:** Webpack, ESLint, Prettier
- **Estructuras de Datos:**
  - `HashMap`: Clase principal.
  - `LinkedList`: Usada para los buckets.
  - `Node`: Unidad básica de almacenamiento.

## ✒️ Autor

* **Rodrigo Bernahola** - [Perfil de GitHub](https://github.com/rodrigobernahola)

---
_Proyecto desarrollado como parte del currículo de [The Odin Project](https://www.theodinproject.com/)_