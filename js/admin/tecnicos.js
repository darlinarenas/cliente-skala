SkalaAuth.requireRole('admin');
renderTopbar('Panel administrativo');
setActiveSidebar();

async function render() {
    const users = (await SkalaDatabase.get('users')).filter((u) => u.role === 'tecnico');
    const box = document.querySelector('[data-admin-tecnicos]');
    box.innerHTML = users.length ? table(users) : '<div class="empty">No hay técnicos registrados.</div>';
}

function table(users) {
    return `<table class="table"><thead><tr><th>Nombre</th><th>Correo</th><th>Especialidad</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${users.map((u) => `
        <tr>
            <td>${SkalaUI.safe(u.name)}</td>
            <td>${SkalaUI.safe(u.email)}</td>
            <td>${SkalaUI.safe(u.specialty || u.company)}</td>
            <td><span class="badge ${u.status === 'approved' ? 'green' : ''}">${u.status}</span></td>
            <td class="actions-row">
                <button class="btn small gold" onclick="approve('${u.id}')">Aprobar</button>
                <button class="btn small" onclick="editUser('${u.id}')">Editar</button>
                <button class="btn small danger" onclick="deleteUser('${u.id}')">Eliminar</button>
            </td>
        </tr>`).join('')}</tbody></table>`;
}

async function approve(id) {
    await SkalaDatabase.update('users', id, { status: 'approved' });
    render();
}

async function deleteUser(id) {
    if (!confirm('¿Eliminar este técnico?')) return;
    await SkalaDatabase.remove('users', id);
    render();
}

async function editUser(id) {
    const users = await SkalaDatabase.get('users');
    const user = users.find((u) => u.id === id);
    const specialty = prompt('Especialidad', user.specialty || user.company || '');
    if (specialty === null) return;
    await SkalaDatabase.update('users', id, { specialty });
    render();
}

render();
