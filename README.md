# PDF Password Remover

A lightweight, high-performance desktop application built with **NeutralinoJS** to remove passwords and restrictions from PDF files. It supports batch processing, allowing you to unlock multiple files at once with a single password input.

## 🚀 Features

- **Batch Processing**: Unlock multiple PDF files simultaneously.
- **Drag & Drop Interface**: Easy file selection via a modern, dark-themed UI.
- **Direct Output**: Automatically saves the unlocked files in the same directory as the source with a `_remove_password.pdf` suffix.
- **Secure**: Processes files locally on your machine using the trusted `qpdf` engine.
- **Lightweight**: Minimum resource usage compared to Electron-based apps.

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Modern Dark Theme).
- **Backend Framework**: [NeutralinoJS](https://neutralino.js.org/) — a lightweight portable desktop application framework.
- **Engine**: [qpdf](https://github.com/qpdf/qpdf) — a powerful command-line tool for PDF transformation.

## 🏗️ Architecture

The application follows a simple but effective architecture:

1.  **User Interface**: A web-based frontend managed by NeutralinoJS's built-in webserver.
2.  **Native Bridge**: JavaScript interacts with the operating system via the Neutralino native API.
3.  **CLI Integration**: When the user clicks "Remove Password", the app spawns a background process that calls the bundled `qpdf.exe` located in the `tools/` directory.
4.  **File Management**: Uses the `filesystem` and `os` native modules to determine file paths and execute decryption commands.

## 📂 Project Structure

```text
pdf-password-remover/
├── resources/          # Frontend assets
│   ├── index.html      # Main UI structure
│   ├── styles.css      # Premium dark theme styles
│   ├── js/             # Application logic
│   └── icons/          # App icons
├── tools/              # Bundled qpdf binaries (qpdf.exe & DLLs)
├── neutralino.config.json # App configuration
└── README.md           # Documentation
```

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

**Crucial Step:** You must copy the `tools/` folder from the root of your project into the same folder as the `.exe`.

Your distribution folder should look like this:
```text
pdf-password-remover-win_x64.exe
resources.neu
tools/                <-- Copy this folder manually
   ├── qpdf.exe
   └── *.dll
```

### 3. Create a Portable Archive
Zip the contents of that folder (including the `tools/` directory). Users can then extract and run the `.exe` without needing to install anything else (assuming they have the WebView2 runtime, which is standard on Windows 10/11).

> [!TIP]
> Before building for production, you might want to set `"enableInspector": false` in `neutralino.config.json` to disable the developer tools and remove the debug console errors.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
