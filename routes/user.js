const express = require("express");
const router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/response-model");

/**
 * 用户登录
 */
router.post("/login", async (req, res, next) => {
  const result = await login(req);
  console.log(result);
  if (result) {
    // 登录成功
    res.send(new SuccessModel(result, "登录成功"));
  } else {
    // 登录失败
    res.send(new ErrorModel("用户名或密码错误"));
  }
});

/**
 * 查询用户列表
 */
router.post("/queryList", (req, res, next) => {
  res.send("respond with a resource");
});

/**
 * 新建、编辑用户
 */
router.post("/save", (req, res, next) => {
  res.send("respond with a resource");
});

/**
 * 删除用户
 */
router.post("/delete", (req, res, next) => {
  res.send("respond with a resource");
});

module.exports = router;
