# 🤖 Telegram Bot con grammY y Node.js (TypeScript)

Este proyecto es un bot de Telegram completamente funcional, estructurado de forma modular utilizando la librería [grammY](https://grammy.dev) para Node.js y TypeScript.

---

## 🛠️ Requisitos Previos

- **Node.js**: versión 18.x o superior.
- **npm**: gestor de paquetes de Node.js.
- Un Token de Bot de Telegram obtenido de [@BotFather](https://t.me/BotFather).

---

## 📁 Estructura del Proyecto

El código está organizado de manera modular para garantizar escalabilidad y fácil mantenimiento:

```
├── src/
│   ├── commands/        # Comandos del bot (/start, /help, /info, /keyboard)
│   ├── handlers/        # Manejadores de eventos (callback queries y mensajes de texto)
│   ├── keyboards/       # Definición de teclados inline e interactivos
│   ├── __tests__/       # Pruebas unitarias
│   ├── bot.ts           # Configuración del bot y registro de módulos
│   └── index.ts         # Punto de entrada de la aplicación
├── .env.example         # Plantilla para variables de entorno
├── tsconfig.json        # Configuración de TypeScript (ES Modules)
└── package.json         # Dependencias y scripts
```

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio e instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar las variables de entorno:**

   Copia el archivo `.env.example` a un nuevo archivo `.env`:

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` y coloca tu token de Telegram:

   ```env
   BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

---

## ⚙️ Scripts Disponibles

- **Modo Desarrollo (con auto-reload):**

  ```bash
  npm run dev
  ```

- **Compilar TypeScript:**

  ```bash
  npm run build
  ```

- **Iniciar en Producción:**

  ```bash
  npm start
  ```

- **Ejecutar Pruebas Unitarias:**

  ```bash
  npm test
  ```

---

## 🎮 Comandos y Funcionalidades del Bot

- `/start`: Saludo de bienvenida personalizado.
- `/help`: Muestra la lista de comandos disponibles.
- `/info`: Información técnica sobre la stack utilizada.
- `/keyboard`: Despliega un menú de botones interactivos inline con soporte para callbacks y enlaces externos.
- **Mensaje por defecto:** Responde interactivamente a cualquier mensaje de texto.
