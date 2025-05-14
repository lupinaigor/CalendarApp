import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('mydatabase.db');
}

export const createTasksTable = async () => {
    const database = await openDatabase();
    try {
        await database.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                date TEXT NOT NULL
            );
        `);
        console.log('Tasks table created');
    } catch (e) {
        console.error('Error creating tasks table:', e);
    }
}

export const insertTask = async (title, description, date) => {
    const database = await openDatabase();
    if (!title || !date) {
        return;
    }
    try {
        const result = await database.runAsync(
            'INSERT INTO tasks (title, description, date) VALUES (?, ?, ?)',
            title, description, date
        );
        console.log(result);
        return result.lastInsertRowId;
    } catch (e) {
        console.error('Error inserting task:', e);
    }
}

export const fetchTasksByDate = async (date) => {
    const database = await openDatabase();
    try {
        const tasks = await database.getAllAsync(
            'SELECT * FROM tasks WHERE date = ?',
            date
        );
        console.log(`Tasks for ${date}:`, tasks);
        return tasks;
    } catch (e) {
        console.log('Error fetching tasks:', e);
    }
}

export const updateTask = async (title, description, id) => {
    const database = await openDatabase();
    if (!id || !title) {
        return;
    }
    try {
        await database.runAsync(
            'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
            title, description, id
        );
        console.log('Task updated');
    } catch (e) {
        console.error('Error updating task:', e);
    }
}

export const deleteTask = async (id) => {
    const database = await openDatabase();
    try {
        if (!id) {
            throw new Error(`This id not exists: ${id}`);
        }
        await database.runAsync(
            'DELETE FROM tasks WHERE id = ?',
            id
        );
        console.log('Task deleted');
    } catch (e) {
        console.error('Error deleting task:', e);
    }
}

export const fetchDatesWithTasks = async () => {
    const database = await openDatabase();
    try {
        const dates = await database.getAllAsync(
            'SELECT DISTINCT date FROM tasks'
        );
        console.log('Dates with tasks:', dates);
        return dates.map(item => item.date);
    } catch (e) {
        console.log('Error fetching dates with tasks:', e);
    }
}
