let currentEditId = "";

function initAdmin() {
    // Üye Listesini Kalem İkonlarıyla Doldur
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const rowContainer = document.getElementById('userDataRows');
        const annTarget = document.getElementById('annTarget');
        rowContainer.innerHTML = "";
        annTarget.innerHTML = '<option value="all">🚀 Herkese Gönder</option>';

        snapshot.forEach((doc, index) => {
            const u = doc.data();
            const uid = doc.id;

            rowContainer.innerHTML += `
                <div class="user-row">
                    <span style="opacity:0.4">${index + 1}</span>
                    <span style="font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${u.name}</span>
                    <span style="color:#94a3b8; font-size:13px;">${u.email}</span>
                    <span style="color:var(--accent); font-family:monospace;">${u.password}</span>
                    <div style="display:flex; gap:15px; justify-content: flex-end;">
                        <button class="action-btn edit-icon" onclick="openEdit('${uid}','${u.name}','${u.email}','${u.password}')" title="Düzenle">✏️</button>
                        <button class="action-btn delete-icon" onclick="deleteUser('${uid}')" title="Sil">🗑️</button>
                    </div>
                </div>`;
            annTarget.innerHTML += `<option value="${u.email}">${u.name}</option>`;
        });
    });
}

// Düzenleme Fonksiyonları
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
    }).then(() => { closeModal(); alert("Üye başarıyla güncellendi! ✅"); });
}

function deleteUser(id) {
    if(confirm("Bu üyeyi silmek istediğine emin misin?")) db.collection("users").doc(id).delete();
}

// Duyuru Gönder (Kullanıcı Paneline Sinyal Gönderir)
function sendAnnouncement() {
    const title = document.getElementById('annTitle').value;
    const message = document.getElementById('annMsg').value;
    const target = document.getElementById('annTarget').value;

    if(!title || !message) return alert("Lütfen boş alan bırakmayın!");

    db.collection("announcements").add({
        title, message, target,
        createdAt: new Date().toLocaleString('tr-TR'),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById('annTitle').value = "";
        document.getElementById('annMsg').value = "";
        alert("Duyuru yayında! 🚀");
    });
}

initAdmin();
