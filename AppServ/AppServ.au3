#include <MyUDFs\AppDev.au3>

#pragma compile(FileDescription, 'Manage Windows Service configuration')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppServ.au3'


$type = 'appserv'








$appFile = 'd:\Develop\Projects\FileApp\Mounter\TrueApps\ALL.appserv'
cmdshell($type, $appFile, True, False)


#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

appServ($file, $clean)

EndFunc   ;==>app





