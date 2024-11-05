import 'dotenv/config';
import { db } from './lib/dbConnect.js';

const users = [
    {
        username: 'Max',
        email: 'Max@mail.com',
        password: '12345',
        avatar: 'https://img.freepik.com/premium-vector/head-icon-silhouette-profile-icons-set-gradient-avatar-profile-silhouette-faces_888418-6488.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        username: 'bob',
        email: 'bob@mail.com',
        password: '87654321',
        avatar: 'https://img.freepik.com/premium-vector/head-icon-silhouette-profile-icons-set-gradient-avatar-profile-silhouette-faces_888418-6488.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const tasks = [
    {
    name: 'Прочитать книгу "Atomic Habits"',
    description: 'Закончить чтение книги "Atomic Habits" Джеймса Клира',
    priority: 'не срочно',
    due: new Date().toISOString(),
    status: 'открыта',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    },
    {
    name: 'Изучить стек MERN',
    description: 'Изучить стек MERN и создать с его помощью полнофункциональное приложение',
    priority: 'срочно',
    due: new Date().toISOString(),
    status: 'открыта',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    },
];

try {
    // Добавление пользователей
    let collection = db.collection('users');
    console.log('[seed]', 'Добавляем пользователей...');
    const result = await collection.insertMany(users);
    console.log(result.insertedIds);
    console.log('[seed]', 'Добавление пользователей завершено');
    // Добавление задач
    tasks[0].owner = result.insertedIds[0];
    tasks[1].owner = result.insertedIds[1];
    collection = db.collection('tasks');
    console.log('[seed]', 'Добавляем задачи...');
    await collection.insertMany(tasks);
    console.log('[seed]', 'Добавление задач завершено');
    console.log('[seed]', 'Все завершено');
    } catch (error) {
    console.log('[seed]', 'Ошибка: ', error);
    }
    process.exit();