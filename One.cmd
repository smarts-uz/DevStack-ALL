chcp 65001


START /min %cd%\CloudApp\CloudApp.exe
START /min %cd%\CloudApp\CloudFile.exe

ping -n 3 127.0.0.1 > nul

START /min /wait "%cd%\AppALL\AppALL.exe"
START /min /wait "%cd%\AppCloud\AppCloud.exe"
START /min /wait "%cd%\AppAsso\appAssoc.exe"
START /min /wait "%cd%\AppConf\AppConf.exe"
START /min /wait "%cd%\AppExe\AppExe.exe"
START /min /wait "%cd%\AppGo\AppGo.exe"
START /min /wait "%cd%\AppHost\AppHost.exe"
START /min /wait "%cd%\AppLink\AppLink.exe"
START /min /wait "%cd%\AppLNK\AppLNK.exe"
START /min /wait "%cd%\AppMany\AppMany.exe"
START /min /wait "%cd%\AppProt\AppProt.exe"
START /min /wait "%cd%\AppServ\AppServ.exe"
START /min /wait "%cd%\AppShell\AppShell.exe"
START /min /wait "%cd%\AutoRun\AutoRun.exe"

START /min /wait "%cd%\EnvPath\EnvPath.exe"
START /min /wait "%cd%\EnvPathALL\EnvPathALL.exe"
START /min /wait "%cd%\EnvVars\EnvVars.exe"
START /min /wait "%cd%\EnvVarsALL\EnvVarsALL.exe"
