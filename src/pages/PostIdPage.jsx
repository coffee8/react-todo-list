import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import {findAllByDisplayValue} from "@testing-library/react";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    });
    const [fetchCommentsById, isCommentsLoading, commentError] = useFetching(async (id) => {
        const response = await PostService.getCommentById(id)
        setComments(response.data)
    });

    useEffect(() => {
        fetchPostById(params.id)
        fetchCommentsById(params.id)
    }, [])

    return (
        <div>
            <h1>{'Post no:' + post.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>
                    <h4>{post.title}</h4>
                    <div>{post.body}</div>
                </div>
            }
            <h2 style={{margin: 10}}>{'Comments'}</h2>
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments.map(comment =>
                        <div key={comment.id} style={{marginTop: 15}}>
                            <h3>{comment.email}</h3>
                            <div>{comment.body}</div>
                        </div>)}
                </div>


            }

        </div>
    );
};

export default PostIdPage;