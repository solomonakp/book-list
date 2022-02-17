import { useEffect } from 'react';
import { Store } from 'react-notifications-component';
import { notificationSettings } from 'utils/functions';
import { ApolloError } from '@apollo/client';

const useNotification = (
  error: ApolloError | undefined,
  isSubmitSuccessful: boolean | undefined,
  successMessage: string | undefined
): null => {
  useEffect(() => {
    if (error) {
      Store.addNotification({
        ...notificationSettings,
        type: 'danger',
        title: 'Error',
        message: error?.message,
        container: 'top-right',
      });
      return () => {
        Store.removeAllNotifications();
      };
    }
  }, [error]);

  useEffect(() => {
    if (isSubmitSuccessful && successMessage) {
      Store.addNotification({
        ...notificationSettings,
        type: 'success',
        title: 'Success',
        message: successMessage,
        container: 'top-right',
      });
    }
  }, [isSubmitSuccessful, successMessage]);

  return null;
};

export default useNotification;
