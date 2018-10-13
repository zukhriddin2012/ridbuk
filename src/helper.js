module.exports = {

    logStart(){
        console.log("Started...")
    },

    getChatId(msg){
        return msg.chat.id
    },

    getItemPid(source){
        return source.substr(2, source.length)
    }
}