import create from 'zustand';
import User from '../persistence/entities/User';

type ApplicationState = {
  user: User;
  isAuthenticated: boolean;
  authenticate: () => void;
  setAuthenticatedUser: (user: User) => void;
};

const useAuthenticationStore = create<ApplicationState>(set => ({
  user: {} as User,
  isAuthenticated: false,
  authenticate: () => set(state => set({...state, isAuthenticated: true})),
  setAuthenticatedUser: (authenticatedUser: User) =>
    set(state => set({...state, user: authenticatedUser})),
}));

export default useAuthenticationStore;
