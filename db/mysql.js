const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/db");

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect();

// 执行 sql 语句
const exec = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        return reject(err); // 这个在外部没有处理
      }
      resolve(result);
    });
  });
};

module.exports = {
  exec,
  escape: mysql.escape,
};
