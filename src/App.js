import React, {useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {

    const [posts, setPosts] = useState([
        {id: '1', title: 'My first plan - 1', body: 'Description 1'},
        {id: '2', title: 'My second plan - 2', body: 'Description 2'},
        {id: '3', title: 'My third plan - 3', body: 'Description 3'},
    ]);

    const createNewPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };


    return (
        <div className="App">
            <PostForm create={createNewPost}/>
            {posts.length ?
                <PostList posts={posts} title={'Plans List'} remove={removePost}/>
                :
                <h1 style={{textAlign: 'center'}}>
                    There are no posts yet!
                </h1>
            }

        </div>
    );
}

export default App;
