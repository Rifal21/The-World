import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
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
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center flex-col w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-2xl mx-auto w-full">
      <Link to="/" className="  inline-block transform hover:-translate-y-1 hover:scale-110">
      <img className="w-6 h-6" src="https://img.icons8.com/ios-filled/50/left2.png" alt="long-arrow-left"/>
      </Link>
        <h1 className="text-center text-3xl font-bold text-blue-600 mb-4 uppercase">
          {country.name.common} ({country.cca3})
        </h1>
        <div className="flex md:justify-between md:mx-10 flex-col md:flex-row items-center gap-2 mb-6">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-48 h-32 object-cover rounded-md shadow-md"
          />
                    {country.coatOfArms?.png && (

              <img
                src={country.coatOfArms.png}
                alt={`Coat of Arms of ${country.name.common}`}
                className="w-48 h-auto object-cover rounded-md shadow-md"
              />
            
          )}
        </div>

        <div className="mb-4">
        <p className="text-gray-700">
              <strong>Official Name:</strong> {country.name.official}
            </p>
            <p className="text-gray-700">
              <strong>Native Name:</strong> {country.name.nativeName?.ind?.official || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Region:</strong> {country.region}
            </p>
            <p className="text-gray-700">
              <strong>Subregion:</strong> {country.subregion || "N/A"}
            </p>
          <p className="text-gray-700">
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p className="text-gray-700">
            <strong>Area:</strong> {country.area.toLocaleString()} km²
          </p>
          <p className="text-gray-700">
            <strong>Timezones:</strong> {country.timezones.join(", ")}
          </p>
          <p className="text-gray-700">
            <strong>Languages:</strong>{" "}
            {Object.values(country.languages || {}).join(", ")}
          </p>
          <p className="text-gray-700">
            <strong>Currencies:</strong>{" "}
            {Object.entries(country.currencies || {})
              .map(([code, cur]) => `${cur.name} (${cur.symbol || code})`)
              .join(", ")}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Bordering Countries:</strong>{" "}
            {country.borders?.length > 0
              ? country.borders.join(", ")
              : "None"}
          </p>
          <p className="text-gray-700">
            <strong>Gini Index:</strong>{" "}
            {country.gini ? `${Object.values(country.gini)[0]}%` : "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Start of Week:</strong> {country.startOfWeek || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-700">
            <strong>Google Maps:</strong>{" "}
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View on Google Maps
            </a>
          </p>
          <p className="text-gray-700">
            <strong>OpenStreetMap:</strong>{" "}
            <a
              href={country.maps.openStreetMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View on OpenStreetMap
            </a>
          </p>
        </div>
      </div>
      <footer className="bg-transparent text-black py-4 mt-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Country In The World. All Rights Reserved.
        </p>
        <p className="text-xs">Designed with ❤️ by Rifal Kurniawan</p>
      </footer>
    </div>
  );
};

export default CountryDetail;
