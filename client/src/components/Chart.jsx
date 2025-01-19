
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Chart = ({ formData }) => {
  const [svgData, setSvgData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userId = "636994";
  const apiKey = "8b62401863a3cf605980f75ccc26bfb4f51c7d07";
  const language = "en";
  const auth = `Basic ${btoa(`${userId}:${apiKey}`)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = {
      day: formData.dateOfBirth.day,
      month: formData.dateOfBirth.month,
      year: formData.dateOfBirth.year,
      hour: formData.timeOfBirth.hour,
      min: formData.timeOfBirth.minute,
      lat: formData.lat,
      lon: formData.lon,
      tzone: 5.5,
    };

    try {
      const response = await axios.post(
        "https://json.astrologyapi.com/v1/horo_chart_image/D1",
        data,
        {
          headers: {
            authorization: auth,
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );
      setSvgData(response.data.svg);
    } catch (err) {
      setError("Failed to fetch SVG. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#E2E2DA' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3" style={{ 
            color: '#663271',
            fontFamily: 'serif',
            fontWeight: 'bold'
          }}>
            ✨ Celestial Chart ✨
          </h1>
          <p className="lead mb-5" style={{ color: '#69448E' }}>
            Discover your astrological blueprint through a detailed chart reading.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card border-0 shadow-sm" style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              transition: 'all 0.3s ease'
            }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-center mb-4">
                  <button
                    type="button"
                    className="btn btn-lg px-5 py-3"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      backgroundColor: '#663271',
                      color: 'white',
                      borderRadius: '15px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      transform: loading ? 'scale(0.98)' : 'scale(1)'
                    }}
                  >
                    {loading ? (
                      <div>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Generating Chart...
                      </div>
                    ) : (
                      "Generate Your Chart"
                    )}
                  </button>
                </div>

                {error && (
                  <div className="alert" style={{ 
                    backgroundColor: '#FF6D2B',
                    color: 'white',
                    borderRadius: '15px',
                    border: 'none'
                  }} role="alert">
                    {error}
                  </div>
                )}

                {svgData && (
                  <div className="mt-4 chart-container">
                    <h2 className="text-center mb-4" style={{
                      color: '#663271',
                      fontFamily: 'serif',
                      fontWeight: 'bold'
                    }}>
                      Your Celestial Blueprint
                    </h2>
                    <div className="bg-white p-3 rounded-4 shadow-sm d-flex justify-content-center" style={{
                      maxWidth: "100%",
                      overflow: "auto",
                      border: '1px solid rgba(102, 50, 113, 0.1)'
                    }}>
                      <div dangerouslySetInnerHTML={{ __html: svgData }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;