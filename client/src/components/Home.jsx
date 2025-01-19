


// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import './Home.css'
// import { useNavigate,Link } from 'react-router-dom';

// function Home() {


//         const openCageApiKey = '51d5d1c924fa47598be53b460ee6a776';
//         const [input,setInput]=useState('');
//         const suggestionsList = document.getElementById('suggestions');
//         const output = document.getElementById('output');
//         let timeout = null;
//         useEffect(()=>{
//             const fetchData=async ()=>{
//                 const suggestions = await fetchSuggestions(input);
//                 displaySuggestions(suggestions);
//             }
//             fetchData();
            
//         },[input]);

//         async function fetchSuggestions(query) {
//             const url = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${openCageApiKey}&limit=5`;
//             try {
//                 const response = await fetch(url);
//                 const data = await response.json();
//                 return data.results.map(result => ({
//                     name: result.formatted,
//                     lat: result.geometry.lat,
//                     lng: result.geometry.lng,
//                 }));
//             } catch (error) {
//                 console.error('Error fetching suggestions:', error);
//                 return [];
//             }
//         }



//         // Display suggestions in the dropdown
//         function displaySuggestions(suggestions) {
            
//             suggestions.forEach(suggestion => {
//                 const li = document.createElement('li');
//                 li.textContent = suggestion.name;
//                 li.addEventListener('click', () => selectSuggestion(suggestion));
//                 suggestionsList.appendChild(li);
//             });
//         }

//         // Handle suggestion selection
//         function selectSuggestion(suggestion) {
//             setInput(suggestion.name); // Set input value to selected suggestion
            
//             output.innerHTML = `
//                 <strong>Selected Location:</strong> ${suggestion.name}<br>
//                 <strong>Latitude:</strong> ${suggestion.lat}<br>
//                 <strong>Longitude:</strong> ${suggestion.lng}
//             `;
//         }















//   const navigate=useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     birthLocation: '',
//     gender: '',
//     dateOfBirth: { day: '', month: '', year: '' },
//     timeOfBirth: { hour: '', minute: '' },
//     lat: 19.132,
//     lon: 72.342,
//     tzone: 5.5,
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'dateOfBirth') {
//       const [year, month, day] = value.split('-');
//       setFormData((prevData) => ({
//         ...prevData,
//         dateOfBirth: { day, month, year },
//       }));
//     } else if (name === 'timeOfBirth') {
//       const [hour, minute] = value.split(':');
//       setFormData((prevData) => ({
//         ...prevData,
//         timeOfBirth: { hour, minute },
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // try {
//     //   const response = await axios.post('https://example.com/endpoint', formData);
//     //   console.log('Form submitted successfully:', response.data);
//     //   alert('Your cosmic path has been revealed!');
//     // } catch (error) {
//     //   console.error('Error submitting form data:', error);
//     //   alert('Failed to submit your data. Please try again.');
//     // }

//     navigate('/details');
//   };

//   return (
//     <div>
//       <div className="container py-5 animate__animated animate__fadeIn">
//         <div className="row justify-content-center">
//           <div className="col-lg-8 col-md-10">
//             <div className="text-center mb-5">
//               <h1 className="site-title mb-3">✨ Mystic Insights</h1>
//               <p className="site-subtitle">Discover Your Cosmic Blueprint</p>
//             </div>

//             <div className="astrology-card animate__animated animate__fadeInUp animate__delay-1s">
//               <form>
//                 <div className="mb-4">
//                   <label className="form-label">
//                     <i className="cosmic-icon">👤</i>Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     className="form-control"
//                     placeholder="Enter your full name"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="row mb-4">
//                   <div className="col-md-6 mb-4 mb-md-0">
//                     <label className="form-label">
//                       <i className="cosmic-icon">📅</i>Date of Birth
//                     </label>
//                     <input
//                       type="date"
//                       name="dateOfBirth"
//                       className="form-control"
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       <i className="cosmic-icon">⏰</i>Time of Birth
//                     </label>
//                     <input
//                       type="time"
//                       name="timeOfBirth"
//                       className="form-control"
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="form-label">
//                     <i className="cosmic-icon">📍</i>Birth Location
//                   </label>
//                   <input
                  
//                     type="text"
//                     name="birthLocation"
//                     className="form-control"
//                     placeholder="City, Country"
//                     value={formData.birthLocation}
//                     onChange={e=>setInput(e.target.value)}
//                     required
//                   />
//                   <ul id="suggestions"></ul>
//                 </div>

//                 <div className="mb-4">
//                   <label className="form-label">
//                     <i className="cosmic-icon">⚥</i>Gender
//                   </label>
//                   <select
//                     name="gender"
//                     className="form-control"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled>
//                       Select your gender
//                     </option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="non-binary">Non-binary</option>
//                     <option value="prefer-not-to-say">Prefer not to say</option>
//                   </select>
//                 </div>

//                 <div className="text-center mt-5">
//                   <Link to='/details' state={formData} className="submit-btn btn btn-lg">
//                     Reveal Your Cosmic Path
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const openCageApiKey = '51d5d1c924fa47598be53b460ee6a776';
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    birthLocation: '',
    gender: '',
    dateOfBirth: { day: '', month: '', year: '' },
    timeOfBirth: { hour: '', minute: '' },
    lat: '',
    lon: '',
    tzone: 5.5,
  });

  useEffect(() => {
    if (input.trim() !== '') {
      const fetchData = async () => {
        const fetchedSuggestions = await fetchSuggestions(input);
        setSuggestions(fetchedSuggestions);
      };
      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [input]);

  async function fetchSuggestions(query) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${openCageApiKey}&limit=5`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results.map(result => ({
        name: result.formatted,
        lat: result.geometry.lat,
        lng: result.geometry.lng,
      }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  }

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    setFormData(prev => ({ ...prev, birthLocation: value }));
  };

  const selectSuggestion = (suggestion) => {
    setInput(suggestion.name);
    formData['lat']=suggestion.lat;
    formData['lon']=suggestion.lng;
    console.log(formData);
    setSelectedSuggestion(suggestion);
    setFormData(prev => ({
      ...prev,
      birthLocation: suggestion.name,
      lat: suggestion.lat,
      lon: suggestion.lng,
    }));
    setSuggestions([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dateOfBirth') {
      const [year, month, day] = value.split('-');
      setFormData(prev => ({
        ...prev,
        dateOfBirth: { day, month, year },
      }));
    } else if (name === 'timeOfBirth') {
      const [hour, minute] = value.split(':');
      setFormData(prev => ({
        ...prev,
        timeOfBirth: { hour, minute },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <div className="container py-5 animate__animated animate__fadeIn">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="text-center mb-5">
              <h1 className="site-title mb-3">✨ Mystic Insights</h1>
              <p className="site-subtitle">Discover Your Cosmic Blueprint</p>
            </div>

            <div className="astrology-card animate__animated animate__fadeInUp animate__delay-1s">
              <form>
                <div className="mb-4">
                  <label className="form-label">
                    <i className="cosmic-icon">👤</i> Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <label className="form-label">
                      <i className="cosmic-icon">📅</i> Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      <i className="cosmic-icon">⏰</i> Time of Birth
                    </label>
                    <input
                      type="time"
                      name="timeOfBirth"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    <i className="cosmic-icon">📍</i> Birth Location
                  </label>
                  <input
                    type="text"
                    name="birthLocation"
                    className="form-control"
                    placeholder="City, Country"
                    value={input}
                    onChange={handleInput}
                    required
                  />
                  <ul id="suggestions" className="suggestions-list form-control">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => selectSuggestion(suggestion)}
                        className="suggestion-item"
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    <i className="cosmic-icon">⚥</i> Gender
                  </label>
                  <select
                    name="gender"
                    className="form-control"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="text-center mt-5">
                  <Link
                    to="/details"
                    state={formData}
                    className="submit-btn btn btn-lg"
                  >
                    Reveal Your Cosmic Path
                  </Link>
                </div>
              </form>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
