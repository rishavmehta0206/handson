import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './autocomplete.module.css';
import { useDebounce } from './useDebounce';

const Autocomplete = () => {
    const [modal, setModal] = useState(false);
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');

    const { debouncedQuery } = useDebounce(search, 1000)

    function handleClickOutside(event) {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setModal(false);
        }
    }
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [])


    let filteredData = useMemo(() => {
        if (debouncedQuery.length === 0) return [];
        return ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli fruit', 'watermelon'].filter((item) => item.toLowerCase().includes(debouncedQuery.toLowerCase()))
    }, [debouncedQuery])

    console.log(debouncedQuery,filteredData)

    return (
        <div ref={searchRef} className={styles.searchContainer}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setModal(true)} type="text" placeholder='Search...' className={`${styles.searchField} ${modal && filteredData?.length > 0 ? styles.active : ''}`} />
            {modal && filteredData?.length > 0 && <div className={styles.optionsContainer}>
                {filteredData?.map(data => <div className={styles.searchResults}>{data}</div>)}</div>}
        </div>
    )
}

export default Autocomplete