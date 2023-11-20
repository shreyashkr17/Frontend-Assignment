import React from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';
import HomePizza from '../Components/Pizza/HomePizza';
import HomePasta from '../Components/Pasta/HomePasta';

function Home() {
  return (
    <div className='Home'>
      <div className="HomeParentContainer">
        <div className="HomePizza">
          <Link to="/homepizza">
            <h2>Home Pizza</h2>
          </Link>
        </div>
        <div className="HomePasta">
          <Link to="/homepasta">
            <h2>Home Pasta</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;