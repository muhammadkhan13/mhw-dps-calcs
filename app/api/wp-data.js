export async function GET(request) {
    try {
        const response = await fetch("https://mhw-db.com/weapons");

        if(!response.ok) {
            throw new Error("Weapon Data Fetching Error");
        }

        const weapons = await response.json();

        const weaponData = [...weapons];

        return new Response(JSON.stringify(weaponData), {status: 200, headers: {"Content-Type": "application/json"},});
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {status: 500, headers: {"Content-Type": "application/json"},});
    }
}