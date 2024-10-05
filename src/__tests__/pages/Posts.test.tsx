import { render, waitFor, fireEvent } from "@testing-library/react";

import App from '../../App';
import { Users } from '../../fixtures/users';
import { UserPosts } from '../../fixtures/posts';

describe("Posts component test", () => {
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
                    return Promise.resolve([])
                },
            }),
        ) as jest.Mock;
    })
      
    afterEach(() => {
        jest.clearAllMocks()
    });

    it("renders posts page by default", async () => {
        const renderer = render(<App />);

        await waitFor(() => expect(renderer.getByText('Posts')).toBeInTheDocument());
    })

    it("renders posts in cards", async () => {
        const renderer = render(<App />);

        await waitFor(() => expect(renderer.getAllByTestId('post-card')).toHaveLength(UserPosts.length));
    })

    it("should display additional post content when card is clicked", async () => {
        const renderer = render(<App />);

        await waitFor(() => expect(renderer.getAllByTestId('post-card')).toHaveLength(UserPosts.length));

        const postCards = renderer.getAllByTestId('post-card')

        // check post card content body is not displayed before being clicked
        await waitFor(() => expect(renderer.queryAllByText(UserPosts[0].body)).toHaveLength(0));
        
        // click on first post card
        await waitFor(() => fireEvent.click(postCards[0]));


        // check post card content body is displayed after being clicked
        await waitFor(() => expect(renderer.queryAllByText(UserPosts[0].body)).toHaveLength(1));
    })

    it("should render search input field on posts page", async () => {
        const renderer = render(<App />);

        await waitFor(() => expect(renderer.getAllByTestId('search-input')).toHaveLength(1));
        await waitFor(() => expect(renderer.getByPlaceholderText('Search posts')).toBeInTheDocument());
    })

    it("should filter post cards by entry into search field", async () => {
        const renderer = render(<App />);

        await waitFor(() => expect(renderer.getAllByTestId('post-card')).toHaveLength(UserPosts.length));
        await waitFor(() => expect(renderer.getAllByTestId('search-input')).toHaveLength(1));
        await waitFor(() => expect(renderer.getByPlaceholderText('Search posts')).toBeInTheDocument());

        const searchInput = renderer.getByTestId('search-input')

        // type in search input to filter posts
        await waitFor(() => fireEvent.change(searchInput, {target: {value: 'quia'}}));
        await waitFor(() => expect(renderer.queryAllByTestId('post-card')).toHaveLength(1));

        // type in search input to filter posts
        await waitFor(() => fireEvent.change(searchInput, {target: {value: 'quiasssss'}}));
        await waitFor(() => expect(renderer.queryAllByTestId('post-card')).toHaveLength(0));

        await waitFor(() => fireEvent.change(searchInput, {target: {value: ''}}));
    })

    it("should search through post cards and refill posts when search input is cleared", async () => {
        const renderer = render(<App />);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

        await waitFor(() => expect(renderer.getAllByTestId('post-card')).toHaveLength(UserPosts.length));
        await waitFor(() => expect(renderer.getAllByTestId('search-input')).toHaveLength(1));
        await waitFor(() => expect(renderer.getByPlaceholderText('Search posts')).toBeInTheDocument());

        const searchInput = renderer.getByTestId('search-input')

        // type in search input to filter posts
        await waitFor(() => fireEvent.change(searchInput, {target: {value: 'testing'}}));
        await waitFor(() => expect(renderer.queryAllByTestId('post-card')).toHaveLength(0));
        await waitFor(() => expect(renderer.getByText('No posts found.')).toBeInTheDocument());

        // clearing search input field after search should refill post cards
        await waitFor(() => fireEvent.change(searchInput, {target: {value: ''}}));
        await waitFor(() => expect(renderer.queryAllByTestId('post-card')).toHaveLength(4));
    })
})