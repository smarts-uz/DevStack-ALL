#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\ShellAll.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\TC.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>
#include <MyUDFs\Lnk.au3>
#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Nssm.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <MyUDFs\Settings.au3>
#include <MyUDFs\RcloneUDF.au3>

#include <MyUDFs\FileAssociation.au3>
#include <String.au3>

#pragma compile(FileDescription, 'Close ALL Rclone for given Drive')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')

Global $UDFName = 'Terminate.au3'

If $CmdLine[0] < 1 Then
    _LogBox('CmdLine[0] < 1', '')
    $folder = 'z:'
Else
    $folder = $CmdLine[1]
EndIf


Rc_Close_ALL()
