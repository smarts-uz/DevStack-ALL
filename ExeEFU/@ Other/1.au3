#include "CSV.au3"
#include <MyUDFs\FileZ.au3>


$rcs = _ParseCSV('d:\FileType\Office\Develop\CSV\ALL\app.efu', ",")

; _Log('rcs')


For $i = 0 To Ubound($rcs) - 1
	_Log($rcs[$i][0])
Next
