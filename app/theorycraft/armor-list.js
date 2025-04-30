'use client';

import { useState } from "react";
import { useEffect } from "react";

export function ArmorList() {
    const [allArmor, setAllArmor] = useState([]);
    const [helmets, setHelmets] = useState([]);
    const [chests, setChests] = useState([]);
    const [gauntlets, setGauntlets] = useState([]);
    const [waists, setWaists] = useState([]);
    const [greaves, setGreaves] = useState([]);

    useEffect(() => {
        async function fetchArmorData() {
            try {
                const response = await fetch("https://mhw-db.com/armor");
                if (!response.ok) {
                    throw new Error("Failed to fetch armor data");
                }
                const data = await response.json();
                setAllArmor(data);
                allArmor.forEach(armor)
            } catch (error) {
                setError(error.message);
            }
        }

        fetchArmorData();
        setAllArmor(data);
        setHelmets(allArmor.filter(armor => armor.type === 'head'));
        setChests(allArmor.filter(armor => armor.type === 'chest'));
        setGauntlets(allArmor.filter(armor => armor.type === 'gloves'));
        setWaists(allArmor.filter(armor => armor.type === 'waist'));
        setGreaves(allArmor.filter(armor => armor.type === 'legs'));
    }, []);

    if (error) {return (<div>Error: {error}</div>);}

    return(
        <div>
            <h3>Choose your Armor:</h3>
        </div>
    )
}
