import type { Command } from "./index.js";

export const weatherCommand: Command = {
  name: "weather",
  description: "Consulta el pronóstico del clima simulado para una ciudad",
  execute: async (ctx) => {
    const city = typeof ctx.match === "string" ? ctx.match.trim() : "";

    if (!city) {
      await ctx.reply(
        "🌡️ Debes especificar el nombre de una ciudad.\n\n*Ejemplo:* `/weather Madrid` o `/weather Buenos Aires`",
        { parse_mode: "Markdown" }
      );
      return;
    }

    const charSum = city.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const temp = 10 + (charSum % 22);
    const humidity = 40 + (charSum % 50);

    const climates = [
      { status: "Soleado", emoji: "☀️" },
      { status: "Parcialmente nublado", emoji: "⛅" },
      { status: "Nublado", emoji: "☁️" },
      { status: "Lluvia ligera", emoji: "🌧️" },
      { status: "Tormenta eléctrica", emoji: "🌩️" },
    ];

    const climate = climates[charSum % climates.length];

    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

    await ctx.reply(
      `🌍 **Pronóstico del Clima en ${formattedCity}:**\n\n` +
        `${climate.emoji} **Estado:** ${climate.status}\n` +
        `🌡️ **Temperatura:** ${temp}°C\n` +
        `💧 **Humedad:** ${humidity}%\n` +
        `💨 **Viento:** ${10 + (charSum % 15)} km/h\n\n` +
        `_¡Que tengas un excelente día en ${formattedCity}!_`,
      { parse_mode: "Markdown" }
    );
  },
};

export default weatherCommand;
