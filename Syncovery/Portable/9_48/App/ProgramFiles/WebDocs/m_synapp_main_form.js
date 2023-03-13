'use strict';

var MainFormMobileHTML =
  '<table>' +
  '<tr>' +
  '<td>' +
  '<div id=\"jqxMenu\" style=\"visibility: hidden;\">' +
  '<ul>' +
  '<li><br/>New Profile<br/></li>' +
  '<li><br/>Log Files<br/></li>' +
  '<li><br/>Program Settings<br/></li>' +
  '</ul>' +
  '</div>' +
  '</td>' +
  '<td>' +
  '<div><button  id="start_scheduler_button">Start Scheduler</button></div>' +
  '</td>' +
  '<td>' +
  '<div><button  id="refresh_grid_button">Refresh</button></div>' +
  '</td>' +
  '</tr>' +
  '</table>' +
  '<div id=\"titlegrid\"></div>' +
  '<div id=\"jqxgrid\">';

var rowDetails = [];
var GSelectedRow = 0;
var GridDataAdapter = null;

function findById(source, p_ProfileName)
{
  for (var i = 0; i < source.length; i++)
  {
    if (source[i].ProfileName === p_ProfileName)
    {
      return source[i];
    }
  }
  throw "Couldn't find object with id: " + id;
}

function isDetailsInitialized(source, p_ProfileName)
{
  for (var i = 0; i < source.length; i++)
  {
    if (source[i].ProfileName === p_ProfileName)
    {
      return true;
    }
  }
  return false;
}

function HideAllDetails(SelectedRowInd)
{

  //var prev_row = $('#jqxgrid').jqxGrid('selectedrowindexes');
  // IF PREV ROW NOT NOT BLANK LOOP THROUGH ARRAY HIDING selectedrowindexes
  //if (prev_row != '') {

  var rows = $("#jqxgrid").jqxGrid('getdatainformation');
  for (var i = 0; i < rows.rowscount; i++)
  { //prev_row.length
    if ((SelectedRowInd != undefined) && (SelectedRowInd != i))
    {
      $('#jqxgrid').jqxGrid('hiderowdetails', i); //prev_row[i]
    }
  };
}

function InitRowDetailsForm(p_ProfileName)
{

  try
  {
    var Pair = findById(rowDetails, p_ProfileName);
    Pair.element.html(
      '<div class="container">' +
      '<table><tr>' +
      '<td>Left Side:</td><td><div class="inner first"></div></td>' +
      '</tr><tr>' +
      '<td>Right Side:</td><td><div class="inner second"></div></td>' +
      '</tr></table>' +
      '<br/><button  id="EditProfile_btn">Profile</button>' +
      '<button  id="DeleteProfile_btn">Delete</button>' +
      '</div>');
  }
  catch (err)
  {
    var mes = err.message + '  InitRowDetailsForm';
    alert(mes);
  }
}

var initrowdetails = function(p_index, parentElement, gridElement, datarecord)
{
  try
  {
    var details = $($(parentElement).children()[0]);
    var ProfileName = datarecord.Name; //GridDataAdapter.records[GSelectedRow].Name;
    if (isDetailsInitialized(rowDetails, datarecord.Name) == false)
    {
      rowDetails.push(
      {
        ProfileName: datarecord.Name,
        element: details,
        index: p_index
      });
      details.html(
        '<div class="container">' +
        '<table><tr>' +
        '<td>Left Side:</td><td><div class="inner first"></div></td>' +
        '</tr><tr>' +
        '<td>Right Side:</td><td><div class="inner second"></div></td>' +
        '</tr></table>' +
        '<br/><button  id="EditProfile_btn">Edit</button>' +
        '<button  id="DeleteProfile_btn">Delete</button>' +
        '<input  type="button" value="Run" id="run_profile_button" />' +
        '<input  type="button" value="Stop" id="stop_profile_button" />' +

        '</div>');

      $('#EditProfile_btn').jqxButton(
      {
        width: 80,
        height: 40
      });
      $('#EditProfile_btn').on('click', function()
      {

        var sendparams = {};
        sendparams.ProfileName = ProfileName.trim();
        sendparams.token = GClientToken;
        var json = JSON.stringify(sendparams);
        ProfileSource.url = "single_profile.php?qry=" + json;

        var ProfileDataAdapter = new $.jqx.dataAdapter(ProfileSource,
        {
          loadComplete: function()
          {
            HideAllDetails(-1);

            if (ProfileDataAdapter.xhr.responseText == '{"error":"session_timeout"}')
            {
              window.location = '/index.html';
              return;
            }
            else if (ProfileDataAdapter.xhr.responseText == '{"error":"session_busy"}')
            {
              window.location = '/post_session_busy.php';
              return;
            }
            var records = ProfileDataAdapter.records;
            var length = records.length;
            var record = records[0];
            LoadRecordToRegistryList(record, GProfileEditorRegistryList, "");

            m_InitProfileEditorForm(ProfileName, "Edit")

          },

          loadError: function(jqXHR, status, error)
          {

            if (error == "")
              alert("Error. Connection with server might be lost.");
            else
              alert(error);
          }
        });

        ProfileDataAdapter.dataBind();

      });

      $('#DeleteProfile_btn').jqxButton(
      {
        width: 80,
        height: 40
      });
      $('#DeleteProfile_btn').on('click', function()
      {
        DeleteProfile();
      });

      $("#run_profile_button").jqxToggleButton(
      {
        toggled: false,
        height: 40,
        width: 50
      });

      $("#run_profile_button").on('click', function()
      {
        RunSelectedProfile(false);
        //$("#run_profile_button")[0].value = 'Stop';
        $("#run_profile_button").jqxToggleButton('toggled', true);

      });

      $("#stop_profile_button").jqxToggleButton(
      {
        toggled: false,
        height: 40,
        width: 50
      });
      $("#stop_profile_button").on('click', function()
      {
        StopSelectedProfile();
        //$("#run_profile_button")[0].value = 'Run';
        $("#run_profile_button").jqxToggleButton('toggled', false);
      });

    }
  }
  catch (err)
  {
    var mes = err.message + '  initrowdetails';
    alert(mes);
  }
};

function InitMainMobileForm()
{

  $("#MainForm_div").html(MainFormMobileHTML);

  // prepare the data
  var GridSource = {
    datatype: "json",
    datafields: [
    {
      id: 'id',
      type: 'number'
    },
    {
      name: 'Name',
      type: 'string'
    },
    {
      name: 'LeftPath',
      map: 'LeftPath',
      type: 'string'
    },
    {
      name: 'RightPath',
      map: 'RightPath',
      type: 'string'
    },
    {
      name: 'Progress',
      type: 'string'
    },
    {
      name: 'isDisabled',
      type: 'boolean'
    },
    {
      name: 'LastRun',
      type: 'string'
    },
    {
      name: 'NextRun',
      type: 'string'
    }],
    addrow: function(rowid, rowdata, position, commit)
    {
      // synchronize with the server - send insert command
      // call commit with parameter true if the synchronization with the server is successful
      //and with parameter false if the synchronization failed.
      // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
      commit(true);
    },

    deleterow: function(rowid, commit)
    {
      // synchronize with the server - send delete command
      // call commit with parameter true if the synchronization with the server is successful
      //and with parameter false if the synchronization failed.

    },
    root: "Rows",
    id: 'id',
    url: "profiles.json",
    filter: function()
    {
      // update the grid and send a request to the server.
      $("#jqxgrid").jqxGrid('updatebounddata');
      GProfileListChanged = true;
    },

    beforeprocessing: function(data)
    {
      GridSource.totalrecords = data[1].TotalRows;
    }

  };

  GridDataAdapter = new $.jqx.dataAdapter(GridSource,
  {
    downloadComplete: function(data, status, xhr) {

    },
    loadComplete: function(data) {},
    loadError: function(xhr, status, error) {

    },

    beforeSend: function(xhr)
    {
      xhr.setRequestHeader('token', GClientToken);
    }
  });

  $("#titlegrid").jqxGrid(
  {
    width: '100%',
    rowsheight: 50,
    autoheight: true,
    showemptyrow: false,
    theme: 'energyblue',
    columns: [
    {
      text: "&nbsp;&nbsp;<b>" + GSyncoveryTitle + "</b>",
      width: 250
    },
    {
      text: '',
      width: $(window).width() - 270
    }]
  });

  $("#jqxgrid").jqxGrid(
  {
    width: '100%',
    //height: '100%',

    rowsheight: 50,
    source: GridDataAdapter,
    pageable: true,
    pagesize: 20,
    autoheight: true,
    virtualmode: true,
    rowdetails: true,
    rowdetailstemplate:
    {
      rowdetails: "<div style='margin: 10px;'>Row Details</div>",
      rowdetailsheight: 200
    },
    initrowdetails: initrowdetails,
    // pagermode: 'simple',
    //rowsheight: 34,
    //scrollmode: 'deferred',
    //sortable: true,
    //altrows: true,
    //enabletooltips: true,
    //editable: false,
    //selectionmode: 'singlerow',
    //showtoolbar: true,
    rendergridrows: function()
    {
      return GridDataAdapter.records;
    },
    rendertoolbar: function(toolbar) {

    },
    columns: [

      {
        text: 'Profile Name',
        datafield: 'Name',
        width: '50%'
      },
      {
        text: 'Progress',
        datafield: 'Progress',
        width: '50%'
      }

    ]

  });

  $("#jqxgrid").on("bindingcomplete", function(event)
  {

    //$("#jqxgrid").jqxGrid({initrowdetails: initrowdetails});
    //$("#jqxgrid").jqxGrid('selectrow', GSelectedRow);
  });

  $('#jqxgrid').on('rowselect', function(event)
  {

    //GSelectedRow = event.args.rowindex;

    //$('#jqxgrid').jqxGrid('showrowdetails', GSelectedRow);
    //var records = RowDetailDataAdapter.records;
    //var record = records[0];

  });

  $('#jqxgrid').on('rowexpand', function(event)
  {
    // GET ALL SELECTE ROW INDEX (RETURNS ARRAY)

    var args = event.args;

    // GET INDEX
    GSelectedRow = event.args.rowindex; //$('#jqxgrid').jqxGrid('getrowboundindex', event.args.rowindex);
    HideAllDetails(GSelectedRow);

    var RowDetailSource = {
      datatype: "json",
      datafields: [
      {
        id: 'id',
        type: 'number'
      },
      {
        name: 'Name',
        type: 'string'
      },
      {
        name: 'LeftPath',
        map: 'LeftPath',
        type: 'string'
      },
      {
        name: 'RightPath',
        map: 'RightPath',
        type: 'string'
      },
      {
        name: 'Progress',
        type: 'string'
      },
      {
        name: 'isDisabled',
        type: 'boolean'
      },
      {
        name: 'LastRun',
        type: 'string'
      },
      {
        name: 'NextRun',
        type: 'string'
      }],

      root: "Rows",
      id: 'id'

    };

    var RowDetailDataAdapter = new $.jqx.dataAdapter(RowDetailSource,
    {
      downloadComplete: function(data, status, xhr) {},
      loadComplete: function(data)
      {

        if (RowDetailDataAdapter.xhr.responseText == '{"error":"session_timeout"}')
        {
          window.location = '/index.html';
          return;
        }
        else if (RowDetailDataAdapter.xhr.responseText == '{"error":"session_busy"}')
        {
          window.location = '/post_session_busy.php';
          return;
        }

        var records = RowDetailDataAdapter.records;
        var record = records[0];

        $("div.first").replaceWith('<div class="inner first"><b>' + record.LeftPath + '</b></div>');
        $("div.second").replaceWith('<div class="inner second"><b>' + record.RightPath + '</b></div>');

        // SET CURRENT ROW AS SELECTED
        $('#jqxgrid').jqxGrid(
        {
          selectedrowindex: GSelectedRow
        });

      },
      loadError: function(xhr, status, error) {

      },

      beforeSend: function(xhr)
      {
        xhr.setRequestHeader('token', GClientToken);
      }
    });

    RowDetailSource.url = 'profiles.json?recordstartindex=' + GSelectedRow + '&recordendindex=' + GSelectedRow + 1;

    RowDetailDataAdapter.dataBind();

  });

  $('#jqxgrid').on('rowcollapse', function(event)
  {
    //CLEAR SELECTION TO REOPEN AGAIN
    // $('#jqxgrid').jqxGrid('clearselection');
  });

  var refreshInterval = setInterval(CheckForEventFunc, 2000);
  CheckForEventFunc(); // show status immediately

  $("#jqxMenu").jqxMenu(
  {
    width: '100%',
    height: '32px',
    autoSizeMainItems: true
  });
  $("#jqxMenu").jqxMenu('minimize');
  $("#jqxMenu").css('visibility', 'visible');
  $('#jqxMenu').on('itemclick', function(event)
  {
    if ($(event.target).text() == 'New Profile')
    {
      LoadDefaultsToRegistryList(GProfileEditorRegistryList, true);
      GSelectedRow = -1;
      m_InitProfileEditorForm("", "Insert")
    }
    else if ($(event.target).text() == 'Log Files')
    {
      ShowLogFiles();
    }
    else if ($(event.target).text() == 'Program Settings')
    {
      m_OnProgramSettings();
    }

  });
  $("#start_scheduler_button").jqxButton(
  {
    height: 35
  });
  $("#start_scheduler_button").on('click', function()
  {
    if ($('#start_scheduler_button').val() == 'Start Scheduler')
    {
      StartScheduler();
    }
    else if ($('#start_scheduler_button').val() == 'Stop Scheduler')
    {
      StopScheduler();
    }
  });

  $("#refresh_grid_button").jqxButton(
  {
    height: 35
  });
  $("#refresh_grid_button").on('click', function()
  {
    while (rowDetails.length > 0)
    {
      rowDetails[0].element.html('');
      rowDetails.pop();
    }

    $("#jqxgrid").jqxGrid(
    {
      source: GridDataAdapter,
      initrowdetails: initrowdetails
    }); //

    //GridDataAdapter.dataBind();
  });

  GridDataAdapter.dataBind();
  GProfileListChanged = true;

  // Create a jqxNavigationBar
  //    $("#jqxnavigationbar").jqxNavigationBar({ theme: 'energyblue', width: '100%', height: '100%' });

}

function ShowLogFiles()
{
  HideAllDetails(-1);
  var SelectedProfile = SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', GSelectedRow).Name;
  if (SelectedProfile == '')
  {
    alert("Please select a profile");
    return;
  }

  var sendparams = {};
  sendparams.ProfileName = SelectedProfile.trim();
  sendparams.token = GClientToken;
  var json = JSON.stringify(sendparams);

  //      var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
  //      var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex ).Name;

  $("#LogFilesDlg_div").html(LogFilesDlgHTML);

  $('#m_jqxLogFilesDlg').jqxWindow(
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

  var GridSource = {
    datatype: "json",
    id: 'id',
    url: "logfiles.json",
    root: "Rows",
    datafields: [
    {
      id: 'id',
      type: 'number'
    },
    {
      name: 'LogFileName',
      type: 'string'
    }]
  };

  var GridDataAdapter = new $.jqx.dataAdapter(GridSource,
  {
    downloadComplete: function(data, status, xhr) {},
    loadComplete: function(data) {

    },
    loadError: function(xhr, status, error) {

    },
    beforeSend: function(xhr)
    {
      xhr.setRequestHeader('ProfileName', SelectedProfile);
      xhr.setRequestHeader('token', GClientToken);
    }
  });

  $('#jqx_log_grid').jqxGrid(
  {
    width: '100%',

    rowsheight: 50,
    source: GridDataAdapter,
    pageable: true,
    pagesize: 20,
    autoheight: false,
    //virtualmode: true,
    columns: [

      {
        text: ' ',
        datafield: 'id',
        width: '10%'
      },
      {
        text: 'Log File',
        datafield: 'LogFileName',
        width: '90%'
      }
    ]

  });

  $('#LogFiles_Close_btn').jqxButton(
  {
    width: 100,
    height: 30
  });

  $('#LogFiles_Close_btn').click(function()
  {

    $('#m_jqxLogFilesDlg').jqxWindow('destroy');
  });

  $('#jqxLogFilesDlg').on('close', function(event)
  {

    $('#m_jqxLogFilesDlg').jqxWindow('destroy');
  });

  $('#m_jqxLogFilesDlg').jqxWindow('open');
  $('#m_jqxLogFilesDlg').jqxWindow('focus');

}

/*$("#run_selected_profile_button").jqxButton();
                    $("#run_selected_profile_button").on('click', function ()
                    {
                       RunSelectedProfile();
                    });

                    $("#stop_selected_profile_button").jqxButton();


                    $("#stop_selected_profile_button").on('click', function ()
                    {
                       StopSelectedProfile();
                    });

                    $("#program_settings_button").jqxButton();

                    var G_ShedIdleTimeAfterStartupCb = true;


                    $("#program_settings_button").on('click', function ()
                    {
                       OnProgramSettings();
                    });



                    // update row.
                    $("#updaterowbutton").jqxButton();
                    $("#updaterowbutton").on('click', function ()
                    {
                         EditSelectedProfile();
                    });
                    // create new row.
                    $("#addrowbutton").jqxButton();
                    $("#addrowbutton").on('click', function ()
                    {
                        AddProfile();
                    });
                    // delete row.
                    $("#deleterowbutton").jqxButton();
                    $("#deleterowbutton").on('click', function () {
                       DeleteProfile();
                    });
                    $("#start_scheduler_button").jqxButton();
                    $("#start_scheduler_button").on('click', function () {
                      if( $('#start_scheduler_button').val() == 'Start Scheduler'  )
                      {
                         StartScheduler();
                      }
                      else if( $('#start_scheduler_button').val() == 'Stop Scheduler' )
                      {
                         StopScheduler();
                      }
                    });


                    $("#refresh_grid_button").jqxButton();
                    $("#refresh_grid_button").on('click', function () {
                      $("#jqxgrid").jqxGrid( {source: GridDataAdapter });
                       GridDataAdapter.dataBind();
                       GProfileListChanged = true;
                    });
                    $("#log_files_button").jqxButton();
                    $("#log_files_button").on('click', function () {
                       LogFiles();
                    });

*/

function m_OnProgramSettings()
{

  $("#ProgramSettingsDlg_div").html(ProgramSettingsFormHTML);

  $('#jqxProgramSettingsDlg').jqxWindow(
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

  function OnInitNavBarContent(p_index)
  {
    if (p_index == 0)
    {
      if (!GisSyncoveryWindows)
      {
        // not needed right now but leaving it here for future reference
        // $('#jqxProgramSettingsTabs').jqxTabs('disableAt', 8);
        // $('#jqxProgramSettingsTabs').jqxTabs('disableAt', 7);
      }
      // Startup
      $("#inptShedIdleTimeAfterStartup").jqxNumberInput(
      {
        width: 50,
        height: 25,
        inputMode: 'simple',
        decimalDigits: 0
      });

      $("#inptDetectInternetInterval").jqxNumberInput(
      {
        width: 50,
        height: 25,
        inputMode: 'simple',
        decimalDigits: 0
      });

      $('#jqxShedIdleTimeAfterStartupCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });

      $('#jqxShedIdleTimeAfterStartupCb').on('change', function(event)
      {
        var checked = event.args.checked;
        if (!checked)
          $("#inptShedIdleTimeAfterStartup").jqxNumberInput('val', 0);
        else if ($("#inptShedIdleTimeAfterStartup").jqxNumberInput('val') == 0)
          $("#inptShedIdleTimeAfterStartup").jqxNumberInput('val', 1);

      });

      $('#jqxDetectInternetCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });

      $("#inptDetectInternetPositive").jqxInput(
      {
        width: 280,
        height: 45
      });
      $("#inptDetectInternetNegative").jqxInput(
      {
        width: 280,
        height: 45
      });

      $('#jqxDetectInternetEvenManuallyCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });

    }
    if (p_index == 1)
    {
      // Logs

      $("#jqxLoggingKindCombo").jqxDropDownList(
      {
        width: 150,
        height: 25,
        selectedIndex: 23,
        source: ['No Logging', 'One Common Log File', 'Separate Log File For Each Profile',
          'Separate Log File For Each Run (Recommended)',
          'Separate Log File For Each Day (Per Profile)'
        ]
      });

      $('#jqxFAbbreviatedLogsCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFLogTimingCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFLogTimingDetailsCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $("#inptLogPath").jqxInput(
      {
        width: 100,
        height: 25
      });

      $("#btnLogPathDirSelect").jqxButton(
      {
        theme: 'energyblue'
      });
      $('#btnLogPathDirSelect').click(function()
      {
        InitDirTreeSelectForm($("#inptLogPath"));
      });
      $('#jqxFIPLoggingCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFLogSmartTrackingCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFLogFileListCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFDetailedSecurityLoggingCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFLogTimestampsCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFLogSharesCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFLogSyntheticDetailsCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFLogSpeedLimitCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFWithThreadCPHistoryCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFOutputFileListingsCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });
      $('#jqxFDeleteNothingToDoLogsCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });

      $("#inptiLogRealtimeStatusMinutes").jqxNumberInput(
      {
        width: 30,
        height: 25,
        inputMode: 'simple',
        decimalDigits: 0
      });
      $('#jqxiLogRealtimeStatusMinutesCb').jqxSwitchButton(
      {
        width: 50,
        height: 25,
        offLabel: ''
      });

      $('#jqxiLogRealtimeStatusMinutesCb').on('change', function(event)
      {
        var checked = event.args.checked;
        if (!checked)
          $("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val', 0);
        else if ($("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val') == 0)
          $("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val', 1);

      });

      $("#jqxiLogRealtimeStatusLevelCombo").jqxDropDownList(
      {
        width: 100,
        height: 25,
        selectedIndex: 0,
        source: ['Less Info', 'More Info', 'Detailed', 'Extreme']
      });
    }

  };
  ////////////////////////////////////////////////////////////////////////////////

  /*
                          //Notify Tab
                         $('#jqxSendEmailWhenTasksCompleteCb').jqxCheckBox({ width: 250, height: 25 });



                         $('#jqxManualEmailCb').jqxCheckBox({ width: 250, height: 25 });
                         $("#jqxScheduledEmailCb").jqxCheckBox({ width: 250, height: 25 });
                         $("#jqxEmailEmptyCb").jqxCheckBox({ width: 300, height: 25 });
                         $("#jqxEmailOnErrorOnlyCb").jqxCheckBox({ width: 300, height: 25 });
                         $("#jqxEmailWhenFileReplacedCb").jqxCheckBox({ width: 300, height: 25 });
                         $("#jqxEmailConflictCb").jqxCheckBox({ width: 300, height: 25 });
                         $("#jqxNoEmailIfRerunSucceedsCb").jqxCheckBox({ width: 300, height: 25 });
                         $("#jqxNoEmailIfVolumeMissingCb").jqxCheckBox({ width: 350, height: 25 });
                         $("#jqxEmailLogfileCb").jqxCheckBox({ width: 350, height: 25 });
                         $("#jqxEmailFilteredItemsCb").jqxCheckBox({ width: 350, height: 25 });
                         $("#jqxEmailSimpleSubjectCb").jqxCheckBox({ width: 350, height: 25 });
                         $("#jqxHTMLEmailCb").jqxCheckBox({ width: 350, height: 25 });
                         $("#jqxErrorsNotInDigestCb").jqxCheckBox({ width: 350, height: 25  });
                         $("#jqxEmailFilesCb").jqxCheckBox({ width: 350, height: 25  });
                         $("#jqxDigestCb").jqxCheckBox({ width: 350, height: 25  });
                         $("#jqxDigestIntervalCombo").jqxDropDownList({ width : 100, height : 25 , selectedIndex: 23, source:  [ '5 minutes', '10 minutes', '15 minutes', '20 minutes', '30 minutes', '40 minutes', '45 minutes', '60 minutes', '90 minutes', '2 hours', '3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours', '11 hours', '12 hours', '15 hours', '18 hours', '21 hours', 'day'] });
                         $("#jqxEmailDailySummaryCb").jqxCheckBox({ width: 350, height: 25  });

                         $("#jqxDailySummaryTime_Input").jqxDateTimeInput({width: 100, height: 25, formatString: 'hh:mm tt', showCalendarButton: false, showTimeButton: true });
                         $("#jqxFirstDigestTime_Input").jqxDateTimeInput({width: 100, height: 25, formatString: 'hh:mm tt', showCalendarButton: false, showTimeButton: true });
                         $("#jqxEmailModeForRetriesCombo").jqxDropDownList({ width : 250, height : 25 , selectedIndex: 0, source:  [

                          'Each failing run / attempt', 'Last Run Only', '1-st run, then every other run', '2-nd run, then every other run',
                          '1-st run and last run only',  '2-nd run and last run only', '3-rd run and last run only', '5-th run and last run only',
                          '10-th run and last run only', '1-st, 4-th, 8-th, 16-th, 32nd run etc. until last run',
                          '2-st, 5-th, 10-th, 20-th, 40-th run etc. until last run' , '3-rd, 8-th, 16-th, 32nd run etc. until last run',
                          '5-th, 10-th, 20-th, 40-th run etc. until last run',  '10-th, 25-th, 50-th, 100-th run etc. until last run'
                          ] });





                          $('#EmailSettings_btn_ProgramSettingsDlg').jqxButton({});

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

                             $("#jqxSMTPAuthCb").jqxCheckBox({ width: 250, height: 25 , checked : G_EmailSettings_SMTPAuth });
                             $("#jqxSASLCb").jqxCheckBox({ width: 250, height: 25 , checked : G_EmailSettings_SASL });
                             $("#jqxExplicitTLSCb").jqxCheckBox({ width: 250, height: 25 , checked : G_EmailSettings_ExplicitTLS });


                             $("#jqxEmailSSLCombo").jqxDropDownList({ width : 100, height : 25 , selectedIndex: 0, source:  [
                               'No SSL', 'SSL v2', 'SSL v2/3', 'SSL v3', 'TLS v1', 'TLS v1.1', 'TLS v1.2'] });
                             $("#jqxEmailSSLCombo").jqxDropDownList('selectIndex', G_EmailSettings_EmailSSL);

                             $('#EmailSettings_OK_btn').jqxButton({});
                             $('#EmailSettings_OK_btn').on('click', function ()
                              {
                                  G_EmailSettings_RecipientsText = $('#inptRecipientsText').jqxInput('val');
                                  G_EmailSettings_SenderName = $('#inptSenderName').jqxInput('val');
                                  G_EmailSettings_SenderEmail = $('#inptSenderEmail').jqxInput('val');
                                  G_EmailSettings_SMTPServer = $('#inptSMTPServer').jqxInput('val');
                                  G_EmailSettings_SMTPPort = $('#inptSMTPPort').jqxInput('val');
                                  G_EmailSettings_SMTPUser = $('#inptSMTPUser').jqxInput('val');
                                  G_EmailSettings_SMTPPassword = $('#inptSMTPPassword').jqxPasswordInput('val');

                                  G_EmailSettings_SMTPAuth = $("#jqxSMTPAuthCb").jqxCheckBox('val');
                                  G_EmailSettings_SASL = $("#jqxSASLCb").jqxCheckBox('val');
                                  G_EmailSettings_ExplicitTLS = $("#jqxExplicitTLSCb").jqxCheckBox('val');
                                  G_EmailSettings_EmailSSL = $("#jqxEmailSSLCombo").jqxDropDownList('getSelectedIndex' );


                                  $('#jqxEmailSettingsDlg').jqxWindow('close');

                              });
                             $('#EmailSettings_Cancel_btn').jqxButton({});
                             $('#EmailSettings_Cancel_btn').on('click', function ()
                              {


                                 $('#jqxEmailSettingsDlg').jqxWindow('close');
                              });
                             $('#jqxEmailSettingsDlg').jqxWindow('open');
                          });



                          function EnableDisableControlsNotifyTab(val)
                          {
                               $('#jqxManualEmailCb').jqxCheckBox( 'disabled', !val );
                               $("#jqxScheduledEmailCb").jqxCheckBox('disabled', !val);
                               $("#jqxEmailEmptyCb").jqxCheckBox('disabled', !val);
                               $("#jqxEmailOnErrorOnlyCb").jqxCheckBox('disabled', !val);
                               $("#jqxEmailWhenFileReplacedCb").jqxCheckBox('disabled', !val);
                               $("#jqxEmailConflictCb").jqxCheckBox('disabled', !val);
                               $("#jqxNoEmailIfRerunSucceedsCb").jqxCheckBox('disabled', !val);
                               $("#jqxNoEmailIfVolumeMissingCb").jqxCheckBox('disabled', !val);
                               $("#jqxEmailLogfileCb").jqxCheckBox('disabled', !val);
                               $("#jqxEmailFilteredItemsCb").jqxCheckBox('disabled', !val);
                               $("#jqxEmailSimpleSubjectCb").jqxCheckBox('disabled', !val);
                               $("#jqxHTMLEmailCb").jqxCheckBox('disabled', !val);
                               $("#jqxErrorsNotInDigestCb").jqxCheckBox('disabled', !val);
                               $("#jqxEmailFilesCb").jqxCheckBox('disabled', !val);
                               $("#jqxDigestCb").jqxDropDownList('disabled', !val);
                               $("#jqxDigestIntervalCombo").jqxDropDownList('disabled', !val);
                               $("#jqxEmailDailySummaryCb").jqxCheckBox('disabled', !val);
                               $("#jqxDailySummaryTime_Input").jqxDateTimeInput('disabled', !val);
                               $("#jqxFirstDigestTime_Input").jqxDateTimeInput('disabled', !val);
                               $("#jqxEmailModeForRetriesCombo").jqxDropDownList('disabled', !val);
                          }

                          $('#jqxSendEmailWhenTasksCompleteCb').on('change', function (event)
                          {
                             var checked = event.args.checked;
                             EnableDisableControlsNotifyTab(checked);
                          });
                          //tab Misc



                   $("#inptTempPath").jqxInput({ width : 300, height : 25  });

                         $("#btnTempPathSelect").jqxButton({ theme: 'energyblue' });
                         $('#btnTempPathSelect').click(function () {
                            InitDirTreeSelectForm($("#inptTempPath"));
                          });

                         $("#inptiShutdownWait").jqxNumberInput({ width : 30, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                         $("#jqxSchedulerCanPromptForVolumesCb").jqxCheckBox({ width: 600, height: 25  });

                         $("#jqxFailIfRemoteListingFailsCb").jqxCheckBox({ width: 400, height: 25  });
                         $("#jqxRealtimeKeepAliveSecondsCb").jqxCheckBox({ width: 400, height: 25  });
                         $("#jqxRealtimeKeepAliveSecondsCb").on('click', function ()
                         {
                                      if( $("#jqxRealtimeKeepAliveSecondsCb").jqxCheckBox('val') == false )
                                      {
                                         $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput( 'val', 0 );
                                         $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput( 'disabled', true );
                                      }
                                      else
                                        $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput( 'disabled', false );

                         });
                         $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput({ width : 30, height : 25 , inputMode: 'simple', decimalDigits: 0 });

                   $("#inptRegName").jqxInput({ width : 300, height : 25  });
                   $("#inptRegCode").jqxInput({ width : 300, height : 25  });


                         //Tab Advanced
                         $("#inpti_iMaxThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                         $("#inpti_iSeparateProcesses").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                         $("#inpti_BufSize").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                         $("#inpti_iSplitAfterEntries").jqxNumberInput({ width : 70, height : 25 , inputMode: 'simple', spinButtons: true, decimalDigits: 2 });
                         $("#jqxSplitAfterEntriesCb").jqxCheckBox({ width: 400, height: 25  });
                         $("#jqxSplitAfterEntriesCb").on('click', function ()
                         {
                                      if( $("#jqxSplitAfterEntriesCb").jqxCheckBox('val') == false )
                                      {
                                         $("#inpti_iSplitAfterEntries").jqxNumberInput( 'val', 0 );
                                         $("#inpti_iSplitAfterEntries").jqxNumberInput( 'disabled', true );
                                      }
                                      else
                                        $("#inpti_iSplitAfterEntries").jqxNumberInput( 'disabled', false );

                         });

                         $("#jqxWithGlobalLimitsCb").jqxCheckBox({ width: 500, height: 25  });
                         $("#jqxUseGlobalSpeedLimitCb").jqxCheckBox({ width: 400, height: 25  });
                         $("#inptGlobalSpeedLimit").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                         $("#jqxSyncIgnoreWeekdaysCb").jqxCheckBox({ width: 400, height: 25  });
                         $("#jqxSyncForceSeparateMonitorsCb").jqxCheckBox({ width: 400, height: 25  });
                         $("#jqxUserSpecificMutexesCb").jqxCheckBox({ width: 800, height: 25  });

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
                        $("#jqxAcceptNewServers").jqxCheckBox({ width: 300, height: 25  });

                        //tab Database
                        $("#inpt_DatabasePath").jqxInput({ width : 500, height : 25  });
                        $("#btnDatabasePath").jqxButton({ theme: 'energyblue' });
                        $('#btnDatabasePath').click(function () {
                            InitDirTreeSelectForm($("#inpt_DatabasePath"));
                          });
                        $("#jqxSyncNeverShareDatabaseCb").jqxCheckBox({ width: 400, height: 25  });


                        $("#DBServerType_Embedded_Firebird_Mode").jqxRadioButton({groupName :"Database"});
                        $("#DBServerType_Standalone_Firebird_Local_Mode").jqxRadioButton({groupName :"Database"});
                        $("#DBServerType_Standalone_Firebird_TCP_Mode").jqxRadioButton({groupName :"Database"});


                        $("#inpt_DBServerUsername").jqxInput({ width : 100, height : 25  });
                        $("#inpt_DBServerPassword").jqxInput({ width : 100, height : 25  });
                        $("#inpt_DBServerAddress").jqxInput({ width : 100, height : 25  });

                         //tab Event Log
                        $("#jqxEventLogServiceStartStopCb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogSchedulerStartStopCb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogServiceErrorCb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogApplicationErrorCb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogGeneralWarningsCb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogProfileRunStartedCb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogProfileCompletedWithoutECb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogProfileCompletedWithECb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogProfileGeneralECb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogProfileRunWithWarningsCb").jqxCheckBox({ width: 400, height: 25  });
                        $("#jqxEventLogProfileModifiedByUserCb").jqxCheckBox({ width: 400, height: 25  });

                        // Performance
                        $("#jqxCPUAffinityCPU0Cb").jqxCheckBox({ width: 80, height: 25  });
                        $("#jqxCPUAffinityCPU1Cb").jqxCheckBox({ width: 80, height: 25  });
                        $("#jqxCPUAffinityCPU2Cb").jqxCheckBox({ width: 80, height: 25  });
                        $("#jqxCPUAffinityCPU3Cb").jqxCheckBox({ width: 80, height: 25  });


                        $("#jqxSyncThreadPriorityCombo").jqxDropDownList({ width : 100, height : 25 , selectedIndex: 0, source:  [
                               'Idle', 'Lowest', 'Lower', 'Normal', 'Higher', 'Highest', 'TimeCritical'] });

                        $("#inpt_iRemoteAndCacheScanningThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                        $("#inpt_iLocalScanningThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                        $("#inpt_iInternetScanningThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });
                        $("#inpt_iNetworkScanningThreads").jqxNumberInput({ width : 50, height : 25 , inputMode: 'simple', decimalDigits: 0 });

                        //Certificates
                        var data = [];
                        if ( Gcertificate_names != '' )
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



                          $('#Certificates_New_btn').jqxButton({});
                                  $('#Certificates_New_btn').on('click', function () {
                                     $("#inpt_certificates_certname_forreference").jqxInput('value', '');
                                     $("#inpt_certificates_private_keyfile").jqxInput('value', '');
                                     $("#inpt_certificates_public_keyfile").jqxInput('value', '');
                                  });
                                  $('#Certificates_Add_btn').jqxButton({});
                                  $('#Certificates_Add_btn').on('click', function () {
                                      var cert_name = $("#inpt_certificates_certname_forreference").jqxInput('value');
                                      if( cert_name != '' )
                                      {
                                        if( Gcertificate_names != '' )
                                        {
                                          Gcertificate_names =  Gcertificate_names + ',' + cert_name;
                                          Gcertificates_private_keyfiles =  Gcertificates_private_keyfiles + ',' + $("#inpt_certificates_private_keyfile").jqxInput('value');
                                          Gcertificates_public_keyfiles = Gcertificates_public_keyfiles + ',' + $("#inpt_certificates_public_keyfile").jqxInput('value');
                                        }
                                        else
                                        {
                                          Gcertificate_names = cert_name;
                                          Gcertificates_private_keyfiles =  $("#inpt_certificates_private_keyfile").jqxInput('value');
                                          Gcertificates_public_keyfiles = $("#inpt_certificates_public_keyfile").jqxInput('value');
                                        }

                                        $('#inpt_certificates_certificates').jqxListBox({source: Gcertificate_names.split('\n')});
                                      }
                                  });

                                  $('#Certificates_Update_btn').jqxButton({});
                                  $('#Certificates_Update_btn').on('click', function () {
                                     var selectedIndex = $('#inpt_certificates_certificates').jqxListBox('selectedIndex');
                                     if( selectedIndex != -1 )
                                     {
                                        var data = Gcertificates_private_keyfiles.split('\n');
                                        data[selectedIndex] = $("#inpt_certificates_private_keyfile").jqxInput('value');
                                        Gcertificates_private_keyfiles = data.join();

                                        data = Gcertificates_public_keyfiles.split('\n');
                                        data[selectedIndex] = $("#inpt_certificates_public_keyfile").jqxInput('value');
                                        Gcertificates_public_keyfiles = data.join();
                                     }
                                  });

                                  $('#Certificates_Remove_btn').jqxButton({});
                                  $('#Certificates_Remove_btn').on('click', function () {
                                     var selectedIndex = $('#inpt_certificates_certificates').jqxListBox('selectedIndex');
                                     if( selectedIndex != -1 )
                                     {
                                        var data = Gcertificate_names.split('\n');
                                        data.splice(selectedIndex, 1);
                                        Gcertificate_names = data.join();
                                        $("#inpt_certificates_certificates").jqxListBox('removeAt', selectedIndex );

                                        data = Gcertificates_private_keyfiles.split('\n');
                                        data.splice(selectedIndex, 1);
                                        Gcertificates_private_keyfiles = data.join();

                                        data = Gcertificates_public_keyfiles.split('\n');
                                        data.splice(selectedIndex, 1);
                                        Gcertificates_public_keyfiles = data.join();
                                     }
                                  });


  ///////////////////////////////////////////////////////////////////







                          $('#OK_btn_ProgramSettingsDlg').click(function ()
                          {
                               var sendparams = { };
                               sendparams.token = GClientToken;

                               sendparams['SchedulerIdleStartupMinutes'] = $("#inptShedIdleTimeAfterStartup").jqxNumberInput( 'val');
                               sendparams['DetectInternet'] = $('#jqxDetectInternetCb').jqxCheckBox('val');
                               sendparams['DetectInternetInterval'] = $("#inptDetectInternetInterval").jqxNumberInput('val');
                               sendparams['DetectInternetEvenManually'] = $('#jqxDetectInternetEvenManuallyCb').jqxCheckBox('val');
                               sendparams['LoggingKind'] = $("#jqxLoggingKindCombo").jqxDropDownList('getSelectedIndex' );
                               sendparams['FAbbreviatedLogs'] = $('#jqxFAbbreviatedLogsCb').jqxCheckBox('val');
                               sendparams['FLogTiming'] = $('#jqxFLogTimingCb').jqxCheckBox('val');
                               sendparams['FLogTimingDetails'] = $('#jqxFLogTimingDetailsCb').jqxCheckBox('val');
                               sendparams['LogPath'] = $("#inptLogPath").jqxInput('val');
                               sendparams['FIPLogging'] = $('#jqxFIPLoggingCb').jqxCheckBox('val');
                               sendparams['FLogSmartTracking'] = $('#jqxFLogSmartTrackingCb').jqxCheckBox('val');
                               sendparams['FLogFileList'] = $('#jqxFLogFileListCb').jqxCheckBox('val');
                               sendparams['FDetailedSecurityLogging'] = $('#jqxFDetailedSecurityLoggingCb').jqxCheckBox('val');
                               sendparams['FLogTimestamps'] = $('#jqxFLogTimestampsCb').jqxCheckBox('val');
                               sendparams['FLogShares'] = $('#jqxFLogSharesCb').jqxCheckBox('val');
                               sendparams['FLogSyntheticDetails'] = $('#jqxFLogSyntheticDetailsCb').jqxCheckBox('val');
                               sendparams['FLogSpeedLimit'] = $('#jqxFLogSpeedLimitCb').jqxCheckBox('val');
                               sendparams['FWithThreadCPHistory'] = $('#jqxFWithThreadCPHistoryCb').jqxCheckBox('val');
                               sendparams['FOutputFileListings'] = $('#jqxFOutputFileListingsCb').jqxCheckBox('val');
                               sendparams['FDeleteNothingToDoLogs'] = $('#jqxFDeleteNothingToDoLogsCb').jqxCheckBox('val');
                               sendparams['iLogRealtimeStatusMinutes'] = $("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val');
                               sendparams['iLogRealtimeStatusLevel'] = $("#jqxiLogRealtimeStatusLevelCombo").jqxDropDownList( 'getSelectedIndex' );
                               sendparams['DetectInternetPositive'] = $("#inptDetectInternetPositive").jqxInput( 'val' );
                               sendparams['DetectInternetNegative'] = $("#inptDetectInternetNegative").jqxInput( 'val' );
                               sendparams['Email'] = $("#jqxSendEmailWhenTasksCompleteCb").jqxCheckBox('val');
                               sendparams['ManualEmail'] = $("#jqxManualEmailCb").jqxCheckBox('val');
                               sendparams['ScheduledEmail'] = $("#jqxScheduledEmailCb").jqxCheckBox('val');
                               sendparams['EmailEmpty'] = $("#jqxEmailEmptyCb").jqxCheckBox('val');
                               sendparams['EmailOnErrorOnly'] = $("#jqxEmailOnErrorOnlyCb").jqxCheckBox('val');
                               sendparams['EmailWhenFileReplaced'] = $("#jqxEmailWhenFileReplacedCb").jqxCheckBox('val');
                               sendparams['EmailConflict'] = $("#jqxEmailConflictCb").jqxCheckBox('val');
                               sendparams['NoEmailIfRerunSucceeds'] = $("#jqxNoEmailIfRerunSucceedsCb").jqxCheckBox('val');
                               sendparams['NoEmailIfVolumeMissing'] = $("#jqxNoEmailIfVolumeMissingCb").jqxCheckBox('val');
                               sendparams['EmailLogfile'] = $("#jqxEmailLogfileCb").jqxCheckBox('val');
                               sendparams['EmailFilteredItems'] = $("#jqxEmailFilteredItemsCb").jqxCheckBox('val');
                               sendparams['EmailSimpleSubject'] = $("#jqxEmailSimpleSubjectCb").jqxCheckBox('val');
                               sendparams['HTMLEmail'] = $("#jqxHTMLEmailCb").jqxCheckBox('val');
                               sendparams['ErrorsNotInDigest'] = $("#jqxErrorsNotInDigestCb").jqxCheckBox('val');
                               sendparams['EmailFiles'] = $("#jqxEmailFilesCb").jqxCheckBox('val');
                               sendparams['EmailDigest'] = $("#jqxDigestCb").jqxCheckBox('val');
                               sendparams['DigestInterval'] = $("#jqxDigestIntervalCombo").jqxDropDownList('getSelectedIndex' );
                               sendparams['EmailDailySummary'] = $("#jqxEmailDailySummaryCb").jqxCheckBox('val');
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
             sendparams['SchedulerCanPromptForVolumes'] = $("#jqxSchedulerCanPromptForVolumesCb").jqxCheckBox('val');
                               sendparams['FailIfRemoteListingFails'] = $("#jqxFailIfRemoteListingFailsCb").jqxCheckBox('val');
                               sendparams['iRealtimeKeepAliveSeconds'] = $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput('val');

                               sendparams['RegName'] = $("#inptRegName").jqxInput( 'val');
                               sendparams['RegCode'] = $("#inptRegCode").jqxInput( 'val');

                       sendparams['iMaxThreads'] = $("#inpti_iMaxThreads").jqxNumberInput('val');
                       sendparams['iSeparateProcesses'] = $("#inpti_iSeparateProcesses").jqxNumberInput('val');
                         sendparams['BufSize'] = $("#inpti_BufSize").jqxNumberInput('val');
                         sendparams['iSplitAfterEntries'] = $("#inpti_iSplitAfterEntries").jqxNumberInput('val') * 1000000;
                               sendparams['WithGlobalLimits'] = $("#jqxWithGlobalLimitsCb").jqxCheckBox('val');
                               sendparams['UseGlobalSpeedLimit'] = $("#jqxUseGlobalSpeedLimitCb").jqxCheckBox('val');
                               sendparams['GlobalSpeedLimit'] = $("#inptGlobalSpeedLimit").jqxNumberInput('val');
                               sendparams['SyncIgnoreWeekdays'] = $("#jqxSyncIgnoreWeekdaysCb").jqxCheckBox('val');
                               sendparams['SyncForceSeparateMonitors'] = $("#jqxSyncForceSeparateMonitorsCb").jqxCheckBox('val');
                               sendparams['UserSpecificMutexes'] = $("#jqxUserSpecificMutexesCb").jqxCheckBox('val');
                               sendparams['GlobalExcludeMasks'] = $("#inptGlobalExcludeMasks").jqxInput('val');
                               sendparams['SyncGlobalMasksIgnoreTotally'] =  GetCheckedRadiobuttonName( $("#SyncGlobalMasksDontCopy_Mode"),  $("#SyncGlobalMasksIgnoreTotally_Mode") );
                               sendparams['NotToZipMasks'] = $("#inptNotToZipMasks").jqxInput('val');
                               sendparams['NotForPartialMasks'] = $("#inptNotForPartialMasks").jqxInput('val');
                               sendparams['MinPartialSize'] = $("#inpt_MinPartialSize").jqxNumberInput('val') * 1024;
                               sendparams['IncompleteExtension'] = $("#inpt_IncompleteExtension").jqxInput('val');
                               sendparams['S3PartSize'] = $("#inpt_S3PartSize").jqxNumberInput('val')*1024*1024;
                               sendparams['S3MaxUploadThreads'] = $("#inpt_S3MaxUploadThreads").jqxNumberInput('val');
             sendparams['AcceptNewServers'] = $("#jqxAcceptNewServers").jqxCheckBox('val');

                               sendparams['DatabasePath'] = $("#inpt_DatabasePath").jqxInput('val');
                               sendparams['SyncNeverShareDatabase'] = $("#jqxSyncNeverShareDatabaseCb").jqxCheckBox('val');
                               sendparams['DBServerType'] =
                                  GetCheckedRadiobuttonName(  $("#DBServerType_Embedded_Firebird_Mode"), $("#DBServerType_Standalone_Firebird_Local_Mode"),
                                                              $("#DBServerType_Standalone_Firebird_TCP_Mode"));
                               sendparams['DBServerUsername'] = $("#inpt_DBServerUsername").jqxInput('val');
                               sendparams['DBServerPassword'] = $("#inpt_DBServerPassword").jqxInput('val');
                               sendparams['DBServerAddress'] = $("#inpt_DBServerAddress").jqxInput('val');
                         sendparams['EventLogServiceStartStop'] = $("#jqxEventLogServiceStartStopCb").jqxCheckBox('val');
                               sendparams['EventLogSchedulerStartStop'] = $("#jqxEventLogSchedulerStartStopCb").jqxCheckBox('val');
                               sendparams['EventLogServiceError'] = $("#jqxEventLogServiceErrorCb").jqxCheckBox('val');
                               sendparams['EventLogApplicationError'] = $("#jqxEventLogApplicationErrorCb").jqxCheckBox('val');
                               sendparams['EventLogGeneralWarnings'] = $("#jqxEventLogGeneralWarningsCb").jqxCheckBox('val');
                               sendparams['EventLogProfileRunStarted'] = $("#jqxEventLogProfileRunStartedCb").jqxCheckBox('val');
                               sendparams['EventLogProfileCompletedWithoutE'] = $("#jqxEventLogProfileCompletedWithoutECb").jqxCheckBox('val');
                               sendparams['EventLogProfileCompletedWithE'] = $("#jqxEventLogProfileCompletedWithECb").jqxCheckBox('val');
                               sendparams['EventLogProfileGeneralE'] = $("#jqxEventLogProfileGeneralECb").jqxCheckBox('val');
                               sendparams['EventLogProfileRunWithWarnings'] = $("#jqxEventLogProfileRunWithWarningsCb").jqxCheckBox('val');
                               sendparams['EventLogProfileModifiedByUser'] = $("#jqxEventLogProfileModifiedByUserCb").jqxCheckBox('val');
                               sendparams['CPUAffinityCPU0'] = $("#jqxCPUAffinityCPU0Cb").jqxCheckBox('val');
                               sendparams['CPUAffinityCPU1'] = $("#jqxCPUAffinityCPU1Cb").jqxCheckBox('val');
                               sendparams['CPUAffinityCPU2'] = $("#jqxCPUAffinityCPU2Cb").jqxCheckBox('val');
                               sendparams['CPUAffinityCPU3'] = $("#jqxCPUAffinityCPU3Cb").jqxCheckBox('val');
                               sendparams['SyncThreadPriority'] = $("#jqxSyncThreadPriorityCombo").jqxDropDownList('selectedIndex');
                               sendparams['iRemoteAndCacheScanningThreads'] = $("#inpt_iRemoteAndCacheScanningThreads").jqxNumberInput('val');
                               sendparams['iLocalScanningThreads'] = $("#inpt_iLocalScanningThreads").jqxNumberInput('val');
                               sendparams['iInternetScanningThreads'] = $("#inpt_iInternetScanningThreads").jqxNumberInput('val');
                               sendparams['iNetworkScanningThreads'] = $("#inpt_iNetworkScanningThreads").jqxNumberInput('val');


                               $.post( "post_programsettings.php",JSON.stringify(sendparams)).done(
                               function( data )
                               {
                                  if( data == 'OK' )
                                  {
                                    $('#jqxProgramSettingsTabs').jqxTabs('destroy');
                                    $('#jqxProgramSettingsDlg').jqxWindow('destroy');
                                    //$('#jqxProgramSettingsDlg').jqxWindow('close');
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
                                  { name: 'FLogTimingDetails', type: 'boolean' },
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

                                  ] ,

                                  datatype: "json",
                                  id: 'id',
                                  url: 'getprogram_settings.php'
                          };


                          var PsDataAdapter = new $.jqx.dataAdapter( ProgramSettingsSource,
                          {
                              downloadComplete: function (data, status, xhr) { },
                              loadComplete: function (data) {
                                $("#config_path").prepend(data.ConfigPath);
                                $('#jqxShedIdleTimeAfterStartupCb').jqxCheckBox( 'checked', data.SchedulerIdleStartupMinutes > 0 );
                                $("#inptShedIdleTimeAfterStartup").jqxNumberInput('val', data.SchedulerIdleStartupMinutes );
                                $('#jqxDetectInternetCb').jqxCheckBox('val', data.DetectInternet );
                                $("#inptDetectInternetInterval").jqxNumberInput('val', data.DetectInternetInterval );
                                $('#jqxDetectInternetEvenManuallyCb').jqxCheckBox('val', data.DetectInternetEvenManually );

                                $("#jqxLoggingKindCombo").jqxDropDownList('selectedIndex', data.LoggingKind );
                                $('#jqxFAbbreviatedLogsCb').jqxCheckBox('val', data.FAbbreviatedLogs );
                                $('#jqxFLogTimingCb').jqxCheckBox('val', data.FLogTiming );
                                $('#jqxFLogTimingDetailsCb').jqxCheckBox('val', data.FLogTimingDetails );
                                $("#inptLogPath").jqxInput('val', data.LogPath);
                                $('#jqxFIPLoggingCb').jqxCheckBox('val', data.FIPLogging );
                                $('#jqxFLogSmartTrackingCb').jqxCheckBox('val', data.FLogSmartTracking );
                                $('#jqxFLogFileListCb').jqxCheckBox('val', data.FLogFileList );
                                $('#jqxFDetailedSecurityLoggingCb').jqxCheckBox('val', data.FDetailedSecurityLogging );
                                $('#jqxFLogTimestampsCb').jqxCheckBox('val', data.FLogTimestamps );
                                $('#jqxFLogSharesCb').jqxCheckBox('val', data.FLogShares );
                                $('#jqxFLogSyntheticDetailsCb').jqxCheckBox('val', data.FLogSyntheticDetails );
                                $('#jqxFLogSpeedLimitCb').jqxCheckBox('val', data.FLogSpeedLimit );
                                $('#jqxFWithThreadCPHistoryCb').jqxCheckBox('val', data.FWithThreadCPHistory );
                                $('#jqxFOutputFileListingsCb').jqxCheckBox('val', data.FOutputFileListings );
                                $('#jqxFDeleteNothingToDoLogsCb').jqxCheckBox('val', data.FDeleteNothingToDoLogs );
                                $("#inptiLogRealtimeStatusMinutes").jqxNumberInput('val', data.iLogRealtimeStatusMinutes);
                                $('#jqxiLogRealtimeStatusMinutesCb').jqxCheckBox('val', data.iLogRealtimeStatusMinutes > 0 );
                                $("#jqxiLogRealtimeStatusLevelCombo").jqxDropDownList( 'selectedIndex', data.iLogRealtimeStatusLevel );
                                $("#inptDetectInternetPositive").jqxInput('val', data.DetectInternetPositive);
                                $("#inptDetectInternetNegative").jqxInput('val', data.DetectInternetNegative);

                                $("#jqxSendEmailWhenTasksCompleteCb").jqxCheckBox('val', data.Email);
                                $("#jqxManualEmailCb").jqxCheckBox('val', data.ManualEmail);
                                $("#jqxScheduledEmailCb").jqxCheckBox('val', data.ScheduledEmail);
                                $("#jqxEmailOnErrorOnlyCb").jqxCheckBox('val', data.EmailOnErrorOnly);
                                $("#jqxEmailEmptyCb").jqxCheckBox('val', data.EmailEmpty);

                                $("#jqxEmailWhenFileReplacedCb").jqxCheckBox('val', data.EmailWhenFileReplaced);
                                $("#jqxEmailConflictCb").jqxCheckBox('val', data.EmailConflict);
                                $("#jqxNoEmailIfRerunSucceedsCb").jqxCheckBox('val', data.NoEmailIfRerunSucceeds);
                                $("#jqxNoEmailIfVolumeMissingCb").jqxCheckBox('val', data.NoEmailIfVolumeMissing);
                                $("#jqxEmailLogfileCb").jqxCheckBox('val', data.EmailLogfile);
                                $("#jqxEmailFilteredItemsCb").jqxCheckBox('val', data.EmailFilteredItems);
                                $("#jqxEmailSimpleSubjectCb").jqxCheckBox('val', data.EmailSimpleSubject);
                                $("#jqxHTMLEmailCb").jqxCheckBox('val', data.HTMLEmail);
                                $("#jqxErrorsNotInDigestCb").jqxCheckBox('val', data.ErrorsNotInDigest);
                                $("#jqxEmailFilesCb").jqxCheckBox('val', data.EmailFiles);
                                $("#jqxDigestCb").jqxCheckBox('val', data.EmailDigest);
                                $("#jqxDigestIntervalCombo").jqxDropDownList('selectedIndex', data.DigestInterval );
                                $("#jqxEmailDailySummaryCb").jqxCheckBox('val', data.EmailDailySummary);
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

              $("#jqxSchedulerCanPromptForVolumesCb").jqxCheckBox('val', data.SchedulerCanPromptForVolumes );

              $("#jqxFailIfRemoteListingFailsCb").jqxCheckBox('val', data.FailIfRemoteListingFails);
              $("#inptiRealtimeKeepAliveSeconds").jqxNumberInput('val', data.iRealtimeKeepAliveSeconds);
              $("#jqxRealtimeKeepAliveSecondsCb").jqxCheckBox('val', data.iRealtimeKeepAliveSeconds > 0 );

                                $("#license_status").prepend(data.RegInfo);
                                $("#inptRegName").jqxInput( 'val', data.RegName );
                                $("#inptRegCode").jqxInput( 'val', data.RegCode );

                               $("#inpti_iMaxThreads").jqxNumberInput('val', data.iMaxThreads);
                               $("#inpti_iSeparateProcesses").jqxNumberInput('val', data.iSeparateProcesses);
                               $("#inpti_BufSize").jqxNumberInput('val', data.BufSize);
                               $("#inpti_iSplitAfterEntries").jqxNumberInput('val', data.iSplitAfterEntries /1000000);
                               $("#jqxSplitAfterEntriesCb").jqxCheckBox('val', data.iSplitAfterEntries > 0);
                               $("#jqxWithGlobalLimitsCb").jqxCheckBox('val', data.WithGlobalLimits);
                               $("#jqxUseGlobalSpeedLimitCb").jqxCheckBox('val', data.UseGlobalSpeedLimit);
                               $("#inptGlobalSpeedLimit").jqxNumberInput('val', data.GlobalSpeedLimit );

                               $("#jqxSyncIgnoreWeekdaysCb").jqxCheckBox('val', data.SyncIgnoreWeekdays);
                               $("#jqxSyncForceSeparateMonitorsCb").jqxCheckBox('val', data.SyncForceSeparateMonitors);
                               $("#jqxUserSpecificMutexesCb").jqxCheckBox('val', data.UserSpecificMutexes);
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
              $("#jqxAcceptNewServers").jqxCheckBox('val', data.AcceptNewServers );
                                $("#inpt_DatabasePath").jqxInput('val', data.DatabasePath);
                                $("#jqxSyncNeverShareDatabaseCb").jqxCheckBox('val', data.SyncNeverShareDatabase);
                                SetRadioGroupChecked(data.DBServerType, $("#DBServerType_Embedded_Firebird_Mode"), $("#DBServerType_Standalone_Firebird_Local_Mode"),
                                  $("#DBServerType_Standalone_Firebird_TCP_Mode") );

                                $("#inpt_DBServerUsername").jqxInput('val', data.DBServerUsername);
                                $("#inpt_DBServerPassword").jqxInput('val', data.DBServerPassword);
                                $("#inpt_DBServerAddress").jqxInput('val', data.DBServerAddress);



                                $("#jqxEventLogServiceStartStopCb").jqxCheckBox('val', data.EventLogServiceStartStop);
                                $("#jqxEventLogSchedulerStartStopCb").jqxCheckBox('val', data.EventLogSchedulerStartStop);
                                $("#jqxEventLogServiceErrorCb").jqxCheckBox('val', data.EventLogServiceError);
                                $("#jqxEventLogApplicationErrorCb").jqxCheckBox('val', data.EventLogApplicationError);
                                $("#jqxEventLogGeneralWarningsCb").jqxCheckBox('val', data.EventLogGeneralWarnings);
                                $("#jqxEventLogProfileRunStartedCb").jqxCheckBox('val', data.EventLogProfileRunStarted);
                                $("#jqxEventLogProfileCompletedWithoutECb").jqxCheckBox('val', data.EventLogProfileCompletedWithoutE);
                                $("#jqxEventLogProfileCompletedWithECb").jqxCheckBox('val', data.EventLogProfileCompletedWithE);
                                $("#jqxEventLogProfileGeneralECb").jqxCheckBox('val', data.EventLogProfileGeneralE );
                                $("#jqxEventLogProfileRunWithWarningsCb").jqxCheckBox('val', data.EventLogProfileRunWithWarnings);
                                $("#jqxEventLogProfileModifiedByUserCb").jqxCheckBox('val', data.EventLogProfileModifiedByUser);


                                $("#jqxCPUAffinityCPU0Cb").jqxCheckBox('val', data.CPUAffinityCPU0);
                                $("#jqxCPUAffinityCPU1Cb").jqxCheckBox('val', data.CPUAffinityCPU1);
                                $("#jqxCPUAffinityCPU2Cb").jqxCheckBox('val', data.CPUAffinityCPU2);
                                $("#jqxCPUAffinityCPU3Cb").jqxCheckBox('val', data.CPUAffinityCPU3);
                                $("#jqxSyncThreadPriorityCombo").jqxDropDownList('selectedIndex', data.SyncThreadPriority );

                                $("#inpt_iRemoteAndCacheScanningThreads").jqxNumberInput('val', data.iRemoteAndCacheScanningThreads);
                                $("#inpt_iLocalScanningThreads").jqxNumberInput('val', data.iLocalScanningThreads);
                                $("#inpt_iInternetScanningThreads").jqxNumberInput('val', data.iInternetScanningThreads);
                                $("#inpt_iNetworkScanningThreads").jqxNumberInput('val', data.iNetworkScanningThreads);





                              },
                              loadError: function (xhr, status, error) {
                                if( error == "")
                                  alert("Error. Connection with server might be lost.");
                                else
                                  alert(error);
                              }
                          });


                         PsDataAdapter.dataBind();


  */

  $("#ProgSetNavBar").jqxNavigationBar(
  {
    width: '100%',
    height: '100%',
    toggleMode: "dblclick",
    expandMode: "toggle",
    showArrow: true,
    initContent: OnInitNavBarContent
  });
  $('#Cancel_btn_ProgramSettingsDlg').jqxButton(
  {
    width: 100,
    height: 30
  });

  $('#Cancel_btn_ProgramSettingsDlg').click(function()
  {

    $('#jqxProgramSettingsDlg').jqxWindow('close');
  });

  $('#OK_btn_ProgramSettingsDlg').jqxButton(
  {
    width: 100,
    height: 30,
    disabled: true
  });
  $('#jqxProgramSettingsDlg').jqxWindow('open');
  $('#jqxProgramSettingsDlg').jqxWindow('focus');

}

function CheckForEventFunc()
{
  var scrolling = $("#jqxgrid").jqxGrid('scrolling');
  if (scrolling.vertical == false)
  {
    var Profiles;

    var rows = $("#jqxgrid").jqxGrid('getrows');
    var datainfo = $("#jqxgrid").jqxGrid('getdatainformation');
    var paginginfo = datainfo.paginginformation;
    var startrow = paginginfo.pagenum * paginginfo.pagesize;
    var endrow = startrow + paginginfo.pagesize;

    if (GProfileListChanged)
    {
      Profiles = "";
      for (var j = 0; j < rows.length; j++)
        Profiles += '"' + rows[j].Name + '",';
      GProfileListChanged = false;
    }
    else
      Profiles = "*"; // means same as in previous call

    var sendparams = {};
    sendparams.token = GClientToken;
    sendparams.profiles = Profiles;
    sendparams.ReadyForUIMsg = "true";
    var json = JSON.stringify(sendparams);
    $.post("post_checkforevent.php", json).done(
      function(data)
      {
        if (data != undefined)
        {

          if (data.error == 'session_busy')
          {
            window.location = '/post_session_busy.php';
            return;
          }

          var Lstate = data.scheduler_state;

          var Lmsg = data.scheduler_msg;
          var Lalert = data.show_alert;

          if ((Lalert != "") && (Lalert != "undefined") && (Lalert != undefined))
          {
            var replyval = false;
            if (data.is_question == "true")
              replyval = confirm(Lalert);
            else
              alert(Lalert);
            var Lmsg_id = data.msg_id;

            var sendparams = {};
            sendparams.token = GClientToken;
            sendparams.msg_id = Lmsg_id;
            sendparams.msg_reply = replyval;
            var json = JSON.stringify(sendparams);

            $.post('msgreply.php', json);
          }

          var updatecount = 0;

          if (data.profiles != undefined)
          {
            var datainformation = $('#jqxgrid').jqxGrid('getdatainformation');
            for (var j = 0; j < datainformation.rowscount; j++)
            {
              for (var i = 0; i < data.profiles.length; i++)
              {
                var obj = data.profiles[i];
                if ($("#jqxgrid").jqxGrid('getcellvalue', j, 'Name') == obj.name)
                {
                  if (obj.progress != "")
                  {
                    if (obj.progress != $("#jqxgrid").jqxGrid('getcellvalue', j, 'Progress'))
                      $("#jqxgrid").jqxGrid('setcellvalue', j, 'Progress', obj.progress);
                    updatecount++;
                  }
                  break;
                }
              }
            }
          }

          if ((Lmsg == undefined) || (Lmsg == "undefined"))
            Lmsg = "Logged out - please refresh page to log in";
          $("#titlegrid").jqxGrid(
          {
            columns: [
            {
              text: "&nbsp;<b>" + GSyncoveryTitle + "</b>",
              width: 250
            },
            {
              text: "<b>" + Lmsg + "</b>",
              width: $(window).width() - 270
            }]
          });

          if (data.scheduler_state == 'Running')
            $('#start_scheduler_button').jqxButton('val', 'Stop Scheduler');
          else if (data.scheduler_state == 'Inactive')
            $('#start_scheduler_button').jqxButton('val', 'Start Scheduler');
        }
      }
    ).fail(function(xhr, status)
    {
      $("#titlegrid").jqxGrid(
      {
        columns: [
        {
          text: "&nbsp;<b>" + GSyncoveryTitle + "</b>",
          width: 250
        },
        {
          text: "<b>" + GSyncoveryTitle + " WebServer unavailable: " + status + "</b>",
          width: $(window).width() - 270
        }]
      });
    })

  }
}
