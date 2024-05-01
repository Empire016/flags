import React, { useState, useEffect } from "react";
import "./App.css";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="country-list-container">
      {error && <p className="error-message">Error: {error}</p>}
      <div className="country-list">
        {countries.map((country) => (
          <div key={country.name.common} className="country">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="flag"
            />

            <span>{country.name.common}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
