const SkalaStorage = (() => {
    const prefix = 'skala_pro_';

    const defaults = {
        users: [
            {
                id: 'admin-1',
                name: 'Administrador SKALA',
                email: 'admin@skala.cl',
                password: '123456',
                role: 'admin',
                status: 'approved',
                phone: '+56 9 0000 0000',
                createdAt: new Date().toISOString()
            }
        ],
        properties: [],
        requirements: [],
        messages: [],
        evidences: []
    };

    function key(collection) {
        return `${prefix}${collection}`;
    }

    function get(collection) {
        const raw = localStorage.getItem(key(collection));

        if (!raw) {
            return defaults[collection] ? structuredClone(defaults[collection]) : [];
        }

        try {
            return JSON.parse(raw);
        } catch (error) {
            console.error('Error leyendo localStorage', error);
            return defaults[collection] || [];
        }
    }

    function set(collection, payload) {
        localStorage.setItem(key(collection), JSON.stringify(payload));
    }

    function seed() {
        Object.keys(defaults).forEach((collection) => {
            if (!localStorage.getItem(key(collection))) {
                set(collection, defaults[collection]);
            }
        });
    }

    function reset() {
        Object.keys(defaults).forEach((collection) => localStorage.removeItem(key(collection)));
        seed();
    }

    function uid(prefixName) {
        return `${prefixName}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    }

    seed();

    return { get, set, reset, uid };
})();
