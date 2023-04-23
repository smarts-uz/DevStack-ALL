#include <MyUDFs\AppDev.au3>




#pragma compile(FileDescription, 'Add list of folders to Path environment variable by creating different EnvVars')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')



Global $UDFName = 'EnvPath.au3'

$type = 'envpath'






$appFile = 'd:\Develop\Projects\ALL\LockHunter\Portable\ALL.envpath'
cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

envPath($file, $clean)
EndFunc   ;==>app
