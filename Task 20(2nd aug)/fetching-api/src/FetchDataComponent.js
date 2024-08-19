// src/FetchDataComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FetchDataComponent.css';

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false); // State to indicate task completion

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        if (response.status === 200) {
          setData(response.data);
        } else {
          handleStatusCode(response.status);
        }
      } catch (error) {
        if (error.response) {
          handleStatusCode(error.response.status);
        } else {
          setError('Error: Unable to fetch data.');
        }
      } finally {
        setLoading(false);
        setCompleted(true); // Indicate that the fetching process is completed
      }
    };

    fetchData();
  }, []);

  const handleStatusCode = (status) => {
    switch (status) {
      case 200:
        break; // Do nothing, handled in the fetch block
      case 400:
        setError('Error 400: Bad Request.');
        break;
      case 401:
        setError('Error 401: Unauthorized.');
        break;
      case 403:
        setError('Error 403: Forbidden.');
        break;
      case 404:
        setError('Error 404: Not Found.');
        break;
      case 500:
        setError('Error 500: Internal Server Error.');
        break;
      default:
        setError(`Unexpected Error: ${status}`);
    }
  };

  return (
    <div className="fetch-data-component">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="card-container">
          {data.map((user) => (
            <div key={user.id} className="card">
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Address: {user.address.street}, {user.address.city}</p>
            </div>
          ))}
        </div>
      )}
      {completed && <p className="completion-message">Data fetching task completed.</p>}
    </div>
  );
};

export default FetchDataComponent;
