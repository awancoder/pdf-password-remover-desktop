# PDF Password Remover

A lightweight desktop application built with **NeutralinoJS** to remove passwords from encrypted PDF files. It supports batch processing, allowing you to process multiple files at once with a single password input.

## 🚀 Features

- **Batch Processing**: Remove passwords from multiple PDF files sequentially using a single password.
- **Easy File Selection**: Native file picker with multi-select and visual drag & drop feedback.
- **Direct Output**: Automatically saves the unprotected files in the same directory as the source with a `_unprotected.pdf` suffix.
- **Real-time Status Tracking**: Live progress and status indicators for each file.
- **Secure**: Processes files locally on your machine using the trusted `qpdf` engine—no internet required.
- **Lightweight**: Minimal resource usage compared to Electron-based apps.

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Modern Dark Theme).
- **Backend Framework**: [NeutralinoJS](https://neutralino.js.org/) — a lightweight portable desktop application framework.
- **Engine**: [qpdf](https://github.com/qpdf/qpdf) — a powerful command-line tool for PDF transformation.
How It Works

The application follows a simple workflow:

1.  **File Selection**: User selects one or more PDF files via native file dialog or drag & drop visual feedback.
2.  **Password Input**: Enter the password used to encrypt the PDF(s). Leave empty if the PDF has no password requirement.
3.  **Sequential Processing**: When "Remove Password" is clicked, the app processes each file one-by-one:
    - For each selected PDF, it calls the bundled `qpdf.exe` with the command:  
      ```bash
      qpdf --password="YOUR_PASSWORD" --decrypt input.pdf input_unprotected.pdf
      ```
    - Unprotected file is saved to the same directory with `_unprotected.pdf` suffix.
    - Real-time status updates show success or error for each file.
4.  **Native Integration**: Uses NeutralinoJS native API to access the filesystem and execute external processeqpdf.exe` located in the `tools/` directory.
4.  **File Management**: Uses the `filesystem` and `os` native modules to determine file paths and execute decryption commands.

## 📂 Project Structure

```text
pdf-password-remover/
├── resources/          # Frontend assets
│   ├── index.html      # Main UI structure
│   ├── styles.css      # Dark theme styles (Inter font)
│   ├── js/
│   │   ├── main.js     # Core application logic & file processing
│   │   ├── neutralino.js   # NeutralinoJS runtime library
│   │   └── neutralino.d.ts # TypeScript definitions
│   └── icons/          # Application icons
├── tools/              # Bundled qpdf binaries (must stay with binary)
│   ├── qpdf.exe
│   └── *.dll           # Required runtime libraries
├── neutralino.config.json # NeutralinoJS app configuration
└── README.md
```

## ⚙️ Technical Details

### Password Removal Process
- Uses `qpdf --decrypt` command to remove PDF password protection
- Supports PDFs encrypted with standard PDF encryption (passwords protected with various algorithms)
- Output filename format: `{original_name}_unprotected.pdf`
- **Sequential Processing**: Files are processed one-by-one (not in parallel)

### Limitations & Notes
- **Sequential Batch**: Large batches may take time since files are processed sequentially
- **Password Requirement**: Password input is required; if incorrect, processing fails for that file
- **No Encryption Strength Check**: Works with simple and complex PDF encryption
- **Windows Primary**: While NeutralinoJS supports cross-platform builds, this distribution focuses on Windows
- **Bundled Dependency**: `qpdf.exe` and runtime DLLs must remain in the `tools/` folder for the application to function

## 🏃 How to Run

### Prerequisites

- [Neutralinojs CLI](https://neutralino.js.org/docs/cli/nea-usage) installed globally:
  ```bash
  npm install -g @neutralinojs/neu
  ```

### Steps to Run

1.  **Clone the repository** (if not already done).
2.  **Navigate to the project directory**:
    ```bash
    cd pdf-password-remover
    ```
3.  **Ensure `qpdf` is present**:
    Make sure the `tools/` folder contains `qpdf.exe` and the necessary DLL files.
4.  **Run the application**:
    ```bash
    neu run
    ```

## 📦 Building and Distribution

To compile the application into a standalone executable that can be shared with others, follow these steps:

### 1. Build the Application
Run the following command in your terminal:
```bash
neu build
```
This will create a `dist/` folder containing the application binaries for Windows, Linux, and macOS, along with a `resources.neu` file.

### 2. Prepare for Distribution (Windows)
To share the Windows version, go to `dist/pdf-password-remover/` and follow these structural requirements:

**Important:** You must copy the `tools/` folder from the root of your project into the same folder as the `.exe`. The application **cannot function without qpdf.exe**.

Your distribution folder should look like this:
```text
pdf-password-remover-win_x64.exe
resources.neu
tools/                <-- Copy this folder manually
   ├── qpdf.exe
   └── *.dll
```

### 3. Create a Portable Archive
Zip the contents of the distribution folder (including the `tools/` directory). Users can then extract and run the `.exe` without needing to install anything else.

> [!NOTE]
> Windows 10/11 includes WebView2 runtime natively, so most users won't need additional setup.

> [!TIP]
> Before building for production, set `"enableInspector": false` in `neutralino.config.json` to disable the developer console and improve security.

## ❓ Troubleshooting & FAQ

### "qpdf.exe not found" Error
- **Cause**: The `tools/` folder is missing or the `.exe` is in the wrong location
- **Solution**: Ensure `qpdf.exe` and DLL files are in the `tools/` subfolder next to the application `.exe`

### Processing Failed / "Incorrect password"
- **Cause**: Password entered is incorrect or the PDF file is not password-protected
- **Solution**: Verify the password is correct. For PDFs without password protection, leave the password field empty

### Large Batch Takes Long Time
- **Cause**: Files are processed sequentially (one by one), not in parallel
- **Solution**: This is expected behavior. For 100+ files, processing may take several minutes depending on file sizes

### Output File Not Created
- **Cause**: Processing failed (check error message) or PDF might be corrupt
- **Solution**: Verify the PDF is valid using qpdf directly: `qpdf --check input.pdf`

### Special Characters in Password Not Working
- **Cause**: Complex passwords with special characters may need escaping
- **Solution**: Ensure the password doesn't contain double-quotes (`"`) or backslashes (`\`)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
