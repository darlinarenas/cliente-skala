const SkalaAuth = (() => {
    const sessionKey = 'skala_pro_session';

    function currentUser() {
        const raw = sessionStorage.getItem(sessionKey);
        return raw ? JSON.parse(raw) : null;
    }

    function setSession(user) {
        sessionStorage.setItem(sessionKey, JSON.stringify(user));
    }

    function logout() {
        sessionStorage.removeItem(sessionKey);
        window.location.href = '../../pages/login.html';
    }

    async function login(email, password) {
        const users = await SkalaDatabase.get('users');
        const user = users.find((item) => item.email === email && item.password === password);

        if (!user) {
            throw new Error('Correo o contraseña incorrectos.');
        }

        if (user.status !== 'approved') {
            throw new Error('Tu cuenta todavía no ha sido aprobada por SKALA.');
        }

        setSession(user);
        redirectByRole(user.role);
    }

    async function register(data) {
        const users = await SkalaDatabase.get('users');
        const exists = users.some((user) => user.email === data.email);

        if (exists) {
            throw new Error('Este correo ya está registrado.');
        }

        const user = {
            id: SkalaStorage.uid('user'),
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            phone: data.phone || '',
            company: data.company || '',
            specialty: data.specialty || '',
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        await SkalaDatabase.insert('users', user);
        return user;
    }

    function requireRole(role) {
        const user = currentUser();

        if (!user || user.role !== role) {
            window.location.href = '../../pages/login.html';
        }

        return user;
    }

    function redirectByRole(role) {
        if (role === 'admin') window.location.href = '../../pages/admin/dashboard.html';
        if (role === 'inmobiliaria') window.location.href = '../../pages/inmobiliaria/dashboard.html';
        if (role === 'tecnico') window.location.href = '../../pages/tecnico/dashboard.html';
    }

    return { currentUser, login, register, logout, requireRole };
})();
