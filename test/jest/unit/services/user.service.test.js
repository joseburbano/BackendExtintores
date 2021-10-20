const { expect } = require("chai");
const { UserService } = require("../../../../src/services");
const { UserRepositoryMock } = require("../../mocks");
const {
  UserModelMock: { user, users },
} = require("../../mocks");

describe("User Service Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should find a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.get.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.get(user._id);

    expect(expected).toMatchObject(user);
  });

  test("Should find a user by email", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getgetUserByEmail.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.get(user.email);

    expect(expected).toMatchObject(user);
  });

  test("Should return a user collection", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getAll.mockReturnValue(users);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getAll();

    expect(expected).toMatchObject(users);
  });

  test("Should update a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.update.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.repository.update(user._id, user);

    expect(expected).toMatchObject(user);
  });

  test("Should delete a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.delete.mockReturnValue(true);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.repository.delete(user._id);

    expect(expected).toEqual(true);
  });
});
