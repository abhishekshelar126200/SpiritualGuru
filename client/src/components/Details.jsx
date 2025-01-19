import React,{useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TableData from './TableData';
import Chart from './Chart';
import Insights from './Insights';

import GemDisplay from './GemDisplay';

import SpiritualContent from './SpiritualContent';

const Details = () => {
    const [details, setDetails] = useState({});
    const [context,setContext]=useState([]);
    const location = useLocation();
    const formData=location.state || {};
    const userId = "637020";
    const apiKey = "475992dcabffc6f753de86260ceb07c379cdf640";
    const language = "en"; // Default is 'en'
    const auth = `Basic ${btoa(`${userId}:${apiKey}`)}`;
    const [query,setQuery]=useState("");
    const [chatbotData,setChatBotData]=useState(null);

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

  
  
    const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://json.astrologyapi.com/v1/astro_details",
            data,
            {
              headers: {
                authorization: auth,
                "Content-Type": "application/json",
                "Accept-Language": language,
              },
            }
          );
          const result = await response.data;
          const temp={"userData":data,"horoscope":result}
          setContext(temp);
          setDetails(result);
          
          return result;
        } catch (error) {
          console.error(error.response ? error.response.data : error.message);
        }
      };

      
      const handleSearch=async ()=>{
        setChatBotData(null)
        try {
          const response = await axios.post(
            "https://spiritualguru-1.onrender.com/chatbot",
            {context:context,query:query},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.data;
          
          console.log(result);
          setChatBotData(result.filterData.answer);
        } catch (error) {
          console.error(error.response ? error.response.data : error.message);
        }
      }
      const handleChangeSearch=(e)=>{
        setQuery(e.target.value);
      }
    return(
        <>
        {/* <input type="search" value={query} onChange={handleChangeSearch}/>
        <button onClick={()=>handleSearch()}>Search</button>
        <p>{chatbotData ? chatbotData : ""}</p> */}



import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

// Inside your JSX
<div 
  className="position-fixed bottom-0 end-0 p-3 bg-light shadow rounded" 
  style={{ width: '300px', zIndex: 1050 }}
>
  <div className="d-flex flex-column">
    <input
      type="search"
      value={query}
      onChange={handleChangeSearch}
      className="form-control mb-2"
      placeholder="Type your query"
    />
    <button onClick={handleSearch} className="btn btn-primary mb-2">
      Send
    </button>
    <div className="card">
      <div className="card-body">
        <p className="card-text mb-0">{chatbotData ? chatbotData : "No response yet"}</p>
      </div>
    </div>
  </div>
</div>



         <TableData fetchData={fetchData}/>
         
         <Chart formData={formData}/>
         {
            details && (
            <Insights data={details}/>)
         }
         
         <GemDisplay data={data} />
         <SpiritualContent data={data}/>
        </>
       
    )
};

// Example usage with sample data
export default Details;
