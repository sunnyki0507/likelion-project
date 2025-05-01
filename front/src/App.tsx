// App.tsx
import React, { useState } from 'react';

function App() {
  const [zip, setZip] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/search?zip=${zip}`);
      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      console.error('API fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🍽️ Zip Code로 맛집 검색</h2>
      <input
        type="text"
        placeholder="Enter ZIP code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <button onClick={fetchRestaurants}>검색</button>

      {loading && <p>로딩 중...</p>}

      <ul>
        {restaurants.map((r: any) => (
          <li key={r.id} style={{ margin: '1rem 0' }}>
            <strong>{r.name}</strong> <br />
            {r.location?.address1}, {r.location?.city} <br />
            ⭐ {r.rating} / 5 ({r.review_count} 리뷰) <br/>
            <img alt = "restImg1" src={r.image_url} style={{width: '500px', height: '400px'}}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
