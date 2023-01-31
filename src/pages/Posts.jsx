import React, {useEffect, useRef, useState} from "react";
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
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
    });
    const lastElement = useRef();
    const observer = useRef();

    useEffect(() => {
        if(isPostsLoading) return;
        if(observer.current) observer.current.disconnect();
        const options = {
            root: document,
        };

        const handleIntersect = (entries, observer) => {
            if(entries[0].isIntersecting && page < totalPages) {
                setPage(prev => prev + 1);
            }
        }

        observer.current = new IntersectionObserver(handleIntersect, options);
        observer.current.observe(lastElement.current);
    }, [isPostsLoading]);

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page]);


    const createNewPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
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
            {postError && <h1>Some error {postError.message}</h1>}
            <PostList posts={searchedPost} title={'Plans List'} remove={removePost}/>
            <div ref={lastElement} style={{height: '20px', background: 'red'}}/>
            {isPostsLoading && <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>}


            <Pagination totalPages={totalPages}
                        changePage={changePage}
                        page={page}/>
        </div>
    );
}

export default Posts;