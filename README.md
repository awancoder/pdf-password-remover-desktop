# PDF Password Remover

A lightweight desktop application built with **NeutralinoJS** to remove passwords from encrypted PDF files. It supports batch processing, allowing you to process multiple files at once with a single password input.

## 🚀 Features

- **Batch Processing**: Remove passwords from multiple PDF files sequentially using a single password.
- **Easy File Selection**: Native file picker via Neutralino API with multi-select and visual drag & drop feedback.
- **Direct Output**: Automatically saves the unprotected files in the same directory as the source with a `_unprotected.pdf` suffix.
- **Real-time Status Tracking**: Live progress and status indicators for each file.
- **Interactive UI**: Includes file management (Add More, Clear All, Remove individual file), toast notifications for system feedback, and an About window.
- **Secure**: Processes files locally on your machine using the trusted `qpdf` engine—no internet required.
- **Lightweight**: Minimal resource usage compared to Electron-based apps.

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Modern Dark Theme). Typography powered by the Inter font.
- **Backend Framework**: [NeutralinoJS](https://neutralino.js.org/) — a lightweight portable desktop application framework.
- **Engine**: [qpdf](https://github.com/qpdf/qpdf) — a powerful command-line tool for PDF transformation.
- **Installer**: Inno Setup (`setup.iss`) for building a clean, native Windows installer.

## 💡 How It Works

The application follows a simple workflow:

1. **File Selection**: User selects one or more PDF files via the native file dialog or click-to-browse.
2. **Password Input**: Enter the password used to encrypt the PDF(s). Leave empty if the PDF has no password requirement string.
3. **Sequential Processing**: When "Remove Password" is clicked, the app processes each file one-by-one:
   - For each selected PDF, it calls the bundled `qpdf.exe` with the following command:
     ```bash
     qpdf --password="YOUR_PASSWORD" --decrypt "input.pdf" "input_unprotected.pdf"
     ```
   - The unprotected file is saved in the source directory.
   - Real-time status updates show success or error for each file within the list.
4. **Native Integration**: Uses NeutralinoJS's `os.execCommand` native module to execute the `qpdf.exe` binary bundled inside the `tools/` directory.

## 📂 Project Structure

```text
pdf-password-remover/
├── resources/              # Frontend assets (Neutralino UI)
│   ├── index.html          # Main UI structure
│   ├── styles.css          # Dark theme styles (Inter font)
│   ├── js/                 # Application logic & Neutralino client
│   ├── about/              # About window HTML/CSS
│   └── icons/              # Application and tray icons
├── tools/                  # Bundled qpdf binaries (Must stay alongside the executable)
│   ├── qpdf.exe
│   └── *.dll               # Visual C++ runtime libraries
├── bin/                    # Neutralino cross-platform framework binaries
├── landing-pages/          # Static English marketing website
├── neutralino.config.json  # NeutralinoJS app configuration
├── setup.iss               # Inno Setup Windows installer script
├── publish_itchio_guide.md # Guide for publishing to itch.io
├── CHANGELOG.md            # Version history
└── README.md
```

## ⚙️ Technical Details

### Password Removal Process
- Relies on the `qpdf --decrypt` command to rebuild PDF files without encryption.
- Supports PDFs encrypted with standard PDF encryption methods.
- **Sequential Processing**: To ensure stability, files are processed one at a time. The UI updates each file's status icon dynamically.

### Limitations & Notes
- **Sequential Batch**: Very large batches may take time since files are processed sequentially.
- **Password Requirement**: You must know the password. This is a remover, not a password cracker.
- **Bundled Dependency**: `qpdf.exe` and its runtime DLLs must remain in the `tools/` folder relatively placed to the main application executable.

## 🏃 How to Run Locally (Development)

### Prerequisites

- [Neutralinojs CLI](https://neutralino.js.org/docs/cli/nea-usage) installed globally:
  ```bash
  npm install -g @neutralinojs/neu
  ```

### Steps to Run

1. **Clone the repository**.
2. **Navigate to the project directory**:
   ```bash
   cd pdf-password-remover
   ```
3. **Verify the Engine**: Ensure the `tools/` folder contains `qpdf.exe` and the necessary `.dll` files.
4. **Run the application**:
   ```bash
   neu run
   ```

## 📦 Building and Distribution

To compile the application into a standalone executable that can be shared with others, follow these steps:

### 1. Build the Neutralino App
Run the following command in your terminal:
```bash
neu build
```
This creates a `dist/PDFPasswordRemover/` folder containing the application application binaries for Windows, Linux, and macOS, alongside a `resources.neu` file.

### 2. Prepare the Windows Build
In `dist/PDFPasswordRemover/`, the folder structure must look like this to run properly:
```text
PDFPasswordRemover-win_x64.exe
resources.neu
tools/                <-- You must copy this folder manually from the root
   ├── qpdf.exe
   └── *.dll
```

### 3. Create the Installer (Windows)
We provide an Inno Setup script (`setup.iss`) to compile a professional Windows installer.
1. Download and install [Inno Setup](https://jrsoftware.org/isinfo.php).
2. Open `setup.iss`.
3. Ensure the paths inside the `[Files]` section point correctly to your compiled files.
4. Click `Compile`.
5. The generated standalone installer (`PDF_Password_Remover_v26.4.17.exe`) will be output to the `Output/` folder.

> [!NOTE]
> Windows 10/11 includes the WebView2 component natively, so end users will only need to run the `.exe`.

> [!TIP]
> Always build for production with `"enableInspector": false` set inside your `neutralino.config.json` to disable the Chrome DevTools and protect your app experience.

## ❓ Troubleshooting & FAQ

### "qpdf.exe not found" Error
- **Cause**: The `tools/` folder is missing or incorrectly placed.
- **Solution**: Ensure the `tools/` folder containing `qpdf.exe` is placed directly beside the application `.exe`.

### Processing Failed / "Incorrect password"
- **Cause**: The entered password doesn't match the file, or the file is corrupted.
- **Solution**: Verify the password. If the file is not password-protected in the first place, leave the password field empty.

### Output File Not Created
- **Cause**: Processing failed (check error message) or the source PDF is broken.
- **Solution**: Review the in-app error feedback or try reading the PDF with another viewer to verify it is intact.

## 📄 License
This project is licensed under the [MIT License](LICENSE).
