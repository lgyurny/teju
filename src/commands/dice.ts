import { Command } from "../types/command.js";

export const diceCommand: Command = {
  name: "dice",
  description: "Lanza un dado o juego de azar animado de Telegram",
  execute: async (ctx) => {
    const arg = typeof ctx.match === "string" ? ctx.match.trim().toLowerCase() : "";

    let emoji: "🎲" | "🎯" | "🏀" | "⚽" | "🎰" = "🎲";

    if (arg === "target" || arg === "dardo") {
      emoji = "🎯";
    } else if (arg === "basket" || arg === "baloncesto") {
      emoji = "🏀";
    } else if (arg === "futbol" || arg === "soccer") {
      emoji = "⚽";
    } else if (arg === "slots" || arg === "tragamonedas") {
      emoji = "🎰";
    }

    await ctx.reply(`🎲 Lanzando ${emoji}...`);
    await ctx.replyWithDice(emoji);
  },
};

export default diceCommand;
