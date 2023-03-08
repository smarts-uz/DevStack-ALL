#include-once
#include <GUIConstantsEx.au3>
#include <Array.au3>
#include <MyUDFs\ShellOpen.au3>
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
#include <MyUDFs\FileAssociation.au3>
#include <MyUDFs\Nssm.au3>


Global $debug = True
Global $exts
Global $ext = 'appserv'
Global $appFile = 'd:\Develop\Projects\FileApp\Mounter\TrueApps\ALL.appserv'


#cs | FUNCTION | ============================================

	Name				Inits
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/7/2023

#ce	=========================================================
Func Inits()

    If FileType_Add($ext) Then
        Mbox(@ScriptName & ' FileType Add ' & $ext)
    Else
        Mbox(@ScriptName & ' Error with FileType_Add $ext ' & $ext)
    EndIf

EndFunc   ;==>Inits
