#include-once
#include <GUIConstantsEx.au3>
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
#include <MyUDFs\FileAssociation.au3>


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
        Local $file = $CmdLine[1]
        app($file)

        If Not isParentProcessSelf() Then
            Sleep($sleepTime)
        EndIf
		
	Case 2
        Local $file = $CmdLine[1]
        app($file, True)


    Case Else
        If @ScriptName = $UDFName Then

            Local $file = 'd:\Develop\Projects\execut\MFTApp\Everything\Portable\ALL.applnk'
            Local $file = 'd:\Develop\Projects\execut\MFTApp\ALL.applnk'
            Local $file = 'd:\Develop\Projects\ALL\AppShell\Directory.appshell'
            Local $file = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Portable\ALL.appshell'
            app($file)

        Else



            FileType_Init($ext)

If _ShellOpen_Install(_StringTitleCase($ext) & ' from Smarts.Uz', $ext) Then
                Mbox('Registered to .' &$ext&' extension')
            Else
                Mbox('Cannot register to .' &$ext&' extension')
            EndIf
			
			
            If _ShellAll_Install($ext, 'Remove Shell Integration', @ScriptName, Default, '"%1" /clean') Then
        _Log('OK for _ShellAll_Install')
    Else
        _Log('Error for _ShellAll_Install')
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

    If Not FileExists($file) Then Return _Box($file & ' not exists!')
    
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
            $appName = _FZ_Name($app, $eFZN_FilenameNoExt)

            _Log('path: ' & $path)
            _Log('name: ' & $name)
            _Log('cmd: ' & $cmd)
            _Log('app: ' & $app)
            _Log('appName: ' & $appName)

			
			If Not $clean Then
            If _ShellAll_Install ($title, $name, $name, $app, $cmd, $app) Then
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



