import React, {useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {

    const [posts, setPosts] = useState([
        {id: '1', title: 'Idk', body: 'Description 1'},
        {id: '2', title: 'Some post', body: 'Description 2'},
        {id: '3', title: 'Aaa ta', body: 'Description 3'},
    ]);

    const [selectedSort, setSelectedSort] = useState('');

    const sortOptions = [
        {value: 'title', name: 'Title'},
        {value: 'body', name: 'Description'},
    ];

    const createNewPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    return (
        <div className="App">
            <PostForm create={createNewPost}/>
            <hr style={{margin: '10px 0'}}/>
            <div>
                <MySelect options={sortOptions}
                          defaultValue={'Sort by'}
                          value={selectedSort}
                          onChange={sortPosts}
                />
            </div>
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
