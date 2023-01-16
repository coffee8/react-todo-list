import {useState} from "react";

export const useFetching = (callback) => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    async function fetch(...args) {
        try {
            setIsFetching(true);
            await callback(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsFetching(false);
        }
    }

    return [fetch, isFetching, error];
}