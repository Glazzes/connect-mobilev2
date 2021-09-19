import React, {useMemo} from 'react';

// @ts-ignore
import SockJsClient from 'react-stomp';
import useAuthenticationStore from '../../shared/store/AuthenticationStore';
import {WEB_SOCKET_ENDPOINT} from '../../shared/utils/UrlConstants';
import UserEventHandler from './events/UserEventHandler';

const UserNotificationHandler = () => {
  const authenticatedUser = useAuthenticationStore(state => state.user);
  const userEventHandler = useMemo(() => {
    return null;
  }, []);

  const onMessage = (event: any) => {};

  return <SockJsClient url={WEB_SOCKET_ENDPOINT} onMessage={onMessage} />;
};

export default UserNotificationHandler;
