import { Composer } from "grammy";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Command } from "../types/command.js";

export const commandsComposer = new Composer();
export const loadedCommands: Command[] = [];

/**
 * Carga de forma dinámica y descentralizada todos los comandos en el directorio `commands`.
 */
export async function loadCommands(): Promise<Command[]> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const files = fs.readdirSync(__dirname);

  for (const file of files) {
    // Ignorar el index de registro y archivos que no sean .ts o .js (evitando .map o .d.ts)
    if (
      (file.endsWith(".ts") || file.endsWith(".js")) &&
      !file.startsWith("index") &&
      !file.endsWith(".d.ts")
    ) {
      const filePath = path.join(__dirname, file);
      const fileUrl = pathToFileURL(filePath).href;

      try {
        const module = await import(fileUrl);
        const command: Command = module.default || module.command;

        if (command && command.name && typeof command.execute === "function") {
          commandsComposer.command(command.name, command.execute);
          loadedCommands.push(command);
          console.log(`[COMANDO] Cargado dinámicamente: /${command.name}`);
        }
      } catch (error) {
        console.error(`Error al cargar el comando desde ${file}:`, error);
      }
    }
  }

  return loadedCommands;
}

// Cargar automáticamente
await loadCommands();
