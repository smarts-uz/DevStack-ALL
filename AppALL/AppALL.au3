#include <MyUDFs\AppDev.au3>

#pragma compile(FileDescription, 'Import & SET exported App configurations')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'appALL.au3'

$type = 'appall'
Global $exts





$appFile = 'd:\Develop\Projects\ALL\AppShell\Testing\ALL.appall'
$appFile = 'd:\Develop\Projects\ALL\LockHunter\Portable\ALL.appall'
$appFile = 'd:\Develop\Projects\ALL\appALL\Testing\ALL.appall'
$appFile = 'd:\Develop\Projects\ALL\appALL\Testing\1\11\111\ALL.appall'
$appFile = 'd:\Develop\Projects\DevApp\IDEApp\JB-Rider\ALL.appall'

cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

appALL($file, $clean)
EndFunc   ;==>app




