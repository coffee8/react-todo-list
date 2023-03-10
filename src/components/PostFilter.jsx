import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {

    const sortOptions = [
        {value: 'title', name: 'Title'},
        {value: 'body', name: 'Description'},
    ];

    return (
        <div>
            <MyInput placeholder={'Search for post...'}
                     value={filter.query}
                     onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <MySelect options={sortOptions}
                      defaultValue={'Sort by'}
                      value={filter.sort}
                      onChange={e => setFilter({...filter, sort: e.target.value})}
            />
        </div>
    );
};

export default PostFilter;