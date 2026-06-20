const user = SkalaAuth.requireRole('tecnico');
renderTopbar('Panel técnico');
setActiveSidebar();
SkalaChat.renderChat(user);

document.getElementById('chatForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = new FormData(event.target).get('message');
    const admins = (await SkalaDatabase.get('users')).filter((u) => u.role === 'admin').map((u) => u.id);
    await SkalaChat.sendMessage(user, 'Técnico / SKALA', admins, text);
    event.target.reset();
    SkalaChat.renderChat(user);
});
