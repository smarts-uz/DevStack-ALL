#include 'ALL.au3'


Global $UDFName = 'Process Start.au3'


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================



Switch $CmdLine[0]
    Case 1
        Local $file = $CmdLine[1]
        app($file)

        Sleep($sleepTime)

    Case Else
        If @ScriptName = $UDFName And $debug Then

            $file = $appFile
            app($file)

        Else
Inits()

        EndIf
EndSwitch










#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    Setting_ALL($file)
    Setting_Event_Before()
    
EndFunc   ;==>app

