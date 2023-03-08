#include <Array.au3>
#include <File.au3>
#include <MsgBoxConstants.au3>
#include <WinAPIEx.au3>
#include <TrayConstants.au3>
#include <MsgBoxConstants.au3>
#include <Misc.au3>
#include <MyUDFs\TgCons.au3>
#include <MyUDFs\ProcessCloseAll.au3>

#pragma compile(FileDescription, 'WordApp Utility Settings')
#pragma compile(ProductName, 'WordApp Utility Settings')
#pragma compile(ProductVersion, 1.1.7601.22099)
#pragma compile(FileVersion,  1.1.7601, 6.1.7601.22099)
#pragma compile(LegalCopyright, '© AsrorZ Business Solutions. Все права защищены')
#pragma compile(LegalTrademarks, 'AsrorZ Business Solutions')
#pragma compile(CompanyName, 'AsrorZ Business Solutions')

ProcessCloseAll('Init.exe')
ProcessCloseAll('Man.exe')
ProcessCloseAll('Run.exe')

ProcessCloseAll('gitman.exe')
ProcessCloseAll('gitsync.exe')

Local $aArray = FileReadToArray(@ScriptDir & '\Exit.txt')


For $vElement In $aArray

    $sString = $vElement & '\.git\index.lock'

    If FileExists($sString) Then
        _Log($sString, 'Removing: ')
        FileDelete($sString)
    Else
        _Log($sString, 'Not Exists: ')
    EndIf
    
    
    $sString = $vElement & '\.git\HEAD.lock'

    If FileExists($sString) Then
        _Log($sString, 'Removing: ')
        FileDelete($sString)
    Else
        _Log($sString, 'Not Exists: ')
    EndIf    
	
	
    $sString = $vElement & '\.git\refs\heads\master.lock'

    If FileExists($sString) Then
        _Log($sString, 'Removing: ')
        FileDelete($sString)
    Else
        _Log($sString, 'Not Exists: ')
    EndIf
    
Next
