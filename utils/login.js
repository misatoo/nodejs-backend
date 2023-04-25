const redis = require("../utils/redis");

// 如果 sessioin 中的 uid 存在值，代表已经登录
const isLogin = async uid => {
  console.log("------------", await redis.get(uid));
  return await redis.get(uid);
};

// 获取 cookie 过期时间
const getExpireTime = () => {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  return date.toGMTString();
};

module.exports = {
  isLogin,
  getExpireTime,
};
