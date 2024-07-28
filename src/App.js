import React, { useState } from 'react';  

function App() {  
    const [topic, setTopic] = useState('');  
    const [result, setResult] = useState(null);  
    const [error, setError] = useState('');  

    const handleSearch = async () => {  
        try {  
            const response = await fetch(`/search?topic=${encodeURIComponent(topic)}`);  
            if (response.ok) {  
                const data = await response.json();  
                setResult(data);  
                setError(''); // Clear any previous errors  
            } else {  
                throw new Error('Topic not found');  
            }  
        } catch (error) {  
            setError('Failed to fetch data. Please try again.');  
            setResult(null); // Clear previous results  
        }  
    };  

    return (  
        <div style={{ padding: '20px' }}>  
            <h1>LLM Topic Search</h1>  
            <input  
                type="text"  
                value={topic}  
                onChange={(e) => setTopic(e.target.value)}  
                placeholder="Enter topic"  
            />  
            <button onClick={handleSearch}>Search</button>  
            {error && <div style={{ color: 'red' }}>{error}</div>}  
            {result && (  
                <div>  
                    <h2>Summary:</h2>  
                    <p>{result.summary}</p>  
                    <h2>Videos:</h2>  
                    <ul>  
                        {result.videos.map(video => (  
                            <li key={video.id}>  
                                <a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}</a>  
                            </li>  
                        ))}  
                    </ul>  
                </div>  
            )}  
        </div>  
    );  
}  

export default App;