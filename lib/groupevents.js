const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const defaultPP = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
const ppUrls = [defaultPP, defaultPP, defaultPP];

const GroupEvents = async (sock, update) => {
  try {
    const isGroup = isJidGroup(update.id);
    if (!isGroup) return;

    const metadata = await sock.groupMetadata(update.id);
    const participants = update.participants;
    const description = metadata.desc || 'No Description';
    const memberCount = metadata.participants.length;
    let groupPic;

    try {
      groupPic = await sock.profilePictureUrl(update.id, 'image');
    } catch {
      groupPic = ppUrls[Math.floor(Math.random() * ppUrls.length)];
    }

    for (const user of participants) {
      const username = user.split('@')[0];
      const timestamp = new Date().toLocaleString();
      const context = {
        mentionedJid: [user],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: 'PK-XMD Group Logs',
          newsletterJid: '120363288304618280@newsletter',
        },
      };

      // --- Welcome message ---
      if (update.action === 'add' && config.WELCOME === 'true') {
        const msg = `
╭─〔 🎉 *PK-XMD Bot* 〕
├👋 Welcome @${username} to *${metadata.subject}* 🎉
├👤 You are member *#${memberCount}*
├⏰ Joined: ${timestamp}
╰📜 *Group Description:*
${description}

🚀 *Powered by ${config.BOT_NAME}*
        `;
        await sock.sendMessage(update.id, { image: { url: groupPic }, caption: msg, contextInfo: context });
      }

      // --- Goodbye message ---
      else if (update.action === 'remove' && config.GOODBYE === 'true') {
        const msg = `
╭─〔 ⚠️ *Member Left* 〕
├😢 Goodbye @${username}
├⏰ Left: ${timestamp}
├👥 Members left: *${memberCount}*
╰🥀 We’ll miss you!

🚀 *Powered by ${config.BOT_NAME}*
        `;
        await sock.sendMessage(update.id, { image: { url: groupPic }, caption: msg, contextInfo: context });
      }

      // --- Admin demoted ---
      else if (update.action === 'demote' && config.ADMIN_EVENTS === 'true') {
        const admin = update.author.split('@')[0];
        const msg = `
╭─〔 ⚠️ *Admin Update* 〕
├⬇️ @${admin} demoted @${username}
├⏰ ${timestamp}
╰👥 Group: *${metadata.subject}*
        `;
        await sock.sendMessage(update.id, { text: msg, mentions: [update.author, user], contextInfo: context });
      }

      // --- Admin promoted ---
      else if (update.action === 'promote' && config.ADMIN_EVENTS === 'true') {
        const admin = update.author.split('@')[0];
        const msg = `
╭─〔 ⚠️ *Admin Update* 〕
├🔼 @${admin} promoted @${username}
├⏰ ${timestamp}
╰👥 Group: *${metadata.subject}*
        `;
        await sock.sendMessage(update.id, { text: msg, mentions: [update.author, user], contextInfo: context });
      }
    }
  } catch (err) {
    console.error('Group event error:', err);
  }
};

module.exports = GroupEvents;
