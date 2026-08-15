import { describe, it, expect } from "vitest";
import { createBot } from "../bot.js";
import { mainKeyboard } from "../keyboards/mainKeyboard.js";
import { loadedCommands } from "../commands/index.js";
import type { InlineKeyboardButton, UserFromGetMe } from "grammy/types";

describe("Bot de Telegram (grammY)", () => {
  const dummyToken = "123456789:ABCdefGHIjklMNOpqrsTUVwxyz";
  const dummyBotInfo: UserFromGetMe = {
    id: 123456789,
    is_bot: true,
    first_name: "TestBot",
    username: "test_bot",
    can_join_groups: true,
    can_read_all_group_messages: false,
    supports_inline_queries: false,
    can_connect_to_business: false,
    has_main_web_app: false,
    has_topics_enabled: false,
    allows_users_to_create_topics: false,
    can_manage_bots: false,
    supports_join_request_queries: false,
  };

  it("debe cargar dinámicamente los comandos descentralizados", () => {
    expect(loadedCommands.length).toBeGreaterThanOrEqual(7);
    const commandNames = loadedCommands.map((c) => c.name);
    expect(commandNames).toContain("start");
    expect(commandNames).toContain("help");
    expect(commandNames).toContain("info");
    expect(commandNames).toContain("keyboard");
    expect(commandNames).toContain("echo");
    expect(commandNames).toContain("dice");
    expect(commandNames).toContain("weather");
  });

  it("debe crear la instancia del bot correctamente sin fallar", () => {
    const bot = createBot(dummyToken, { botInfo: dummyBotInfo });
    expect(bot).toBeDefined();
    expect(bot.token).toBe(dummyToken);
  });

  it("debe definir el teclado principal con los botones correctos", () => {
    const inlineKeyboard = mainKeyboard.inline_keyboard;
    expect(inlineKeyboard).toBeDefined();
    expect(inlineKeyboard.length).toBeGreaterThan(0);

    const btnA = inlineKeyboard[0][0] as InlineKeyboardButton.CallbackButton;
    const btnB = inlineKeyboard[0][1] as InlineKeyboardButton.CallbackButton;
    const btnInfo = inlineKeyboard[1][0] as InlineKeyboardButton.CallbackButton;
    const btnUrl = inlineKeyboard[1][1] as InlineKeyboardButton.UrlButton;

    expect(btnA.text).toContain("Opción A");
    expect(btnA.callback_data).toBe("btn_a");
    expect(btnB.text).toContain("Opción B");
    expect(btnB.callback_data).toBe("btn_b");

    expect(btnInfo.text).toContain("Información");
    expect(btnInfo.callback_data).toBe("btn_info");
    expect(btnUrl.text).toContain("Visitar grammY");
    expect(btnUrl.url).toBe("https://grammy.dev");
  });

  it("debe procesar el comando /start llamando a ctx.reply", async () => {
    const bot = createBot(dummyToken, { botInfo: dummyBotInfo });
    let repliedText = "";
    bot.api.config.use(async (prev, method, params) => {
      if (method === "sendMessage") {
        repliedText = (params as any).text;
        return { ok: true, result: {} as any };
      }
      return prev(method, params);
    });

    const dummyCtx = {
      update_id: 1,
      message: {
        message_id: 1,
        date: Math.floor(Date.now() / 1000),
        chat: { id: 123, type: "private", first_name: "Juan" },
        from: { id: 123, is_bot: false, first_name: "Juan" },
        text: "/start",
        entities: [{ type: "bot_command", offset: 0, length: 6 }],
      },
    };

    await bot.handleUpdate(dummyCtx as any);
    expect(repliedText).toContain("¡Hola, Juan!");
  });

  it("debe procesar el comando /echo con parámetros", async () => {
    const bot = createBot(dummyToken, { botInfo: dummyBotInfo });
    let repliedText = "";
    bot.api.config.use(async (prev, method, params) => {
      if (method === "sendMessage") {
        repliedText = (params as any).text;
        return { ok: true, result: {} as any };
      }
      return prev(method, params);
    });

    const dummyCtx = {
      update_id: 10,
      message: {
        message_id: 10,
        date: Math.floor(Date.now() / 1000),
        chat: { id: 123, type: "private", first_name: "Juan" },
        from: { id: 123, is_bot: false, first_name: "Juan" },
        text: "/echo Hola grammY",
        entities: [{ type: "bot_command", offset: 0, length: 5 }],
      },
    };

    await bot.handleUpdate(dummyCtx as any);
    expect(repliedText).toContain("Hola grammY");
  });

  it("debe procesar el comando /dice para enviar dados", async () => {
    const bot = createBot(dummyToken, { botInfo: dummyBotInfo });
    let sentDice = false;
    bot.api.config.use(async (prev, method, params) => {
      if (method === "sendDice") {
        sentDice = true;
        return { ok: true, result: {} as any };
      }
      if (method === "sendMessage") {
        return { ok: true, result: {} as any };
      }
      return prev(method, params);
    });

    const dummyCtx = {
      update_id: 11,
      message: {
        message_id: 11,
        date: Math.floor(Date.now() / 1000),
        chat: { id: 123, type: "private", first_name: "Juan" },
        from: { id: 123, is_bot: false, first_name: "Juan" },
        text: "/dice target",
        entities: [{ type: "bot_command", offset: 0, length: 5 }],
      },
    };

    await bot.handleUpdate(dummyCtx as any);
    expect(sentDice).toBe(true);
  });

  it("debe procesar el comando /weather para una ciudad", async () => {
    const bot = createBot(dummyToken, { botInfo: dummyBotInfo });
    let repliedText = "";
    bot.api.config.use(async (prev, method, params) => {
      if (method === "sendMessage") {
        repliedText = (params as any).text;
        return { ok: true, result: {} as any };
      }
      return prev(method, params);
    });

    const dummyCtx = {
      update_id: 12,
      message: {
        message_id: 12,
        date: Math.floor(Date.now() / 1000),
        chat: { id: 123, type: "private", first_name: "Juan" },
        from: { id: 123, is_bot: false, first_name: "Juan" },
        text: "/weather Madrid",
        entities: [{ type: "bot_command", offset: 0, length: 8 }],
      },
    };

    await bot.handleUpdate(dummyCtx as any);
    expect(repliedText).toContain("Pronóstico del Clima en Madrid");
  });

  it("debe manejar mensajes de texto por defecto", async () => {
    const bot = createBot(dummyToken, { botInfo: dummyBotInfo });
    let repliedText = "";

    bot.api.config.use(async (prev, method, params) => {
      if (method === "sendMessage") {
        repliedText = (params as any).text;
        return { ok: true, result: {} as any };
      }
      return prev(method, params);
    });

    const dummyCtx = {
      update_id: 4,
      message: {
        message_id: 4,
        date: Math.floor(Date.now() / 1000),
        chat: { id: 123, type: "private", first_name: "Juan" },
        from: { id: 123, is_bot: false, first_name: "Juan" },
        text: "Hola bot",
      },
    };

    await bot.handleUpdate(dummyCtx as any);
    expect(repliedText).toContain('Has dicho: "Hola bot"');
  });
});
