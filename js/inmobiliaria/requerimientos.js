const user = SkalaAuth.requireRole('inmobiliaria');
renderTopbar('Panel inmobiliaria');
setActiveSidebar();

const form = document.getElementById('requirementForm');

async function loadProperties() {
    const properties = (await SkalaDatabase.get('properties')).filter((p) => p.ownerId === user.id);
    const select = document.querySelector('[data-property-options]');
    select.innerHTML = properties.map((p) => `<option value="${p.id}">${SkalaUI.safe(p.address)}</option>`).join('');
}

function filesToBase64(files) {
    return Promise.all(Array.from(files).map((file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    })));
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const photos = await filesToBase64(form.elements.photos.files);

    if (data.id) {
        await SkalaDatabase.update('requirements', data.id, { ...data, photos });
        SkalaUI.toast('Requerimiento actualizado.');
    } else {
        await SkalaDatabase.insert('requirements', {
            ...data,
            id: SkalaStorage.uid('req'),
            code: `REQ-${Date.now().toString().slice(-5)}`,
            ownerId: user.id,
            technicianId: '',
            photos,
            status: 'Pendiente',
            createdAt: new Date().toISOString()
        });
        SkalaUI.toast('Requerimiento creado.');
    }

    form.reset();
    loadProperties();
    render();
});

async function render() {
    const items = (await SkalaDatabase.get('requirements')).filter((r) => r.ownerId === user.id);
    const box = document.querySelector('[data-requirements-list]');
    box.innerHTML = items.length ? `<table class="table"><thead><tr><th>Código</th><th>Rubro</th><th>Estado</th><th>Fotos</th><th>Acciones</th></tr></thead><tbody>${items.map((r) => `
        <tr><td>${r.code}</td><td>${r.category}<br><small>${SkalaUI.safe(r.description)}</small></td><td><span class="badge">${r.status}</span></td><td>${(r.photos || []).length}</td><td class="actions-row"><button class="btn small" onclick="editRequirement('${r.id}')">Editar</button><button class="btn small danger" onclick="deleteRequirement('${r.id}')">Eliminar</button></td></tr>`).join('')}</tbody></table>` : '<div class="empty">Crea tu primer requerimiento.</div>';
}

async function editRequirement(id) {
    const item = (await SkalaDatabase.get('requirements')).find((r) => r.id === id);
    Object.keys(item).forEach((key) => {
        if (form.elements[key] && key !== 'photos') form.elements[key].value = item[key];
    });
}

async function deleteRequirement(id) {
    if (!confirm('¿Eliminar requerimiento?')) return;
    await SkalaDatabase.remove('requirements', id);
    render();
}

loadProperties();
render();
