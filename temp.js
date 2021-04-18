const readline = require('readline-sync');
const moment = require('moment');
const chalk = require('chalk');
const yay = require('./module/yay');

const success = chalk.green;
const warn = chalk.yellow;
const error = chalk.red;

function getTime() {
    const waktu = moment().format("h:mm:ss")
    return waktu
}

function randoms() {
    const a = Math.round(Math.random() * 10)
    return a
}

const likespost = (token, id, nama) => new Promise(async (resolve, reject) => {

    const like = await yay.likePost(token, id)
    if (like.result !== 'error') {
        if (like.like_ids.length == 0) {
            resolve(console.log(warn(`[${getTime()}] [${nama}] SEBELUMNYA TELAH DI LIKE`)))
        } else {
            resolve(console.log(success(`[${getTime()}] [${nama}] BERHASIL LIKE`)))
        }
    } else {
        reject(console.log(error(`[${getTime()}] Limit API Gagal Like`)))
    }

})

const follows = (token, id, nama) => new Promise((resolve, reject) => {

    const foll = await yay.followUser(token, id)
    if (foll.result !== 'error') {
        resolve(console.log(success(`[${getTime()}] [${nama}] SUKSES FOLLOW`)))
    } else {
        reject(console.log(error(`[${getTime()}] Limit API Gagal Follow`)))
    }

})


async function likeVideos(token, userId) {
    let listPost = await yay.getUserTimeline(token, userId)
    listPost = listPost.posts
    listPost.forEach((el) => {
        const arr = Object.keys(el)
        const isVideo = arr.some(el => el == 'videos')

        if (isVideo) {
            const vidTitle = el.text
            const loop = setInterval(() => {
                el.videos.forEach(async (item) => {
                    const { id } = item

                    const vid = await yay.viewVideo(token, id)

                    if (vid.result !== 'error') {
                        console.log(success(`[${getTime()}] [${vidTitle}] SUKSES VIEW VIDEO`))
                    } else {
                        console.log(error(`[${getTime()}] ${vid.message}`))
                        clearInterval(loop)
                    }
                })
            }, 1000)
        }

    })
}


function likeTimeline(token) {
    setInterval(async () => {
        console.log(warn(`[${getTime()}] Mengambil Data Beranda`))
        const timeline = await yay.getAllTimeline(token)
        setTimeout(() => {
            timeline.forEach(async (item) => {
                const { id, user } = item
                if (user.gender == 1) {
                    await likespost(token, id, user.nickname, 'BERANDA')

                    //masuk ke timeline user
                    let timelineUser = await yay.getUserTimeline(token, user.id)
                    timelineUser = timelineUser.posts
                    setTimeout(() => {
                        timelineUser.forEach(item1 => {
                            const { id } = item1
                            likespost(token, id, user.nickname, 'TIMELINE USER')
                        })
                    }, 1000)
                }
            })
        }, 1000)
    }, 50000)
}

function jejakBeranda(token) {
    setInterval(async () => {
        console.log(warn(`[${getTime()}] Mengambil Data Beranda`))
        const timeline = await yay.getAllTimeline(token)
        setTimeout(() => {
            timeline.forEach(async (item) => {
                const { user } = item
                if (user.gender == 1) {
                    //buat random kesempatan meninggalkan jejak
                    const a = randoms()
                    if (a > 8) {
                        const fol = await yay.getUserInfo(token, user.id)
                        if (fol.result !== 'error') {
                            const say = chalk.blue(`[${getTime()}] [${user.nickname}] MENINGGALKAN JEJAK`)
                            console.log(say)
                        }
                    }
                }
            })
        }, 2000)
    }, 60000)
}

async function unfollowNotFollback(token, userId) {
    let user = await yay.getFollowing(token, userId)
    let lastId = 0
    const { users, last_follow_id } = user
    user = users
    lastId = last_follow_id
    users.forEach(async (item) => {
        const { id, nickname, followed_by } = item
        if (followed_by == false) {
            const fol = await yay.unfollowUser(token, id)
            if (fol.result !== 'error') {
                const say = chalk.blue(`[${getTime()}] [${nickname}] SUKSES UNFOLLOW`)
                console.log(say)
            } else {
                console.log(error(`[${getTime()}] Limit API Gagal Unfollow`))
            }
        }
    })

    setInterval(async () => {
        const nextunfol = await yay.getNextFollowing(token, userId, lastId)
        const { users, last_follow_id } = nextunfol
        user = users
        lastId = last_follow_id
        users.forEach(async (item) => {
            const { id, nickname, followed_by } = item
            if (followed_by == false) {
                const fol = await yay.unfollowUser(token, id)
                if (fol.result !== 'error') {
                    const say = chalk.blue(`[${getTime()}] [${nickname}] SUKSES UNFOLLOW`)
                    console.log(say)
                } else {
                    console.log(error(`[${getTime()}] Limit API Gagal Unfollow`))
                }
            }
        })

    }, 2000)

}


////////////////////////////////////////////////////////////////////////////////////////////////////////


(async () => {

    const email = 'youarelimbo@gmail.com'
    const password = 'makanhati'

    const loginInfo = await yay.login(email, password)

    if (loginInfo.result !== 'error') {
        const { access_token, user_id, username } = loginInfo

        console.log(success(`BERHASIL LOGIN -> ${username.toUpperCase()}`))


        const menu = [
            'Like Video Pribadi',
            'Like beranda & timeline',
            'Tinggalkan Jejak Beranda',
            'Unfollow Not Follback'
        ]

        const index = await readline.keyInSelect(menu, 'INPUT : ')

        try {

            switch (index) {
                case 0:
                    likeVideos(access_token, user_id)
                    break;
                case 1:
                    likeTimeline(access_token)
                    break;
                case 2:
                    jejakBeranda(access_token)
                    break;
                case 3:
                    unfollowNotFollback(access_token, user_id)
                    break;
                case -1:
                    process.exit(0)
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.log(error)
        }

    } else {
        console.log(error(loginInfo.message))
    }

})()
