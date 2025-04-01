import React from 'react';

function FilterSidebar({ categories, selectedCategory, onSelectCategory, selectedState, onSelectState }) {
    const states = ["All", "Solved", "Unsolved"];

    return (
        <div style={sidebarStyle}>
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Categories</h3>
                {categories.map((category) => (
                    <div
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        style={{
                            ...filterOptionStyle,
                            ...(selectedCategory === category ? selectedOptionStyle : {}),
                        }}
                    >
                        {category}
                    </div>
                ))}
            </div>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>State</h3>
                {states.map((state) => (
                    <div
                        key={state}
                        onClick={() => onSelectState(state)}
                        style={{
                            ...filterOptionStyle,
                            ...(selectedState === state ? selectedOptionStyle : {}),
                        }}
                    >
                        {state}
                    </div>
                ))}
            </div>
        </div>
    );
}

const sidebarStyle = {
    minWidth: '12vw',
    padding: '10px',
    border: '1px solid lightgrey',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    marginLeft: '5vw',
};

const sectionStyle = {
    marginBottom: '20px',
};

const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'left',
    marginBottom: '10px',
    paddingBottom: '5px',
};

const filterOptionStyle = {
    padding: '8px 12px',
    cursor: 'pointer',
    textAlign: 'left',
    color: 'grey',
};

const selectedOptionStyle = {
    backgroundColor: 'var(--sky-blue)',
    color: 'var(--dark-blue)',
    fontWeight: 'bold',
    borderRadius: '5px',
};

export default FilterSidebar;
