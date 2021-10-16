import { useCallback, useState } from "react";
import { UseFetchProps } from "../types/appTypes";

const useFetch = () => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const handleHttpCall = useCallback(async ({ url, options = {} }: UseFetchProps) => {
        let data;
        try {
            setIsLoading(true);
            const httpRes = await fetch(encodeURI(url), options);
            if (httpRes.ok) {
                data = await httpRes.json();
            }
        } catch (error: any) {
            setError(error.message)
        }
        setIsLoading(false);
        return data;
    }, [])
    return { handleHttpCall, loading, error }
}
export default useFetch;