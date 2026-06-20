const user = SkalaAuth.requireRole('admin');
renderTopbar('Panel administrativo');
setActiveSidebar();

SkalaChat.renderChat(user);

document.getElementById('chatForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = new FormData(event.target).get('message');
    const users = await SkalaDatabase.get('users');
    const participants = users.filter((u) => u.role !== 'admin').map((u) => u.id);
    await SkalaChat.sendMessage(user, 'Comunicación SKALA', participants, text);
    event.target.reset();
    SkalaChat.renderChat(user);
});
