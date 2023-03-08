#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\ShellAll.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <String.au3>


#pragma compile(FileDescription, 'Import & SET exported App configurations')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppALL.au3'


$ext = 'appall'


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================

Mbox($sleepTime)





$appFile = 'd:\Develop\Projects\ALL\FreeFileSync\ALL.appall'
$appFile = 'd:\Develop\Projects\DevApp\Controls\ALL.appall'
cmdshell($ext, $appFile, True)



#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    $parentFolder = _FZ_Name($file, $eFZN_ParentDir)
	
    If FileGetSize($file) = 0 Then
        _Log('FileGetSize($file) = 0')
        runs($file)
        Return False
    EndIf
	
EndFunc   ;==>app





#cs | FUNCTION | ============================================

	Name				run
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func runs($file, $clean = False)

	Local $extsStr = 'envvars,envpath,envuser,appassoc,appshell,appprot,appexe,apphost,appconf,applnk,autorun'
	Local $extsStr = 'appexe'

	Local $exts = StringSplit($extsStr, ',')
	_ArrayDelete($exts, 0)
	
	_Log($exts)

	$cmd = ''
	If $clean Then
	$cmd = '/clean'
	Endif
	
	
	For $ext In $exts
		executer($parentFolder, '*.' & $ext, True, @SW_SHOWDEFAULT, True, $file, $cmd)
	Next

    _Log('parentFolder')

EndFunc   ;==>runs



