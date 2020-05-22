import * as mongo from 'mongoose'

const post = mongo.Schema({
    usedId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [String]
})


module.exports = mongo.model("Post", post)