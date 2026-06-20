SkalaAuth.requireRole('admin');
renderTopbar('Panel administrativo');
setActiveSidebar();

async function render() {
    const requirements = await SkalaDatabase.get('requirements');
    const closed = requirements.filter((r) => r.status === 'Cerrado').length;
    const active = requirements.filter((r) => r.status !== 'Cerrado').length;
    const urgent = requirements.filter((r) => r.priority === 'Urgente').length;

    document.querySelector('[data-admin-reportes]').innerHTML = `
        <div class="report-box"><h3>${requirements.length}</h3><p>Total de requerimientos</p></div>
        <div class="report-box"><h3>${active}</h3><p>Trabajos activos</p></div>
        <div class="report-box"><h3>${closed}</h3><p>Trabajos cerrados</p></div>
        <div class="report-box"><h3>${urgent}</h3><p>Urgencias del mes</p></div>
        <div class="report-box"><h3>LocalStorage</h3><p>MVP preparado para migrar a PostgreSQL.</p></div>
        <div class="report-box"><h3>PDF futuro</h3><p>Exportación preparada para backend.</p></div>
    `;
}

render();
