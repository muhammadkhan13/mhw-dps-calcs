'use client';

import { useState } from "react";
import { useEffect } from "react";
import { Weapon } from "./wp.js";

export function WeaponList() {
    const [weapons, setWeapons] = useState([]);
    const [wepNames, setWepNames] = useState([]);
    const [error, setError] = useState(null);
    const [selectedWepName, setSelectedWepName] = useState('');
    const [selectedWeapon, setSelectedWeapon] = useState(null);

    useEffect(() => {
        async function fetchWeaponData() {
            try {
                const response = await fetch("https://mhw-db.com/weapons");
                if (!response.ok) {
                    throw new Error("Failed to fetch weapon data");
                }
                const data = await response.json();
                setWeapons(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchWeaponData();
    }, []);

    if (error) {return (<div>Error: {error}</div>);}

    useEffect(() => {
        if (weapons.length > 0) {
            setWepNames(weapons.map(weapon => weapon.name));
        }
    }, [weapons]);

    useEffect(() => {
        if (selectedWepName) {
            const weapon = weapons.find(w => w.name === selectedWepName);
            setSelectedWeapon(weapon);
        }
    }, [selectedWepName, weapons]);

    const handleSelectChange = (event) => {
        setSelectedWepName(event.target.value);
    };
    console.log(selectedWeapon.attack.raw);

    return(<div>
        <h3>Select a Weapon</h3>

        <label htmlFor="name-list">Choose:</label>
        <select 
        id="name-list"
        onChange={handleSelectChange} value={selectedWepName}>
            <option value="">...</option>
            {wepNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
        </select>
        {selectedWeapon ? (
                <div>
                    <Weapon
                    name={selectedWeapon.name}
                    type={selectedWeapon.type}
                    rarity={selectedWeapon.rarity}
                    atk={selectedWeapon.attack.raw}
                    elm={selectedWeapon.elements.type}
                    dmgType={selectedWeapon.damageType}
                    aff={selectedWeapon.attributes.affinity}/>
                </div>
            ) : (
                <p>Select a weapon to view its stats.</p>
            )}
    </div>);
}