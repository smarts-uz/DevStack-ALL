#include-once
#include <GUIConstantsEx.au3>


#include <MyUDFs\Es2.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Lnk.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <String.au3>
#include <MyUDFs\Config.au3>


#pragma compile(FileDescription, 'Adding Executable Shell commands to Extension context menu')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppCmd.au3'

$type = 'appcmd'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================






$appFile = 'd:\Develop\Projects\ALL\AppShell\Testing\App\ALL.appshell'
$appFile = 'd:\Develop\Projects\ALL\AppCmd\ALL.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\R-Drive Image\Portable\ALL.appcmd'
$appFile = 'd:\Develop\Projects\ALL\AppCmd\Test2.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\R-Drive Image\Portable\RDR.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\TeraByte Image\Portable\ALL.appcmd'
$appFile = 'd:\Develop\Projects\DevApp\Versions\Git Shell\ALL.appcmd'
cmdshell($type, $appFile, True, False)









#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

 appCmd($file, $clean)

EndFunc   ;==>app
