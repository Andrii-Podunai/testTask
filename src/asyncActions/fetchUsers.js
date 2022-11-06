import { addUsersReducer } from "../store/userReduser"

export const fetchUsers = (page) => {
    return (dispatch) => {
        fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    dispatch(addUsersReducer(result))
                }
            )

    }
}