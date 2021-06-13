import create from 'zustand';
import {User} from '../types/User';

type ApplicationState = {
  user: User;
  isAuthenticated: boolean;
  authenticate: () => void;
  setAuthenticatedUser: (user: User) => void;
};

const useStore = create<ApplicationState>(set => ({
  user: {
    id: '',
    username: '',
    nickname: '',
    profilePicture: '',
  },
  isAuthenticated: false,
  authenticate: () => set(state => set({...state, isAuthenticated: true})),
  setAuthenticatedUser: (authenticatedUser: User) =>
    set(state => set({...state, user: authenticatedUser})),
}));

export default useStore;
