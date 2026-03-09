body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}
.register-container {
    background: rgba(255,255,255,0.95);
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 15px 25px rgba(0,0,0,0.3);
    width: 350px;
    text-align: center;
    animation: fadeIn 1s ease forwards;
}
.register-container h1 { margin-bottom:30px; color:#333; }
.register-container input {
    width:100%; padding:12px; margin:10px 0; border:none; border-radius:8px; background:#f1f1f1; transition:0.3s;
}
.register-container input:focus { background:#e0e0e0; outline:none; }
.register-container button {
    width:100%; padding:12px; margin-top:15px; border:none; border-radius:8px; background:#667eea; color:white; font-weight:bold; cursor:pointer; transition:0.3s;
}
.register-container button:hover { background:#5a67d8; }
#message { margin-top:15px; font-weight:bold; opacity:0; transition:opacity 0.5s ease, transform 0.5s ease; }
#message.show { opacity:1; transform:translateY(-10px); }
@keyframes fadeIn { 0%{transform:translateY(-50px);opacity:0;} 100%{transform:translateY(0);opacity:1;} }
