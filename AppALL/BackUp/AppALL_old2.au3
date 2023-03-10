#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\ShellAll.au3>
#include <MyUDFs\Config.au3>
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
Global $exts

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
$appFile = 'd:\Develop\Projects\ALL\LockHunter\Portable\ALL.appall'
$appFile = 'd:\Develop\Projects\ALL\AppALL\Testing\ALL.appall'

cmdshell($ext, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    If Not FileExists($file) Then Return ExitBox($file & ' not exists!')

    _Log($file, 'file')
    _Log($clean, 'clean')

    Local $noWait

    $parentFolder = _FZ_Name($file, $eFZN_ParentDir)

    If FileGetSize($file) = 0 Then
        _Log('FileGetSize($file) = 0')
        runsLocal($file, $clean)
        Return False
    EndIf

    _FileReadToArray($file, $exts)
    ; _ArrayDisplay($exts)

    _Log($exts, 'exts')

    If Not IsArray($exts) Then
        Mbox('_FileReadToArray($file, $exts)')
        Exit
    EndIf

    _ArrayDelete($exts, 0)

    $cmd = ''
    If $clean Then
        $cmd = '/clean'
    EndIf

    If Not executer($parentFolder, 'appall', True, @SW_SHOWDEFAULT, True, $file, $cmd) Then
        _Log('Appall unsuccessful! Trying to run other Extensions')
        
        For $ext In $exts

            executer($parentFolder, $ext, True, @SW_SHOWDEFAULT, True, $file, $cmd)
        Next
    Else
        _Log('Appall unsuccessful! Trying to run other Extensions')
    EndIf


    If Not isParentProcessSelf() And @Compiled Then
        Sleep($sleepTime)
    EndIf


EndFunc   ;==>app





#cs | FUNCTION | ============================================

	Name				run
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func runsLocal($file, $clean = False)

    Local $extsStr = 'appshell'
    Local $extsStr = 'envvarsall,envvars,envpathall,envpath,appassoc,appshell,appshellvar,appmany,appprot,appexe,appserv,apphost,appconf,applnk,autorun'

    Local $exts = StringSplit($extsStr, ',')
    _ArrayDelete($exts, 0)

    _Log($exts)

    $cmd = ''
    If $clean Then
        $cmd = '/clean'
    EndIf

    executer($parentFolder, 'appall', True, @SW_SHOWDEFAULT, True, $file, $cmd) 
	
        For $ext In $exts
            executer($parentFolder, $ext, True, @SW_SHOWDEFAULT, True, $file, $cmd)
        Next
 

    _Log('parentFolder')

EndFunc   ;==>runsLocal




