# Panduan Publikasi PDF Password Remover ke Itch.io

Dokumen ini berisi langkah-langkah lengkap beserta detail isian untuk memublikasikan aplikasi **PDF Password Remover** Anda secara gratis (atau *pay-what-you-want*) di platform Itch.io.

---

## Tahap 1: Persiapan File

Sebelum masuk ke website, pastikan file installer sudah siap.

1. Buka Inno Setup sekalian tekan **F9 (Compile)** untuk memastikan Anda memiliki installer versi terbaru.
2. Cari file hasilnya di dalam folder `Output/` proyek Anda. 
3. **Penting**: Pastikan namanya sudah benar dan rapi, misalnya: `PDF_Password_Remover_v26.3.4.exe` (atau .zip jika Anda mengemasnya dalam zip).

---

## Tahap 2: Buat Halaman Proyek Baru

1. Kunjungi [itch.io](https://itch.io/) dan login ke akun `awancoder` / Awan Digitals Anda.
2. Di pojok kanan atas (menu dropdown profil), klik **Dashboard**.
3. Klik tombol merah **Create new project**.

---

## Tahap 3: Pengisian Formulir Proyek (Metadata)

Isilah formulir berdasarkan referensi berikut untuk hasil yang terlihat profesional:

### Bagian Atas
* **Title:** PDF Password Remover
* **Project URL:** `[username-anda].itch.io/pdf-password-remover`
* **Short description or tagline:** *Remove PDF passwords easily and quickly. Secure, offline, and supports multiple files.*
* **Classification:** Pilih **Tool** (Karena ini bukan game).
* **Kind of project:** Pilih **Downloadable** (You have files to download).

### Bagian Harga (Pricing)
* **Pricing:** Pilih **No payments** (100% Gratis) atau **Donate** (Pengguna bisa donasi jika mereka mau - *Sangat Direkomendasikan*).
   * *Jika memilih Donate, biarkan **Suggested donation** di angka $2.00.*

### Bagian Unggah File (Uploads)
1. Klik tombol **Upload files**.
2. Pilih file `PDF_Password_Remover_v...exe` dari komputer Anda (di folder `Output/`).
3. Tunggu hingga proses upload selesai.
4. **SETELAH SELESAI UPLOAD:** Akan muncul ikon gerigi ⚙️ (atau tombol opsi) di sebelah file tersebut. 
   * Centang opsi: **Windows** (pilih ikon berlogo Windows)
   * *Opsi lain biarkan kosong.*

### Bagian Deskripsi Detail (Description)
Gunakan *Visual Editor* itch.io dan copy-paste format di bawah ini. Anda bisa merapikan format (Bold/List) menggunakan toolbar editor Masing-masing.

```text
PDF Password Remover is a lightweight, fast, and offline desktop utility designed to remove passwords and restrictions from your PDF files effortlessly. 

Built with privacy in mind, this tool processes all your documents entirely on your local machine—no internet connection required, meaning your sensitive PDFs never leave your computer.

✨ Key Features:
• Offline Processing: 100% local processing guarantees total privacy.
• Batch Support: Remove passwords from multiple PDF files simultaneously.
• Intuitive Interface: Clean, dark-themed UI makes it incredibly easy to use.
• Lightning Fast: Powered by the robust qpdf engine for near-instant results.

🛠️ How to use:
1. Open the application.
2. Click "Select PDF Files" to browse, or simply drag and drop your PDFs.
3. If the files have a user password, enter it in the password field. (Leave empty if they only have owner/editing restrictions).
4. Click "Remove Password".
5. Your unprotected files will be instantly saved in the same folder with an "_unprotected.pdf" suffix.

Developed by Awan Digitals.
```

### Informasi Tambahan (Details)
* **Genre:** Pilih **Other** atau **Productivity** (jika ada).
* **Tags:** Ketik dan pilih tag berikut agar mudah dicari: `pdf`, `utility`, `tool`, `productivity`, `offline`, `windows`.
* **Custom noun:** Ketik `Tool` atau `Software`.
* **Download details:** (Kosongkan)

---

## Tahap 4: Desain Halaman Visual (Visuals)

* **Cover Image:** Wajib diunggah. Buat gambar berukuran **630x500 pixels** (minimal). Anda bisa membuat gambar sederhana bertuliskan "PDF Password Remover" dengan latar belakang ungu/gelap agar senada dengan aplikasi.
* **Screenshots:** Unggah 1 atau 2 screenshot (tangkapan layar) dari aplikasi Anda saat sedang berjalan. *Ini sangat penting agar orang percaya untuk mengunduh.*
* **Video Trailer:** (Kosongkan jika tidak ada).

*(Tips: Setelah menyimpan proyek pertama kali, Anda bisa klik tombol **Edit theme** di bagian atas halaman untuk mengubah warna background dan font halamannya agar sesuai dengan dark-theme aplikasi Anda).*

---

## Tahap 5: Publikasi (Visibility & Access)

Bagian paling bawah halaman:
* **Visibility:** Secara default, ia berada di posisi **Draft**.
* Ubah menjadi **Public** agar semua orang bisa melihat dan mengunduhnya.
* Terakhir, klik tombol **Save & view page** di bagian bawah.

Selamat! Aplikasi Desktop pertama Anda sudah resmi dipublikasi di itch.io dan siap dibagikan ke seluruh dunia.
