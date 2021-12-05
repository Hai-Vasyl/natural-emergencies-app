export enum UserRoles {
    Admin = 'admin',
    User = 'user',
    Unregistered = ''
}

export interface IUserState {
    id: number
    firstname: string
    lastname: string
    email: string
    password: string
    role: UserRoles
    avatar: string
    color: string
}

const initState = {
    id: 1,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: UserRoles.Unregistered,
    avatar: '',
    color: ''
}

const userReducer = (
    state: IUserState = initState,
    action: any,
): IUserState => {
    switch (action.type) {
        default:
            return state;
    }
};

export default userReducer
