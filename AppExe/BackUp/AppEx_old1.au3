#include-once
#include <GUIConstantsEx.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\TC.au3>
#include <MyUDFs\Log.au3>
#include <MyUDFs\Executer.au3>


Global $UDFName = 'AppEx'


$ext = 'appex'

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


If $CmdLine[0] > 0 Then

    Local $file = $CmdLine[1]


    _FileReadToArray($file, $exts)
    ; _ArrayDisplay($exts)

    _Log('exts')

    If Not IsArray($exts) Then
        Mbox('_FileReadToArray($file, $exts)')
        Exit
    EndIf

    _ArrayDelete($exts, 0)


    $folder = _FZ_Name($file, $fzParentDir)

    For $ext In $exts
        _Log('Executing Ext: ' & $ext)
        Executer($folder, "*." & $ext, True, @SW_SHOWDEFAULT)
    Next

Else


If _ShellOpen_Install('Go to via ETH', $ext) Then
        Mbox('Registered to .' &$ext&' extension')
    Else
        Mbox('Cannot register to .' &$ext&' extension')
    EndIf
EndIf
    

EndIf





