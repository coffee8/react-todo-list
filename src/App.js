import React, {useMemo, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {

    const [posts, setPosts] = useState([
        {id: '1', title: 'Idk', body: 'Description 1'},
        {id: '2', title: 'Some post', body: 'Description 2'},
        {id: '3', title: 'Aaa ta', body: 'Description 3'},
    ]);

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts]);

    const searchedPost = useMemo(() => {
        if (filter.query) {
            return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
        }
        return sortedPosts;
    }, [filter.query, sortedPosts]);

    const createNewPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
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
            <PostList posts={searchedPost} title={'Plans List'} remove={removePost}/>
        </div>
    );
}

export default App;
