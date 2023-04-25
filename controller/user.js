const { exec, escape } = require("../db/mysql");

const db = "user";

// 登录
const login = async req => {
  console.log(req.body);
  // 预防 sql 注入（实际在所有地方都应该这样写，这里只是在 login 接口做演示）
  const username = escape(req.body.username);
  const password = escape(req.body.password);

  let sql = `select username, password from ${db} WHERE username=${username} and password=${password}`;
  const result = await exec(sql);
  return result[0];
};

module.exports = {
  login,
};
