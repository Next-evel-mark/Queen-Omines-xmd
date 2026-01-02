const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env file safely
const envPath = path.resolve(process.cwd(), 'config.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    dotenv.config(); // fallback to default .env
}

// Proper boolean converter
const toBool = (value, def = false) => {
    if (value === undefined) return def;
    return value.toString().toLowerCase() === 'true';
};

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "",

    AUTO_STATUS_SEEN: toBool(process.env.AUTO_STATUS_SEEN, true),
    AUTO_STATUS_REPLY: toBool(process.env.AUTO_STATUS_REPLY, false),
    AUTO_STATUS_REACT: toBool(process.env.AUTO_STATUS_REACT, true),
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY PK-XMD🤍*",

    WELCOME: toBool(process.env.WELCOME, true),
    ADMIN_EVENTS: toBool(process.env.ADMIN_EVENTS, false),
    ANTI_LINK: toBool(process.env.ANTI_LINK, true),
    MENTION_REPLY: toBool(process.env.MENTION_REPLY, false),

    MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/fgiecg.jpg",
    PREFIX: process.env.PREFIX || ".",
    BOT_NAME: process.env.BOT_NAME || "NOVA-XMD",
    STICKER_NAME: process.env.STICKER_NAME || "PK-XMD",

    CUSTOM_REACT: toBool(process.env.CUSTOM_REACT, false),
    CUSTOM_REACT_EMOJIS: (process.env.CUSTOM_REACT_EMOJIS || 
        "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍"
    ).split(","),

    DELETE_LINKS: toBool(process.env.DELETE_LINKS, true),

    OWNER_NUMBER: (process.env.OWNER_NUMBER || "254794146821").split(","),
    OWNER_NAME: process.env.OWNER_NAME || "nova-xmd",

    DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ pkdriller*",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/fgiecg.jpg",
    LIVE_MSG: process.env.LIVE_MSG || "> Zinda Hun Yar *PK-XMD*⚡",

    READ_MESSAGE: toBool(process.env.READ_MESSAGE, false),
    AUTO_REACT: toBool(process.env.AUTO_REACT, false),
    ANTI_BAD: toBool(process.env.ANTI_BAD, false),

    MODE: process.env.MODE || "public",
    ANTI_LINK_KICK: toBool(process.env.ANTI_LINK_KICK, true),
    AUTO_VOICE: toBool(process.env.AUTO_VOICE, false),
    AUTO_STICKER: toBool(process.env.AUTO_STICKER, false),
    AUTO_REPLY: toBool(process.env.AUTO_REPLY, false),
    ALWAYS_ONLINE: toBool(process.env.ALWAYS_ONLINE, false),

    PUBLIC_MODE: toBool(process.env.PUBLIC_MODE, true),
    AUTO_TYPING: toBool(process.env.AUTO_TYPING, false),
    READ_CMD: toBool(process.env.READ_CMD, false),

    DEV: (process.env.DEV || "254794146821").split(","),

    ANTI_VV: toBool(process.env.ANTI_VV, true),
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "log",
    AUTO_RECORDING: toBool(process.env.AUTO_RECORDING, false),
    ANTICALL: toBool(process.env.ANTICALL, true),
};
