@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
:root { --bg: #0b0e14; --card: #161b22; --primary: #6366f1; --accent: #a855f7; }

body { margin: 0; background: var(--bg); color: white; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; }
.admin-wrapper { display: flex; height: 100vh; }
.sidebar { width: 240px; background: var(--card); padding: 30px; border-right: 1px solid rgba(255,255,255,0.05); }
.main-content { flex: 1; padding: 30px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }
.glass-card { background: var(--card); border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05); }

/* DUYURU GRID SİSTEMİ (Çakışmayı Bitirir) */
.ann-grid-system {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 20px;
    align-items: start;
}
.ann-main { display: flex; flex-direction: column; gap: 10px; }
.ann-side { display: flex; flex-direction: column; justify-content: space-between; height: 100%; min-height: 155px; }

#annTitle, #annMsg, select, .edit-card input {
    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
    color: white; padding: 12px; border-radius: 10px; outline: none; width: 100%;
}
#annMsg { height: 100px; resize: none; }

/* HEDEF SEÇİMİ */
.target-group { display: flex; flex-direction: column; gap: 5px; }
.target-group label { font-size: 11px; font-weight: 800; color: var(--primary); text-transform: uppercase; }

/* ULTRA MODERN BUTON (ANİMASYONLU) */
.btn-ultra-modern {
    position: relative;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: white; border: none; padding: 16px; border-radius: 15px;
    font-weight: 800; cursor: pointer; overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}
.btn-ultra-modern:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 8px 25px rgba(168, 85, 247, 0.5); }
.shimmer {
    position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: lightning 3s infinite;
}
@keyframes lightning { 0% { left: -100%; } 20% { left: 100%; } 100% { left: 100%; } }

/* TOAST MESAJ (SAĞ ÜST) */
.toast-box {
    position: fixed; top: 25px; right: -400px;
    background: #10b981; color: white; padding: 18px 28px;
    border-radius: 14px; font-weight: bold; z-index: 9999;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.toast-box.active { right: 25px; }

/* TABLO */
.t-header, .user-row {
    display: grid; grid-template-columns: 40px 1fr 1.5fr 1fr 100px;
    gap: 15px; align-items: center; padding: 12px 20px;
}
.t-header { color: var(--primary); font-weight: 800; font-size: 11px; text-transform: uppercase; opacity: 0.7; }
.user-row { background: rgba(255,255,255,0.02); border-radius: 12px; margin-top: 8px; }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); display: none; justify-content: center; align-items: center; z-index: 1000; }
.edit-card { background: #1e293b; padding: 30px; border-radius: 25px; border: 1px solid var(--primary); width: 350px; display: flex; flex-direction: column; gap: 15px; }
