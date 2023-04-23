#include <MyUDFs\AppDev.au3>


Global $UDFName = 'AppLink.au3'


$type = 'applink'

#pragma compile(FileDescription, 'Create Symlink or Hardlink from source to several destinations')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')




Global $paths


$appFile = 'd:\Humans\Company-IT\ALL.applink'
cmdshell($type, $appFile, True, False)



#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

	appLink($file, $clean)

EndFunc   ;==>app





