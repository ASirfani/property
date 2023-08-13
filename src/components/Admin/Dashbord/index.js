/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getClients } from '../../../API/Clients';

const Dashboard = () => {
  const [clientsInfo, setClientsInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await getClients();
        setClientsInfo(clients);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const processClientsData = () => {
    const counts = [0, 0, 0, 0, 0, 0, 0];

    clientsInfo.forEach(client => {
      const registrationDate = new Date(client.date);
      const dayOfWeek = registrationDate.getDay();
      counts[dayOfWeek]++;
    });

    return counts;
  };

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      }, 
      xaxis: {
        categories: ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const counts = processClientsData();
    setChartData(prevState => ({
      ...prevState,
      series: [{ ...prevState.series[0], data: counts }],
    }));
  }, [clientsInfo]);

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width="500"
      />
    </div>
  );
};

export default Dashboard;
