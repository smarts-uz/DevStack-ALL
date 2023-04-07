#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\ShellAll.au3>
#include <MyUDFs\Es2.au3>

#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Lnk.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <String.au3>
#include <MyUDFs\Config.au3>



#pragma compile(FileDescription, 'Executable Shell commands Executor')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'ExeCMD.au3'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================


If $CmdLineRaw = '' Then _Box('CmdLine is null', True)

$parts = StringSplit($CmdLineRaw, '|')
If Not IsArray($parts) Then _Box('parts is Not Array', True)
If Not $parts[0] = 2 Then _Box('Parts Not $parts[0] = 2', True)

$app = $parts[1]
_Log($app, 'app')

$cmd = $parts[2]
_Log($cmd, 'cmd')

If $parts[0] = 3 Then
    $windowIn = $parts[3]
    Switch $windowIn
        Case 'min'
            $window = @SW_MINIMIZE

        Case 'max'
            $window = @SW_MAXIMIZE

        Case 'def'
            $window = @SW_SHOWDEFAULT

        Case Else
            $window = @SW_HIDE

    EndSwitch
    
EndIf

$cmdParse = cmdParser($cmd, @WorkingDir, True)
_Log($cmdParse, 'cmdParse')

$cmdFull = '"' & $app & '" ' & $cmdParse
_Log($cmdFull, 'cmdFull')

$debug = _FZ_FileRead(@ScriptDir & '\debug.txt')

If Int($debug) = 1 Then
Inbox($cmdFull)
Endif
CmdRead($cmdFull, $window)

If Not isParentProcessSelf() And @Compiled Then
    Sleep($sleepTime)
EndIf
