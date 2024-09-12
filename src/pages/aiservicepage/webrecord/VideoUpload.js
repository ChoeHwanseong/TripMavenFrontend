import React, { useState } from 'react';
import axios from 'axios';

function VideoUpload() {
    const [video, setVideo] = useState(null);
    const [result, setResult] = useState(null);

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', video);

        try {
            const response = await axios.post('http://localhost:8282/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading video', error);
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            <button onClick={handleSubmit}>Upload Video</button>
            {result && (
                <div>
                    <h2>Analysis Result</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default VideoUpload;
