import React, { useState } from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={searchBarStyle}>
            <input
                style={inputStyle({ isFocused })}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
}

export default SearchBar;

const searchBarStyle = {
    margin: '0 auto',
};

const inputStyle = ({ isFocused }) => ({
    padding: '10px',
    border: 'none',
    boxShadow: isFocused ? '0 0 5px #006e93' : '0 0 8px lightgray',
    borderRadius: '24px',
    fontSize: '16px',
    outline: 'none',
    transition: 'transform 0.2s',
    width: '500px',
    marginTop: '20px',
    marginBottom: '20px',
});