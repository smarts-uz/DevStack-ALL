#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'File associations for provided list of extensions')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'appAssoc.au3'



$type = 'appassoc'





$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Portable\ALL.appassoc'
cmdshell($type, $appFile, True, True)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
appAssoc($file, $clean)
EndFunc   ;==>app
