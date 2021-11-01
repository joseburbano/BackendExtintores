let _authService = null;

class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signUp(req, res) {
    const { body } = req;
    const createdUser = await _authService.signUp(body);
    return res.send({
      code: 201,
      message: "User Created Successfully.",
      createdUser,
    });
  }

  async signIn(req, res) {
    const { body } = req;
    const creds = await _authService.signIn(body);
    return res.status(200).send({
      code: 200,
      user: creds.user._id,
      rol: creds.user.rol,
      accessToken: creds.token,
      refreshToken: creds.token,
      creds,
    });
  }
}

module.exports = AuthController;
