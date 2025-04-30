export function MotionValue({ name, values = [] }) {

    return(
        <div>
            <h3>Action: {name}</h3>
            <ul>
            {values && values.length > 0 ? (
                    values.map((value, index) => (
                        <li key={index}>
                            <strong>{value}</strong>
                        </li>
                    ))
                ) : (
                    <li>No Motion Data Found.</li>
                )}
            </ul>
        </div>
    )
}