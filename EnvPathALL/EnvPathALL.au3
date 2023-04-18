#include <MyUDFs\AppDev.au3>




#pragma compile(FileDescription, 'Add list of folders to Path environment variable by creating different EnvVars. Machine Level')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')



Global $UDFName = 'EnvPathALL.au3'

$type = 'envpathall'


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================






$appFile = 'd:\Develop\Projects\ALL\LockHunter\Portable\ALL.envpathall'
$appFile = 'd:\Develop\Projects\ALL\CmdApp\Develop\ALL.envpathall'
cmdshell($type, $appFile, False, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
envPathALL($file, $clean)
EndFunc   ;==>app
