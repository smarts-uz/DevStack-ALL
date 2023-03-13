'use strict';

var G_EmailSettings_RecipientsText = "";
var G_EmailSettings_SenderName = "";
var G_EmailSettings_SenderEmail = "";
var G_EmailSettings_SMTPServer = "";
var G_EmailSettings_SMTPPort = "";
var G_EmailSettings_SMTPUser = "";
var G_EmailSettings_SMTPPassword = "";

var G_EmailSettings_SMTPAuth = false;
var G_EmailSettings_SASL = false;
var G_EmailSettings_ExplicitTLS = false;
var G_EmailSettings_EmailSSL = 0;

const MaxInt=0x7fffffff;

var ImportConfigLinesHTML =
  '<div id="jqxImportConfigLinesDlg">'+
  '<div>Import Configuration Lines from an INI-style Text File</div>'+
  '<div>'+
  '<div>Click the Browse button to choose the file to upload and import.</div>'+
  '<br>'+
  '<div>The supported file type is: .ini.</div>'+
  '<br>'+
  '<div>Please upload only one file at a time and wait for the import to complete before using the web GUI for other tasks.</div>'+
  '<br>'+
  '<div id="jqxFileUploadIni"></div>'+
  '<br>'+
  '<div><button id="ImportConfigLinesOKBtn">Close</button></div>'+
  '</div>';

function ImportConfigLines()
{
   $("#ImportConfigLinesDlg_div").html(ImportConfigLinesHTML);
   $('#jqxImportConfigLinesDlg').jqxWindow({ maxWidth: 580,  width:400, maxHeight:800, height:400, autoOpen: false, isModal: true,
           theme: 'energyblue', animationType: 'slide' });

   $('#jqxFileUploadIni').jqxFileUpload({ width: 300, uploadUrl: 'configlinesimport.php?token='+GClientToken,
//                                         multipleFilesUpload: false, does not work
                                         fileInputName: 'fileToUpload'});

   $('#ImportConfigLinesOKBtn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
   $('#ImportConfigLinesOKBtn').click(
     function ()
     {
     $('#jqxImportConfigLinesDlg').jqxWindow('close');
     });

   $('#jqxImportConfigLinesDlg').jqxWindow('open');
}

function DownloadConfigFile()
{
  window.open("exportconfigfile.php?token="+GClientToken);
};

function DownloadDiagnosticFile()
{
  window.open("exportdiagnosticfile.php?token="+GClientToken);
};


function ReadEmailSettingsFromDialog()
{
   G_EmailSettings_RecipientsText = $('#inptRecipientsText').jqxInput('val');
   G_EmailSettings_SenderName = $('#inptSenderName').jqxInput('val');
   G_EmailSettings_SenderEmail = $('#inptSenderEmail').jqxInput('val');
   G_EmailSettings_SMTPServer = $('#inptSMTPServer').jqxInput('val');
   G_EmailSettings_SMTPPort = $('#inptSMTPPort').jqxInput('val');
   G_EmailSettings_SMTPUser = $('#inptSMTPUser').jqxInput('val');
   G_EmailSettings_SMTPPassword = $('#inptSMTPPassword').jqxPasswordInput('val');

   G_EmailSettings_SMTPAuth = GetCheckBoxValue('jqxSMTPAuthCb');
   G_EmailSettings_SASL = GetCheckBoxValue('jqxSASLCb');
   G_EmailSettings_ExplicitTLS = GetCheckBoxValue('jqxExplicitTLSCb');
   G_EmailSettings_EmailSSL = $("#jqxEmailSSLCombo").jqxDropDownList('getSelectedIndex' );
}

function SendProgramSettingsToServer(wanttoclose)
{
  var sendparams = { };
  sendparams.token = GClientToken;

  sendparams['ConfigRWAllUsers'] = GetCheckBoxValue('jqxConfigRWAllUsersCb');
  if (GetCheckBoxValue('jqxShedIdleTimeAfterStartupCb'))
     sendparams['SchedulerIdleStartupMinutes'] = $("#inptShedIdleTimeAfterStartup").jqxNumberInput( 'val');
  else
     sendparams['SchedulerIdleStartupMinutes'] = 0;
  sendparams['DetectInternet'] = GetCheckBoxValue('jqxDetectInternetCb');
  sendparams['DetectInternetInterval'] = $("#inptDetectInternetInterval").jqxNumberInput('val');
  sendparams['DetectInternetEvenManually'] = GetCheckBoxValue('jqxDetectInternetEvenManuallyCb');
  sendparams['LoggingKind'] = $("#jqxLoggingKindCombo").jqxDropDownList('getSelectedIndex' );
  sendparams['TimerLogging'] = $("#jqxTimerLoggingCombo").jqxDropDownList('getSelectedIndex' );
  sendparams['FAbbreviatedLogs'] = GetCheckBoxValue('jqxFAbbreviatedLogsCb');
  sendparams['FLogTiming'] = GetCheckBoxValue('jqxFLogTimingCb');
  sendparams['FLogTimingDetails'] = GetCheckBoxValue('jqxFLogTimingDetailsCb');
  sendparams['FLogTransferDetails'] = GetCheckBoxValue('jqxFLogTransferDetailsCb');
  sendparams['CPLogging'] = GetCheckBoxValue('jqxCPLoggingCb');
  sendparams['LogPath'] = $("#inptLogPath").jqxInput('val');

  if (GetCheckBoxValue('jqxKeepLogFilesCb'))
     sendparams['iKeepLogFiles'] = $("#inptKeepLogFiles").jqxNumberInput('val')
  else
     sendparams['iKeepLogFiles'] = 0;

  sendparams['FIPLogging'] = GetCheckBoxValue('jqxFIPLoggingCb');
  sendparams['FLogSmartTracking'] = GetCheckBoxValue('jqxFLogSmartTrackingCb');
  sendparams['FLogFileList'] = GetCheckBoxValue('jqxFLogFileListCb');
  sendparams['FDetailedSecurityLogging'] = GetCheckBoxValue('jqxFDetailedSecurityLoggingCb');
  sendparams['FLogTimestamps'] = GetCheckBoxValue('jqxFLogTimestampsCb');
  sendparams['FLogShares'] = GetCheckBoxValue('jqxFLogSharesCb');
  sendparams['FLogSyntheticDetails'] = GetCheckBoxValue('jqxFLogSyntheticDetailsCb');
  sendparams['FLogSpeedLimit'] = GetCheckBoxValue('jqxFLogSpeedLimitCb');
  sendparams['FWithThreadCPHistory'] = GetCheckBoxValue('jqxFWithThreadCPHistoryCb');
  sendparams['FOutputFileListings'] = GetCheckBoxValue('jqxFOutputFileListingsCb');
  sendparams['FDeleteNothingToDoLogs'] = GetCheckBoxValue('jqxFDeleteNothingToDoLogsCb');
  if (GetCheckBoxValue('jqxiLogRealtimeStatusMinutesCb'))
     sendparams['iLogRealtimeStatusMinutes'] = $("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val')
  else
     sendparams['iLogRealtimeStatusMinutes'] = 0;
  sendparams['iLogRealtimeStatusLevel'] = $("#jqxiLogRealtimeStatusLevelCombo").jqxDropDownList( 'getSelectedIndex' );
  sendparams['DetectInternetPositive'] = $("#inptDetectInternetPositive").jqxInput( 'val' );
  sendparams['DetectInternetNegative'] = $("#inptDetectInternetNegative").jqxInput( 'val' );
  sendparams['Email'] = GetCheckBoxValue('jqxSendEmailWhenTasksCompleteCb');
  sendparams['ManualEmail'] = GetCheckBoxValue('jqxManualEmailCb');
  sendparams['ScheduledEmail'] = GetCheckBoxValue('jqxScheduledEmailCb');
  sendparams['EmailEmpty'] = GetCheckBoxValue('jqxEmailEmptyCb');
  sendparams['EmailOnErrorOnly'] = GetCheckBoxValue('jqxEmailOnErrorOnlyCb');
  sendparams['EmailWhenFileReplaced'] = GetCheckBoxValue('jqxEmailWhenFileReplacedCb');
  sendparams['EmailConflict'] = GetCheckBoxValue('jqxEmailConflictCb');
  sendparams['NoEmailIfRerunSucceeds'] = GetCheckBoxValue('jqxNoEmailIfRerunSucceedsCb');
  sendparams['NoEmailIfVolumeMissing'] = GetCheckBoxValue('jqxNoEmailIfVolumeMissingCb');
  sendparams['EmailLogfile'] = GetCheckBoxValue('jqxEmailLogfileCb');
  sendparams['EmailFilteredItems'] = GetCheckBoxValue('jqxEmailFilteredItemsCb');
  sendparams['EmailSimpleSubject'] = GetCheckBoxValue('jqxEmailSimpleSubjectCb');
  sendparams['HTMLEmail'] = GetCheckBoxValue('jqxHTMLEmailCb');
  sendparams['ErrorsNotInDigest'] = GetCheckBoxValue('jqxErrorsNotInDigestCb');
  sendparams['EmailFiles'] = GetCheckBoxValue('jqxEmailFilesCb');
  sendparams['EmailDigest'] = GetCheckBoxValue('jqxDigestCb');
  sendparams['DigestInterval'] = $("#jqxDigestIntervalCombo").jqxDropDownList('getSelectedIndex' );
  sendparams['EmailDailySummary'] = GetCheckBoxValue('jqxEmailDailySummaryCb');
  sendparams['DailySummaryTime'] = $("#jqxDailySummaryTime_Input").jqxDateTimeInput( 'getDate' ).toJSON();
  sendparams['FirstDigestTime'] = $("#jqxFirstDigestTime_Input").jqxDateTimeInput( 'getDate' ).toJSON();
  sendparams['EmailModeForRetries'] = $("#jqxEmailModeForRetriesCombo").jqxDropDownList( 'getSelectedIndex' );
  sendparams['RecipientsText'] = G_EmailSettings_RecipientsText;
  sendparams['SenderName'] = G_EmailSettings_SenderName;
  sendparams['SenderEmail'] = G_EmailSettings_SenderEmail;
  sendparams['SMTPServer'] = G_EmailSettings_SMTPServer;
  sendparams['SMTPPort'] = G_EmailSettings_SMTPPort;
  sendparams['SMTPUser'] = G_EmailSettings_SMTPUser;
  sendparams['SMTPPassword'] = G_EmailSettings_SMTPPassword;
  sendparams['SMTPAuth'] = G_EmailSettings_SMTPAuth;
  sendparams['SASL'] = G_EmailSettings_SASL;
  sendparams['ExplicitTLS'] = G_EmailSettings_ExplicitTLS;
  sendparams['EmailSSL'] = G_EmailSettings_EmailSSL;
  sendparams['TempPath'] = $("#inptTempPath").jqxInput( 'val');
  sendparams['iShutdownWait'] = $("#inptiShutdownWait").jqxNumberInput('val');
        sendparams['SchedulerCanPromptForVolumes'] = GetCheckBoxValue('jqxSchedulerCanPromptForVolumesCb');
  sendparams['FailIfRemoteListingFails'] = GetCheckBoxValue('jqxFailIfRemoteListingFailsCb');

  if (GetCheckBoxValue('jqxRealtimeKeepAliveSecondsCb'))
     sendparams['iRealtimeKeepAliveSeconds'] = $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput('val');
  else
     sendparams['iRealtimeKeepAliveSeconds'] = -1;

  sendparams['RegName'] = $("#inptRegName").jqxInput( 'val');
  sendparams['RegCode'] = $("#inptRegCode").jqxInput( 'val');

  sendparams['DateFormat'] = $("#inptDateFormat").jqxInput( 'val');
  sendparams['TimeFormat'] = $("#inptTimeFormat").jqxInput( 'val');

  sendparams['iMaxThreads'] = $("#inpti_iMaxThreads").jqxNumberInput('val');
  sendparams['iSeparateProcesses'] = $("#inpti_iSeparateProcesses").jqxNumberInput('val');
  sendparams['BufSize'] = $("#inpti_BufSize").jqxNumberInput('val');
  if (GetCheckBoxValue('jqxSplitAfterEntriesCb'))
     sendparams['iSplitAfterEntries'] = $("#inpti_iSplitAfterEntries").jqxNumberInput('val') * 1000000;
  else
     sendparams['iSplitAfterEntries'] = MaxInt;
  sendparams['WithGlobalLimits'] = GetCheckBoxValue('jqxWithGlobalLimitsCb');
  sendparams['UseGlobalSpeedLimit'] = GetCheckBoxValue('jqxUseGlobalSpeedLimitCb');
  sendparams['GlobalSpeedLimit'] = $("#inptGlobalSpeedLimit").jqxNumberInput('val');
  sendparams['SyncIgnoreWeekdays'] = GetCheckBoxValue('jqxSyncIgnoreWeekdaysCb');
  sendparams['SyncForceSeparateMonitors'] = GetCheckBoxValue('jqxSyncForceSeparateMonitorsCb');
  sendparams['UserSpecificMutexes'] = GetCheckBoxValue('jqxUserSpecificMutexesCb');
  sendparams['Global_Synapse_SBBSSL'] = GetCheckBoxValue('jqxGlobal_Synapse_SBBSSL');
  sendparams['WebStatusServer'] = GetCheckBoxValue('jqxWebStatusServerCb');
  sendparams['GlobalExcludeMasks'] = $("#inptGlobalExcludeMasks").jqxInput('val');
  sendparams['SyncGlobalMasksIgnoreTotally'] =  GetCheckedRadiobuttonName( $("#SyncGlobalMasksDontCopy_Mode"),  $("#SyncGlobalMasksIgnoreTotally_Mode") );
  sendparams['NotToZipMasks'] = $("#inptNotToZipMasks").jqxInput('val');
  sendparams['NotForPartialMasks'] = $("#inptNotForPartialMasks").jqxInput('val');
  sendparams['MinPartialSize'] = $("#inpt_MinPartialSize").jqxNumberInput('val') * 1024;
  sendparams['IncompleteExtension'] = $("#inpt_IncompleteExtension").jqxInput('val');
  sendparams['S3PartSize'] = $("#inpt_S3PartSize").jqxNumberInput('val')*1024*1024;
  sendparams['S3MaxUploadThreads'] = $("#inpt_S3MaxUploadThreads").jqxNumberInput('val');
        sendparams['AcceptNewServers'] = GetCheckBoxValue('jqxAcceptNewServers');

  sendparams['DatabasePath'] = $("#inpt_DatabasePath").jqxInput('val');
  sendparams['SyncNeverShareDatabase'] = GetCheckBoxValue('jqxSyncNeverShareDatabaseCb');
  sendparams['CacheDBsRWAllUsers'] = GetCheckBoxValue('jqxCacheDBsRWAllUsersCb');

  if (GisSyncoveryWindows)
  {
    sendparams['DBServerType'] =
       GetCheckedRadiobuttonName(  $("#DBServerType_Embedded_Firebird_Mode"), $("#DBServerType_Standalone_Firebird_Local_Mode"),
                                   $("#DBServerType_Standalone_Firebird_TCP_Mode"));
    sendparams['DBServerUsername'] = $("#inpt_DBServerUsername").jqxInput('val');
    sendparams['DBServerPassword'] = $("#inpt_DBServerPassword").jqxInput('val');
    sendparams['DBServerAddress'] = $("#inpt_DBServerAddress").jqxInput('val');
  }

  sendparams['EventLogServiceStartStop'] = GetCheckBoxValue('jqxEventLogServiceStartStopCb');
  sendparams['EventLogSchedulerStartStop'] = GetCheckBoxValue('jqxEventLogSchedulerStartStopCb');
  sendparams['EventLogServiceError'] = GetCheckBoxValue('jqxEventLogServiceErrorCb');
  sendparams['EventLogApplicationError'] = GetCheckBoxValue('jqxEventLogApplicationErrorCb');
  sendparams['EventLogGeneralWarnings'] = GetCheckBoxValue('jqxEventLogGeneralWarningsCb');
  sendparams['EventLogProfileRunStarted'] = GetCheckBoxValue('jqxEventLogProfileRunStartedCb');
  sendparams['EventLogProfileCompletedWithoutE'] = GetCheckBoxValue('jqxEventLogProfileCompletedWithoutECb');
  sendparams['EventLogProfileCompletedWithE'] = GetCheckBoxValue('jqxEventLogProfileCompletedWithECb');
  sendparams['EventLogProfileGeneralE'] = GetCheckBoxValue('jqxEventLogProfileGeneralECb');
  sendparams['EventLogProfileRunWithWarnings'] = GetCheckBoxValue('jqxEventLogProfileRunWithWarningsCb');
  sendparams['EventLogProfileModifiedByUser'] = GetCheckBoxValue('jqxEventLogProfileModifiedByUserCb');
  sendparams['CPUAffinityCPU0'] = GetCheckBoxValue('jqxCPUAffinityCPU0Cb');
  sendparams['CPUAffinityCPU1'] = GetCheckBoxValue('jqxCPUAffinityCPU1Cb');
  sendparams['CPUAffinityCPU2'] = GetCheckBoxValue('jqxCPUAffinityCPU2Cb');
  sendparams['CPUAffinityCPU3'] = GetCheckBoxValue('jqxCPUAffinityCPU3Cb');
  sendparams['SyncThreadPriority'] = $("#jqxSyncThreadPriorityCombo").jqxDropDownList('selectedIndex');
  sendparams['iRemoteAndCacheScanningThreads'] = $("#inpt_iRemoteAndCacheScanningThreads").jqxNumberInput('val');
  sendparams['iLocalScanningThreads'] = $("#inpt_iLocalScanningThreads").jqxNumberInput('val');
  sendparams['iInternetScanningThreads'] = $("#inpt_iInternetScanningThreads").jqxNumberInput('val');
  sendparams['iNetworkScanningThreads'] = $("#inpt_iNetworkScanningThreads").jqxNumberInput('val');

  sendparams['EncryptWhat'] = $("#jqxEncryptWhatCombo").jqxDropDownList('selectedIndex');
  sendparams['EncryptHow'] = $("#jqxEncryptHowCombo").jqxDropDownList('selectedIndex');

  sendparams['SettingsPassword'] = $("#inpt_SettingsPassword").jqxInput('val');
  sendparams['StoreSettingsPassword'] = GetCheckBoxValue('jqxStoreSettingsPassword');
  sendparams['SettingsPasswordFile'] = $("#inpt_SettingsPasswordFile").jqxInput('val');

  if (sendparams['EncryptHow']==2)
     if (sendparams['SettingsPassword'] != $("#inpt_SettingsPassword2").jqxInput('val'))
     {
        alert("The Settings Encryption Password did not match the 'Repeat' field.");
        return;
     }

  $.post( "post_programsettings.php",JSON.stringify(sendparams)).done(
  function( data )
  {
     if( data == 'OK' )
     {
       if (wanttoclose)
          $('#jqxProgramSettingsDlg').jqxWindow('close');
     }
     if (data != 'OK')
     {
       alert( "The program settings could not be saved: " + data);
     }
  });


  var dataCert = {};

  dataCert.certificate_names = Gcertificate_names;
  dataCert.private_keyfiles = Gcertificates_private_keyfiles;
  dataCert.public_keyfiles = Gcertificates_public_keyfiles;

  PostJsonObject( 'save_certificates.php', dataCert);
}

function OnProgramSettings()
{

   $("#ProgramSettingsDlg_div").html( ProgramSettingsFormHTML );


   $('#jqxProgramSettingsDlg').jqxWindow(
    { maxWidth:  GProgramSettingsDlgWidth+200,  width:GProgramSettingsDlgWidth,
      maxHeight: GProgramSettingsDlgHeight+200, height:GProgramSettingsDlgHeight, autoOpen: false, isModal: true,
      theme: 'energyblue', animationType: 'slide' });


   // make Tabs header higher for Tablet version
   if (GIsTabletApplication)
   {
                            
       var MainLis = '<ul><li></br>Startup</br></li>'+
        '<li></br>Logs</br></li>'+
        '<li></br>Notify</br></li>'+
        '<li></br>Misc, License</br></li>'+
        '<li></br>Advanced</br></li>'+
        '<li></br>Types, Limits</br></li>'+
        '<li></br>Cloud</br></li>'+
        '<li></br>Database</br></li>'+
        '<li></br>Event Log</br></li>'+
        '<li></br>Performance</br></li>'+
        '<li></br>Private Keys</br></li>'+
      '</ul>';
     $("#TabProgramSettingsLis").replaceWith(MainLis);

   }

   $('#jqxProgramSettingsTabs').jqxTabs({ height:GProgramSettingsTabsHeight, width: GProgramSettingsTabsWidth, keyboardNavigation: false});

   $('#jqxProgramSettingsTabs').on('selecting', function (event)
   { // Some code here.
       var ItemIndex = event.args.item;
       if(ItemIndex == 0)
       {
                       
       }

       if(ItemIndex == 2)
       {
                             
         EnableDisableControlsNotifyTab(GetCheckBoxValue("jqxSendEmailWhenTasksCompleteCb"));
       }
   });

   if (!GisSyncoveryWindows)
   {
      // not needed right now but leaving it here for future reference
      // $('#jqxProgramSettingsTabs').jqxTabs('disableAt', 8);
      // $('#jqxProgramSettingsTabs').jqxTabs('disableAt', 7);
   }

   // Prefs
   $("#inptShedIdleTimeAfterStartup").jqxNumberInput({ width : 30, height : 25,  inputMode: 'simple', decimalDigits: 0 });

   CreateCheckBox('jqxConfigRWAllUsersCb', 700, 25);

   $("#btnImportConfigLines").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnImportConfigLines').click(function ()
    {
      ImportConfigLines();
    });

   $("#btnDownloadConfigFile").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnDownloadConfigFile').click(function ()
    {
      DownloadConfigFile();
    });

   $("#btnDownloadDiagnosticFile").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnDownloadDiagnosticFile').click(function ()
    {
      DownloadDiagnosticFile();
    });


   // StartUp

   CreateCheckBox('jqxShedIdleTimeAfterStartupCb', 260, 25);

   $('#jqxShedIdleTimeAfterStartupCb').on('change', function (event)
   {
       var checked = event.args.checked;
       $("#inptShedIdleTimeAfterStartup").jqxNumberInput('disabled',!checked)
       if (checked)
          if ( $("#inptShedIdleTimeAfterStartup").jqxNumberInput('val') == 0 )
             $("#inptShedIdleTimeAfterStartup").jqxNumberInput('val', 5 );

    });

   CreateCheckBox('jqxDetectInternetCb', 360, 25);

   $("#inptDetectInternetPositive").jqxInput({ width : 200, height : 100 });
   $("#inptDetectInternetNegative").jqxInput({ width : 200, height : 100 });
   $("#inptDetectInternetInterval").jqxNumberInput({ width : 30, height : 25,  inputMode: 'simple', decimalDigits: 0 });

   CreateCheckBox('jqxDetectInternetEvenManuallyCb', 360, 25);

   $('#jqxDetectInternetCb').on('change', function (event)
   {
       var checked = event.args.checked;
       $("#inptDetectInternetPositive").jqxInput('disabled',!checked)
       $("#inptDetectInternetNegative").jqxInput('disabled',!checked)
       $("#inptDetectInternetInterval").jqxNumberInput('disabled',!checked)
       EnableCheckBox("jqxDetectInternetEvenManuallyCb",checked)
    });

   // Logs

   $("#jqxLoggingKindCombo").jqxDropDownList({ width : 400, height : 25 , selectedIndex: 3, autoDropDownHeight: true,
                       source:  [ 'No Logging','One Common Log File','Separate Log File For Each Profile',
                                  'Separate Log File For Each Run (Recommended)',
                                  'Separate Log File For Each Day (Per Profile)'] });

   $("#jqxTimerLoggingCombo").jqxDropDownList({ width : 130, height : 25 , selectedIndex: 0, autoDropDownHeight: true,
                       source:  [ 'Off','1 (least detailed)','2','3','4','5','6','7','8','9','10 (detailed)',
                                  '11','12','13','14','15','16','17','18','19','20 (extreme)'] });

   CreateCheckBox('jqxFAbbreviatedLogsCb', 150, 25);
   CreateCheckBox('jqxFLogTimingCb', 250, 25);
   CreateCheckBox('jqxFLogTimingDetailsCb', 200, 25);
   $('#jqxFLogTimingCb').on('change', function (event)
   {
      var checked = event.args.checked;
      EnableCheckBox('jqxFLogTimingDetailsCb', checked);
   });
   CreateCheckBox('jqxFLogTransferDetailsCb', 500, 25);
   CreateCheckBox('jqxCPLoggingCb', 350, 25);

   CreateCheckBox('jqxFDeleteNothingToDoLogsCb', 350, 25);

   $("#inptLogPath").jqxInput({ width : 600, height : 25 });
   $("#btnLogPathDirSelect").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnLogPathDirSelect').click(function () {
      InitDirTreeSelectForm($("#inptLogPath"));
    });

   $("#btnCleanUpLogFiles").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnCleanUpLogFiles').click(function () {
      window.open("logscleanup.php?token="+GClientToken);
    });

   $("#btnResetKnownSSHSSLServers").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnResetKnownSSHSSLServers').click(function () {
      window.open("resetknownservers.php?token="+GClientToken);
    });

   $("#btnForgetCloudTokens").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnForgetCloudTokens').click(function () {
      window.open("forgetcloudtokens.php?token="+GClientToken);
    });

   CreateCheckBox('jqxKeepLogFilesCb', 300, 25);
   $("#inptKeepLogFiles").jqxNumberInput({ width : 30, height : 25, inputMode: 'simple', decimalDigits: 0 });
    $('#jqxKeepLogFilesCb').on('change', function (event)
    {
       var checked = event.args.checked;
       $("#inptKeepLogFiles").jqxNumberInput('disabled',!checked)
       if (checked)
          if ( $("#inptKeepLogFiles").jqxNumberInput('val') == 0 )
             $("#inptKeepLogFiles").jqxNumberInput('val', 10 );

    });

   CreateCheckBox('jqxFIPLoggingCb', 200, 25);
   CreateCheckBox('jqxFLogSmartTrackingCb', 200, 25);
   CreateCheckBox('jqxFLogFileListCb', 200, 25);
   CreateCheckBox('jqxFDetailedSecurityLoggingCb', 200, 25);
   CreateCheckBox('jqxFLogTimestampsCb', 300, 25);
   CreateCheckBox('jqxFLogSharesCb', 200, 25);
   CreateCheckBox('jqxFLogSyntheticDetailsCb', 200, 25);
   CreateCheckBox('jqxFLogSpeedLimitCb', 200, 25);
   CreateCheckBox('jqxFWithThreadCPHistoryCb', 200, 25);
   CreateCheckBox('jqxFOutputFileListingsCb', 300, 25);

                        

    $("#inptiLogRealtimeStatusMinutes").jqxNumberInput({ width : 30, height : 25, inputMode: 'simple', decimalDigits: 0 });
    CreateCheckBox('jqxiLogRealtimeStatusMinutesCb', 280, 25);

    $('#jqxiLogRealtimeStatusMinutesCb').on('change', function (event)
    {
       var checked = event.args.checked;
       $("#inptiLogRealtimeStatusMinutes").jqxNumberInput('disabled',!checked);
       $("#jqxiLogRealtimeStatusLevelCombo").jqxDropDownList('disabled',!checked);
       if (checked )
          if ($("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val') == 0)
             $("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val', 10);

    });

    $("#jqxiLogRealtimeStatusLevelCombo").jqxDropDownList({ width : 100, height : 25, selectedIndex: 0, autoDropDownHeight: true,
                     source:  ['Less Info', 'More Info', 'Detailed', 'Extreme'] });
                        
    //Notify Tab
   CreateCheckBox('jqxSendEmailWhenTasksCompleteCb', 250, 25);

   CreateCheckBox('jqxManualEmailCb', 250, 25);
   CreateCheckBox('jqxScheduledEmailCb', 250, 25);
   CreateCheckBox('jqxEmailEmptyCb', 300, 25);
   CreateCheckBox('jqxEmailOnErrorOnlyCb', 350, 25);
   CreateCheckBox('jqxEmailWhenFileReplacedCb', 300, 25);
   CreateCheckBox('jqxEmailConflictCb', 300, 25);
   CreateCheckBox('jqxNoEmailIfRerunSucceedsCb', 300, 25);
   CreateCheckBox('jqxNoEmailIfVolumeMissingCb', 400, 25);
   CreateCheckBox('jqxEmailLogfileCb', 350, 25);
   CreateCheckBox('jqxEmailFilteredItemsCb', 350, 25);
   CreateCheckBox('jqxEmailSimpleSubjectCb', 350, 25);
   CreateCheckBox('jqxHTMLEmailCb', 470, 25);
   CreateCheckBox('jqxErrorsNotInDigestCb', 470, 25);
   CreateCheckBox('jqxEmailFilesCb', 350, 25);
   CreateCheckBox('jqxDigestCb', 250, 25);
   $("#jqxDigestIntervalCombo").jqxDropDownList({ width : 100, height : 25 , selectedIndex: 23,
              source:  [ '5 minutes', '10 minutes', '15 minutes', '20 minutes', '30 minutes',
                        '40 minutes', '45 minutes', '60 minutes', '90 minutes', '2 hours', '3 hours',
                        '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours',
                        '11 hours', '12 hours', '15 hours', '18 hours', '21 hours', 'day'] });

   CreateCheckBox('jqxEmailDailySummaryCb', 200, 25);
   $("#jqxDailySummaryTime_Input").jqxDateTimeInput({width: 100, height: 25, formatString: GShortTimeFormat, showCalendarButton: false, showTimeButton: true });
   $('#jqxEmailDailySummaryCb').on('change', function (event)
   {
       var checked = event.args.checked;
       $("#jqxDailySummaryTime_Input").jqxDateTimeInput('disabled',!checked);
       EnableCheckBox("jqxHTMLEmailCb", checked || GetCheckBoxValue("jqxSendEmailWhenTasksCompleteCb"));
   });

   $("#btnSendDailySummary").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnSendDailySummary').click(function ()
   {
      // save settings
      SendProgramSettingsToServer(false);

      window.open("senddailysummary.php?token="+GClientToken);
    });

   $("#btnSendTestMail").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnSendTestMail').click(function ()
    {
      // save settings
      SendProgramSettingsToServer(false);

      // send test mail
      window.open("sendtestmail.php?token="+GClientToken);
    });


   $("#jqxFirstDigestTime_Input").jqxDateTimeInput({width: 100, height: 25, formatString: GShortTimeFormat, showCalendarButton: false, showTimeButton: true });
   $("#jqxEmailModeForRetriesCombo").jqxDropDownList({ width : 375, height : 25 , selectedIndex: 0, autoDropDownHeight: true,
   source:
   ['Each failing run / attempt', 'Last Run Only', '1st run, then every other run', '2nd run, then every other run',
    '1st run and last run only',  '2nd run and last run only', '3rd run and last run only', '5th run and last run only',
    '10th run and last run only', '1st, 4th, 8th, 16th, 32nd run etc. until last run',
    '2nd, 5th, 10th, 20th, 40th run etc. until last run' , '3rd, 8th, 16th, 32nd run etc. until last run',
    '5th, 10th, 20th, 40th run etc. until last run',  '10th, 25th, 50th, 100th run etc. until last run'
    ] });

    $('#EmailSettings_btn_ProgramSettingsDlg').jqxButton({height: GBtnHeight, theme: 'energyblue'});

    GetHTMLintoVar('EmailSettingsDlg.html', 'EmailSettingsFormHTML');

    $('#EmailSettings_btn_ProgramSettingsDlg').on('click', function ()
    {
       $("#EmailSettingsDlg_div").html( EmailSettingsFormHTML );
       $('#jqxEmailSettingsDlg').jqxWindow({ maxWidth: 550,  width:550, maxHeight:450, height:450, autoOpen: false, isModal: true,
            theme: 'energyblue', animationType: 'slide' });
       $('#jqxEmailSettingsTabs').jqxTabs({ height:350, width: 500});

       $('#inptRecipientsText').jqxInput({ width : 450, height : 180 , value : G_EmailSettings_RecipientsText });
       $('#inptSenderName').jqxInput({ width : 200, height : 25 , value : G_EmailSettings_SenderName });
       $('#inptSenderEmail').jqxInput({ width : 200, height : 25 , value : G_EmailSettings_SenderEmail});
       $('#inptSMTPServer').jqxInput({ width : 200, height : 25 , value : G_EmailSettings_SMTPServer });
       $('#inptSMTPPort').jqxInput({ width : 200, height : 25 , value : G_EmailSettings_SMTPPort});
       $('#inptSMTPUser').jqxInput({ width : 200, height : 25 , value : G_EmailSettings_SMTPUser});
       $('#inptSMTPPassword').jqxPasswordInput({ width : 200, height : 25 });
       $('#inptSMTPPassword').jqxPasswordInput('val', G_EmailSettings_SMTPPassword);

       CreateCheckBox('jqxSMTPAuthCb', 250, 25);
       SetCheckBoxValue('jqxSMTPAuthCb', G_EmailSettings_SMTPAuth);
       CreateCheckBox('jqxSASLCb', 250, 25);
       SetCheckBoxValue('jqxSASLCb', G_EmailSettings_SASL);
       CreateCheckBox('jqxExplicitTLSCb', 250, 25);
       SetCheckBoxValue('jqxExplicitTLSCb', G_EmailSettings_ExplicitTLS);


       $("#jqxEmailSSLCombo").jqxDropDownList({ width : 100, height : 25 , selectedIndex: 0, autoDropDownHeight: true,
       source:  [
         'Insecure', 'TLS v1.1', 'TLS v1.2', 'TLS v1.3'] });
       $("#jqxEmailSSLCombo").jqxDropDownList('selectIndex', G_EmailSettings_EmailSSL);

       $('#EmailSettings_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
       $('#EmailSettings_OK_btn').on('click', function ()
        {
            ReadEmailSettingsFromDialog();

            $('#jqxEmailSettingsDlg').jqxWindow('close');

        });
       $('#EmailSettings_Cancel_btn').jqxButton({height: GBtnHeight,theme: 'energyblue'});
       $('#EmailSettings_Cancel_btn').on('click', function ()
        {


           $('#jqxEmailSettingsDlg').jqxWindow('close');
        });
       $('#jqxEmailSettingsDlg').jqxWindow('open');
    });



    function EnableDisableControlsNotifyTab(val)
    {
         EnableCheckBox("jqxManualEmailCb", val );
         EnableCheckBox("jqxScheduledEmailCb", val);
         EnableCheckBox("jqxEmailEmptyCb", val);
         EnableCheckBox("jqxEmailOnErrorOnlyCb", val);
         var LEmailOnErrorOnlyCb =  GetCheckBoxValue("jqxEmailOnErrorOnlyCb");

         EnableCheckBox("jqxEmailWhenFileReplacedCb", val && LEmailOnErrorOnlyCb);
         EnableCheckBox("jqxEmailConflictCb", val && LEmailOnErrorOnlyCb);
         EnableCheckBox("jqxNoEmailIfRerunSucceedsCb", val && LEmailOnErrorOnlyCb);

         EnableCheckBox("jqxNoEmailIfVolumeMissingCb", val);
         EnableCheckBox("jqxEmailLogfileCb", val);
         EnableCheckBox("jqxEmailFilteredItemsCb", val);
         EnableCheckBox("jqxEmailSimpleSubjectCb", val);
         EnableCheckBox("jqxHTMLEmailCb", val || GetCheckBoxValue("jqxEmailDailySummaryCb"));
         EnableCheckBox("jqxErrorsNotInDigestCb", val);
         EnableCheckBox("jqxEmailFilesCb", val);
         EnableCheckBox("jqxDigestCb", val);
         var LdisableDigest=!val || ! GetCheckBoxValue("jqxDigestCb");
         $("#jqxDigestIntervalCombo").jqxDropDownList('disabled', LdisableDigest);
         $("#jqxFirstDigestTime_Input").jqxDateTimeInput('disabled', LdisableDigest);
         $("#jqxEmailModeForRetriesCombo").jqxDropDownList('disabled', !val);
    }

    $('#jqxSendEmailWhenTasksCompleteCb').on('change', function (event)
    {
       var checked = event.args.checked;
       EnableDisableControlsNotifyTab(checked);
    });

    $('#jqxDigestCb').on('change', function (event)
    {
       EnableDisableControlsNotifyTab(GetCheckBoxValue("jqxSendEmailWhenTasksCompleteCb"));
    });
    $('#jqxEmailOnErrorOnlyCb').on('change', function (event)
    {
       EnableDisableControlsNotifyTab(GetCheckBoxValue("jqxSendEmailWhenTasksCompleteCb"));
    });

                        


    //tab Misc

$("#inptTempPath").jqxInput({ width : 300, height : 25  });
                        
   $("#btnTempPathSelect").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnTempPathSelect').click(function () {
      InitDirTreeSelectForm($("#inptTempPath"));
    });
                       
   $("#inptiShutdownWait").jqxNumberInput({ width : 30, height : 25 , inputMode: 'simple', decimalDigits: 0 });
           CreateCheckBox('jqxSchedulerCanPromptForVolumesCb', 600, 25);

           CreateCheckBox('jqxFailIfRemoteListingFailsCb', 400, 25);
           CreateCheckBox('jqxRealtimeKeepAliveSecondsCb', 400, 25);
           $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput({ width : 30, height : 25 , inputMode: 'simple', decimalDigits: 0 });
           $("#jqxRealtimeKeepAliveSecondsCb").on('change', function (event)
           {
                var checked = event.args.checked;
                $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput( 'disabled', !checked );
           });

  $("#inptRegName").jqxInput({ width : 300, height : 25  });
  $("#inptRegCode").jqxInput({ width : 300, height : 25  });

  $("#inptDateFormat").jqxInput({ width : 150, height : 25  });
  $("#inptTimeFormat").jqxInput({ width : 150, height : 25  });

  $('#ChangeLogin_btn_ProgramSettingsDlg').jqxButton({height: GBtnHeight, theme: 'energyblue'});

  $('#ChangeLogin_btn_ProgramSettingsDlg').on('click', function ()
    {
       $("#ChangeLoginDlg_div").html( ChangeLoginFormHTML );
       $('#jqxChangeLoginDlg').jqxWindow({ maxWidth: 225,  width:225, maxHeight:400, height:400, autoOpen: false, isModal: true,
            theme: 'energyblue', animationType: 'slide' });

       $('#inptOldApp_login').jqxInput({ width : 200, height : 25});
       $('#inptOldApp_password').jqxPasswordInput({ width : 200, height : 25 });
       $('#inptNewApp_login').jqxInput({ width : 200, height : 25});
       $('#inptNewApp_password').jqxPasswordInput({ width : 200, height : 25 });
       $('#inptRepeat_password').jqxPasswordInput({ width : 200, height : 25 });

       $('#ChangeLogin_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
       $('#ChangeLogin_OK_btn').on('click', function ()
        {
           if ($('#inptNewApp_password').jqxPasswordInput('val') !=
               $('#inptRepeat_password').jqxPasswordInput('val'))
           {
              alert('ERROR: The new passwords do not match.');
              return;
           }

            var sendparams = { };
            sendparams.token = GClientToken;

            sendparams['oldlogin'] = $("#inptOldApp_login").jqxInput('val');
            sendparams['oldpassword'] = $("#inptOldApp_password").jqxPasswordInput('val');
            sendparams['newlogin'] = $("#inptNewApp_login").jqxInput('val');
            sendparams['newpassword'] = $("#inptNewApp_password").jqxPasswordInput('val');

            $.post( "post_changelogin.php",JSON.stringify(sendparams)).done(
             function( data )
             {
                if( data == 'OK' )
                {
                  $('#jqxChangeLoginDlg').jqxWindow('close');
                  alert( "Successfully saved new login details for " + sendparams['newlogin']);
                  $('#jqxChangeLoginDlg').jqxWindow('destroy');
                }
                else
                {
                  alert( "Login change was unsuccessful: " + data);
                }
             });

        });
       $('#ChangeLogin_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
       $('#ChangeLogin_Cancel_btn').on('click', function ()
        {
           $('#jqxChangeLoginDlg').jqxWindow('close');
           $('#jqxChangeLoginDlg').jqxWindow('destroy');
        });
       $('#jqxChangeLoginDlg').jqxWindow('open');
    });

   $("#btnSetTimezone").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnSetTimezone').click(function ()
   {
      // Syncovery already knows the browser's timezone from the login
      window.open("btnSetTimezone.php?token="+GClientToken);
   });

   // Tab Advanced
   $("#inpti_iMaxThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
   $("#inpti_iSeparateProcesses").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
   $("#inpti_BufSize").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
   CreateCheckBox('jqxSplitAfterEntriesCb', 400, 25);
   $("#inpti_iSplitAfterEntries").jqxNumberInput({ width : 70, height : 25 , inputMode: 'simple', spinButtons: true, decimalDigits: 2 });
   $("#jqxSplitAfterEntriesCb").on('change', function (event)
    {
       var checked = event.args.checked;
       $("#inpti_iSplitAfterEntries").jqxNumberInput('disabled',!checked);
       if (checked)
          if ($("#inpti_iSplitAfterEntries").jqxNumberInput('val') == 0)
             $("#inpti_iSplitAfterEntries").jqxNumberInput('val', 2);

    });

   CreateCheckBox('jqxWithGlobalLimitsCb', 500, 25);
   CreateCheckBox('jqxUseGlobalSpeedLimitCb', 400, 25);
   $("#inptGlobalSpeedLimit").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 3 });

    function HandleGlobalSpeedDeps(event)
    {
       var checked = GetCheckBoxValue("jqxWithGlobalLimitsCb");
       var bothchecked = checked && GetCheckBoxValue("jqxUseGlobalSpeedLimitCb");
       EnableCheckBox("jqxUseGlobalSpeedLimitCb", checked);
       $("#inptGlobalSpeedLimit").jqxNumberInput('disabled',!bothchecked);
       if (bothchecked )
          if ($("#inptGlobalSpeedLimit").jqxNumberInput('val') == 0)
             $("#inptGlobalSpeedLimit").jqxNumberInput('val', 10);
    }
   $("#jqxWithGlobalLimitsCb").on('change', HandleGlobalSpeedDeps);
   $("#jqxUseGlobalSpeedLimitCb").on('change', HandleGlobalSpeedDeps);

   CreateCheckBox('jqxSyncIgnoreWeekdaysCb', 400, 25);
   if (GisSyncoveryLinux)
      $('#jqxSyncForceSeparateMonitorsCb').css({"display":"none"});
   else
      CreateCheckBox('jqxSyncForceSeparateMonitorsCb', 500, 25);
   CreateCheckBox('jqxUserSpecificMutexesCb', 600, 25);
   CreateCheckBox('jqxGlobal_Synapse_SBBSSL', 600, 25);
   CreateCheckBox('jqxWebStatusServerCb', 600, 25);

   $("#btnConfigureSSL").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
   $('#btnConfigureSSL').click(function () {
      window.open("sslconfig.php?token="+GClientToken);
    });

   if (GShowGuardianButtons)
   {
     $("#btnStartGuardian").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
     $('#btnStartGuardian').click(function () {
        $.post( "guardian.php","start");
      });

     $("#btnStopGuardian").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
     $('#btnStopGuardian').click(function () {
        $.post( "guardian.php","stop");
      });
   }
   else
   {
      $('#btnStartGuardian').css({"display":"none"});
      $('#btnStopGuardian').css({"display":"none"});
   }

   //tab // Types, Limits
   $("#inptGlobalExcludeMasks").jqxInput({ width : 500, height : 100  });
                                                                                                                                  
  $("#SyncGlobalMasksDontCopy_Mode").jqxRadioButton({groupName :"TypesLimits"});
  $("#SyncGlobalMasksIgnoreTotally_Mode").jqxRadioButton({groupName :"TypesLimits"});

  $("#inptNotToZipMasks").jqxInput({ width : 500, height : 100  });
  $("#inptNotForPartialMasks").jqxInput({ width : 500, height : 100  });
                       
  $("#inpt_MinPartialSize").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
  $("#inpt_IncompleteExtension").jqxInput({ width : 100, height : 25  });
                       
  // tab Cloud

  $("#inpt_S3PartSize").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
  $("#inpt_S3MaxUploadThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
    CreateCheckBox('jqxAcceptNewServers', 300, 25);

  //tab Database
  $("#inpt_DatabasePath").jqxInput({ width : 500, height : 25  });
  $("#btnDatabasePath").jqxButton({ height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
  $('#btnDatabasePath').click(function () {
      InitDirTreeSelectForm($("#inpt_DatabasePath"));
    });
  CreateCheckBox('jqxSyncNeverShareDatabaseCb', 400, 25);

  if (GisSyncoveryWindows)
  {
      $("#DBServerType_Embedded_Firebird_Mode").jqxRadioButton({groupName :"Database"});
         $("#DBServerType_Embedded_Firebird_Mode").on('change', EnableDisableBatabaseTab);
      $("#DBServerType_Standalone_Firebird_Local_Mode").jqxRadioButton({groupName :"Database"});
         $("#DBServerType_Standalone_Firebird_Local_Mode").on('change', EnableDisableBatabaseTab);
      $("#DBServerType_Standalone_Firebird_TCP_Mode").jqxRadioButton({groupName :"Database"});
         $("#DBServerType_Standalone_Firebird_Local_Mode").on('change', EnableDisableBatabaseTab);


      $("#inpt_DBServerUsername").jqxInput({ width : 100, height : 25  });
      $("#inpt_DBServerPassword").jqxInput({ width : 100, height : 25  });
      $("#inpt_DBServerAddress").jqxInput({ width : 100, height : 25  });

      $('#jqxCacheDBsRWAllUsersCb').css({"display":"none"});
  }
  else
  {
      CreateCheckBox('jqxCacheDBsRWAllUsersCb', 800, 25);
      $('#DBTable').css({"display":"none"});
      $('#DBTable2').css({"display":"none"});
  }

  function EnableDisableBatabaseTab(event)
  {
    var rbName = GetCheckedRadiobuttonName($("#DBServerType_Embedded_Firebird_Mode"), $("#DBServerType_Standalone_Firebird_Local_Mode"),
          $("#DBServerType_Standalone_Firebird_TCP_Mode"));
    $("#inpt_DBServerUsername").jqxInput('disabled', (rbName == 'DBServerType_Embedded_Firebird_Mode') );
    $("#inpt_DBServerPassword").jqxInput('disabled', (rbName == 'DBServerType_Embedded_Firebird_Mode') );
    $("#inpt_DBServerAddress").jqxInput('disabled', (rbName == 'DBServerType_Embedded_Firebird_Mode') || (rbName == 'DBServerType_Standalone_Firebird_Local_Mode') );
  }

   //tab Event Log
  CreateCheckBox('jqxEventLogServiceStartStopCb', 400, 25);
  CreateCheckBox('jqxEventLogSchedulerStartStopCb', 400, 25);
  CreateCheckBox('jqxEventLogServiceErrorCb', 400, 25);
  CreateCheckBox('jqxEventLogApplicationErrorCb', 400, 25);
  CreateCheckBox('jqxEventLogGeneralWarningsCb', 400, 25);
  CreateCheckBox('jqxEventLogProfileRunStartedCb', 400, 25);
  CreateCheckBox('jqxEventLogProfileCompletedWithoutECb', 400, 25);
  CreateCheckBox('jqxEventLogProfileCompletedWithECb', 400, 25);
  CreateCheckBox('jqxEventLogProfileGeneralECb', 400, 25);
  CreateCheckBox('jqxEventLogProfileRunWithWarningsCb', 400, 25);
  CreateCheckBox('jqxEventLogProfileModifiedByUserCb', 400, 25);

  // Performance
  CreateCheckBox('jqxCPUAffinityCPU0Cb', 80, 25);
  CreateCheckBox('jqxCPUAffinityCPU1Cb', 80, 25);
  CreateCheckBox('jqxCPUAffinityCPU2Cb', 80, 25);
  CreateCheckBox('jqxCPUAffinityCPU3Cb', 80, 25);

                      
  $("#jqxSyncThreadPriorityCombo").jqxDropDownList({ width : 100, height : 25 , selectedIndex: 0, autoDropDownHeight: true,
  source:  [
         'Idle', 'Lowest', 'Lower', 'Normal'] });
                           
  $("#inpt_iRemoteAndCacheScanningThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
  $("#inpt_iLocalScanningThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
  $("#inpt_iInternetScanningThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
  $("#inpt_iNetworkScanningThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                                                                                         
  //Certificates
  var data = [];
  if (Gcertificate_names != '')
     data = Gcertificate_names.split('\n');
  $("#inpt_certificates_certificates").jqxListBox({ width: 350, height: 150, source: data });
  $("#inpt_certificates_certificates").on('select',

        function (event) {
            var args = event.args;
            if (args) {
                var index = args.index;
                var item = args.item;
                var originalEvent = args.originalEvent;
                // get item's label and value.
                var label = item.label;
                var value = item.value;
                var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                $("#inpt_certificates_certname_forreference").jqxInput('value', value);
                var Acertificates_private_keyfiles = Gcertificates_private_keyfiles.split('\n');
                $("#inpt_certificates_private_keyfile").jqxInput('value', Acertificates_private_keyfiles[index]);
                var Acertificates_public_keyfiles = Gcertificates_public_keyfiles.split('\n');
                                    
                $("#inpt_certificates_public_keyfile").jqxInput('value', Acertificates_public_keyfiles[index]);
                                    
                //alert(value);
            }
          }
   );
   $("#inpt_certificates_certname_forreference").jqxInput({width: 350, height: 25});
   $("#inpt_certificates_private_keyfile").jqxInput({width: 350, height: 25});
   $("#inpt_certificates_public_keyfile").jqxInput({width: 350, height: 25});

    $('#Certificates_New_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Certificates_New_btn').on('click', function ()
    {
       $("#inpt_certificates_certname_forreference").jqxInput('value', '');
       $("#inpt_certificates_private_keyfile").jqxInput('value', '');
       $("#inpt_certificates_public_keyfile").jqxInput('value', '');
       $('#inpt_certificates_certificates').jqxListBox('clearSelection');
    });

    $('#Certificates_Add_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Certificates_Add_btn').on('click', function ()
    {
        var cert_name = $("#inpt_certificates_certname_forreference").jqxInput('value');
        if (cert_name != '')
        {
          var addedOK=false;
          if (Gcertificate_names != '')
          {
            var namesarr=Gcertificate_names.split('\n');

            if (namesarr.indexOf(cert_name)<0)
            {
              Gcertificate_names =  Gcertificate_names + '\n' + cert_name;
              Gcertificates_private_keyfiles =  Gcertificates_private_keyfiles + '\n' + $("#inpt_certificates_private_keyfile").jqxInput('value');

              Gcertificates_public_keyfiles = Gcertificates_public_keyfiles + '\n' + $("#inpt_certificates_public_keyfile").jqxInput('value');
              addedOK=true;
            }
            else
               alert("This certificate name already exists. Click Update to modify its details.");
          }
          else
          {
            Gcertificate_names = cert_name;
            Gcertificates_private_keyfiles =  $("#inpt_certificates_private_keyfile").jqxInput('value');
            Gcertificates_public_keyfiles = $("#inpt_certificates_public_keyfile").jqxInput('value');
            addedOK=true;
          }

          if (addedOK)
          {
            var data = Gcertificate_names.split('\n');
            $('#inpt_certificates_certificates').jqxListBox({source: data});
            var selectedIndex = data.indexOf(cert_name);
            if (selectedIndex>=0)
            {
               $('#inpt_certificates_certificates').jqxListBox('selectIndex',selectedIndex)
            }
          }
        }
    });

    $('#Certificates_Update_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Certificates_Update_btn').on('click', function ()
    {
       var selectedIndex = $('#inpt_certificates_certificates').jqxListBox('selectedIndex');
       var needselect = false;

       if (selectedIndex<0)
       {
          var data = Gcertificate_names.split('\n');
          selectedIndex = data.indexOf($("#inpt_certificates_certname_forreference").jqxInput('value'));
          needselect = (selectedIndex>=0);
       }

       if (selectedIndex != -1)
       {
          var data = Gcertificate_names.split('\n');
          data[selectedIndex] = $("#inpt_certificates_certname_forreference").jqxInput('value');
          Gcertificate_names = data.join('\n');

          var data = Gcertificates_private_keyfiles.split('\n');
          data[selectedIndex] = $("#inpt_certificates_private_keyfile").jqxInput('value');
          Gcertificates_private_keyfiles = data.join('\n');

          data = Gcertificates_public_keyfiles.split('\n');
          data[selectedIndex] = $("#inpt_certificates_public_keyfile").jqxInput('value');
          Gcertificates_public_keyfiles = data.join('\n');
          $('#inpt_certificates_certificates').jqxListBox({source: Gcertificate_names.split('\n')});
          $('#inpt_certificates_certificates').jqxListBox('selectIndex',selectedIndex)
       }
       else
          alert("Please select the certificate to update from the list.");
    });


    $('#Certificates_Remove_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Certificates_Remove_btn').on('click', function ()
    {
       var selectedIndex = $('#inpt_certificates_certificates').jqxListBox('selectedIndex');
       if( selectedIndex != -1 )
       {
          var data = Gcertificate_names.split('\n');
          data.splice(selectedIndex, 1);
          Gcertificate_names = data.join('\n');
          $("#inpt_certificates_certificates").jqxListBox('removeAt', selectedIndex );
          $("#inpt_certificates_certificates").jqxListBox('clearSelection');

          data = Gcertificates_private_keyfiles.split('\n');
          data.splice(selectedIndex, 1);
          Gcertificates_private_keyfiles = data.join('\n');

          data = Gcertificates_public_keyfiles.split('\n');
          data.splice(selectedIndex, 1);
          Gcertificates_public_keyfiles = data.join('\n');
       }
       else
          alert("Please select the certificate to remove from the list.");
    });


///////////////////////////////////////////////////////////////////

    $('#Cancel_btn_ProgramSettingsDlg').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

    $('#Cancel_btn_ProgramSettingsDlg').click(function () {

          $('#jqxProgramSettingsDlg').jqxWindow('close');
    });


    $('#OK_btn_ProgramSettingsDlg').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

    $('#OK_btn_ProgramSettingsDlg').click(function ()
    {
       SendProgramSettingsToServer(true);
     });


    $('#jqxProgramSettingsDlg').on('close', function (event)
    {
        $('#jqxProgramSettingsTabs').jqxTabs('destroy');
        $('#jqxProgramSettingsDlg').jqxWindow('destroy');
    });

   var ProgramSettingsSource =
   {
        datafields: [
            { name: 'id', type: 'number' },
            { name: 'SchedulerIdleStartupMinutes', type: 'number' },
            { name: 'DetectInternet', type: 'boolean' },
            { name: 'DetectInternetEvenManually', type: 'boolean' },
            { name: 'DetectInternetInterval', type: 'number' },

            { name: 'LoggingKind', type: 'decimal' },
            { name: 'FAbbreviatedLog', type: 'boolean' },
            { name: 'FLogTiming', type: 'boolean' },
            { name: 'CPLogging', type: 'boolean' },
            { name: 'FLogTimingDetails', type: 'boolean' },
            { name: 'FLogTransferDetails', type: 'boolean' },
            { name: 'LogPath', type: 'string' },
            { name: 'FIPLogging', type: 'boolean' },
            { name: 'FLogSmartTracking', type: 'boolean' },
            { name: 'FLogFileList', type: 'boolean' },
            { name: 'FDetailedSecurityLogging', type: 'boolean' },
            { name: 'FLogTimestamps', type: 'boolean' },
            { name: 'FLogShares', type: 'boolean' },
            { name: 'FLogSyntheticDetails', type: 'boolean' },
            { name: 'FLogSpeedLimit', type: 'boolean' },
            { name: 'FWithThreadCPHistory', type: 'boolean' },
            { name: 'FOutputFileListings', type: 'boolean' },
            { name: 'FDeleteNothingToDoLogs', type: 'boolean' },
            { name: 'iLogRealtimeStatusMinutes', type: 'number' },
            { name: 'iLogRealtimeStatusLevel', type: 'number' },
            { name: 'DetectInternetPositive', type: 'string' },
            { name: 'DetectInternetNegative', type: 'string' },

            { name: 'Email', type: 'boolean' },
            { name: 'ManualEmail', type: 'boolean' },
            { name: 'ScheduledEmail', type: 'boolean' },
            { name: 'EmailEmpty', type: 'boolean' },
            { name: 'EmailOnErrorOnly', type: 'boolean' },
            { name: 'EmailWhenFileReplaced', type: 'boolean' },
            { name: 'EmailConflict', type: 'boolean' },
            { name: 'NoEmailIfRerunSucceeds', type: 'boolean' },
            { name: 'NoEmailIfVolumeMissing', type: 'boolean' },
            { name: 'EmailLogfile', type: 'boolean' },
            { name: 'EmailFilteredItems', type: 'boolean' },
            { name: 'EmailSimpleSubject', type: 'boolean' },
            { name: 'HTMLEmail', type: 'boolean' },
            { name: 'ErrorsNotInDigest', type: 'boolean' },
            { name: 'EmailDailySummary', type: 'boolean' },
            { name: 'NoEmailIfVolumeMissing', type: 'boolean' },
            { name: 'EmailFiles', type: 'boolean' },
            { name: 'DigestInterval', type: 'decimal' },
            { name: 'EmailDailySummary', type: 'boolean' },
            { name: 'DailySummaryTime', type: 'string' },
            { name: 'FirstDigestTime', type: 'string' },
            { name: 'EmailModeForRetries', type: 'string' },
            { name: 'RecipientsText', type: 'string' },
            { name: 'SenderName', type: 'string' },
            { name: 'SenderEmail', type: 'string' },
            { name: 'SMTPServer', type: 'string' },
            { name: 'SMTPPort', type: 'string' },
            { name: 'SMTPUser', type: 'string' },
            { name: 'SMTPPassword', type: 'string' },
            { name: 'SMTPAuth', type: 'boolean' },
            { name: 'SASL', type: 'boolean' },
            { name: 'ExplicitTLS', type: 'boolean' },
            { name: 'EmailSSL', type: 'number' },
                { name: 'TempPath', type: 'string' },
                { name: 'iShutdownWait', type: 'number' },
            { name: 'SchedulerCanPromptForVolumes', type: 'boolean' },
            { name: 'AcceptNewServers', type: 'boolean' },
            { name: 'FailIfRemoteListingFails', type: 'boolean' },
            { name: 'iRealtimeKeepAliveSeconds', type: 'number' },
                          { name: 'iMaxThreads', type: 'number' },
                        { name: 'iSeparateProcesses', type: 'number' },
                        { name: 'BufSize', type: 'number' },
                        { name: 'iSplitAfterEntries', type: 'number' },
            { name: 'WithGlobalLimits', type: 'boolean' },
            { name: 'UseGlobalSpeedLimit', type: 'boolean' },
            { name: 'GlobalSpeedLimit', type: 'number' },
            { name: 'SyncIgnoreWeekdays', type: 'boolean' },
            { name: 'SyncForceSeparateMonitors', type: 'boolean' },
            { name: 'UserSpecificMutexes', type: 'boolean' },
            { name: 'Global_Synapse_SBBSSL', type: 'boolean' },
            { name: 'WebStatusServer', type: 'boolean' },
            { name: 'GlobalExcludeMasks', type: 'string' },
            { name: 'SyncGlobalMasksIgnoreTotally', type: 'boolean' },
            { name: 'NotToZipMasks', type: 'string' },
            { name: 'NotForPartialMasks', type: 'string' },
            { name: 'MinPartialSize', type: 'number' },
            { name: 'IncompleteExtension', type: 'string' },
            { name: 'S3PartSize', type: 'number' },
            { name: 'S3MaxUploadThreads', type: 'number' },
            { name: 'DatabasePath', type: 'string' },
            { name: 'SyncNeverShareDatabase', type: 'boolean' },
            { name: 'CacheDBsRWAllUsersCb', type: 'boolean' },
            { name: 'DBServerType', type: 'string' },
            { name: 'DBServerUsername', type: 'string' },
            { name: 'DBServerPassword', type: 'string' },
            { name: 'DBServerAddress', type: 'string' },
            { name: 'EventLogServiceStartStop', type: 'boolean' },
            { name: 'EventLogSchedulerStartStop', type: 'boolean' },
            { name: 'EventLogServiceError', type: 'boolean' },
            { name: 'EventLogApplicationError', type: 'boolean' },
            { name: 'EventLogGeneralWarnings', type: 'boolean' },
            { name: 'EventLogProfileRunStarted', type: 'boolean' },
            { name: 'EventLogProfileCompletedWithoutE', type: 'boolean' },
            { name: 'EventLogProfileCompletedWithE', type: 'boolean' },
            { name: 'EventLogProfileGeneralE', type: 'boolean' },
            { name: 'EventLogProfileRunWithWarnings', type: 'boolean' },
            { name: 'EventLogProfileModifiedByUser', type: 'boolean' },
            { name: 'CPUAffinityCPU0', type: 'boolean' },
            { name: 'CPUAffinityCPU1', type: 'boolean' },
            { name: 'CPUAffinityCPU2', type: 'boolean' },
            { name: 'CPUAffinityCPU3', type: 'boolean' },
            { name: 'SyncThreadPriority', type: 'number' },
            { name: 'iRemoteAndCacheScanningThreads', type: 'number' },
            { name: 'iLocalScanningThreads', type: 'number' },
            { name: 'iInternetScanningThreads', type: 'number' },
            { name: 'iNetworkScanningThreads', type: 'number' },

            { name: 'EncryptWhat', type: 'number' },
            { name: 'EncryptHow', type: 'number' },
            { name: 'SettingsPassword', type: 'string' },
            { name: 'StoreSettingsPassword', type: 'boolean' },
            { name: 'SettingsPasswordFile"', type: 'string' },

            ] ,

            datatype: "json",
            id: 'id',
            url: 'getprogram_settings.php?token='+GClientToken
    };


    var PsDataAdapter = new $.jqx.dataAdapter( ProgramSettingsSource,
    {
        downloadComplete: function (data, status, xhr)
               {
                  if (xhr.responseText == '{"error":"session_timeout"}')
                  {
                      window.location = '/index.html';
                      return;
                  }
                  else if (xhr.responseText == '{"error":"session_busy"}')
                  {
                      window.location = '/post_session_busy.php';
                      return;
                  }

                  if (xhr.responseText.substring(0,8) == '{"error"')
                  {
                     alert(xhr.responseText);
                     $('#jqxProgramSettingsDlg').jqxWindow('close');
                     return;
                  }
               },
        loadComplete: function (data) {
          $("#config_path").prepend(data.ConfigPath);
          SetCheckBoxValue('jqxConfigRWAllUsersCb', data.ConfigRWAllUsers == "true");


          $("#jqxEncryptWhatCombo").jqxDropDownList('selectedIndex', data.EncryptWhat );
          $("#jqxEncryptHowCombo").jqxDropDownList('selectedIndex', data.EncryptHow );

          $("#inpt_SettingsPassword").jqxInput('val', data.SettingsPassword);
          $("#inpt_SettingsPassword2").jqxInput('val', data.SettingsPassword);
          SetCheckBoxValue('jqxStoreSettingsPassword',data.StoreSettingsPassword=="true");
          $("#inpt_SettingsPasswordFile").jqxInput('val', data.SettingsPasswordFile);

          SetCheckBoxValue('jqxShedIdleTimeAfterStartupCb', data.SchedulerIdleStartupMinutes > 0);
          $("#inptShedIdleTimeAfterStartup").jqxNumberInput('val', data.SchedulerIdleStartupMinutes );

          SetCheckBoxValue('jqxDetectInternetCb', data.DetectInternet == "true" );
          $("#inptDetectInternetInterval").jqxNumberInput('val', data.DetectInternetInterval);
          SetCheckBoxValue('jqxDetectInternetEvenManuallyCb', data.DetectInternetEvenManually == "true");
          $("#jqxLoggingKindCombo").jqxDropDownList('selectedIndex', data.LoggingKind );
          $("#jqxTimerLoggingCombo").jqxDropDownList('selectedIndex', data.TimerLogging );
          SetCheckBoxValue('jqxFAbbreviatedLogsCb', data.FAbbreviatedLogs == "true");
          SetCheckBoxValue('jqxFLogTimingCb', data.FLogTiming == "true");
          SetCheckBoxValue('jqxFLogTimingDetailsCb', data.FLogTimingDetails == "true");
          SetCheckBoxValue('jqxFLogTransferDetailsCb', data.FLogTransferDetails == "true");
          SetCheckBoxValue('jqxCPLoggingCb', data.CPLogging == "true");
          $("#inptLogPath").jqxInput('val', data.LogPath);
          SetCheckBoxValue('jqxFIPLoggingCb', data.FIPLogging == "true");
          SetCheckBoxValue('jqxFLogSmartTrackingCb', data.FLogSmartTracking == "true");
          SetCheckBoxValue('jqxFLogFileListCb', data.FLogFileList == "true");
          SetCheckBoxValue('jqxFDetailedSecurityLoggingCb', data.FDetailedSecurityLogging == "true");
          SetCheckBoxValue('jqxFLogTimestampsCb', data.FLogTimestamps == "true");
          SetCheckBoxValue('jqxFLogSharesCb', data.FLogShares == "true");
          SetCheckBoxValue('jqxFLogSyntheticDetailsCb', data.FLogSyntheticDetails == "true");
          SetCheckBoxValue('jqxFLogSpeedLimitCb', data.FLogSpeedLimit == "true");
          SetCheckBoxValue('jqxFWithThreadCPHistoryCb', data.FWithThreadCPHistory == "true");
          SetCheckBoxValue('jqxFOutputFileListingsCb', data.FOutputFileListings == "true");
          SetCheckBoxValue('jqxFDeleteNothingToDoLogsCb', data.FDeleteNothingToDoLogs == "true");

          SetCheckBoxValue('jqxiLogRealtimeStatusMinutesCb', data.iLogRealtimeStatusMinutes > 0 );
          if (data.iLogRealtimeStatusMinutes==0)
             data.iLogRealtimeStatusMinutes = 10; // avoid 0 in disabled edit field
          $("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val', data.iLogRealtimeStatusMinutes);

          SetCheckBoxValue('jqxKeepLogFilesCb', data.iKeepLogFiles > 0 );
          if (data.iKeepLogFiles==0)
             data.iKeepLogFiles = 10; // avoid 0 in disabled edit field
          $("#inptKeepLogFiles").jqxNumberInput('val', data.iKeepLogFiles);

          $("#jqxiLogRealtimeStatusLevelCombo").jqxDropDownList( 'selectedIndex', data.iLogRealtimeStatusLevel );
          $("#inptDetectInternetPositive").jqxInput('val', data.DetectInternetPositive);
          $("#inptDetectInternetNegative").jqxInput('val', data.DetectInternetNegative);

          SetCheckBoxValue('jqxSendEmailWhenTasksCompleteCb', data.Email == "true");

          SetCheckBoxValue('jqxManualEmailCb', data.ManualEmail == "true");
          SetCheckBoxValue('jqxScheduledEmailCb', data.ScheduledEmail == "true");
          SetCheckBoxValue('jqxEmailOnErrorOnlyCb', data.EmailOnErrorOnly == "true");
          SetCheckBoxValue('jqxEmailEmptyCb', data.EmailEmpty == "true");

          SetCheckBoxValue('jqxEmailWhenFileReplacedCb', data.EmailWhenFileReplaced == "true");
          SetCheckBoxValue('jqxEmailConflictCb', data.EmailConflict == "true");
          SetCheckBoxValue('jqxNoEmailIfRerunSucceedsCb', data.NoEmailIfRerunSucceeds == "true");
          SetCheckBoxValue('jqxNoEmailIfVolumeMissingCb', data.NoEmailIfVolumeMissing == "true");
          SetCheckBoxValue('jqxEmailLogfileCb', data.EmailLogfile == "true");
          SetCheckBoxValue('jqxEmailFilteredItemsCb', data.EmailFilteredItems == "true");
          SetCheckBoxValue('jqxEmailSimpleSubjectCb', data.EmailSimpleSubject == "true");
          SetCheckBoxValue('jqxHTMLEmailCb', data.HTMLEmail == "true");
          SetCheckBoxValue('jqxErrorsNotInDigestCb', data.ErrorsNotInDigest == "true");
          SetCheckBoxValue('jqxEmailFilesCb', data.EmailFiles == "true");
          SetCheckBoxValue('jqxDigestCb', data.EmailDigest == "true");
          $("#jqxDigestIntervalCombo").jqxDropDownList('selectedIndex', data.DigestInterval );
          SetCheckBoxValue('jqxEmailDailySummaryCb', data.EmailDailySummary == "true");

          $("#jqxDailySummaryTime_Input").val( new Date(data.DailySummaryTime) );

          $("#jqxFirstDigestTime_Input").val( new Date(data.FirstDigestTime) );
          $("#jqxEmailModeForRetriesCombo").jqxDropDownList('selectedIndex', data.EmailModeForRetries );
          G_EmailSettings_RecipientsText = data.RecipientsText;
          G_EmailSettings_SenderName = data.SenderName;
          G_EmailSettings_SenderEmail = data.SenderEmail;
          G_EmailSettings_SMTPServer = data.SMTPServer;
          G_EmailSettings_SMTPPort = data.SMTPPort;
          G_EmailSettings_SMTPUser = data.SMTPUser;
          G_EmailSettings_SMTPPassword = data.SMTPPassword;
          G_EmailSettings_SMTPAuth = data.SMTPAuth;
          G_EmailSettings_SASL = data.SASL;
          G_EmailSettings_ExplicitTLS = data.ExplicitTLS;
          G_EmailSettings_EmailSSL = data.EmailSSL;

          $("#inptTempPath").jqxInput( 'val', data.TempPath );
          $("#inptiShutdownWait").jqxNumberInput('val', data.iShutdownWait );

              SetCheckBoxValue('jqxSchedulerCanPromptForVolumesCb', data.SchedulerCanPromptForVolumes == "true");

              SetCheckBoxValue('jqxFailIfRemoteListingFailsCb', data.FailIfRemoteListingFails == "true");
              SetCheckBoxValue('jqxRealtimeKeepAliveSecondsCb', data.iRealtimeKeepAliveSeconds > 0 );
              if (data.iRealtimeKeepAliveSeconds<30)
                 data.iRealtimeKeepAliveSeconds=30;
              $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput('val', data.iRealtimeKeepAliveSeconds);

          $("#license_status").prepend(data.RegInfo);
          $("#inptRegName").jqxInput( 'val', data.RegName );
          $("#inptRegCode").jqxInput( 'val', data.RegCode );

          $("#inptDateFormat").jqxInput( 'val', data.DateFormat );
          $("#inptTimeFormat").jqxInput( 'val', data.TimeFormat );

         $("#inpti_iMaxThreads").jqxNumberInput('val', data.iMaxThreads);
         $("#inpti_iSeparateProcesses").jqxNumberInput('val', data.iSeparateProcesses);
         $("#inpti_BufSize").jqxNumberInput('val', data.BufSize);

         if ((data.iSplitAfterEntries > 0) && (data.iSplitAfterEntries<MaxInt))
         {
            $("#inpti_iSplitAfterEntries").jqxNumberInput('val',data.iSplitAfterEntries/1000000);
            SetCheckBoxValue('jqxSplitAfterEntriesCb', true);
         }
         else
         {
            $("#inpti_iSplitAfterEntries").jqxNumberInput('val',2);
            SetCheckBoxValue('jqxSplitAfterEntriesCb', false);
         }

         SetCheckBoxValue('jqxWithGlobalLimitsCb', data.WithGlobalLimits == "true");
         SetCheckBoxValue('jqxUseGlobalSpeedLimitCb', data.UseGlobalSpeedLimit == "true");
         $("#inptGlobalSpeedLimit").jqxNumberInput('val', data.GlobalSpeedLimit );

         SetCheckBoxValue('jqxSyncIgnoreWeekdaysCb', data.SyncIgnoreWeekdays == "true");
         SetCheckBoxValue('jqxSyncForceSeparateMonitorsCb', data.SyncForceSeparateMonitors == "true");
         SetCheckBoxValue('jqxUserSpecificMutexesCb', data.UserSpecificMutexes == "true");
         SetCheckBoxValue('jqxWebStatusServerCb', data.WebStatusServer == "true");

         SetCheckBoxValue('jqxGlobal_Synapse_SBBSSL', data.Global_Synapse_SBBSSL == "true");

         $("#inptGlobalExcludeMasks").jqxInput('val', data.GlobalExcludeMasks);
         var GSyncGlobalMasksWidget = '';
         if( data.SyncGlobalMasksIgnoreTotally == 'true' )
            GSyncGlobalMasksWidget = 'SyncGlobalMasksIgnoreTotally_Mode';
         else
          GSyncGlobalMasksWidget = 'SyncGlobalMasksDontCopy_Mode';
          SetRadioGroupChecked( GSyncGlobalMasksWidget,   $("#SyncGlobalMasksDontCopy_Mode"),  $("#SyncGlobalMasksIgnoreTotally_Mode"), null, null, null, null );
          $("#inptNotToZipMasks").jqxInput('val', data.NotToZipMasks);
          $("#inptNotForPartialMasks").jqxInput('val', data.NotForPartialMasks);
          $("#inpt_MinPartialSize").jqxNumberInput('val', data.MinPartialSize / 1024);
          $("#inpt_IncompleteExtension").jqxInput('val', data.IncompleteExtension);
          $("#inpt_S3PartSize").jqxNumberInput('val', data.S3PartSize / 1024 / 1024);
          $("#inpt_S3MaxUploadThreads").jqxNumberInput('val', data.S3MaxUploadThreads);
          SetCheckBoxValue('jqxAcceptNewServers', data.AcceptNewServers == "true");
          $("#inpt_DatabasePath").jqxInput('val', data.DatabasePath);
          SetCheckBoxValue('jqxSyncNeverShareDatabaseCb', data.SyncNeverShareDatabase == "true");
          SetCheckBoxValue('jqxCacheDBsRWAllUsersCb', data.CacheDBsRWAllUsers == "true");
          if (GisSyncoveryWindows)
  {
          SetRadioGroupChecked(data.DBServerType, $("#DBServerType_Embedded_Firebird_Mode"), $("#DBServerType_Standalone_Firebird_Local_Mode"),
            $("#DBServerType_Standalone_Firebird_TCP_Mode") );

          $("#inpt_DBServerUsername").jqxInput('val', data.DBServerUsername);
          $("#inpt_DBServerPassword").jqxInput('val', data.DBServerPassword);
          $("#inpt_DBServerAddress").jqxInput('val', data.DBServerAddress);
          }

          SetCheckBoxValue('jqxEventLogServiceStartStopCb', data.EventLogServiceStartStop == "true");
          SetCheckBoxValue('jqxEventLogSchedulerStartStopCb', data.EventLogSchedulerStartStop == "true");
          SetCheckBoxValue('jqxEventLogServiceErrorCb', data.EventLogServiceError == "true");
          SetCheckBoxValue('jqxEventLogApplicationErrorCb', data.EventLogApplicationError == "true");
          SetCheckBoxValue('jqxEventLogGeneralWarningsCb', data.EventLogGeneralWarnings == "true");
          SetCheckBoxValue('jqxEventLogProfileRunStartedCb', data.EventLogProfileRunStarted == "true");
          SetCheckBoxValue('jqxEventLogProfileCompletedWithoutECb', data.EventLogProfileCompletedWithoutE == "true");
          SetCheckBoxValue('jqxEventLogProfileCompletedWithECb', data.EventLogProfileCompletedWithE == "true");
          SetCheckBoxValue('jqxEventLogProfileGeneralECb', data.EventLogProfileGeneralE == "true");
          SetCheckBoxValue('jqxEventLogProfileRunWithWarningsCb', data.EventLogProfileRunWithWarnings == "true");
          SetCheckBoxValue('jqxEventLogProfileModifiedByUserCb', data.EventLogProfileModifiedByUser == "true");

          SetCheckBoxValue('jqxCPUAffinityCPU0Cb', data.CPUAffinityCPU0 == "true");
          SetCheckBoxValue('jqxCPUAffinityCPU1Cb', data.CPUAffinityCPU1 == "true");
          SetCheckBoxValue('jqxCPUAffinityCPU2Cb', data.CPUAffinityCPU2 == "true");
          SetCheckBoxValue('jqxCPUAffinityCPU3Cb', data.CPUAffinityCPU3 == "true");
          $("#jqxSyncThreadPriorityCombo").jqxDropDownList('selectedIndex', data.SyncThreadPriority );

          $("#inpt_iRemoteAndCacheScanningThreads").jqxNumberInput('val', data.iRemoteAndCacheScanningThreads);
          $("#inpt_iLocalScanningThreads").jqxNumberInput('val', data.iLocalScanningThreads);
          $("#inpt_iInternetScanningThreads").jqxNumberInput('val', data.iInternetScanningThreads);
          $("#inpt_iNetworkScanningThreads").jqxNumberInput('val', data.iNetworkScanningThreads);

          $('#jqxProgramSettingsDlg').jqxWindow('focus');
        },
        loadError: function (xhr, status, error) {
          if( error == "")
            alert("Error. Connection with server might be lost.");
          else
            alert(error);
        }
    });

   $('#jqxProgramSettingsDlg').jqxWindow('open');
   PsDataAdapter.dataBind();
}
