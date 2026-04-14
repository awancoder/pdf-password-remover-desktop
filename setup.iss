#define MyAppName      "PDF Password Remover"
#define MyAppVersion   "26.4.14"
#define MyAppPublisher "Awan Digitals"
#define MyAppExeName   "PDFPasswordRemover.exe"
#define MyIconFile     "resources\icons\appIcon.ico"

[Setup]
AppId={{D4B1C5E2-F3A1-4EBA-B2C4-A6D5C7C1B2E3}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL=https://www.awandigitals.com
AppSupportURL=https://www.awandigitals.com
AppUpdatesURL=https://www.awandigitals.com
VersionInfoCompany={#MyAppPublisher}
VersionInfoTextVersion={#MyAppVersion}
VersionInfoVersion={#MyAppVersion}
DefaultDirName={autopf}\{#MyAppName}
DisableDirPage=no
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=no
AllowNoIcons=yes
OutputBaseFilename=PDF_Password_Remover_v{#MyAppVersion}
SetupIconFile={#MyIconFile}
UninstallDisplayIcon={app}\appIcon.ico
UninstallDisplayName={#MyAppName} {#MyAppVersion}
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern
WizardSizePercent=120
MinVersion=10.0
PrivilegesRequired=admin
PrivilegesRequiredOverridesAllowed=commandline

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon";   Description: "{cm:CreateDesktopIcon}";        GroupDescription: "{cm:AdditionalIcons}"
Name: "startmenuicon"; Description: "Create a &Start Menu shortcut"; GroupDescription: "{cm:AdditionalIcons}"
Name: "quicklaunch";   Description: "Pin to &Taskbar";               GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "dist\PDFPasswordRemover\PDFPasswordRemover-win_x64.exe"; DestDir: "{app}"; DestName: "{#MyAppExeName}"; Flags: ignoreversion
Source: "dist\PDFPasswordRemover\resources.neu"; DestDir: "{app}"; Flags: ignoreversion
Source: "tools\*"; DestDir: "{app}\tools"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "{#MyIconFile}"; DestDir: "{app}"; Flags: ignoreversion

[Dirs]
Name: "{app}\tools"

[Icons]
Name: "{group}\{#MyAppName}";           Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\appIcon.ico"; Tasks: startmenuicon; AppUserModelID: "AwanDigitals.PDFPasswordRemover"
Name: "{group}\Uninstall {#MyAppName}"; Filename: "{uninstallexe}";        IconFilename: "{app}\appIcon.ico"; Tasks: startmenuicon
Name: "{autodesktop}\{#MyAppName}";     Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\appIcon.ico"; Tasks: desktopicon; AppUserModelID: "AwanDigitals.PDFPasswordRemover"

[Registry]
Root: HKLM; Subkey: "Software\AwanDigitals\PDFPasswordRemover"; ValueType: string; ValueName: "InstallPath"; ValueData: "{app}"; Flags: uninsdeletekey
Root: HKLM; Subkey: "Software\AwanDigitals\PDFPasswordRemover"; ValueType: string; ValueName: "Version";     ValueData: "{#MyAppVersion}"

[UninstallDelete]
Type: filesandordirs; Name: "{app}\tools"
Type: filesandordirs; Name: "{app}"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: "taskkill.exe"; Parameters: "/F /IM {#MyAppExeName}"; Flags: runhidden skipifdoesntexist
