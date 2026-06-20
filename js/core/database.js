const SkalaDatabase = (() => {
    const MODE = 'localStorage';
    const API_URL = 'http://localhost:3000/api';

    async function get(collection) {
        if (MODE === 'localStorage') {
            return SkalaStorage.get(collection);
        }

        const response = await fetch(`${API_URL}/${collection}`);
        return response.json();
    }

    async function set(collection, payload) {
        if (MODE === 'localStorage') {
            SkalaStorage.set(collection, payload);
            return payload;
        }

        const response = await fetch(`${API_URL}/${collection}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        return response.json();
    }

    async function insert(collection, item) {
        const rows = await get(collection);
        rows.push(item);
        await set(collection, rows);
        return item;
    }

    async function update(collection, id, changes) {
        const rows = await get(collection);
        const nextRows = rows.map((row) => row.id === id ? { ...row, ...changes } : row);
        await set(collection, nextRows);
        return nextRows.find((row) => row.id === id);
    }

    async function remove(collection, id) {
        const rows = await get(collection);
        await set(collection, rows.filter((row) => row.id !== id));
        return true;
    }

    return { get, set, insert, update, remove };
})();
