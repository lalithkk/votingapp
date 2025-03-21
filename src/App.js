import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [votes, setVotes] = useState({
    naruto: 0,
    onePiece: 0,
    jujutsuKaisen: 0,
    attackOnTitan: 0,
    demonSlayer: 0,
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const voteForOption = (option) => {
    if (!isAdmin) {
      setVotes({ ...votes, [option]: votes[option] + 1 });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); 
    }
  };

  const handleLogin = () => {
    if (password === 'lalith123') {
      setIsAdmin(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPassword('');
  };

  const getSortedOptions = () => {
    const optionsArray = Object.keys(votes).map((option) => ({
      name: option,
      votes: votes[option],
    }));
    return optionsArray.sort((a, b) => b.votes - a.votes);
  };

  return (
    <div className="App">
      {showPopup && <div className="popup">Thank you for voting!</div>}
      <h1>Vote For your Favourite Anime</h1>
      {!isAdmin ? (
        <div className="login">
          <input 
            type="password" 
            placeholder="Enter admin password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleLogin}>Login as Admin</button>
        </div>
      ) : (
        <button className="logout" onClick={handleLogout}>Logout</button>
      )}

      <div className="options">
        {(isAdmin ? getSortedOptions() : Object.keys(votes).map(option => ({ name: option, votes: votes[option] }))).map((option) => (
          <div className="option" key={option.name}>
            <h2>{option.name.charAt(0).toUpperCase() + option.name.slice(1).replace(/([A-Z])/g, ' $1').trim()}</h2>
            <img src={`/voting/${option.name}.jpg`} alt={option.name} />
            <button onClick={() => voteForOption(option.name)} disabled={isAdmin}>Vote</button>
            {isAdmin && <p>Votes: {option.votes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
