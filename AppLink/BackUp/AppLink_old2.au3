#include-once
#RequireAdmin
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\MkLink.au3>

#include <MyUDFs\FileAssociation.au3>
#include <String.au3>


Global $UDFName = 'AppLink.au3'


$ext = 'applink'

#pragma compile(FileDescription, 'Create Symlink or Hardlink from source to several destinations')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================




Global $paths


$appFile = 'd:\Humans\Company-IT\ALL.applink'
cmdshell($ext, $appFile, False, False)



#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    If Not FileExists($file) Then Return _Box($file & ' not exists!')

    Local $noWait

    $parentFolder = _FZ_Name($file, $eFZN_ParentDir)

    If FileGetSize($file) = 0 Then
        _Log('FileGetSize($file) = 0')
        runs($file, $clean)
        Return False
    EndIf

    _FileReadToArray($file, $paths)
    ; _ArrayDisplay($paths)

    _Log($paths, 'paths')

    If Not IsArray($paths) Then
        Mbox('_FileReadToArray($file, $paths)')
        Exit
    EndIf

    _ArrayDelete($paths, 0)

    $fullPath = pathTitle($paths[0], $parentFolder)
    _Log('fullPath: ' & $fullPath)

    _ArrayDelete($paths, 0)

    For $path In $paths

        _Log($path, 'path: ')

        Local $dest = ''
        Local $type = ''

		$dest = $path
		
        If StringInStr($path, '|') >= 1 Then

            _Log('If StringInStr($path, |) >= 1 Then')

            $aSplit = StringSplit($path, '|')

            $dest = $aSplit[1]
            _Log($dest, 'dest Virgin: ')
			
            $dest = hybridPath($dest, $parentFolder)
            _Log($dest, 'dest hybridPath: ')


            If $aSplit[0] = 2 Then
                $type = $aSplit[2]
            EndIf
            

        EndIf
		
		  _Log($dest, 'dest: ')
		_Log($type, 'type: ')

        Switch True
            Case $type = 'H'
                _Log("$type = 'H'")
                If _FZ_Check($fullPath, $eFZC_IsDirectory) Then
                    $result = MK_Folder_Junction($fullPath, $dest)
                Else
                    $result = MK_File_Hardlink($fullPath, $dest)
                EndIf

            Case $type = 'S'
                _Log("$type = 'S'")
                If _FZ_Check($fullPath, $eFZC_IsDirectory) Then
                    $result = MK_Folder_Symlink($fullPath, $dest)
                Else
                    $result = MK_File_Symlink($fullPath, $dest)
                EndIf

            Case Else
                _Log("$type = Else")
                If _FZ_Check($fullPath, $eFZC_IsDirectory) Then
                    $result = MK_Folder_Junction($fullPath, $dest)
                Else
                    $result = MK_File_Symlink($fullPath, $dest)
                EndIf

        EndSwitch

        _Log($result, 'result')

    Next


    If Not isParentProcessSelf() And @Compiled Then
        Sleep($sleepTime)
    EndIf


EndFunc   ;==>app





