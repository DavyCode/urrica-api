import UsersDao from '../daos/users.dao';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource);
  }

  async putById(id: string, resource: PutUserDto): Promise<any> {
    return UsersDao.putUserById(id, resource);
  }

  async getById(id: string) {
    return UsersDao.getUserById(id);
  }

  async getAll(limit: number, page: number) {
    return UsersDao.getAllUsers();
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }

  async getUserByEmailAndPassword(email: string) {
    return UsersDao.getUserByEmailAndPassword(email);
  }
}

export default new UsersService();
