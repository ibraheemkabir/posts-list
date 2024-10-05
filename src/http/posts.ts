/**
 * Gets lists of user posts from api endpoint
 * @param activeUser 
 * @returns Post array
 */
export const getPosts = (activeUser: number) => {
    try {
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${activeUser}`)
        .then((response) => response.json())
        .then((json) => {
            return json
        });
    } catch (error) {
        return []
    }
}
