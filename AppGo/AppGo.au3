#include <MyUDFs\AppDev.au3>


Global $UDFName = 'AppGo.au3'


$type = 'appgo'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================



$appFile = 'd:\Develop\IDEApps\WebIDE\Sources Microsoft Vscode Develop.appgo'

cmdshell($type, $appFile, False, False)




#cs | FUNCTION | ============================================

	Name				app
	Desc

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/8/2023

#ce	=========================================================

Func app($filePath, $clean = False)

appGo($filePath, $clean)

EndFunc   ;==>app




