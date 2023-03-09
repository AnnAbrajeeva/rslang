import React from 'react';
import bg from './images/main-bg.png';
import './main.css';

const Home = () => {
  return (
    <div className="home">
      <img className="home-img" alt="img" src={bg} />
      <div className="about">
        <h1>RS Lang</h1>
        <h2>
          The free, fun, and effective way to learn a language! Play mini-games, learn and memorize
          words. All the best techniques in one place.
        </h2>
      </div>
    </div>
  );
};

export default Home;
