const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElemenconst notiList = document.getElementById('notiList');
const notiCount = document.getElementById('notiCount');
const liveToast = document.getElementById('liveToast');
const toastBody = document.getElementById('toastBody');

// 1. OTURUM KONTROLÜ (LocalStorage üzerinden)
const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn !== "true") {
    window.location.href = "Login/login.html";
}

// 2. DUYURULARI CANLI DİNLE (onSnapshot)
// Not: Gerçek sistemde 'userUID' bilgisini giriş yaparken kaydetmelisin.
const userEmail = "kullanici@gmail.com"; // Örnektir, giriş yapanın maili gelmeli

db.collection("announcements")
  .orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
      let count = 0;
      notiList.innerHTML = "";

      snapshot.forEach(doc => {
          const data = doc.data();
          
          // Sadece 'herkese' veya 'bu kullanıcıya' özel olanları göster
          if (data.target === "all" || data.target === userEmail) {
              count++;
              
              // Liste öğesini oluştur
              const item = document.createElement('div');
              item.className = "noti-item";
              item.innerHTML = `
                  <strong>${data.title}</strong>
                  <p>${data.message}</p>
                  <small>${data.createdAt}</small>
              `;
              notiList.appendChild(item);

              // Eğer son 5 saniye içinde eklendiyse Toast (Pop-up) göster
              showToast(data.title, data.message);
          }
      });

      notiCount.textContent = count;
      if(count === 0) notiList.innerHTML = '<p class="empty-msg">Duyuru yok.</p>';
  });

// 3. YARDIMCI FONKSİYONLAR
function toggleNoti() {
    document.getElementById('notiDropdown').classList.toggle('active');
}

function showToast(title, msg) {
    toastBody.textContent = msg;
    liveToast.classList.add('show');
    setTimeout(() => closeToast(), 5000); // 5 saniye sonra kapat
}

function closeToast() {
    liveToast.classList.remove('show');
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "Login/login.html";
});tById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        // Firestore'a kaydet
        db.collection("users").doc(userCredential.user.uid).set({
            name: name,
            email: email
        });

        // Başarılı mesaj ve animasyon
        message.textContent = "Kayıt Başarılı! Yönlendiriliyorsunuz...";
        message.style.color = "green";
        message.classList.add("show");

        // 2 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 2000);
    })
    .catch(err => {
        message.textContent = err.message;
        message.style.color = "red";
        message.classList.add("show");
    });
});