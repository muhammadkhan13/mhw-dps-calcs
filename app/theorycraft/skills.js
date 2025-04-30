'use client';

import { useState } from "react";
import { useEffect } from "react";
import { Skill } from "./skill";

export function Skills({ onSkill1Select, onSkill2Select, onSkill3Select }) {
    const [skills, setSkills] = useState([]);
    const [skillNames, setSkillNames] = useState([]);
    const [skill1, setSkill1] = useState(null);
    const [skill1Name, setSkill1Name] = useState('');
    const [skill1Ranks, setSkill1Ranks] = useState([]);
    const [skill1Rank, setSkill1Rank] = useState(0);
    const [skill2, setSkill2] = useState(null);
    const [skill2Name, setSkill2Name] = useState('');
    const [skill2Ranks, setSkill2Ranks] = useState([]);
    const [skill2Rank, setSkill2Rank] = useState(0);
    const [skill3, setSkill3] = useState(null);
    const [skill3Name, setSkill3Name] = useState('');
    const [skill3Ranks, setSkill3Ranks] = useState([]);
    const [skill3Rank, setSkill3Rank] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSkillData() {
            try {
                const response = await fetch("https://mhw-db.com/skills");
                if (!response.ok) {
                    throw new Error("Failed to fetch skill data");
                }
                const data = await response.json();
                setSkills(data);
                setSkillNames(data.map(skill => skill.name));
            } catch (error) {
                setError(error.message);
            }
        }

        fetchSkillData();
        }, []);
    
    if (error) {return (<div>Error: {error}</div>);}

    useEffect(() => {
        if (skill1Name) {
            const skill = skills.find(s => s.name === skill1Name);
            setSkill1(skill);
            setSkill1Rank(1);
            setSkill1Ranks(skill.ranks.map(rank => rank.level));
    
            // Notify parent (rank defaults to 1)
            onSkill1Select && onSkill1Select({ name: skill1Name, rank: 1, data: skill });
        }
    }, [skill1Name, skills]);
    
    useEffect(() => {
        if (skill2Name) {
            const skill = skills.find(s => s.name === skill2Name);
            setSkill2(skill);
            setSkill2Rank(1);
            setSkill2Ranks(skill.ranks.map(rank => rank.level));
    
            onSkill2Select && onSkill2Select({ name: skill2Name, rank: 1, data: skill });
        }
    }, [skill2Name, skills]);
    
    useEffect(() => {
        if (skill3Name) {
            const skill = skills.find(s => s.name === skill3Name);
            setSkill3(skill);
            setSkill3Rank(1);
            setSkill3Ranks(skill.ranks.map(rank => rank.level));
    
            onSkill3Select && onSkill3Select({ name: skill3Name, rank: 1, data: skill });
        }
    }, [skill3Name, skills]);
    

    const handleSkill1Change = (event) => {
        setSkill1Name(event.target.value);
    };

    const handleSkill1Level = (event) => {
        const newRank = parseInt(event.target.value);
        setSkill1Rank(newRank);
        if (skill1) {
            onSkill1Select && onSkill1Select({ name: skill1.name, rank: newRank, data: skill1 });
        }
    };

    const handleSkill2Change = (event) => {
        setSkill2Name(event.target.value);
    };

    const handleSkill2Level = (event) => {
        const newRank = parseInt(event.target.value);
        setSkill2Rank(newRank);
        if (skill2) {
            onSkill2Select && onSkill2Select({ name: skill2.name, rank: newRank, data: skill2 });
        }
    };

    const handleSkill3Change = (event) => {
        setSkill3Name(event.target.value);
    };

    const handleSkill3Level = (event) => {
        const newRank = parseInt(event.target.value);
        setSkill3Rank(newRank);
        if (skill3) {
            onSkill3Select && onSkill3Select({ name: skill3.name, rank: newRank, data: skill3 });
        }
    }

    return(
        <div className='mt-4 p-2'>
            <h3>Select 3 Offensive Skills</h3>

            <div className='mb-4'>
            <label htmlFor="skill-list-1">Skill 1: </label>
            <select 
            id="skill-list-1"
            className='text-black'
            onChange={handleSkill1Change} value={skill1Name}>
            <option value="">...</option>
            {(skillNames.sort()).map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
            </select>
            <label htmlFor="skill-1-levels"> Skill 1 Level: </label>
            <select 
            id="skill-1-levels"
            className='text-black'
            onChange={handleSkill1Level} value={skill1Rank}>
            {(skill1Ranks.sort()).map((rank, index) => (
                    <option key={index} value={rank}>{rank}</option>
                ))}
            </select>
            </div>


            <div className='mb-4'>
            <label htmlFor="skill-list-2">Skill 2: </label>
            <select 
            id="skill-list-2"
            className='text-black'
            onChange={handleSkill2Change} value={skill2Name}>
            <option value="">...</option>
            {(skillNames.sort()).map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
            </select>
            <label htmlFor="skill-2-levels"> Skill 2 Level: </label>
            <select 
            id="skill-2-levels"
            className='text-black'
            onChange={handleSkill2Level} value={skill2Rank}>
            {(skill2Ranks.sort()).map((rank, index) => (
                    <option key={index} value={rank}>{rank}</option>
                ))}
            </select>
            </div>

            <div className='mb-4'>
            <label htmlFor="skill-list-3">Skill 3: </label>
            <select 
            id="skill-list-3"
            className='text-black'
            onChange={handleSkill3Change} value={skill3Name}>
            <option value="">...</option>
            {(skillNames.sort()).map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
            </select>
            <label htmlFor="skill-3-levels"> Skill 3 Level: </label>
            <select 
            id="skill-3-levels"
            className='text-black'
            onChange={handleSkill3Level} value={skill3Rank}>
            {(skill3Ranks.sort()).map((rank, index) => (
                    <option key={index} value={rank}>{rank}</option>
                ))}
            </select>
            </div>


            {skill1 ? (
                            <div className='mb-4'>
                                <p> Skill 1: </p>
                                <Skill
                                name={skill1.name}
                                rank = {skill1Rank}
                                description = {skill1.ranks[skill1Rank-1].description}
                                />
                            </div>
                        ) : (
                            <p>Select a first skill to view its information.</p>
                        )}
            
            {skill2 ? (
                            <div className='mb-4'>
                                <p> Skill 2: </p>
                                <Skill
                                name={skill2.name}
                                rank = {skill2Rank}
                                description = {skill2.ranks[skill2Rank-1].description}
                                />
                            </div>
                        ) : (
                            <p>Select a second skill to view its information.</p>
                        )}

            {skill3 ? (
                            <div className='mb-4'>
                                <p> Skill 2: </p>
                                <Skill
                                name={skill3.name}
                                rank = {skill3Rank}
                                description = {skill3.ranks[skill3Rank-1].description}
                                />
                            </div>
                        ) : (
                            <p>Select a third skill to view its information.</p>
                        )}
        </div>
    );

}