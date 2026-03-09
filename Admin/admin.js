const userTableBody = document.getElementById('userTableBody');
const logoutBtn = document.getElementById('logout');
let currentEditId = "";

// Kullanıcıları Veritabanından Çek ve Listele
function loadUserList() {
    db.collection("users").orderBy("createdAt", "desc").get().then(snapshot => {
        userTableBody.innerHTML = "";
        let count = 1;

        snapshot.forEach(doc => {
            const user = doc.data();
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${count++}</td>
                <td>${user.name || '-'}</td>
                <td>${user.email || '-'}</td>
                <td style="font-family: monospace; color: #d63031;">${user.password || '-'}</td>
                <td><small>${user.createdAt || '-'}</small></td>
                <td>
                    <button class="edit-btn" onclick="openEditModal('${doc.id}', '${user.name}', '${user.email}', '${user.password}')">Düzenle</button>
                    <button class="delete-btn" onclick="deleteUser('${doc.id}')">Sil</button>
                </td>
            `;
            userTableBody.appendChild(tr);
        });
    }).catch(err => {
        console.error("Veri çekme hatası: ", err);
    });
}

// Kullanıcı Silme
function deleteUser(id) {
    if(confirm("Bu üyeyi sistemden kalıcı olarak silmek istediğinize emin misiniz?")) {
        db.collection("users").doc(id).delete().then(() => {
            alert("Kullanıcı başarıyla silindi.");
            loadUserList();
        });
    }
}

// Düzenleme Modalı Kontrolleri
function openEditModal(id, name, email, pass) {
    currentEditId = id;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPassword').value = pass;
    document.getElementById('editModal').style.display = "flex";
}

function closeModal() {
    document.getElementById('editModal').style.display = "none";
}

// Güncelleme İşlemi (Login ile entegre)
function updateUser() {
    const newName = document.getElementById('editName').value;
    const newEmail = document.getElementById('editEmail').value;
    const newPass = document.getElementById('editPassword').value;

    db.collection("users").doc(currentEditId).update({
        name: newName,
        email: newEmail,
        password: newPass
    }).then(() => {
        alert("Kullanıcı bilgileri güncellendi. Yeni bilgilerle giriş yapılabilir.");
        closeModal();
        loadUserList();
    }).catch(err => alert("Güncelleme hatası: " + err.message));
}

// Çıkış İşlemi
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = "../Login/login.html";
    });
});

// Sayfa yüklendiğinde listeyi getir
loadUserList();
