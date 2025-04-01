import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function AdminDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const AdmindropdownRef = useRef(null);

    const toggleAdminDropdown = () => {
        setIsOpen(!isOpen);
    };

    const pages = [
        { value: "Users", link: "/admin/users" },
        { value: "Challenges", link: "/admin/challenges" },
        { value: "Notifications", link: "/admin/notifications" },
    ];

    const handleClickOutside = (event) => {
        if (AdmindropdownRef.current && !AdmindropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
        {pages.map((page, index) => (
            <Link 
                key={index} 
                to={page.link} 
                style={AdmindropdownMenuLinkStyle(hoveredIndex === index)}
            >
                {page.value}
            </Link>
        ))}
        </>
        // <div style={mainContainerStyle} ref={AdmindropdownRef}>
        //     <button style={settingsButtonStyle} onClick={toggleAdminDropdown}>
        //         Settings<span style={AdmindropdownArrowStyle}>{isOpen ? "▲" : "▼"}</span>          
        //     </button>
        //     {isOpen && (
        //         <div style={AdmindropdownBoxStyle}>
        //             {pages.map((page, index) => (
        //                 <Link 
        //                     key={index} 
        //                     to={page.link} 
        //                     style={AdmindropdownMenuLinkStyle(hoveredIndex === index)}
        //                     onMouseEnter={() => setHoveredIndex(index)}
        //                     onMouseLeave={() => setHoveredIndex(null)}
        //                 >
        //                     {page.value}
        //                 </Link>
        //             ))}
        //         </div>
        //     )}
        // </div>
    );
}

export default AdminDropdown;

const mainContainerStyle = {
    position: 'relative',
    backgroundColor: 'transparent',
};

const settingsButtonStyle = {
    border: 'none',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    fontSize: '16px',
    cursor: 'pointer'
};

const AdmindropdownArrowStyle = {
    backgroundColor: 'transparent',
};

const AdmindropdownBoxStyle = {
    position: 'absolute',
    top: '100%',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 'inherit',
    minWidth: '150px',
    marginTop: '5px',
};

const AdmindropdownMenuLinkStyle = (isHovered) => ({
    display: 'block',
    padding: '10px 16px',
    margin: '4px',
    textDecoration: 'none',
    color: "white",
    transition: 'background-color 0.2s',
    borderRadius: '8px',
    backgroundColor: 'gray'
});
