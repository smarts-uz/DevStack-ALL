#include-once
#include <GUIConstantsEx.au3>


#include <MyUDFs\Es2.au3>
#include <MyUDFs\TC.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\Lnk.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Nssm.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\Settings.au3>
#include <MyUDFs\RcloneUDF.au3>

#include <MyUDFs\FileType.au3>
#include <String.au3>


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





