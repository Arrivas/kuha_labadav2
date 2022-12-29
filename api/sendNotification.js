import { create } from 'apisauce';

const expoNotificationApi = create({
  baseURL: 'https://exp.host/--/api/v2/push/send',
});

export { expoNotificationApi };
