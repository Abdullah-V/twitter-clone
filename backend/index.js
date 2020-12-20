const app = require('express')()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const user = require('./models/user')
const tweet = require('./models/tweet')

mongoose.connect('mongodb://localhost/twitter-trial', {
    useFindAndModify: false,
    useCreateIndex: true,useNewUrlParser: true,useUnifiedTopology: true },() => {
    console.log('database connected: mongodb://localhost/twitter-trial')
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())











// TAMAM ===>
function followOrUnfollowTheUser(currentUserId,userIdToFollow,follow){
    user
        .findById(currentUserId)
        .exec((error,currentUser) => {
            if(error){console.log(error)}

            console.log(`current user : ${currentUser}`)
            if(follow){
                currentUser.following.push(userIdToFollow)
                currentUser.save()
            }
            else{
                currentUser.following.splice(currentUser.following.indexOf(userIdToFollow),1)
                currentUser.save()
            }
            user
                .findById(userIdToFollow)
                .exec((error,userToFollow) => {
                    if(error){console.log(error)}

                    console.log(`user to follow: ${userToFollow}`)

                    if(follow){
                        userToFollow.followers.push(currentUserId)
                        userToFollow.save()
                    }
                    else{
                        userToFollow.followers.splice(userToFollow.followers.indexOf(currentUserId),1)
                        userToFollow.save()
                    }
                })
        })
}



// TAMAM ===>
function likeOrUnlikeTheTweet(currentUserId,tweetId,like){
    user
        .findById(currentUserId,(err,currentUser) => {
        if(err){console.log(err)}

        if(like){
            currentUser.likedTweets.push(tweetId)
            currentUser.save()
        }
        else {
            currentUser.likedTweets.splice(currentUser.likedTweets.indexOf(tweetId),1)
            currentUser.save()
        }

        tweet.findById(tweetId,(err,tweet) => {
            if(err){console.log(err)}

            if(like){
                tweet.likedUsers.push(currentUserId)
                tweet.save()
            }
            else {
                tweet.likedUsers.splice(tweet.likedUsers.indexOf(currentUserId),1)
                tweet.save()
            }
        })
    })
}

// TAMAM ===>
async function newTweet(currentUserId,tweetContent){
    var returnedTweet
    await tweet
        .create(tweetContent)
        .then(newTweet => {
            user
                .findById(currentUserId,(err,currentUser) => {
                    if(err){console.log(err)}

                    currentUser.tweets.push(newTweet._id)
                    currentUser.save()
                })
            returnedTweet = newTweet
        })
        .catch(e => {throw e})
    return returnedTweet
}


function getTheUser(userId) {
    return user
        .findById(userId)
        .populate('tweets')
        .exec()
}


function getLikedTweetsOfUser(userId){
    return user
        .findById(userId)
        .populate('likedTweets')
        .exec()
}

// TAMAM KIMI... ===>
// async function register(username,password,name){
//     var returned
//     await user
//         .countDocuments({username:username},async (err,count) => {
//             if(err) throw err
//
//             if(count === 0){
//                 await user.create({
//                     name:name,
//                     username:username,
//                     password:password,
//                 }).then(newUser => {
//                     console.log(`newUser from met: ${newUser}`)
//                     returned = newUser
//                 })
//                     .catch(e => {throw e})
//             }
//             else{
//                 returned = "user is exists"
//             }
//         })
//     return returned
// }


// TAMAM ===>
async function login(emailOrUsername,password){
    var returned = "default returned"
    await user.findOne({
        $and:[
            {$or:[
                {email:emailOrUsername},{username:emailOrUsername}
            ]},
            {password:password}
        ]
    },(err,user) => {
        if(err) throw err

        returned = user
    })
    return returned
}


// TAMAM ===>
async function updateProfile(currentUserId,newInfos){
    var returned
    await user.update({ _id: currentUserId }, {$set:newInfos}, (err, result) => {
        if (err) throw err;
        returned = result
    });
    return returned
}


function addNewTweet(currentUserId,tweetContent){

}



// MORE ON NEXT COMMIT ;)











app.get('/',(req,res) => {
    res.send("Avaiable paths:\n/allUsers\n/allTweets\n/newUser")
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
    tweet.find({},(err,tweets) => {
        if(err){console.log(err)}
        res.send(tweets)
    })
})


app.get('/operation',(req,res) => {
    res.send("operation succesfully")

    var currentUserId = "5fdf458e3af01c3d92b8c6e6"
    var newInfos = {
        password:"abdullahpassword",
        location:"Azerbaijan,Baku"
    }

    updateProfile(currentUserId,newInfos).then(result => {
        console.log(result)
    })


    // login("trialuser123","12345").then(result => {
    //     console.log(result)
    // })

    // res.send(getLikedTweetsOfUser("5fdf455f1eff1e3d75a339d6"))

    // getLikedTweetsOfUser("5fdf455f1eff1e3d75a339d6").then(v => {
    //     console.log(v)
    // })

    // getTheUser("5fdf458e3af01c3d92b8c6e6")

    // likeOrUnlikeTheTweet("5fdf455f1eff1e3d75a339d6","5fdf524d20288043451e8fbe",true)

    // console.log(("5fdf458e3af01c3d92b8c6e6",{
    //     isReply:false,
    //     text:"this is a SECOND tweet of @abdullah2005",
    //     author:"5fdf458e3af01c3d92b8c6e6"
    // }))

    // followOrUnfollowTheUser("5fdf458e3af01c3d92b8c6e6","5fdf455f1eff1e3d75a339d6",true)




})



app.listen(3000,() => {
    console.log('server running: localhost:3000')
})





