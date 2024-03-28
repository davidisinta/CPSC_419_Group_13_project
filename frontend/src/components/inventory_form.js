import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function inventoryform({loc_id}) {
  let navigate = useNavigate();
  const [tonerTypes, setData] = useState([]);
  const [quantityVal, setQuantityVal] = useState('');
  const [tonerId, setTonerId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const msg = {
      loc_id: loc_id,
      toner_id: tonerId,
      quantity: quantityVal,
    };
    const endpoint = 'http://127.0.0.1:5000/get_toner_types';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Success:', jsonResponse);
      } else {
        throw new Error('Got bad response.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/');
  };

  useEffect(() => {
    const fetchTonerTypes = async () => {
      try{
        await axios.get('http://127.0.0.1:5000/get_toner_types')
        .then(r => {
          setData(r.data);
        });
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchTonerTypes();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Toner Type: 
        <select onChange={(e) => setTonerId(e.target.value)}>
          <option value="">Select an option</option>
            {tonerTypes.map((option) => (
              <option value={option.id}>
                {option.type}
              </option>
            ))}
        </select>
      </label>
      <label>
        Quantity:
        <input type="text" value={quantityVal} onChange={(e) => setQuantityVal(e.target.value)}></input>
      </label>
      <button type="submit">Submit</button>
    </form>

  )
}
