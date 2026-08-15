import { Command } from "../types/command.js";
import { mainKeyboard } from "../keyboards/mainKeyboard.js";

export const keyboardCommand: Command = {
  name: "keyboard",
  description: "Muestra un menú de botones interactivos",
  execute: async (ctx) => {
    await ctx.reply("Elige una opción del menú interactivo:", {
      reply_markup: mainKeyboard,
    });
  },
};

export default keyboardCommand;
