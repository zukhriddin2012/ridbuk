const emoji = require('node-emoji')

module.exports = {
    home: {
        products: emoji.emojify(":convenience_store:") + " Do'kon",
        about: emoji.emojify(":page_with_curl:") + " Bizning Kanal",
        location: emoji.emojify(":pushpin:") + " Manzil",
        news: emoji.emojify(":mailbox_with_mail:") + " Yangiliklar"
    },
    store: {
        phones: emoji.emojify(":iphone:") + " Telefonlar",
        comps: emoji.emojify(":computer:") + " Noutbuklar",
        printers: emoji.emojify(":printer:") + " Printerlar",
        random: emoji.emojify(":package:") + " Tasodifiy mahsulot"
    },

    phone: {
        back: emoji.emojify(":back:") + " Orqaga",
        buy: "Sotib olmoq"
    },
    location: {
        back: emoji.emojify(":back:") + " Orqaga",
    },
    about: {
        channel: emoji.emojify(":point_right:")+" Kanalga o'tish",
        back: emoji.emojify(":back:") + " Orqaga"
    },
    back: emoji.emojify(":back:") + " Orqaga",
    phones: {
        apple: "Apple",
        samsung: "Samsung",
        mi: "Mi"
    }
}