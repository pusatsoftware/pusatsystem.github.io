const userTableBody = document.getElementById('userTableBody');
const annTarget = document.getElementById('annTarget');
let currentEditId = "";

// DASHBOARD BAŞLATICI (Kullanıcılar ve Duyuru Hedefleri)
function initDashboard() {
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        userTableBody.innerHTML = "";
        annTarget.innerHTML = '<option value="all">Tüm Kullanıcılara</option>';

        snapshot.forEach(doc => {
            const user = doc.data();
            const uid = doc.id;

            // Tabloyu Doldur (Hizalı)
            userTableBody.innerHTML += `
                <tr>
                    <td><b>${user.name}</b></td>
                    <td>${user.email}<br><small style="color:#ff7675">${user.password}</small></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="openEditModal('${uid}','${user.name}','${user.email}','${user.password}')">✏️</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser('${uid}')">🗑️</button>
                    </td>
                </tr>`;

            // Duyuru Seçeneğine Ekle
            annTarget.innerHTML += `<option value="${user.email}">${user.name}</option>`;
        });
    });
}

// DUYURU GÖNDER
function sendAnnouncement() {
    const title = document.getElementById('annTitle').value;
    const content = document.getElementById('annContent').value;
    const target = annTarget.value;

    if(!title || !content) return alert("Boş alan bırakmayın!");

    db.collection("announcements").add({
        title, message: content, target,
        createdAt: new Date().toLocaleString('tr-TR')
    }).then(() => {
        alert("Duyuru Yayında!");
        document.getElementById('annTitle').value = "";
        document.getElementById('annContent').value = "";
    });
}

// SİLME & DÜZENLEME (Entegre)
function deleteUser(id) {
    if(confirm("Silinsin mi?")) db.collection("users").doc(id).delete();
}

function openEditModal(id, n, e, p) {
    currentEditId = id;
    document.getElementById('editName').value = n;
    document.getElementById('editEmail').value = e;
    document.getElementById('editPassword').value = p;
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() { document.getElementById('editModal').style.display = 'none'; }

function updateUser() {
    db.collection("users").doc(currentEditId).update({
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value
    }).then(() => { closeModal(); alert("Güncellendi!"); });
}

initDashboard();

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href="../Login/login.html";
});
