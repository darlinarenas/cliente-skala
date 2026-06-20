document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    try {
        await SkalaAuth.login(form.get('email'), form.get('password'));
    } catch (error) {
        SkalaUI.toast(error.message);
    }
});
