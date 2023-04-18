#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'File associations for provided list of extensions')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppAssoc.au3'



$type = 'appassoc'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================






$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Portable\ALL.appassoc'
cmdshell($type, $appFile, True, True)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
AppAssoc($file, $clean)
EndFunc   ;==>app
