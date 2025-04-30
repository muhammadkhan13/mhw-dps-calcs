'use client';

import { useState } from "react";
import { useEffect } from "react";

export default function MonsterDisplay() {
    const [monsters, setMonsters] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMonsterData() {
            try {
                const response = await fetch("https://mhw-db.com/monsters");
                if (!response.ok) {
                    throw new Error("Failed to fetch monster data");
                }
                const data = await response.json();
                setMonsters(data);

            } catch (error) {
                setError(error.message);
            }
        }

        fetchMonsterData();
    }, []);

    if (error) {return (<div>Error: {error}</div>);}
    
    return (
        <div className="p-6">
          {error && <div>Error: {error}</div>}
      
          {monsters && monsters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {monsters.map((monster, index) => (
                <div key={index} className="border rounded p-4 shadow-md">
                  <h2 className="text-lg font-bold mb-2">{monster.name}</h2>
                  <img
                    src={`/images/${monster.name.toLowerCase()}.jpg`}
                    alt={monster.name}
                    className="w-80 h-80 object-contain mb-2"
                    onError={(e) => { e.target.src = '/images/fallback.jpg'; }}
                  />
                  <p><strong>Species:</strong> {monster.species}</p>
                  <p className="mb-2">{monster.description}</p>
                  <p><strong>Locations:</strong></p>
                  <ul className="list-disc list-inside">
                    {monster.locations.map((location, id) => (
                      <li key={id}>{location.name}</li>
                    ))}
                  </ul>
                </div> 
              ))}
            </div>
          ) : (
            <p>Loading monsters...</p>
          )}
        </div>
      );
}