// src/components/DM_Dashboard.jsx

import React, { useState } from 'react';
import axios from 'axios';

// Base URL for your deployed backend on Render
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DM_Dashboard = () => {
    const [view, setView] = useState('dashboard');
    const [postType, setPostType] = useState('public');
    const [postContent, setPostContent] = useState('');
    const [selectedHODs, setSelectedHODs] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const formData = new FormData();
        formData.append('content', postContent);
        formData.append('postType', postType);
        if (postType === 'private') {
            formData.append('selectedHODs', JSON.stringify(selectedHODs));
        }
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            // The API endpoint for post creation
            const response = await axios.post(`${API_BASE_URL}/api/create-post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // You should pass the user's auth token for authentication
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
            // Reset form
            setPostContent('');
            setImageFile(null);
            setSelectedHODs([]);

        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to create post.');
        }
    };

    const renderContent = () => {
        switch (view) {
            case 'create-post':
                return (
                    <div className="module-container">
                        <h3>Post Creation Module</h3>
                        <form onSubmit={handlePostSubmit}>
                            <div className="form-group">
                                <label>Audience:</label>
                                <div className="radio-group">
                                    <input 
                                        type="radio" 
                                        id="public" 
                                        name="postType" 
                                        value="public" 
                                        checked={postType === 'public'} 
                                        onChange={() => setPostType('public')} 
                                    />
                                    <label htmlFor="public">All HODs</label>

                                    <input 
                                        type="radio" 
                                        id="private" 
                                        name="postType" 
                                        value="private" 
                                        checked={postType === 'private'} 
                                        onChange={() => setPostType('private')} 
                                    />
                                    <label htmlFor="private">Selected HODs</label>
                                </div>
                            </div>

                            {postType === 'private' && (
                                <div className="form-group">
                                    <label htmlFor="hods">Select HODs:</label>
                                    {/* This would be a multi-select dropdown, populated from an API call */}
                                    <select 
                                        id="hods" 
                                        multiple 
                                        value={selectedHODs} 
                                        onChange={(e) => 
                                            setSelectedHODs(Array.from(e.target.selectedOptions, option => option.value))
                                        }>
                                        <option value="hod1">HOD 1</option>
                                        <option value="hod2">HOD 2</option>
                                    </select>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="content">Post Content (text):</label>
                                <textarea 
                                    id="content" 
                                    value={postContent} 
                                    onChange={(e) => setPostContent(e.target.value)} 
                                    rows="5"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Image (optional):</label>
                                <input 
                                    type="file" 
                                    id="image" 
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                />
                            </div>

                            <button type="submit">Send Post</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                );

            default:
                return (
                    <div className="module-container">
                        <h2>Dashboard Overview</h2>
                        <p>Welcome to the EDMS, District Magistrate. Use the navigation to manage electoral processes.</p>
                        {/* You could add quick stats or a summary here later */}
                    </div>
                );
        }
    };

    return (
        <div className="dm-dashboard-layout">
            <nav className="sidebar">
                <h3>Modules</h3>
                <ul>
                    <li onClick={() => setView('dashboard')}>Dashboard Overview</li>
                    <li onClick={() => setView('employee-overview')}>Employee Overview</li>
                    <li onClick={() => setView('hod-management')}>HOD Management</li>
                    <li onClick={() => setView('randomization')}>Randomization</li>
                    <li onClick={() => setView('create-post')}>Post Creation</li>
                </ul>
                <button onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userRole');
                    window.location.href = '/';
                }}>Logout</button>
            </nav>
            <main className="content-area">
                {renderContent()}
            </main>
        </div>
    );
};

export default DM_Dashboard;