

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function TableData({ fetchData }) {
  const [details, setDetails] = useState({});

  const userId = "637011";
  const apiKey = "7afc7fb7ceb69910184f36c8d041d19411839feb";
  const language = "en"; // Default is 'en'

 

  const auth = `Basic ${btoa(`${userId}:${apiKey}`)}`;

  const createDataRows = () => {
    const entries = Object.entries(details);
    const rows = [];
    for (let i = 0; i < entries.length; i += 2) {
      rows.push([
        entries[i],
        entries[i + 1] ? entries[i + 1] : null
      ]);
    }
    return rows;
  };
  
  useEffect(() => {
    const dataRetrieve=async ()=>{
      setDetails(await fetchData());
    }
    dataRetrieve();
  }, []);

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/_/g, ' ');
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
            ✨ Astrological Details ✨
          </h1>
          <p className="lead mb-5" style={{ color: '#69448E' }}>
            Explore your detailed astrological profile based on your birth details.
          </p>
        </div>

        <div className="card border-0 shadow-sm" style={{ 
          backgroundColor: 'white',
          borderRadius: '15px',
          transition: 'all 0.3s ease'
        }}>
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center" style={{ color: '#663271', fontFamily: 'serif', fontWeight: '600' }}>Parameter</th>
                    <th className="text-center" style={{ color: '#663271', fontFamily: 'serif', fontWeight: '600' }}>Value</th>
                    <th className="text-center" style={{ color: '#663271', fontFamily: 'serif', fontWeight: '600' }}>Parameter</th>
                    <th className="text-center" style={{ color: '#663271', fontFamily: 'serif', fontWeight: '600' }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {createDataRows().map((row, index) => (
                    <tr key={index} style={{
                      backgroundColor: index % 2 === 0 ? '#fff' : '#f8f8f5'
                    }}>
                      {row.map((item, i) =>
                        item ? (
                          <React.Fragment key={i}>
                            <td className="fw-bold" style={{ 
                              color: '#69448E',
                              fontSize: '0.9rem',
                              fontFamily: 'serif'
                            }}>
                              {formatKey(item[0])}
                            </td>
                            <td style={{ 
                              color: '#333',
                              fontSize: '0.9rem',
                              lineHeight: '1.5'
                            }}>
                              {item[1]}
                            </td>
                          </React.Fragment>
                        ) : (
                          <td colSpan="2" key={i} />
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableData;