'use client';

import { useState } from "react";
import { useEffect } from "react";
import { Monster } from "./monster.js";

export function MonsterList() {
    const [monsters, setMonsters] = useState([]);
    const [monsterNames, setMonsterNames] = useState([]);
    const [error, setError] = useState(null);
    const [selectedMonsterName, setSelectedMonsterName] = useState('');
    const [selectedMonster, setSelectedMonster] = useState(null);
    console.log("starting fetch process");

    useEffect(() => {
        async function fetchMonsterData() {
            try {
                console.log("starting fetch db");
                const response = await fetch("https://mhw-db.com/monsters");
                if (!response.ok) {
                    throw new Error("Failed to fetch monster data");
                }
                const data = await response.json();
                setMonsters(data);
                setMonsterNames(data.map(monster => monster.name));
            } catch (error) {
                setError(error.message);
            }
        }

        fetchMonsterData();
    }, []);
    console.log("Async passed");

    if (error) {return (<div>Error: {error}</div>);}

    useEffect(() => {
        if (selectedMonsterName) {
            const monster = monsters.find(m => m.name === selectedMonsterName);
            setSelectedMonster(monster);
        }
    }, [selectedMonsterName, monsters]);

    const handleSelectChange = (event) => {
        setSelectedMonsterName(event.target.value);
    };
    
    return(<div>
        <h3>Select a Monster</h3>

        <label htmlFor="name-list">Choose:</label>
        <select 
        id="name-list"
        onChange={handleSelectChange} value={selectedMonsterName}>
            <option value="">...</option>
            {monsterNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
        </select>
        {selectedMonster ? (
                <div>
                    <Monster 
                    name={selectedMonster.name} 
                    type={selectedMonster.species} 
                    description={selectedMonster.description} 
                    resistances={selectedMonster.resistances}
                    weaknesses={selectedMonster.weaknesses}/>
                </div>
            ) : (
                <p>Select a monster to view info on resistances and weaknesses.</p>
            )}
    </div>);
}