#include <MyUDFs\AppDev.au3>


Global $UDFName = 'AppExe.au3'


$type = 'appexe'

#pragma compile(FileDescription, 'Execute Apps in the folder by provided list of extensions')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')




Global $exts


$appFile = 'd:\Develop\Projects\DevApp\Controls\Control Viewer\ALL.appexe'
$appFile = 'd:\Develop\Projects\Devops\Hyper-V\Uninstall-WindowsFeature\ALL.appexe'
$appFile = 'd:\Develop\Projects\DevApp\Versions\TortoiseGit\Installer\ALL.appexe'
$appFile = 'd:\Develop\Projects\Devops\Windows\Set-VMHost\ALL.appexe'
$appFile = 'd:\Develop\Projects\ALL\Rclone\Mounter\Installer\ALL.appexe'
cmdshell($type, $appFile, False, False)



#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

appExe($file, $clean)

EndFunc   ;==>app





