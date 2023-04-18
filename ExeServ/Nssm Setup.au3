#include-once
#include 'ALL.au3'

exeCmd()






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
    
    Nssm_ALL($file)

   Nssm_Setup()

EndFunc   ;==>app

