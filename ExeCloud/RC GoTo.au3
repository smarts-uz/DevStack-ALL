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
	
	Rc_ALL($file, True)
	Rc_GoTo($file)

EndFunc   ;==>app

