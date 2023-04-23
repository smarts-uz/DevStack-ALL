#include <MyUDFs\AppDev.au3>



#pragma compile(FileDescription, 'Create User Environment Variables not included in Path')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'EnvVarsALL.au3'



$type = 'envvarsall'





$appFile = 'd:\Develop\Projects\ALL\LockHunter\Portable\ALL.envpathall'
cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

	envVarsALL($file, $clean)

EndFunc   ;==>app
