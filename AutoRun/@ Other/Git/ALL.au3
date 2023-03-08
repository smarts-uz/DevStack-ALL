#include <Array.au3>
#include <File.au3>
#include <MsgBoxConstants.au3>
#include <WinAPIEx.au3>
#include <TrayConstants.au3>
#include <Misc.au3>
#include <MsgBoxConstants.au3>
#include <MyUDFs\Startup.au3>
#include <MyUDFs\Exit.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\ProcessCloseAll.au3>
#include <MyUDFs\CmdRead.au3>
#include <MyUDFs\FileZ.au3>

#pragma compile(FileDescription, 'WordApp Utility Settings')
#pragma compile(ProductName, 'WordApp Utility Settings')
#pragma compile(ProductVersion, 1.1.7601.22099)
#pragma compile(FileVersion,  1.1.7601, 6.1.7601.22099)
#pragma compile(LegalCopyright, '© AsrorZ Business Solutions. Все права защищены')
#pragma compile(LegalTrademarks, 'AsrorZ Business Solutions')
#pragma compile(CompanyName, 'AsrorZ Business Solutions')

TraySetState($TRAY_ICONSTATE_SHOW)
TraySetToolTip('ALL APPS')

$bAutorun = True

If $bAutorun Then
    $CU = _StartupRegistry_InstallUser()
    $SF = _StartupFolder_Install()
EndIf

_Singleton(@ScriptName)


$sPath = @ScriptDir

ShellExecuteWait($sPath & '\Exit.exe', '', $sPath)

ShellExecute($sPath & '\Man.exe', '', $sPath)
ShellExecute($sPath & '\Run.exe', '', $sPath)

