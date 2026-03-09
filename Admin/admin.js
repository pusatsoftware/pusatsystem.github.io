const userTableBody = document.getElementById('userTableBody');
const annTarget = document.getElementById('annTarget');
const annList = document.getElementById('announcementList');
let currentEditId = "";

// 1. KULLANICI VE DUYURU HEDEF LİSTESİNİ YÜKLE
function loadDashboard() {
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        userTableBody.innerHTML = "";
        // Select box'ı sıfırla ama "Tüm Kullanıcılar" kalsın
        annTarget.innerHTML = '<option value="all">Tüm Kullanıcılara</option>';

        snapshot.forEach(doc => {
            const user = doc.data();
            const uid = doc.id;

            // Tabloya Ekle
            userTableBody.innerHTML += `
                <tr>
                    <td><b>${user.name}</b></td>
                    <td>${user.email}<br><small style="color:red">${user.password}</small></td>
                    <td><small>${user.createdAt}</small></td>
                    <td>
                        <button onclick="openEditModal('${uid}','${user.name}','${user.email}','${user.password}')" class="btn-sm edit">Düzenle</button>
                        <button onclick="deleteUser('${uid}')" class="btn-sm delete">Sil</button>
                    </td>
                </tr>`;

            // Duyuru Hedef Listesine (Select Box) Ekle
            annTarget.innerHTML += `<option value="${uid}">${user.name}</option>`;
        });
    });
}

// 2. DUYURU GÖNDERME
function sendAnnouncement() {
    const title = document.getElementById('annTitle').value;
    const content = document.getElementById('annContent').value;
    const target = annTarget.value;

    if(!title || !content) return alert("Alanları doldur!");

    db.collection("announcements").add({
        title,
        message: content,
        target,
        createdAt: new Date().toLocaleString('tr-TR')
    }).then(() => {
        alert("Duyuru Gönderildi!");
        document.getElementById('annTitle').value = "";
        document.getElementById('annContent').value = "";
    });
}

// 3. AKTİF DUYURULARI LİSTELE VE SİL
function loadAnnouncements() {
    db.collection("announcements").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        annList.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            annList.innerHTML += `
                <div class="ann-card">
                    <strong>${data.title}</strong>
                    <p>${data.message}</p>
                    <small>${data.target === 'all' ? 'Herkes' : 'Özel Mesaj'}</small>
                    <button onclick="deleteAnn('${doc.id}')" class="btn-del-ann">×</button>
                </div>`;
        });
    });
}

function deleteAnn(id) {
    if(confirm("Duyuru silinsin mi?")) db.collection("announcements").doc(id).delete();
}

// Düzenleme, Silme ve Modal fonksiyonları (Önceki kodlarla aynı şekilde buraya dahil edilecek)
function deleteUser(id) {
    if(confirm("Kullanıcı silinsin mi?")) db.collection("users").doc(id).delete();
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
    }).then(() => { alert("Güncellendi!"); closeModal(); });
}

// Başlat
loadDashboard();
loadAnnouncements();

document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => window.location.href="../Login/login.html");
});
