#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>

#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>

#include <MyUDFs\FileAssociation.au3>
#include <String.au3>


Global $UDFName = 'AppExe.au3'


$ext = 'appexe'

#pragma compile(FileDescription, 'Execute Apps in the folder by provided list of extensions')
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




Global $exts




Switch $CmdLine[0]
    Case 1
        Local $file = $CmdLine[1]
        app($file)

        If Not isParentProcessSelf() Then
            Sleep($sleepTime)
        EndIf


    Case Else
        If @ScriptName = $UDFName Then

            Local $file = 'd:\Develop\Projects\execut\MFTApp\ALL.appexe'
            Local $file = 'd:\Develop\Projects\ALL\Powers\ALL.appexe'
            Local $file = 'd:\Develop\Projects\installs\Archiver\WinRAR\Installer\ALL.appexe'
            Local $file = 'd:\Develop\Projects\execut\MFTApp\Everything\Portable\ALL.appexe'
            Local $file = 'd:\Develop\Projects\DevApp\Controls\ALL.appexe'
            Local $file = 'd:\Develop\Projects\DevApp\Controls\Control Viewer\ALL.appexe'
            Local $file = 'd:\Develop\Projects\FileApp\Utilities\LearningApp\ALL.appexe'
            app($file)

        Else




            FileType_Init($ext)

            If _ShellOpen_Install(_StringTitleCase($ext) & ' from Smarts.Uz', $ext) Then
                Mbox('Registered to .' &$ext&' extension')
            Else
                Mbox('Cannot register to .' &$ext&' extension')
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
    Local $noWait

    $parentFolder = _FZ_Name($file, $fzParentDir)

    If FileGetSize($file) = 0 Then

        _Log('FileGetSize($file) = 0')
        runs($file)
        Return False
    EndIf

    _FileReadToArray($file, $exts)
    ; _ArrayDisplay($exts)


    _Log('exts')

    If Not IsArray($exts) Then
        Mbox('_FileReadToArray($file, $exts)')
        Exit
    EndIf

    _ArrayDelete($exts, 0)

    $fullPath = pathTitle($exts[0], $parentFolder)
    _Log('fullPath: ' & $fullPath)

    _ArrayDelete($exts, 0)

    For $ext In $exts

        
        $nw = ''
        $noWait = False
        $window = @SW_SHOWDEFAULT
		
        If StringInStr($ext, '|') >= 1 Then

            _Log('If StringInStr($ext, |) >= 1 Then')

            $aSplit = StringSplit($ext, '|')
            $ext = $aSplit[1]
			
            $noWait = $aSplit[2]

            If $noWait = 'nw' Then
                $noWait = True
                       EndIf
            
            If $aSplit[0] = 3 Then
                $window = $aSplit[3]

                Switch $window
                    Case 'min'
                        $window = @SW_MINIMIZE
                        
                    Case 'max'
                        $window = @SW_MAXIMIZE
                        
                    Case 'hide'
                        $window = @SW_HIDE
                        
                    Case Else
                        $window = @SW_SHOWDEFAULT
                        
                EndSwitch
                
            EndIf
            
            
        EndIf

        _Log('ext: ' & $ext)
        _Log('nw: ' & $nw)
        _Log('noWait: ' & $noWait)

        _Log('Executing Ext: ' & $ext)

        executer($fullPath, "*." & $ext, Not $noWait, @SW_SHOWDEFAULT)

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
