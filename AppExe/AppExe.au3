#include-once
#RequireAdmin
#include <GUIConstantsEx.au3>

#include <MyUDFs\Es2.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>

#include <MyUDFs\FileType.au3>
#include <String.au3>


Global $UDFName = 'AppExe.au3'


$type = 'appexe'

#pragma compile(FileDescription, 'Execute Apps in the folder by provided list of extensions')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================




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





