// ============================================================
//  PDF Password Remover - Main JS
//  NeutralinoJS App
// ============================================================

// Initialize Neutralino immediately
Neutralino.init();

// Global error tracking for production debugging
window.onerror = (msg, url, line) => {
  console.error(`Error: ${msg} \nAt: ${url}:${line}`);
};

// --- State ---
let selectedFiles = [];
let isProcessing = false;

// --- DOM Elements ---
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const btnBrowse = document.getElementById('btnBrowse');
const btnAddMore = document.getElementById('btnAddMore');
const fileListSection = document.getElementById('fileListSection');
const fileList = document.getElementById('fileList');
const fileCountBadge = document.getElementById('fileCountBadge');
const btnClearAll = document.getElementById('btnClearAll');
const passwordInput = document.getElementById('passwordInput');
const btnTogglePassword = document.getElementById('btnTogglePassword');
const btnRemovePassword = document.getElementById('btnRemovePassword');
const actionHint = document.getElementById('actionHint');
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toastIcon');
const toastMessage = document.getElementById('toastMessage');

// ============================================================
//  HELP / ABOUT WINDOW
// ============================================================

const btnHelp = document.getElementById('btnHelp');

if (btnHelp) {
  btnHelp.addEventListener('click', async () => {
    console.log('[Main] Help button clicked, opening About window...');
    try {
      await Neutralino.window.create('/about/', {
        title:           'About PDF Password Remover',
        width:           420,
        height:          570,
        minWidth:        400,
        minHeight:       540,
        center:          true,
        resizable:       false,
        alwaysOnTop:     true,
        enableInspector: false,
        borderless:      false,
        maximize:        false,
        hidden:          false,
        exitProcessOnClose: false,
      });
      console.log('[Main] About window created successfully');
    } catch (err) {
      console.error('[Main] Cannot open About window:', err);
    }
  });
}

// ============================================================
//  DRAG & DROP (visual only — drag area klik buka dialog)
// ============================================================

document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

dropzone.addEventListener('dragenter', (e) => {
  e.preventDefault();
  if (!isProcessing) dropzone.classList.add('drag-active');
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (!isProcessing) dropzone.classList.add('drag-active');
});

dropzone.addEventListener('dragleave', (e) => {
  if (!dropzone.contains(e.relatedTarget)) {
    dropzone.classList.remove('drag-active');
  }
});

// Drop → buka dialog native (NeutralinoJS tidak bisa baca path dari drop event)
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('drag-active');
  if (!isProcessing) openFileDialog();
});

// Klik area dropzone → buka dialog
dropzone.addEventListener('click', (e) => {
  if (e.target === btnBrowse || btnBrowse.contains(e.target)) return;
  if (!isProcessing) openFileDialog();
});

btnBrowse.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!isProcessing) openFileDialog();
});

btnAddMore.addEventListener('click', () => {
  if (!isProcessing) openFileDialog();
});

// ============================================================
//  FUNGSI: Buka Dialog File Native (Neutralino)
// ============================================================

async function openFileDialog() {
  try {
    const result = await Neutralino.os.showOpenDialog('Select PDF Files', {
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
      multiSelections: true
    });

    if (result && result.length > 0) {
      addFilesByPath(result);
    }
  } catch (err) {
    console.error('Dialog error:', err);
    showToast('Failed to open file dialog.', 'error');
  }
}

// ============================================================
//  FUNGSI: Tambah File ke State berdasarkan Path
// ============================================================

function addFilesByPath(paths) {
  // Filter hanya .pdf
  const pdfPaths = paths.filter(p => p.toLowerCase().endsWith('.pdf'));

  if (pdfPaths.length === 0) {
    showToast('Only PDF files are supported!', 'error');
    return;
  }

  // Hindari duplikat berdasarkan path
  const newPaths = pdfPaths.filter(p =>
    !selectedFiles.some(existing => existing.path === p)
  );

  if (newPaths.length === 0) {
    showToast('File is already in the list.', 'info');
    return;
  }

  const fileObjects = newPaths.map(filePath => {
    const name = filePath.split('\\').pop().split('/').pop();
    return {
      id: generateId(),
      path: filePath,
      name: name,
      status: 'pending',
      message: ''
    };
  });

  selectedFiles = [...selectedFiles, ...fileObjects];
  renderFileList();
  updateUI();

  const skipped = pdfPaths.length - newPaths.length;
  if (skipped > 0) {
    showToast(`${newPaths.length} files added, ${skipped} already exist.`, 'info');
  } else {
    showToast(`${newPaths.length} files successfully added.`, 'success');
  }
}

// ============================================================
//  FUNGSI: Render Daftar File
// ============================================================

function renderFileList() {
  fileList.innerHTML = '';

  selectedFiles.forEach(fileObj => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.id = `file-item-${fileObj.id}`;

    item.innerHTML = `
      <div class="file-item-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M9 15h1.5a1.5 1.5 0 0 0 0-3H9v5m4-5h1.5a1 1 0 0 1 0 2H13"/>
        </svg>
      </div>
      <div class="file-item-info">
        <div class="file-item-name" title="${escapeHtml(fileObj.path)}">${escapeHtml(fileObj.name)}</div>
        <div class="file-item-size" id="path-${fileObj.id}">${escapeHtml(shortenPath(fileObj.path))}</div>
      </div>
      <div class="file-item-status status-${fileObj.status}" id="status-${fileObj.id}">
        ${getStatusHtml(fileObj)}
      </div>
      <button class="btn-remove-file" data-id="${fileObj.id}" title="Remove from list" aria-label="Remove ${escapeHtml(fileObj.name)}" ${isProcessing ? 'disabled' : ''}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    fileList.appendChild(item);
  });
}

// Event Delegation untuk tombol Remove File di dalam file list
fileList.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-remove-file');
  if (btn && !isProcessing) {
    e.preventDefault();
    e.stopPropagation();
    const id = btn.getAttribute('data-id');
    console.log(`[Main] Removing file with ID: ${id}`);
    removeFile(id);
  }
});

function getStatusHtml(fileObj) {
  switch (fileObj.status) {
    case 'pending':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg> Waiting`;
    case 'loading':
      return `<span class="spinner" style="width:14px;height:14px;border-width:2px;margin-right:4px;"></span> Processing...`;
    case 'success':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
          <polyline points="20 6 9 17 4 12"/>
        </svg> Done`;
    case 'error':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg> ${escapeHtml(fileObj.message || 'Failed')}`;
    default:
      return '';
  }
}

// Update status satu file di DOM (tanpa render ulang semua)
function updateFileStatus(fileObj) {
  const statusEl = document.getElementById(`status-${fileObj.id}`);
  if (statusEl) {
    statusEl.className = `file-item-status status-${fileObj.status}`;
    statusEl.innerHTML = getStatusHtml(fileObj);
  }
}

// ============================================================
//  FUNGSI: Hapus File dari Daftar
// ============================================================

function removeFile(id) {
  selectedFiles = selectedFiles.filter(f => f.id !== id);
  renderFileList();
  updateUI();
}

btnClearAll.addEventListener('click', () => {
  if (isProcessing) return;
  selectedFiles = [];
  renderFileList();
  updateUI();
  showToast('All files removed.', 'info');
});

// ============================================================
//  FUNGSI: Update Status UI Global
// ============================================================

function updateUI() {
  const hasFiles = selectedFiles.length > 0;

  fileListSection.style.display = hasFiles ? 'flex' : 'none';
  fileCountBadge.textContent = selectedFiles.length;

  if (isProcessing) {
    btnRemovePassword.disabled = true;
    actionHint.textContent = 'Processing files...';
    actionHint.style.color = 'var(--accent)';
  } else if (hasFiles) {
    btnRemovePassword.disabled = false;
    actionHint.textContent = `${selectedFiles.length} files ready to process`;
    actionHint.style.color = 'var(--accent)';
  } else {
    btnRemovePassword.disabled = true;
    actionHint.textContent = 'Select PDF files first';
    actionHint.style.color = 'var(--text-muted)';
  }
}

// ============================================================
//  TOGGLE SHOW/HIDE PASSWORD
// ============================================================

btnTogglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  btnTogglePassword.querySelector('.eye-icon').style.display = isPassword ? 'none' : 'block';
  btnTogglePassword.querySelector('.eye-off-icon').style.display = isPassword ? 'block' : 'none';
});

// ============================================================
//  INTI: Remove Password via qpdf
// ============================================================

btnRemovePassword.addEventListener('click', async () => {
  if (selectedFiles.length === 0 || isProcessing) return;
  await removePasswords();
});

async function removePasswords() {
  const password = passwordInput.value;

  // Tentukan path qpdf.exe — NL_PATH = direktori binary app
  const sep = NL_OS === 'Windows' ? '\\' : '/';
  const qpdfExe = NL_OS === 'Windows' ? 'qpdf.exe' : 'qpdf';
  const qpdfPath = `${NL_PATH}${sep}tools${sep}${qpdfExe}`;

  // Cek apakah qpdf tersedia
  try {
    const check = await Neutralino.os.execCommand(`"${qpdfPath}" --version`);
    if (check.exitCode !== 0) throw new Error('not found');
  } catch {
    showToast('qpdf.exe not found in tools/ folder. Read README.', 'error');
    return;
  }

  // Set state processing
  isProcessing = true;
  setButtonLoading(true);

  // Reset semua status ke pending
  selectedFiles.forEach(f => { f.status = 'pending'; f.message = ''; });
  renderFileList();

  let successCount = 0;
  let errorCount = 0;

  for (const fileObj of selectedFiles) {
    // Ubah status ke loading
    fileObj.status = 'loading';
    updateFileStatus(fileObj);

    try {
      // Tentukan path output: direktori yang sama, nama + _unlock.pdf
      const lastSep = Math.max(fileObj.path.lastIndexOf('\\'), fileObj.path.lastIndexOf('/'));
      const dir = fileObj.path.substring(0, lastSep);
      const baseName = fileObj.name.replace(/\.pdf$/i, '');
      const outPath = `${dir}${sep}${baseName}_unprotected.pdf`;

      // Bangun command qpdf
      // --password="" = PDF tanpa password (kosong), qpdf tetap bisa proses
      const cmd = buildQpdfCommand(qpdfPath, password, fileObj.path, outPath);

      const result = await Neutralino.os.execCommand(cmd);

      // qpdf exit code 0: Success, 3: Warning (but successfully processed)
      if (result.exitCode === 0 || result.exitCode === 3) {
        fileObj.status = 'success';
        fileObj.message = result.exitCode === 3 ? 'Done (with warnings)' : '';
        successCount++;
      } else {
        const rawError = result.stdErr || result.stdOut || 'Unknown error';
        console.warn(`[qpdf error] ${fileObj.name}:\nExit Code: ${result.exitCode}\n${rawError}`);
        fileObj.status = 'error';
        fileObj.message = parseQpdfError(rawError);
        errorCount++;
      }
    } catch (err) {
      fileObj.status = 'error';
      fileObj.message = 'Failed to execute process';
      errorCount++;
      console.error('[qpdf execCommand error] Failed running binary:', err);
    }

    updateFileStatus(fileObj);
  }

  // Selesai
  isProcessing = false;
  setButtonLoading(false);
  renderFileList(); // Memperbarui UI list untuk melepaskan status 'disabled' pada tombol silang
  updateUI();

  // Tampilkan ringkasan
  if (errorCount === 0) {
    showToast(`✓ All ${successCount} files successfully processed!`, 'success');
  } else if (successCount === 0) {
    showToast(`✗ All files failed. Check your password.`, 'error');
  } else {
    showToast(`${successCount} successful, ${errorCount} failed.`, 'info');
  }
}

// Bangun perintah qpdf yang aman (handle spasi di path dengan tanda kutip)
function buildQpdfCommand(qpdfPath, password, inputPath, outputPath) {
  // Escape tanda kutip ganda dalam password jika ada
  const safePassword = password.replace(/"/g, '\\"');
  return `"${qpdfPath}" --password="${safePassword}" --decrypt "${inputPath}" "${outputPath}"`;
}

// Parse pesan error dari output qpdf yang relevan
function parseQpdfError(stderr) {
  if (!stderr) return 'Incorrect password or invalid file';

  const lower = stderr.toLowerCase();
  if (lower.includes('invalid password') || lower.includes('password incorrect')) {
    return 'Incorrect password';
  }
  if (lower.includes('not encrypted') || lower.includes('no password')) {
    return 'File has no password';
  }
  if (lower.includes('not a pdf') || lower.includes('not a valid pdf')) {
    return 'File is not a valid PDF';
  }
  if (lower.includes('corrupt') || lower.includes('damaged')) {
    return 'Corrupt PDF file';
  }
  // Fallback: potong pesan error maksimal 40 karakter
  return stderr.length > 40 ? stderr.substring(0, 40) + '...' : stderr;
}

// ============================================================
//  HELPER: Set Loading State pada Tombol
// ============================================================

function setButtonLoading(isLoading) {
  const inner = btnRemovePassword.querySelector('.btn-remove-inner');
  const loading = btnRemovePassword.querySelector('.btn-loading');
  inner.style.display = isLoading ? 'none' : 'flex';
  loading.style.display = isLoading ? 'flex' : 'none';
}

// ============================================================
//  TOAST NOTIFICATION
// ============================================================

let toastTimer = null;

function showToast(message, type = 'info') {
  if (toastTimer) clearTimeout(toastTimer);

  toastMessage.textContent = message;
  toast.className = `toast ${type}`;

  const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ff4d6d" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  };
  toastIcon.innerHTML = icons[type] || icons.info;

  requestAnimationFrame(() => toast.classList.add('show'));
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ============================================================
//  UTILITIES
// ============================================================

function shortenPath(fullPath) {
  // Tampilkan hanya direktori terakhir dan nama file
  const parts = fullPath.replace(/\\/g, '/').split('/');
  if (parts.length <= 2) return fullPath;
  return `.../${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}



// ============================================================
//  INIT UI
// ============================================================
updateUI();
