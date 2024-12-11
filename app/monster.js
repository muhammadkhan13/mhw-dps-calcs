export function Monster({ name, type, description, resistances =[], weaknesses =[] }) {
    
    return(
        <div>
            <h3>Name: {name}</h3>
            <p>Type: {type}</p>
            <p>Description: {description}</p>
            <ul>
                {resistances && resistances.length > 0 ? (
                    resistances.map((resistance, index) => (
                        <li key={index}>
                            <strong>{resistance.element}</strong>
                            {resistance.condition && ` (Condition: ${resistance.condition})`}
                        </li>
                    ))
                ) : (
                    <li>No resistances found.</li>
                )}
            </ul>
            <ul>
                {weaknesses && weaknesses.length > 0 ? (
                    weaknesses.map((weakness, index) => (
                        <li key={index}>
                            <strong>{weakness.element}</strong>
                            {weakness.stars && ` (Weakness level: ${weakness.stars} stars)`}
                            {weakness.condition && ` (Condition: ${weakness.condition})`}
                        </li>
                    ))
                ) : (
                    <li>No weaknesses found.</li>
                )}
            </ul>
        </div>
    );
}