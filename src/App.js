import React, {useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MyButton from "./components/UI/button/MyButton";

function App() {

    const [posts, setPosts] = useState([
        {id: '1', title: 'Some Plan', body: 'Description'},
        {id: '2', title: 'Some Plan', body: 'Description'},
        {id: '3', title: 'Some Plan', body: 'Description'},
    ]);

    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (event) => {
        event.preventDefault();
        setPosts(prevState => [...prevState, {...post, id: Date.now()}]);
        setPost({title: '', body: ''});
    }

    return (
        <div className="App">
            <form>
                <MyInput type={'text'}
                         placeholder={'Title'}
                         onChange={e => setPost({...post, title: e.target.value})}
                         value={post.title}
                />
                <MyInput type={'text'}
                         placeholder={'Description'}
                         onChange={e => setPost({...post, body: e.target.value})}
                         value={post.body}
                />
                <MyButton onClick={addNewPost}>Create Post</MyButton>
            </form>
            <PostList posts={posts} title={'Plans List'}/>
        </div>
    );
}

export default App;
