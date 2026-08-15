import type { Command } from "./index.js";

export const startCommand: Command = {
  name: "start",
  description: "Inicia la conversación con el bot",
  execute: async (ctx) => {
    const name = ctx.from?.first_name ?? "Usuario";
    await ctx.reply(
      `¡Hola, ${name}! 👋\n\nBienvenido a este bot de Telegram creado con **grammY** y **Node.js** con comandos descentralizados.\n\nEscribe /help para ver la lista de comandos disponibles.`
    );
  },
};

export default startCommand;
