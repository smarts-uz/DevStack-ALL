#include <MyUDFs\RcloneUDF.au3>


    _Start('T_processGetParentName')

   $a =  processGetParentName()
   _LogBox($a, '$a') 