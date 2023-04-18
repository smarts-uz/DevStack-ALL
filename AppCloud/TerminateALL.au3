#include <MyUDFs\RcloneUDF.au3>

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
