#include <Array.au3>
#include <File.au3>
#include <MsgBoxConstants.au3>
#include <WinAPIEx.au3>
#include <TrayConstants.au3>
#include <MsgBoxConstants.au3>
#include <Misc.au3>

#include <MyUDFs\Startup.au3>
#include <MyUDFs\Exit.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\FileZ.au3>

#RequireAdmin

#pragma compile(FileDescription, 'RX Settings')
#pragma compile(ProductName, 'RX Settings')
#pragma compile(ProductVersion, 1.1.7601.22099)
#pragma compile(FileVersion,  1.1.7601, 6.1.7601.22099)
#pragma compile(LegalCopyright, '© AsrorZ Business Solutions. Все права защищены')
#pragma compile(LegalTrademarks, 'AsrorZ Business Solutions')
#pragma compile(CompanyName, 'AsrorZ Business Solutions')


_Singleton(@ScriptName)


$SF = _StartupFolder_Install()


$minDelay = 10

TraySetState($TRAY_ICONSTATE_SHOW)
TraySetToolTip('Executer! Execute Apps')

#Region Exec
    _Log('Starting: ALL')
    executer(@ScriptDir & '\ALL','*', False)

    If $isAsrorPC Then
        _Log('Starting: AZ')
        executer(@ScriptDir & '\AZ','*', False)
    EndIf

    If $isHomePC Then
        _Log('Starting: HM')
        executer(@ScriptDir & '\HM','*', False)
    EndIf

    If $isWorkPC Then
        _Log('Starting: WR')
        executer(@ScriptDir & '\WR','*', False)
    EndIf


#EndRegion Exec


