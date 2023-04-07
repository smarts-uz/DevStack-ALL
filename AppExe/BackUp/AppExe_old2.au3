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


$appFile = 'd:\Develop\Projects\DevApp\Controls\Control Viewer\ALL.appexe'
$appFile = 'd:\Develop\Projects\Devops\Hyper-V\Uninstall-WindowsFeature\ALL.appexe'
$appFile = 'd:\Develop\Projects\DevApp\Versions\TortoiseGit\Installer\ALL.appexe'
$appFile = 'd:\Develop\Projects\Devops\Windows\Set-VMHost\ALL.appexe'
cmdshell($ext, $appFile, False, False)



#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

  If Not FileExists($file) Then Return _LogBox($file & ' not exists!')

    Local $noWait

    $parentFolder = _FZ_Name($file, $eFZN_ParentDir)

    If FileGetSize($file) = 0 Then
        _Log('FileGetSize($file) = 0')
        runs($file, $clean)
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
            
            $noWaitIn = $aSplit[2]

            If $noWaitIn = 'nw' Then
                $noWait = True
            EndIf

            If $aSplit[0] = 3 Then
                $windowIn = $aSplit[3]

                Switch $windowIn
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

        _Log($ext, 'ext: ')
        _Log($nw, 'nw: ')
        _Log($noWait, 'noWait: ')
        _Log($noWait, 'noWait: ')

        _Log($ext, 'Executing Ext: ')
		_Log($fullPath, 'fullPath')
		
		if StringInStr($ext, '.') = 0 Then
			$ext = "*." & $ext
			EndIf
			
        executer($fullPath, $ext, Not $noWait, $window)

    Next


    If Not isParentProcessSelf() And @Compiled Then
        Sleep($sleepTime)
    EndIf


EndFunc   ;==>app





