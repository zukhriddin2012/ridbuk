const kb = require('./keyboard_buttons')
module.exports = {
    home: [
        [kb.home.products],
        [kb.home.news],
        [kb.home.about],
        [kb.home.location]
    ],
    store: [
        [kb.store.phones],
        [kb.store.comps],
        [kb.store.printers],
        [kb.store.random], 
        [kb.back]
    ],
    phones: [
        [{
            text: kb.phones.samsung,
            callback_data: kb.phones.samsung
        }],
        [{
            text: kb.phones.apple,
            callback_data: kb.phones.apple
        }],
        [{
            text: kb.back,
            callback_data: "Menyu"
        }]
    ],

    back: [
        [{
            text: kb.phone.back,
            callback_data: kb.phone.back
        }],
        [{
            text: kb.phone.buy,
            callback_data: kb.phone.buy
        }]
    ],

    location: [
        [{
            text: kb.location.back,
            callback_data: "First"
        }]
    ],

    about: [
        [{
            text: kb.about.channel,
            url: 'https://t.me/joinchat/AAAAAFCy8wEN7j69vlki4Q'
        }],
        [{
            text: kb.about.back,
            callback_data: "First"
        }]
    ]
}