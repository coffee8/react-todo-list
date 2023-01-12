import React, {useEffect, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const searchedPost = usePosts(filter.sort, filter.query, posts);
    const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
        const posts = await PostService.getAll();
        setPosts(posts);
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const createNewPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
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
                : <PostList posts={searchedPost} title={'Plans List'} remove={removePost}/>}
        </div>
    );
}

export default App;
