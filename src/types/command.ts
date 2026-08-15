import { Context } from "grammy";

export interface Command {
  /**
   * Nombre del comando (sin la barra '/')
   */
  name: string;
  /**
   * Descripción del comando para ayuda o sugerencias
   */
  description: string;
  /**
   * Función que ejecuta el comando. Acepta el contexto estándar de grammY.
   */
  execute: (ctx: Context) => Promise<void>;
}
