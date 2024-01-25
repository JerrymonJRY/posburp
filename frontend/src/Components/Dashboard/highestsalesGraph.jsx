import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import apiConfig from '../layouts/base_url';

const HighestSalesgraph = () => {
    const [highestSales, setHighestSales] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiConfig.baseURL}/api/dashboard/dailyhighestsales`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                }
                setHighestSales(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!chartRef.current) {
            chartRef.current = new Chart(document.getElementById('Highestsale'), {
                type: 'doughnut',
                data: {
                   
                    datasets: [{
                        label: 'Total Quantity',
                        data: [],
                        backgroundColor: [],
                        borderWidth: 1,
                    }],
                },
                options: {
                    layout: {
                        padding: {
                            left: 50, 
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                    },
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                        },
                    },
                },
                
                
            });
        }

        const chart = chartRef.current;
        chart.data.labels = highestSales.map(item => item.foodmenuname);
        chart.data.datasets[0].data = highestSales.map(item => item.totalQuantity);
        chart.data.datasets[0].backgroundColor = highestSales.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`);
        chart.update();

        return () => {
            if (chart) {
                chart.destroy();
                chartRef.current = null;
            }
        };
    }, [highestSales]);

    return (
        <canvas id="Highestsale" style={{ float: 'left', height: '500px' }}></canvas>
    );
};

export default HighestSalesgraph;







