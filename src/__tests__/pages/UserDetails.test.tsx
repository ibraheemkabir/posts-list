import { render, waitFor, fireEvent } from "@testing-library/react";

import App from '../../App';
import { UserPosts } from '../../fixtures/posts';
import { Users } from '../../fixtures/users';

describe("Userdetails component test", () => {

    beforeEach(() => {
        global.fetch = jest.fn((url) =>
            Promise.resolve({
                json: () => {
                    if (url === 'https://jsonplaceholder.typicode.com/users') {
                        return Promise.resolve(Users)
                    }
                    if (url === 'https://jsonplaceholder.typicode.com/posts?userId=1') {
                        return Promise.resolve(UserPosts)
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

    it("should navigate to userDetails page when avatar icon is clicked from posts page", async () => {
        const renderer = render(<App />);

        await waitFor(() => expect(renderer.queryAllByText('Posts')).toHaveLength(1));
        await waitFor(() => expect(renderer.queryAllByText('User Details')).toHaveLength(0));
        await waitFor(() => expect(renderer.getByTestId('user-avatar')).toBeInTheDocument());

        // navigate to user details page
        const userDetailsPageLink = renderer.getByTestId('user-avatar')
        await waitFor(() => fireEvent.click(userDetailsPageLink));

        await waitFor(() => expect(renderer.queryAllByText('Posts')).toHaveLength(0));
        await waitFor(() => expect(renderer.getAllByText('User Details')).toHaveLength(1));
    })

    it("should render the user details on userdetails page", async () => {
        const renderer = render(<App />);

        await waitFor(() => expect(renderer.getByTestId('user-avatar')).toBeInTheDocument());

        const userDetailsPageLink = renderer.getByTestId('user-avatar')
        await waitFor(() => fireEvent.click(userDetailsPageLink));

        // check user details are renderd correctly
        await waitFor(() => expect(renderer.queryAllByText(Users[0].name)).toHaveLength(2));
        await waitFor(() => expect(renderer.queryAllByText(Users[0].email)).toHaveLength(1));
        await waitFor(() => expect(renderer.queryAllByText(Users[0].phone)).toHaveLength(1));
        await waitFor(() => expect(renderer.queryAllByText(Users[0].website)).toHaveLength(1));
    })
})