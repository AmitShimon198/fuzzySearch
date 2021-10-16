import { useState, useEffect, useCallback } from "react";
import useFetch from "./useFetch";

const useSuggestions = () => {
    const { error, loading, handleHttpCall } = useFetch();
    const [suggestions, setSuggestions] = useState<{ name: string }[]>();
    const getSuggestionList = useCallback(async () => {
        const httpRes = await handleHttpCall({ url: `${process.env.REACT_APP_API_BASE_URL}/diagnosisOptions` });
        setSuggestions(httpRes);
    }, [handleHttpCall])
    useEffect(() => {
        getSuggestionList();
    }, [getSuggestionList])

    return { suggestions, error, loading };
}

export default useSuggestions;