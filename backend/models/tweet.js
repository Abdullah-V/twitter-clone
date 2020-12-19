const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new mongoose.Schema({
    text: String,
    createdDate:{type:Date,default:Date.now},
    tweetImage:String,
    reply:Boolean,
    author:[{ type: Schema.Types.ObjectId, ref: 'user' }],
    likedUsers:[{ type: Schema.Types.ObjectId, ref: 'user' }],
    replies: [{ type: Schema.Types.ObjectId, ref: 'tweet' }]
});

var tweet = mongoose.model('tweet', tweetSchema);

module.exports = tweet
