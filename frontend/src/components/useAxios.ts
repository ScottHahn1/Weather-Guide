import { useEffect, useState } from 'react';
import axios, { AxiosHeaders } from 'axios';

const useAxios = <S>(url: string, initialState: S, params: {}, headers?: AxiosHeaders) => {
    const [data, setData] = useState<S>(initialState);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(params)[0]) {
            setLoading(true);
            setError(false);
            axios({
                method: 'GET',
                headers: headers,
                url: url,
                params: params
            })
            .then(res => {
                setData(res.data);
                setHasMore(res.data ? true : false);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });
        }
    }, [url, params])

    return { data, hasMore, loading, error };
}

export default useAxios;