// github: https://github.com/redis/node-redis
const { createClient } = require("redis");
const { REDIS_CONFIG } = require("../config/db");

/**
 * 因为初始化 redis 是异步执行，所以可能出现外部引用报错的情况
 *
 * 例如在 app.js 直接引用
 * const redis = require("./utils/redis");
 * redis.get("username");
 * 会报错 redis.get is not a function
 *
 * 但是除了在服务初始化的同步代码中调用以外，其他地方应该都没问题，其他地方调用时，redis 早就初始化完成了
 */
const returnRedisGetSet = {
  set: null,
  get: null,
};

const initRedis = async () => {
  /**
   * 创建 redis 客户端对象
   * url format: redis[s]://[[username][:password]@][host][:port][/db-number]
   */
  const client = createClient({
    url: `redis://${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
  });

  client.on("error", err => console.log("Redis Client Error", err));

  await client.connect();

  /**
   * 新增修改键值对
   */
  const set = async (key, value) => {
    console.log("00000000", value);
    if (!value) {
      value = null;
    } else {
      value = JSON.stringify(value);
    }
    await client.set(key, value);
    console.log("redis 保存到的键值对： ", { key: value });
  };

  const get = async key => {
    console.log("key", key);
    let value = await client.get(key.toString());
    console.log("11111111", value, typeof value);
    if (value) {
      value = JSON.parse(value);
    }
    console.log("redis 读取到的键值对： ", { key: value });
    return value;
  };

  returnRedisGetSet.set = set;
  returnRedisGetSet.get = get;
};

initRedis();

module.exports = returnRedisGetSet;
