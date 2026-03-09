const list = document.getElementById('userList');
const logoutBtn = document.getElementById('logout');

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "../login/login.html";
    } else {
        db.collection("users").get().then(snapshot => {
            list.innerHTML = "";
            snapshot.forEach(doc => {
                const data = doc.data();
                const uid = doc.id;
                const email = data.email || '-';
                const name = data.name || '-';
                const createdAt = data.createdAt || '-';

                const li = document.createElement('li');
                li.innerHTML = `<strong>UID:</strong> ${uid} <br>
                                <strong>İsim:</strong> ${name} <br>
                                <strong>Email:</strong> ${email} <br>
                                <strong>Kayıt Tarihi:</strong> ${createdAt}`;
                list.appendChild(li);
            });
        });
    }
});

logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => window.location.href="../login/login.html");
});