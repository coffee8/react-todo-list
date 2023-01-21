import React, {useEffect, useState} from "react";
import './../styles/App.css';
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {getPagesCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import PostService from "../API/PostService";


function Posts() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const searchedPost = usePosts(filter.sort, filter.query, posts);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, []);


    const createNewPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    };

    return (
        <div className="App">
            <MyButton onClick={() => setModal(true)}>
                Create Post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createNewPost}/>
            </MyModal>
            <hr style={{margin: '10px 0'}}/>
            <PostFilter filter={filter}
                        setFilter={setFilter}
            />
            {postError &&
                <h1>Some error {postError.message}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                : <PostList posts={searchedPost} title={'Plans List'} remove={removePost}/>
            }
            <Pagination totalPages={totalPages}
                        changePage={changePage}
                        page={page}/>
        </div>
    );
}

export default Posts;