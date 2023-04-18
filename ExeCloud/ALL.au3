#include <MyUDFs\AppDev.au3>
#compileSkip



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
