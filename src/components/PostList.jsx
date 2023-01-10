import React from 'react';
import '../styles/App.css';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                There are no posts yet!
            </h1>
        );
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition key={post.id} classNames='post' timeout={500}>
                        <PostItem post={post} number={index + 1} remove={remove}/>
                    </CSSTransition>)}
            </TransitionGroup>

        </div>
    );
};

export default PostList;