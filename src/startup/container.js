const { createContainer, asClass, asValue, asFunction } = require("awilix");

//config
const config = require("../config");
const app = require(".");

//services
const {
  HomeService,
  UserService,
  AuthService,
  MenuService,
  PermitService,
  RoleService,
  ControlService,
  ParticipationService,
  ElementsService,
  CovidService,
} = require("../services");

//controllers
const {
  HomeController,
  UserController,
  AuthController,
  MenuController,
  PermitController,
  RoleController,
  ControlController,
  ParticipationController,
  ElementsController,
  CovidController,
} = require("../Controllers");

//routes
const {
  HomeRoutes,
  UserRoutes,
  AuthRoutes,
  MenuRoutes,
  PermitRoutes,
  RoleRoutes,
  ControlRoutes,
  ParticipationRoutes,
  ElementsRoutes,
  CovidRoutes,
} = require("../routes/index.routes");

const Routes = require("../routes");

//models
const {
  User,
  Covid,
  Elements,
  Permissions,
  Menu,
  Role,
  Participation,
} = require("../models");

//repositorys
const {
  UserRepository,
  MenuRepository,
  PermitRepository,
  RoleRepository,
  ControlRepository,
  ParticipationRepository,
  ElementsRepository,
  CovidRepository,
} = require("../repositories");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    MenuService: asClass(MenuService).singleton(),
    PermitService: asClass(PermitService).singleton(),
    RoleService: asClass(RoleService).singleton(),
    ControlService: asClass(ControlService).singleton(),
    ParticipationService: asClass(ParticipationService).singleton(),
    ElementsService: asClass(ElementsService).singleton(),
    CovidService: asClass(CovidService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    MenuController: asClass(MenuController.bind(MenuController)).singleton(),
    PermitController: asClass(
      PermitController.bind(PermitController),
    ).singleton(),
    RoleController: asClass(RoleController.bind(RoleController)).singleton(),
    ControlController: asClass(
      ControlController.bind(ControlController),
    ).singleton(),
    ParticipationController: asClass(
      ParticipationController.bind(ParticipationController),
    ).singleton(),
    ElementsController: asClass(
      ElementsController.bind(ElementsController),
    ).singleton(),
    CovidController: asClass(CovidController.bind(CovidController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    MenuRoutes: asFunction(MenuRoutes).singleton(),
    PermitRoutes: asFunction(PermitRoutes).singleton(),
    RoleRoutes: asFunction(RoleRoutes).singleton(),
    ControlRoutes: asFunction(ControlRoutes).singleton(),
    ParticipationRoutes: asFunction(ParticipationRoutes).singleton(),
    ElementsRoutes: asFunction(ElementsRoutes).singleton(),
    CovidRoutes: asFunction(CovidRoutes).singleton(),
  })
  .register({
    User: asValue(User),
    Covid: asValue(Covid),
    Elements: asValue(Elements),
    Permissions: asValue(Permissions),
    Menu: asValue(Menu),
    Role: asValue(Role),
    Participation: asValue(Participation),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    MenuRepository: asClass(MenuRepository).singleton(),
    PermitRepository: asClass(PermitRepository).singleton(),
    RoleRepository: asClass(RoleRepository).singleton(),
    ControlRepository: asClass(ControlRepository).singleton(),
    ParticipationRepository: asClass(ParticipationRepository).singleton(),
    ElementsRepository: asClass(ElementsRepository).singleton(),
    CovidRepository: asClass(CovidRepository).singleton(),
  });

module.exports = container;
