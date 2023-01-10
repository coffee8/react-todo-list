import {useMemo} from "react";

export const useSortedPosts = (sort, posts) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
    }, [sort, posts]);

    return sortedPosts;
}

export const usePosts = (sort, query, posts) => {
    const sortedPosts = useSortedPosts(sort, posts);
    const searchedPost = useMemo(() => {
        if (query) {
            return sortedPosts.filter(post => post.title.toLowerCase().includes(query));
        }
        return sortedPosts;
    }, [query, sortedPosts]);

    return searchedPost;
}