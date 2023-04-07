#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\TC.au3>

Global $UDFName = 'AppGo.au3'
Global $aRetArray

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================






$ext = 'appgo'



If $CmdLine[0] > 0  Then

	Local $filePath = $CmdLine[1]
	
	app($filePath)
	
Else
	
	If @ScriptName = $UDFName Then
		
		$filePath = 'd:\Develop\IDEApps\WebIDE\Sources Microsoft Vscode Develop.appgo   '
		app($filePath)
	Else    
		If _ShellOpen_Install('Go to via ETH', $ext) Then
			Mbox('Registered to .' &$ext&' extension')
		Else
			Mbox('Cannot register to .' &$ext&' extension')
		EndIf
		
	EndIf
	
	
EndIf







#cs | FUNCTION | ============================================

	Name				app
	Desc

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/8/2023

#ce	=========================================================

Func app($filePath)
	
	_FileReadToArray($filePath, $aRetArray)
	; _ArrayDisplay($aRetArray)
	
	If Not IsArray($aRetArray) Then
		Mbox('_FileReadToArray($filePath, $aRetArray)')
		Exit
	EndIf
	
	If $aRetArray[0] = 2 Then
		If FileExists($aRetArray[1]) Then
			$sItem = $aRetArray[1]
		Else
			$sItem = _ES_SearchFolderPath($aRetArray[2])
		EndIf
		
	Else
		$sFileContent = $aRetArray[1]
		$sItem = _ES_SearchFolderPath($sFileContent)
	EndIf
	
	$fullPath = envExpand('%Home_ALL_TotalCN_Bin%\Totalcmd64.exe')
	$WinCmd = envExpand('%Home_ALL_TotalCN%\Settings\WinCmd.ini')
	$WcxFTPs = envExpand('%Home_ALL_TotalCN%\Settings\WcxFTPs.ini')
	
	_Log('fullPath: ' & $fullPath)
	_Log('WinCmd: ' & $WinCmd)
	_Log('WcxFTPs: ' & $WcxFTPs)
	
	If Not FileExists($fullPath) Then
	_LogBox('File ' & $fullPath & 'Not Exists')
	EndIf

	_Log('CmdLine')
	
	
	If _TC_Is_RightActive() Then
		$target = 'R'
		Else
		$target = 'L'
		Endif
	
	
	$cmd = '/I="'& $WinCmd &'" /F="'& $WcxFTPs &'" /O /'&$target&'="' & $sItem & '"'
	
	If $CmdLine[0] > 0 Then
		$cmd &= ' ' & $CmdLineRaw
	EndIf
	
	ShellExecute($fullPath, $cmd)
	Send('{TAB}')
	
	If FileExists($sItem) Then
		If Not _FZ_Check($sItem, $eFZC_IsDirectory) Then
			ShellExecuteWait($sItem)
		EndIf
	EndIf
	
EndFunc   ;==>app

