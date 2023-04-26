const env = process.env.NODE_ENV;

let MYSQL_CONFIG; // mysql
let REDIS_CONFIG; // redis

if (env === "development") {
  // mysql
  MYSQL_CONFIG = {
    host: "10.211.55.4",
    user: "root",
    password: "Yubanmeiqin0)",
    port: "3306",
    database: "test",
  };
  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
  };
} else if (env === "production") {
  // mysql
  MYSQL_CONFIG = {
    host: "10.211.55.4",
    user: "root",
    password: "Yubanmeiqin0)",
    port: "3306",
    database: "test",
  };
  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
};
