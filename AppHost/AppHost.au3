#include <MyUDFs\AppDev.au3>



#pragma compile(FileDescription, 'Adding entries to Windows Hosts file')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppHost.au3'




$type = 'apphost'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================






$appFile = 'd:\Develop\Projects\ALL\AppHost\App.apphost'
cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

appHost($file, $clean)
EndFunc   ;==>app





