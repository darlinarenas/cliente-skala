document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    try {
        await SkalaAuth.register({
            name: form.get('name'),
            email: form.get('email'),
            password: form.get('password'),
            phone: form.get('phone'),
            role: form.get('role'),
            company: form.get('company'),
            specialty: form.get('company')
        });

        SkalaUI.toast('Registro enviado. Espera aprobación de SKALA.');
        event.target.reset();
    } catch (error) {
        SkalaUI.toast(error.message);
    }
});
