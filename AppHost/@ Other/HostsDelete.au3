#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>

#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\Lnk.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\_HostFile.au3>
#include <MyUDFs\FileAssociation.au3>
#include <String.au3>

#pragma compile(FileDescription, 'Adding entries to Windows Hosts file')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'HostsDelete.au3'




$ext = 'hosts'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================









Switch $CmdLine[0]
    Case 1
        Local $file = $CmdLine[1]
        app($file)

        If Not isParentProcessSelf() Then
            Sleep($sleepTime)
        EndIf


    Case Else
        If @ScriptName = $UDFName Then

            Local $file = 'd:\Develop\Projects\ALL\HostFile\1.hosts'
            app($file)
			
        Else
           
			 FileType_Init($ext)
            
            If FileType_Add($ext) Then
                Mbox('FileType Add   ' & $ext)
            Else
                Mbox('Error with FileType_Add($ext)  ' & $ext)
            EndIf

        EndIf
EndSwitch










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

    _FileReadToArray($file, $paths)
    ; _ArrayDisplay($paths)


    _Log('paths')

    If Not IsArray($paths) Then
        Mbox('_FileReadToArray($file, $paths)')
        Exit
    EndIf

    _ArrayDelete($paths, 0)

    For $path In $paths
        _Log('Processing Path: ' & $path)

        If StringInStr($path, '|') >= 1 Then

            _Log('If StringInStr($path, |) >= 1 Then')

            $aSplit = StringSplit($path, '|')
            $ip = $aSplit[1]
            $domain = $aSplit[2]

			_HostDelete($ip, $domain)
			
			If @error = 0 Then
				_Log('OK: ' & $ip &'-' & $domain)
			Else
				_Log('Error: ' & $ip &'-' & $domain)
			Endif
			
        EndIf

    Next

EndFunc   ;==>app





#cs | FUNCTION | ============================================

	Name				run
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func runs($file, $clean = False)

    executer($parentFolder, $ext, True, @SW_SHOWDEFAULT, True, $file)
    _Log('parentFolder')

EndFunc   ;==>runs



