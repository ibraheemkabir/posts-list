import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Space } from "antd";

import Page from "../../layouts/Page/Page";
import useDebounce from "../../hooks/useDebounce";
import { SearchButton } from "../../components/SearchButton/SearchButton";
import { UserContext } from "../../contexts/UserContext";
import { PostCard } from "../../components/PostCards/PostCard";
import { getPosts } from "../../http/posts";
import "./PostsPage.css";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default function Posts() {
    const debouncedOnChange = useDebounce(() => handleFilterPosts());
    const [searchParams, setSearchParams] = useSearchParams();
    const { activeUser } = useContext(UserContext)

    const [posts, setPosts] = useState<Post[]>([]);
    const [searchParameter, setSearchParameter] = useState<string>(searchParams.get('search') || '');

    useEffect(() => {
        getPostsApi()
    } , [activeUser]);

    async function getPostsApi () {
        const posts = await getPosts(activeUser)
        setPosts(posts);
    }

    function handleFilterPosts () {
        if (!searchParameter) {
            return posts
        }

        const filterResult = posts.filter((post) => {
            const title = post.title?.toLowerCase()
            const body = post.body?.toLowerCase()
            const searchParam = searchParameter?.toLowerCase()

            return title?.includes(searchParam) || body?.includes(searchParam)
        })

        return filterResult
    }

    const handleOnSearch = (searchParam: string) => {
        setSearchParameter(searchParam)
        updateUrlParam(searchParam)
        debouncedOnChange(searchParam);
    }

    const handleClearSearch = () => {
        setSearchParameter("")
        if (searchParams.get('search')){
            setSearchParams({search: ""});
        }
        handleFilterPosts()
    }

    const updateUrlParam = (param: string = searchParameter) => {
        setSearchParams({search: param});
    };

    const postsResults = handleFilterPosts();
    return (
        <Page title="Posts">
            <div className="content">
                <SearchButton value={searchParameter} onChange={handleOnSearch} onClear={handleClearSearch} />
                <Space direction="vertical" className="cards_container">
                    {
                        postsResults.length === 0 
                        ? <p className={'no-content'} data-testid={"no-posts"}>No posts found.</p>
                        : postsResults.map((post, index) => <PostCard key={index} post={post}/>)}
                </Space>
            </div>
        </Page>
    );
}
