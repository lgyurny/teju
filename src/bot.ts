import { Bot, GrammyError, HttpError } from "grammy";
import type { UserFromGetMe } from "grammy/types";
import { commandsComposer } from "./commands/index.js";
import { handlersComposer } from "./handlers/index.js";

export interface BotOptions {
  botInfo?: UserFromGetMe;
}

/**
 * Crea y configura una instancia del Bot de Telegram.
 * @param token Token de la API del Bot de Telegram.
 * @param options Opciones adicionales como botInfo para pruebas offline.
 */
export function createBot(token: string, options?: BotOptions) {
  const bot = new Bot(token, options ? { botInfo: options.botInfo } : undefined);

  // Middleware de logging
  bot.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`[LOG] Procesada actualización ${ctx.update.update_id} en ${ms}ms`);
  });

  // Registrar módulos de comandos y manejadores
  bot.use(commandsComposer);
  bot.use(handlersComposer);

  // Manejador centralizado de errores
  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error procesando la actualización ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error en solicitud a la API de Telegram:", e.description);
    } else if (e instanceof HttpError) {
      console.error("No se pudo contactar a Telegram:", e);
    } else {
      console.error("Error desconocido:", e);
    }
  });

  return bot;
}
