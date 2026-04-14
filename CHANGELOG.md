# Changelog

All notable changes to **PDF Password Remover** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [26.4.14] - 2026-04-14 — Initial Release

### Added

#### 🖥️ Application
- Desktop app built with **NeutralinoJS v6.5.0** (window mode, 480×850 px, resizable, min 420×700 px)
- Dark theme UI using **Vanilla HTML, CSS, JavaScript** with **Inter** font (Google Fonts)
- Application icon set: `appIcon.ico`, `appIcon.png`, `trayIcon.png`, `logo.gif`
- About window — opens a separate child window (`/about/`) via the "About" button in the header

#### 📂 File Selection
- Native file picker via `Neutralino.os.showOpenDialog` with multi-select support
- Drag & Drop zone with visual active state feedback on hover
- "Add More" button — append additional files without clearing the existing list
- Duplicate file detection — prevents the same file path from being added twice
- Individual file removal — remove a single file from the list
- "Clear All" button — removes all queued files at once
- File count badge — displays total number of queued files

#### 🔐 Password Removal
- Integration with bundled **qpdf** engine (`tools/qpdf.exe` + Visual C++ runtime DLLs)
- Password input field with show/hide toggle
- Batch processing — process multiple PDF files sequentially in one session
- Output saved in the same directory as the source with `_unprotected.pdf` suffix
- Properly quoted file paths in command to handle spaces and special characters
- qpdf error parsing: wrong password, not a PDF, corrupt file, unencrypted file

#### 📊 Status & Feedback
- Real-time per-file status indicators: `Waiting`, `Processing...`, `Done`, `Error`
- Toast notification system — success, error, and info messages with auto-dismiss (3.5s)
- Action hint text updates dynamically based on current app state
- Full-list re-render on completion to restore remove-file button states

#### 📦 Distribution
- Windows installer script (`setup.iss`) via **Inno Setup**
  - Packages `.exe`, `resources.neu`, and entire `tools/` folder
  - Desktop shortcut, Start Menu shortcut, optional Taskbar pin
  - Registers to Windows Registry: `HKLM\Software\AwanDigitals\PDFPasswordRemover`
  - Auto-terminates running process on uninstall
  - Output: `PDF_Password_Remover_v26.4.14.exe`
- Cross-platform binaries: Windows x64, Linux x64/arm64/armhf, macOS x64/arm64/universal
- Marketing landing page (`landing-pages/index.html`) — static English-language page with feature highlights and download CTA
- `publish_itchio_guide.md` — guide for distributing the app on itch.io
