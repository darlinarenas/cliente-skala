const user = SkalaAuth.requireRole('admin');
renderTopbar('Panel administrativo');
setActiveSidebar();

async function init() {
    const users = await SkalaDatabase.get('users');
    const requirements = await SkalaDatabase.get('requirements');
    const properties = await SkalaDatabase.get('properties');

    document.querySelector('[data-admin-cards]').innerHTML = `
        <div class="card"><div class="card-number">${properties.length}</div><div class="card-label">Propiedades</div></div>
        <div class="card"><div class="card-number">${requirements.length}</div><div class="card-label">Requerimientos</div></div>
        <div class="card"><div class="card-number">${users.filter((u) => u.status === 'pending').length}</div><div class="card-label">Pendientes aprobación</div></div>
        <div class="card"><div class="card-number">${users.filter((u) => u.role === 'tecnico').length}</div><div class="card-label">Técnicos</div></div>
    `;

    document.querySelector('[data-admin-activity]').innerHTML = requirements.length
        ? renderRequirementTable(requirements.slice(-6).reverse())
        : '<div class="empty">Todavía no hay requerimientos.</div>';
}

function renderRequirementTable(items) {
    return `<table class="table"><thead><tr><th>ID</th><th>Rubro</th><th>Estado</th><th>Prioridad</th></tr></thead><tbody>${items.map((item) => `
        <tr><td>${item.code}</td><td>${item.category}</td><td><span class="badge">${item.status}</span></td><td>${item.priority}</td></tr>`).join('')}</tbody></table>`;
}

init();
