const user = SkalaAuth.requireRole('tecnico');
renderTopbar('Panel técnico');
setActiveSidebar();

const form = document.getElementById('profileForm');
form.innerHTML = `
    <div class="field"><label>Nombre</label><input name="name" value="${SkalaUI.safe(user.name)}"></div>
    <div class="field"><label>Teléfono</label><input name="phone" value="${SkalaUI.safe(user.phone)}"></div>
    <div class="field"><label>Especialidad</label><input name="specialty" value="${SkalaUI.safe(user.specialty || user.company)}"></div>
    <button class="btn gold">Guardar cambios</button>
`;
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    await SkalaDatabase.update('users', user.id, data);
    SkalaUI.toast('Perfil actualizado. Vuelve a iniciar sesión para refrescar sesión.');
});
