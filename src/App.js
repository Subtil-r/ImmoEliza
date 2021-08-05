import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    getData()
  }, []);

  async function getData(){


    await axios("https://ceren-app.herokuapp.com/predict")
    .then((res)=>{
      setData(res.data);
      
      //console.log(res.data["Property Subtype"].default[3]);
    })
    .catch((error)=>{
      console.error("Error fetching data: ", error);
      setError(error);
    })
    .finally(()=>{
      setLoading(false);
    });
  };

  if(loading) return "Loading...";
  if(error) return "Error!";


  
  

  return (
    <div className="container">
      <header className="header-style card hs-lg">
        <h1>ImmoEliza</h1>
      </header>
      <Form data={data} />
    </div>
  );
}

export default App;
