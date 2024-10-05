import { render, screen, waitFor } from "@testing-library/react";

import App from '../App';
import { Users } from '../fixtures/users';

describe("App component test", () => {

    beforeEach(() => {
        global.fetch = jest.fn((url) =>
            Promise.resolve({
                json: () => {
                    if (url === 'https://jsonplaceholder.typicode.com/users') {
                        return Promise.resolve(Users)
                    }
                    if (url === 'https://jsonplaceholder.typicode.com/posts?userId=1') {
                        return Promise.resolve([])
                    }
                    if (url === 'https://jsonplaceholder.typicode.com/users/1') {
                        return Promise.resolve(Users[0])
                    }
                    return Promise.resolve([])
                },
            }),
        ) as jest.Mock;
    })
      
    afterEach(() => {
        jest.clearAllMocks()
    });

    it("renders home page", async () => {
        const { getByTestId, queryByText } = render(<App />);

        await waitFor(() => expect(getByTestId('no-posts')).toBeInTheDocument());
        await waitFor(() => expect(queryByText('No posts found.')).toBeInTheDocument());
    })

    it("should fetch list of users and posts on home page when rendered", async () => {
        render(<App />);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users"));
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts?userId=1"));
    })

    it("should render user toggle button on navbar", async () => {
        render(<App />);

        await waitFor(() => expect(screen.getByTestId('user-toggle')).toBeInTheDocument());
    })
})