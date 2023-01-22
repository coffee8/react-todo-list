import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        console.log(response)
        setPost(response.data)
    });

    useEffect(() => {
        fetchPostById(params.id)
    }, [])

    return (
        <div>
            <div>{post.id}</div>
            {isLoading
                ? <Loader/>
                : <div>{post.title} {post.body}</div>}
        </div>
    );
};

export default PostIdPage;