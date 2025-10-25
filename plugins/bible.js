const axios = require("axios");
const { cmd } = require("../command");

// Command: bible
cmd({
    pattern: "bible",
    desc: "Fetch Bible verses by reference.",
    category: "fun",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (args.length === 0) {
            return reply(`⚠️ *Please provide a Bible reference.*\n\n📝 *Example:*\n.bible John 1:1`);
        }

        const reference = args.join(" ");
        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.text) {
            const { reference: ref, text, translation_name } = response.data;

            // Fake verified contact (quoted)
            let fakeContact = {
                key: {
                    fromMe: false,
                    participant: '0@s.whatsapp.net',
                    remoteJid: 'status@broadcast'
                },
                message: {
                    contactMessage: {
                        displayName: 'NEXT_LEVEL_MARK ✅',
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:NEXT_LEVEL_MARK ✅\nORG: QUEEN OMINES-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
                        jpegThumbnail: null
                    }
                }
            }

            await conn.sendMessage(m.chat, {
                text:
                    `📜 *Bible Verse Found!*\n\n` +
                    `📖 *Reference:* ${ref}\n` +
                    `📚 *Text:* ${text}\n\n` +
                    `🗂️ *Translation:* ${translation_name}\n\n` +
                    `© PK XMD BIBLE`,
                contextInfo: {
                    externalAdReply: {
                        title: "HOLY BIBLE VERSES",
                        body: "Powered by QUEEN OMINES-XMD",
                        thumbnailUrl: "https://files.catbox.moe/ca4z8w.jpg",
                        sourceUrl: "https://github.com/pkdriller",
                        mediaType: 1,
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    },
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "0029VavJhrh7tkj8dCeRKh3b@newsletter",
                        newsletterName: "QUEEN OMINES-XMD Bot Updates",
                        serverMessageId: "",
                    }
                }
            }, { quoted: fakeContact });

        } else {
            reply("❌ *Verse not found.* Please check the reference and try again.");
        }
    } catch (error) {
        console.error("Bible Error:", error);
        reply("⚠️ *An error occurred while fetching the Bible verse.* Please try again.");
    }
});
