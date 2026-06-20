const user = SkalaAuth.requireRole('inmobiliaria');
renderTopbar('Panel inmobiliaria');
setActiveSidebar();

const form = document.getElementById('propertyForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    if (data.id) {
        await SkalaDatabase.update('properties', data.id, data);
        SkalaUI.toast('Propiedad actualizada.');
    } else {
        await SkalaDatabase.insert('properties', {
            ...data,
            id: SkalaStorage.uid('prop'),
            ownerId: user.id,
            createdAt: new Date().toISOString()
        });
        SkalaUI.toast('Propiedad creada.');
    }

    form.reset();
    render();
});

async function render() {
    const items = (await SkalaDatabase.get('properties')).filter((p) => p.ownerId === user.id);
    const box = document.querySelector('[data-properties-list]');
    box.innerHTML = items.length ? `<table class="table"><thead><tr><th>Dirección</th><th>Comuna</th><th>Encargado</th><th>Acciones</th></tr></thead><tbody>${items.map((p) => `
        <tr><td>${SkalaUI.safe(p.address)}</td><td>${SkalaUI.safe(p.city)}</td><td>${SkalaUI.safe(p.manager)}</td><td class="actions-row"><button class="btn small" onclick="editProperty('${p.id}')">Editar</button><button class="btn small danger" onclick="deleteProperty('${p.id}')">Eliminar</button></td></tr>`).join('')}</tbody></table>` : '<div class="empty">Crea tu primera propiedad.</div>';
}

async function editProperty(id) {
    const item = (await SkalaDatabase.get('properties')).find((p) => p.id === id);
    Object.keys(item).forEach((key) => {
        if (form.elements[key]) form.elements[key].value = item[key];
    });
}

async function deleteProperty(id) {
    if (!confirm('¿Eliminar propiedad?')) return;
    await SkalaDatabase.remove('properties', id);
    render();
}

render();
