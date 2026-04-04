; ============================================================
; KUSTOMISASI DI SINI
; ============================================================
#define MyAppName "PDF Password Remover"           ; Nama Aplikasi
#define MyAppVersion "26.3.4"                  ; Versi
#define MyAppPublisher "Awan Digitals"          ; Nama Kamu/Perusahaan
#define MyAppExeName "PDFPasswordRemover.exe"      ; Nama file .exe saat terinstall
#define MyIconFile "resources\icons\appIcon.ico" ; Path ke file .ico kamu

[Setup]
AppId={{D4B1C5E2-F3A1-4EBA-B2C4-A6D5C7C1B2E3}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL=https://www.awandigitals.com
VersionInfoCompany={#MyAppPublisher}
VersionInfoDescription={#MyAppName} Setup
VersionInfoTextVersion={#MyAppVersion}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName=Productivity
AllowNoIcons=yes
; Nama file setup yang dihasilkan
OutputBaseFilename=PDF_Password_Remover_v{#MyAppVersion}
; Ikon untuk file Setup.exe itu sendiri
SetupIconFile={#MyIconFile}
Compression=lzma
SolidCompression=yes
WizardStyle=modern
UninstallDisplayIcon={app}\appIcon.ico

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"
Name: "startmenuicon"; Description: "Create a &Start Menu shortcut"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
; File utama
Source: "dist\PDFPasswordRemover\PDFPasswordRemover-win_x64.exe"; DestDir: "{app}"; DestName: "{#MyAppExeName}"; Flags: ignoreversion
Source: "dist\PDFPasswordRemover\resources.neu"; DestDir: "{app}"; Flags: ignoreversion
Source: "tools\*"; DestDir: "{app}\tools"; Flags: ignoreversion recursesubdirs createallsubdirs
; Copy file ikon ke folder instalasi agar bisa dipakai shortcut
Source: "{#MyIconFile}"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\appIcon.ico"; Tasks: startmenuicon; AppUserModelID: "AwanDigitals.PDFPasswordRemover"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\appIcon.ico"; Tasks: desktopicon; AppUserModelID: "AwanDigitals.PDFPasswordRemover"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
