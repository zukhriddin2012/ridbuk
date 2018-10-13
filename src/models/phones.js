const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhoneSchema = new Schema(
    {
        model: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },
        battery: {
            type: String
        },
        camera: {
            type: String
        },
        memory: {
            type: String
        },
        company: {
            type: String
        },
        comments:{
            type: String
        },
        pid: {
            type: String
        }
        /*
        Cinemas: {
            type: [String],
            default: []}
            */
    }
)

mongoose.model('phones', PhoneSchema)