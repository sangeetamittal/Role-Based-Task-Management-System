import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [value, setValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(value.trim());
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyPress}
      style={{
        padding: "8px",
        width: "250px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
  );
};

export default SearchBar;