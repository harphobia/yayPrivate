const yay = require("./module/yay");
const moment = require("moment");
const akun = require("./akun.json");

const email = akun.email;
const password = akun.password;

function randoms(max) {
  return Math.round(Math.random() * max);
}

function getTime() {
  const waktu = moment().format("h:mm:ss");
  return waktu;
}

const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(`[${getTime()}] Slepp...`));
    }, 10000);
  });

const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const likepost = (token, id, nama, tempat) =>
  new Promise(async (resolve, reject) => {
    const like = await yay.likePost(token, id);
    if (like.result !== "error") {
      if (like.like_ids.length == 0) {
        resolve(
          console.log(
            `[${getTime()}] [${tempat}] [${nama}] SEBELUMNYA TELAH DI LIKE`
          )
        );
      } else {
        resolve(
          console.log(`[${getTime()}] [${tempat}] [${nama}] BERHASIL LIKE`)
        );
      }
    } else {
      // reject(`[${getTime()}] [${nama}] Limit API Gagal Like`);
      console.log(`[${getTime()}] [${nama}] Limit API Gagal Like`);
    }
  });

const follows = (token, id, nama) =>
  new Promise(async (resolve, reject) => {
    const foll = await yay.followUser(token, id);
    if (foll.result !== "error") {
      resolve(console.log(`[${getTime()}] [${nama}] SUKSES FOLLOW`));
    } else {
      // reject(`[${getTime()}] [${nama}] Limit API Gagal Follow`);
      console.log(`[${getTime()}] [${nama}] Limit API Gagal Follow`);
      // process.exit(1);
    }
  });

const randomLike = async (token, list, nickname, tempat) => {
  if (list.length !== 0) {
    const angka = await randoms(list.length - 1);
    const post = await list[angka];
    const { id, liked } = post;

    if (liked !== true) {
      await likepost(token, id, nickname, tempat);
    }
  }
};

//!----------------------------------------------------------------------------------------------

(async () => {
  const loginInfo = await yay.login(email, password);

  console.log(loginInfo);
  if (loginInfo.result !== "error") {
    const { access_token, user_id, username } = loginInfo;

    while (true) {
      try {
        const timeline = await yay.getAllTimeline(access_token);

        for (let i in timeline) {
          const { id, user } = timeline[i];

          if (user.gender == 1) {
            //   await follows(access_token, user.id, user.nickname);
            //  await likepost(access_token, id, user.nickname, "Beranda");

            Promise.all([
              await likepost(access_token, id, user.nickname, "Beranda"),
              await follows(access_token, user.id, user.nickname),
            ]);

            //masuk ke timeline user
            let userTimeline = await yay.getUserTimeline(access_token, user.id);
            userTimeline = userTimeline.posts;

            if(userTimeline.length >0){
              const filteredUserTimeline = await userTimeline.filter((el) => {
                return el.liked !== true;
              });
  
              for (let j = 0; j < 4; j++) {
                await randomLike(
                  access_token,
                  filteredUserTimeline,
                  user.nickname,
                  "Timeline"
                );
                await delay();
              }
            }
          }
        }

        await sleep();
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    console.log(loginInfo.message);
  }
})();
