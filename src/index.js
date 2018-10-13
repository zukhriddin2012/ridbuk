const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')
const helper = require('./helper')
const kb = require('./keyboard_buttons')
const keyboard = require('./keyboard')
const mongoose = require('mongoose')
const database = require('../database.json')
const emoji = require('node-emoji')
const fs = require('fs')


helper.logStart()

mongoose.Promise = global.Promise
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true
})
    .then(() => console.log('Mongo DB Connected'))
    .catch((err) => console.log(err))

require('./models/phones')

const phones = mongoose.model('phones')

//database.office.forEach(f => new phones(f).save().catch(e => console.log))

//==============================================

const bot = new TelegramBot(config.TOKEN,  {
    polling: true
})

// Bot creation: Finish

// Start: Get user update
bot.on('message', msg => {
    const chatid = helper.getChatId(msg)

    console.log('Working...')

    switch(msg.text) {
        case kb.home.products:
            bot.sendMessage(chatid, 'Tanlang:', {
                reply_markup: {
                    keyboard: keyboard.store,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            })
            break
        case kb.home.about:
            const fs = require('fs')
            bot.sendPhoto(chatid, fs.readFileSync(__dirname+"/resources/logo.jpg"), {
                reply_markup: {
                    inline_keyboard: keyboard.about,
                    hide_keyboard: true
                }
            })
            break
        case kb.store.phones:
            //sendPhonesByQuery(chatid, {})
            bot.sendMessage(chatid, 'Brendlardan birini tanlang:', {
                reply_markup: {
                    inline_keyboard: keyboard.phones,
                    resize_keyboard: true,
                    hide_keyboard: true
                }
            }).catch(console.error)
            break
        case kb.home.location:
            bot.sendLocation(chatid, 40.783666, 72.345776, {
                reply_markup: {
                    inline_keyboard: keyboard.location,
                    hide_keyboard: true
                }
            })

            break
        case kb.back:
            bot.sendMessage(chatid, 'Tanlang: ', {
                reply_markup: {
                    keyboard: keyboard.home,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            })
            break
    }
})

//End

// Callback query from Phones

bot.on('callback_query', function(msg) {
    console.log(msg.data)
    const chatid = msg.from.id
    //bot.sendMessage(query.message.chat.id, debug(query))
    switch(msg.data){
        case 'Apple':
        console.log("ha")
        sendPhoneByQuery(chatid, 'Apple')
        break
        case 'Samsung':
        sendPhoneByQuery(chatid, 'Samsung')
        break
        case 'Mi':
        sendPhoneByQuery(chatid, 'Mi')
        break
        case kb.phone.back:
        bot.sendMessage(chatid, 'Brendlardan birini tanlang:', {
            reply_markup: {
                inline_keyboard: keyboard.phones,
                resize_keyboard: true,
                hide_keyboard: true
            }
        }).catch(console.error)
        break
        case kb.phone.buy:
        bot.sendMessage(chatid, 'Sotib olish uchun:\nTelegram: @RA_Yusupov\nTelefon: +998914929909', {
            reply_markup: {
                inline_keyboard: keyboard.back,
                hide_keyboard: true
            }
        })
        break
        case "Menyu":
        bot.sendMessage(chatid, 'Tanlang: ', {
            reply_markup: {
                keyboard: keyboard.store,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
        break
        case "First":
        bot.sendMessage(chatid, 'Tanlang: ', {
            reply_markup: {
                keyboard: keyboard.home,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
        break
    }
})

//End

//Trying to get id
bot.onText(/\/f(.+)/, (msg, [source, match]) => {
    const phonePid = helper.getItemPid(source)
})
//End


//Start: start

bot.onText(/\/start/, msg => {
    const text = 'Salom, ' + msg.from.first_name + '\nTanlang: '

    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup: {
            keyboard: keyboard.home,
            one_time_keyboard: true
        }
    })

})

//end



/*function sendHTML(chatid, html, kbName = null){
    const options = {
        parse_mode: 'HTML'
    }

    
    if(kbName){
        options['reply_markup'] = {
            keyboard: keyboard[kbName]
        }
    }

    bot.sendMessage(chatid, html, options)
}
*/

function sendPhoneByQuery(chatid, query) {

    const fs = require('fs')


    const options = {
        parse_mode: 'HTML'
    }
    phones.findOne({company: query}).then(phones => {
        const caption = emoji.emojify(":iphone:") + '<b>' + phones.company + ' ' + phones.model + '</b>\n\n'+emoji.emojify(":moneybag:")+'Narxi: '+phones.price+"so'm\n\n"+ emoji.emojify(":battery:")+'<b>Batareya:</b> '+phones.battery+'mAh\n<b>'+emoji.emojify(":camera_with_flash:")+'Kamera:</b> '+phones.camera+'\n<b>'+emoji.emojify(":floppy_disk:")+'Xotira:</b> '+phones.memory+'\n\n<i>"'+phones.comments+'"</i>'


        bot.sendPhoto(chatid, fs.readFileSync(__dirname+'/resources/'+phones.model+'.jpg'), {
            caption: caption,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: keyboard.back,
                hide_keyboard: true
            }
        })
    })
}