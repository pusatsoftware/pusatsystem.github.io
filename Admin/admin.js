let currentEditId = "";
let userToDelete = "";

function startApp() {
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const rows = document.getElementById('userDataRows');
        rows.innerHTML = "";
        let sayac = 1; 

        snapshot.forEach((doc) => {
            const u = doc.data();
            rows.innerHTML += `
                <div class="user-row">
                    <span style="opacity:0.4; font-weight:bold; color:var(--primary);">${sayac}</span>
                    <span style="font-weight:600">${u.name}</span>
                    <span style="color:#94a3b8; font-size: 13px;">${u.email}</span>
                    <span style="color:#a855f7; font-family:monospace;">${u.password}</span>
                    <div style="display:flex; gap:15px; justify-content: flex-end;">
                        <button onclick="openEdit('${doc.id}','${u.name}','${u.email}','${u.password}')" style="background:none; border:none; cursor:pointer; font-size:18px;">✏️</button>
                        <button onclick="deleteUser('${doc.id}')" style="background:none; border:none; cursor:pointer; font-size:18px;">🗑️</button>
                    </div>
                </div>`;
            sayac++;
        });
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
    }).then(() => { 
        closeModal(); 
        const successModal = document.getElementById('successModalOverlay');
        successModal.style.display = 'flex';
        setTimeout(() => { successModal.style.display = 'none'; }, 2000);
    });
}

function deleteUser(id) {
    userToDelete = id; 
    document.getElementById('deleteModalOverlay').style.display = 'flex';
}
function closeDeleteModal() { document.getElementById('deleteModalOverlay').style.display = 'none'; }

function confirmDelete() {
    if(userToDelete) {
        db.collection("users").doc(userToDelete).delete().then(() => {
            closeDeleteModal(); 
            const delSuccess = document.getElementById('deleteSuccessModalOverlay');
            delSuccess.style.display = 'flex';
            setTimeout(() => { delSuccess.style.display = 'none'; }, 2000);
        });
    }
}

document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => { window.location.href = "../index.html"; });
});

startApp();
