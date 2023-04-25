const fs = require("fs");
const path = require("path");
const readline = require("readline");

/**
 * 写日志
 * @param {string} content
 * @param {string} targetLogFilename
 */
const writeLog = (content, targetLogFilename) => {
  // 获取日志文件路径
  const filePath = path.resolve(__dirname, `../logs/${targetLogFilename}.log`);
  // 用流的方式写入
  const writeStream = fs.createWriteStream(filePath, { flags: "a" });
  writeStream.write(content);
};

/**
 * 逐行读取分析日志，利用 readline 模块
 * @param {string} targetLogFilename
 */
const analyseLog = targetLogFilename => {
  // 获取日志文件路径
  const filePath = path.resolve(__dirname, `../logs/${targetLogFilename}.log`);
  // 用流的方式读取
  const readStream = fs.createReadStream(filePath);
  // 将读取流输入到 readline 中
  // nodejs文档：https://nodejs.org/dist/latest-v18.x/docs/api/readline.html#readlinecreateinterfaceoptions
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", line => {
    if (line) {
      // 这里会打印日志中的每一行，拿到每一行数据就可以任意分析了
      console.log(line);
    }
  });
};

module.exports = {
  writeLog,
  analyseLog,
};
