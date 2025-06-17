//database.js


import * as SQLite from 'expo-sqlite';

let db = null;

// Відкриваємо базу один раз і зберігаємо у змінній
export const openDatabase = async () => {
    if (db) return db;

    db = await SQLite.openDatabaseAsync('mydatabase.db');
    await createTasksTable();       // існуюча таблиця
    await createViolationsTable(); // нова таблиця
    return db;
};

// Таблиця задач (залишаємо без змін)
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

// 📌 Таблиця порушень
const createViolationsTable = async () => {
    try {
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS violations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        date TEXT NOT NULL,
        userId TEXT,
        latitude REAL,
        longitude REAL
      );
    `);
        console.log('✅ Violations table ensured');
    } catch (e) {
        console.error('❌ Error creating violations table:', e);
    }
};

// ➕ Додавання задачі
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

// 📥 Додавання порушення
export const insertViolation = async ({
                                          description,
                                          category,
                                          imageUri,
                                          date,
                                          userId,
                                          latitude,
                                          longitude
                                      }) => {
    try {
        const db = await openDatabase();
        const result = await db.runAsync(
            `INSERT INTO violations 
            (description, category, imageUri, date, userId, latitude, longitude) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            description, category, imageUri, date, userId, latitude, longitude
        );
        return result.lastInsertRowId;
    } catch (e) {
        console.error('❌ Error inserting violation:', e);
        return null;
    }
};

// 🧾 Отримання задач за датою
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

// 🧾 Отримання всіх порушень
export const fetchAllViolations = async () => {
    try {
        const db = await openDatabase();
        const violations = await db.getAllAsync('SELECT * FROM violations');
        return violations;
    } catch (e) {
        console.error('❌ Error fetching violations:', e);
        return [];
    }
};

// ✏️ Оновлення задачі
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

// 🗑️ Видалення задачі
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

// 📅 Дати з задачами
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

