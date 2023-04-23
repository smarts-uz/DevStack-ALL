chcp 65001

START /min /wait "%cd%\AutoRun\Executer.exe"

START /min /wait "%cd%\EnvPath\EnvPath.exe" "%cd%\AppCloud\ALL.envpath"
START /min /wait "%cd%\EnvPathALL\EnvPathALL.exe" "%cd%\AppCloud\ALL.envpathall"

START /min /wait "%cd%\EnvPath\EnvPath.exe" "%cd%\CloudApp\ALL.envpath"
START /min /wait "%cd%\EnvPathALL\EnvPathALL.exe" "%cd%\CloudApp\ALL.envpathall"

START /min /wait "%cd%\AppExe\AppExe.exe" "%cd%\ExeCloud\ALL.appexe"
START /min /wait "%cd%\AppExe\AppExe.exe" "%cd%\ExeConf\ALL.appexe"
START /min /wait "%cd%\AppExe\AppExe.exe" "%cd%\ExeEFU\ALL.appexe"
START /min /wait "%cd%\AppExe\AppExe.exe" "%cd%\ExeServ\ALL.appexe"

START /min /wait "%cd%\AppALL\AppALL.exe" "%cd%\CmdApp\ALL.appall"

START /min /wait "%cd%\AppALL\AppALL.exe" "%cd%\FreeFileSync\ALL.appall"
START /min /wait "%cd%\AppALL\AppALL.exe" "%cd%\LockHunter\ALL.appall"
START /min /wait "%cd%\AppALL\AppALL.exe" "%cd%\NSSMs\ALL.appall"
START /min /wait "%cd%\AppALL\AppALL.exe" "%cd%\PowerShell\ALL.appall"
START /min /wait "%cd%\AppALL\AppALL.exe" "%cd%\Rclone\ALL.appall"
START /min /wait "%cd%\AppALL\AppALL.exe" "%cd%\Syncovery\ALL.appall"
START /min /wait "%cd%\AppALL\AppALL.exe" "%cd%\TotalCN\ALL.appall"

%cd%\TotalCN\Portable\TotalCMD.exe