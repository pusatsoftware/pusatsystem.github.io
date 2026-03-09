const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Veritabanında bu email ve şifreye sahip kullanıcıyı ara
    db.collection("users")
      .where("email", "==", emailInput)
      .where("password", "==", passwordInput)
      .get()
      .then(snapshot => {
          if (!snapshot.empty) {
              // Kullanıcı bulundu! LocalStorage'a oturum bilgisini yazalım
              const userData = snapshot.docs[0].data();
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("userRole", userData.email === "admin@gmail.com" ? "admin" : "user");

              message.textContent = "Giriş Başarılı! Yönlendiriliyorsunuz...";
              message.style.color = "green";
              message.classList.add("show");
              
              setTimeout(() => {
                  window.location.href = "../Admin/admin.html";
              }, 1500);
          } else {
              throw new Error("Email veya şifre hatalı!");
          }
      })
      .catch(err => {
          message.textContent = err.message;
          message.style.color = "red";
          message.classList.add("show");
      });
});
