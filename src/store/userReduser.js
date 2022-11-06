const defaultState = {
    users: [],
    data: {}
}
const USERS_SEND = 'USERS_SEND'
const USER_ADD = 'USER_ADD'

export const usersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USERS_SEND:
            return {
                ...state,
                users: [...state.users, ...action.payload.users],
                data: { ...action.payload.links }
            }
        case USER_ADD:
            return {
                ...state,
                users: [action.payload, ...state.users.slice(0, 5)],
            }
        default: return state
    }
}

export const addUsersReducer = (payload) => ({ type: USERS_SEND, payload })
export const addUserReducer = (payload) => ({ type: USER_ADD, payload }) 