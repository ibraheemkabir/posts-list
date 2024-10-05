import { getSingleUserById, getUsers } from "../../http/users";
import { UserPosts } from "../../fixtures/posts";
import { Users } from "../../fixtures/users";

describe("Users http api tests", () => {

    beforeEach(() => {
        global.fetch = jest.fn((url) => 
            Promise.resolve({
                json: () => {
                    if (url === 'https://jsonplaceholder.typicode.com/users') {
                        return Promise.resolve(Users)
                    }
                    if (url === 'https://jsonplaceholder.typicode.com/users/1') {
                        return Promise.resolve(Users[0])
                    }
                    return Promise.resolve([])
                },
            }),
        ) as jest.Mock;
    })


    it('shoud return list of users when data is returned by api', async () => {
        const users = await getUsers()
        expect(users).toHaveLength(Users.length)
    })


    it('shoud return single user data when data is returned by api', async () => {
        const user = await getSingleUserById(1)
        expect(user.name).toEqual(Users[0].name)
    })

})