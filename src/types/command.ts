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
   * Función que ejecuta el comando
   */
  execute: (ctx: CommandContext<Context>) => Promise<void>;
}
