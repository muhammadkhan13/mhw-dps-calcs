'use client';

import { useState } from "react";
import { useEffect } from "react";
import { Weapon } from "./wp.js";

export function WeaponList({ onWeaponSelect }) {
    const [weapons, setWeapons] = useState([]);
    const [wepNames, setWepNames] = useState([]);
    const [error, setError] = useState(null);
    const [selectedWepName, setSelectedWepName] = useState('');
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [wepElement, setWepElement] = useState("Raw");
    const [wepAffinity, setWepAffinity] = useState(0);

    useEffect(() => {
        async function fetchWeaponData() {
            try {
                const response = await fetch("https://mhw-db.com/weapons");
                if (!response.ok) {
                    throw new Error("Failed to fetch weapon data");
                }
                const data = await response.json();
                setWeapons(data);
                setWepNames(data.map(weapon => weapon.name));
            } catch (error) {
                setError(error.message);
            }
        }

        fetchWeaponData();
    }, []);

    if (error) {return (<div>Error: {error}</div>);}

    useEffect(() => {
        if (selectedWepName) {
            const weapon = weapons.find(w => w.name === selectedWepName);
            setSelectedWeapon(weapon);
            onWeaponSelect(weapon);
            if (weapon.elements.length > 0) {
                setWepElement(weapon.elements[0].type + ' ' + weapon.elements[0].damage.toString())
            }
            for (const prop in weapon.attributes) {
                if (Object.hasOwn(weapon.attributes, prop)) {
                    setWepAffinity(weapon.attributes.affinity)
                }
            }
        }
    }, [selectedWepName, weapons]);

    const handleSelectChange = (event) => {
        setSelectedWepName(event.target.value);
    };
    
    return(<div className='mt-4 p-2'>
        <h3>Select a Weapon</h3>

        <label htmlFor="name-list">Choose: </label>
        <select 
        id="name-list"
        className='text-black'
        onChange={handleSelectChange} value={selectedWepName}>
            <option value="">...</option>
            {(wepNames.sort()).map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
        </select>
        {selectedWeapon ? (
                <div>
                    <Weapon
                    name={selectedWeapon.name}
                    type={selectedWeapon.type}
                    rarity={selectedWeapon.rarity}
                    attack={selectedWeapon.attack.raw}
                    elements={wepElement}
                    damageType={selectedWeapon.damageType}
                    attributes={wepAffinity}/>
                </div>
            ) : (
                <p>Select a weapon to view its stats.</p>
            )}
    </div>);
}
