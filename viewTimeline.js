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

const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

async function viewTimeline(access_token) {
  const timeline = await yay.getAllTimeline(access_token);

  for (let i in timeline) {
    const { id, user } = timeline[i];

    if (user.gender == 1) {
      try {
        const acak = randoms(4);
        if (acak >= 2) {
          const fol = await yay.getUserInfo(access_token, user.id);
          if (fol.result !== "error") {
            console.log(
              `[${getTime()}] [Timeline] [${user.nickname}] MENINGGALKAN JEJAK`
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    await delay();
  }
}

async function viewHima(access_token) {
  let himaUser = await yay.getHima(access_token);
  himaUser = himaUser.hima_users;

  for (let i in himaUser) {
    const { id, nickname, gender } = himaUser[i].user;

    if (gender == 1) {
      try {
        const acak = randoms(4);
        if (acak >= 2) {
          const fol = await yay.getUserInfo(access_token, id);
          if (fol.result !== "error") {
            console.log(
              `[${getTime()}] [Hima] [${nickname}] MENINGGALKAN JEJAK`
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    await delay();
  }
}

(async () => {
  const loginInfo = await yay.login(email, password);

  console.log(loginInfo);
  if (loginInfo.result !== "error") {
    const { access_token, user_id, username } = loginInfo;
    await viewTimeline(access_token);
    await viewHima(access_token);
  } else {
    console.log(loginInfo.message);
  }
})();
