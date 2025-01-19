
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const SpiritualContent = ({data}) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch("https://spiritualguru-1.onrender.com/spiritualContent", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        setInsights(responseData.filterData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching insights:", error);
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
          <p className="mt-3" style={{ color: '#69448E' }}>Loading your spiritual insights...</p>
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
            ✨ Spiritual Insights ✨
          </h1>
          <p className="lead mb-5" style={{ color: '#69448E' }}>
            Discover your spiritual path through personalized guidance
          </p>
        </div>

        <div className="row g-4">
          {insights && Object.entries(insights).map(([key, value]) => (
            <div key={key} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm" 
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}>
                <div className="card-header border-0 py-3" 
                  style={{ 
                    backgroundColor: '#663271',
                    borderBottom: 'none'
                  }}>
                  <h3 className="card-title h5 mb-0 text-center" style={{ 
                    color: '#E2E2DA',
                    fontFamily: 'serif'
                  }}>
                    {value.title}
                  </h3>
                </div>
                
                <div className="card-body p-4">
                  <p className="card-text mb-4" style={{ color: '#333' }}>
                    {value.description}
                  </p>

                  <div className="mb-4" style={{ color: '#69448E' }}>
                    <div className="d-flex align-items-center mb-2">
                      <strong className="me-2">Duration:</strong>
                      <span>{value.duration}</span>
                    </div>
                    
                    {value.goalAlignment && (
                      <div className="d-flex align-items-center mb-2">
                        <strong className="me-2">Goal:</strong>
                        <span>{value.goalAlignment}</span>
                      </div>
                    )}
                    
                    {value.intensityLevel && (
                      <div className="d-flex align-items-center mb-2">
                        <strong className="me-2">Intensity:</strong>
                        <span>{value.intensityLevel}</span>
                      </div>
                    )}
                  </div>

                  {value.audioFile && (
                    <a
                      href={value.audioFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn w-100 text-white"
                      style={{ 
                        backgroundColor: '#69448E',
                        borderRadius: '25px',
                        transition: 'all 0.3s ease',
                        border: 'none'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#663271'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#69448E'}
                    >
                      Listen Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpiritualContent;
