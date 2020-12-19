const app = require('express')()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const user = require('./models/user')
const tweet = require('./models/tweet')

mongoose.connect('mongodb://localhost/twitter-trial', {useNewUrlParser: true},() => {
    console.log('database connected: mongodb://localhost/twitter-trial')
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


function followTheUser(currentUserId,userIdToFollow){
    user.findById(currentUserId,(err,currentUser) => {
        if(err){console.log(err)}

        currentUser.following.push(userIdToFollow)
        currentUser.save()

        user.findById(userIdToFollow,(err,followedUser) => {
            if(err){console.log(err)}

            followedUser.followers.push(currentUserId)
            followedUser.save()
        })
    })
}
// add unfollow(or in same function)


function likeTheTweet(currentUserId,tweetId){
    user.findById(currentUserId,(err,currentUser) => {
        if(err){console.log(err)}

        currentUser.likedTweets.push(tweetId)
        currentUser.save()

        tweet.findById(tweetId,(err,tweet) => {
            if(err){console.log(err)}

            tweet.likedUsers.push(currentUserId)
        })
    })
}
// add unlike(or in same function)


function getTheUser(userId) {
    user
        .findById(userId,(err,user) => {
            if(err){console.log(err)}

            return user.populate('tweets')
        })
}


function getLikedTweetsOfUser(userId){
    user
        .findById(userId)
        .populate('likedTweets')
        .exec((err, user) => {
            if(err){console.log(err)}

            return user.likedTweets
        })
}

// MORE ON NEXT COMMIT ;)











app.get('/',(req,res) => {
    res.send("Aailable paths:\n/allUsers\n/allTweets\n/newUser")
})


app.get('/allUsers',(req,res) => {
    user.find({})
        .populate('following')
        .populate('followers')
        .exec((err,users) => {
            if(err){console.log(err)}
            res.send(users)
        })
})

app.get('/allTweets',(req,res) => {
    user.find({},(err,tweets) => {
        if(err){console.log(err)}
        res.send(tweets)
    })
})

app.get('/newUser',(req,res) => {
    user.create({
        name:"Vahid Veliyev",
        username:"vahid_v",
        mail:"vahidveliyev@gmail.com",
        location:"Azerbaijan,Baku"
    },(err,newUser) => {
        if(err){console.log(err)}
        res.send(newUser)
    })
})

app.get('/follow',(req,res) => {
    user.findOne({username:"vahid_v"},(err,vahid) => {
        if(err){console.log(err)}
        console.log(vahid._id)
        user.findOne({username:"abdullah2005"},(err,abdullah) => {
            if(err){console.log(err)}
            abdullah.followers.push(vahid._id)
            abdullah.save()
        })
        res.send("")
    })
})



app.listen(3000,() => {
    console.log('server running: localhost:3000')
})





