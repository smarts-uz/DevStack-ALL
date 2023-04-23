#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'Cloud file providers manager')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppCloud.au3'

$type = 'appcloud'



$appFile = 'd:\Develop\Projects\ALL\AppCloud\SMM-App\App.appcloud'
$appFile = 'd:\Develop\Projects\ALL\AppCloud\App\SMM.appcloud'
$appFile = 'd:\FSystem\Hosting\ALL\Merges\Rclone\Projects\SMM.appcloud'
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





