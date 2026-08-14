import { InlineKeyboard } from "grammy";

/**
 * Teclado inline principal con opciones interactivas.
 */
export const mainKeyboard = new InlineKeyboard()
  .text("🚀 Opción A", "btn_a")
  .text("💡 Opción B", "btn_b")
  .row()
  .text("ℹ️ Información", "btn_info")
  .url("🌐 Visitar grammY", "https://grammy.dev");
