#include-once
#include <GUIConstantsEx.au3>
#include <Array.au3>
#compileSkip
#include <MyUDFs\Es2.au3>

#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>

#include <MyUDFs\FileZ.au3>

#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>
#include <String.au3>
#include <MyUDFs\Dialogs.au3>
#include <MyUDFs\_ParseCSV.au3>
#include <MyUDFs\FileType.au3>
#include <MyUDFs\RcloneUDF.au3>


Global $debug = True
Global $exts
Global $type = 'appcloud'
Global $appFile = 'd:\Develop\Projects\ALL\AppCloud\SMM-App\App.appcloud'


#cs | FUNCTION | ============================================

	Name				Inits
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/7/2023

#ce	=========================================================
Func Inits()

    If FT_MenuCreate($type, @ScriptName) Then
        _Log(@ScriptName & ' FileType Add ' & $type)
    Else
        Mbox(@ScriptName & ' Error with FileType_Add type ' & $type)
    EndIf

EndFunc   ;==>Inits
