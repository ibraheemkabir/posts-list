import { getPosts } from "../../http/posts";
import { UserPosts } from "../../fixtures/posts";

describe("Posts http api tests", () => {

    beforeEach(() => {
        global.fetch = jest.fn((url) => 
            Promise.resolve({
                json: () => {
                    if (url === 'https://jsonplaceholder.typicode.com/posts?userId=1') {
                        return Promise.resolve(UserPosts)
                    }
                    return Promise.resolve([])
                },
            }),
        ) as jest.Mock;
    })


    it('shoud return list of posts when data is returned by api', async () => {
        const posts = await getPosts(1)
        expect(posts).toHaveLength(UserPosts.length)
    })

})