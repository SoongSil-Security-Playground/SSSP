import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import banner from '../assets/images/logo_big.png';
import ReactMarkdown from 'react-markdown';

function MainPage() {
    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        const fetchMarkdown = async () => {
            const response = await fetch('/main.md');
            const text = await response.text();
            setMarkdownContent(text);
        };

        fetchMarkdown();
    }, []);

  return (
    <div style={mainContainerStyle}>
        <div style={contentContainerStyle} >
            <div style={bannerStyle}>
                <img src={banner} alt="banner" style={bannerImageStyle} />
            </div>
            <div style={textContainerStyle}>
                <div style={bodyStyle}>
                    <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}

const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflowX: 'hidden',
};

const contentContainerStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
};

const bannerStyle = {
    backgroundColor: '#D8E0E3',
    minHeight: '600px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const bannerImageStyle = {
    marginTop: '70px',
    height: '300px',
};

const textContainerStyle = {
    backgroundColor: 'white',
    minHeight: '500px',
    width: '100%',
    maxWidth: '50vw',
    marginTop: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '2px solid var(--medium-grey)', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

};

const bodyStyle = {
    marginTop: '50px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    marginBottom: '100px',
};

const textStyle = {
    color: 'var(--dark-blue)',
    fontSize: '20px',
};

const textBoldStyle = {
    color: 'var(--dark-blue)',
    fontSize: '20px',
    fontWeight: 600,
};

export default MainPage;