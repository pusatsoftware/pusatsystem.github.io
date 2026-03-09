let currentEditId = "";

function startAdmin() {
    // ÜYELERİ DİNLE VE TABLOYU DOLDUR
    db.collection("users").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const rowContainer = document.getElementById('userDataRows');
        rowContainer.innerHTML = "";
        
        snapshot.forEach((doc, index) => {
            const u = doc.data();
            const uid = doc.id;

            rowContainer.innerHTML += `
                <div class="user-row">
                    <span style="opacity:0.5">${index + 1}</span>
                    <span style="font-weight:600">${u.name}</span>
                    <span style="color:#94a3b8; font-size:13px">${u.email}</span>
                    <span style="font-family:monospace; color:var(--accent)">${u.password}</span>
                    <div style="display:flex; gap:15px; justify-content: flex-end;">
                        <button onclick="openEdit('${uid}','${u.name}','${u.email}','${u.password}')" class="act-btn">✏️</button>
                        <button onclick="deleteUser('${uid}')" class="act-btn">🗑️</button>
                    </div>
                </div>`;
        });
    });
}

// Modal Aç/Kapat
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
        alert("Üye bilgileri jilet gibi güncellendi! ✅");
    });
}

startAdmin();
