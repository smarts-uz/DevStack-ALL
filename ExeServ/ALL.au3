#compileSkip
#include <MyUDFs\AppDev.au3>




Global $debug = True
Global $exts
Global $type = 'appserv'
Global $appFile = 'd:\Develop\Projects\FileApp\Mounter\TrueApps\ALL.appserv'


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
