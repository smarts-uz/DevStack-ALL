#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'Adding Shell commands to Extension context menu')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppShell.au3'

$ext = 'appshell'

#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================


$appFile = 'd:\Develop\Projects\ALL\AppShell\Testing\App\ALL.appshell'
$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Portable\au3.appshell'
$appFile = 'd:\Develop\Projects\DevApp\Execute\Power\Compile\ALL.appshell'
$appFile = 'd:\Develop\Projects\DevApp\IDEApp\PowerGUI\Portable\ALL.appshell'
$appFile = 'd:\Develop\Projects\FileApp\Extracts\Bioruebe Uniextract2\Portable\EXE.appshell'
$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Compiler\au3.appshell'
cmdshell($ext, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
	
	AppShell($file, $clean)
  
EndFunc   ;==>app
