import { Command } from "../types/command.js";

export const echoCommand: Command = {
  name: "echo",
  description: "Repite el texto introducido con formato especial",
  execute: async (ctx) => {
    // Obtener el texto después de la palabra /echo
    const text = ctx.match;

    if (!text || typeof text !== "string" || text.trim() === "") {
      await ctx.reply(
        "⚠️ Debes incluir un mensaje para repetir.\n\n*Ejemplo:* `/echo Hola mundo desde grammY`",
        { parse_mode: "Markdown" }
      );
      return;
    }

    await ctx.reply(
      `🗣️ **ECHO:**\n\n_${text.trim()}_`,
      { parse_mode: "Markdown" }
    );
  },
};

export default echoCommand;
