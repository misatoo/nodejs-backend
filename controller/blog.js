const { exec } = require("../utils/mysql");
const xss = require("xss");

const db = "blog";

// 获取列表数据
const getList = (author, keyword) => {
  // 1=1 是给 where 后面占位用的，如果没有查询条件，直接接上 order by ...，没有 1=1 占位就会语法报错
  let sql = `select * from ${db} WHERE 1=1 `;
  if (author) sql += `and author='${author}' `;
  if (keyword) sql += `and keyword like '%${keyword}%' `;
  sql += `order by createTime desc`;
  // 执行查询语句，返回的是 Promise
  return exec(sql);
};

// 获取详情数据
const getDetail = id => {
  let sql = `select * from ${db} WHERE id='${id}' `;
  // 执行查询语句，返回的是 Promise
  return exec(sql).then(res => {
    return res[0]; // 数据库返回结果是一个数组，取出其中的对象返回
  });
};

// 创建博客
const create = request => {
  // 预防 xss 攻击，将字符串的 尖括号、script 等关键字符进行转义
  const title = xss(request.body.title);
  const content = request.body.content;
  const { author } = request.session;
  const createTime = Date.now();

  let sql = `insert into ${db} (title, content, author, createTime) \
            values ('${title}', '${content}', '${author}', ${createTime})`;

  // 执行查询语句，返回的是 Promise
  return exec(sql).then(res => {
    return {
      id: res.insertId, // mysql 添加行后返回的对象中可以取到 id
    };
  });
};

// 编辑博客
const update = request => {
  const { title, content, id } = request.body;
  const { author } = request.session;

  let sql = `update ${db} set title='${title}', content='${content}' where id=${id} and author=${author}`;

  // 执行查询语句，返回的是 Promise
  return exec(sql).then(res => {
    // mysql 编辑行后返回的对象中可以取到 affectedRows
    if (res.affectedRows === 1) return { id };
    return false;
  });
};

// 删除博客
const remove = request => {
  const { id } = request.body;
  const { author } = request.session;

  let sql = `delete from ${db} where id=${id} and author=${author}`;

  // 执行查询语句，返回的是 Promise
  return exec(sql).then(res => {
    // mysql 编辑行后返回的对象中可以取到 affectedRows
    if (res.affectedRows === 1) return { id };
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  create,
  update,
  remove,
};
