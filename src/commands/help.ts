import type { Command } from "./index.js";
import { loadedCommands } from "./index.js";

export const helpCommand: Command = {
  name: "help",
  description: "Muestra la lista de comandos disponibles",
  execute: async (ctx) => {
    let message = "📖 **Comandos disponibles:**\n\n";

    if (loadedCommands.length > 0) {
      for (const cmd of loadedCommands) {
        message += `/${cmd.name} - ${cmd.description}\n`;
      }
    } else {
      message +=
        `/start - Inicia la conversación\n` +
        `/help - Muestra este mensaje\n` +
        `/info - Información del bot\n` +
        `/keyboard - Menú de botones\n` +
        `/echo - Repite tu mensaje\n` +
        `/dice - Juego de dados\n` +
        `/weather - Clima de una ciudad`;
    }

    await ctx.reply(message);
  },
};

export default helpCommand;
