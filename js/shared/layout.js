function renderTopbar(roleLabel) {
    const user = SkalaAuth.currentUser();
    const topbar = document.querySelector('[data-topbar]');

    if (!topbar) return;

    topbar.innerHTML = `
        <div class="brand">
            <img class="brand-logo" src="../../assets/logo/skala-logo-transparent.png" alt="SKALA Home Services">
            <div>
                <h2 class="brand-title">SKALA</h2>
                <span class="brand-subtitle">HOME SERVICES</span>
            </div>
        </div>
        <div class="top-actions">
            <span class="badge">${roleLabel}</span>
            <span>${user ? SkalaUI.safe(user.name) : ''}</span>
            <button class="btn small" onclick="SkalaAuth.logout()">Salir</button>
        </div>
    `;
}

function setActiveSidebar() {
    const current = window.location.pathname.split('/').pop();

    document.querySelectorAll('.sidebar-link').forEach((link) => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('active', href.endsWith(current));
    });
}
