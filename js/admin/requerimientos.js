SkalaAuth.requireRole('admin');
renderTopbar('Panel administrativo');
setActiveSidebar();

async function render() {
    const requirements = await SkalaDatabase.get('requirements');
    const users = await SkalaDatabase.get('users');
    const techs = users.filter((u) => u.role === 'tecnico' && u.status === 'approved');
    const box = document.querySelector('[data-admin-requerimientos]');

    box.innerHTML = requirements.length ? `<table class="table"><thead><tr><th>Código</th><th>Rubro</th><th>Estado</th><th>Técnico</th><th>Acciones</th></tr></thead><tbody>${requirements.map((r) => `
        <tr>
            <td>${r.code}</td>
            <td>${r.category}<br><small>${SkalaUI.safe(r.description)}</small></td>
            <td><span class="badge">${r.status}</span></td>
            <td><select onchange="assignTech('${r.id}', this.value)"><option value="">Sin asignar</option>${techs.map((t) => `<option value="${t.id}" ${r.technicianId === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}</select></td>
            <td class="actions-row">
                <button class="btn small gold" onclick="changeStatus('${r.id}', 'En proceso')">En proceso</button>
                <button class="btn small" onclick="changeStatus('${r.id}', 'Cerrado')">Cerrar</button>
                <button class="btn small danger" onclick="deleteRequirement('${r.id}')">Eliminar</button>
            </td>
        </tr>`).join('')}</tbody></table>` : '<div class="empty">No hay requerimientos.</div>';
}

async function assignTech(id, technicianId) {
    await SkalaDatabase.update('requirements', id, { technicianId, status: technicianId ? 'Asignado' : 'Pendiente' });
    render();
}

async function changeStatus(id, status) {
    await SkalaDatabase.update('requirements', id, { status });
    render();
}

async function deleteRequirement(id) {
    if (!confirm('¿Eliminar requerimiento?')) return;
    await SkalaDatabase.remove('requirements', id);
    render();
}

render();
