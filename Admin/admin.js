let currentEditId = "";

function startApp() {
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const rows = document.getElementById('userDataRows');
        rows.innerHTML = "";
        
        // NAN HATASINI ÇÖZEN KISIM (Kendi sayacımızı başlattık)
        let sayac = 1;

        snapshot.forEach((doc) => { // Buradaki index'i kaldırdım
            const u = doc.data();
            rows.innerHTML += `
                <div class="user-row">
                    <span style="opacity:0.4; font-weight:bold;">${sayac}</span>
                    <span style="font-weight:600">${u.name}</span>
                    <span style="color:#94a3b8">${u.email}</span>
                    <span style="color:#a855f7; font-family:monospace;">${u.password}</span>
                    <div style="display:flex; gap:15px; justify-content: flex-end;">
                        <button onclick="openEdit('${doc.id}','${u.name}','${u.email}','${u.password}')" style="background:none; border:none; cursor:pointer;">✏️</button>
                        <button onclick="deleteUser('${doc.id}')" style="background:none; border:none; cursor:pointer;">🗑️</button>
                    </div>
                </div>`;
            
            // Her üyede sayacı 1 arttırıyoruz
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
    }).then(() => { closeModal(); });
}

function deleteUser(id) {
    if(confirm("Silmek istediğine emin misin?")) {
        db.collection("users").doc(id).delete();
    }
}

startApp();
