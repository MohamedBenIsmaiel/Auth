import buildUser from './user.entity';
import buildAddress from './user-address';
import userEnums from './enums';

const UserAddress = buildAddress();
const User = buildUser({ UserAddress });

export { User, UserAddress, userEnums };
