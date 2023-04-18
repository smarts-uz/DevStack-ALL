#include <MyUDFs\AppDev.au3>


Global $UDFName = 'AppLink.au3'


$type = 'applink'

#pragma compile(FileDescription, 'Create Symlink or Hardlink from source to several destinations')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================




Global $paths


$appFile = 'd:\Humans\Company-IT\ALL.applink'
cmdshell($type, $appFile, False, False)



#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

appLink($file, $clean)

EndFunc   ;==>app





