let currentEditId = "";

function startApp() {
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const rows = document.getElementById('userDataRows');
        rows.innerHTML = "";
        snapshot.forEach((doc, index) => {
            const u = doc.data();
            rows.innerHTML += `
                <div class="user-row">
                    <span style="opacity:0.4; font-weight:bold;">${index + 1}</span>
                    <span style="font-weight:600">${u.name}</span>
                    <span style="color:#94a3b8">${u.email}</span>
                    <span style="color:#a855f7; font-family:monospace;">${u.password}</span>
                    <div style="display:flex; gap:15px; justify-content: flex-end;">
                        <button onclick="openEdit('${doc.id}','${u.name}','${u.email}','${u.password}')" style="background:none; border:none; cursor:pointer; font-size:18px;">✏️</button>
                        <button onclick="deleteUser('${doc.id}')" style="background:none; border:none; cursor:pointer; font-size:18px;">🗑️</button>
                    </div>
                </div>`;
        });
    });
}

function sendAnnouncement() {
    const titleInput = document.getElementById('annTitle');
    const msgInput = document.getElementById('annMsg');
    const toast = document.getElementById('toastNotification');

    if(!titleInput.value || !msgInput.value) return alert("Boş alanları doldur kanka!");

    db.collection("announcements").add({
        title: titleInput.value,
        message: msgInput.value,
        target: document.getElementById('annTarget').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        // 1. Toast'u fırlat
        toast.classList.add('active');
        
        // 2. Formu tertemiz et
        titleInput.value = "";
        msgInput.value = "";
        
        // 3. 3 saniye sonra toast'u kapat
        setTimeout(() => { toast.classList.remove('active'); }, 3000);
    });
}

function openEdit(id, n, e, p) {
    currentEditId = id;
    document.getElementById('editName').value = n;
    document.getElementById('editEmail').value = e;
    document.getElementById('editPassword').value = p;
    document.getElementById('editModalOverlay').style.display = 'flex';
}

function closeModal() { document.getElementById('editModalOverlay').style.display = 'none'; }

function updateUser() {
    db.collection("users").doc(currentEditId).update({
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value
    }).then(() => { closeModal(); alert("Güncellendi!"); });
}

function deleteUser(id) {
    if(confirm("Siliyorsun bak emin misin?")) {
        db.collection("users").doc(id).delete();
    }
}

startApp();
