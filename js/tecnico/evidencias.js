const user = SkalaAuth.requireRole('tecnico');
renderTopbar('Panel técnico');
setActiveSidebar();

const form = document.getElementById('evidenceForm');

async function loadWorks() {
    const works = (await SkalaDatabase.get('requirements')).filter((r) => r.technicianId === user.id);
    document.querySelector('[data-work-options]').innerHTML = works.map((w) => `<option value="${w.id}">${w.code} - ${w.category}</option>`).join('');
}

function fileToBase64(file) {
    return new Promise((resolve) => {
        if (!file) return resolve('');
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const photo = await fileToBase64(form.elements.photo.files[0]);
    await SkalaDatabase.insert('evidences', {
        ...data,
        id: SkalaStorage.uid('evi'),
        technicianId: user.id,
        photo,
        createdAt: new Date().toISOString()
    });
    form.reset();
    SkalaUI.toast('Evidencia guardada.');
    render();
});

async function render() {
    const items = (await SkalaDatabase.get('evidences')).filter((e) => e.technicianId === user.id);
    document.querySelector('[data-evidence-list]').innerHTML = items.length ? `<table class="table"><thead><tr><th>Comentario</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody>${items.map((e) => `<tr><td>${SkalaUI.safe(e.comment)}</td><td>${SkalaUI.formatDate(e.createdAt)}</td><td><button class="btn small danger" onclick="deleteEvidence('${e.id}')">Eliminar</button></td></tr>`).join('')}</tbody></table>` : '<div class="empty">Sin evidencias cargadas.</div>';
}

async function deleteEvidence(id) {
    if (!confirm('¿Eliminar evidencia?')) return;
    await SkalaDatabase.remove('evidences', id);
    render();
}

loadWorks();
render();
