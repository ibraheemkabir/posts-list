import { useEffect, useState } from "react";
import { Card } from "antd";

import { Post } from "../../pages/Posts/PostsPage";

interface PostCardProps {
    post: Post;
}

export function PostCard(props: PostCardProps) {
    const {post} = props;
    const [isExpanded, setIsExpanded] = useState(false)

    return <Card data-testid={'post-card'} className={`post-card`} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={`content ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <h3>{post.title}</h3>
            {
                isExpanded && (
                    <div className="post-card__expanded">
                        <h3>{post.body}</h3>
                    </div>
                )
            }
        </div>
    </Card>
       
}
