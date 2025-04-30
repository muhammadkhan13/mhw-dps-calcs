'use client';

import { useState } from "react";
import { useEffect } from "react";
import { MonsterList } from './monster-list';
import { WeaponList } from './wp-list';
import { Skills } from './skills';


export default function Theorycraft() {
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [effectiveAttack, setEffectiveAttack ] = useState(null);
    const [effectiveElement, setEffectiveElement ] = useState(0);
    const [weaponCrit, setWeaponCrit] = useState(0);
    const [critMulti, setCritMulti] = useState(1.25);
    const [critDMG, setCritDMG] = useState(null);
    const [averageDMG, setAverageDMG] = useState(null);
    const [skill1, setSkill1] = useState(null);
    const [skill2, setSkill2] = useState(null);
    const [skill3, setSkill3] = useState(null);
    
    useEffect(() => {
        if (!selectedMonster || !selectedWeapon) return;
    
        let rawAttack = selectedWeapon.attack.raw;
        let effectiveElement = 0;
        if (selectedWeapon.elements.length > 0) {
            const elementType = selectedWeapon.elements[0].type;
            const elementDamage = selectedWeapon.elements[0].damage;
    
            if (selectedMonster.resistances?.some(res => res.element === elementType)) {
                effectiveElement = 0;
            }
    
            const weakness = selectedMonster.weaknesses?.find(w => w.element === elementType);
            if (weakness) {
                const multiplier = 1 + (0.1 * weakness.stars);
                effectiveElement = elementDamage * multiplier;
            }
        }
    
        const totalAttack = rawAttack + effectiveElement;
        setEffectiveAttack(totalAttack);
    
        const affinity = selectedWeapon.attributes?.affinity || 0;
        const critChance = affinity / 100;
        setWeaponCrit(critChance);
    
        if (critChance > 0) {
            const critDmg = totalAttack * critMulti;
            setCritDMG(critDmg);
            setAverageDMG((critDmg * critChance) + (totalAttack * (1 - critChance)));
        } else {
            setCritDMG('None');
            setAverageDMG(totalAttack);
        }
    
        setEffectiveElement(effectiveElement);
    }, [selectedMonster, selectedWeapon, critMulti]);
    
    return(
        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
        {/* Top-left: Weapon Selection */}
        <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">Weapon Selection</h2>
            <WeaponList onWeaponSelect={setSelectedWeapon} />
        </div>

        {/* Top-right: Skills */}
        <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">Skills</h2>
            <Skills
                onSkill1Select={setSkill1}
                onSkill2Select={setSkill2}
                onSkill3Select={setSkill3}
            />
        </div>

        {/* Bottom-left: Monster Selection */}
        <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">Monster Selection</h2>
            <MonsterList onMonsterSelect={setSelectedMonster} />
        </div>

        {/* Bottom-right: Offensive Output */}
        <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">Offensive Output</h2>
            {selectedMonster && selectedWeapon ? (
                <>
                    <p>Effective Attack: {effectiveAttack}</p>
                    <p>Elemental Bonus: {effectiveElement}</p>
                    <p>Critical Hit Damage: {critDMG}</p>
                    <p>Average Damage: {averageDMG}</p>
                </>
            ) : (
                <p>Select a monster and weapon to calculate output.</p>
            )}
        </div>
    </div>
    );
}