'use client';

export function ArmorPiece(type, skills, slots) {
    return(
        <div>
            <p>Armor Type: {type}</p>
            <ul>
                {skills && skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <li key={index}>
                            <strong>{skill}</strong> 
                        </li>
                    ))
                ) : (
                    <li>No skills found.</li>
                )}
            </ul>
            <p>Deco Slots: {slots}</p>
        </div>
    )
}