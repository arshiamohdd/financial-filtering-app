import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch(
      "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=oBRQKXkot1Wb0sIVVob7S0Rz6DqMMucy"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let updatedData = [...data];
    if (filters.startDate) {
      updatedData = updatedData.filter(
        (item) => item.date >= filters.startDate
      );
    }
    if (filters.endDate) {
      updatedData = updatedData.filter(
        (item) => item.date <= filters.endDate
      );
    }
    setFilteredData(updatedData);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Data Filtering App</h1>
      <div>
        <input
          type="text"
          placeholder="Start Date (YYYY-MM-DD)"
          name="startDate"
          onChange={handleFilterChange}
          className="border p-2 m-2"
        />
        <input
          type="text"
          placeholder="End Date (YYYY-MM-DD)"
          name="endDate"
          onChange={handleFilterChange}
          className="border p-2 m-2"
        />
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Revenue</th>
            <th>Net Income</th>
            <th>Gross Profit</th>
            <th>EPS</th>
            <th>Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.revenue}</td>
              <td>{item.netIncome}</td>
              <td>{item.grossProfit}</td>
              <td>{item.eps}</td>
              <td>{item.operatingIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
