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


If $CmdLineRaw = '' Then ExitBox('CmdLine is null', True)

$parts = StringSplit($CmdLineRaw, '|')
If Not IsArray($parts) Then ExitBox('parts is Not Array', True)
If Not $parts[0] = 2 Then ExitBox('Parts Not $parts[0] = 2', True)

	$app = $parts[1]
				$cmd = $parts[2]
				_Log($cmd, 'cmd')
				
				$cmdParse = cmdParser($cmd, @WorkingDir)
				_Log($cmdParse, 'cmdParse')
				
				$cmdFull = '"' & $app & '" ' & $cmdParse
Mbox($cmd)
CmdRead($cmd)


If Not isParentProcessSelf() And @Compiled Then
    Sleep($sleepTime)
EndIf
