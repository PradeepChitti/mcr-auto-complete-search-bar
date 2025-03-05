import { useEffect, useState } from "react";

import "./App.css";
import SearchBar from "./Components/SearchBar";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState([]);
  const [cache, setCache] = useState({});

  const handleChange = (query) => {
    setInputValue(query);
  };

  const handleFocus = () => setShowResults(true);
  const handleBlur = () => setShowResults(false);

  useEffect(() => {
    const fetchData = async () => {
      // Caching
      if (cache[inputValue]) {
        console.log(cache);
        setData(cache[inputValue]);
        return;
      }
      console.log("API called", inputValue);
      let response = await fetch(
        `https://dummyjson.com/recipes/search?q=${inputValue}`
      );
      let responseData = await response.json();
      setData(responseData.recipes);
      setCache((prevState) => ({
        ...prevState,
        [inputValue]: responseData.recipes,
      }));
    };

    // Debouncing
    const timer = setTimeout(fetchData, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, cache]);

  return (
    <div className="App">
      <SearchBar
        handleChange={handleChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        inputValue={inputValue}
      />
      {showResults && data && (
        <div className="results-container">
          {data?.map((el) => {
            return (
              <ul className="results">
                <li key={el.id} onClick={() => setInputValue(el.name)}>
                  {el.name}
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
