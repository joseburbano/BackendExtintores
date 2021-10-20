const BaseService = require("./base.service");
const path = require("path");
const fs = require("fs");

let _userRepository = null;

class UserService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    _userRepository = UserRepository;
  }

  async getUserByUsername(email, cedula) {
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

    return await _userRepository.getUserByUsername(email, cedula);
  }

  async getUserByEmail(email) {
    if (!email) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "the email field is a requirement.";
      throw error;
    }

    return await _userRepository.getUserByEmail(email);
  }

  //usuarios activos o inactivos
  async getUsersActive(pageSize, pageNum, active) {
    if (!active) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "the value of active or inactive is required.";
      throw error;
    }
    return await _userRepository.getUsersActive(pageSize, pageNum, active);
  }

  //actualizar avatar
  async uploadAvatar(userId, filePath) {
    if (!userId || !filePath) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "Id must be sent";
      throw error;
    }

    const currentEntity = await this.repository.get(userId);

    if (!currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "entity does not found";
      throw error;
    }

    let user = currentEntity;

    let filePathh = filePath.avatar.path;
    let fileSplit = filePathh.split("/");
    let fileNames = fileSplit[2];
    let extSplit = fileNames.split(".");
    var fileExt = extSplit[1];

    if (fileExt !== "png" && fileExt !== "jpg" && fileExt !== "jpeg") {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message =
        "The image extension is not valid. (Allowed extensions: .png and .jpg)";
      throw error;
    }

    user.avatar = fileNames;

    return await _userRepository.uploadAvatar(userId, user);
  }
  //aca extraemos la imagen
  async getAvatar(filePath) {
    if (!filePath) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "image name is required.";
      throw error;
    }

    const photo = fs.exists(filePath, (exists) => {
      if (!exists) {
        const error = new Error();
        error.code = 401;
        error.status = 401;
        error.message = "The avatar you are looking for does not exist.";
        throw error;
      }

      return filePath;
    });

    return await path.resolve(photo);
  }

  //actualizar datos
  async updateUser(userData, userId) {
    userData.email = userData.email.toLowerCase();

    if (!userData) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "data must be sent to updatet";
      throw error;
    }
    if (!userId) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    return await _userRepository.update(userId, userData);
  }

  //activr usuario
  async activateUser(active, userId) {
    if (!active) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "data must be sent to updatet";
      throw error;
    }
    if (!userId) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    return await _userRepository.activateUser(userId, active);
  }

  //eliminar usuario
  async deleteUser(userId) {
    if (!userId) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    const currentEntity = await this.repository.get(userId);

    if (!currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "entity does not found";
      throw error;
    }

    return await this.repository.delete(userId);
  }

  //agregar usuario desde administrador
  async signUpAdmin(user) {
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

    const userExist = await _userRepository.getUserByUsername(emaill, cedula);
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

    const userExit = await _userRepository.create(user);

    if (userExit) {
      const error = new Error();
      error.code = 201;
      error.status = 201;
      error.message = "User Created Successfully.";
      throw error;
    }

    return userExit;
  }
}

module.exports = UserService;
