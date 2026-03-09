const userMail = localStorage.getItem("userEmail") || "all"; // Login'de kaydedilmeli

db.collection("announcements").orderBy("createdAt", "desc").onSnapshot(snapshot => {
    const list = document.getElementById('notiItems');
    const badge = document.getElementById('notiBadge');
    let count = 0;
    list.innerHTML = "";

    snapshot.forEach(doc => {
        const data = doc.data();
        if(data.target === "all" || data.target === userMail) {
            count++;
            list.innerHTML += `
                <div class="noti-item">
                    <strong>${data.title}</strong>
                    <p>${data.message}</p>
                </div>`;
            
            // Son eklenen duyuru için Pop-up tetikle
            showLiveToast(data.title, data.message);
        }
    });
    badge.innerText = count;
});

function showLiveToast(title, msg) {
    const toast = document.getElementById('toastBox');
    document.getElementById('toastMsg').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function toggleDropdown() {
    document.getElementById('notiDropdown').classList.toggle('show');
}
