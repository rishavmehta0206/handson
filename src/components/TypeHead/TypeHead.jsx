import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './typehead.module.css'
const randomNames = [
  "John Smith",
  "Emma Johnson",
  "Liam Williams",
  "Olivia Brown",
  "Noah Jones",
  "Ava Garcia",
  "William Martinez",
  "Sophia Rodriguez",
  "James Davis",
  "Mia Hernandez",
];


const TypeHead = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [query, setQuery] = useState("");
  const suggestionRef = useRef(null);
  const resultRef = useRef(null);

  const filteredData = useMemo(() => {
    if (query.length === 0) {
      setCursor(-1);
      return randomNames;
    }
    return randomNames.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);


  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [])


  function handleClickOutside(event) {
    if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
      setShowSuggestions(false);
      setCursor(-1);
    }
  }

  function keyboardNav(e) {
    switch (e.key) {
      case "Enter":
        if (cursor >= 0) {
          setQuery(filteredData[cursor]);
          setShowSuggestions(false);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setShowSuggestions(true);
        setCursor((prev) => (prev < filteredData.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setShowSuggestions(true);
        setCursor((prev) => (prev > 0 ? prev - 1 : filteredData.length - 1));
        break;
      case "Escape":
        setShowSuggestions(false);
        setCursor(-1);
        break;
    }
  }

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "nearest"
      })
    }
  }, [cursor])


  return (
    <div className={styles.container}>
      <div ref={suggestionRef} className={styles.wrapper}>
        <input onClick={() => setShowSuggestions(true)} placeholder='Search names' type="text" onKeyDown={keyboardNav} onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }} value={query} />
        {showSuggestions && <div className={styles.suggestions}>
          {
            filteredData.length > 0 ? filteredData.map((name, index) => (
              <div style={{
                backgroundColor: cursor === index ? "lightgray" : "transparent"
              }} ref={cursor === index ? resultRef : null} key={index} className={styles.suggestion}>{name}</div>
            )) : <div className={styles.suggestion}>No Suggestions</div>
          }
        </div>}
      </div>
    </div>
  )
}

export default TypeHead