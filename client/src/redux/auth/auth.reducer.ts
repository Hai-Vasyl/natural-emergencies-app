interface IMessage {
  message: string;
  param: string;
}

interface IAuthState {
  loading: boolean;
  access_token: string;
  errors: IMessage[];
}

const initState = {
  loading: false,
  access_token: '',
  errors: [],
};

const authReducer = (
  state: IAuthState = initState,
  action: any,
): IAuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;