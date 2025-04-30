'use client';

export function Skill({name, description, rank}) {
    return(
        <div>
            <p>{name} Level {rank}</p>
            <p>{description}</p>
        </div>
    )
}