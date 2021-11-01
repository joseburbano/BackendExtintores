class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async get(id) {
    if (!id) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "Id must be sent";
      throw error;
    }

    const currentEntity = await this.repository.get(id);

    if (!currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "entity does not found";
      throw error;
    }

    return currentEntity;
  }

  async getAll(pageSize, pagueNum) {
    return await this.repository.getAll(pageSize, pagueNum);
  }

  async create(entity) {
    return await this.repository.create(entity);
  }

  async update(id, entity) {
    if (!id) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    return await this.repository.update(id, entity);
  }

  async delete(id) {
    if (!id) {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    return await this.repository.delete(id);
  }
}

module.exports = BaseService;
