const list = document.getElementById('userList');
const logoutBtn = document.getElementById('logout');

auth.onAuthStateChanged(user => {
    if (!user) {
        // Eğer giriş yapmamışsa login'e at
        window.location.href = "../Login/login.html";
    } else {
        // Giriş yapmışsa verileri çek
        db.collection("users").get()
        .then(snapshot => {
            list.innerHTML = "";
            if (snapshot.empty) {
                list.innerHTML = "<li>Henüz kayıtlı kullanıcı yok.</li>";
                return;
            }
            snapshot.forEach(doc => {
                const data = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>İsim:</strong> ${data.name || 'Belirtilmemiş'} <br>
                    <strong>Email:</strong> ${data.email || '-'} <br>
                    <strong>Kayıt Tarihi:</strong> ${data.createdAt || '-'} <br>
                    <small style="color:gray;">UID: ${doc.id}</small>
                `;
                list.appendChild(li);
            });
        })
        .catch(err => {
            console.error("Veri çekme hatası:", err);
            list.innerHTML = "<li>Veriler yüklenirken hata oluştu (Yetki hatası olabilir).</li>";
        });
    }
});

logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = "../Login/login.html";
    });
});
