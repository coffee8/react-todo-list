import {useState} from "react";

export const useFetching = (callback) => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    async function fetch() {
        try {
            setIsFetching(true);
            await callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsFetching(false);
        }
    }

    return [fetch, isFetching, error];
}