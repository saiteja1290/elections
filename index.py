import os
import random
from datetime import datetime, timedelta
from pymongo import MongoClient

# MongoDB connection details
MONGO_URI = "mongodb+srv://test:test123@cluster0.jnzx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = "your-database-name"
NATIONAL_DATA_COLLECTION = "national-data"
STATE_DATA_COLLECTION = "state-data"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# List of states
states = ["WA", "OR", "CA", "TX", "FL", "NY"]

# Generate random national data
def generate_national_data():
    data = [
        {
            "name": "Kamala Harris (D)",
            "value": random.randint(45, 55),
            "color": "#3b82f6",
        },
        {
            "name": "Donald Trump (R)",
            "value": random.randint(40, 50),
            "color": "#ef4444",
        },
        {
            "name": "Other",
            "value": random.randint(1, 5),
            "color": "#22c55e",
        },
    ]
    return data

# Generate random state data
def generate_state_data():
    data = {}
    for state in states:
        state_data = {
            "results": [
                {
                    "name": "Kamala Harris (D)",
                    "value": random.randint(40, 65),
                    "color": "#3b82f6",
                },
                {
                    "name": "Donald Trump (R)",
                    "value": random.randint(30, 55),
                    "color": "#ef4444",
                },
                {
                    "name": "Other",
                    "value": random.randint(1, 5),
                    "color": "#22c55e",
                },
            ],
            "turnout": random.randint(60, 75),
        }
        data[state] = state_data
    return data

# Insert data into MongoDB
def insert_data():
    national_data = generate_national_data()
    state_data = generate_state_data()

    db[NATIONAL_DATA_COLLECTION].insert_one({"data": national_data})
    db[STATE_DATA_COLLECTION].insert_one({"data": state_data})

    print("Data inserted successfully!")

if __name__ == "__main__":
    insert_data()
    client.close()