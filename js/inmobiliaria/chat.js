const user = SkalaAuth.requireRole('inmobiliaria');
renderTopbar('Panel inmobiliaria');
setActiveSidebar();
SkalaChat.renderChat(user);

document.getElementById('chatForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = new FormData(event.target).get('message');
    const admins = (await SkalaDatabase.get('users')).filter((u) => u.role === 'admin').map((u) => u.id);
    await SkalaChat.sendMessage(user, 'Inmobiliaria / SKALA', admins, text);
    event.target.reset();
    SkalaChat.renderChat(user);
});
