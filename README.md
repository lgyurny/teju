# 🤖 Telegram Bot Descentralizado con grammY y Node.js (TypeScript)

Este proyecto es un bot de Telegram completamente funcional y extensible, construido con la librería [grammY](https://grammy.dev) para Node.js y TypeScript.

Sigue una **arquitectura de comandos descentralizada**, lo que significa que **puedes agregar nuevos comandos simplemente creando un archivo en el directorio `src/commands/`** sin necesidad de registrarlos manualmente en el código principal.

---

## 🛠️ Requisitos Previos

- **Node.js**: versión 18.x o superior.
- **npm**: gestor de paquetes de Node.js.
- Un Token de Bot de Telegram obtenido de [@BotFather](https://t.me/BotFather).

---

## 📁 Estructura del Proyecto

```
├── src/
│   ├── commands/        # Comandos del bot autocargables y descentralizados
│   │   ├── index.ts     # Cargador dinámico de comandos (fs.readdir + import)
│   │   ├── start.ts     # Comando /start
│   │   ├── help.ts      # Comando /help
│   │   ├── info.ts      # Comando /info
│   │   ├── keyboard.ts  # Comando /keyboard
│   │   ├── echo.ts      # Comando /echo (repite mensajes)
│   │   ├── dice.ts      # Comando /dice (juegos de azar de Telegram)
│   │   └── weather.ts   # Comando /weather (clima para ciudades)
│   ├── handlers/        # Manejadores de eventos (callback queries y mensajes)
│   ├── keyboards/       # Definición de teclados inline e interactivos
│   ├── types/           # Definiciones e interfaces de TypeScript (Command)
│   ├── __tests__/       # Pruebas unitarias
│   ├── bot.ts           # Configuración principal del bot
│   └── index.ts         # Punto de entrada de la aplicación
├── .env.example         # Plantilla para variables de entorno
├── tsconfig.json        # Configuración de TypeScript (ES Modules)
└── package.json         # Dependencias y scripts
```

---

## ⚡ ¿Cómo agregar un nuevo comando? (Descentralizado)

Gracias al cargador dinámico, para añadir un nuevo comando al bot solo debes crear un archivo en `src/commands/` exportando por defecto un objeto que implemente la interfaz `Command`:

```typescript
// src/commands/saludo.ts
import { Command } from "../types/command.js";

const saludoCommand: Command = {
  name: "saludo",
  description: "Envía un saludo personalizado",
  execute: async (ctx) => {
    await ctx.reply("¡Hola! Este comando se cargó automáticamente 🚀");
  },
};

export default saludoCommand;
```

¡Y listo! Al reiniciar o iniciar el bot, el comando `/saludo` estará automáticamente disponible.

---

## 🎮 Comandos Incluidos

- `/start`: Saludo de bienvenida interactivo.
- `/help`: Muestra dinámicamente todos los comandos registrados.
- `/info`: Información técnica del bot.
- `/keyboard`: Menú interactivo con botones inline.
- `/echo <mensaje>`: Repite el mensaje introducido con formato en negrita e itálica.
- `/dice [target|basket|futbol|slots]`: Lanza un juego de azar o dado animado de Telegram.
- `/weather <ciudad>`: Muestra el pronóstico meteorológico detallado para la ciudad indicada.

---

## 🚀 Instalación y Configuración

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar las variables de entorno:**

   Copia `.env.example` a `.env` y coloca tu token:

   ```bash
   cp .env.example .env
   ```

   ```env
   BOT_TOKEN=tu_token_aqui
   ```

---

## ⚙️ Scripts Disponibles

- **Modo Desarrollo:**

  ```bash
  npm run dev
  ```

- **Compilar Proyecto:**

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
