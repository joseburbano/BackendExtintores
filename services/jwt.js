const jwt = require("jwt-simple");
const moment = require("moment");

const SECRE_KEY = "kjdbfndDedsFJ542dsAD1289WHsdmnsLKSAInGHGHJjVchi56846543ñpyftyj675465oi";

exports.createAccessToken = (user) =>{
  const payload = {
    id: user._id,
    fullname: user.fullname,
    cedula: user.cedula,
    tel: user.tel,
    email: user.email,
    rol: user.rol,
    avatar: user.avatar,
    createToken: moment().unix(),
    exp: moment().add(360, "minute").unix(),
  };
  return jwt.encode(payload, SECRE_KEY);
};

exports.createRefreshToken = (user) =>{
  const payload = {
    id: user.id,
    exp: moment().add(24, "hours").unix(),
  };
  return jwt.encode(payload, SECRE_KEY);
};

exports.decodedToken = (token)=> {
  return jwt.decode(token, SECRE_KEY, true);
};
