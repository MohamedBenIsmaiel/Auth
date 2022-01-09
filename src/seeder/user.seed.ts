import UsersDb from '../components/users/repository';

// will refactor
export default class UserSeed {
  private static data: any = [
    {
      name: 'fatura',
      email: 'fatura@fatura.com',
      role: 'admin',
      password: 'fatura12345'
    },
    {
      name: 'test',
      email: 'test@fatura.com',
      role: 'user',
      password: 'test12345'
    }
  ];

  static async creaeUsers(): Promise<any> {
    const found = await UsersDb.find({
      email: [UserSeed.data[0].email, UserSeed.data[1].email]
    });
    if (!found || Boolean(found.length) == false) {
      return UsersDb.insertMany(UserSeed.data);
    }
  }
}
