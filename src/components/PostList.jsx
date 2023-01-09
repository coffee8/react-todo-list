import React from 'react';
import '../styles/App.css';
import PostItem from "./PostItem";

const PostList = ({posts, title, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {posts.map((post, index) => <PostItem post={post}
                                                  key={post.id}
                                                  number={index + 1}
                                                  remove={remove}/>)}
        </div>
    );
};

export default PostList;