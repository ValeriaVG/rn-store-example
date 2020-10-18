import {createContext} from 'react';
import {User} from './types';

const UserContext = createContext<{
  user?: User;
  setUser: (user: User) => void;
}>({
  user: undefined,
  setUser: () => {},
});
export default UserContext;
