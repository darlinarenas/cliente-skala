const user = SkalaAuth.requireRole('tecnico');
renderTopbar('Panel técnico');
setActiveSidebar();

async function render() {
    const works = (await SkalaDatabase.get('requirements')).filter((r) => r.technicianId === user.id);
    document.querySelector('[data-tecnico-trabajos]').innerHTML = works.length ? `<table class="table"><thead><tr><th>Código</th><th>Detalle</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${works.map((w) => `
        <tr><td>${w.code}</td><td>${w.category}<br><small>${SkalaUI.safe(w.description)}</small></td><td><span class="badge">${w.status}</span></td><td class="actions-row"><button class="btn small gold" onclick="statusWork('${w.id}', 'En proceso')">Iniciar</button><button class="btn small" onclick="statusWork('${w.id}', 'Cerrado')">Cerrar</button><button class="btn small" onclick="noteWork('${w.id}')">Editar nota</button></td></tr>`).join('')}</tbody></table>` : '<div class="empty">No tienes trabajos asignados.</div>';
}

async function statusWork(id, status) {
    await SkalaDatabase.update('requirements', id, { status });
    render();
}

async function noteWork(id) {
    const note = prompt('Observación del técnico');
    if (note === null) return;
    await SkalaDatabase.update('requirements', id, { technicianNote: note });
    render();
}

render();
