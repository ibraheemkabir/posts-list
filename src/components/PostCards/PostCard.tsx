import { KeyboardEvent, useState } from "react";
import { Card } from "antd";

import { Post } from "../../pages/Posts/PostsPage";
import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";

interface PostCardProps {
    post: Post;
}

export function PostCard(props: PostCardProps) {
    const {post} = props;
    const [isExpanded, setIsExpanded] = useState(false)

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            setIsExpanded(!isExpanded)
        }
    }

    return (
        <Card 
            data-testid={'post-card'}
            className={'post-card'}
            onClick={() => setIsExpanded(!isExpanded)}
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
       
            <div className={'toggle-container'} onClick={() => setIsExpanded(!isExpanded)} aria-label={isExpanded ? 'close' : 'open'}>
                { !isExpanded ? <UpCircleFilled className={`toggle-icon`} /> : <DownCircleFilled className={`toggle-icon`} /> }
            </div>
            
            <article aria-expanded={isExpanded} className={`content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <h3>{post.title}</h3>
                <div hidden={!isExpanded} className="post-card__expanded">
                    {isExpanded && <h3>{post.body}</h3>}
                </div>
            </article>
        </Card>
    )  
}
