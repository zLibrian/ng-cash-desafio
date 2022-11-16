import { Sequelize } from 'sequelize';
import * as config from '../database/config/config';
import Account from '../database/models/Account';
import User from '../database/models/User';
import { User as IUser, UserCreateResponse, UserRegister } from '../interfaces/IUser';
import handleEncrypt from '../utils/handleEncrypt';

const sequelize = new Sequelize(config);

const userService = {
  userExists: async (username: string): Promise<void> => {
    const user = await User.findOne({ where: { username } });
    if (user) throw new Error('usernameAlreadyInUse');
  },

  register: async ({ username, password }: UserRegister): Promise<UserCreateResponse> => {
    await userService.userExists(username);
    const newUser = await sequelize.transaction(async (t): Promise<UserCreateResponse> => {
      const { id: accountId } = await Account.create({}, { transaction: t });
      const hashedPassword = await handleEncrypt.encrypt(password);
      const user = await User.create(
        { username, password: hashedPassword, accountId },
        { transaction: t, raw: true },
      );
      const { password: _, ...userWithoutPassword }: IUser = user.toJSON();
      return userWithoutPassword;
    });
    return newUser;
  },
};

export default userService;
