import React, { useState, useEffect } from "react";
import games from "./games.json"; // Import game data from a JSON file
import Countdown from "./Countdown"; // Import the Countdown component

function App() {
  // State variables for filtering by conference and team
  const [selectedConference, setSelectedConference] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [filteredGames, setFilteredGames] = useState(games); // Stores the filtered game list

  // useEffect runs whenever selectedConference or selectedTeam changes
  useEffect(() => {
    let filtered = games;
    
    // Filter games by conference if a specific conference is selected
    if (selectedConference !== "all") {
      filtered = filtered.filter((game) => game.conference === selectedConference);
    }

    // Further filter games by team if a specific team is selected
    if (selectedTeam !== "all") {
      filtered = filtered.filter((game) => game.team1 === selectedTeam || game.team2 === selectedTeam);
    }

    setFilteredGames(filtered); // Update the filtered game list
  }, [selectedConference, selectedTeam]);

  // Create a list of all unique teams from the game data
  const teams = [
    ...new Set(games.map((game) => game.team1)),
    ...new Set(games.map((game) => game.team2)),
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4"> {/* Main container */}
      <h1 className="text-4xl font-bold text-center mb-6">CFB Countdown 2025</h1>
      
      {/* Dropdown filters for conference and team selection */}
      <div className="flex space-x-4 mb-6">
        {/* Conference Filter */}
        <div className="mb-6">
          <label htmlFor="conference" className="mr-2">Filter by Conference:</label>
          <select
            id="conference"
            value={selectedConference}
            onChange={(e) => setSelectedConference(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All</option>
            <option value="none">Non Conference</option>
            <option value="aac">American</option>
            <option value="acc">ACC</option>
            <option value="bigtwelve">Big 12</option>
            <option value="bigten">Big Ten</option>
            <option value="cusa">Conference USA</option>
            <option value="mac">Mid American</option>
            <option value="mwc">Mountain West</option>
            <option value="pac-12">Pac-12</option>
            <option value="sec">SEC</option>
            <option value="sbc">Sun Belt</option>
          </select>
        </div>

        {/* Team Filter */}
        <div className="mb-6">
          <label htmlFor="team" className="mr-2">Filter by Team:</label>
          <select
            id="team"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Teams</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>{team}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display filtered games in a responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
        {filteredGames.map((game) => (
          <div key={game.id} className="bg-white shadow-md rounded-lg p-4"> {/* Individual game card */}
            <h2 className="text-2xl font-semibold flex flex-wrap items-center text-center">
              {/* Team 1 */}
              <span className="inline-block flex items-center">
                <img 
                  src={`/logos/teams/${game.team1}.png`} 
                  alt={`${game.team1} logo`} 
                  className="w-8 h-8 mr-2 object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src = "/logos/teams/ncaa.png"; }} 
                />
                <span className="inline-block">{game.team1}</span>
              </span>

              {/* Game Location */}
              <span className="inline-block mx-2">{game.location}</span>

              {/* Team 2 */}
              <span className="inline-block flex items-center">
                <img 
                  src={`/logos/teams/${game.team2}.png`} 
                  alt={`${game.team2} logo`} 
                  className="w-8 h-8 ml-2 object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src = "/logos/teams/ncaa.png"; }} 
                />
                <span className="inline-block">{game.team2}</span>
              </span>
            </h2>

            {/* Display game date */}
            <p className="text-gray-600">Date: {new Date(game.date).toLocaleString()}</p>

            {/* Countdown timer and conference logo */}
            <div className="relative flex justify-between items-center">
              <div className="mt-2 text-lg font-mono text-green-600">
                <Countdown date={game.date} />
              </div>
              <img
                src={`/logos/${game.conference}.png`}
                alt={`${game.conference} logo`}
                className="absolute bottom-2 right-2 w-auto h-auto max-w-12 max-h-12 opacity-100 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
