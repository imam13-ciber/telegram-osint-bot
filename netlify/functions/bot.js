onst TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const dns = require('dns').promises;

// =========================
// ISI TOKEN BOT TELEGRAM
// =========================
const token = '8608512165:AAF1MZ_kjztIkoV616Sj7mhwXdGyYcChVZk';

const bot = new TelegramBot(token);

// =========================
// KIRIM PESAN
// =========================
async function kirim(chatId, text) {
    await bot.sendMessage(chatId, text);
}

// =========================
// HANDLER
// =========================
exports.handler = async (event) => {

    try {

        const body = JSON.parse(event.body);

        const message = body.message || {};
        const text = message.text || '';
        const chatId = message.chat?.id;

        if (!chatId) {
            return {
                statusCode: 200,
                body: 'OK'
            };
        }

        // =========================
        // START
        // =========================
        if (text === '/start') {

            const menu = `
OSINT BOT ONLINE 🚀

COMMAND:

/whois domain.com
/ip 8.8.8.8
/dns domain.com
/reverse 8.8.8.8
/site https://example.com
/header https://example.com
/user username
/ping domain.com
/help
`;

            await kirim(chatId, menu);
        }

        // =========================
        // HELP
        // =========================
        else if (text === '/help') {

            await kirim(chatId,
                'Gunakan command berikut:\n\n' +
                '/whois domain.com\n' +
                '/ip 8.8.8.8\n' +
                '/dns domain.com\n' +
                '/reverse 8.8.8.8\n' +
                '/site https://example.com\n' +
                '/header https://example.com\n' +
                '/user username\n' +
                '/ping domain.com'
            );
        }

        // =========================
        // WHOIS
        // =========================
        else if (text.startsWith('/whois')) {

            const domain = text.split(' ')[1];

            const url = https://api.api-ninjas.com/v1/whois?domain=${domain};

            try {

                const response = await axios.get(url, {
                    headers: {
                        'X-Api-Key': 'YOUR_API_NINJAS_KEY'
                    }
                });

                const data = response.data;

                const hasil =
`WHOIS RESULT

DOMAIN: ${domain}
REGISTRAR: ${data.registrar || '-'}
CREATED: ${data.creation_date || '-'}
EXPIRE: ${data.expiration_date || '-'}
`;

                await kirim(chatId, hasil);

            } catch {
                await kirim(chatId, 'WHOIS gagal');
            }
        }

        // =========================
        // IP LOOKUP
        // =========================
        else if (text.startsWith('/ip')) {

            const ip = text.split(' ')[1];

            try {

                const response = await axios.get(
                    http://ip-api.com/json/${ip}
                );

                const d = response.data;

                const hasil =
`IP LOOKUP

IP: ${ip}
NEGARA: ${d.country}
KOTA: ${d.city}
ISP: ${d.isp}
ORG: ${d.org}
TIMEZONE: ${d.timezone}
`;

                await kirim(chatId, hasil);

            } catch {
                await kirim(chatId, 'IP lookup gagal');
            }
        }

        // =========================
        // DNS LOOKUP
        // =========================
        else if (text.startsWith('/dns')) {

            const domain = text.split(' ')[1];

            try {

                const addresses = await dns.resolve4(domain);

                let hasil = DNS LOOKUP\n\nDOMAIN: ${domain}\n\n;

                addresses.forEach(ip => {
                    hasil += ${ip}\n;
                });

                await kirim(chatId, hasil);

            } catch {
                await kirim(chatId, 'DNS lookup gagal');
            }
        }

        // =========================
        // REVERSE DNS
        // =========================
        else if (text.startsWith('/reverse')) {

            const ip = text.split(' ')[1];

            try {

                const hostnames = await dns.reverse(ip);

                let hasil = REVERSE DNS\n\nIP: ${ip}\n\n;

                hostnames.forEach(host => {
                    hasil += ${host}\n;
                });

                await kirim(chatId, hasil);

            } catch {
                await kirim(chatId, 'Reverse DNS gagal');
            }
        }

        // =========================
        // WEBSITE INFO
        // =========================
        else if (text.startsWith('/site')) {

            const site = text.split(' ')[1];

            try {

                const response = await axios.get(site);

                const hasil =
`SITE INFO

URL: ${site}
STATUS: ${response.status}
SERVER: ${response.headers.server || '-'}
CONTENT-TYPE: ${response.headers['content-type'] || '-'}
`;

                await kirim(chatId, hasil);

            } catch {
                await kirim(chatId, 'Website tidak dapat diakses');
            }
        }

        // =========================
        // HTTP HEADER
        // =========================
        else if (text.startsWith('/header')) {

            const site = text.split(' ')[1];

            try {

                const response = await axios.get(site);

                let hasil = HTTP HEADER\n\n;

                for (const key in response.headers) {
                    hasil += ${key}: ${response.headers[key]}\n;
                }

                await kirim(chatId, hasil);

            } catch {
                await kirim(chatId, 'Header lookup gagal');
            }
        }

        // =========================
        // USERNAME OSINT
        // =========================
        else if (text.startsWith('/user')) {

            const username = text.split(' ')[1];

            const hasil =
`USERNAME OSINT

GitHub:
https://github.com/${username}

Instagram:
https://instagram.com/${username}

Twitter/X:
https://x.com/${username}

TikTok:
https://www.tiktok.com/@${username}

Reddit:
https://www.reddit.com/user/${username}
`;

            await kirim(chatId, hasil);
        }

        // =========================
        // PING WEBSITE
        // =========================
        else if (text.startsWith('/ping')) {

            const domain = text.split(' ')[1];

            try {

                const start = Date.now();

                await axios.get(https://${domain});

                const end = Date.now();

                const hasil =
`PING RESULT

DOMAIN: ${domain}
LATENCY: ${end - start} ms
STATUS: ONLINE
`;

                await kirim(chatId, hasil);

            } catch {
                await kirim(chatId, 'Website offline/tidak dapat diakses');
            }
        }

        // =========================
        // DEFAULT
        // =========================
        else {

            await kirim(chatId,
                'Command tidak dikenal. Ketik /help'
            );
        }

        return {
            statusCode: 200,
            body: 'OK'
        };

    } catch (error) {

        return {
            statusCode: 500,
            body: error.toString()
        };
    }
};