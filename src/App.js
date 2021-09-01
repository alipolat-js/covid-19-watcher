import React, { useState, useEffect } from 'react';
import './styles/main.scss'

import { fetchCountries } from './data';

import WatcherChart from './components/WarcherChart';
import Header from './components/Header';
import Loader from './components/Loader';

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

      <form className="countries-form">
        <select className="countries-select" value={country} onChange={e => { setCountry(e.target.value) }}>
          {countries.map((country) => (
            <option key={country.ISO2} value={country.Slug}>{country.Country}</option>
          ))}
        </select>
      </form>

      <WatcherChart country={country} />


      {/* info-box */}
      {info && <div className="info-container">
        <div className="info-box">
          <i class="info-close-btn fas fa-times-circle" onClick={() => setInfo(false)}></i>
          <div className="header-box">
            <h1 className="info-header">COVID 19 WATCHER APP</h1>
            <h2 className="info-second-header">with reactJS</h2>
          </div>
          <p className="content">Covid-19 Watcher is a reactJS application made by Ali POLAT in August 2021. You can visit <a target="blank" href="https://github.com/alipolat-js">github</a> to see the source code and other projects.</p>
          <br />
          <h3>Project source code:</h3>
          <a target="blank" href="https://github.com/alipolat-js/covid-19-watcher">github.com/alipolat-js/covid-19-watcher</a>
          <br /><br />
          <h3>Author:</h3>
          <p>Ali POLAT</p>
          <br />
          <h3>Contact E-Mail:</h3>
          <a target="blank" href="mailto:alipolat.js@gmail.com">alipolat.js@gmail.com</a>
        </div>
      </div>}

      <i className="fas fa-info-circle" onClick={() => setInfo(true)}></i>
    </>
  );
}

export default App;