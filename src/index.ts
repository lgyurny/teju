import dotenv from "dotenv";
import { createBot } from "./bot.js";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN || BOT_TOKEN === "tu_token_aqui") {
  console.error("❌ ERROR: Debes proporcionar un BOT_TOKEN válido en el archivo .env");
  console.error("Copia .env.example a .env y añade tu token de Telegram proporcionado por @BotFather.");
  process.exit(1);
}

const bot = createBot(BOT_TOKEN);

console.log("🤖 Iniciando el bot de Telegram...");

bot.start({
  onStart: (botInfo) => {
    console.log(`✅ Bot iniciado correctamente como @${botInfo.username}`);
  },
});
