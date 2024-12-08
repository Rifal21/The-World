import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query)
    );
    setFilteredCountries(filtered);
    setCurrentPage(1);
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white  flex items-center justify-center z-50">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div className="text-red-500 text-6xl animate-bounce">❌</div>
        <p className="text-red-500 mt-4 font-extrabold text-4xl">{error}!!</p>
        <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Refresh Page
      </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="md:text-4xl text-3xl uppercase font-extrabold text-blue-600 drop-shadow-md text-center">
          🌎<br /> Country <br />in The World
        </h1>
        <p className="text-gray-700 text-lg mt-2">
          Jelajahi informasi negara di seluruh dunia
        </p>
      </header>

      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Cari negara..."
          className="w-full p-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCountries.map((country) => (
          <Link to={`/country/${country.cca3}`} key={country.cca3}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg">
              <h2 className="font-bold text-lg text-blue-600 truncate">
                {country.name.common}
              </h2>
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-full h-32 object-cover rounded-md my-3"
              />
              <p className="text-gray-700 text-sm">
                <strong>Region:</strong> {country.region}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Population:</strong> {country.population.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-8 space-x-2 gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      <footer className="bg-transparent text-black py-4 mt-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Country In The World. All Rights Reserved.
        </p>
        <p className="text-xs">Designed with ❤️ by Rifal Kurniawan</p>
      </footer>
    </div>
  );
};

export default CountryList;
