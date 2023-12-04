// client/src/App.js
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:3001/search", {
        query,
      });
      setResults(response.data.items);
    } catch (error) {
      console.error("Error searching Companies House API:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>Companies House Search</h1>
      <input
        type="text"
        placeholder="Enter company name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Company Number</th>
              <th>Title</th>
              <th>Address</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.company_number}>
                <td>{result.company_number}</td>
                <td>{result.title}</td>
                <td>{result.address?.postal_code}</td>
                {/* Add more cells with data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
