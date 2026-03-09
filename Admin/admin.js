const userListContainer = document.getElementById('userListContainer');
const annTarget = document.getElementById('annTarget');
let currentEditId = "";

function initAdmin() {
    // KULLANICI LİSTESİ VE TABLO HİZALAMA
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        userListContainer.innerHTML = `
            <div class="table-header">
                <span>#</span><span>İSİM</span><span>E-POSTA</span><span>ŞİFRE</span><span>EYLEM</span>
            </div>
        `;
        annTarget.innerHTML = '<option value="all">🚀 Herkese Gönder</option>';

        snapshot.forEach((doc, index) => {
            const u = doc.data();
            const uid = doc.id;

            userListContainer.innerHTML += `
                <div class="user-row">
                    <span style="opacity:0.5">${index + 1}</span>
                    <span style="font-weight:600">${u.name}</span>
                    <span style="color:#94a3b8; font-size:13px;">${u.email}</span>
                    <span style="color:var(--accent); font-family:monospace;">${u.password}</span>
                    <div style="display:flex; gap:8px;">
                        <button onclick="openEdit('${uid}','${u.name}','${u.email}','${u.password}')" style="background:none; border:none; cursor:pointer;">⚙️</button>
                        <button onclick="deleteUser('${uid}')" style="background:none; border:none; cursor:pointer;">🗑️</button>
                    </div>
                </div>
            `;
            annTarget.innerHTML += `<option value="${u.email}">${u.name}</option>`;
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
    }).then(() => { closeModal(); alert("Başarıyla Güncellendi!"); });
}

// DUYURU SİSTEMİ
function sendAnnouncement() {
    const title = document.getElementById('annTitle').value;
    const msg = document.getElementById('annMsg').value;
    const target = annTarget.value;

    db.collection("announcements").add({
        title, message: msg, target,
        createdAt: new Date().toLocaleString('tr-TR'),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById('annTitle').value = "";
        document.getElementById('annMsg').value = "";
        alert("Duyuru Uçuruldu! 🚀");
    });
}

initAdmin();
