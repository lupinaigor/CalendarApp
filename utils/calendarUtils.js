export function generateCalendarDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
    const prevMonthDays = (startDayOfWeek + 6) % 7; // ПН = 0

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Дні попереднього місяця
    for (let i = prevMonthDays - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const date = new Date(year, month - 1, day);
        days.push({ date, isCurrentMonth: false });
    }

    // Дні поточного місяця
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        const date = new Date(year, month, i);
        days.push({ date, isCurrentMonth: true });
    }

    // Дні наступного місяця
    const totalCells = 42;
    const nextDays = totalCells - days.length;
    for (let i = 1; i <= nextDays; i++) {
        const date = new Date(year, month + 1, i);
        days.push({ date, isCurrentMonth: false });
    }

    return days;
}



