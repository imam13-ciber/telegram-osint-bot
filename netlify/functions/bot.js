const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '8608512165:AAF1MZ_kjztIkoV616Sj7mhwXdGyYcChVZk';

const bot = new TelegramBot(token);

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

        // START
        if (text === '/start') {

            await bot.sendMessage(
                chatId,
                'OSINT BOT ONLINE 🚀\n\n' +
                '/ip 8.8.8.8\n' +
                '/user username'
            );
        }

        // IP LOOKUP
        else if (text.startsWith('/ip')) {

            const ip = text.split(' ')[1];

            try {

                const response = await axios.get(
                    http://ip-api.com/json/${ip}
                );

                const d = response.data;

                const hasil =
                    IP: ${ip}\n +
                    NEGARA: ${d.country}\n +
                    KOTA: ${d.city}\n +
                    ISP: ${d.isp};

                await bot.sendMessage(chatId, hasil);

            } catch {

                await bot.sendMessage(
                    chatId,
                    'IP lookup gagal'
                );
            }
        }

        // USERNAME
        else if (text.startsWith('/user')) {

            const username = text.split(' ')[1];

            const hasil =
                USERNAME OSINT\n\n +
                GitHub:\nhttps://github.com/${username}\n\n +
                Instagram:\nhttps://instagram.com/${username}\n\n +
                Twitter/X:\nhttps://x.com/${username};

            await bot.sendMessage(chatId, hasil);
        }

        else {

            await bot.sendMessage(
                chatId,
                'Command tidak dikenal'
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