#include-once
#include <GUIConstantsEx.au3>


#include <MyUDFs\Config.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <String.au3>


#pragma compile(FileDescription, 'Import & SET exported App configurations')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppALL.au3'

$type = 'appall'
Global $exts

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================






$appFile = 'd:\Develop\Projects\ALL\AppShell\Testing\ALL.appall'
$appFile = 'd:\Develop\Projects\ALL\LockHunter\Portable\ALL.appall'
$appFile = 'd:\Develop\Projects\ALL\AppALL\Testing\ALL.appall'
$appFile = 'd:\Develop\Projects\ALL\AppALL\Testing\1\11\111\ALL.appall'
$appFile = 'd:\Develop\Projects\DevApp\IDEApp\JB-Rider\ALL.appall'

cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

AppALL($file, $clean)
EndFunc   ;==>app




