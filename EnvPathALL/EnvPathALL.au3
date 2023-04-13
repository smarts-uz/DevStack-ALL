#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\ShellAll.au3>
#include <MyUDFs\Es2.au3>

#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>

#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>

#include <MyUDFs\FileAssociation.au3>
#include <String.au3>


#pragma compile(FileDescription, 'Add list of folders to Path environment variable by creating different EnvVars. Machine Level')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')



Global $UDFName = 'EnvPathALL.au3'

$ext = 'envpathall'


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================






$appFile = 'd:\Develop\Projects\ALL\LockHunter\Portable\ALL.envpathall'
$appFile = 'd:\Develop\Projects\ALL\CmdApp\Develop\ALL.envpathall'
cmdshell($ext, $appFile, False, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    If Not FileExists($file) Then Return _LogBox($file & ' not exists!')

    $parentFolder = _FZ_Name($file, $fzParentDir)

    If FileGetSize($file) = 0 Then
        _Log('FileGetSize($file) = 0')
        runs($file, $clean)
        Return False
    EndIf

    _FileReadToArray($file, $paths)
    ; _ArrayDisplay($paths)



    _Log('paths')

    If Not IsArray($paths) Then
        Mbox('_FileReadToArray($file, $paths)')
        Exit
    EndIf

    _ArrayDelete($paths, 0)

    $title = 'Path_' & $paths[0]
    _ArrayDelete($paths, 0)


    For $path In $paths
        _Log('Processing Name: ' & $path)

        $pathFull = hybridPath($path, $parentFolder)
        envToPath($title, $pathFull, True)
    Next


    If Not isParentProcessSelf() And _Win_IsVisibleByPID() And @Compiled Then Sleep($sleepTime)
EndFunc   ;==>app
