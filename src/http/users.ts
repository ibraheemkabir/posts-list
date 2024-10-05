const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

/**
 * Gets single user details from api endpoint
 * @param activeUser 
 * @returns User object
 */
export const getSingleUserById = (activeUser: number) => {
    try {
        return fetch(`${USERS_ENDPOINT}/${activeUser}`)
        .then((response) => response.json())
        .then((json) => {
            return json
        });
    } catch (error) {
        return null
    }
}

/**
 * Gets lists of users from api endpoint
 * @returns User array
 */
export const getUsers = () => {
    try {
        return fetch(USERS_ENDPOINT)
        .then((response) => response.json())
        .then((json) => {
            return json
        });
    } catch (error) {
        return []
    }
}
