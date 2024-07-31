// src/components/Home.js
import React, {useEffect, useState} from 'react';
import { APIFunctions } from '../chartInfo.js/API/apiFunctions';

function Home() {
  const [idSite, setIdSite] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [storedAnalysis, setStoredAnalysis] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setChartData({}); // Reiniciar el estado de las gráficas

      try{
        const url = APIFunctions.get(idSite);
        const response = await fetch(url);
        const data = await response.json();

        const newChartData = data.map((item) => {
          return {
            labels: item.labels,
            data: item.data,
            title: item.title,
            description: item.description,
            idSite: idSite
          };
        });

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [idSite]);

  const handleSiteChange = (newIdSite) => {
    setIdSite(newIdSite);
    setStoredAnalysis({});
  };

  return (
    <div>
      <header>
      
      </header>
      <body>
        <div>
          <h1>Welcome to Matomo Web</h1>
          
        </div>
      </body>
    </div>
  );
}

export default Home;
