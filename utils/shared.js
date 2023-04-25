/**
 * 获取十位随机数
 */
const getRandomNum = () => {
  const date = Date.now().toString();
  const dateRandomStr = date.substring(date.length - 5);

  const number = Math.random().toString();
  const mathRandomStr = number.substring(number.length - 5);

  return Number(mathRandomStr + dateRandomStr);
};

module.exports = {
  getRandomNum,
};
