// 'use strict'; does not work, breaks directory selection form

var RenameProfileHTML =
  "<div id='jqxRenameProfileDlg'>"+
  "<div>Enter New Profile Name</div>"+
  "<div> "+
  "<table id='container'>"+
  "<tr>"+
  "<td valign='top'>"+
  "    <div style='margin-left: 20px;'></div>"+
  "    <div style='margin-left: 20px;'></div>"+
  "    <div style='margin-left: 20px;'>"+
  "      <table>"+
  "         <tr>"+
  "            <td>"+
  "              <div><input type='text' id='inpt_ProfileName'  style='float: left;' ></input></div>"+
  "            </td>"+
  "            <td>"+
  "                <button id='RenameProfile_OK_btn'>OK</button>"+
  "            </td>"+
  "            <td>"+
  "                <button id='RenameProfile_Cancel_btn'>Cancel</button>"+
  "            </td>"+
  "         </tr>"+
  "      </table>"+
  "    </div>"+
  "</td>"+
  "</tr>"+
  "</table>"+
  "</div>"+
  "</div>";

var ImportProfilesHTML =
  '<div id="jqxImportProfilesDlg">'+
  '<div>Import Profiles</div>'+
  '<div>'+
  '<div>Click the Browse button to choose the file to upload and import.</div>'+
  '<br>'+
  '<div>The supported file types are: xml, csv, ini, cfg, log.</div>'+
  '<br>'+
  '<div>If a file contains several profiles, all profiles will be imported.</div>'+
  '<br>'+
  '<div>When uploading several files, you will see a separate confirmation message for each file.</div>'+
  '<br>'+
  '<div id="jqxFileUpload"></div>'+
  '<br>'+
  '<div><button id="ImportProfilesOKBtn">Close</button></div>'+
  '</div>';

var ImportBinCompResultsHTML =
  '<div id="jqxImportBinCompResultsDlg">'+
  '<div>Import Binary Comparion Results from a Log File</div>'+
  '<div>'+
  '<div>Click the Browse button to choose the file to upload and import.</div>'+
  '<br>'+
  '<div>The supported file type is: .log.</div>'+
  '<br>'+
  '<div>Please upload only one file at a time and wait for the import to complete before using the web GUI for other tasks.</div>'+
  '<br>'+
  '<div id="jqxFileUploadBinComp"></div>'+
  '<br>'+
  '<div><button id="ImportBinCompResultsOKBtn">Close</button></div>'+
  '</div>';

var GridSource =
{
    datatype: "json",
    datafields: [
        { id: 'id', type:'number' },
        { name: 'Name', type: 'string' },
        { name: 'HTMLName', type: 'string' },
        { name: 'LeftPath', map: 'LeftPath', type: 'string' },
        { name: 'RightPath', map: 'RightPath', type: 'string' },
        { name: 'Progress', type: 'string' },
        { name: 'isDisabled', type: 'boolean' },
        { name: 'isLocked', type: 'boolean' },
        { name: 'LastRun', type: 'string' },
        { name: 'NextRun', type: 'string' }
        ],
          addrow: function (rowid, rowdata, position, commit) {
          // synchronize with the server - send insert command
          // call commit with parameter true if the synchronization with the server is successful
          //and with parameter false if the synchronization failed.
          // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
            commit(true);
          },

          deleterow: function (rowid, commit)
          {
            // synchronize with the server - send delete command
            // call commit with parameter true if the synchronization with the server is successful
            // and with parameter false if the synchronization failed.

            // this causes duplicate invocation of DeleteProfile!!
            // DeleteProfile();

          },
    root: "Rows",
    id: 'id',
    url: "profiles.json",
    filter: function ()
    {
       //update the grid and send a request to the server.
       $("#jqxgrid").jqxGrid('updatebounddata');
       GProfileListChanged = true;
    },
                
    beforeprocessing: function (data)
    {
      GridSource.totalrecords = data[1].TotalRows;
    }
};

var GridDataAdapter = new $.jqx.dataAdapter(GridSource,
{
  downloadComplete: function (data, status, xhr) { },
  loadComplete: function (data) { },
  loadError: function (xhr, status, error) {
                     
  },
                
  beforeSend: function (xhr) {
     xhr.setRequestHeader('token', GClientToken);
  }
});

var GLastFilterSent="";
    GLastScheduledCBState=false;

function RefreshMainGrid()
{
    // var scrolling = $("#jqxgrid").jqxGrid("scrolling");
    $("#jqxgrid").jqxGrid('updatebounddata', 'cells');
    GProfileListChanged = true;
}

function RefreshGrid()
{
  var CurrentFilter = $("#inpt_Filter").jqxInput('val');
  if (CurrentFilter != GLastFilterSent)
  {
     $("#jqxgrid").jqxGrid('gotopage', 0);
  }

  GLastFilterSent = CurrentFilter;
  GLastScheduledCBState = $("#jqxShowScheduledCB").jqxCheckBox('val');
  GridSource.url = "profiles.json?filter="+GLastFilterSent+"&schonly="+GLastScheduledCBState;

  $("#jqxgrid").jqxGrid({source: GridDataAdapter });

  //GridDataAdapter.dataBind(); // causes second call to profiles.json
  GProfileListChanged = true;
}


function RenameProfile()
{
   var selectedRow = $('#jqxgrid').jqxGrid('getselectedrowindex');
   if (selectedRow == -1) return;
   var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedRow).Name;

   $("#RenameProfileDlg_div").html(RenameProfileHTML);
   $('#jqxRenameProfileDlg').jqxWindow({ maxWidth: 640,  width:640, maxHeight:80, height:80, autoOpen: false, isModal: true,
     theme: 'energyblue', animationType: 'slide' });

   $("#inpt_ProfileName").jqxInput({width: 400,  height: 25, value: SelectedProfile});


   $('#RenameProfile_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
   $('#RenameProfile_OK_btn').click(function () {
      var NewProfileName = $("#inpt_ProfileName").jqxInput('val');
      var sendparams = { };
      sendparams.OldProfileName = SelectedProfile;
      sendparams.NewProfileName = NewProfileName.trim();
      sendparams.token = GClientToken;
      var json = JSON.stringify(sendparams);

      $.post("post_rename_profile.php", json).done(function(data)
      {
        if (data == 'OK')
        {

           $("#jqxgrid").jqxGrid({source: GridDataAdapter });
           // GridDataAdapter.dataBind(); // causes second call to profiles.json
           GProfileListChanged = true;
           $('#jqxgrid').jqxGrid('clearselection');
        }
        else
        {
           alert("Profile was not renamed: " + data);
        }
      });


      $('#jqxRenameProfileDlg').jqxWindow('close');
    });

   $('#RenameProfile_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
   $('#RenameProfile_Cancel_btn').click(function () {
       $('#jqxRenameProfileDlg').jqxWindow('close');
       });

   $('#jqxRenameProfileDlg').jqxWindow('open');
}

function ImportProfiles()
{
   $("#ImportProfilesDlg_div").html(ImportProfilesHTML);
   $('#jqxImportProfilesDlg').jqxWindow({ maxWidth: 580,  width:400, maxHeight:800, height:400, autoOpen: false, isModal: true,
           theme: 'energyblue', animationType: 'slide' });

   $('#jqxFileUpload').jqxFileUpload({ width: 300, uploadUrl: 'profileimport.php?token='+GClientToken, fileInputName: 'fileToUpload'});

   $('#ImportProfilesOKBtn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
   $('#ImportProfilesOKBtn').click(function () {
     $('#jqxImportProfilesDlg').jqxWindow('close');
     RefreshMainGrid();
     });

   $('#jqxImportProfilesDlg').jqxWindow('open');
}

function ImportBinCompResults()
{
   var Lprofname = GetSelectedProfileName();

   if (Lprofname == "")
   {
      alert("Please choose a profile to import the binary comparison results into.");
      return;
   }

   $("#ImportBinCompResultsDlg_div").html(ImportBinCompResultsHTML);
   $('#jqxImportBinCompResultsDlg').jqxWindow({ maxWidth: 580,  width:400, maxHeight:800, height:400, autoOpen: false, isModal: true,
           theme: 'energyblue', animationType: 'slide' });

   $('#jqxFileUploadBinComp').jqxFileUpload({ width: 300, uploadUrl: 'bincompresultsimport.php?token='+GClientToken+
                                         '&profilename='+Lprofname,
//                                         multipleFilesUpload: false, does not work
                                         fileInputName: 'fileToUpload'});

   $('#ImportBinCompResultsOKBtn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
   $('#ImportBinCompResultsOKBtn').click(function () {
     $('#jqxImportBinCompResultsDlg').jqxWindow('close');
     RefreshMainGrid();
     });

   $('#jqxImportBinCompResultsDlg').jqxWindow('open');
}


function checkeventsuccess(data)
{
  if (data != undefined)
  {
    if (data.error == 'session_expired')
    {
        location.reload();
        return;
    }

    var Lstate = data.scheduler_state;

    var Lmsg = data.scheduler_msg;
    var Lalert= data.show_alert;

    if ((Lalert != "") && (Lalert != "undefined") && (Lalert != undefined))
    {
       var replyval = false;
       if (data.is_question=="true")
          replyval = confirm(Lalert);
       else
          alert(Lalert);
       var Lmsg_id = data.msg_id;

       var sendparams = { };
       sendparams.token = GClientToken;
       sendparams.msg_id = Lmsg_id;
       sendparams.msg_reply = replyval;
       var json = JSON.stringify(sendparams);

       $.post('msgreply.php', json);
    }

    //alert("Number of rows on current page: " + paginginformation.pagesize);
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
                var oldval=$("#jqxgrid").jqxGrid('getcellvalue', j, 'Progress');

                if ((// true || // don't protect "Starting"
                     (oldval != '<b>Starting...</b>') ||
                     (GLastProfileStartedAt<=GetTickCount()-1000) || // protect "Starting" only for one second, quick profiles may already be finished
                     (obj.progress.indexOf('<b')>=0) ||
                     (obj.progress.indexOf('<B')>=0) ||
                     (obj.progress.indexOf('<a')>=0) ||
                     (obj.progress.indexOf('<A')>=0)) &&
                    (obj.progress != oldval))
                   $("#jqxgrid").jqxGrid('setcellvalue', j, 'Progress', obj.progress);

                if ((obj.lastRun!=undefined) && (obj.lastRun!="") && 
		            (obj.lastRun!=$("#jqxgrid").jqxGrid('getcellvalue', j, 'LastRun')))
                   $("#jqxgrid").jqxGrid('setcellvalue', j, 'LastRun', obj.lastRun);

                if ((obj.nextRun!=undefined) && (obj.nextRun!="") &&
 		            (obj.nextRun!=$("#jqxgrid").jqxGrid('getcellvalue', j, 'NextRun')))
                   $("#jqxgrid").jqxGrid('setcellvalue', j, 'NextRun', obj.nextRun);

                updatecount++;
              }
              break;
           }
        }
      }
      //Lmsg = ('updatecount='+updatecount+', rowscount='+datainformation.rowscount);
    }
    //else
    //   Lmsg = 'data.profiles=undefined';

    if ((Lmsg==undefined) || (Lmsg=="undefined"))
       Lmsg = "Logged out - please refresh page to log in";
    $("#titlegrid").jqxGrid(
    {
       columns: [
         { text: "&nbsp;<b>"+GSyncoveryTitle+"</b>"+GLicenseMsgBR+GLicenseMsg, width: cTitleGridCol1Width },
         { text: "<b>"+Lmsg+"</b>", width: cTitleGridCol2Width }
         ]
    });

    if (data.scheduler_state == 'Running')
       $('#start_scheduler_button').jqxButton('val', 'Stop Scheduler');
    else
       $('#start_scheduler_button').jqxButton('val', 'Start Scheduler');
  }
}

function checkeventerror(jqXHR,textStatus,errorThrown)
{
   $("#titlegrid").jqxGrid(
   {
      columns: [
        { text: "&nbsp;<b>"+GSyncoveryTitle+"</b>"+GLicenseMsgBR+GLicenseMsg, width: cTitleGridCol1Width },
        { text: "<b>Syncovery WebServer unavailable: "+textStatus+' '+errorThrown+"</b>", width: cTitleGridCol2Width }
        ]
   });
}

function showstatusmessage(textStatus)
{
   $("#titlegrid").jqxGrid(
   {
      columns: [
        { text: "&nbsp;<b>"+GSyncoveryTitle+"</b>"+GLicenseMsgBR+GLicenseMsg, width: cTitleGridCol1Width },
        { text: textStatus, width: cTitleGridCol2Width }
        ]
   });
}

function CheckForEventFunc()
{
  if (GLicenseMsg != '')
     $("#titlegrid").jqxGrid('setcellvalue', j, 'LastRun', GLicenseMsg)

  var CurrentFilter = $("#inpt_Filter").jqxInput('val');
  if (CurrentFilter!=GLastFilterSent)
  {
     RefreshGrid();
     return;
  }

  var CurrentScheduledOnly=$("#jqxShowScheduledCB").jqxCheckBox('val');
  if (CurrentScheduledOnly!=GLastScheduledCBState)
  {
     RefreshGrid();
     return;
  }

  var scrolling = $("#jqxgrid").jqxGrid('scrolling');
  if (scrolling.vertical == false)
  {
    var Profiles;

    var rows = $("#jqxgrid").jqxGrid('getrows');
    var datainfo = $("#jqxgrid").jqxGrid('getdatainformation');
    var paginginfo = datainfo.paginginformation;
    var startrow = paginginfo.pagenum  * paginginfo.pagesize;
    var endrow = startrow + paginginfo.pagesize;

    if (GProfileListChanged)
    {
       Profiles = "";
       for (var j=0; j<rows.length; j++)
         Profiles += '"' + rows[j].Name  + '",';
       GProfileListChanged = false;
    }
    else
       Profiles = "*"; // means same as in previous call

    var forceprogress=false;
    for (var j=0; j<rows.length; j++)
      if ($("#jqxgrid").jqxGrid('getcellvalue', j, 'Progress')=='<b>Starting...</b>')
         forceprogress=true;

    var sendparams = { };
    sendparams.token = GClientToken;
    sendparams.profiles = Profiles;
    sendparams.forceprogress = forceprogress;
    sendparams.ReadyForUIMsg = "true";
    var json = JSON.stringify(sendparams);

    $.ajax({async: true,
        type: "POST",
        url:"post_checkforevent.php",
        data: json,
        success: checkeventsuccess,
        error: checkeventerror});
  }
}

InitMainForm = function()
{
  var MainFormHTML = MainFormHTMLPart1;

  if (GLicenseMsg.substring(0,12)=='Limited Free')
     MainFormHTML = MainFormHTML+
                    "<div><p style='font-family: Verdana,Arial,sans-serif;font-size: 13px;margin-left: 8px;margin-top: 8px;margin-bottom: 8px;'>"+
                    "Please see <a HREF='https://www.syncovery.com/freelinuxedition/' target='_blank' rel='noopener'>our web site</a> for details about licensing Syncovery and the Limited Free Edition."+
                    "</p></div>";

  MainFormHTML = MainFormHTML + MainFormHTMLPart2;

  $("#MainForm_div").html(MainFormHTML);

  // initialize jqxGrid
  var contextMenu = $("#jqxMenu").jqxMenu({width: 220, height: GContextMenuHeight, autoOpenPopup: false, mode: 'popup'});

  // open the context menu when the user presses the mouse right button.


  $('#jqxMenu').on('itemclick', function (event)
  {
    // get the clicked LI element.
    if ($(event.target).text() == "Edit Profile")
    {
        setTimeout(EditSelectedProfile, 100);
    }
    else if ($(event.target).text() == "Add New Profile")
    {
        AddProfile();
    }
    else if ($(event.target).text() == "Delete Profile")
    {
       DeleteProfile();
    }
    else if ($(event.target).text() == "Rename Profile")
    {
       RenameProfile();
    }
    else if ($(event.target).text() == "Enable Profile")
    {
       EnableDisableProfile(true);
    }
    else if ($(event.target).text() == "Disable Profile")
    {
       EnableDisableProfile(false);
    }
    else if ($(event.target).text() == "Resume Profile")
    {
       PauseResumeProfile(true);
    }
    else if ($(event.target).text() == "Pause Profile")
    {
       PauseResumeProfile(false);
    }
    else if ($(event.target).text() == "Lock Profile Settings")
    {
       LockProfile(true);
    }
    else if ($(event.target).text() == "Unlock Profile Settings")
    {
       LockProfile(false);
    }
    else if ($(event.target).text() == "Run Unattended")
    {
       RunSelectedProfile(false);
    }
    else if ($(event.target).text() == "Run With Preview")
    {
       RunSelectedProfile(true);
    }
    else if ($(event.target).text() == "Stop Profile")
    {
       StopSelectedProfile();
    }
    else if ($(event.target).text() == "Diagnose Activity")
    {
       DiagnoseActivity();
    }
    else if ($(event.target).text() == "Dump Memory Usage")
    {
       DumpMemoryUsage();
    }
    else if ($(event.target).text() == "Show Detailed Status")
    {
       ShowDetailedStatus();
    }
    else if ($(event.target).text() == "Import Profiles")
    {
       ImportProfiles();
    }
    else if ($(event.target).text() == "Import Binary Comparison Results From Log")
    {
       ImportBinCompResults();
    }
    else if ($(event.target).text() == "Export Profile")
    {
       ExportProfile();
    }
    else if ($(event.target).text() == "Export All Profiles")
    {
       ExportProfiles();
    }
    else if ($(event.target).text() == "Terminate Process")
    {
       if (GisSyncoveryWindows)
          alert('Terminating from web GUI not supported.');
       else
          TerminateProcess();
    }
    else
       alert("Unrecognized choice: "+$(event.target).text());


  });



/*
            var pagerrenderer = function () {
                var element = $("<div style='margin-top: 5px; width: 100%; height: 100%;'></div>");
                var paginginfo = $("#jqxgrid").jqxGrid('getpaginginformation');
                for (var i = 0; i < paginginfo.pagescount; i++) {
                    // add anchor tag with the page number for each page.
                    var anchor = $("<a style='padding: 5px;' href='#" + i + "'>" + i + "</a>");
                    anchor.appendTo(element);
                    anchor.click(function (event) {
                        // go to a page.
                        var pagenum = parseInt($(event.target).text());
                        $("#jqxgrid").jqxGrid('gotopage', pagenum);
                    });
                }
                return element;
            }
*/


       var imagerenderer = function (row, datafield, value)
       {
           if (GridDataAdapter.records[row].isLocked == true)
           {
             return '<img style="margin-left: 5px; margin-top: 14px;" src="../images/locked16.png"/>';// + value + 'height="60" width="50"
           }
           else
             if (GridDataAdapter.records[row].isDisabled == true)
                return '<img style="margin-left: 5px; margin-top: 14px;" src="../images/disabled16.png"/>';// + value + 'height="60" width="50"
             else
                return '<br/>';
       }

       $("#titlegrid").jqxGrid(
       {
           width: cMainGridWidth,
           rowsheight : 150,
           autoheight: true,
           showemptyrow: false,
           theme: 'energyblue',
           columns: [
             { text: "&nbsp;&nbsp;<b>"+GSyncoveryTitle+"</b>"+GLicenseMsgBR+GLicenseMsg, width: cTitleGridCol1Width },
             { text: '', width: cTitleGridCol2Width }
           ]
       });


       $("#jqxgrid").jqxGrid(
       {
               width: cMainGridWidth,
               rowsheight : 50,
               source: GridDataAdapter,
               pageable: true,
               pagesize:20,
               autoheight: true,
               autorowheight: true,
               virtualmode: true,
               //scrollmode: 'deferred',
               //sortable: true,
               //altrows: true,
               //enabletooltips: true,
               //editable: false,
               selectionmode: 'singlerow',
               showtoolbar: true,
               toolbarheight: GDefaultGridToolbarHeight,
               rendergridrows: function ()
               {
                 return GridDataAdapter.records;
               },

               rendertoolbar: function (toolbar)
               {
                    var container = $(
                      '<table style="display:inline;"><tr><td>'+
                      '<input style="margin-left: 10px;" id="addrowbutton" type="button" value="Add New Profile" />'+
                      '<input style="margin-left: 10px;" id="updaterowbutton" type="button" value="Edit Profile" />'+
                      '<input style="margin-left: 10px;" id="run_selected_profile_button" type="button" value="Run Unattended" />'+
                      '<input style="margin-left: 10px;" id="run_attended_button" type="button" value="Run With Preview" />'+
                      '<input style="margin-left: 10px;" id="show_status_button" type="button" value="Show Detailed Status" />'+
                      '<input style="margin-left: 10px;" id="stop_selected_profile_button" type="button" value="Stop Profile" />'+
                      '<input style="margin-left: 10px;" id="program_settings_button" type="button" value="Program Settings" />'+
                      '<input style="margin-left: 10px;" id="start_scheduler_button" type="button" value="Start Scheduler"/>'+
                      '<input style="margin-left: 10px;" id="refresh_grid_button" type="button" value="Refresh"/>'+
                      '<input style="margin-left: 10px;" id="log_files_button" type="button" value="Log Files"/>'+
                      '&nbsp;&nbsp;Filter: <input type="text" id="inpt_Filter"/>'+
                      '</td><td><div id="jqxShowScheduledCB" style="margin-left: 10px; display:inline;">Scheduled</div></td>'+
                      '<td><input style="margin-left: 10px;" id="logout_button" type="button" value="Logout"/></td>'+
                      '<td> &nbsp; <a HREF="help/help.html" target="_blank">Help</a></td>'+
                      '</tr></table>');
                    
                    toolbar.append(container);

                    $("#run_selected_profile_button").jqxButton({height: GBtnHeight, width: GBtnWidth2});
                    $("#run_selected_profile_button").on('click',
                      function ()
                      {
                         RunSelectedProfile(false);
                      });

                    $("#run_attended_button").jqxButton({height: GBtnHeight, width: GBtnWidth2*4/3});
                    $("#run_attended_button").on('click',
                      function ()
                      {
                         RunSelectedProfile(true);
                      });

                    $("#show_status_button").jqxButton({height: GBtnHeight, width: GBtnWidth2*4/3});
                    $("#show_status_button").on('click',ShowDetailedStatus);

                    $("#stop_selected_profile_button").jqxButton({height: GBtnHeight, width: GBtnWidth2});
                    $("#stop_selected_profile_button").on('click', StopSelectedProfile);

                    $("#program_settings_button").jqxButton({height: GBtnHeight, width: GBtnWidth2*4/3});

                    var G_ShedIdleTimeAfterStartupCb = true;
                    $("#program_settings_button").on('click', OnProgramSettings);

                    $("#updaterowbutton").jqxButton({height: GBtnHeight, width: GBtnWidth2});
                    $("#updaterowbutton").on('click', EditSelectedProfile);

                    $("#addrowbutton").jqxButton({height: GBtnHeight, width: GBtnWidth2});
                    $("#addrowbutton").on('click', AddProfile);

                    $("#start_scheduler_button").jqxButton({height: GBtnHeight, width: GBtnWidth2});
                    $("#start_scheduler_button").on('click', function () {
                      if ($('#start_scheduler_button').val() == 'Start Scheduler' )
                      {  
                         StartScheduler();
                      }
                      else if ($('#start_scheduler_button').val() == 'Stop Scheduler')
                      {
                         StopScheduler();
                      }   
                    });

                    $("#refresh_grid_button").jqxButton({height: GBtnHeight, width: GBtnWidth});
                    $("#refresh_grid_button").on('click', RefreshGrid);

                    $("#log_files_button").jqxButton({height: GBtnHeight, width: GBtnWidth});
                    $("#log_files_button").on('click', LogFiles);

                    $("#logout_button").jqxButton({height: GBtnHeight, width: GBtnWidth});
                    $("#logout_button").on('click', PerformLogout);

                    $("#inpt_Filter").jqxInput({width: 100,  height: 25});
                    $("#inpt_Filter").on('change', RefreshGrid);

                    $("#jqxShowScheduledCB").jqxCheckBox({width: 50,  height: 25});
                    $("#jqxShowScheduledCB").on('change', RefreshGrid);

                    var refreshInterval = setInterval(CheckForEventFunc, 1000);
                    CheckForEventFunc(); // show status immediately
               },

             columns: [
                 { text: ' ', datafield: 'id', width: 10, cellsrenderer: imagerenderer },
                 { text: 'Profile Name', datafield: 'HTMLName', width: 225 },
                 { text: 'Left-Hand Path', datafield: 'LeftPath', width: 330 },
                 { text: 'Right-Hand Path', datafield: 'RightPath', width: 330 },
                 { text: 'Last Result or Progress', datafield: 'Progress', width: 430 },
                 { text: 'Last Run', datafield: 'LastRun', width: 180 },
                 { text: 'Next Run', datafield: 'NextRun', width: 180 }
                ]
            });
          
               
               
            $("#jqxLoader").jqxLoader({ width: 100, height: 60, imagePosition: 'top' });

            $('#jqxgrid').on('pagechanged', function (event)
               {
                  GProfileListChanged = true;
               });


            $('#jqxgrid').on('rowdoubleclick', function (event) 
            { 
               
                var args = event.args;
                // row's bound index.
                var boundIndex = args.rowindex;
                // row's visible index.
                var visibleIndex = args.visibleindex;
                // right click.
                var rightclick = args.rightclick; 
                // original event.
                var ev = args.originalEvent;
                if (!rightclick)
                  setTimeout(EditSelectedProfile, 100);
                      
                              
                //alert('boundIndex =' + boundIndex + ' visibleIndex =' + visibleIndex  );
            });

             $("#jqxgrid").on('mousedown', function (event) {
                    var rightClick = isRightClick(event) || $.jqx.mobile.isTouchDevice();
                    if (rightClick) {
                        var scrollTop = $(window).scrollTop();
                        var scrollLeft = $(window).scrollLeft();
                        if (parseInt(event.clientY) > 100) 
                          contextMenu.jqxMenu('open', parseInt(event.clientX) + GDefaultTabletMouseDownInterval + scrollLeft, parseInt(event.clientY) + GDefaultTabletMouseDownInterval + scrollTop);
                        return false;
                    }
                });
                // disable the default browser's context menu.
                $("#jqxgrid").on('contextmenu', function (e) {
                    return false;
                });

                
                function isRightClick(event) {                                  
                    var rightclick;
                    if (!event) var event = window.event;
                    if (event.which) 
                      rightclick = (event.which == 3);
                    else if (event.button) rightclick = (event.button == 2);
                    return rightclick;
                }
                

                $('#jqxMenu').bind('itemclick', function (event) {
                   //alert('ItemClick is fired');
                });

          //  GridDataAdapter.dataBind();



            

     /* $('#Test_btn1').jqxButton({});
      
      $('#Test_btn1').jqxButton({});
      
      $('#Test_btn1').click(function () 
      { 
        $("#jqxgrid").jqxGrid('setcellvalue', 0, 'Progress', '222');   

        $('#jqxgrid').jqxGrid('selectrow', 3);
        $('#jqxgrid').jqxGrid('selectrow', 5);
        //$('#Test_btn1').jqxButton({disabled : true}); 
      } );
*/

       function EditSelectedProfile()
       {
            showstatusmessage("Opening profile");
            var selectedRow = $('#jqxgrid').jqxGrid('getselectedrowindex');
            if (selectedRow == -1)
            {
               showstatusmessage("No profile selected");
               alert("No profile selected");
               return;
            }

             var SelectedRow = $('#jqxgrid').jqxGrid('getrowdata', selectedRow);
             if (!SelectedRow)
             {
                showstatusmessage("No row selected");
                alert("No row selected");
                return;
             }
             var SelectedProfile = SelectedRow.Name;

             $('#jqxLoader').jqxLoader('open');

             var sendparams = { };
             sendparams.ProfileName = SelectedProfile.trim();
             sendparams.token = GClientToken;
             var json = JSON.stringify(sendparams);
             ProfileSource.url = "single_profile.php?qry=" +encodeURIComponent(json);

             showstatusmessage("Loading profile");
             var ProfileDataAdapter = new $.jqx.dataAdapter(ProfileSource,
              { loadComplete: function ()
                {
                  showstatusmessage("Loading profile complete");
                  if (ProfileDataAdapter.xhr.responseText == '{"error":"session_timeout"}')
                  {
                      $('#jqxLoader').jqxLoader('close');
                      window.location = '/index.html';
                      showstatusmessage("Loading error: session timeout");
                      alert("Loading error: session timeout");
                      return;
                  }
                  else if (ProfileDataAdapter.xhr.responseText == '{"error":"session_busy"}')
                  {
                      $('#jqxLoader').jqxLoader('close');
                      window.location = '/post_session_busy.php';
                      showstatusmessage("Loading error: session busy");
                      alert("Loading error: session busy");
                      return;
                  }
                  else
                  if (ProfileDataAdapter.xhr.responseText == '{"error":"profile_locked"}')
                  {
                      $('#jqxLoader').jqxLoader('close');
                      showstatusmessage("Loading error: profile locked");
                      alert("Cannot edit - profile is locked.");
                      return;
                  }
                  else
                  if (ProfileDataAdapter.xhr.responseText.substring(0,8) == '{"error"')
                  {
                     $('#jqxLoader').jqxLoader('close');
                     showstatusmessage("Loading error: " + ProfileDataAdapter.xhr.responseText);
                     alert(ProfileDataAdapter.xhr.responseText);
                     return;
                  }

                  // get data records.
                  var records = ProfileDataAdapter.records;
                  var length = records.length;

                  showstatusmessage("Processing profile");

                  for (var i = 0; i < length; i++)
                  {
                     var record = records[i];
                     if (SelectedProfile == record.Name)
                     {
                        LoadRecordToRegistryList(record, GProfileEditorRegistryList, "");
                        //alert('LoadRecordToRegistryList done');

                        showstatusmessage("Initializing Profile Editor Form");
                        GFuncInitProfileEditorForm(SelectedProfile, "Edit");
                        showstatusmessage("Profile Editor Form Ready");
                        return;
                     }
                  }
                  showstatusmessage("Closing loader pop-up");
                  $('#jqxLoader').jqxLoader('close');
                  showstatusmessage("Showing error");
                  alert('Profile to edit not found');
                }
                , 
                loadError: function (jqXHR, status, error)
                {
                  showstatusmessage("Loading error: "+error);
                  $('#jqxLoader').jqxLoader('close');
                  if (error == "")
                     alert("Error. Connection with server might be lost.");
                  else
                     alert("Profile Loading Error: "+error);
                 } 
             }); 

             ProfileDataAdapter.dataBind();
       };
      
        function DoAddProfile()
       {
          LoadDefaultsToRegistryList(GProfileEditorRegistryList, true);
          LoadSSHDefaults();
          GFuncInitProfileEditorForm("", "Insert");
       }

       function AddProfile()
       {                    
          setTimeout(function(){ DoAddProfile(); }, 100);   
          $('#jqxLoader').jqxLoader('open');             
       }; 

       


       function EnableDisableProfile(enableit)
       {
          var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
          var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
          if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                 
              var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;
              var sendparams = { };
              sendparams.ProfileName = SelectedProfile.trim();
              sendparams.EnableIt = enableit;
              sendparams.token = GClientToken;
              var json = JSON.stringify(sendparams);           
              $.post("post_enabledisableprofile.php", json).done(function(data)
              {
                if ((data == 'OK' ) || (data == 'Disabled') || (data == 'Enabled'))
                {
                 RefreshGrid();
                }
                else
                   alert( "Profile could not be modified: " + data);
              });
            
          }          
       };   

       function PauseResumeProfile(resumeit)
       {
          var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
          var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
          if (selectedrowindex >= 0 && selectedrowindex < rowscount)
          {
              var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;
              var sendparams = { };
              sendparams.ProfileName = SelectedProfile.trim();
              sendparams.ResumeIt = resumeit;
              sendparams.token = GClientToken;
              var json = JSON.stringify(sendparams);

              $.post("post_pauseresumeprofile.php", json).done(function(data)
              {
                 if (data == 'OK' )
                 {
                    RefreshGrid();
                 }
                 else
                    alert( "This was not possible: " + data);
              });
          }
       };


       function LockProfile(lockit)
       {
          var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
          var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
          if (selectedrowindex >= 0 && selectedrowindex < rowscount)
          {
              var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;
              var sendparams = { };
              sendparams.ProfileName = SelectedProfile.trim();
              sendparams.LockIt = lockit;
              sendparams.token = GClientToken;
              var json = JSON.stringify(sendparams);

              $.post("post_lockprofile.php", json).done(function(data)
              {
                 if (data == 'OK' )
                 {
                    // var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                    // var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;
                    RefreshGrid();
                 }
                 else
                    alert( "This was not possible: " + data);
              });
          }
       };



   
       function DiagnoseActivity()
       {

          var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
          var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
          if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                 
              var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;
              var sendparams = { };
              sendparams.ProfileName = SelectedProfile.trim();
              sendparams.token = GClientToken;
              var json = JSON.stringify(sendparams);

              $.post("post_diagnose_activity.php", json).done(function(data)
                     {
                      window.open(data);
                     }
                 );
          }
       };

       function DumpMemoryUsage()
       {

              var sendparams = { };
              sendparams.token = GClientToken;
              var json = JSON.stringify(sendparams);

              $.post("dump_memory_usage.php", json).done(function(data)
                     {
                      alert(data);
                     }
                 );
          
       };

       function ShowDetailedStatus()
       {

          var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
          var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
          if (selectedrowindex >= 0 && selectedrowindex < rowscount) {

              var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;

              window.open("status.php?token="+GClientToken+"&profile="+SelectedProfile.trim());
          }
       };
       function ExportProfile()
       {
          var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
          var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
          if (selectedrowindex >= 0 && selectedrowindex < rowscount)
          {
              var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;
              window.open("exportprofile.php?token="+GClientToken+"&profile="+SelectedProfile.trim());
          }
       };
       function ExportProfiles()
       {
          window.open("exportprofiles.php?token="+GClientToken);
       };

       function PerformLogout()
       {
          window.location.replace("logout.php?token="+GClientToken);
       }

       function LogFiles()
       {

          var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
          var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
          {
              var SelectedProfile;
              if (selectedrowindex >= 0 && selectedrowindex < rowscount)
                 SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;

              var sendparams = { };
              if (SelectedProfile)
                 sendparams.ProfileName = SelectedProfile.trim()
              else
                 sendparams.ProfileName = '';
              sendparams.token = GClientToken;
              var json = JSON.stringify(sendparams);           
             // $.post("post_log_files.php", json).done(function(data)
             // {                                
             //    if (data != '')
             //    { 
                    var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                    var SelectedProfileItem = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                    var SelectedProfile;
                    if (SelectedProfileItem)
                       SelectedProfile = SelectedProfileItem.Name;

                    $("#LogFilesDlg_div").html(LogFilesDlgHTML);

                       $('#jqxLogFilesDlg').jqxWindow({ maxWidth: 900,  width:900, maxHeight:650, height:650, autoOpen: false, isModal: true,  
                           theme: 'energyblue', animationType: 'slide', closeButtonAction: 'close' });


                        var GridSource =
                        {
                            datatype: "json",
                            id: 'id',
                            url: "logfiles.json", 
                            root: "Rows",             
                            datafields: [
                                { id: 'id', type:'number' },
                                { name: 'LogFileName', type: 'string' }]
                        };       

                         var GridDataAdapter = new $.jqx.dataAdapter(GridSource,
                        {
                            downloadComplete: function (data, status, xhr) { },
                            loadComplete: function (data) { },
                            loadError: function (xhr, status, error) { 
                                 
                            },
                            beforeSend: function (xhr) {
                              if (SelectedProfile)
                                 xhr.setRequestHeader('ProfileName', SelectedProfile);
                              xhr.setRequestHeader('token', GClientToken);
                            }
                        }); 

                       $('#jqx_log_grid').jqxGrid({ 
                        width: 850,      
                        height:550,          
                        rowsheight : 50,                   
                        source: GridDataAdapter,
                        pageable: true,
                        pagesize:20,
                        autoheight: false,
                        //virtualmode: true,
                        columns: [

                          { text: ' ', datafield: 'id', width: 50 },                  
                          { text: 'Log File', datafield: 'LogFileName', width: 800 }                                  ]

                      });


                      
                      $('#LogFiles_Close_btn').jqxButton({});
  
                      $('#LogFiles_Close_btn').click(function () {

                          $('#jqxLogFilesDlg').jqxWindow('destroy');
                      });
                                
                      $('#jqxLogFilesDlg').on('close', function (event) { 
          
                          $('#jqxLogFilesDlg').jqxWindow('destroy'); } 
                     );

                       $('#jqxLogFilesDlg').jqxWindow('open');
                       $('#jqxLogFilesDlg').jqxWindow('focus');
                    
                    //alert("profile '" + SelectedProfile + " :"  + data);                    
                // }  
                                  
              //}); 
          }

       };

       function TerminateProcess()
       {
          if (confirm('Web server process will be terminated. Are you sure ?'))     
          {     
              var sendparams = { };
              sendparams.token = GClientToken;
              var json = JSON.stringify(sendparams);           
              $.post("terminate_process.php", json).done(function(data)
              {                                
                 if (data != '')
                 {                     
                    alert("Termination of syncovery web server process info: "   + data);                    
                 }  
                                  
              }); 
          }                      
       };

}//end InitMainForm


      


       
