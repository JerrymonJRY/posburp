import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import apiConfig from '../layouts/base_url';
import Chart from 'chart.js/auto';
import SalesGraph from './monthlyChart';
import Monthlywisechart from './monthlywiseChart';
import Dailysalesgraphs from './dailysalesGraph';
import Weeklysalesgraphs from './weeklysaleGraph';
import HighestSalesgraph from './highestsalesGraph';

//import { Line } from 'react-chartjs-2';

const DashboardGraph  =() =>{

   
   
    
    const [highestsales, setHighestsales] = useState([]);
  
    const [monthlyWeeklySalesData, setMonthlyWeeklySalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  let chartRef = React.createRef();
  let chartRefs = React.createRef();





     
      
    


      
    
      const [salesData, setSalesData] = useState([]);

      useEffect(() => {
        const fetchSalesData = async () => {
          try {
            const response = await fetch(`${apiConfig.baseURL}/api/dashboard/monthlywiseweek`);
            const data = await response.json();
            setSalesData(data.monthlyWeeklySalesData);
          } catch (error) {
            console.error('Error fetching sales data:', error);
          }
        };
    
        fetchSalesData();
      }, []);

      
      

    return (
        <>
           <div className="row">
              <div className="col-md-8 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="clearfix">
                      <h4 className="card-title float-left">Visit And Sales Statistics</h4>
                      <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right"></div>
                    </div>
                   
                  <Monthlywisechart />
                  </div>
                </div>
              </div>
              <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                  <div className="clearfix">
                      <h4 className="card-title float-left">Visit And Sales Statistics</h4>
                      <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right"></div>
                    </div>
                   <Weeklysalesgraphs />

                  
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="clearfix">
                      <h4 className="card-title float-left">Visit And Sales Statistics</h4>
                      <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right"></div>
                    </div>
                   
                   <Dailysalesgraphs />

                  </div>
                </div>
              </div>
              <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Traffic Sources</h4>
                    <SalesGraph salesData={salesData} />
                   
                    <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="clearfix">
                      <h4 className="card-title float-left">Highest Sales Food Items </h4>
                     
                    </div>
                    <HighestSalesgraph />
                    
                  </div>
                </div>
              </div>
              <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Traffic Sources</h4>
                
                    <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4"></div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )

}

export default DashboardGraph;