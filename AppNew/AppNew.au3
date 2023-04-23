#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'NEW file management for given file type')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppNew.au3'



$type = 'appnew'





$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Portable\ALL.appassoc'
cmdshell($type, $appFile, True, True)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
appNew($file, $clean)
EndFunc   ;==>app
