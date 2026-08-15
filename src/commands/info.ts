import type { Command } from "./index.js";

export const infoCommand: Command = {
  name: "info",
  description: "Información sobre la tecnología utilizada",
  execute: async (ctx) => {
    await ctx.reply(
      `🤖 **Acerca de este bot:**\n\n` +
        `• **Librería:** grammY (https://grammy.dev)\n` +
        `• **Entorno:** Node.js + TypeScript (ES Modules)\n` +
        `• **Arquitectura:** Comandos descentralizados autocargables ⚡\n` +
        `• **Estado:** ¡Totalmente funcional y extensible!`
    );
  },
};

export default infoCommand;
