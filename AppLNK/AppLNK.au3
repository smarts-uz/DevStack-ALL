#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\ShellAll.au3>
#include <MyUDFs\Es2.au3>

#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>

#include <MyUDFs\Lnk.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\FileAssociation.au3>
#include <String.au3>
#include <MyUDFs\Config.au3>


#pragma compile(FileDescription, 'Create LNK shortcuts for provided list of apps')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppLnk.au3'


$ext = 'applnk'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================


$appFile = 'd:\Develop\Projects\FileApp\Searchs\Everything\Portable\ALL.applnk'

cmdshell($ext, $appFile, True, False)




#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    If Not FileExists($file) Then Return _LogBox($file & ' not exists!')

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
        $cmd = ''

        If StringInStr($path, '|') >= 1 Then

            _Log('If StringInStr($path, |) >= 1 Then')

            $aSplit = StringSplit($path, '|')
            $path = $aSplit[1]
            $name = $aSplit[2]

            If $aSplit[0] = 3 Then
                $cmd = $aSplit[3]
                $cmd = cmdParser($cmd, $parentFolder)
            EndIf
        EndIf

        $app = hybridPath($path, $parentFolder)
        $appName = _FZ_Name($app, $eFZN_FilenameNoExt)

        _Log('title: ' & $title)
        _Log('path: ' & $path)
        _Log('name: ' & $name)
        _Log('cmd: ' & $cmd)
        _Log('app: ' & $app)
        _Log('appName: ' & $appName)

        If Not $clean Then
            createLnk($title, $app, $name, False, $cmd)
        Else
            removeLnk($title, $app, $name, False)
        EndIf

    Next


    If Not isParentProcessSelf() And @Compiled Then
        Sleep($sleepTime)
    EndIf

EndFunc   ;==>app





