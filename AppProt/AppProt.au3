#include <MyUDFs\AppDev.au3>




#pragma compile(FileDescription, 'Protocol handler registration for provided list')

#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppProt.au3'



$type = 'appprot'





$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Portable\ALL.appprot'
cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
appProt($file, $clean)

EndFunc   ;==>app





