import React, { useEffect, useState } from 'react'
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import "./Dashboard.css";
import { useSelector } from 'react-redux';
import Chart from "react-apexcharts";
import { FiDollarSign, FiUsers, FiHome, FiBell, FiSettings } from "react-icons/fi"
import { FaFile, FaInfo, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const categories = useSelector((state) => state.produits);
  const usersLength = useSelector((state) => state.users);
  const boutiquesLength = useSelector((state) => state.boutiques);
  const boutiques = useSelector((state) => state.boutiques.value);

  const [dates, setDates] = useState([])
  const [arrayList, setArr] = useState([]);
  const [number, setNumber] = useState('');


  const series1 = [
    {
      name: "Nombre boutiques créées",
      data: dates.map(value => {
        return number[`${value}`]
      })
    },
  ];

  useEffect(() => {
    let array = [];
    if (boutiques) {
      boutiques && boutiques.map((value) => {
        array.push(value.createdAt.substring(0, 10))
        let valuesUniques = [...new Set(array)]
        setDates(valuesUniques);
        setArr(array);
      })
    }
  }, [boutiques])

  useEffect(() => {
    let count = {};
    if (arrayList) {
      arrayList.forEach(element => {
        console.log(element)
        count[element] = (count[element] || 0) + 1;
      })
    }
    setNumber(count)
  }, [arrayList]);

  const [chartDate] = useState({
    options: {
      categories: dates.map(value => {
        return value.substring()
      }),
      axisBorder: { show: true },
      axisTicks: { show: true },
      labels: { show: false }
    },
    yaxis: { show: false },
    grid: { show: false },
    chart: {
      sparkline: {
        enabled: false
      },
      toolbar: {
        show: false
      }

    },
    series: [
      {
        name: "Users",
        data:
          dates.map(value => {
            return value.substring()
          })
      }
    ]
  });

  const options = { labels: ["Dons", "Participants", "Visiteurs sites", "Produits", "Logs"] };
  const series = [4, 5, 6, 1, 5]; //our data

  return (
    <>
      <Navbar />
      <div className='mainDashboard'>
        <div className='contentMain'>
          <div className='contentLeftBar'>
            <Leftbar />
          </div>
          <div className='mainData'>
            <div className='descText'>
              <div className='textMain'>
                <div> <FiHome /> <span>/</span> <span>Dashboard</span></div>
                <h6>Dashboard</h6>
              </div>
              <div className='input'>
                <input type="search" placeholder='Entrer un mot...' className='form-control' />
                <span><FaSearch /></span>
              </div>
              <div className='icons'>
                <FiSettings />
                <FiBell />
              </div>
            </div>
            <div className='cardsPresentation'>
              <div className='card'>
                <div className='nomNombre'>
                  <div className='nom'>Dons</div>
                  <div className='nombre'>Total : <div className='value'>{0}</div> </div>
                </div>
                <div className='image'>
                  <FiDollarSign />
                </div>
              </div>
              <div className='card'>
                <div className='nomNombre'>
                  <div className='nom'>Actualités</div>
                  <div className='nombre'>Effectif : <div className='value'>{boutiquesLength && boutiquesLength.value && boutiquesLength.value.length}</div> </div>
                </div>
                <div className='image'>
                  <FaInfo />
                </div>
              </div>
              <div className='card'>
                <div className='nomNombre'>
                  <div className='nom'>Documents</div>
                  <div className='nombre'>Effectif : <div className='value'>{categories && categories.value && categories.value.length}</div> </div>
                </div>
                <div className='image'>
                  <FaFile />
                </div>
              </div>
              <div className=' card'>
                <div className='nomNombre'>
                  <div className='nom'>Utilisateurs</div>
                  <div className='nombre'>Effectif : <div className='value'>{usersLength && usersLength.value && usersLength.value.length}</div> </div>
                </div>
                <div className='image'>
                  <FiUsers />
                </div>
              </div>
            </div>
            <div className='charts'>
              <div className='card' style={{ background: "#fff", border: "1px solid #efefef" }}>
                <Chart
                  options={chartDate.options}
                  series={series1}
                  type="bar"
                  width="500"
                />
              </div>
              <div className='card' style={{ background: "#fff", border: "1px solid #efefef" }}>
                <Chart options={options} series={series} type="donut" width="500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard