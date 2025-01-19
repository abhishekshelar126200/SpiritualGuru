
import React, { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react";

const Insights = ({data}) => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await fetch('https://spiritualguru.onrender.com/insights', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                const responseData = await response.json();
                setInsights(responseData.filterData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError("Failed to fetch insights. Please try again.");
                console.error('Error fetching insights:', error);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#E2E2DA' }}>
                <div className="text-center">
                    <div className="spinner-border" style={{ color: '#663271' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#E2E2DA' }}>
                <div className="alert" style={{ backgroundColor: '#FF6D2B', color: 'white' }}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 py-5" style={{ backgroundColor: '#E2E2DA' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-4 mb-3" style={{ 
                        color: '#663271',
                        fontFamily: 'serif',
                        fontWeight: 'bold'
                    }}>
                        ✨ Astrological Insights ✨
                    </h1>
                    <p className="lead mb-5" style={{ color: '#69448E' }}>
                        Discover detailed guidance across various aspects of your life through the lens of astrology.
                    </p>
                </div>

                <div className="row g-4">
                    {insights && Object.entries(insights).map(([key, value], index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 border-0 shadow-sm hover-shadow" 
                                style={{ 
                                    backgroundColor: 'white',
                                    borderRadius: '15px',
                                    transition: 'all 0.3s ease'
                                }}>
                                <div className="card-body p-4">
                                    <h3 className="card-title h5 mb-3" 
                                        style={{ 
                                            color: '#663271',
                                            fontFamily: 'serif',
                                            fontWeight: '600'
                                        }}>
                                        {key.replace('_', ' ')}
                                    </h3>
                                    <ul className="list-unstyled mb-0">
                                        {value.split('\n').map((line, i) => (
                                            <li key={i} className="mb-2 d-flex align-items-start">
                                                <span className="me-2" style={{ color: '#69448E' }}>•</span>
                                                <span style={{ 
                                                    color: '#333',
                                                    fontSize: '0.9rem',
                                                    lineHeight: '1.5'
                                                }}>
                                                    {line.replace('•', '').trim()}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insights;