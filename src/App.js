import React, { useState, useEffect } from 'react';
import './styles/main.scss'

import { fetchCountries } from './data';

import ApexChart from './components/ApexChart';
import Header from './components/Header';
import Loader from './components/Loader';
import Total from './components/Total';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey")
  const [loader, setLoader] = useState(false)
  const [info, setInfo] = useState(false)

  useEffect(() => {
    const fetchCountriesData = async () => {
      setLoader(true);
      const countries = await fetchCountries();
      setCountries(countries);
      setLoader(false);
    }

    fetchCountriesData()
  }, [])

  return (
    <>
      {loader && <Loader />}

      <Header />

      <Total />

      <form className="countries-form">
        <select className="countries-select" value={country} onChange={e => { setCountry(e.target.value) }}>
          {countries.map((country) => (
            <option key={country.ISO2} value={country.Slug}>{country.Country}</option>
          ))}
        </select>
      </form>

      <ApexChart country={country} />

      {/* info-box */}
      {info && <div className="info-container">
        <div className="info-box">
          <i className="info-close-btn fas fa-times-circle" onClick={() => setInfo(false)}></i>
          <div className="header-box">
            <h1 className="info-header">COVID 19 WATCHER APP</h1>
            <h2 className="info-second-header">with reactJS</h2>
          </div>
          <p className="content">Covid-19 Watcher is a reactJS application made by Ali POLAT in August 2021. You can visit <a target="blank" href="https://github.com/alipolat-js">my github account</a> to see the source code and other projects.</p>
          <br />
          <h3>Project source code:</h3>
          <a target="blank" href="https://github.com/alipolat-js/covid-19-watcher">github.com/alipolat-js/covid-19-watcher</a>
          <br /><br />
          <a href='https://wwww.alipolat.tech'>Designed &amp; Developed by Ali POLAT</a>
        </div>
      </div>}

      <i className="fas fa-info-circle" onClick={() => setInfo(true)}></i>
    </>
  );
}

export default App;