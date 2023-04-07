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


#pragma compile(FileDescription, 'Adding Executable Shell commands to Extension context menu')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppCmd.au3'

$ext = 'appcmd'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================



Global $cmdExec = @ScriptDir & '\ExeCMD.exe'


$appFile = 'd:\Develop\Projects\ALL\AppShell\Testing\App\ALL.appshell'
$appFile = 'd:\Develop\Projects\ALL\AppCmd\ALL.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\R-Drive Image\Portable\ALL.appcmd'
$appFile = 'd:\Develop\Projects\ALL\AppCmd\Test2.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\R-Drive Image\Portable\RDR.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\TeraByte Image\Portable\ALL.appcmd'
$appFile = 'd:\Develop\Projects\DevApp\Versions\Git Shell\ALL.appcmd'
cmdshell($ext, $appFile, True, False)









#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    If Not FileExists($file) Then Return _Box($file & ' not exists!')

    $parentFolder = _FZ_Name($file, $eFZN_ParentDir)

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

    $title = _FZ_PathClean($paths[0])
    _ArrayDelete($paths, 0)


    For $path In $paths
        _Log('Processing Path: ' & $path)

        $name = ''
        $windowIn = 'hide'
        $cmd = '"%1"'

        If StringInStr($path, '|') >= 1 Then

            _Log('If StringInStr($path, |) >= 1 Then')

            $aSplit = StringSplit($path, '|')
			
			_Log($aSplit, 'aSplit')
			
            $path = $aSplit[1]
            $name = $aSplit[2]

            If $aSplit[0] >= 3 Then
                $cmd = $aSplit[3]
                _Log($cmd, 'cmd ')
                $cmd = cmdParser($cmd, $parentFolder)
                _Log($cmd, 'cmd Parsed:')
            EndIf

            If $aSplit[0] >= 4 Then
                $windowIn = $aSplit[4]
            EndIf
            
        EndIf

        $app = hybridPath($path, $parentFolder)

        If $name = '' Then
            $name = _FZ_Name($app, $eFZN_FilenameNoExt)
        EndIf


        _Log('title: ' & $title)
        _Log('path: ' & $path)
        _Log('name: ' & $name)

        _Log('app: ' & $app)

        $cmdFull = $app & '|' & $cmd & '|' & $windowIn

        _Log('cmdFull: ' & $cmdFull)

        Switch $title
            Case '*', 'Unknown', 'Folder', 'Directory', 'Drive', 'AllFileSystemObjects','AllFileSystemEditObjects'

                _Log('Started: Folder | Directory | Drive | *')

                If Not $clean Then

                    If _ShellAll_Install ($title, $name, $name, $cmdExec, $cmdFull, $app) Then
                        _Log('Success in _ShellAll Install command for ' & $title)
                    Else
                        _Log('ERROR in _ShellAll Install command for ' & $title)
                    EndIf
                Else
                    If _ShellAll_Uninstall ($title, $name) Then
                        _Log('Success in _ShellAll Uninstall command for ' & $title)
                    Else
                        _Log('ERROR in _ShellAll Uninstall command for ' & $title)
                    EndIf

                EndIf

            Case Else

                _Log('Started: Else')

                If Not $clean Then
                    If FileType_Add($title, $name, $cmdExec, $cmdFull, $app) Then
                        _Log('FileType Add Success for ' & $title)
                    Else
                        _Log('FileType Add ERROR for ' & $title)
                    EndIf
                Else

                    If FileType_RemoveMenu($title, $name) Then
                        _Log('FileType RemoveMenu Success for ' & $title)
                    Else
                        _Log('FileType RemoveMenu ERROR for ' & $title)
                    EndIf


                EndIf

        EndSwitch


    Next


    If Not isParentProcessSelf() And @Compiled Then
        Sleep($sleepTime)
    EndIf

EndFunc   ;==>app
