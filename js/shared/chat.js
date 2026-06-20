const SkalaChat = (() => {
    let activeThread = null;

    async function getThreadsForUser(user) {
        const messages = await SkalaDatabase.get('messages');
        const threadMap = new Map();

        messages
            .filter((message) => message.participants.includes(user.id) || user.role === 'admin')
            .forEach((message) => {
                threadMap.set(message.threadId, message);
            });

        return Array.from(threadMap.values());
    }

    async function renderChat(user) {
        const threadsBox = document.querySelector('[data-chat-threads]');
        const messagesBox = document.querySelector('[data-chat-messages]');

        if (!threadsBox || !messagesBox) return;

        const threads = await getThreadsForUser(user);
        threadsBox.innerHTML = threads.length ? '' : '<div class="empty">Todavía no hay conversaciones.</div>';

        threads.forEach((thread) => {
            const item = document.createElement('div');
            item.className = `chat-thread ${activeThread === thread.threadId ? 'active' : ''}`;
            item.innerHTML = `<strong>${SkalaUI.safe(thread.subject)}</strong><br><small>${SkalaUI.safe(thread.text)}</small>`;
            item.onclick = () => {
                activeThread = thread.threadId;
                renderChat(user);
            };
            threadsBox.appendChild(item);
        });

        if (!activeThread && threads[0]) {
            activeThread = threads[0].threadId;
        }

        renderMessages(user);
    }

    async function renderMessages(user) {
        const box = document.querySelector('[data-chat-messages]');
        const messages = await SkalaDatabase.get('messages');
        const threadMessages = messages.filter((message) => message.threadId === activeThread);

        box.innerHTML = threadMessages.length ? '' : '<div class="empty">Selecciona o crea una conversación.</div>';

        threadMessages.forEach((message) => {
            const item = document.createElement('div');
            item.className = `message ${message.fromId === user.id ? 'mine' : ''}`;
            item.innerHTML = `
                ${SkalaUI.safe(message.text)}
                <small>${SkalaUI.formatDate(message.createdAt)}</small>
            `;
            box.appendChild(item);
        });
    }

    async function sendMessage(user, subject, participants, text) {
        if (!text.trim()) return;

        const threadId = activeThread || SkalaStorage.uid('thread');
        activeThread = threadId;

        await SkalaDatabase.insert('messages', {
            id: SkalaStorage.uid('msg'),
            threadId,
            subject: subject || 'Conversación interna',
            fromId: user.id,
            participants: Array.from(new Set([user.id, ...participants])),
            text,
            createdAt: new Date().toISOString()
        });
    }

    return { renderChat, sendMessage };
})();
