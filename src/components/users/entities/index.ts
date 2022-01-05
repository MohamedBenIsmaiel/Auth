import buildUser from './user.entity';
import buildAddress from './user-address';
import userEnums from './enums';

const UserAddress = buildAddress();
const User = buildUser({ userEnums, UserAddress });

export { User, UserAddress, userEnums };
