const { generateToken } = require("../helpers/jwt.helper");
let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signUp(user) {
    const { email, repeatPassword, password, cedula } = user;

    if (!password || !repeatPassword) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "Missing check password.";
      throw error;
    }

    if (password !== repeatPassword) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "Passwords are not the same.";
      throw error;
    }

    if (!cedula) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "the ID field is a requirement.";
      throw error;
    }

    if (!email) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "the email field is a requirement.";
      throw error;
    }

    const emaill = email.toLowerCase();

    const userExist = await _userService.getUserByUsername(emaill, cedula);
    if (!userExist) {
      const error = Error();
      error.code = 401;
      error.status = 401;
      error.message =
        "User already exist, ID already exist, This ID is already registered in our database, please check the ID field.";
      throw error;
    }

    user.active = false;

    if (user.active) {
      const error = Error();
      error.code = 401;
      error.status = 401;
      error.message = "error updating user status.";
      throw error;
    }

    const userExit = await _userService.create(user);

    if (userExit) {
      const error = new Error();
      error.code = 201;
      error.status = 201;
      error.message = "User Created Successfully.";
      throw error;
    }

    return userExit;
  }

  async signIn(user) {
    const { email, password } = user;

    if (!email) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "Email required.";
      throw error;
    }

    if (!password) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "Password required.";
      throw error;
    }

    const emaill = email.toLowerCase();

    const userExist = await _userService.getUserByEmail(emaill);
    if (!userExist) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Email does not exist.";
      throw error;
    }

    const validPassword = userExist.comparePasswords(password);
    if (!validPassword) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "Invalid Password.";
      throw error;
    }

    const userToEncode = {
      id: userExist._id,
      fullname: userExist.fullname,
      cedula: userExist.cedula,
      tel: userExist.tel,
      email: userExist.email,
      rol: userExist.rol,
      avatar: userExist.avatar,
    };

    const token = generateToken(userToEncode);

    return { token, user: userToEncode };
  }
}

module.exports = AuthService;
