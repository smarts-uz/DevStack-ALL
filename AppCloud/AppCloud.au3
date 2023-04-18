#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'Cloud file providers manager')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppCloud.au3'

$type = 'appcloud'


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================



$appFile = 'd:\Develop\Projects\ALL\AppCloud\SMM-App\App.appcloud'
$appFile = 'd:\Develop\Projects\ALL\AppCloud\App\SMM.appcloud'
cmdshell($type, $appFile, True, False, False)


#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

appCloud($file, $clean)

EndFunc   ;==>app





