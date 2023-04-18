#include-once
#RequireAdmin
#include <GUIConstantsEx.au3>

#include <MyUDFs\Es2.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\MkLink.au3>
#include <MyUDFs\TC.au3>

#include <MyUDFs\FileType.au3>
#include <String.au3>


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





