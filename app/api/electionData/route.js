import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function GET() {
    try {
        await client.connect();
        const database = client.db('your-database-name'); // Replace with your actual database name
        const nationalDataCollection = database.collection('national-data');
        const stateDataCollection = database.collection('state-data');

        // Fetch data from both collections
        const nationalData = await nationalDataCollection.findOne({});
        const stateData = await stateDataCollection.find({}).toArray();

        // Close the database connection
        await client.close();

        // Return the fetched data as a response
        return new Response(
            JSON.stringify({ nationalData, stateData }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error fetching data from MongoDB', error }),
            { status: 500 }
        );
    }
}
