#include-once
#include <MyUDFs\Nssm.au3>


#pragma compile(FileDescription, 'Manage Windows Service configuration')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppServ.au3'


$ext = 'appserv'


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================








$appFile = 'd:\Develop\Projects\FileApp\Mounter\TrueApps\ALL.appserv'
cmdshell($ext, $appFile, True, False)


#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

appServ($file, $clean)

EndFunc   ;==>app





