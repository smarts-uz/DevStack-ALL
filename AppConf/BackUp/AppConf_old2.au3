#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\TC.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>

#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\Settings.au3>


#include <MyUDFs\FileAssociation.au3>
#include <String.au3>


#pragma compile(FileDescription, 'Import & SET exported App configurations')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppConf.au3'


$ext = 'appconf'


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

            Local $file = 'd:\Develop\Projects\execut\MFTApp\Everything\Portable\ALL.appenv'
            Local $file = 'd:\Develop\Projects\execut\MFTApp\ALL.appenv'
            Local $file = 'd:\Develop\Projects\execut\MFTApp\Everything\Portable\ALL.appenv'
            Local $file = 'd:\Develop\Projects\installs\Backups\Macrium Reflect\Settings\AppData\ALL.appconf'
            Local $file = 'd:\Develop\Projects\DevApp\Versions\PhraseExpander\Settings\ALL.appconf'

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

    $parentFolder = _FZ_Name($file, $fzParentDir)

    If FileGetSize($file) = 0 Then
        _Log('FileGetSize($file) = 0')
        runs($file)
        Return False
    EndIf


    Setting_Import($file)


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



