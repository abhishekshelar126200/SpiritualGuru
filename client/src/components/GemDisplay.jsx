// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const GemDisplay = ({ formData }) => {
//   const [insights, setInsights] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(""); // Error state

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = {
//           day: 6,
//           month: 1,
//           year: 2000,
//           hour: 7,
//           min: 45,
//           lat: 19.132,
//           lon: 72.342,
//           tzone: 5.5,
//         };

//         console.log("Hello");
//         const response = await axios.post("https://spiritualguru.onrender.com/gems", data, {
//           headers: {
//             "Content-Type": "application/json", // Ensure proper content type
//           },
//         });
//         console.log(response.data.filterData);
//         setInsights(response.data.filterData);
//         setLoading(false); // Set loading to false once the data is fetched
//       } catch (error) {
//         setLoading(false); // Set loading to false in case of an error
//         setError("Failed to fetch data. Please try again.");
//         console.error("Error fetching insights:", error.response?.data || error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container my-4">
//       {loading ? (
//         // Loader while data is being fetched
//         <div className="d-flex justify-content-center my-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : error ? (
//         // Error message if fetching fails
//         <div className="alert alert-danger">{error}</div>
//       ) : (
//         // Display data once it is fetched successfully
//         <div className="card shadow">
//           <div className="card-header bg-primary text-white">
//             <h3>Puja Recommendations</h3>
//           </div>
//           <div className="card-body">
//             <p className="card-text">
//               <strong>Summary:</strong> {insights.summary}
//             </p>

//             <div className="list-group">
//               {insights.suggestions.map((puja, index) => (
//                 <div
//                   key={puja.puja_id}
//                   className={`list-group-item list-group-item-action ${
//                     puja.status === "recommended"
//                       ? "list-group-item-success"
//                       : "list-group-item-light"
//                   }`}
//                 >
//                   <div className="d-flex justify-content-between">
//                     <h5>{puja.title}</h5>
//                     <span
//                       className={`badge ${
//                         String(puja.priority) === "high"
//                           ? "bg-danger"
//                           : String(puja.priority) === "medium"
//                           ? "bg-warning"
//                           : "bg-secondary"
//                       }`}
//                     >
//                       {String(puja.priority).charAt(0).toUpperCase() +
//                         String(puja.priority).slice(1)}{" "}
//                       Priority
//                     </span>
//                   </div>
//                   <p className="mb-1">{puja.one_line}</p>
//                   <small>{puja.summary}</small>
//                 </div>
//               ))}
//             </div>

//             {/* Display Do's and Don'ts */}
//             <div className="mt-4">
//               <h5>Do's</h5>
//               <ul className="list-group">
//                 {insights.dos.map((doItem, index) => (
//                   <li key={index} className="list-group-item">
//                     {doItem}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-4">
//               <h5>Don'ts</h5>
//               <ul className="list-group">
//                 {insights.donts.map((dontItem, index) => (
//                   <li key={index} className="list-group-item">
//                     {dontItem}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GemDisplay;


import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const GemDisplay = ({ data }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch("https://spiritualguru-1.onrender.com/gems", {
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
        <div className="card border-0 shadow-lg" style={{ backgroundColor: 'white', borderRadius: '15px' }}>
          <div className="card-header border-0 py-4" style={{ backgroundColor: '#663271' }}>
            <h2 className="text-center mb-0" style={{ color: '#E2E2DA', fontFamily: 'serif' }}>
              Spiritual Recommendations
            </h2>
          </div>
          
          <div className="card-body p-4">
            <div className="mb-4 p-3" style={{ backgroundColor: '#E2E2DA', borderRadius: '10px' }}>
              <h5 className="mb-3" style={{ color: '#663271' }}>Summary</h5>
              <p className="mb-0" style={{ color: '#333' }}>{insights.summary}</p>
            </div>

            <div className="mb-4">
              {insights.suggestions.map((puja) => (
                <div
                  key={puja.puja_id}
                  className="mb-3 p-4"
                  style={{
                    backgroundColor: puja.status === "recommended" ? '#E2E2DA' : 'white',
                    border: '1px solid #E2E2DA',
                    borderRadius: '10px'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 style={{ color: '#663271', margin: 0 }}>{puja.title}</h5>
                    <span className="px-3 py-1 rounded-pill" 
                      style={{
                        backgroundColor: String(puja.priority) === "high" ? '#FF6D2B' : 
                                       String(puja.priority) === "medium" ? '#FFBF3A' : '#3F448C',
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>
                      {String(puja.priority).charAt(0).toUpperCase() + String(puja.priority).slice(1)} Priority
                    </span>
                  </div>
                  <p className="mb-2" style={{ color: '#69448E' }}>{puja.one_line}</p>
                  <small style={{ color: '#666' }}>{puja.summary}</small>
                </div>
              ))}
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="p-4" style={{ backgroundColor: '#E2E2DA', borderRadius: '10px' }}>
                  <h5 className="mb-3" style={{ color: '#663271' }}>Do's</h5>
                  <ul className="list-unstyled mb-0">
                    {insights.dos.map((doItem, index) => (
                      <li key={index} className="mb-2 d-flex align-items-center">
                        <span className="me-2" style={{ color: '#69448E' }}>•</span>
                        <span style={{ color: '#333' }}>{doItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="p-4" style={{ backgroundColor: '#E2E2DA', borderRadius: '10px' }}>
                  <h5 className="mb-3" style={{ color: '#663271' }}>Don'ts</h5>
                  <ul className="list-unstyled mb-0">
                    {insights.donts.map((dontItem, index) => (
                      <li key={index} className="mb-2 d-flex align-items-center">
                        <span className="me-2" style={{ color: '#69448E' }}>•</span>
                        <span style={{ color: '#333' }}>{dontItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GemDisplay;
