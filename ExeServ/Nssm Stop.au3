#include-once
#include 'ALL.au3'

Global $UDFName = 'Nssm Stop.au3'



Switch $CmdLine[0]
    Case 1
        Local $file = $CmdLine[1]
        app($file)

        Sleep(2000)

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
    
    Nssm_ALL($file)

   Nssm_Stop()

EndFunc   ;==>app

