import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from "mongodb";

const { MONGODB_URI, MONGODB_DATABASE } = process.env;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI не определена. Проверьте файл .env");
}

const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectToDatabase() {
    try {
        // Подключаем клиент к серверу
        await client.connect();
        // Отправляем ping для подтверждения успешного подключения
        await client.db().command({ ping: 1 });
        console.log("Подключение к MongoDB успешно!");
    } catch (err) {
        console.error("Ошибка подключения к MongoDB:", err);
    }
}

await connectToDatabase();

export const db = client.db(MONGODB_DATABASE);


