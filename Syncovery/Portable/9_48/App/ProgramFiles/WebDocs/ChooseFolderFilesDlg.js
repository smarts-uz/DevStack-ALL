'use strict';

var SelectionsL = [];
var SelectionsR = [];

var GTreeDataL;
var GTreeDataR;

var currentChooseFolderProfile;

function ChooseFolderRetryFunction()
{
  if (!directorylistingCanceled)
    DoChooseFolderFilesDlg(currentChooseFolderProfile, true);
}

function GetTreeData(profileName, whichSide, basePath)
{
  var theData;
  var directorylistingNeedRetry = false;
  $.ajax(
  {
    async: false, // synchronous with progress reporting
    url: "directorylisting.htm?path=" + encodeURIComponent(basePath) +
      "&token=" + GClientToken +
      "&isroot=true" +
      "&withsel=true" +
      "&side=" + whichSide,
    success: function(data, status, xhr)
    {
      if (data.substring(0, 1) != "[")
      {
        if (data.substring(0, 6) == "RETRY:")
        {
          directorylistingNeedRetry = true;
          ShowDirListingWaitDialog(data);
        }
        else
          alert('GetTreeData(' + profileName + ',' + whichSide + ',' + basePath + '): ' + data);
      }
      else
        theData = data;
    }
  });

  if (directorylistingNeedRetry && !directorylistingCanceled)
  {
    currentChooseFolderProfile = profileName;
    setTimeout(ChooseFolderRetryFunction, 2000);
    return undefined;
  }

  if (directorylistingModelessAlertCreated)
  {
    directorylistingModelessAlertCreated = false;
    $('#jqxModelessAlertDlg').jqxWindow('close');
    // $('#jqxModelessAlertDlg').jqxWindow('destroy'); // probably not needed
  }

  return theData;
}

function DoChooseFolderFilesDlg(profileName, isRetry)
{
  if (isRetry != true)
  {
    GTreeDataL = undefined;
    GTreeDataR = undefined;
  }

  if (GTreeDataL == undefined)
  {
    GTreeDataL = GetTreeData(profileName, "left", $("#inptLeftHandSide").jqxInput('val'));
    if (!GTreeDataL)
      return;
  }

  if (GTreeDataR == undefined)
  {
    GTreeDataR = GetTreeData(profileName, "right", $("#inptRightHandSide").jqxInput('val'));
    if (!GTreeDataR)
      return;
  }

  $("#ChooseFolderFilesDlg_div").html(HTML_ChooseFolderFilesDlg);
  $('#jqxChooseFolderFilesDlg').jqxWindow(
  {
    maxWidth: 820,
    width: 820,
    maxHeight: 450,
    height: 450,
    autoOpen: false,
    isModal: true,
    theme: 'energyblue',
    animationType: 'slide'
  });

  var LeftTreeSource = jQuery.parseJSON(GTreeDataL);
  var RightTreeSource = jQuery.parseJSON(GTreeDataR);

  $('#jqxTreeL').jqxTree(
  {
    source: LeftTreeSource,
    height: 300,
    width: 400,
    checkboxes: true
  });
  $('#jqxTreeR').jqxTree(
  {
    source: RightTreeSource,
    height: 300,
    width: 400,
    checkboxes: true
  });

  $('#jqxTreeR').on('checkChange',
    function(event)
    {
      var e = event.args.element;
      var args = event.args;
      var checked = args.checked;

      var children = $(e).find("li");
      for (var i = 0; i < children.length; i++)
      {
        $('#jqxTreeR').jqxTree('checkItem', children[i], checked);
      };

    });

  $('#jqxTreeL').on('checkChange',
    function(event)
    {
      var e = event.args.element;
      var args = event.args;
      var checked = args.checked;

      var children = $(e).find("li");
      for (var i = 0; i < children.length; i++)
      {
        $('#jqxTreeL').jqxTree('checkItem', children[i], checked);
      };
    });

  $('#jqxTreeL').on('expand', FolderTreeExpandFunc);
  $('#jqxTreeR').on('expand', FolderTreeExpandFunc);

  $('#ChooseFolderFiles_Cancel_btn').jqxButton(
  {
    width: '80px',
    theme: 'energyblue'
  });
  $('#ChooseFolderFiles_Cancel_btn').click(
    function()
    {
      $('#jqxChooseFolderFilesDlg').jqxWindow('close');
    });

  $('#ChooseFolderFiles_LeftAll_btn').jqxButton(
  {
    width: '80px',
    theme: 'energyblue'
  });
  $('#ChooseFolderFiles_LeftAll_btn').click(
    function()
    {
      $('#jqxTreeL').jqxTree('checkAll');
    });

  $('#ChooseFolderFiles_LeftNone_btn').jqxButton(
  {
    width: '80px',
    theme: 'energyblue'
  });
  $('#ChooseFolderFiles_LeftNone_btn').click(
    function()
    {
      $('#jqxTreeL').jqxTree('uncheckAll');
    });

  $('#ChooseFolderFiles_RightAll_btn').jqxButton(
  {
    width: '80px',
    theme: 'energyblue'
  });
  $('#ChooseFolderFiles_RightAll_btn').click(
    function()
    {
      $('#jqxTreeR').jqxTree('checkAll');
    });

  $('#ChooseFolderFiles_RightNone_btn').jqxButton(
  {
    width: '80px',
    theme: 'energyblue'
  });
  $('#ChooseFolderFiles_RightNone_btn').click(
    function()
    {
      $('#jqxTreeR').jqxTree('uncheckAll');
    });

  function descendsfrom(a, b)
  {
    if (a.parentElement == b.element)
      return true;
    if ((a.value != "") && (b.value != "") &&
      (a.value.length > b.value.length)) // descendant must have longer value (path)
    {
      var c = b.value + "\\"; // value uses backslashes on all systems
      if (c == a.value.substring(0, c.length))
        return true;

    }
    return false;
  }

  function getSubfolderSelectionsFromTree(items)
  {
    var str = "";
    for (var i = 0; i < items.length; i++)
    {
      var item = items[i];
      if (item.checked && (item.label != "Loading..."))
      {
        // determine if all children are checked too
        var j = i + 1;
        var allchildrenchecked = true;
        while (j < items.length)
        {
          var anotheritem = items[j];
          if (anotheritem.label != "Loading...")
          {
            if (!descendsfrom(anotheritem, item))
            {
              break;
            }
            if ((anotheritem.label != "Loading...") && !anotheritem.checked)
              allchildrenchecked = false;
          }
          j++;
        }

        if (str != "")
          str += ",";
        if (allchildrenchecked)
        {
          str += '"' + item.value + '*"';
          i = j - 1; // skip children
        }
        else
          str += '"' + item.value + '"';
      }
    }
    return str;
  }

  $('#ChooseFolderFiles_OK_btn').jqxButton(
  {
    width: '80px',
    theme: 'energyblue'
  });
  $('#ChooseFolderFiles_OK_btn').click(
    function()
    {
      GSubfolderSelections = getSubfolderSelectionsFromTree($('#jqxTreeL').jqxTree('getItems')) +
        "/" +
        getSubfolderSelectionsFromTree($('#jqxTreeR').jqxTree('getItems'));
      $('#jqxChooseFolderFilesDlg').jqxWindow('close');
      if (GSubfolderSelections != "/")
        $("#SelectedMode").jqxRadioButton('check');
    });

  $('#jqxChooseFolderFilesDlg').on('close',
    function(event)
    {
      $('#jqxChooseFolderFilesDlg').jqxWindow('destroy');
    });

  $('#jqxTreeL').jqxTree('collapseItem', $('#jqxTreeL').jqxTree('getItems')[0]);
  $('#jqxTreeR').jqxTree('collapseItem', $('#jqxTreeR').jqxTree('getItems')[0]);

  $('#jqxChooseFolderFilesDlg').jqxWindow('open');

  setTimeout(function()
  {
    $('#jqxTreeL').jqxTree('expandItem', $('#jqxTreeL').jqxTree('getItems')[0]);
  }, 200);
  setTimeout(function()
  {
    $('#jqxTreeR').jqxTree('expandItem', $('#jqxTreeR').jqxTree('getItems')[0]);
  }, 300);

}
