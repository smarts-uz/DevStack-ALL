#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\TC.au3>
#include <MyUDFs\Executer.au3>

Global $UDFName = 'AppGo.au3'
Global $aRetArray

$ext = 'appgo'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================



$appFile = 'd:\Develop\IDEApps\WebIDE\Sources Microsoft Vscode Develop.appgo'

cmdshell($ext, $appFile, False, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/8/2023

#ce	=========================================================

Func app($filePath, $clean = False)

    _FileReadToArray($filePath, $aRetArray)
    ; _ArrayDisplay($aRetArray)

    If Not IsArray($aRetArray) Then
        Mbox('_FileReadToArray($filePath, $aRetArray)')
        Exit
    EndIf

    If $aRetArray[0] = 2 Then
        If FileExists($aRetArray[1]) Then
            $item = $aRetArray[1]
        Else
            $item = _ES_SearchFolderPath($aRetArray[2])
        EndIf

    Else
        $sFileContent = $aRetArray[1]
        $item = _ES_SearchFolderPath($sFileContent)
    EndIf

	_TC_GoTo_Dir($item)

EndFunc   ;==>app




