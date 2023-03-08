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






$appFile = 'd:\Develop\Projects\ALL\AppShell\Testing\ALL.appall'
cmdshell($ext, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    If Not FileExists($file) Then Return ExitBox($file & ' not exists!')

    $parentFolder = _FZ_Name($file, $eFZN_ParentDir)

    runsLocal($file, $clean)
    Return False

EndFunc   ;==>app





#cs | FUNCTION | ============================================

	Name				run
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func runsLocal($file, $clean = False)

    Local $extsStr = 'appshell'
    Local $extsStr = 'envvarsall,envvars,envpathall,envpath,appassoc,appshell,appmany,appprot,appexe,appserv,apphost,appconf,applnk,autorun'
	
    Local $exts = StringSplit($extsStr, ',')
    _ArrayDelete($exts, 0)

    _Log($exts)

    $cmd = ''
    If $clean Then
        $cmd = '/clean'
    EndIf


    For $ext In $exts
        executer($parentFolder, '*.' & $ext, True, @SW_SHOWDEFAULT, True, $file, $cmd)
    Next

    _Log('parentFolder')

EndFunc   ;==>runsLocal



