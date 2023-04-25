class baseModel {
  constructor(data, message) {
    /**
     * 兼容 data 不传，只传 message 的情况
     * 规定：data 是 object 类型，message 是 string 类型
     * 如果第一个参数不是 object，是 string，代表 data 没传，只传了 message
     * 那么将 data 的值赋值给 message，同时将 data 和 message 参数设置为 null，避免干扰后续判断
     */
    if (typeof data === "string") {
      this.message = data;
      data = null;
      message = null;
    }
    if (data) this.data = data;
    if (message) this.message = message;
  }
}

class SuccessModel extends baseModel {
  constructor(data, message = "处理成功") {
    super(data, message);
    this.code = 200;
    this.errno = 1;
  }
}

class ErrorModel extends baseModel {
  constructor(data, message = "处理失败") {
    super(data, message);
    this.code = 200;
    this.errno = 0;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
