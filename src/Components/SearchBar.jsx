import React from "react";

const SearchBar = ({
  handleChange,
  handleFocus,
  handleBlur,
  inputValue,
  handleKeyDown,
}) => {
  return (
    <div>
      <div className="search-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/10629/10629681.png"
          alt="search icon"
          className="icon"
        />
        <input
          type="text"
          name="search"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          className="search-input"
          onFocus={handleFocus}
          // onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
