const { cmd, commands } = require("../command");
const moment = require("moment-timezone");
const { runtime } = require("../lib/functions");
const os = require("os");

// Register a command
cmd({
  pattern: "menu",
  desc: "Display Queen Omines xmd Command Menu",
  category: "main",
  filename: __filename
}, async (conn, message, { reply }) => {
  try {
    // Basic Info
    const date = moment().tz("Africa/Nairobi").format("dddd, MMMM Do YYYY, HH:mm:ss");
    const uptime = runtime(process.uptime());
    const owner = "PK-XMD";
    const prefix = "*";
    const commandsCount = Object.values(commands).length;
    const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + " MB";

    // Random motivational quote
    const quotes = [
      "💡 Innovation distinguishes the leader from the follower.",
      "🎯 Focus on progress, not perfection.",
      "✨ Keep smiling, life is beautiful!",
      "🚀 Code, create, conquer!",
      "🌟 Stay positive and keep moving forward."
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // Group commands by category
    let categorized = {};
    for (let cmdObj of Object.values(commands)) {
      if (!cmdObj?.pattern || !cmdObj?.category) continue;
      if (!categorized[cmdObj.category]) categorized[cmdObj.category] = [];
      categorized[cmdObj.category].push(cmdObj.pattern);
    }

    // Build menu text
    let menuText = `
╭─⋄⋅🌺⋅⋄──⋅🌷⋅──⋄⋅🌸⋅⋄─╮
        ${owner.toUpperCase()}
╰─⋄⋅🌼⋅⋄──⋅🌹⋅──⋄⋅💮⋅⋄─╯

╭────────────────────╮
⋅📆 *DATE*  : ${date}
─────────────────────
⋅⏰ *UPTIME*: ${uptime}
─────────────────────
⋅👤 *OWNER* : ${owner}
─────────────────────
⋅📜 *CMDS*  : ${commandsCount}
─────────────────────
⋅🛡️ *PREFIX*: ${prefix}
─────────────────────
⋅💎 *RAM*   : ${ram}
─────────────────────
`.repeat(1);

    // Add categorized commands
    for (let category in categorized) {
      menuText += `\n★ *${category.toUpperCase()}*\n`;
      categorized[category].forEach(cmd => {
        menuText += `> ☆ *${cmd}*\n`;
      });
    }

    // Footer quote
    menuText += `
─────────────────────
💬 "${quote}"
│  ✨ Powered by Mark
│  🏆 Next_Level_Mark
╰────────────────╯
`;

    // Send image + caption
    await conn.sendMessage(
      message.chat,
      {
        image: { url: "https://files.catbox.moe/h4voyb.jpeg" },
        caption: menuText,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363288304618280@newsletter",
            newsletterName: "Mark",
            serverMessageId: -1
          }
        }
      },
      { quoted: message }
    );

    // Send background audio (voice note style)
    await conn.sendMessage(
      message.chat,
      {
        audio: { url: "https://files.catbox.moe/340wh3.mp3" },
        mimetype: "audio/mpeg",
        ptt: true,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363288304618280@newsletter",
            newsletterName: "Mark",
            serverMessageId: -1
          }
        }
      },
      { quoted: message }
    );

  } catch (err) {
    console.error("Menu Error:", err);
    reply("❌ Failed to display menu");
  }
});
