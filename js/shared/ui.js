const SkalaUI = (() => {
    function toast(message) {
        const oldToast = document.querySelector('.toast');

        if (oldToast) {
            oldToast.remove();
        }

        const box = document.createElement('div');
        box.className = 'toast';
        box.textContent = message;
        document.body.appendChild(box);

        setTimeout(() => box.remove(), 2600);
    }

    function formatDate(value) {
        if (!value) return '-';
        return new Date(value).toLocaleDateString('es-CL');
    }

    function money(value) {
        if (!value) return '-';
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            maximumFractionDigits: 0
        }).format(value);
    }

    function safe(value) {
        return String(value || '').replace(/[&<>"]/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;'
        }[char]));
    }

    return { toast, formatDate, money, safe };
})();
