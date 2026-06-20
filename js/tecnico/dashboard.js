const user = SkalaAuth.requireRole('tecnico');
renderTopbar('Panel técnico');
setActiveSidebar();

async function init() {
    const works = (await SkalaDatabase.get('requirements')).filter((r) => r.technicianId === user.id);
    document.querySelector('[data-tecnico-cards]').innerHTML = `
        <div class="card"><div class="card-number">${works.length}</div><div class="card-label">Asignados</div></div>
        <div class="card"><div class="card-number">${works.filter((w) => w.status === 'En proceso').length}</div><div class="card-label">En proceso</div></div>
        <div class="card"><div class="card-number">${works.filter((w) => w.status === 'Cerrado').length}</div><div class="card-label">Cerrados</div></div>
        <div class="card"><div class="card-number">${works.filter((w) => w.priority === 'Urgente').length}</div><div class="card-label">Urgentes</div></div>
    `;
    document.querySelector('[data-tecnico-activos]').innerHTML = works.length ? `<table class="table"><tbody>${works.map((w) => `<tr><td>${w.code}</td><td>${w.category}</td><td><span class="badge">${w.status}</span></td></tr>`).join('')}</tbody></table>` : '<div class="empty">No tienes trabajos asignados.</div>';
}

init();
