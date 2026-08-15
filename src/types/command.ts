import { CommandContext, Context } from "grammy";

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
   * Función que ejecuta el comando. Acepta el contexto de grammY para comandos.
   */
  execute: (ctx: CommandContext<Context>) => Promise<void>;
}
