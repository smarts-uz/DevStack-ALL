#include <MyUDFs\AppDev.au3>

#pragma compile(FileDescription, 'Sending multiple items to single instance of app via context menu')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppMany.au3'


$type = 'appmany'






$appFile = 'd:\Develop\Projects\DevApp\Versions\Araxis Merge\Portable\ALL.appmany'
cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
appMany($file, $clean)

EndFunc   ;==>app





