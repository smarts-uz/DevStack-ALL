'use strict';

function m_DoInternetSettingsDialog(ProfileName, InternetProtocolRegistryList, LeftOrRight, ProtocolName, CurrentLeftRightEdit, RawPathURL)
{
  CheckError(ProfileName != '', 'm_DoInternetSettingsDialog: ProfileName param is Empty');
  CheckError(LeftOrRight != '', 'm_DoInternetSettingsDialog: LeftOrRight param is Empty');
  CheckError(ProtocolName != '', 'm_DoInternetSettingsDialog: ProtocolName param is Empty');
  CheckError(ProtocolName != undefined, 'm_DoInternetSettingsDialog: ProtocolName param is undefined');
  CheckError(CurrentLeftRightEdit != undefined, 'm_DoInternetSettingsDialog: CurrentLeftRightEdit param is undefined');
  CheckError(InternetProtocolRegistryList != undefined, 'm_DoInternetSettingsDialog: InternetProtocolRegistryList param is undefined');

  //if( ( ProtocolName == undefined ) || ( ProtocolName == "" ) || ( GetBaseProtocolName(ProtocolName) == '') )
  //  ProtocolName = "FTP";
  if (InternetProtocolRegistryList[indexOfListLoaded].ListLoaded == false)
  {
    //    GCurrentList = deepCopy( GInternetProtocolSetRegistryList );  //GInternetProtocolSetRegistryList.slice();//
    InitProtocolSettingsDatasource(GIntProtSetSource, ProfileName, LeftOrRight, ProtocolName);

    var IntProtSetDataAdapter = new $.jqx.dataAdapter(GIntProtSetSource,

      {
        loadComplete: function()
        {
          // get data records.
          if (IntProtSetDataAdapter.xhr.responseText == '{"error":"session_timeout"}')
          {
            window.location = '/index.html';
            return;
          }
          else if (IntProtSetDataAdapter.xhr.responseText == '{"error":"session_busy"}')
          {
            window.location = '/post_session_busy.php';
            return;
          }
          else if (IntProtSetDataAdapter.xhr.responseText.indexOf('{"error"') == 0)
          {
            alert(IntProtSetDataAdapter.xhr.responseText);
            return;
          }
          CheckError(IntProtSetDataAdapter.records.length < 2, 'm_DoInternetSettingsDialog: IntProtSetDataAdapter.records.length = ' + IntProtSetDataAdapter.records.length);
          if (IntProtSetDataAdapter.records.length == 1)
          {
            var a_record = IntProtSetDataAdapter.records[0];
            CheckError(ProtocolName != '', 'Mark 2  m_DoInternetSettingsDialog: ProtocolName param is Empty');
            var ControlAppGroup = GetBaseProtocolName(ProtocolName);
            CheckError(ControlAppGroup != '', 'm_DoInternetSettingsDialog: ControlAppGroup is Empty. ProtocolName:' + ProtocolName);
            CheckError(InternetProtocolRegistryList != undefined, 'm_DoInternetSettingsDialog: InternetProtocolRegistryList undefined');
            CheckError(a_record != undefined, 'm_DoInternetSettingsDialog: a_record undefined');

            LoadRecordToRegistryList(a_record, InternetProtocolRegistryList, ControlAppGroup);

          }
          else
          {
            //alert('Protocol ' + GProtocolName + ' is not supported in Web Interface yet. Sorry.');
            //GProtocolName = "FTP";
            GCurrentLeftRightRawURL = "";
            LoadDefaultsToRegistryList(InternetProtocolRegistryList, true);
          }
          m_InitProtocolSettingsForm(ProfileName, InternetProtocolRegistryList, LeftOrRight, ProtocolName, CurrentLeftRightEdit, RawPathURL)
          InternetProtocolRegistryList[indexOfListLoaded].ListLoaded = true;

        },
        loadError: function(jqXHR, status, error)
        {

          if (error == "")
            alert("Error. Connection with server might be lost.");
          else
            alert(error);

        }
      });

    IntProtSetDataAdapter.dataBind();
  }
  else
    m_InitProtocolSettingsForm(ProfileName, InternetProtocolRegistryList, LeftOrRight, ProtocolName, CurrentLeftRightEdit, RawPathURL)
}

var GProfileEditorForm = null;

function m_InitProfileEditorForm(p_ProfileName, CurrentProfileAction)
{
  try
  {
    if (GProfileEditorForm != null) // to avoid glitches when posting data
      GProfileEditorForm.jqxWindow('destroy');

    GCurrentProfileAction = CurrentProfileAction;

    GInternetProtocolSetLEFTRegistryList = [];
    GInternetProtocolSetRIGHTRegistryList = [];
    GInternetProtocolSetLEFTRegistryList = deepCopy(GInternetProtocolSetRegistryList);
    GInternetProtocolSetLEFTRegistryList[indexOfListLoaded].ListLoaded = false;

    GInternetProtocolSetRIGHTRegistryList = deepCopy(GInternetProtocolSetRegistryList);
    GInternetProtocolSetRIGHTRegistryList[indexOfListLoaded].ListLoaded = false;

    // now in synappglobals.js
    // GetHTMLintoVar('SmartTrackingSettingsDlg.html', 'HTML_SmartTrackingSettingsDlg');
    // GetHTMLintoVar('ExactMirrorSettingsDlg.html', 'HTML_ExactMirrorSettingsDlg');
    // GetHTMLintoVar('MoveSettingsDlg.html', 'HTML_MoveSettingsDlg');
    if (ProtocolSettingsFormHTML == '')
      GetHTMLintoVar('m_InternetSettingsForm.html', 'ProtocolSettingsFormHTML');

    $("#ProfileEditorForm_div").html(ProfileEditorFormHTML);

    $('#jqxProfileEditorForm').jqxWindow(
    {
      maxWidth: '100%',
      width: '100%',
      maxHeight: '100%',
      height: '100%',
      autoOpen: false,
      isModal: true,
      theme: 'energyblue',
      animationType: 'slide'
    });
    GProfileEditorForm = $('#jqxProfileEditorForm');

    LoadRegistryListToVariables(GProfileEditorRegistryList);

    Gb_MainBarOK = false;
    GbTabFiles = false;
    Gb_TabSpecial = false;
    GbTabsComparisonMoreCreated = false;
    GbTabFilesDeletions = false;
    GTabMasksGeneralFilters = false;
    GTabMasksFileAge = false;

    function OnInitNavBarContent(p_index)
    {
      function InitMainBar()
      {
        $('#OK_btn').jqxButton('disabled', false);

        LoadRegistryItemToControlByName('inptProfileName');
        LoadRegistryItemToControlByName('GLeftProtocolName');
        LoadRegistryItemToControlByName('GRightProtocolName');
        LoadRegistryItemToControlByName('GLeftStoredPath');
        LoadRegistryItemToControlByName('GRightStoredPath');

        CheckError(GLeftProtocolName != '', 'OnInitNavBarContent: GLeftProtocolName variable is Empty');
        CheckError(GLeftProtocolName != undefined, 'OnInitNavBarContent: GLeftProtocolName variable is undefined');
        CheckError(GRightProtocolName != '', 'OnInitNavBarContent: GRightProtocolName variable is Empty');
        CheckError(GRightProtocolName != undefined, 'OnInitNavBarContent: GRightProtocolName variable is undefined');

        $("#inptLeftHandSide").jqxInput(
        {
          width: $(window).width() - 40,
          height: 25
        }); //, theme: 'shinyblack'
        $("#inptLeftHandSide").jqxInput('val', GLeftStoredPath)

        $("#inptRightHandSide").jqxInput(
        {
          width: $(window).width() - 40,
          height: 25
        }); //, theme: 'shinyblack'
        $("#inptRightHandSide").jqxInput('val', GRightStoredPath);

        LoadRegistryItemToControlByName('jqxLeftToRightCb');
        $("#jqxLeftToRightCb").bind('change', m_syncOperationModeEnableDisable);
        LoadRegistryItemToControlByName('jqxRightToLeftCb');
        $("#jqxRightToLeftCb").bind('change', m_syncOperationModeEnableDisable);

        $('#InternetSettingsLeft_btn').jqxButton(
        {
          width: 100,
          height: 40
        });
        $('#InternetSettingsLeft_btn').on('click', function()
        {
          m_DoInternetSettingsDialog(p_ProfileName, GInternetProtocolSetLEFTRegistryList, 'left', GLeftProtocolName, $("#inptLeftHandSide"), GLeftStoredPath)
        });

        $('#InternetSettingsRight_btn').jqxButton(
        {
          width: 100,
          height: 40
        });
        $('#InternetSettingsRight_btn').on('click', function()
        {
          m_DoInternetSettingsDialog(p_ProfileName, GInternetProtocolSetRIGHTRegistryList, 'right', GRightProtocolName, $("#inptRightHandSide"), GRightStoredPath)
        });

        $("#NoneMode").jqxRadioButton(
        {
          groupName: "IncludeSubfoldersWidget"
        });
        $("#AllMode").jqxRadioButton(
        {
          groupName: "IncludeSubfoldersWidget"
        });
        $("#SelectedMode").jqxRadioButton(
        {
          groupName: "IncludeSubfoldersWidget"
        });
        LoadRegistryItemToControlByName('IncludeSubfoldersWidget');

        $("#Standard_Copying_Mode").jqxRadioButton(
        {
          groupName: "SyncOperationModeWidget"
        });
        $("#SmartTracking_Mode").jqxRadioButton(
        {
          groupName: "SyncOperationModeWidget"
        });
        $("#Exact_Mirror_Mode").jqxRadioButton(
        {
          groupName: "SyncOperationModeWidget"
        });
        $("#Move_Files_Mode").jqxRadioButton(
        {
          groupName: "SyncOperationModeWidget"
        });
        LoadRegistryItemToControlByName('SyncOperationModeWidget');

        $("#CopyModeConfigBtn").jqxButton(
        {
          theme: 'energyblue'
        });
        $('#CopyModeConfigBtn').click(function()
        {
          var Option = GetCheckedRadiobuttonName($("#Standard_Copying_Mode"), $("#SmartTracking_Mode"), $("#Exact_Mirror_Mode"), $("#Move_Files_Mode"), null, null);
          if (Option == "SmartTracking_Mode")
          {
            if (HTML_SmartTrackingSettingsDlg != '')
            {
              $("#HTML_SmartTrackingSettingsDlg_div").html(HTML_SmartTrackingSettingsDlg);

              setTimeout(m_ShowSmartTrackingSettingsDlg, 100);
            }

          }
          else if (Option == "Exact_Mirror_Mode")
          {

            if (HTML_ExactMirrorSettingsDlg != '')
            {
              $("#HTML_ExactMirrorSettingsDlg_div").html(HTML_ExactMirrorSettingsDlg);
              setTimeout(m_ShowExactMirrorSettingsDlg, 100);
            }

          }
          else if (Option == "Move_Files_Mode")
          {
            if (HTML_MoveSettingsDlg != '')
            {
              $("#HTML_MoveSettingsDlg_div").html(HTML_MoveSettingsDlg);
              setTimeout(m_ShowMoveSettingsDlg, 100);
            }
          }
        });

        GetHTMLintoVar('m_SmartTrackingSettingsDlg.html', 'HTML_SmartTrackingSettingsDlg');
        GetHTMLintoVar('m_ExactMirrorSettingsDlg.html', 'HTML_ExactMirrorSettingsDlg');
        GetHTMLintoVar('m_MoveSettingsDlg.html', 'HTML_MoveSettingsDlg');

        Gb_MainBarOK = true;

      }

      if (Gb_MainBarOK == false)
      {
        InitMainBar();
      }

      if (p_index == 1)
      {
        //Schedule
        LoadRegistryItemToControlByName('jqxScheduleThisProfileCb');
        $("#Run_Every_Day_Radio_Mode").jqxRadioButton(
        {});
        $("#Repeat_after_Radio_Mode").jqxRadioButton(
        {});
        $("#Repeat_monthly_Radio_Mode").jqxRadioButton(
        {});
        $("#Run_only_Once_Radio_Mode").jqxRadioButton(
        {});
        LoadRegistryItemToControlByName('RunModeRadiogroupWidget');
        LoadRegistryItemToControlByName('jqxRun_Every_Day_Time_Input');

        LoadRegistryItemToControlByName('inptScheduleDays');
        LoadRegistryItemToControlByName('inptScheduleHours');
        LoadRegistryItemToControlByName('inptScheduleMinutes');
        LoadRegistryItemToControlByName('inptScheduleSec');

        LoadRegistryItemToControlByName('jqxSpecifyNextRunCb');
        LoadRegistryItemToControlByName('jqxIntervalSpecificationCb');
        LoadRegistryItemToControlByName('jqxNextRunDay_Input');
        LoadRegistryItemToControlByName('jqxNextRunTime_Input');
      }
      else if (p_index == 2)
      {

        //Schedule More
        //$("#jqxScheduleRunUponWinLoginCb").jqxSwitchButton({ height: 27, width: 81,  checked: true });

        LoadRegistryItemToControlByName('jqxScheduleRunUponWinLoginCb');
        LoadRegistryItemToControlByName('jqxScheduleRunUponShutdownOrRebootCb');
        LoadRegistryItemToControlByName('jqxScheduleRunUponLogOutCb');
        LoadRegistryItemToControlByName('jqxScheduleRunMissedDaylyJobCb');
        LoadRegistryItemToControlByName('jqxScheduleAddRandomDelayUpToCb');
        LoadRegistryItemToControlByName('jqxAddRandomDelay_Time_Input');
        LoadRegistryItemToControlByName('jqxScheduleWarnIfProfileNotRunForCb');
        LoadRegistryItemToControlByName('jqxWarnIfProfileNotRunFor_Time_Input');

        LoadRegistryItemToControlByName('jqxUseAdditionalTimes1Cb');
        LoadRegistryItemToControlByName('jqxAdditionalTimes_Time_Input1');
        LoadRegistryItemToControlByName('jqxUseAdditionalTimes2Cb');
        LoadRegistryItemToControlByName('jqxAdditionalTimes_Time_Input2');
        LoadRegistryItemToControlByName('jqxUseAdditionalTimes3Cb');
        LoadRegistryItemToControlByName('jqxAdditionalTimes_Time_Input3');
        LoadRegistryItemToControlByName('jqxUseAdditionalTimes4Cb');
        LoadRegistryItemToControlByName('jqxAdditionalTimes_Time_Input4');

      }
      else if (p_index == 3)
      {

        //Schedule weekdays

        LoadRegistryItemToControlByName('jqxMondayCb');
        LoadRegistryItemToControlByName('jqxTuesdayCb');
        LoadRegistryItemToControlByName('jqxWednesdayCb');
        LoadRegistryItemToControlByName('jqxThursdayCb');
        LoadRegistryItemToControlByName('jqxFridayCb');
        LoadRegistryItemToControlByName('jqxSaturdayCb');
        LoadRegistryItemToControlByName('jqxSundayCb');
        LoadRegistryItemToControlByName('jqxRunOnlyBetweenCb');
        LoadRegistryItemToControlByName('jqxRunOnlyMinTime_Input');
        LoadRegistryItemToControlByName('jqxRunOnlyMaxTime_Input');
        LoadRegistryItemToControlByName('jqxIgnoreTimeWindowOnWeekendsCb');
        LoadRegistryItemToControlByName('jqxStopRunningProfilesCb');
        LoadRegistryItemToControlByName('jqxInterruptMiddleOfFileCb');
        bScheduleWeekdaysTabCreated = true;

      }
      else if (p_index == 4)
      {

        //Schedule Monitoring/Real-Time Sync
        LoadRegistryItemToControlByName('jqxRealTimeSynchronizationCb');
        LoadRegistryItemToControlByName('jqxRealContinuousSyncCb');
        /*$("#btnRealTimeSettings").jqxButton({ theme: 'energyblue' });
        $('#btnRealTimeSettings').click(function () {
            alert('not implemented');
            var client = new XMLHttpRequest();
            client.open('GET', '/RealTimeSettingsDlg.html');
            client.onreadystatechange = function()
            {
              if (client.readyState == XMLHttpRequest.DONE)
              {
               HTML_RealTimeSettingsDlg = client.responseText;
               $("#HTML_RealTimeSettingsDlg_div").html( HTML_RealTimeSettingsDlg );
               setTimeout(ShowRealTimeSettingsDlg, 100);
               }
            }
            client.send();

        });*/
        LoadRegistryItemToControlByName('jqxRealProfileAsSoonAsDriveAvailableCb');
        $("#Real_Once_Mode").jqxRadioButton(
        {});
        $("#Real_Repeatedly_Mode").jqxRadioButton(
        {});
        LoadRegistryItemToControlByName('Real_MonitoringRunOnlyOnceWidget');
        LoadRegistryItemToControlByName('jqx_RealMonitoringIntervalMinutes');
        LoadRegistryItemToControlByName('jqx_RealMonitoringIntervalSeconds');
        LoadRegistryItemToControlByName('jqxRealUseMinimumPauseCb');
        LoadRegistryItemToControlByName('jqx_RealPauseHoursInput');
        LoadRegistryItemToControlByName('jqx_RealPauseMinutesInput');
        LoadRegistryItemToControlByName('jqx_RealPauseSecondsInput');

      }
      else if (p_index == 5)
      {
        //Access & Retries-> File Access
        $("#Do_not_Use_Radio_Mode").jqxRadioButton(
        {});
        $("#Use_to_copy_locked_files_Radio_Mode").jqxRadioButton(
        {});
        $("#Use_for_all_files_Radio_Mode").jqxRadioButton(
        {});
        $("#Use_for_all_Create_Radio_Mode").jqxRadioButton(
        {});
        if (GisSyncoveryWindows)
          LoadRegistryItemToControlByName('VolumeShadowingRadiogroupWidget');
        LoadRegistryItemToControlByName('jqxFAIgnoreAccessDeniedFoldersCb');
        LoadRegistryItemToControlByName('jqxFAIgnoreAccessDeniedFilesCb');
        LoadRegistryItemToControlByName('jqxFAIgnoreMissingFilesCb');
        LoadRegistryItemToControlByName('jqxFAIgnoreLockedFilesOnDestCb');
        LoadRegistryItemToControlByName('jqxFAIgnoreDeletionErrorsCb');
        LoadRegistryItemToControlByName('jqxFAIgnoreDeletingFolderErrorsCb');
        LoadRegistryItemToControlByName('jqxFADatabaseSafeCopyCb');
        LoadRegistryItemToControlByName('jqxFATakeAdminOwnershipCb');
        LoadRegistryItemToControlByName('jqxFAVerifyOpeningPriorCopyCb');

      }
      else if (p_index == 6)
      {
        //Access & Retries-> Waiting & Retrying
        LoadRegistryItemToControlByName('jqxWRWaitForFileAccessCb');
        LoadRegistryItemToControlByName('inptWRWaitUpToMin');
        LoadRegistryItemToControlByName('jqxWRWaitIfTransferProblemCb');
        LoadRegistryItemToControlByName('jqxWRBuildingFileListCb');
        LoadRegistryItemToControlByName('jqxWRRunningTheProfileCb');
        $("#Re_Run_Once_Radio_Mode").jqxRadioButton(
        {});
        $("#Re_Run_Until_Success_Radio_Mode").jqxRadioButton(
        {});
        $("#Max_Re_Runs_Radio_Mode").jqxRadioButton(
        {});
        LoadRegistryItemToControlByName('WRReRunRadiogroupWidget');
        LoadRegistryItemToControlByName('inptWRMaxReRuns');
        LoadRegistryItemToControlByName('inptWRRetryAfter');
        LoadRegistryItemToControlByName('jqxWRAvoidRerunDueToLockedCb');

      }
      else if (p_index == 7)
      {
        //Comparison
        LoadRegistryItemToControlByName('jqxComparIgnoreSmallTimeDiffCb');
        LoadRegistryItemToControlByName('inptComparIgnoreSec');
        LoadRegistryItemToControlByName('jqxComparIgnoreExactHourTimeDiffCb');
        LoadRegistryItemToControlByName('inptComparIgnoreHours');
        LoadRegistryItemToControlByName('jqxComparIgnoreSecondsCb');
        LoadRegistryItemToControlByName('jqxComparIgnoreTimestampAlltogetherCb');
        LoadRegistryItemToControlByName('jqxComparAdjustTimestampOnlyCb');
        $("#Ask_Radio_Mode").jqxRadioButton(
        {});
        $("#Copy_Left_To_Right_Radio_Mode").jqxRadioButton(
        {});
        $("#Copy_Right_To_Left_Radio_Mode").jqxRadioButton(
        {});
        $("#Copy_Larger_Files_Radio_Mode").jqxRadioButton(
        {});
        LoadRegistryItemToControlByName('ComparWhenSizeIsDiffentRadiogroupWidget');

      }
      else if (p_index == 8)
      {
        //Comparison->More

        LoadRegistryItemToControlByName('jqxComparMoreAlwaysCopyFilesCb');
        LoadRegistryItemToControlByName('jqxComparStripReadOnlyAttrCb');
        LoadRegistryItemToControlByName('jqxComparMoreBinaryComparisonCb');
        LoadRegistryItemToControlByName('jqxComparMoreBinaryLeftSideCb');
        LoadRegistryItemToControlByName('jqxComparMoreBinaryRightSideCb');
        LoadRegistryItemToControlByName('jqxComparMoreFileAttributeComparisonCb');
        LoadRegistryItemToControlByName('jqxComparMoreFolderAttributeComparisonCb'); // Linux: = extended attr comparison
        LoadRegistryItemToControlByName('jqxComparMoreCaseSencivityCb');
        LoadRegistryItemToControlByName('jqxComparMoreFolderTimestampComparisonCb');
        LoadRegistryItemToControlByName('jqxComparMoreVerifySyncStatisticsCb');
        if (GisSyncoveryWindows)
          LoadRegistryItemToControlByName('jqxComparMoreDetectHardLinksCb');
        LoadRegistryItemToControlByName('jqxComparMoreEnforceHardLinksCb');
        GbTabsComparisonMoreCreated = true;

      }
      else if (p_index == 9)
      {
        //Files
        LoadRegistryItemToControlByName('jqxFilesDetectMovedFilesCb');

        $("#Files_Left_Radio_Mode").jqxRadioButton(
        {
          groupName: "FilesDetectMovedFilesRadiogroupWidget"
        });
        $("#Files_Right_Radio_Mode").jqxRadioButton(
        {
          groupName: "FilesDetectMovedFilesRadiogroupWidget"
        });
        $("#Files_Automatic_Radio_Mode").jqxRadioButton(
        {
          groupName: "FilesDetectMovedFilesRadiogroupWidget"
        });
        LoadRegistryItemToControlByName('FilesDetectMovedFilesRadiogroupWidget');
        LoadRegistryItemToControlByName('jqxFilesDetectRenamedFilesCb');
        LoadRegistryItemToControlByName('jqxFilesVerifyCopiedFilesCb');
        LoadRegistryItemToControlByName('jqxFilesReCopyOnceCb');
        LoadRegistryItemToControlByName('jqxFilesAutomaticallyResumeCb');
        LoadRegistryItemToControlByName('jqxFilesProtectFromBeingReplacedCb');
        LoadRegistryItemToControlByName('jqxFilesDoNotScanDestinationCb');
        LoadRegistryItemToControlByName('inptFilesNumberToCopyInparallel');
        LoadRegistryItemToControlByName('jqxFilesBypassFileBufferingLeftCb');
        LoadRegistryItemToControlByName('jqxFilesBypassFileBufferingRightCb');
        LoadRegistryItemToControlByName('inptFilesSplitLargeFiles');

        $("#jqxFilesDetectMovedFilesCb").bind('change', m_EnableDisableFiles);
        $("#jqxFilesVerifyCopiedFilesCb").bind('change', m_EnableDisableFiles);
        $("#jqxFilesMore_SpeedLimit").bind('change', m_EnableDisableFiles);
        $("#jqxFilesMore_CheckDestinationFile").bind('change', m_EnableDisableFiles);

        GbTabFiles = true;

      }
      else if (p_index == 10)
      {

        //Files Deletions
        LoadRegistryItemToControlByName('jqxFilesDeletions_OverwrittenFiles');
        LoadRegistryItemToControlByName('jqxFilesDeletions_DeletedFiles');
        LoadRegistryItemToControlByName('jqxFilesDeletions_MoveFilesToSFolder');
        $("#btnFiles_EditPaths").jqxButton(
        {
          height: 30,
          width: 100,
          theme: 'energyblue'
        });
        $('#btnFiles_EditPaths').click(function()
        {

          var client = new XMLHttpRequest();
          client.open('GET', '/m_FoldersForDeletedFiles.html');
          client.onreadystatechange = function()
          {
            if (client.readyState == XMLHttpRequest.DONE)
            {
              HTML_FoldersForDeletedFilesDlg = client.responseText;
              if (HTML_FoldersForDeletedFilesDlg != '')
              {
                 $("#HTML_FoldersForDeletedFilesDlg_div").html(HTML_FoldersForDeletedFilesDlg);
                 setTimeout(ShowFoldersForDeletedFilesDlg, 100);
              }
            }
          }
          client.send();

        });
        LoadRegistryItemToControlByName('jqxFilesDeletions_DeleteOlderVersionsPermamently');
        LoadRegistryItemToControlByName('jqxFilesDeletions_DoubleCheckNonExistence');
        LoadRegistryItemToControlByName('jqxFilesDeletions_NeverDelete');
        LoadRegistryItemToControlByName('jqxFilesDeletions_DeleteBeforeCopying');
        GbTabFilesDeletions = true;

      }
      else if (p_index == 11)
      {
        //Files More
        if (GisSyncoveryWindows)
          LoadRegistryItemToControlByName('jqxFilesMore_UseWindowsApi');
        LoadRegistryItemToControlByName('jqxFilesMore_CopyOnlyFilesPerRun');
        LoadRegistryItemToControlByName('inptFilesMore_FilesPerRun');
        LoadRegistryItemToControlByName('jqxFilesMore_CopyOnlyMBPerRun');
        LoadRegistryItemToControlByName('inptFilesMore_MBPerRun');
        LoadRegistryItemToControlByName('jqxFilesMore_SpeedLimit');
        LoadRegistryItemToControlByName('inptFilesMore_SpeedLimit');
        LoadRegistryItemToControlByName('jqxFilesMore_CopiedFilesSysTime');
        LoadRegistryItemToControlByName('jqxFilesMore_NeverReplace');
        LoadRegistryItemToControlByName('jqxFilesMore_DontAddAnyFiles');
        LoadRegistryItemToControlByName('jqxFilesMore_AlwaysAppend');
        LoadRegistryItemToControlByName('jqxFilesMore_IgnoreGlobalSpeedLimit');
        LoadRegistryItemToControlByName('jqxFilesMore_AlwaysConsider');
        LoadRegistryItemToControlByName('jqxFilesMore_AndCompareFileDetails');
        LoadRegistryItemToControlByName('jqxFilesMore_CheckDestinationFile');
        LoadRegistryItemToControlByName('jqxFilesMore_PreserveLastAccessOnSource');
      }
      else if (p_index == 12)
      {
        //Folders
        LoadRegistryItemToControlByName('jqxFolders_CreateEmptyFolders');
        LoadRegistryItemToControlByName('jqxFolders_UseIntermediateLocationCb');
        var b_ShowFoldersIntermediateLocationDlg = false;
        $('#jqxFolders_UseIntermediateLocationCb').jqxSwitchButton('checked', GIntermediateRightPath != "");

        LoadRegistryItemToControlByName('jqxFolders_RemoveEmptiedFolders');
        LoadRegistryItemToControlByName('jqxFolders_OnRightSideCreateFolderEachTime');

        $("#jqxFolders_OnRightSideCreateFolderEachTime").bind('change', m_EnableDisableFolders);

        LoadRegistryItemToControlByName('jqxFolders_IncludeTimeOfDay');

        LoadRegistryItemToControlByName('jqxFolders_FlatRightSide');

        $("#jqxFolders_FlatRightSide").bind('change', m_EnableDisableFolders);

        LoadRegistryItemToControlByName('jqxFolders_CopyLatestFileIfExists');
        LoadRegistryItemToControlByName('jqxFolders_EnsureFolderTimestamps');

        function OnFoldersBarCreate()
        {

          function m_ShowFoldersIntermediateLocationDlg()
          {
            if (b_ShowFoldersIntermediateLocationDlg == false)
            {
              b_ShowFoldersIntermediateLocationDlg = true;
              return;
            }
            $("#HTML_FoldersIntermediateLocationDlg_div").html(HTML_FoldersIntermediateLocationDlg);

            $('#jqxFoldersIntermediateLocationDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide'
            });

            $("#inptIntermediateRightPath").jqxInput(
            {
              width: 180,
              height: 25
            });
            $("#inptIntermediateRightPath").jqxInput('val', GIntermediateRightPath);

            $('#jqxFolders_ContinueAfterInterimIncomplete').jqxSwitchButton(
            {
              checked: GFolders_ContinueAfterInterimIncomplete
            });

            $('#FoldersIntermLocation_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#FoldersIntermLocation_OK_btn').click(function()
            {
              GIntermediateRightPath = $("#inptIntermediateRightPath").jqxInput('val');
              GFolders_ContinueAfterInterimIncomplete = $('#jqxFolders_ContinueAfterInterimIncomplete').jqxSwitchButton('checked');

              $('#jqxFoldersIntermediateLocationDlg').jqxWindow('destroy');
              $('#jqxFolders_UseIntermediateLocationCb').jqxSwitchButton('checked', GIntermediateRightPath != "");
              b_ShowFoldersIntermediateLocationDlg = false;

              //$('#jqxFoldersIntermediateLocationDlg').jqxWindow('close');

            });

            $('#FoldersIntermLocation_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#FoldersIntermLocation_Cancel_btn').click(function()
            {
              $('#jqxFoldersIntermediateLocationDlg').jqxWindow('destroy');
              $('#jqxFolders_UseIntermediateLocationCb').jqxSwitchButton('checked', GIntermediateRightPath != "");
              b_ShowFoldersIntermediateLocationDlg = false;
            });

            $('#jqxFoldersIntermediateLocationDlg').jqxWindow('open');

          }

          $("#jqxFolders_UseIntermediateLocationCb").bind('change', m_ShowFoldersIntermediateLocationDlg);
        };

        GetHTMLintoVar('m_FoldersIntermediateLocationDlg.html', 'HTML_FoldersIntermediateLocationDlg');
        setTimeout(OnFoldersBarCreate, 200);

      }
      else if (p_index == 13)
      {
        //Job
        LoadRegistryItemToControlByName('jqxJob_ExecuteCommand');
        var b_ShowExecuteBeforeAfterDlg = false;
        $("#jqxJob_ExecuteCommand").jqxSwitchButton('checked', (GJob_ExecuteBefore != "") || (GJob_ExecuteAfter != ""));
        LoadRegistryItemToControlByName('jqxJob_ShowCheckboxesInPreview');
        LoadRegistryItemToControlByName('jqxJob_OverrideEmailSettings');
        var b_ShowEmailSettingsDlg = false;
        $("#jqxJob_OverrideEmailSettings").jqxSwitchButton('checked', GJob_NoEmail || GJob_EmailAlways || GJob_NoLogFileAttach ||
          GJob_EmailDontAttachFile || GJob_EmailOnlyWhenError || GJob_EmailIfNothing || GJob_NoDriveMissingEmail ||
          (GJob_EmailFilesOverride != 'cbGrayed') || GJob_AddRecipients || (GJob_OverrideRecipients != ""));

        LoadRegistryItemToControlByName('jqxJob_CheckFreeSpaceBeforeCopying');
        LoadRegistryItemToControlByName('jqxJob_RunAsUser');
        LoadRegistryItemToControlByName('jqxJob_IgnoreInternetConnectivityCheck');
        LoadRegistryItemToControlByName('jqxJob_NetworkConnections');
        var b_Show_Job_NetworkConnectionsDlg = false;
        $("#jqxJob_NetworkConnections").jqxSwitchButton('checked', GJob_MakeConnection1 || GJob_MakeConnection2);
        LoadRegistryItemToControlByName('jqxJob_RunOnlyIfNeitherSideEmpty');
        LoadRegistryItemToControlByName('jqxJob_WhenRunViaScheduler');
        LoadRegistryItemToControlByName('jqxJob_WhenRunManuallyUnattended');
        LoadRegistryItemToControlByName('jqxJob_WhenRunManuallyAttended');

        $("#Job_Threads_Default_Radio_Mode").jqxRadioButton(
        {
          groupName: "JobFilesThreadsRadiogroupWidget"
        });
        $("#Job_Threads_Custom_Radio_Mode").jqxRadioButton(
        {
          groupName: "JobFilesThreadsRadiogroupWidget"
        });

        LoadRegistryItemToControlByName('JobFilesThreadsRadiogroupWidget');
        LoadRegistryItemToControlByName('inptScanningThreads');

        function OnJobBarCreate()
        {
          GetHTMLintoVar('m_ExecuteBeforeAfterDlg.html', 'HTML_ExecuteBeforeAfterDlg');
          GetHTMLintoVar('m_Job_EmailSettingsDlg.html', 'HTML_Job_EmailSettingsDlg');
          GetHTMLintoVar('m_RunAsUserDlg.html', 'HTML_RunAsUserDlg');
          GetHTMLintoVar('m_Job_NetworkConnectionsDlg.html', 'HTML_Job_NetworkConnectionsDlg');
          GetHTMLintoVar('m_Job_ExternalCopyToolDlg.html', 'HTML_Job_ExternalCopyToolDlg');

          function m_ShowExecuteBeforeAfterDlg()
          {
            if (b_ShowExecuteBeforeAfterDlg == false)
            {
              b_ShowExecuteBeforeAfterDlg = true;
              return;
            }
            $("#HTML_ExecuteBeforeAfterDlg_div").html(HTML_ExecuteBeforeAfterDlg);
            $('#jqxExecuteBeforeAfterDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide'
            });
            $("#inptJob_ExecuteBefore").jqxInput(
            {
              width: 250,
              height: 25
            });
            $("#inptJob_ExecuteBefore").jqxInput('val', GJob_ExecuteBefore);

            $("#inptJob_ExecuteAfter").jqxInput(
            {
              width: 250,
              height: 25
            });
            $("#inptJob_ExecuteAfter").jqxInput('val', GJob_ExecuteAfter);

            $('#JobExecuteBeforeAfter_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#JobExecuteBeforeAfter_OK_btn').click(function()
            {
              GJob_ExecuteBefore = $("#inptJob_ExecuteBefore").jqxInput('val');
              GJob_ExecuteAfter = $("#inptJob_ExecuteAfter").jqxInput('val');
              $('#jqxExecuteBeforeAfterDlg').jqxWindow('destroy');
              $("#jqxJob_ExecuteCommand").jqxSwitchButton('checked', (GJob_ExecuteBefore != "") || (GJob_ExecuteAfter != ""));
              b_ShowExecuteBeforeAfterDlg = false;
            });

            $('#JobExecuteBeforeAfter_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#JobExecuteBeforeAfter_Cancel_btn').click(function()
            {

              $('#jqxExecuteBeforeAfterDlg').jqxWindow('destroy');
            });

            $('#jqxExecuteBeforeAfterDlg').jqxWindow('open');
          };

          function m_ShowEmailSettingsDlg()
          {
            if (b_ShowEmailSettingsDlg == false)
            {
              b_ShowEmailSettingsDlg = true;
              return;
            }
            $("#HTML_Job_EmailSettingsDlg_div").html(HTML_Job_EmailSettingsDlg);
            $('#jqxJob_EmailSettingsDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide'
            });

            $("#jqxJob_NoEmailCb").jqxSwitchButton(
            {
              checked: GJob_NoEmail
            });
            $("#jqxJob_EmailAlwaysCb").jqxSwitchButton(
            {
              checked: GJob_EmailAlways
            });
            $("#jqxJob_NoLogFileAttachCb").jqxSwitchButton(
            {
              checked: GJob_NoLogFileAttach
            });
            $("#jqxJob_EmailDontAttachFileCb").jqxSwitchButton(
            {
              checked: GJob_EmailDontAttachFile
            });
            $("#jqxJob_EmailOnlyWhenErrorCb").jqxSwitchButton(
            {
              checked: GJob_EmailOnlyWhenError
            });
            $("#jqxJob_EmailIfNothingCb").jqxSwitchButton(
            {
              checked: GJob_EmailIfNothing
            });
            $("#jqxJob_NoDriveMissingEmailCb").jqxSwitchButton(
            {
              checked: GJob_NoDriveMissingEmail
            });
            $("#jqxJob_EmailFilesOverrideCb").jqxSwitchButton(
            {}); //{hasThreeStates:true}

            if (GJob_EmailFilesOverride == 'cbGrayed')
              $("#jqxJob_EmailFilesOverrideCb").jqxSwitchButton('checked', null)
            else if (GJob_EmailFilesOverride == 'cbChecked')
              $("#jqxJob_EmailFilesOverrideCb").jqxSwitchButton('checked', true)
            else if (GJob_EmailFilesOverride == 'cbUnchecked')
              $("#jqxJob_EmailFilesOverrideCb").jqxSwitchButton('checked', false)

            $("#jqxJob_AddRecipientsCb").jqxSwitchButton(
            {
              checked: GJob_AddRecipients
            });

            $("#inptOverrideRecipientsMemo").jqxTextArea(
            {
              width: 300,
              height: 30
            });
            $("#inptOverrideRecipientsMemo").jqxTextArea('val', GJob_OverrideRecipients);

            $('#Job_EmailSettings_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_EmailSettings_btn').click(function()
            {
              GJob_NoEmail = $("#jqxJob_NoEmailCb").jqxSwitchButton('checked');
              GJob_EmailAlways = $("#jqxJob_EmailAlwaysCb").jqxSwitchButton('checked');
              GJob_NoLogFileAttach = $("#jqxJob_NoLogFileAttachCb").jqxSwitchButton('checked');
              GJob_EmailDontAttachFile = $("#jqxJob_EmailDontAttachFileCb").jqxSwitchButton('checked');
              GJob_EmailOnlyWhenError = $("#jqxJob_EmailOnlyWhenErrorCb").jqxSwitchButton('checked');
              GJob_EmailIfNothing = $("#jqxJob_EmailIfNothingCb").jqxSwitchButton('checked');
              GJob_NoDriveMissingEmail = $("#jqxJob_NoDriveMissingEmailCb").jqxSwitchButton('checked');

              if ($("#jqxJob_EmailFilesOverrideCb").jqxSwitchButton('checked') == null)
                GJob_EmailFilesOverride = 'cbGrayed';
              else if ($("#jqxJob_EmailFilesOverrideCb").jqxSwitchButton('checked') == true)
                GJob_EmailFilesOverride = 'cbChecked';
              else if ($("#jqxJob_EmailFilesOverrideCb").jqxSwitchButton('checked') == false)
                GJob_EmailFilesOverride = 'cbUnchecked';

              GJob_AddRecipients = $("#jqxJob_AddRecipientsCb").jqxSwitchButton('checked');
              GJob_OverrideRecipients = $("#inptOverrideRecipientsMemo").jqxTextArea('val');

              $("#jqxJob_OverrideEmailSettings").jqxSwitchButton('checked', GJob_NoEmail || GJob_EmailAlways || GJob_NoLogFileAttach ||
                GJob_EmailDontAttachFile || GJob_EmailOnlyWhenError || GJob_EmailIfNothing || GJob_NoDriveMissingEmail ||
                (GJob_EmailFilesOverride != 'cbGrayed') || GJob_AddRecipients || (GJob_OverrideRecipients != ""));
              $('#jqxJob_EmailSettingsDlg').jqxWindow('destroy');
              b_ShowEmailSettingsDlg = false;
            });

            $('#Job_EmailSettings_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_EmailSettings_Cancel_btn').click(function()
            {

              $('#jqxJob_EmailSettingsDlg').jqxWindow('destroy');
            });

            $('#jqxJob_EmailSettingsDlg').jqxWindow('open');
          }

          function m_ShowHTML_RunAsUserDlg()
          {

            $("#HTML_RunAsUserDlg_div").html(HTML_RunAsUserDlg);
            $('#jqxRunAsUserDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide'
            });

            $("#inptJob_RunAsUser").jqxInput(
            {
              width: 280,
              height: 25
            });
            $("#inptJob_RunAsUser").jqxInput('val', GJob_RunAsUser);

            $("#inptJob_RunAsDomain").jqxInput(
            {
              width: 280,
              height: 25
            });
            $("#inptJob_RunAsDomain").jqxInput('val', GJob_RunAsDomain);

            $("#inptJob_RunAsPassword").jqxPasswordInput(
            {
              width: 280,
              height: 25
            });
            $("#inptJob_RunAsPassword").jqxInput('val', GJob_RunAsPassword);

            $('#JobRunAsUser_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#JobRunAsUser_OK_btn').click(function()
            {
              GJob_RunAsUser = $("#inptJob_RunAsUser").jqxInput('val');
              GJob_RunAsDomain = $("#inptJob_RunAsDomain").jqxInput('val');
              GJob_RunAsPassword = $("#inptJob_RunAsPassword").jqxPasswordInput('val');

              $('#jqxRunAsUserDlg').jqxWindow('destroy');

            });

            $('#JobRunAsUser_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#JobRunAsUser_Cancel_btn').click(function()
            {

              $('#jqxRunAsUserDlg').jqxWindow('destroy');
            });

            $('#jqxRunAsUserDlg').jqxWindow('open');
          };

          function m_Show_Job_NetworkConnectionsDlg()
          {
            if (b_Show_Job_NetworkConnectionsDlg == false)
            {
              b_Show_Job_NetworkConnectionsDlg = true;
              return;
            }
            $("#HTML_Job_NetworkConnectionsDlg_div").html(HTML_Job_NetworkConnectionsDlg);

            $('#jqxJob_NetworkConnectionsDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide'
            });
            $("#jqxJobMakeConnection1Cb").jqxSwitchButton(
            {
              checked: GJob_MakeConnection1
            });
            $("#jqxJobMakeConnection2Cb").jqxSwitchButton(
            {
              checked: GJob_MakeConnection2
            });
            $("#jqxJobReconnect1Cb").jqxSwitchButton(
            {
              checked: GJobReconnect1
            });
            $("#jqxJobReconnect2Cb").jqxSwitchButton(
            {
              checked: GJobReconnect2
            });
            $("#jqxJobDisconnect1Cb").jqxSwitchButton(
            {
              checked: GJobDisconnect1
            });
            $("#jqxJobDisconnect2Cb").jqxSwitchButton(
            {
              checked: GJobDisconnect2
            });

            $("#inptJobNetworkPath1").jqxInput(
            {
              width: 150,
              height: 25
            });
            $("#inptJobNetworkPath1").jqxInput('val', GJobNetworkPath1);
            $("#inptJobNetworkPath2").jqxInput(
            {
              width: 150,
              height: 25
            });
            $("#inptJobNetworkPath2").jqxInput('val', GJobNetworkPath2);

            $("#inptJobNetworkUsername1").jqxInput(
            {
              width: 150,
              height: 25
            });
            $("#inptJobNetworkUsername1").jqxInput('val', GJobNetworkUsername1);
            $("#inptJobNetworkUsername2").jqxInput(
            {
              width: 150,
              height: 25
            });
            $("#inptJobNetworkUsername2").jqxInput('val', GJobNetworkUsername2);

            $("#inptJobNetworkPassword1").jqxPasswordInput(
            {
              width: 138,
              height: 25
            });
            $("#inptJobNetworkPassword1").jqxPasswordInput('val', GJobNetworkPassword1);
            $("#inptJobNetworkPassword2").jqxPasswordInput(
            {
              width: 138,
              height: 25
            });
            $("#inptJobNetworkPassword2").jqxPasswordInput('val', GJobNetworkPassword2);

            $('#Job_NetworkConnections_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_NetworkConnections_OK_btn').click(function()
            {
              GJob_MakeConnection1 = $("#jqxJobMakeConnection1Cb").jqxSwitchButton('checked');
              GJob_MakeConnection2 = $("#jqxJobMakeConnection2Cb").jqxSwitchButton('checked');
              GJobReconnect1 = $("#jqxJobReconnect1Cb").jqxSwitchButton('checked');
              GJobReconnect2 = $("#jqxJobReconnect2Cb").jqxSwitchButton('checked');
              GJobDisconnect1 = $("#jqxJobDisconnect1Cb").jqxSwitchButton('checked');
              GJobDisconnect2 = $("#jqxJobDisconnect2Cb").jqxSwitchButton('checked');
              GJobNetworkPath1 = $("#inptJobNetworkPath1").jqxInput('val');
              GJobNetworkPath2 = $("#inptJobNetworkPath2").jqxInput('val');
              GJobNetworkUsername1 = $("#inptJobNetworkUsername1").jqxInput('val');
              GJobNetworkUsername2 = $("#inptJobNetworkUsername2").jqxInput('val');
              GJobNetworkPassword1 = $("#inptJobNetworkPassword1").jqxPasswordInput('val');
              GJobNetworkPassword2 = $("#inptJobNetworkPassword2").jqxPasswordInput('val');
              $("#jqxJob_NetworkConnections").jqxSwitchButton('checked', GJob_MakeConnection1 || GJob_MakeConnection2);

              $('#jqxJob_NetworkConnectionsDlg').jqxWindow('destroy');
              b_Show_Job_NetworkConnectionsDlg = false;
            });

            $('#Job_NetworkConnections_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_NetworkConnections_Cancel_btn').click(function()
            {

              $('#jqxJob_NetworkConnectionsDlg').jqxWindow('destroy');
            });

            $('#jqxJob_NetworkConnectionsDlg').jqxWindow('open');

          };

          function m_Show_Job_ExternalCopyToolConfigDlg()
          {
            $('#jqxJob_ExternalCopyToolConfigDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide'
            });
            $('#Job_ExternalCopyToolConfig_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_ExternalCopyToolConfig_OK_btn').click(function()
            {
              $('#jqxJob_ExternalCopyToolConfigDlg').jqxWindow('destroy');
            });
            $('#Job_ExternalCopyToolConfig_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_ExternalCopyToolConfig_Cancel_btn').click(function()
            {
              $('#jqxJob_ExternalCopyToolConfigDlg').jqxWindow('destroy');
            });
            $('#jqxJob_ExternalCopyToolConfigDlg').jqxWindow('open');
          }

          function m_Show_Job_ExternalCopyToolDlg()
          {
            $("#HTML_Job_ExternalCopyToolDlg_div").html(HTML_Job_ExternalCopyToolDlg);
            $('#jqxJob_ExternalCopyToolDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide'
            });

            $('#Job_ExternalCopyTool_Add_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_ExternalCopyTool_Add_btn').click(function()
            {

              if (HTML_Job_ExternalCopyToolConfigDlg == "")
              {
                var client = new XMLHttpRequest();
                client.open('GET', '/m_Job_ExternalCopyToolConfigDlg.html');
                client.onreadystatechange = function()
                {
                  if (client.readyState == XMLHttpRequest.DONE)
                  {
                    HTML_Job_ExternalCopyToolConfigDlg = client.responseText;
                    if (HTML_Job_ExternalCopyToolConfigDlg != "")
                    {
                      $("#HTML_Job_ExternalCopyToolConfigDlg_div").html(HTML_Job_ExternalCopyToolConfigDlg);
                      setTimeout(m_Show_Job_ExternalCopyToolConfigDlg, 100);
                    }
                  }
                }
                client.send();
              }
              else
                m_Show_Job_ExternalCopyToolConfigDlg();

            });
            $('#Job_ExternalCopyTool_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_ExternalCopyTool_OK_btn').click(function()
            {

              $('#jqxJob_ExternalCopyToolDlg').jqxWindow('destroy');
            });
            $('#Job_ExternalCopyTool_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Job_ExternalCopyTool_Cancel_btn').click(function()
            {

              $('#jqxJob_ExternalCopyToolDlg').jqxWindow('destroy');
            });

            $('#jqxJob_ExternalCopyToolDlg').jqxWindow('open');
          }

          $("#jqxJob_ExecuteCommand").bind('change', m_ShowExecuteBeforeAfterDlg);
          $("#jqxJob_OverrideEmailSettings").bind('change', m_ShowEmailSettingsDlg);
          $("#jqxJob_RunAsUser").bind('change', m_ShowHTML_RunAsUserDlg);
          $("#jqxJob_NetworkConnections").bind('change', m_Show_Job_NetworkConnectionsDlg);
          $("#jqxJob_UseExternalCopyingTool").bind('change', m_Show_Job_ExternalCopyToolDlg);

        }

        setTimeout(OnJobBarCreate, 200);

      }
      else if (p_index == 14)
      {
        //Inclusion Masks
        LoadRegistryItemToControlByName('inptInclusionMasks');
        LoadRegistryItemToControlByName('jqxMasks_SpecFolderMasksCb');
        var b_FolderMasksDlg = false;
        LoadRegistryItemToControlByName('jqxMasks_RestrictionsCb');
        var b_FileMaskRestrictionsDlg = false;
        LoadRegistryItemToControlByName('jqxMasks_IncludeBackupFilesCb');

        function OnInclusionBarCreate()
        {
          GetHTMLintoVar('m_Mask_FolderMaskDlg.html', 'HTML_FolderMasksDlg');
          GetHTMLintoVar('m_Mask_FileMaskRestrictionsDlg.html', 'HTML_FileMaskRestrictionsDlg');

          function m_FolderMasksDlg()
          {
            if (b_FolderMasksDlg == false)
            {
              b_FolderMasksDlg = true;
              return;
            }
            $("#HTML_FolderMasksDlg_div").html(HTML_FolderMasksDlg);
            $('#jqxMask_FolderMaskDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide',
              closeButtonAction: 'close'
            });

            $('#jqxMask_FolderMaskDlg').on('close', function(event)
            {

              $('#jqxProfileEditorForm').jqxWindow('focus');
            });

            //var FolderMasksComboSource = [ GMasks_FolderMasks ];
            $("#jqxMasks_FolderMasksMemo").jqxInput(
            {
              width: 200,
              height: 50
            });
            $("#jqxMasks_FolderMasksMemo").jqxInput('val', GMasks_FolderMasks);

            $("#jqxMasks_ScanWholeTreeForFolderMasks").jqxSwitchButton(
            {
              checked: GMasks_ScanWholeTreeForFolderMasks
            });
            $("#jqxIncludeAllSubfoldersOfMatchingFolders").jqxSwitchButton(
            {
              checked: GMasks_IncludeAllSubfoldersOfMatchingFolders
            });
            $("#jqxProcessFoundFoldersOnlyIfExistOnBothSides").jqxSwitchButton(
            {
              checked: GMasks_ProcessFoundFoldersOnlyIfExistOnBothSides
            });

            $('#Mask_FolderMask_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Mask_FolderMask_OK_btn').click(function()
            {

              GMasks_ScanWholeTreeForFolderMasks = $("#jqxMasks_ScanWholeTreeForFolderMasks").jqxSwitchButton('checked');
              GMasks_IncludeAllSubfoldersOfMatchingFolders = $("#jqxIncludeAllSubfoldersOfMatchingFolders").jqxSwitchButton('checked');
              GMasks_ProcessFoundFoldersOnlyIfExistOnBothSides = $("#jqxProcessFoundFoldersOnlyIfExistOnBothSides").jqxSwitchButton('checked');
              GMasks_FolderMasks = $("#jqxMasks_FolderMasksMemo").jqxInput('val');
              $('#jqxMasks_SpecFolderMasksCb').jqxSwitchButton('checked', GMasks_ScanWholeTreeForFolderMasks || GMasks_IncludeAllSubfoldersOfMatchingFolders ||
                GMasks_ProcessFoundFoldersOnlyIfExistOnBothSides || (GMasks_FolderMasks != ""));
              $('#jqxMask_FolderMaskDlg').jqxWindow('destroy');
              b_FolderMasksDlg = false;
            });

            $('#Mask_FolderMask_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Mask_FolderMask_Cancel_btn').click(function()
            {

              $('#jqxMask_FolderMaskDlg').jqxWindow('destroy');

            });

            $('#jqxMask_FolderMaskDlg').jqxWindow('open');
            $('#jqxMask_FolderMaskDlg').jqxWindow('focus');
          };

          function m_FileMaskRestrictionsDlg()
          {

            if (b_FileMaskRestrictionsDlg == false)
            {
              b_FileMaskRestrictionsDlg = true;
              return;
            }
            $("#HTML_FileMaskRestrictionsDlg_div").html(HTML_FileMaskRestrictionsDlg);
            $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide',
              closeButtonAction: 'close'
            });

            $('#jqxMask_FileMaskRestrictionsDlg').on('close', function(event)
            {

              $('#jqxProfileEditorForm').jqxWindow('focus');
            });

            $("#jqxMasks_RestrictionsMemo").jqxInput(
            {
              width: 200,
              height: 50
            });
            $("#jqxMasks_RestrictionsMemo").jqxInput('val', GMasks_Restrictions);

            $("#Masks_RestrictionLTR_Radio_Mode").jqxRadioButton();
            $("#Masks_RestrictionRTL_Radio_Mode").jqxRadioButton();

            SetRadioGroupChecked(GMasksRestrictionsDirection, $("#Masks_RestrictionLTR_Radio_Mode"), $("#Masks_RestrictionRTL_Radio_Mode"), null, null, null, null);

            $('#Mask_FileMaskRestrictions_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Mask_FileMaskRestrictions_OK_btn').click(function()
            {

              GMasks_Restrictions = $("#jqxMasks_RestrictionsMemo").jqxInput('val');
              GMasksRestrictionsDirection = GetCheckedRadiobuttonName($("#Masks_RestrictionLTR_Radio_Mode"), $("#Masks_RestrictionRTL_Radio_Mode"), null, null, null, null);
              $('#jqxMasks_RestrictionsCb').jqxCheckBox('checked', GMasks_Restrictions != "");
              $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow('destroy');
              $('#jqxProfileEditorForm').jqxWindow('focus');
              b_FileMaskRestrictionsDlg = true;
            });

            $('#Mask_FileMaskRestrictions_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Mask_FileMaskRestrictions_Cancel_btn').click(function()
            {

              $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow('destroy');
              $('#jqxProfileEditorForm').jqxWindow('focus');
            });

            $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow('open');
            $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow('focus');
          }

          $("#jqxMasks_SpecFolderMasksCb").bind('change', m_FolderMasksDlg);
          $("#jqxMasks_RestrictionsCb").bind('change', m_FileMaskRestrictionsDlg);

        }

        setTimeout(OnInclusionBarCreate, 200);
      }
      else if (p_index == 15)
      {
        //Exclusion Masks
        $("#Masks_DontCopy_Radio_Mode").jqxRadioButton(
        {
          groupName: "ExclucionFilesWidget"
        });
        $("#Masks_IgnoreTotaly_Radio_Mode").jqxRadioButton(
        {
          groupName: "ExclucionFilesWidget"
        });
        LoadRegistryItemToControlByName('ExclucionFilesWidget');
        LoadRegistryItemToControlByName('inptExclusionMasks');
        LoadRegistryItemToControlByName('jqxMasks_UseGlobalExclAlsoCb');
      }
      else if (p_index == 16)
      {
        //General Filters
        LoadRegistryItemToControlByName('jqxMasks_ProcessHiddenFilesCb');
        LoadRegistryItemToControlByName('jqxMasks_SearchHiddenFoldersCb');
        LoadRegistryItemToControlByName('jqxMasks_CopyFilesWithArchiveFlagCb');
        LoadRegistryItemToControlByName('jqxMasks_ClearArchiveFlagsCb');
        if (GisSyncoveryWindows)
        {
          LoadRegistryItemToControlByName('jqxMasks_ProcessReparsePointsCb');
          $("#jqxMasks_ProcessReparsePointsCb").bind('change', m_EnableDisableMasksAndFiltersGeneral);
          LoadRegistryItemToControlByName('jqxMasks_FollowJunctionPointsFilesCb');
          LoadRegistryItemToControlByName('jqxMasks_FollowJunctionPointsFoldersCb');
          LoadRegistryItemToControlByName('jqxMasks_CopyOtherReparsePointsCb');
        }

        GTabMasksGeneralFilters = true;
      }
      else if (p_index == 17)
      {
        //File Age and Size
        LoadRegistryItemToControlByName('jqxMasks_FileSizesWithinCb');
        $("#jqxMasks_FileSizesWithinCb").bind('change', m_EnableDisableMasksAndFiltersFileAge);

        LoadRegistryItemToControlByName('jqxMasks_FileDatesWithinCb');
        $("#jqxMasks_FileDatesWithinCb").bind('change', m_EnableDisableMasksAndFiltersFileAge);

        LoadRegistryItemToControlByName('jqxInptMasks_FileSizesMin');
        LoadRegistryItemToControlByName('jqxInptDateMasks_FileMinDate');
        LoadRegistryItemToControlByName('jqxInptMasks_FileSizesMax');
        LoadRegistryItemToControlByName('jqxInptDateMasks_FileMaxDate');
        LoadRegistryItemToControlByName('jqxMasks_FileAgeCb');
        $("#jqxMasks_FileAgeCb").bind('change', m_EnableDisableMasksAndFiltersFileAge);

        LoadRegistryItemToControlByName('jqxMasks_FileAgeCombo');
        LoadRegistryItemToControlByName('inptMasks_FileAgeDays');
        LoadRegistryItemToControlByName('inptMasks_FileAgeHours');
        LoadRegistryItemToControlByName('inptMasks_FileAgeMinutes');
        $("#Masks_LastModification_Radio_Mode").jqxRadioButton(
        {
          groupName: "Masks_FilterByWidget"
        });
        $("#Masks_Creation_Radio_Mode").jqxRadioButton(
        {
          groupName: "Masks_FilterByWidget"
        });
        LoadRegistryItemToControlByName('Masks_FilterByWidget');
        $("#Masks_ApplyToFiles_Radio_Mode").jqxRadioButton(
        {
          groupName: "Masks_ApplyToWidget"
        });
        $("#Masks_ApplyToFolders_Radio_Mode").jqxRadioButton(
        {
          groupName: "Masks_ApplyToWidget"
        });
        $("#Masks_ApplyToBoth_Radio_Mode").jqxRadioButton(
        {
          groupName: "Masks_ApplyToWidget"
        });
        LoadRegistryItemToControlByName('Masks_ApplyToWidget');

        LoadRegistryItemToControlByName('jqxMasks_TargetDataRestoreCb');
        $("#jqxMasks_TargetDataRestoreCb").bind('change', m_EnableDisableMasksAndFiltersFileAge);

        LoadRegistryItemToControlByName('jqxInptDateMasks_TargetDateRestoreDate');
        LoadRegistryItemToControlByName('jqxInptDateMasks_TargetDateRestoreTime');
        GTabMasksFileAge = true;
      }
      else if (p_index == 18)
      {
        //Safety
        LoadRegistryItemToControlByName('jqxSafety_WarnIfMovingFiles');
        LoadRegistryItemToControlByName('jqxSafety_WarnBeforeOverridingReadOnly');
        LoadRegistryItemToControlByName('jqxSafety_WarnBeforeOverridingLarger');
        LoadRegistryItemToControlByName('jqxSafety_WarnBeforeOverridingNewer');
        LoadRegistryItemToControlByName('jqxSafety_WarnBeforeDeleting');
        //Special Safety
        LoadRegistryItemToControlByName('jqxSafetySpecial_WarnIfDeletingFilesMoreThan');

        $("#jqxSafetySpecial_WarnIfDeletingFilesMoreThan").bind('change', m_EnableDisableSafety);

        LoadRegistryItemToControlByName('inptSafetySpecial_WarnIfDeletingFilesMoreThan');
        LoadRegistryItemToControlByName('jqxSafetySpecial_WarnIfDeletingAllFilesInAnySubfolder');
        LoadRegistryItemToControlByName('jqxSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder');
        $("#jqxSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder").bind('change', m_EnableDisableSafety);

        LoadRegistryItemToControlByName('inptSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder');

      }
      else if (p_index == 19)
      {
        //Safety-Unattended
        LoadRegistryItemToControlByName('jqxSafetyUnattended_OverwriteReadOnly');
        LoadRegistryItemToControlByName('jqxSafetyUnattended_OverwriteLarge');
        LoadRegistryItemToControlByName('jqxSafetyUnattended_NewerFilesCanBeOverwritten');
        LoadRegistryItemToControlByName('jqxSafetyUnattended_FileDeletionAllowedCb');
        $("#jqxSafetyUnattended_FileDeletionAllowedCb").bind('change', m_EnableDisableSafetyUnatended);

        LoadRegistryItemToControlByName('inptSafetyUnattended_FileDeletionAllowed');
        LoadRegistryItemToControlByName('jqxSafetyUnattended_ReplaceMaxPercentCb');

        $("#jqxSafetyUnattended_ReplaceMaxPercentCb").bind('change', m_EnableDisableSafetyUnatended);

        LoadRegistryItemToControlByName('inptSafetyUnattended_ReplaceMaxPercent');
        LoadRegistryItemToControlByName('jqxSafetyUnattended_EnableSpecialSafetyCheck');
      }
      else if (p_index == 20)
      {
        //Special
        LoadRegistryItemToControlByName('jqxSpecialSpFeatr_ProcessSecurityCb');
        var b_Show_Special_SecurityAndSharesDlg = false;
        $("#jqxSpecialSpFeatr_ProcessSecurityCb").jqxSwitchButton('checked',
          GSpecial_CopyOwnerSetting || GSpecial_CopyGroupSetting || GSpecial_CopyPermissions || GSpecial_ProcessBaseFolder);
        LoadRegistryItemToControlByName('jqxSpecialSpFeatr_LeftSideUsesRemoteServiceCb');

        $("#jqxSpecialSpFeatr_LeftSideUsesRemoteServiceCb").bind('change', m_EnableDisableSpecial);

        LoadRegistryItemToControlByName('jqxSpecialSpFeatr_UsePartialFileUpdatingCb');

        $("#jqxSpecialSpFeatr_UsePartialFileUpdatingCb").bind('change', m_EnableDisableSpecial);

        LoadRegistryItemToControlByName('jqxSpecialSpFeatr_RightSideUsesRemoteServiceCb');
        $("#jqxSpecialSpFeatr_RightSideUsesRemoteServiceCb").bind('change', m_EnableDisableSpecial);

        LoadRegistryItemToControlByName('jqxSpecialSpFeatr_RightSideRemoteServiceCb');

        $("#jqxSpecialSpFeatr_RightSideRemoteServiceCb").bind('change', m_EnableDisableSpecial);

        LoadRegistryItemToControlByName('jqxSpecial_DontFallBackFromPartialCb');
        LoadRegistryItemToControlByName('jqxSpecial_PartialRemoteOneByOneCb');
        LoadRegistryItemToControlByName('jqxSpecialSpFeatr_FastModeCb');

        function OnSpecialBarCreate()
        {
          function m_Show_Special_SecurityAndSharesDlg()
          {
            if (b_Show_Special_SecurityAndSharesDlg == false)
            {
              b_Show_Special_SecurityAndSharesDlg = true;
              return;
            }
            $("#HTML_Special_SecurityAndSharesDlg_div").html(HTML_Special_SecurityAndSharesDlg);
            $('#jqxSpecial_SecurityAndSharesDlg').jqxWindow(
            {
              maxWidth: '100%',
              width: '100%',
              maxHeight: '100%',
              height: '100%',
              autoOpen: false,
              isModal: true,
              theme: 'energyblue',
              animationType: 'slide'
            });
            $("#jqxSpecial_CopyOwnerSetting").jqxSwitchButton(
            {
              checked: GSpecial_CopyOwnerSetting
            });
            $("#jqxSpecial_CopyGroupSetting").jqxSwitchButton(
            {
              checked: GSpecial_CopyGroupSetting
            });
            $("#jqxSpecial_CopyPermissions").jqxSwitchButton(
            {
              checked: GSpecial_CopyPermissions
            });
            $("#jqxSpecial_ProcessBaseFolder").jqxSwitchButton(
            {
              checked: GSpecial_ProcessBaseFolder
            });

            $('#Special_SecurityAndShares_OK_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Special_SecurityAndShares_OK_btn').click(function()
            {
              GSpecial_CopyOwnerSetting = $("#jqxSpecial_CopyOwnerSetting").jqxSwitchButton('checked');
              GSpecial_CopyGroupSetting = $("#jqxSpecial_CopyGroupSetting").jqxSwitchButton('checked');
              GSpecial_CopyPermissions = $("#jqxSpecial_CopyPermissions").jqxSwitchButton('checked');
              GSpecial_ProcessBaseFolder = $("#jqxSpecial_ProcessBaseFolder").jqxSwitchButton('checked');
              $('#jqxSpecial_SecurityAndSharesDlg').jqxWindow('destroy');
              b_Show_Special_SecurityAndSharesDlg = false;
              $("#jqxSpecialSpFeatr_ProcessSecurityCb").jqxSwitchButton('checked',
                GSpecial_CopyOwnerSetting || GSpecial_CopyGroupSetting || GSpecial_CopyPermissions || GSpecial_ProcessBaseFolder);
            });

            $('#Special_SecurityAndShares_Cancel_btn').jqxButton(
            {
              height: 30,
              width: 100
            });
            $('#Special_SecurityAndShares_Cancel_btn').click(function()
            {

              $('#jqxSpecial_SecurityAndSharesDlg').jqxWindow('destroy');
            });

            $('#jqxSpecial_SecurityAndSharesDlg').jqxWindow('open');
          }
          $("#jqxSpecialSpFeatr_ProcessSecurityCb").bind('change', m_Show_Special_SecurityAndSharesDlg);

        }
        GetHTMLintoVar('m_Special_SecurityAndSharesDlg.html', 'HTML_Special_SecurityAndSharesDlg');
        setTimeout(OnSpecialBarCreate, 200);
        Gb_TabSpecial = true;

      }
      else if (p_index == 21)
      {
        //Special More

        var HTML_Special_AlternateDataStreamsDlg = "";

        $("#btnSpecial_AlternateDataStreams").jqxButton(
        {
          theme: 'energyblue'
        });
        /* $('#btnSpecial_AlternateDataStreams').click(function () {

                      if( HTML_Special_AlternateDataStreamsDlg == "" )
                      {
                        var client = new XMLHttpRequest();
                        client.open('GET', '/Special_AlternateDataStreamsDlg.html');
                        client.onreadystatechange = function()
                        {
                           if (client.readyState == XMLHttpRequest.DONE)
                           {
                             HTML_Special_AlternateDataStreamsDlg = client.responseText;
                             if( HTML_Special_AlternateDataStreamsDlg != "")
                             {
                               $("#HTML_Special_AlternateDataStreamsDlg_div").html( HTML_Special_AlternateDataStreamsDlg );
                               setTimeout(ShowSpecial_AlternateDataStreamsDlg, 100);
                             }
                           }
                        }
                        client.send();
                      }
                      else
                        ShowSpecial_AlternateDataStreamsDlg();

                  });
*/

        //  GetHTMLintoVar('Special_CacheDestinationFileListDlg.html', 'HTML_CacheDestinationFileListDlg');
        $("#jqxSpecialSpFeatr_CacheDestinationFileListCb").jqxSwitchButton(
        {
          width: 50,
          height: 25,
          offLabel: '',
          checked: GSpecial_CacheDestinationFileList
        });
        //  $("#jqxSpecialSpFeatr_CacheDestinationFileListCb").on('click', Show_Special_CacheDestinationFileListDlg );
        LoadRegistryItemToControlByName('jqxSpecialSpFeatr_UseDifferentFoldersCb');
        LoadRegistryItemToControlByName('cbRedownloadServerModifiedUploads');
        if (GisSyncoveryWindows)
          LoadRegistryItemToControlByName('inptSpecialSpFeatr_SetTargetVolumeLabel');

      }
      else if (p_index == 22)
      {
        //Database
        LoadRegistryItemToControlByName('jqxSpDb_OpenDatabaseReadOnlyCb');
        LoadRegistryItemToControlByName('jqxSpecialDatabase_FastModeCb');
        LoadRegistryItemToControlByName('inptSpecialDatabase_DatabaseNameToUse');
        LoadRegistryItemToControlByName('inptSpecialDatabase_Left');
        LoadRegistryItemToControlByName('inptSpecialDatabase_Right');
      }
      else if (p_index == 23)
      {
        //Versioning
        LoadRegistryItemToControlByName('jqxVersVers_KeepOlderVersionsWhenReplacing');
        LoadRegistryItemToControlByName('inptVersVers_PerFile');

        $("#VersVers_Add_Prefix_Mode").jqxRadioButton(
        {
          groupName: "VersVers_RenamingOlderVersionsWidget"
        });
        $("#VersVers_Add_Timestamp_Mode").jqxRadioButton(
        {
          groupName: "VersVers_RenamingOlderVersionsWidget"
        });
        LoadRegistryItemToControlByName('VersVers_RenamingOlderVersionsWidget');
        LoadRegistryItemToControlByName('jqxVersVers_OnlyOnRightHandSide');

        LoadRegistryItemToControlByName('jqxVersVers_MoveIntoFolder');
        LoadRegistryItemToControlByName('inptMoveIntoFolder');
        LoadRegistryItemToControlByName('jqxVersVers_AsSubfolerInEachFolderCb');
        LoadRegistryItemToControlByName('jqxVersVers_RecreateTreeBelowCb');
        LoadRegistryItemToControlByName('jqxVersVers_DontRenameNewestOlderVersionCb');
        LoadRegistryItemToControlByName('jqxVersVers_FileNameEncodingCb');
      }
      else if (p_index == 24)
      {
        //Versioning->Synthetic Backups
        LoadRegistryItemToControlByName('jqxVersSynth_UseSynthBackupsCb');
        LoadRegistryItemToControlByName('jqxVersSynth_UseCheckPointsCb');
        LoadRegistryItemToControlByName('jqxVersSynth_CreateCheckpointCombo');
        LoadRegistryItemToControlByName('jqxVersSynth_CheckpointsRelativeCombo');
        $("#jqxVersSynth_CheckpointsRelativeCombo").jqxDropDownList(
        {
          width: 280
        });
        LoadRegistryItemToControlByName('jqxVersSynth_BuildAllIncrementalCb');
        LoadRegistryItemToControlByName('jqxVersSynth_RemoveUnneededCb');
        LoadRegistryItemToControlByName('inptVersSynth_RemoveUnneeded');
        LoadRegistryItemToControlByName('jqxVersSynth_RemoveUnneededCombo');
        $("#jqxVersSynth_RemoveUnneededCombo").jqxDropDownList(
        {
          width: 280
        });
        LoadRegistryItemToControlByName('jqxVersSynth_IfAllBlocksCb');
      }
      else if (p_index == 25)
      {
        //Versioning->More
        LoadRegistryItemToControlByName('jqxVersMore_DoNotDecodeLeftHandCb');
        LoadRegistryItemToControlByName('jqxVersMore_DoNotDecodeRightHandCb');
        LoadRegistryItemToControlByName('jqxVersMore_CleanUpIdenticalCb');
        LoadRegistryItemToControlByName('jqxVersMore_RemoveParenthesizedCb');
        LoadRegistryItemToControlByName('jqxVersMore_RemoveVesioningTagsCb');
        LoadRegistryItemToControlByName('jqxVersMore_CleanUpAllOlderVersionsCb');
        LoadRegistryItemToControlByName('jqxVersMore_FilesBackupV4Cb');

      }
      else if (p_index == 26)
      {
        //Zip / Zipping
        LoadRegistryItemToControlByName('jqxZipping_ZipEachFileCb');
        LoadRegistryItemToControlByName('jqxZipping_UseZipPackagesCb');
        LoadRegistryItemToControlByName('jqxZipping_ZipDirectlyToDestinationCb');
        LoadRegistryItemToControlByName('jqxZipping_UnzipAllfilesCb');
        LoadRegistryItemToControlByName('jqxZipping_LimitZipFileSizeCb');
        LoadRegistryItemToControlByName('inptZipping_Limit');
      }
      else if (p_index == 27)
      {
        //Zip / Encrypt
        LoadRegistryItemToControlByName('jqxZippingEncrypt_EncryptFilesCb');
        LoadRegistryItemToControlByName('jqxZippingEncrypt_Combo');
        $("#jqxZippingEncrypt_Combo").jqxDropDownList(
        {
          width: 280
        });
        LoadRegistryItemToControlByName('jqxZippingEncrypt_DecryptFilesCb');
        LoadRegistryItemToControlByName('jqxZippingEncrypt_Password');
        $("#jqxZippingEncrypt_Password").jqxPasswordInput(
        {
          width: 200,
          height: 25
        });
        $("#jqxZippingEncrypt_Confirm").jqxPasswordInput(
        {
          width: 200,
          height: 25
        });
        $("#jqxZippingEncrypt_Confirm").jqxPasswordInput(
          'val', $("#jqxZippingEncrypt_Password").jqxPasswordInput('val'));
        LoadRegistryItemToControlByName('jqxZippingEncrypt_FilenameEncryptionCb');
        LoadRegistryItemToControlByName('jqxZippingEncrypt_EncryptExistingNamesCb');
        LoadRegistryItemToControlByName('jqxZippingEncrypt_FoldernameEncryptionCb');

      }
    }

    //$("#navigationbar").html(ProfileEditorNavigationBarHTML);
    // Create a jqxNavigationBar
    $("#navigationbar").jqxNavigationBar(
    {
      width: '100%',
      height: 1600,
      toggleMode: "dblclick",
      expandMode: "toggle",
      showArrow: true,
      initContent: OnInitNavBarContent
    }); //$(window).height()/2
    $('#navigationbar').on('expandingItem', function(event)
    {
      m_syncOperationModeEnableDisable();
    });

    //init_MainTab();

    //});

    $('#Cancel_btn').jqxButton(
    {
      width: 100,
      height: 30
    });

    $('#Cancel_btn').click(function()
    {

      $('#jqxProfileEditorForm').jqxWindow('close');
      //$('#jqxProfileEditorForm').jqxWindow('destroy');
    });

    $('#OK_btn').jqxButton(
    {
      width: 100,
      height: 30,
      disabled: true
    });

    $('#OK_btn').click(function()
    {
      if (GCurrentProfileAction == 'Insert')
      {
        p_ProfileName = $('#inptProfileName').jqxInput('val');
      }
      GLeftStoredPath = $("#inptLeftHandSide").jqxInput('val');
      GRightStoredPath = $("#inptRightHandSide").jqxInput('val');

      CheckError(GLeftStoredPath != '', 'GLeftStoredPath is empty');
      CheckError(GLeftStoredPath != undefined, 'GLeftStoredPath undeined')
      CheckError(GRightStoredPath != '', 'GRightStoredPath is empty');
      CheckError(GRightStoredPath != undefined, 'GRightStoredPath undeined')

      PostProfileEditor(p_ProfileName, GCurrentProfileAction);

    });

    $('#jqxProfileEditorForm').on('open', function(event) {

    });

    $('#jqxProfileEditorForm').jqxWindow('open');

  }
  catch (err)
  {
    var mes = err.message + '  m_InitProfileEditorForm';
    alert(mes);
  }
}

function ShowFoldersForDeletedFilesDlg()
{

  $('#jqxFoldersForDeletedFilesDlg').jqxWindow(
  {
    maxWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    height: '100%',
    autoOpen: false,
    isModal: true,
    theme: 'energyblue',
    animationType: 'slide'
  });

  $("#inptMoveDeletedFilesIntoFolderL").jqxInput(
  {
    width: 200,
    height: 25
  }); //, theme: 'shinyblack'
  $("#inptMoveDeletedFilesIntoFolderL").jqxInput('val', GMoveDeletedFilesIntoFolderL);

  $("#inptMoveDeletedFilesIntoFolderR").jqxInput(
  {
    width: 200,
    height: 25
  }); //, theme: 'shinyblack'
  $("#inptMoveDeletedFilesIntoFolderR").jqxInput('val', GMoveDeletedFilesIntoFolderR);

  $("#btnDirSelectL").jqxButton(
  {
    height: 30,
    width: 80,
    theme: 'energyblue'
  });
  $('#btnDirSelectL').click(function()
  {
    InitDirTreeSelectForm($("#inptMoveDeletedFilesIntoFolderL"));
  });

  $("#btnDirSelectR").jqxButton(
  {
    height: 30,
    width: 80,
    theme: 'energyblue'
  });
  $('#btnDirSelectR').click(function()
  {
    InitDirTreeSelectForm($("#inptMoveDeletedFilesIntoFolderR"));
  });

  $('#Files_OK_btn').jqxButton(
  {
    height: 30,
    width: 100
  });

  $('#Files_OK_btn').click(function()
  {
    GMoveDeletedFilesIntoFolderL = $("#inptMoveDeletedFilesIntoFolderL").jqxInput('val');
    GMoveDeletedFilesIntoFolderR = $("#inptMoveDeletedFilesIntoFolderR").jqxInput('val');
    $('#jqxFilesDeletions_MoveFilesToSFolder').jqxSwitchButton('checked', (GMoveDeletedFilesIntoFolderL != "") || (GMoveDeletedFilesIntoFolderR != ""));

    $('#jqxFoldersForDeletedFilesDlg').jqxWindow('close');
  });

  $('#Files_Cancel_btn').jqxButton(
  {
    height: 30,
    width: 100
  });

  $('#Files_Cancel_btn').click(function()
  {

    $('#jqxFoldersForDeletedFilesDlg').jqxWindow('close');
  });

  $('#jqxFoldersForDeletedFilesDlg').jqxWindow('open');

}

function m_syncOperationModeEnableDisable()
{
  if (GInsyncOperationModeEnableDisable)
    return;

  GInsyncOperationModeEnableDisable = true; // avoid endless recursion

  var l2r = $("#jqxLeftToRightCb").jqxSwitchButton('val');
  var r2l = $("#jqxRightToLeftCb").jqxSwitchButton('val');
  // alert("syncOperationModeEnableDisable: l2r=="+l2r+", r2l="+r2l);
  if (l2r && r2l)
  {
    //alert("2dir");
    var RadioOption = GetCheckedRadiobuttonName($("#Standard_Copying_Mode"), $("#SmartTracking_Mode"), $("#Exact_Mirror_Mode"), $("#Move_Files_Mode"), null, null);
    if (GbTabFiles) // Files tab sheet created?
    {

      if (!$("#jqxFilesDetectMovedFilesCb").jqxSwitchButton('val'))
      {
        $("#Files_Left_Radio_Mode").jqxRadioButton('disabled', true);
        $("#Files_Right_Radio_Mode").jqxRadioButton('disabled', true);
        $("#Files_Automatic_Radio_Mode").jqxRadioButton('disabled', true);
      }
      else
      {
        $("#Files_Left_Radio_Mode").jqxRadioButton('disabled', false);
        $("#Files_Right_Radio_Mode").jqxRadioButton('disabled', false);
        if (RadioOption == 'SmartTracking_Mode')
        {
          $("#Files_Automatic_Radio_Mode").jqxRadioButton('disabled', false);
          // $("#Files_Automatic_Radio_Mode").jqxRadioButton( 'check' ); don't enforce this
        }
        else
        {
          if ($("#Files_Automatic_Radio_Mode").jqxRadioButton('checked'))
            $("#Files_Right_Radio_Mode").jqxRadioButton('check');
          $("#Files_Automatic_Radio_Mode").jqxRadioButton('disabled', true);
        }
      }

      //Files
      $("#jqxFilesDoNotScanDestinationCb ").jqxSwitchButton('disabled', true);
    }
    if (Gb_MainBarOK)
    {
      if (RadioOption != 'SmartTracking_Mode')
        SetRadioGroupChecked('Standard_Copying_Mode', $("#Standard_Copying_Mode"));
      $("#Exact_Mirror_Mode").jqxRadioButton(
      {
        disabled: true
      });
      $("#Move_Files_Mode").jqxRadioButton(
      {
        disabled: true
      });

      $("#Ask_Radio_Mode").jqxRadioButton('disabled', false);
      $("#Copy_Left_To_Right_Radio_Mode").jqxRadioButton('disabled', false);
      $("#Copy_Right_To_Left_Radio_Mode").jqxRadioButton('disabled', false);
      $("#Copy_Larger_Files_Radio_Mode").jqxRadioButton('disabled', false);
    }

    if (GbTabsComparisonMoreCreated)
    {
      $("#jqxComparMoreAlwaysCopyFilesCb ").jqxSwitchButton('disabled', true);
      $("#jqxComparMoreCaseSencivityCb ").jqxSwitchButton('disabled', true);
      $("#jqxComparMoreFolderTimestampComparisonCb ").jqxSwitchButton('disabled', true);
    }

    //Special
    if (Gb_TabSpecial == true)
      $("#jqxSpecialSpFeatr_CacheDestinationFileListCb").jqxSwitchButton('disabled', true);
  }
  else
  {
    //alert("1dir");
    if (Gb_MainBarOK)
    {
      $("#Exact_Mirror_Mode").jqxRadioButton(
      {
        disabled: false
      });
      $("#Move_Files_Mode").jqxRadioButton(
      {
        disabled: false
      });

      $("#Ask_Radio_Mode").jqxRadioButton('disabled', true);
      $("#Copy_Left_To_Right_Radio_Mode").jqxRadioButton('disabled', true);
      $("#Copy_Right_To_Left_Radio_Mode").jqxRadioButton('disabled', true);
      $("#Copy_Larger_Files_Radio_Mode").jqxRadioButton('disabled', true);
    }
    if (GbTabsComparisonMoreCreated)
    {
      $("#jqxComparMoreAlwaysCopyFilesCb ").jqxSwitchButton('disabled', false);
      $("#jqxComparMoreCaseSencivityCb ").jqxSwitchButton('disabled', false);
      $("#jqxComparMoreFolderTimestampComparisonCb ").jqxSwitchButton('disabled', false);
    }

    //Files
    if (GbTabFiles) // Files tab sheet created?
    {
      if (!$("#jqxFilesDetectMovedFilesCb").jqxSwitchButton('val'))
      {
        //alert("not #jqxFilesDetectMovedFilesCb");
        $("#Files_Left_Radio_Mode").jqxRadioButton('disabled', true);
        $("#Files_Right_Radio_Mode").jqxRadioButton('disabled', true);
        $("#Files_Automatic_Radio_Mode").jqxRadioButton('disabled', true);
      }
      else
      {
        //alert("#jqxFilesDetectMovedFilesCb");
        if (l2r)
        {
          //alert("l2r");
          $("#Files_Right_Radio_Mode").jqxRadioButton('disabled', false);
          $("#Files_Right_Radio_Mode").jqxRadioButton('check');
          $("#Files_Left_Radio_Mode").jqxRadioButton('disabled', true);
        }
        else
        {
          //alert("r2l");
          $("#Files_Left_Radio_Mode").jqxRadioButton('disabled', false);
          $("#Files_Left_Radio_Mode").jqxRadioButton('check');
          $("#Files_Right_Radio_Mode").jqxRadioButton('disabled', true);
        }
      }
      $("#Files_Automatic_Radio_Mode").jqxRadioButton('disabled', true);
      $("#jqxFilesDoNotScanDestinationCb").jqxSwitchButton('disabled', false);
    }

    //Special
    if (Gb_TabSpecial == true)
      $("#jqxSpecialSpFeatr_CacheDestinationFileListCb").jqxSwitchButton('disabled', false);

  }

  GInsyncOperationModeEnableDisable = false;
};

function m_EnableDisableFiles()
{
  //alert("EnableDisableFiles");
  m_syncOperationModeEnableDisable(); //need to cal it here

  if ($("#jqxFilesVerifyCopiedFilesCb").jqxSwitchButton('val'))
  {
    $("#jqxFilesReCopyOnceCb").jqxSwitchButton('disabled', false);
  }
  else
  {
    $("#jqxFilesReCopyOnceCb").jqxSwitchButton('checked', false);
    $("#jqxFilesReCopyOnceCb").jqxSwitchButton('disabled', true);
  }

  if ($("#jqxFilesMore_SpeedLimit").jqxSwitchButton('val'))
  {
    $("#inptFilesMore_SpeedLimit").jqxNumberInput('disabled', false);
  }
  else
  {
    $("#inptFilesMore_SpeedLimit").jqxNumberInput('checked', false);
    $("#inptFilesMore_SpeedLimit").jqxNumberInput('disabled', true);
  }

  if ($("#jqxFilesMore_CheckDestinationFile").jqxSwitchButton('val'))
  {
    $("#jqxFilesMore_AndCompareFileDetails").jqxSwitchButton('disabled', false);
  }
  else
  {
    $("#jqxFilesMore_AndCompareFileDetails").jqxSwitchButton('checked', false);
    $("#jqxFilesMore_AndCompareFileDetails").jqxSwitchButton('disabled', true);
  }

};

function m_SetSmartTrackingGlobalVariablesFromFilesTab()
{
  if (GbTabFiles) // "Files" tab sheet created?
  {
    if ($("#jqxFilesDetectMovedFilesCb").jqxSwitchButton('val') == true)
    {
      if ($("#Files_Automatic_Radio_Mode").jqxRadioButton('val'))
        GSmartTrackingMoveSettingsWidget = "Smt_Moved_Fully_Automatic_Mode";
      else
      if ($("#Files_Left_Radio_Mode").jqxRadioButton('val'))
        GSmartTrackingMoveSettingsWidget = "Smt_Moved_Adjust_On_Left_Mode";
      else
        GSmartTrackingMoveSettingsWidget = "Smt_Moved_Adjust_On_Right_Mode";
    }
    else
      GSmartTrackingMoveSettingsWidget = "Smt_Moved_Off_Mode";
    //alert("Setting moved radio to "+GSmartTrackingMoveSettingsWidget);
  }
  else
  {
    if (GSmartTrackingMoveSettingsWidget != "Smt_Moved_Off_Mode")
    {
      var l2r = $("#jqxLeftToRightCb").jqxSwitchButton('val');
      var r2l = $("#jqxRightToLeftCb").jqxSwitchButton('val');
      if (l2r)
        if (r2l)
        {
          // two-way, the only instance where the user really has a choice
          if (GSmartTrackingMoveSettingsWidget == "")
            GSmartTrackingMoveSettingsWidget = "Smt_Moved_Fully_Automatic_Mode";
        }
      else
        GSmartTrackingMoveSettingsWidget = "Smt_Moved_Adjust_On_Right_Mode";
      else
        GSmartTrackingMoveSettingsWidget = "Smt_Moved_Adjust_On_Left_Mode";
    }
  }
}

function m_SetFilesTabFromSmartTrackingGlobalVariables()
{
  reg_jqxFilesDetectMovedFilesCb.value = (GSmartTrackingMoveSettingsWidget != "Smt_Moved_Off_Mode");

  var AVal;
  if (GSmartTrackingMoveSettingsWidget == "Smt_Moved_Fully_Automatic_Mode")
    AVal = "Files_Automatic_Radio_Mode";
  else
  if (GSmartTrackingMoveSettingsWidget == "Smt_Moved_Adjust_On_Left_Mode")
    AVal = "Files_Left_Radio_Mode";
  else
    AVal = "Files_Right_Radio_Mode";

  reg_FilesDetectMovedFilesRadiogroupWidget.value = AVal;

  if (GbTabFiles) // "Files" tab sheet created?
  {
    $("#jqxFilesDetectMovedFilesCb").jqxSwitchButton('checked', reg_jqxFilesDetectMovedFilesCb.value);

    reg_FilesDetectMovedFilesRadiogroupWidget.setfunc(AVal);
  }
}

function m_SetFilesDeletionsTabFromSmartTrackingGlobalVariables()
{
  reg_jqxFilesDeletions_MoveFilesToSFolder.value = (GSmartTrackingDeletedSettingsWidget == "Smt_Deleted_Move_IntoFolder_Mode");

  if (GbTabFilesDeletions) // if tab created
    $("#jqxFilesDeletions_MoveFilesToSFolder").jqxSwitchButton('checked', reg_jqxFilesDeletions_MoveFilesToSFolder.value);
}

function m_ShowSmartTrackingSettingsDlg()
{
  $('#jqxSmartTrackingSettingsDlg').jqxWindow(
  {
    maxWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    height: '100%',
    autoOpen: false,
    isModal: true,
    theme: 'energyblue',
    animationType: 'slide'
  });

  $("#navigationbar_SmartTracking").jqxNavigationBar(
  {
    width: '100%',
    height: 1600,
    toggleMode: "dblclick",
    expandMode: "toggle",
    showArrow: true,
    initContent: OnInitSmartTrackingNavBarContent
  });

  function OnInitSmartTrackingNavBarContent(p_index)
  {
    if (p_index == 0)
    {
      $("#Smt_Moved_Off_Mode").jqxRadioButton(
      {
        groupName: "TabMoved"
      });
      $("#Smt_Moved_Fully_Automatic_Mode").jqxRadioButton(
      {
        groupName: "TabMoved"
      });
      $("#Smt_Moved_Adjust_On_Left_Mode").jqxRadioButton(
      {
        groupName: "TabMoved"
      });
      $("#Smt_Moved_Adjust_On_Right_Mode").jqxRadioButton(
      {
        groupName: "TabMoved"
      });
      SetRadioGroupChecked(GSmartTrackingMoveSettingsWidget, $("#Smt_Moved_Off_Mode"), $("#Smt_Moved_Fully_Automatic_Mode"), $("#Smt_Moved_Adjust_On_Left_Mode"), $("#Smt_Moved_Adjust_On_Right_Mode"), null, null);
    }
    else if (p_index == 1)
    {
      $("#Smt_Deleted_Copy_Back_Mode").jqxRadioButton(
      {
        groupName: "TabDeleted"
      });
      $("#Smt_Deleted_Ignore_Mode").jqxRadioButton(
      {
        groupName: "TabDeleted"
      });
      $("#Smt_Deleted_Move_IntoFolder_Mode").jqxRadioButton(
      {
        groupName: "TabDeleted"
      });
      $("#Smt_Deleted_DeletePermamently_Mode").jqxRadioButton(
      {
        groupName: "TabDeleted"
      });

      if (GbTabFilesDeletions) // if tab created
      {
        if ($("#jqxFilesDeletions_MoveFilesToSFolder").jqxSwitchButton('checked'))
          GSmartTrackingDeletedSettingsWidget = "Smt_Deleted_Move_IntoFolder_Mode";
        else
        if (GSmartTrackingDeletedSettingsWidget == "Smt_Deleted_Move_IntoFolder_Mode")
          GSmartTrackingDeletedSettingsWidget = "";
      }

      if (GSmartTrackingDeletedSettingsWidget == "")
        GSmartTrackingDeletedSettingsWidget = "Smt_Deleted_Ignore_Mode";
      //alert("Setting deleted radio to "+GSmartTrackingDeletedSettingsWidget);
      SetRadioGroupChecked(GSmartTrackingDeletedSettingsWidget, $("#Smt_Deleted_Copy_Back_Mode"), $("#Smt_Deleted_Ignore_Mode"), $("#Smt_Deleted_Move_IntoFolder_Mode"), $("#Smt_Deleted_DeletePermamently_Mode"), null, null);
      $("#inpt_Smt_DeletedFilesIntoFolderL").jqxInput(
      {
        width: 200,
        height: 25
      }); //, theme: 'shinyblack'
      $("#inpt_Smt_DeletedFilesIntoFolderL").jqxInput('val', GMoveDeletedFilesIntoFolderL);

      $("#inpt_Smt_DeletedFilesIntoFolderR").jqxInput(
      {
        width: 200,
        height: 25
      }); //, theme: 'shinyblack'
      $("#inpt_Smt_DeletedFilesIntoFolderR").jqxInput('val', GMoveDeletedFilesIntoFolderR);

      $("#btn_Smt_DirSelectL").jqxButton(
      {
        theme: 'energyblue'
      });
      $('#btn_Smt_DirSelectL').click(function()
      {
        InitDirTreeSelectForm($("#inpt_Smt_DeletedFilesIntoFolderL"), null, "left");
      });

      $("#btn_Smt_DirSelectR").jqxButton(
      {
        theme: 'energyblue'
      });
      $('#btn_Smt_DirSelectR').click(function()
      {
        InitDirTreeSelectForm($("#inpt_Smt_DeletedFilesIntoFolderR"), null, "right");
      });

    }
    else if (p_index == 2)
    {

      $("#Smt_Confl_Copy_Latest_Mode").jqxRadioButton(
      {
        groupName: "Panel1"
      });
      $("#Smt_Confl_DoNothing_Mode").jqxRadioButton(
      {
        groupName: "Panel1"
      });
      $("#Smt_Confl_AlwaysCopyLeftToRight_Mode").jqxRadioButton(
      {
        groupName: "Panel1"
      });
      $("#Smt_Confl_AlwaysCopyRightToLeft_Mode").jqxRadioButton(
      {
        groupName: "Panel1"
      });
      $("#Smt_Confl_Rename_Mode").jqxRadioButton(
      {
        groupName: "Panel1"
      });
      $("#Smt_Confl_Prompt_Mode").jqxRadioButton(
      {
        groupName: "Panel1"
      });

      if (GSmartTrackingConflictingSettingsWidget == "")
        GSmartTrackingConflictingSettingsWidget = "Smt_Confl_DoNothing_Mode";
      //alert("Setting Conflict radio to "+GSmartTrackingConflictingSettingsWidget);
      SetRadioGroupChecked(GSmartTrackingConflictingSettingsWidget, $("#Smt_Confl_Copy_Latest_Mode"), $("#Smt_Confl_DoNothing_Mode"), $("#Smt_Confl_AlwaysCopyLeftToRight_Mode"), $("#Smt_Confl_AlwaysCopyRightToLeft_Mode"), $("#Smt_Confl_Rename_Mode"), $("#Smt_Confl_Prompt_Mode"));

      $("#Smt_Confl_UseNumbers_Mode").jqxRadioButton(
      {
        groupName: "Panel2"
      });
      $("#Smt_Confl_Replace_Mode").jqxRadioButton(
      {
        groupName: "Panel2"
      });
      if (GSmartTrackingConflictsIfExistsAddNumberWidget == "")
        GSmartTrackingConflictsIfExistsAddNumberWidget = "Smt_Confl_UseNumbers_Mode";
      SetRadioGroupChecked(GSmartTrackingConflictsIfExistsAddNumberWidget, $("#Smt_Confl_UseNumbers_Mode"), $("#Smt_Confl_Replace_Mode"), null, null, null, null);
      if (!GSmt_ConflictsAddNumberCb && !GSmt_ConflictsAddUserCb &&
        !GSmt_ConflictsAddTimeCb && !GSmt_ConflictsAddDollarCb)
        GSmt_ConflictsAddNumberCb = true;

      $("#jqxSmt_ConflictsAddNumberCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_ConflictsAddNumberCb,
        offLabel: ''
      }); //, theme: 'shinyblack'
      $("#jqxSmt_ConflictsAddUserCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_ConflictsAddUserCb,
        offLabel: ''
      }); //, theme: 'shinyblack'
      $("#jqxSmt_ConflictsAddTimeCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_ConflictsAddTimeCb,
        offLabel: ''
      }); //, theme: 'shinyblack'
      $("#jqxSmt_ConflictsAddDollarCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_ConflictsAddDollarCb,
        offLabel: ''
      }); //, theme: 'shinyblack'

      $("#jqxSmt_BothNewConflictCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_BothNewConflictCb,
        offLabel: ''
      }); //, theme: 'shinyblack'
      $("#jqxSmt_BothNewConflictCheckArchiveFlagAndTimestampCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_BothNewConflictCheckArchiveFlagAndTimestampCb,
        offLabel: ''
      }); //, theme: 'shinyblack'

    }
    else if (p_index == 3)
    {
      $("#jqxSmt_DetectUnchangedLeftCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_DetectUnchangedLeftCb,
        offLabel: ''
      }); //, theme: 'shinyblack'
      $("#jqxSmt_DetectUnchangedRightCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_DetectUnchangedRightCb,
        offLabel: ''
      }); //, theme: 'shinyblack'
      $("#jqxSmt_DetectServerSizeModsCb").jqxSwitchButton(
      {
        width: 50,
        height: 25,
        checked: GSmt_DetectServerSizeModsCb,
        offLabel: ''
      }); //, theme: 'shinyblack'
    }

  }

  SetSmartTrackingGlobalVariablesFromFilesTab();

  $('#SmtSet_OK_btn').jqxButton(
  {
    width: 100,
    height: 40
  });
  $('#SmtSet_OK_btn').click(function()
  {

    GSmartTrackingMoveSettingsWidget = GetCheckedRadiobuttonName($("#Smt_Moved_Off_Mode"), $("#Smt_Moved_Fully_Automatic_Mode"), $("#Smt_Moved_Adjust_On_Left_Mode"), $("#Smt_Moved_Adjust_On_Right_Mode"), null, null);

    GSmartTrackingDeletedSettingsWidget = GetCheckedRadiobuttonName($("#Smt_Deleted_Copy_Back_Mode"), $("#Smt_Deleted_Ignore_Mode"), $("#Smt_Deleted_Move_IntoFolder_Mode"), $("#Smt_Deleted_DeletePermamently_Mode"), null, null);
    GSmartTrackingConflictingSettingsWidget = GetCheckedRadiobuttonName($("#Smt_Confl_Copy_Latest_Mode"), $("#Smt_Confl_DoNothing_Mode"), $("#Smt_Confl_AlwaysCopyLeftToRight_Mode"), $("#Smt_Confl_AlwaysCopyRightToLeft_Mode"), $("#Smt_Confl_Rename_Mode"), $("#Smt_Confl_Prompt_Mode"));
    GSmt_DetectUnchangedLeftCb = $("#jqxSmt_DetectUnchangedLeftCb").jqxSwitchButton('val');
    GSmt_DetectUnchangedRightCb = $("#jqxSmt_DetectUnchangedRightCb").jqxSwitchButton('val');
    GSmt_DetectServerSizeModsCb = $("#jqxSmt_DetectServerSizeModsCb").jqxSwitchButton('val');
    GSmt_BothNewConflictCb = $("#jqxSmt_BothNewConflictCb").jqxSwitchButton('val');
    GSmt_BothNewConflictCheckArchiveFlagAndTimestampCb = $("#jqxSmt_BothNewConflictCheckArchiveFlagAndTimestampCb").jqxCheckBox('val');
    GSmt_ConflictsAddNumberCb = $("#jqxSmt_ConflictsAddNumberCb").jqxSwitchButton('val');

    GSmt_ConflictsAddUserCb = $("#jqxSmt_ConflictsAddUserCb").jqxSwitchButton('val');
    GSmt_ConflictsAddTimeCb = $("#jqxSmt_ConflictsAddTimeCb").jqxSwitchButton('val');
    GSmt_ConflictsAddDollarCb = $("#jqxSmt_ConflictsAddDollarCb").jqxSwitchButton('val');
    GSmartTrackingConflictsIfExistsAddNumberWidget = GetCheckedRadiobuttonName($("#Smt_Confl_UseNumbers_Mode"), $("#Smt_Confl_Replace_Mode"), null, null, null, null);

    GMoveDeletedFilesIntoFolderL = $("#inpt_Smt_DeletedFilesIntoFolderL").jqxInput('val');
    GMoveDeletedFilesIntoFolderR = $("#inpt_Smt_DeletedFilesIntoFolderR").jqxInput('val');

    SetFilesTabFromSmartTrackingGlobalVariables();

    SetFilesDeletionsTabFromSmartTrackingGlobalVariables();

    $('#jqxSmartTrackingSettingsDlg').jqxWindow('destroy');
  });

  $('#SmtSet_Cancel_btn').jqxButton(
  {
    width: 100,
    height: 40
  });

  $('#SmtSet_Cancel_btn').click(function()
  {

    $('#jqxSmartTrackingSettingsDlg').jqxWindow('destroy');
  });

  $('#jqxSmartTrackingSettingsDlg').jqxWindow('open');
}

function m_ShowExactMirrorSettingsDlg()
{
  $('#jqxExactMirrorSettingsDlg').jqxWindow(
  {
    maxWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    height: '100%',
    autoOpen: false,
    isModal: true,
    theme: 'energyblue',
    animationType: 'slide'
  });
  $("#jqxMrr_ExactMirrorDeletesCb").jqxSwitchButton(
  {
    width: 50,
    height: 25,
    offLabel: '',
    checked: GMrr_ExactMirrorDeletesCb
  }); //, theme: 'shinyblack'
  $("#jqxMrr_ExactMirrorOverwritesNewerFilesCb").jqxSwitchButton(
  {
    width: 50,
    height: 25,
    offLabel: '',
    checked: GMrr_ExactMirrorOverwritesNewerFilesCb
  }); //, theme: 'shinyblack'

  $("#jqxMrr_DelayDeletionsCb").jqxSwitchButton(
  {
    width: 50,
    height: 25,
    offLabel: '',
    checked: GMrr_DelayDeletionsCb
  }); //, theme: 'shinyblack'

  $("#jqxMrr_DeleteNonMatchingFiltersCb").jqxSwitchButton(
  {
    width: 50,
    height: 25,
    offLabel: '',
    checked: GMrr_DeleteNonMatchingFiltersCb
  }); //, theme: 'shinyblack'
  $("#jqxMrr_DeleteDeselectedCb").jqxSwitchButton(
  {
    width: 50,
    height: 25,
    offLabel: '',
    checked: GMrr_DeleteDeselectedCb
  }); //, theme: 'shinyblack'
  $("#jqxMrr_DeleteNonMatchingMasksCb").jqxSwitchButton(
  {
    width: 50,
    height: 25,
    offLabel: '',
    checked: GMrr_DeleteNonMatchingMasksCb
  }); //, theme: 'shinyblack'

  $("#inptMrr_DelayDelDays").jqxNumberInput(
  {
    width: 30,
    height: 25,
    inputMode: 'simple',
    decimalDigits: 0
  }); //, theme:'shinyblack'
  $("#inptMrr_DelayDelDays").jqxNumberInput('val', GMrr_DelayDelDays);

  $("#inptMrr_DelayDelHours").jqxNumberInput(
  {
    width: 30,
    height: 25,
    inputMode: 'simple',
    decimalDigits: 0
  }); //, theme:'shinyblack'
  $("#inptMrr_DelayDelHours").jqxNumberInput('val', GMrr_DelayDelHours);

  $("#inptMrr_DelayDelMinutes").jqxNumberInput(
  {
    width: 30,
    height: 25,
    inputMode: 'simple',
    decimalDigits: 0
  }); //, theme:'shinyblack'
  $("#inptMrr_DelayDelMinutes").jqxNumberInput('val', GMrr_DelayDelMinutes);

  $("#jqxMrr_OVDelayDeletionsCb").jqxSwitchButton(
  {
    width: 50,
    height: 25,
    offLabel: '',
    checked: GMrr_OVDelayDeletionsCb
  }); //, theme:'shinyblack'

  $("#inptMrr_OVDelayDelDays").jqxNumberInput(
  {
    width: 30,
    height: 25,
    inputMode: 'simple',
    decimalDigits: 0
  }); //, theme:'shinyblack'
  $("#inptMrr_OVDelayDelDays").jqxNumberInput('val', GMrr_OVDelayDelDays);

  $("#inptMrr_OVDelayDelHours").jqxNumberInput(
  {
    width: 30,
    height: 25,
    inputMode: 'simple',
    decimalDigits: 0
  }); //, theme:'shinyblack'
  $("#inptMrr_OVDelayDelHours").jqxNumberInput('val', GMrr_OVDelayDelHours);

  $("#inptMrr_OVDelayDelMinutes").jqxNumberInput(
  {
    width: 30,
    height: 25,
    inputMode: 'simple',
    decimalDigits: 0
  }); //, theme:'shinyblack'
  $("#inptMrr_OVDelayDelMinutes").jqxNumberInput('val', GMrr_OVDelayDelMinutes);

  $('#ExactMirror_OK_btn').jqxButton(
  {
    width: 100,
    height: 40
  });

  $('#ExactMirror_OK_btn').click(function()
  {
    GMrr_ExactMirrorOverwritesNewerFilesCb = $("#jqxMrr_ExactMirrorOverwritesNewerFilesCb").jqxCheckBox('val');
    GMrr_ExactMirrorDeletesCb = $("#jqxMrr_ExactMirrorDeletesCb").jqxSwitchButton('val');
    GMrr_DelayDeletionsCb = $("#jqxMrr_DelayDeletionsCb").jqxSwitchButton('val');
    GMrr_DeleteNonMatchingFiltersCb = $("#jqxMrr_DeleteNonMatchingFiltersCb").jqxSwitchButton('val');
    GMrr_DeleteDeselectedCb = $("#jqxMrr_DeleteDeselectedCb").jqxSwitchButton('val');
    GMrr_DeleteNonMatchingMasksCb = $("#jqxMrr_DeleteNonMatchingMasksCb").jqxSwitchButton('val');
    GMrr_DelayDelDays = $("#inptMrr_DelayDelDays").jqxNumberInput('val');
    GMrr_DelayDelHours = $("#inptMrr_DelayDelHours").jqxNumberInput('val');
    GMrr_DelayDelMinutes = $("#inptMrr_DelayDelMinutes").jqxNumberInput('val');
    GMrr_OVDelayDelDays = $("#inptMrr_OVDelayDelDays").jqxNumberInput('val');
    GMrr_OVDelayDelHours = $("#inptMrr_OVDelayDelHours").jqxNumberInput('val');
    GMrr_OVDelayDelMinutes = $("#inptMrr_OVDelayDelMinutes").jqxNumberInput('val');
    GMrr_OVDelayDeletionsCb = $("#jqxMrr_OVDelayDeletionsCb").jqxSwitchButton('val');
    $('#jqxExactMirrorSettingsDlg').jqxWindow('close');
  });

  $('#ExactMirror_Cancel_btn').jqxButton(
  {
    width: 100,
    height: 40
  });

  $('#ExactMirror_Cancel_btn').click(function()
  {

    $('#jqxExactMirrorSettingsDlg').jqxWindow('close');
  });

  $('#jqxExactMirrorSettingsDlg').jqxWindow('open');
}

function m_ShowMoveSettingsDlg()
{
  $('#jqxMoveSettingsDlg').jqxWindow(
  {
    maxWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    height: '100%',
    autoOpen: false,
    isModal: true,
    theme: 'energyblue',
    animationType: 'slide'
  });

  $("#mmMoveNormal_Mode").jqxRadioButton(
  {
    groupName: "Panel1"
  });
  $("#mmOverwriteDest_Mode").jqxRadioButton(
  {
    groupName: "Panel1"
  });
  $("#mmRenameSource_Mode").jqxRadioButton(
  {
    groupName: "Panel1"
  });
  $("#mmDeleteIdenticalSource_Mode").jqxRadioButton(
  {
    groupName: "Panel1"
  });

  SetRadioGroupChecked(GMoveFilesMode, $("#mmMoveNormal_Mode"), $("#mmOverwriteDest_Mode"), $("#mmRenameSource_Mode"), $("#mmDeleteIdenticalSource_Mode"), null, null);

  $("#jqxMove_MoveByCopyingCb").jqxSwitchButton(
  {
    width: 50,
    height: 25,
    offLabel: '',
    checked: GMove_MoveByCopyingCb
  }); //, theme: 'shinyblack'

  $('#MoveDlg_OK_btn').jqxButton(
  {
    width: 100,
    height: 40
  });
  $('#MoveDlg_OK_btn').click(function()
  {

    GMove_MoveByCopyingCb = $("#jqxMove_MoveByCopyingCb").jqxSwitchButton('val');
    GMoveFilesMode = GetCheckedRadiobuttonName($("#mmMoveNormal_Mode"), $("#mmOverwriteDest_Mode"), $("#mmRenameSource_Mode"), $("#mmDeleteIdenticalSource_Mode"), null, null);
    $('#jqxMoveSettingsDlg').jqxWindow('close');
  });

  $('#MoveDlg_Cancel_btn').jqxButton(
  {
    width: 100,
    height: 40
  });
  $('#MoveDlg_Cancel_btn').click(function()
  {

    $('#jqxMoveSettingsDlg').jqxWindow('close');
  });
  $('#jqxMoveSettingsDlg').jqxWindow('open');

}

function m_EnableDisableFolders()
{

  if ($("#jqxFolders_OnRightSideCreateFolderEachTime").jqxSwitchButton('val') == true)
  {
    $("#jqxFolders_IncludeTimeOfDay").jqxSwitchButton('disabled', false);
  }
  else
  {
    $("#jqxFolders_IncludeTimeOfDay").jqxSwitchButton('checked', false);
    $("#jqxFolders_IncludeTimeOfDay").jqxSwitchButton('disabled', true);
  }

  if ($("#jqxFolders_FlatRightSide").jqxSwitchButton('val') == true)
  {
    $("#jqxFolders_CopyLatestFileIfExists").jqxSwitchButton('disabled', false);
  }
  else
  {
    $("#jqxFolders_CopyLatestFileIfExists").jqxSwitchButton('checked', false);
    $("#jqxFolders_CopyLatestFileIfExists").jqxSwitchButton('disabled', true);
  }

};

function m_EnableDisableSafety()
{
  if ($("#jqxSafetySpecial_WarnIfDeletingFilesMoreThan").jqxSwitchButton('val') == true)
  {
    $("#inptSafetySpecial_WarnIfDeletingFilesMoreThan").jqxFormattedInput('disabled', false);
  }
  else
  {
    $("#inptSafetySpecial_WarnIfDeletingFilesMoreThan").jqxFormattedInput('disabled', true);
  }
  if ($("#jqxSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder").jqxSwitchButton('val') == true)
  {
    $("#inptSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder").jqxFormattedInput('disabled', false);
  }
  else
  {
    $("#inptSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder").jqxFormattedInput('disabled', true);
  }

}

function m_EnableDisableSpecial()
{

  if ($('#jqxSpecialSpFeatr_UsePartialFileUpdatingCb').jqxSwitchButton('val') == true)
  {
    $('#jqxSpecialSpFeatr_RightSideRemoteServiceCb').jqxSwitchButton('disabled', false);
    $('#jqxSpecialSpFeatr_FastModeCb').jqxSwitchButton('disabled', false);
  }
  else
  {
    $('#jqxSpecialSpFeatr_RightSideRemoteServiceCb').jqxSwitchButton('checked', false);
    $('#jqxSpecialSpFeatr_RightSideRemoteServiceCb').jqxSwitchButton('disabled', true);
    $('#jqxSpecialSpFeatr_FastModeCb').jqxSwitchButton('checked', false);
    $('#jqxSpecialSpFeatr_FastModeCb').jqxSwitchButton('disabled', true);
  }
  if ($('#jqxSpecialSpFeatr_RightSideRemoteServiceCb').jqxSwitchButton('val') == true)
  {
    $('#jqxSpecial_DontFallBackFromPartialCb').jqxSwitchButton('disabled', false);
    $('#jqxSpecial_PartialRemoteOneByOneCb').jqxSwitchButton('disabled', false);
  }
  else
  {
    $('#jqxSpecial_DontFallBackFromPartialCb').jqxSwitchButton('checked', false);
    $('#jqxSpecial_DontFallBackFromPartialCb').jqxSwitchButton('disabled', true);
    $('#jqxSpecial_PartialRemoteOneByOneCb').jqxSwitchButton('checked', false);
    $('#jqxSpecial_PartialRemoteOneByOneCb').jqxSwitchButton('disabled', true);
  }
  if ($('#jqxSpecialSpFeatr_LeftSideUsesRemoteServiceCb').jqxSwitchButton('val') == true || $('#jqxSpecialSpFeatr_RightSideUsesRemoteServiceCb').jqxSwitchButton('val') == true)
  {
    $('#jqxSpecialSpFeatr_UseDifferentFoldersCb').jqxSwitchButton('disabled', false);
  }
  else
  {
    $('#jqxSpecialSpFeatr_UseDifferentFoldersCb').jqxSwitchButton('checked', false);
    $('#jqxSpecialSpFeatr_UseDifferentFoldersCb').jqxSwitchButton('disabled', true);
  }

}

function m_EnableDisableMasksAndFiltersGeneral()
{
  if ($("#jqxMasks_ProcessReparsePointsCb").jqxSwitchButton('val') == true)
  {
    $("#jqxMasks_CopyOtherReparsePointsCb").jqxSwitchButton('disabled', false);
    var cb_val = $("#jqxMasks_FollowJunctionPointsFilesCb").jqxSwitchButton('val');
    // $("#jqxMasks_FollowJunctionPointsFilesCb").replaceWith( "<table><tr><td><div id='jqxMasks_FollowJunctionPointsFilesCb'></div></td><td><div>Follow Junction Points/ Symbolic Links to Files</div></td></tr></table>" );
    $("#jqxMasks_FollowJunctionPointsFilesCb").jqxSwitchButton(
    {
      checked: cb_val
    });

    cb_val = $("#jqxMasks_FollowJunctionPointsFoldersCb").jqxSwitchButton('val');
    // $("#jqxMasks_FollowJunctionPointsFoldersCb").replaceWith( "<table><tr><td><div id='jqxMasks_FollowJunctionPointsFoldersCb'></div></td><td><div>Follow Junction Points/ Symbolic Links to Folders</div></td></tr></table>" );
    $("#jqxMasks_FollowJunctionPointsFoldersCb").jqxSwitchButton(
    {
      checked: cb_val
    });

  }
  else
  {
    $("#jqxMasks_CopyOtherReparsePointsCb").jqxSwitchButton('checked', false);
    $("#jqxMasks_CopyOtherReparsePointsCb").jqxSwitchButton('disabled', true);
    var cb_val = $("#jqxMasks_FollowJunctionPointsFilesCb").jqxSwitchButton('val');
    // $("#jqxMasks_FollowJunctionPointsFilesCb").replaceWith( "<table><tr><td><div id='jqxMasks_FollowJunctionPointsFilesCb'></div></td><td><div>Treat File Reparse Points as Normal Files</div></td></tr></table>" );
    $("#jqxMasks_FollowJunctionPointsFilesCb").jqxSwitchButton(
    {
      checked: cb_val
    });

    cb_val = $("#jqxMasks_FollowJunctionPointsFoldersCb").jqxSwitchButton('val');
    // $("#jqxMasks_FollowJunctionPointsFoldersCb").replaceWith( "<table><tr><td><div id='jqxMasks_FollowJunctionPointsFoldersCb'></div></td><td><div>Treat File Reparse Points as Normal Folders</div></td></tr></table>" );
    $("#jqxMasks_FollowJunctionPointsFoldersCb").jqxSwitchButton(
    {
      checked: cb_val
    });

  }

};

function m_EnableDisableMasksAndFiltersFileAge()
{

  if ($("#jqxMasks_FileSizesWithinCb").jqxSwitchButton('val') == true)
  {
    $("#jqxInptMasks_FileSizesMin").jqxInput('disabled', false);
    $("#jqxInptMasks_FileSizesMax").jqxInput('disabled', false);
  }
  else
  {
    $("#jqxInptMasks_FileSizesMin").jqxInput('disabled', true);
    $("#jqxInptMasks_FileSizesMax").jqxInput('disabled', true);
  }
  if ($("#jqxMasks_FileDatesWithinCb").jqxSwitchButton('val') == true)
  {
    $("#jqxInptDateMasks_FileMinDate").jqxDateTimeInput('disabled', false);
    $("#jqxInptDateMasks_FileMaxDate").jqxDateTimeInput('disabled', false);
  }
  else
  {
    $("#jqxInptDateMasks_FileMinDate").jqxDateTimeInput('disabled', true);
    $("#jqxInptDateMasks_FileMaxDate").jqxDateTimeInput('disabled', true);
  }
  if ($("#jqxMasks_FileAgeCb").jqxSwitchButton('val') == true)
  {
    $("#jqxMasks_FileAgeCombo").jqxDropDownList('disabled', false);
    $("#inptMasks_FileAgeDays").jqxFormattedInput('disabled', false);
    $("#inptMasks_FileAgeHours").jqxFormattedInput('disabled', false);
    $("#inptMasks_FileAgeMinutes").jqxFormattedInput('disabled', false);

    $("#Masks_LastModification_Radio_Mode").jqxRadioButton('disabled', false);
    $("#Masks_Creation_Radio_Mode").jqxRadioButton('disabled', false);
    $("#Masks_ApplyToFiles_Radio_Mode").jqxRadioButton('disabled', false);
    $("#Masks_ApplyToFolders_Radio_Mode").jqxRadioButton('disabled', false);
    $("#Masks_ApplyToBoth_Radio_Mode").jqxRadioButton('disabled', false);
  }
  else
  {
    $("#jqxMasks_FileAgeCombo").jqxDropDownList('disabled', true);
    $("#inptMasks_FileAgeDays").jqxFormattedInput('disabled', true);
    $("#inptMasks_FileAgeHours").jqxFormattedInput('disabled', true);
    $("#inptMasks_FileAgeMinutes").jqxFormattedInput('disabled', true);

    $("#Masks_LastModification_Radio_Mode").jqxRadioButton('disabled', true);
    $("#Masks_Creation_Radio_Mode").jqxRadioButton('disabled', true);
    $("#Masks_ApplyToFiles_Radio_Mode").jqxRadioButton('disabled', true);
    $("#Masks_ApplyToFolders_Radio_Mode").jqxRadioButton('disabled', true);
    $("#Masks_ApplyToBoth_Radio_Mode").jqxRadioButton('disabled', true);
  }
  if ($("#jqxMasks_TargetDataRestoreCb").jqxSwitchButton('val') == true)
  {
    $("#jqxInptDateMasks_TargetDateRestoreDate").jqxDateTimeInput('disabled', false);
    $("#jqxInptDateMasks_TargetDateRestoreTime").jqxDateTimeInput('disabled', false);
  }
  else
  {
    $("#jqxInptDateMasks_TargetDateRestoreDate").jqxDateTimeInput('disabled', true);
    $("#jqxInptDateMasks_TargetDateRestoreTime").jqxDateTimeInput('disabled', true);
  }

};

function m_EnableDisableSafetyUnatended()
{
  if ($("#jqxSafetyUnattended_ReplaceMaxPercentCb").jqxSwitchButton('val') == false)
  {
    $("#inptSafetyUnattended_ReplaceMaxPercent").jqxFormattedInput('val', "100");
    $("#inptSafetyUnattended_ReplaceMaxPercent").jqxFormattedInput('disabled', true);
  }
  else
  {
    $("#inptSafetyUnattended_ReplaceMaxPercent").jqxFormattedInput('disabled', false);
    $("#inptSafetyUnattended_ReplaceMaxPercent").jqxFormattedInput('val', "20");
  }

  if ($("#jqxSafetyUnattended_FileDeletionAllowedCb").jqxSwitchButton('val') == false)
  {
    $("#inptSafetyUnattended_FileDeletionAllowed").jqxFormattedInput('val', "0");
    $("#inptSafetyUnattended_FileDeletionAllowed").jqxFormattedInput('disabled', true);
  }
  else
  {
    $("#inptSafetyUnattended_FileDeletionAllowed").jqxFormattedInput('disabled', false);
    $("#inptSafetyUnattended_FileDeletionAllowed").jqxFormattedInput('val', "20");
  }
}
