const yay = require("./module/yay");
const moment = require("moment");
const akun = require("./akun.json");

const email = akun.email;
const password = akun.password;

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

(async () => {
  const loginInfo = await yay.login(email, password);
  let nextId = 0;

  console.log(loginInfo);
  if (loginInfo.result !== "error") {
    const { access_token, user_id, username } = loginInfo;

    //awal
    const followingList = await yay.getFollowing(access_token, user_id);
    if (followingList.result === "success") {
      const { users, last_follow_id } = followingList;
      nextId = last_follow_id;
      for (let i in users) {
        const { id, followed_by } = users[i];
        if(followed_by==false){
          const unfollow = await yay.unfollowUser(access_token,id)
          if(unfollow.result == "success"){
            console.log(`[${getTime()}] [${id}] Unfollowed`)
          }
        }
        await delay();
      }
    }

    //nextStep
    while (true) {
      try {
        console.log(`[${getTime()}] Find next..`)
        const nextFollowingList = await yay.getNextFollowing(
          access_token,
          user_id,
          nextId
        );
        if (nextFollowingList.result === "success") {
          const { users, last_follow_id } = nextFollowingList;
          nextId = last_follow_id;
          for (let i in users) {
            const { id, followed_by } = users[i];
            if(followed_by==false){
              const unfollow = await yay.unfollowUser(access_token,id)
              if(unfollow.result == "success"){
                console.log(`[${getTime()}] [${id}] Unfollowed`)
              }
            }
            await delay();
          }
        }
        await delay();
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    console.log(loginInfo.message);
  }
})();
