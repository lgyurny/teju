import { Composer } from "grammy";

export const handlersComposer = new Composer();

// Manejador de botones inline (Callback Queries)
handlersComposer.callbackQuery("btn_a", async (ctx) => {
  await ctx.answerCallbackQuery({ text: "¡Elegiste la Opción A!" });
  await ctx.reply("✨ Has seleccionado la **Opción A**. ¡Excelente elección!");
});

handlersComposer.callbackQuery("btn_b", async (ctx) => {
  await ctx.answerCallbackQuery({ text: "¡Elegiste la Opción B!" });
  await ctx.reply("💡 Has seleccionado la **Opción B**. ¡Genial!");
});

handlersComposer.callbackQuery("btn_info", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("ℹ️ Este bot utiliza la librería grammY para procesar eventos en tiempo real de forma eficiente.");
});

// Manejador por defecto para mensajes de texto que no son comandos
handlersComposer.on("message:text", async (ctx) => {
  await ctx.reply(
    `Has dicho: "${ctx.message.text}" 💬\n\nPrueba usando un comando como /keyboard o /help para interactuar con las funciones disponibles.`
  );
});
