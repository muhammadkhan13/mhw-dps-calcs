export async function GET(request) {
    try {
        const response = await fetch("https://mhw-db.com/motion-value");

        if(!response.ok) {
            throw new Error("Motion Value Data Fetching Error");
        }

        const mv = await response.json();

        const mvData = [...motion-value];

        return new Response(JSON.stringify(mvData), {status: 200, headers: {"Content-Type": "application/json"}});
    } catch (error) {
        console.log("DATA FETCH ERROR:" + error.message);
        return new Response(JSON.stringify({ error: error.message }), {status: 500, headers: {"Content-Type": "application/json"},});
    }
}