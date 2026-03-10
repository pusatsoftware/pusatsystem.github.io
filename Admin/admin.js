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
                    <span style="color:#94a3b8; font-size: 13px;">${u.email}</span>
                    <span style="color:var(--accent); font-family:monospace;">${u.password}</span>
                    <div style="display:flex; gap:15px; justify-content: flex-end;">
                        <button onclick="openEdit('${doc.id}','${u.name}','${u.email}','${u.password}')" style="background:none; border:none; cursor:pointer; font-size:18px;">✏️</button>
                        <button onclick="deleteUser('${doc.id}')" style="background:none; border:none; cursor:pointer; font-size:18px;">🗑️</button>
                    </div>
                </div>`;
        });
    });
}

function sendAnnouncement() {
    const title = document.getElementById('annTitle');
    const msg = document.getElementById('annMsg');
    const target = document.getElementById('annTarget').value;
    const toast = document.getElementById('toastNotification');

    if(!title.value || !msg.value) return alert("Lütfen boş alan bırakmayın!");

    db.collection("announcements").add({
        title: title.value,
        message: msg.value,
        target: target,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        // BAŞARI ANİMASYONU (TOAST)
        toast.classList.add('show');
        
        // FORM TEMİZLEME
        title.value = "";
        msg.value = "";

        // 3 Saniye Sonra Toast Gizle
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
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
    if(confirm("Bu üyeyi silmek istediğine emin misin?")) {
        db.collection("users").doc(id).delete();
    }
}

startApp();
