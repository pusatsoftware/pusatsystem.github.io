let currentEditId = "";

function initDashboard() {
    // KULLANICILARI DİNLE
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const rowContainer = document.getElementById('userDataRows');
        rowContainer.innerHTML = "";

        snapshot.forEach((doc, index) => {
            const u = doc.data();
            const uid = doc.id;

            // Tablo Satırı Oluştur
            rowContainer.innerHTML += `
                <div class="user-row">
                    <span style="opacity:0.4">${index + 1}</span>
                    <span style="font-weight:600">${u.name}</span>
                    <span style="color:#94a3b8; font-size:13px">${u.email}</span>
                    <span style="color:var(--accent); font-family:monospace;">${u.password}</span>
                    <div style="display:flex; gap:15px; justify-content: flex-end;">
                        <button onclick="openEdit('${uid}','${u.name}','${u.email}','${u.password}')" style="background:none; border:none; cursor:pointer; font-size:18px;">✏️</button>
                        <button onclick="deleteUser('${uid}')" style="background:none; border:none; cursor:pointer; font-size:18px;">🗑️</button>
                    </div>
                </div>`;
        });
    });
}

// MODAL KONTROLLERİ
function openEdit(id, name, email, pass) {
    currentEditId = id;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPassword').value = pass;
    document.getElementById('editModalOverlay').style.display = 'flex';
}

function closeModal() { document.getElementById('editModalOverlay').style.display = 'none'; }

function updateUser() {
    db.collection("users").doc(currentEditId).update({
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value
    }).then(() => { closeModal(); alert("Başarıyla güncellendi! ✅"); });
}

function deleteUser(id) {
    if(confirm("Bu üyeyi silmek istediğine emin misin?")) db.collection("users").doc(id).delete();
}

// DUYURU SİSTEMİ
function sendAnnouncement() {
    const title = document.getElementById('annTitle').value;
    const msg = document.getElementById('annMsg').value;
    if(!title || !msg) return alert("Boş bırakma!");

    db.collection("announcements").add({
        title, message: msg, target: document.getElementById('annTarget').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => { alert("Duyuru Yayında! 🚀"); });
}

initDashboard();
