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


; $data = Inbox('', $CmdLineRaw)
; Exit

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================

Global $window = @SW_SHOWDEFAULT

If $CmdLine[0] > 0 Then

    $parts = StringSplit($CmdLineRaw, '|')
    If Not IsArray($parts) Then _LogBox('parts is Not Array', True)
    If Not $parts[0] = 2 Then _LogBox('Parts Not $parts[0] = 2', True)

    $app = $parts[1]
    $cmd = $parts[2]

    If $parts[0] = 3 Then
        $windowIn = $parts[3]
        Switch $windowIn
            Case 'min'
                $window = @SW_MINIMIZE

            Case 'max'
                $window = @SW_MAXIMIZE

            Case 'def'
                $window = @SW_SHOWDEFAULT

            Case 'norm'
                $window = @SW_SHOWDEFAULT

            Case 'hide'
                $window = @SW_HIDE
				
			

        EndSwitch

    EndIf

Else
    
    $app = ''
    $cmd =  _FZ_FileRead('d:\Develop\Projects\ALL\AppCmd\Testing\App.test')
	
EndIf

    _Log($app, 'app')
    _Log($cmd, 'cmd')
    _Log($window, 'window')

$cmdParse = cmdParser($cmd, @WorkingDir, True)
_Log($cmdParse, 'cmdParse')

; $debug = _FZ_FileRead(@ScriptDir & '\debug.txt')

$cmdFull = $app & ' ' & $cmdParse
_Log($cmdFull, 'cmdFull')

; If Int($debug) = 1 Then
;     Inbox('CmdLine', $cmdFull)
; EndIf

If MboxQ ($cmdFull, 'Confirm Execute') Then
    ; CmdRead($cmdFull, $window)
	; _Log($cmdFull, 'cmdFull')
    $PID = ShellExecute($app, $cmdParse, '', '', $window)
	_Log($PID, 'PID')
	
EndIf

If Not isParentProcessSelf() And @Compiled Then
    Sleep($sleepTime)
EndIf
