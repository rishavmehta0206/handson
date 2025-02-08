import { useEffect, useState } from 'react'
export function useDebounce(query, timelimit = 1000) {
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        let timer = setTimeout(() => {
            setDebouncedQuery(query)
        }, timelimit);

        return () => {
            clearTimeout(timer);
        }
    }, [query])

    return { debouncedQuery }
}