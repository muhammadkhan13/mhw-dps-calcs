export async function GET(request) {
    try {
        console.log("Fetching");
        const response = await fetch("https://mhw-db.com/monsters");

        if(!response.ok) {
            throw new Error("Monster Data Fetching Error");
            console.log("Response Error");
        }
        console.log("Successful fetch");

        const monsters = await response.json();

        const monsterData = [...monsters];

        return new Response(JSON.stringify(monsterData), {status: 200, headers: {"Content-Type": "application/json"},});
    } catch (error) {
        console.log("DATA FETCH ERROR:" + error.message);
        return new Response(JSON.stringify({ error: error.message }), {status: 500, headers: {"Content-Type": "application/json"},});
    }
}