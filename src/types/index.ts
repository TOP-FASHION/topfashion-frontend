export interface UserInfoState {
  [userId: string]: {
    readyStatus: string;
    err: any;
    info: {
      name: string;
      phone: string;
      email: string;
      website: string;
    };
  };
}
