import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import { getData } from '../api';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const result = await getData();
        console.log('Data received in Dashboard:', result);
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setData([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ChartComponent data={data} />
      {/* <ul>
        {data.map((item, index) => (
          <li key={index}>{item.Nombre}: {item.Data && item.Data[0]?.Valor}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Dashboard;
