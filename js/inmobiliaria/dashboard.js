const user = SkalaAuth.requireRole('inmobiliaria');
renderTopbar('Panel inmobiliaria');
setActiveSidebar();

async function init() {
    const properties = (await SkalaDatabase.get('properties')).filter((p) => p.ownerId === user.id);
    const requirements = (await SkalaDatabase.get('requirements')).filter((r) => r.ownerId === user.id);

    document.querySelector('[data-inmo-cards]').innerHTML = `
        <div class="card"><div class="card-number">${properties.length}</div><div class="card-label">Propiedades</div></div>
        <div class="card"><div class="card-number">${requirements.length}</div><div class="card-label">Requerimientos</div></div>
        <div class="card"><div class="card-number">${requirements.filter((r) => r.status !== 'Cerrado').length}</div><div class="card-label">Activos</div></div>
        <div class="card"><div class="card-number">${requirements.filter((r) => r.status === 'Cerrado').length}</div><div class="card-label">Cerrados</div></div>
    `;

    document.querySelector('[data-inmo-recientes]').innerHTML = requirements.length ? `<table class="table"><tbody>${requirements.slice(-5).reverse().map((r) => `<tr><td>${r.code}</td><td>${r.category}</td><td><span class="badge">${r.status}</span></td></tr>`).join('')}</tbody></table>` : '<div class="empty">Sin requerimientos todavía.</div>';
}

init();
