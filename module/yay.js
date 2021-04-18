const fetch = require("node-fetch");

const login = (email, password) =>
  new Promise((resolve, reject) => {
    fetch("https://api.yay.space/v2/users/login_with_email", {
      method: "POST",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        "content-type": "application/json;charset=UTF-8",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
      },
      body: `{"email":"${email}",
        "password":"${password}",
        "api_key":"e9f1ae4c4470f29a92c0168dc42b13637cc332692103f23e626bc2b016f66603",
        "uuid":"3b72097a4c3d4310"}`,
    })
      .then(async (res) => {
        const body = await res.json();
        resolve(body);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getAllTimeline = (initoken) =>
  new Promise((resolve, reject) => {
    const tokens = initoken;
    fetch("https://api.yay.space/v2/posts/timeline", {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${tokens}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"2c95d037cca9d77673cca182969aee88"',
      },
    })
      .then(async (res) => {
        const timeline = await res.json();
        resolve(timeline.posts);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getFollowingTimeline = (initoken) =>
  new Promise((resolve, reject) => {
    const tokens = initoken;
    fetch("https://api.yay.space/v2/posts/following_timeline", {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${tokens}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"2c95d037cca9d77673cca182969aee88"',
      },
    })
      .then(async (res) => {
        const timeline = await res.json();
        resolve(timeline.posts);
      })
      .catch((err) => {
        reject(err);
      });
  });

const likePost = (token, idPost) =>
  new Promise((resolve, reject) => {
    fetch("https://api.yay.space/v2/posts/like", {
      method: "POST",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        "content-type": "application/json;charset=UTF-8",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
      },
      body: `{"post_ids":[${idPost}]}`,
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const followUser = (token, userId) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v2/users/${userId}/follow`, {
      method: "POST",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        "content-type": "application/json;charset=UTF-8",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
      },
      body: `{"userId":${userId}}`,
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const unfollowUser = (token, userId) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v2/users/${userId}/unfollow`, {
      method: "POST",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        "content-type": "application/json;charset=UTF-8",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
      },
      body: `{"userId":${userId}}`,
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getFollowing = (token, userId) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v2/users/${userId}/web_followings?number=50`, {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
      },
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getNextFollowing = (token, userId, nextId) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://api.yay.space/v2/users/${userId}/web_followings?from_follow_id=${nextId}&number=50`,
      {
        method: "GET",
        headers: {
          authority: "api.yay.space",
          accept: "application/json, text/plain, */*",
          agent: "YayWeb 1.9.0",
          authorization: `Bearer ${token}`,
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
          origin: "https://yay.space",
          "sec-fetch-site": "same-site",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          referer: "https://yay.space/",
          "accept-language": "en-US,en;q=0.9",
          "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
        },
      }
    )
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getFollowers = (token, userId) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v2/users/${userId}/web_followers`, {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
      },
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getUserInfo = (token, userId) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v2/users/${userId}`, {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
      },
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getUserTimeline = (token, userId) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v2/posts/user_timeline?user_id=${userId}`, {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
      },
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getPostInfo = (token, postId) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v2/posts/${postId}`, {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
      },
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const viewVideo = (token, videoId) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v1/posts/videos/${videoId}/view`, {
      method: "POST",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
      },
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getHima = (token) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v2/users/hima_users?number=50`, {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
      },
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

const viewGroup = (token, id) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.yay.space/v1/groups/${id}`, {
      method: "GET",
      headers: {
        authority: "api.yay.space",
        accept: "application/json, text/plain, */*",
        agent: "YayWeb 1.9.0",
        authorization: `Bearer ${token}`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        origin: "https://yay.space",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://yay.space/",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": 'W/"087b529ef3a76e8a9ae739951fd694ca"',
      },
    })
      .then(async (res) => {
        const hasil = await res.json();
        resolve(hasil);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  login,
  getAllTimeline,
  getFollowingTimeline,
  getUserTimeline,
  getFollowers,
  getFollowing,
  getNextFollowing,
  getUserInfo,
  followUser,
  unfollowUser,
  likePost,
  viewVideo,
  getHima,
  viewGroup,
};
