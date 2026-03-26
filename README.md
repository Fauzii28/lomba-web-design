FORMAT README PROJECT

Healthlogia

## Institusi
Universitas Majalengka

## Anggota Tim
- Ketua: Faris Ahmad Fauzi
- Anggota 1: Yuda Tri Putra
- Anggota 2: Siti Solihah

## Deskripsi Karya
**HealthLogia** adalah platform skrining kesehatan berbasis AI yang dirancang untuk memberikan analisis awal terhadap berbagai keluhan kesehatan pengguna. Proyek ini dikembangkan oleh **Ngawangkong Team** dari **Universitas Majalengka (UNMA)** untuk kompetisi **Innovillage 2025**.

---

## 📋 Persyaratan Sistem (Prerequisites)
Sebelum menjalankan aplikasi, pastikan perangkat Anda sudah terinstal:
1. **Node.js** (Versi 18 atau terbaru) - [Download di sini](https://nodejs.org/)
2. **Python** (Versi 3.9 atau terbaru) - [Download di sini](https://www.python.org/)
3. **Koneksi Internet** (Untuk sinkronisasi database Supabase)

---

## ⚙️ Panduan Instalasi & Menjalankan Proyek (Step-by-Step)

Aplikasi ini terdiri dari dua bagian: **Backend (Python)** dan **Frontend (React)**. Keduanya harus berjalan secara bersamaan di terminal yang berbeda.

### Langkah 1: Persiapan Awal
1. **Ekstrak file ZIP** `HealthLogia_Final.zip` ke folder tujuan di komputer Anda.
2. Buka folder hasil ekstrak tersebut menggunakan **Visual Studio Code**.


### Langkah 2: Menjalankan Backend (Otak AI)
Backend berfungsi untuk memproses analisis gejala kesehatan.
1. Buka **Terminal Baru** di VS Code (`Ctrl + Shift + ~`).
2. Masuk ke folder backend dengan mengetik perintah berikut:
   cd healthlogia-backend
3. Instal semua library Python yang dibutuhkan:
pip install -r requirements.txt
4. Jalankan server backend:
python app.py	
5. Biarkan terminal ini tetap terbuka. 
Server backend berjalan di http://127.0.0.1:5000.

### Langkah 3: Menjalankan Frontend (Antarmuka Pengguna)
Frontend adalah tampilan utama aplikasi HealthLogia.
1.	Buka Terminal Baru lagi (Klik tanda + di pojok kanan area terminal VS Code).
2.	Pastikan posisi terminal berada di folder utama (bukan di dalam folder backend).
3.	Jalankan instalasi library Node.js:
npm install
4.	Konfigurasi Database: Kami telah menyertakan file .env aktif yang berisi API Key Supabase. Aplikasi siap digunakan tanpa perlu konfigurasi tambahan.
5.	Jalankan server frontend:
npm run dev
6.	Buka browser dan akses alamat: http://localhost:5173

🚀 Fitur yang Dapat Dinilai (Testing Guide)
Setelah aplikasi terbuka, silakan mencoba alur berikut:
1.	Sistem Autentikasi: Gunakan menu Register untuk membuat akun baru, atau Login jika sudah memiliki akun.
2.	Skrining Kesehatan: Coba fitur Cek Gejala Luar atau Cek Gejala Dalam. Masukkan keluhan kesehatan untuk mendapatkan analisis awal dari AI.
3.	Manajemen Profil: Masuk ke halaman Profil > Update Data Diri. Ubah Nama, Pekerjaan, atau Lokasi untuk melihat sinkronisasi data secara real-time.
4.	Keamanan: Coba fitur Ganti Password pada menu keamanan untuk memastikan sistem proteksi akun berjalan baik.
🛠️ Tech Stack
•	Frontend: React.js, TypeScript, Tailwind CSS, Lucide Icons.
•	Backend: Python (Flask/FastAPI), AI Model Integration.
•	Database: Supabase (PostgreSQL & Auth).
💡 Troubleshooting (Kendala Umum)
•	Error CORS: Jika fitur AI tidak memberikan respon, pastikan Backend (Langkah 2) sudah berjalan di http://127.0.0.1:5000.
•	Blank Page: Pastikan file .env sudah berada di folder utama (sejajar dengan package.json).
•	Port Terpakai: Jika port 5173 atau 5000 sudah digunakan aplikasi lain, aplikasi akan otomatis berpindah port. Mohon cek link yang muncul di terminal.
© 2026 Ngawangkong Team • Universitas Majalengka (UNMA)
