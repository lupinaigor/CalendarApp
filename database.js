//database.js
// import * as SQLite from 'expo-sqlite';
//
// export const openDatabase = async () => {
//     return await SQLite.openDatabaseAsync('mydatabase.db');
// }
//
// export const createTasksTable = async () => {
//     const database = await openDatabase();
//     try {
//         await database.execAsync(`
//             PRAGMA journal_mode = WAL;
//             CREATE TABLE IF NOT EXISTS tasks (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 title TEXT NOT NULL,
//                 description TEXT,
//                 date TEXT NOT NULL
//             );
//         `);
//         console.log('Tasks table created');
//     } catch (e) {
//         console.error('Error creating tasks table:', e);
//     }
// }
//
// export const insertTask = async (title, description, date) => {
//     const database = await openDatabase();
//     if (!title || !date) {
//         return;
//     }
//     try {
//         const result = await database.runAsync(
//             'INSERT INTO tasks (title, description, date) VALUES (?, ?, ?)',
//             title, description, date
//         );
//         console.log(result);
//         return result.lastInsertRowId;
//     } catch (e) {
//         console.error('Error inserting task:', e);
//     }
// }
//
// export const fetchTasksByDate = async (date) => {
//     const database = await openDatabase();
//     try {
//         const tasks = await database.getAllAsync(
//             'SELECT * FROM tasks WHERE date = ?',
//             date
//         );
//         console.log(`Tasks for ${date}:`, tasks);
//         return tasks;
//     } catch (e) {
//         console.log('Error fetching tasks:', e);
//     }
// }
//
// export const updateTask = async (title, description, id) => {
//     const database = await openDatabase();
//     if (!id || !title) {
//         return;
//     }
//     try {
//         await database.runAsync(
//             'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
//             title, description, id
//         );
//         console.log('Task updated');
//     } catch (e) {
//         console.error('Error updating task:', e);
//     }
// }
//
// export const deleteTask = async (id) => {
//     const database = await openDatabase();
//     try {
//         if (!id) {
//             throw new Error(`This id not exists: ${id}`);
//         }
//         await database.runAsync(
//             'DELETE FROM tasks WHERE id = ?',
//             id
//         );
//         console.log('Task deleted');
//     } catch (e) {
//         console.error('Error deleting task:', e);
//     }
// }
//
// export const fetchDatesWithTasks = async () => {
//     const database = await openDatabase();
//     try {
//         const dates = await database.getAllAsync(
//             'SELECT DISTINCT date FROM tasks'
//         );
//         console.log('Dates with tasks:', dates);
//         return dates.map(item => item.date);
//     } catch (e) {
//         console.log('Error fetching dates with tasks:', e);
//     }
// }

// database.js
import * as SQLite from 'expo-sqlite';

let db = null;

// Відкриваємо базу один раз і зберігаємо у змінній
export const openDatabase = async () => {
    if (db) return db;

    db = await SQLite.openDatabaseAsync('mydatabase.db');
    await createTasksTable(); // переконуємось, що таблиця створена
    return db;
};

const createTasksTable = async () => {
    try {
        await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL
      );
    `);
        console.log('✅ Tasks table ensured');
    } catch (e) {
        console.error('❌ Error creating tasks table:', e);
    }
};

export const insertTask = async (title, description, date) => {
    if (!title || !date) return null;
    try {
        const db = await openDatabase();
        const result = await db.runAsync(
            'INSERT INTO tasks (title, description, date) VALUES (?, ?, ?)',
            title, description, date
        );
        return result.lastInsertRowId;
    } catch (e) {
        console.error('❌ Error inserting task:', e);
        return null;
    }
};

export const fetchTasksByDate = async (date) => {
    try {
        const db = await openDatabase();
        const tasks = await db.getAllAsync(
            'SELECT * FROM tasks WHERE date = ?',
            date
        );
        return tasks;
    } catch (e) {
        console.error('❌ Error fetching tasks:', e);
        return [];
    }
};

export const updateTask = async (title, description, id) => {
    if (!id || !title) return false;
    try {
        const db = await openDatabase();
        await db.runAsync(
            'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
            title, description, id
        );
        return true;
    } catch (e) {
        console.error('❌ Error updating task:', e);
        return false;
    }
};

export const deleteTask = async (id) => {
    if (!id) return false;
    try {
        const db = await openDatabase();
        await db.runAsync('DELETE FROM tasks WHERE id = ?', id);
        return true;
    } catch (e) {
        console.error('❌ Error deleting task:', e);
        return false;
    }
};

export const fetchDatesWithTasks = async () => {
    try {
        const db = await openDatabase();
        const dates = await db.getAllAsync('SELECT DISTINCT date FROM tasks');
        return dates.map(item => item.date);
    } catch (e) {
        console.error('❌ Error fetching dates with tasks:', e);
        return [];
    }
};
