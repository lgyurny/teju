import { Composer } from "grammy";
import { mainKeyboard } from "../keyboards/mainKeyboard.js";

export const commandsComposer = new Composer();

// Comando /start
commandsComposer.command("start", async (ctx) => {
  const name = ctx.from?.first_name ?? "Usuario";
  await ctx.reply(
    `¡Hola, ${name}! 👋\n\nBienvenido a este bot de Telegram creado con **grammY** y **Node.js**.\n\nEscribe /help para ver la lista de comandos disponibles.`
  );
});

// Comando /help
commandsComposer.command("help", async (ctx) => {
  await ctx.reply(
    `📖 **Comandos disponibles:**\n\n` +
      `/start - Inicia la conversación con el bot\n` +
      `/help - Muestra este mensaje de ayuda\n` +
      `/info - Información sobre la tecnología usada\n` +
      `/keyboard - Muestra un menú de botones interactivos`
  );
});

// Comando /info
commandsComposer.command("info", async (ctx) => {
  await ctx.reply(
    `🤖 **Acerca de este bot:**\n\n` +
      `• **Librería:** grammY (https://grammy.dev)\n` +
      `• **Entorno:** Node.js + TypeScript\n` +
      `• **Arquitectura:** Estructura modular con Composer\n` +
      `• **Estado:** ¡Totalmente funcional! 🚀`
  );
});

// Comando /keyboard
commandsComposer.command("keyboard", async (ctx) => {
  await ctx.reply("Elige una opción del menú interactivo:", {
    reply_markup: mainKeyboard,
  });
});
