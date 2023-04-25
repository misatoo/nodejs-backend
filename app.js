const createError = require("http-errors"); // 处理 404 的插件
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser"); // 解析 cookie 格式的插件
const logger = require("morgan"); // 记录日志的插件


// 引入路由
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const bugsRouter = require("./routes/bugs.js");

// 初始化 app 实例
const app = express();

// 使用中间件
app.use(logger("dev")); // 处理日志
app.use(express.json()); // 处理 application/json 格式的请求体，相当于 nodejs 原生项目中的 getPostData，req.body 直接获取
app.use(express.urlencoded({ extended: false })); // 处理 x-www-form-urlencoded 格式的请求体，getPostData 未做此处理，req.body 直接获取
app.use(cookieParser()); // 解析 cookie，req.cookies 直接获取

// 使用路由。第一个参数是父级路由，第二个参数中的路由会继续拼接
app.use("/", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/bugs", bugsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
