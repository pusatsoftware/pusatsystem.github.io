const list = document.getElementById('userList');
const logoutBtn = document.getElementById('logout');
let currentEditId = "";

// Oturum kontrolü (Basit yöntem)
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "../Login/login.html";
}

function loadUsers() {
    db.collection("users").get().then(snapshot => {
        list.innerHTML = "";
        snapshot.forEach(doc => {
            const u = doc.data();
            const li = document.createElement('li');
            li.style.borderBottom = "1px solid #ddd";
            li.style.padding = "10px";
            li.innerHTML = `
                <strong>İsim:</strong> ${u.name} <br>
                <strong>Email:</strong> ${u.email} <br>
                <strong>Şifre:</strong> <span style="color:red;">${u.password}</span> <br>
                <button onclick="openEditModal('${doc.id}', '${u.name}', '${u.email}', '${u.password}')" style="background:orange; color:white; border:none; padding:5px 10px; cursor:pointer; margin-top:5px;">Düzenle</button>
                <button onclick="deleteUser('${doc.id}')" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer;">Sil</button>
            `;
            list.appendChild(li);
        });
    });
}

function deleteUser(id) {
    if(confirm("Bu kullanıcıyı kalıcı olarak silmek istiyor musun?")) {
        db.collection("users").doc(id).delete().then(() => {
            alert("Kullanıcı silindi!");
            loadUsers();
        });
    }
}

function openEditModal(id, name, email, pass) {
    currentEditId = id;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPassword').value = pass;
    document.getElementById('editModal').style.display = "block";
}

function closeModal() { document.getElementById('editModal').style.display = "none"; }

function updateUser() {
    const newName = document.getElementById('editName').value;
    const newEmail = document.getElementById('editEmail').value;
    const newPass = document.getElementById('editPassword').value;

    db.collection("users").doc(currentEditId).update({
        name: newName,
        email: newEmail,
        password: newPass
    }).then(() => {
        alert("Kullanıcı güncellendi! Artık yeni bilgilerle giriş yapabilir.");
        closeModal();
        loadUsers();
    });
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../Login/login.html";
});

// Sayfa açıldığında kullanıcıları yükle
loadUsers();
