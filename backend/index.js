const app = require('express')()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const user = require('./models/user')
const tweet = require('./models/tweet')

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost/twitter-trial'




mongoose.connect(MONGODB_URI, {
    // useFindAndModify: false,
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},() => {
    console.log(`database connected`)
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())







// Real app ===>

app.post('/api/login',(req,res) => {
    console.log('geldii')
    console.log(req.body)

    user.findOne({
        $and:[
            {$or:[
                    {mail:req.body.usernameOrEmail},{username:req.body.usernameOrEmail}
                ]},
            {password:req.body.password}
        ]
    },(err,user) => {
        if(err) throw err

        console.log(`found user: ${user}`)
        res.send({foundUser:user})
    })
})


app.post('/api/register',(req,res) => {
    console.log(req.body)
    user
        .countDocuments({username:req.body.username},(err,count) => {
            if(err) throw err

            if(count === 0){
                user.create({
                    name:req.body.name,
                    username:req.body.username,
                    password:req.body.password,
                }).then(newUser => {
                    console.log(`newUser from met: ${newUser}`)
                    res.send(newUser)
                })
                    .catch(e => {throw e})
            }
            else{
                res.send(false)
            }
        })
})


app.post('/api/getuserwithoutdetail',(req,res) => {
    console.log(req.body)
    user
        .findOne({username:req.body.username},(err,user) => {
            if(err) throw err

            res.send(user)
        })
})


app.post('/api/getuserwithdetails',(req,res) => {
    user
        .findOne({username:req.body.username})
        .populate({
            path:'tweets',
            options:{
                sort:{createdDate: -1}
            },
            populate:[
                {
                    path:'author',
                    model:'user',
                },
                {
                    path:'parent',
                    model:'tweet',
                    populate:{
                        path:'author',
                        model:'user'
                    }
                }
            ]
        })
        // .populate('likedTweets')
        .exec()
        .then((user) => {
            console.log(user)
            res.send(user)
            console.log("the work")
        })
})


app.post('/api/getthetweet',(req,res) => {
    tweet
        .findOne({_id:req.body.tweetId})
        .populate('author')
        .populate({
            path:"replies",
            populate:[
                {
                    path:'author',
                    model:'user'
                },
                {
                    path:'parent',
                    model:'tweet',
                    populate:{
                        path:'author',
                        model:'user'
                    }
                }
            ]
        })
        .populate({
            path:'parent',
            populate:{
                path:'author',
                model:'user'
            }
        })
        .exec((err,tweet) => {
            if(err) throw err

            console.log(tweet)
            res.send(tweet)
        })
})


app.post('/api/updateuser',(req,res) => {
    console.log(req.body)
    user.update({ _id: req.body.userId }, {$set:req.body.newInfos}, (err, result) => {
        if (err) throw err;

        console.log(result)

        res.send(result)
    });
})


app.post('/api/newtweet',async (req,res) => {
    await tweet
        .create(req.body.tweetContent)
        .then(async (newTweet) => {
            await user
                .findOne({username:req.body.username},async (err,currentUser) => {
                    if(err){console.log(err)}

                    await currentUser.tweets.push(newTweet._id)
                    await currentUser.save()

                    await tweet
                        .findOne({_id:newTweet._id})
                        .populate('author')
                        .exec(async (err,result) => {
                            if(err) throw err
                            await console.log(result)
                            await res.send(result)
                        })
                })
        })
        .catch(e => {throw e})
})


app.post('/api/addreply',async (req,res) => {
    await tweet
        .create(req.body.tweetContent)
        .then(async (newTweet) => {
            tweet
                .findById(newTweet.parent)
                .exec((err,t) => {
                    if(err) throw err

                    t.replies.push(newTweet._id)
                    t.save()
                })
            await user
                .findOne({username:req.body.username},async (err,currentUser) => {
                    if(err){console.log(err)}

                    await currentUser.tweets.push(newTweet._id)
                    await currentUser.save()

                    await tweet
                        .findOne({_id:newTweet._id})
                        .populate('author')
                        .exec(async (err,result) => {
                            if(err) throw err
                            await console.log(result)
                            await res.send(result)
                        })
                })
        })
        .catch(e => {throw e})
})


app.post('/api/gettweetpage',(req,res) => {
    // res.send('succes')
    var page = Number(req.body.page)
    var s = (page - 1) * Number(req.body.tweetPerPage)
    var l = Number(req.body.tweetPerPage)
    tweet
        .find({})
        // .skip(s)
        // .limit(l)
        .sort({createdDate: -1})
        .populate({
            path:'author',
        })
        .exec((err,tweets) => {
            if(err) throw err

            console.log(tweets)
            res.send(tweets)
            console.log(s,l)
            console.log(req.body)
        })
})


app.post('/api/followorunfollow',(req,res) => {
    var currentUserId = req.body.currentUserId
    var userIdToFollow = req.body.userIdToFollow
    var follow = req.body.follow

    console.log(currentUserId,userIdToFollow,follow)

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

    res.send('success')
})


app.post('/api/removetweet',async (req,res) => {
    var tweetId = req.body.tweetId

    await tweet
        .findById(tweetId,(err,t) => {
            if(t.isReply) {
                tweet
                    .findById(t.parent, async (err, parentTweet) => {
                        await parentTweet.replies.splice(parentTweet.replies.indexOf(tweetId), 1)
                        parentTweet.save()
                    })
            }
        })


    tweet
        .findOneAndDelete({_id:tweetId},(err,removed) => {
            if(err) throw err

            console.log(`document have been removed: ${removed}`)
        })
})


app.post('/api/likeorunlike',(req,res) => {
    var currentUserId = req.body.currentUserId
    var tweetId = req.body.tweetId
    var like = req.body.like
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
})


app.post('/api/addorremovefrombookmarks',(req,res) => {
    user
        .findOne({username:req.body.username},(err,u) => {
            if(err) throw err

            if(req.body.add){
                u.bookmarks.unshift(req.body.tweetId)
                u.save()
                res.send("adding to bookmark: success")
            }
            else{
                u.bookmarks.splice(u.bookmarks.indexOf(req.body.tweetId),1)
                u.save()
                res.send("remove from bookmark: success")
            }
        })
})


app.post('/api/getbookmarks',(req,res) => {
    user
        .findOne({username:req.body.username})
        .populate({
            path: 'bookmarks',
            populate:[
                {
                    path: 'author',
                    model: 'user'
                },
                {
                    path: 'parent',
                    model: 'tweet',
                    populate:{
                        path: 'author',
                        model: 'user'
                    }
                }
            ]
        })
        .exec((err,u) => {
            if(err) throw err
            res.send(u.bookmarks)
        })
})

































app.get('/',(req,res) => {
    res.send("Avaiable paths:\n/allUsers\n/allTweets")
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




    // user
    // 	.create({
    // 		username: "firstuser",
    // 		name: "First User",
    // 		password: "12345",
    // 	})


    // user
    //     .findOne({_id:"5fdf455f1eff1e3d75a339d6"})
    //     .populate({
    //         path:'likedTweets',
    //         populate:[{
    //             path:'author',
    //             model:'user',
    //             populate:{
    //                 path:'tweets',
    //                 model:'tweet'
    //             }
    //         },
    //             {
    //                 path:"likedUsers",model:'user'
    //             }
    //         ]
    //     })
    //     .populate('likedUsers')
    //     .exec((err,doc) => {
    //         console.log(err,doc)
    //     })

    // var currentUserId = "5fdf458e3af01c3d92b8c6e6"
    // var newInfos = {
    //     password:"abdullahpassword",
    //     location:"Azerbaijan,Baku"
    // }

    // updateProfile(currentUserId,newInfos).then(result => {
    //     console.log(result)
    // })


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



app.listen(PORT,() => {
    console.log('server running: ' + PORT)
})





