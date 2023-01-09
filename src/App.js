import React, {useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {

    const [posts, setPosts] = useState([
        {id: '1', title: 'Some Plan', body: 'Description'},
        {id: '2', title: 'Some Plan', body: 'Description'},
        {id: '3', title: 'Some Plan', body: 'Description'},
    ]);

    const createNewPost = (newPost) => (
        setPosts(prevPosts => [...prevPosts, newPost])
    );


    return (
        <div className="App">
            <PostForm create={createNewPost}/>
            <PostList posts={posts} title={'Plans List'}/>
        </div>
    );
}

export default App;
