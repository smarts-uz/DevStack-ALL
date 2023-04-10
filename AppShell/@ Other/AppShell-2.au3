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
#include <String.au3>
#include <MyUDFs\Config.au3>



#pragma compile(FileDescription, 'Adding Shell commands to Extension context menu')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppShell.au3'


$ext = 'appshell'

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
        _Log('Apply Mode')
        Local $file = $CmdLine[1]
        app($file)

    Case 2
        _Log('Remove Mode: ' & $CmdLineRaw)
        Local $file = $CmdLine[1]
        app($file, True)


    Case 0
        _Log('Install Mode')
        If @ScriptName = $UDFName Then

            Local $file = 'd:\Develop\Projects\execut\MFTApp\Everything\Portable\ALL.applnk'
            Local $file = 'd:\Develop\Projects\execut\MFTApp\ALL.applnk'
            Local $file = 'd:\Develop\Projects\ALL\AppShell\Directory.appshell'
            Local $file = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Portable\ALL.appshell'
            Local $file = 'd:\Develop\Projects\ALL\FreeFileSync\Portable\ALL.appshell'
            Local $file = 'd:\Develop\Projects\ALL\LockHunter\Portable\Drive.appshell'
            app($file, False)

        Else

            FileType_Init($ext)

If _ShellOpen_Install(_StringTitleCase($ext) & ' from Smarts.Uz', $ext) Then
                Mbox('Registered to .' &$ext&' extension')
            Else
                Mbox('Cannot register to .' &$ext&' extension')
            EndIf

            If _ShellAll_Install($ext, 'Remove Shell for ' & @ScriptName, @ScriptName, Default, '"%1" /clean') Then
                _Log('OK for _ShellAll Install')
            Else
                _Log('Error for _ShellAll Install')
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

    If Not FileExists($file) Then Return _LogBox($file & ' not exists!')

    $parentFolder = _FZ_Name($file, $fzParentDir)

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

    $title = _FZ_PathClean($paths[0])
    _ArrayDelete($paths, 0)


    For $path In $paths
        _Log('Processing Path: ' & $path)

        $name = ''
        $cmd = '"%1"'

        If StringInStr($path, '|') >= 1 Then

            _Log('If StringInStr($path, |) >= 1 Then')

            $aSplit = StringSplit($path, '|')
            $path = $aSplit[1]
            $name = $aSplit[2]

            If $aSplit[0] = 3 Then
                $cmd = $aSplit[3]
                $cmd = cmdParser($cmd, $parentFolder)
            EndIf

            $app = hybridPath($path, $parentFolder)
            $appName = _FZ_Name($app, $fzFilenameNoExt)

            _Log('title: ' & $title)
            _Log('path: ' & $path)
            _Log('name: ' & $name)
            _Log('cmd: ' & $cmd)
            _Log('app: ' & $app)
            _Log('appName: ' & $appName)

            Switch $title
                Case '*'
                Case 'Folder'
                Case 'Directory'
                Case 'Drive'
                    If Not $clean Then
                        
                        If _ShellAll_Install ($title, $name, $appName, $app, $cmd, $app) Then
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
                    
                    If Not $clean Then
                        If FileType_Add($title, $name, $app, $cmd, $app) Then
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
            
            

        EndIf


    Next


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
Func runs($file, $clean = False)

    executer($parentFolder, $ext, True, @SW_SHOWDEFAULT, True, $file)
    _Log('parentFolder')

EndFunc   ;==>runs



