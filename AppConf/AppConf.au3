#include-once
#include <GUIConstantsEx.au3>

#include <MyUDFs\Es2.au3>
#include <MyUDFs\TC.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\Settings.au3>
#include <MyUDFs\FileType.au3>
#include <String.au3>


#pragma compile(FileDescription, 'Import & SET exported App configurations')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppConf.au3'


$type = 'appconf'


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================


$appFile = 'd:\Develop\Projects\DevApp\Versions\PhraseExpander\Settings\ALL.appconf'
$appFile = 'd:\FSystem\ALL\Security\Protects\Navicat Premium\Settings\ALL.appconf'
$appFile = 'd:\FSystem\ALL\Humans\Message\iMe\Settings\ALL.appconf'
$appFile = 'd:\Develop\Projects\NetApp\Browsers\Chrome Browser\Settings\Vivaldi\ALL.appconf'
$appFile = 'd:\Develop\Projects\DevApp\Controls\WorkPace\Settings\ALL.appconf'
$appFile = 'd:\Develop\Projects\FileApp\Archiver\WinRAR\Settings\ALL.appconf'
cmdshell($type, $appFile, False, False)



#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

appConf($file, $clean)

EndFunc   ;==>app
