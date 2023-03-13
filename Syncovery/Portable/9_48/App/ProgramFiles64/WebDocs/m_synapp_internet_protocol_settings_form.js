'use strict';

var GInternetProtSettingsBars = null;
var GCurrentInternetProtocolSetRegistryList = null;

function m_OnProtocolComboItem(ProfileName, InternetProtocolSetRegistryList, ProtocolName, RawPathURL)
{
  try
  {

    //if( GProtocolName != ProtocolName )
    //   LoadDefaultsToRegistryList( InternetProtocolSetRegistryList, false );

    // GProtocolName = ProtocolName;

    if (GInternetProtSettingsBars != null)
    {
      GInternetProtSettingsBars.jqxNavigationBar('destroy');
      GInternetProtSettingsBars = null;
    }

    if (GetBaseProtocolName(ProtocolName) == 'FTP')
    {

      $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_FTP);

      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {
          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('FTP_url', InternetProtocolSetRegistryList, 'FTP', 200);
          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'FTP', 200);
          LoadRegistryItemToControlByName2('FTP_login', InternetProtocolSetRegistryList, 'FTP', 200);
          LoadRegistryItemToControlByName2('inptPassword', InternetProtocolSetRegistryList, 'FTP', 200);

          //overriding from RawURL
          var Obj = GetJSONObject('parseftpurl', [RawPathURL, GIntProtAbsolutePath]);
          if (Obj != undefined)
          {
            $('#FTP_url').jqxInput('val', 'ftp://' + Obj.server); //Obj.prefix
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }

          //initialization of some controls

          // LoadRegistryItemToControlByName2('jqxLibraryCombo', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cbFTP_passive_mode', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('FTP_port', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'FTP');
        }
        else if (p_index == 1)
        {

          LoadRegistryItemToControlByName2('comboFTP_adv_Charset', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('cbFTP_adv_ascii_transfer_mode', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cbFTP_adv_server_supports_moving', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('comboFTP_adv_ListingCommand', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cbFTP_adv_verify_file', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cbFTP_adv_respect_passive_mode', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('comboFTP_adv_TimestampsForUploads', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cbFTP_zoneauto', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cbFTP_UTC', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('FTP_adv_list', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('FTP_adv_upload_min', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('adv_timeout', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'FTP');
        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'FTP', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'FTP', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'FTP', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'FTP', 195);
          LoadRegistryItemToControlByName2('cbFTP_proxy_send_host_command', InternetProtocolSetRegistryList, 'FTP');

        }
        else if (p_index == 3)
        {

          $("#rbFTPSnone").jqxRadioButton(
          {
            groupName: 'FTP_Security_Mode_Group'
          });
          $("#rbFTPSimplicit").jqxRadioButton(
          {
            groupName: 'FTP_Security_Mode_Group'
          });
          $("#rbFTPSexplicit").jqxRadioButton(
          {
            groupName: 'FTP_Security_Mode_Group'
          });

          LoadRegistryItemToControlByName2('FTP_Security_Mode_Group', InternetProtocolSetRegistryList, 'FTP');

          $("#rbFTP_Security_auto").jqxRadioButton(
          {
            groupName: 'FTP_Auth_Cmd_Group'
          });
          $("#rbFTP_Security_TLS").jqxRadioButton(
          {
            groupName: 'FTP_Auth_Cmd_Group'
          });
          $("#rbFTP_Security_SSL").jqxRadioButton(
          {
            groupName: 'FTP_Auth_Cmd_Group'
          });
          $("#rbFTP_Security_TLSC").jqxRadioButton(
          {
            groupName: 'FTP_Auth_Cmd_Group'
          });
          $("#rbFTP_Security_TLSP").jqxRadioButton(
          {
            groupName: 'FTP_Auth_Cmd_Group'
          });

          LoadRegistryItemToControlByName2('FTP_Auth_Cmd_Group', InternetProtocolSetRegistryList, 'FTP');

          $("#ftpTLS11plus").jqxRadioButton(
          {
            groupName: 'FTP_Version_Group'
          });
          $("#ftpTLS12plus").jqxRadioButton(
          {
            groupName: 'FTP_Version_Group'
          });
          $("#ftpTLS13plus").jqxRadioButton(
          {
            groupName: 'FTP_Version_Group'
          });

          LoadRegistryItemToControlByName2('FTP_Version_Group', InternetProtocolSetRegistryList, 'FTP');

          LoadRegistryItemToControlByName2('comboFTP_security_Certificate', InternetProtocolSetRegistryList, 'FTP', 100);
          LoadRegistryItemToControlByName2('FTP_security_CertificatePassword', InternetProtocolSetRegistryList, 'FTP');
          LoadRegistryItemToControlByName2('cbFTP_security_nopassword', InternetProtocolSetRegistryList, 'FTP', 100);
        }
      }

      function InitFtpBar()
      {
        if (InternetProtSettingsTabsHTML_FTP == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_FTP);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 600,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }
      if (InternetProtSettingsTabsHTML_FTP == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_FTP.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_FTP = client.responseText;
             InitFtpBar();
          }
        }
        client.send();
      }
      else
        InitFtpBar();

    }
    else if (GetBaseProtocolName(ProtocolName) == 'SSH')
    {

      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {

          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('jqxLibraryCombo', InternetProtocolSetRegistryList, 'SSH');

          //initialization of some controls
          LoadRegistryItemToControlByName2('SSH_url', InternetProtocolSetRegistryList, 'SSH', 200);
          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'SSH', 200);
          LoadRegistryItemToControlByName2('SSH_login', InternetProtocolSetRegistryList, 'SSH', 200);
          LoadRegistryItemToControlByName2('inptPassword', InternetProtocolSetRegistryList, 'SSH', 200);

          //overriding from RawURL
          var Obj = GetJSONObject('parseftpurl', [RawPathURL, GIntProtAbsolutePath]);
          if (Obj != undefined)
          {
            $('#SSH_url').jqxInput('val', 'sftp://' + Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }

          LoadRegistryItemToControlByName2('SSH_port', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('cbSSH_usePutty', InternetProtocolSetRegistryList, 'SSH');
        }
        else if (p_index == 1)
        {

          LoadRegistryItemToControlByName2('comboSSH_adv_Charset', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('cbrecursive_listing', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('cbSSH_adv_verify_destination_file', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('adv_timeout', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'SSH');

        }
        else if (p_index == 2)
        {

          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'SSH', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'SSH', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'SSH', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'SSH', 195);

        }
        else if (p_index == 3)
        {
          $('#btnSSH_Security_Advanced_SSH').jqxButton(
          {
            width: 200,
            height: 40
          });
          LoadRegistryItemToControlByName2('cbSSH_Security_username_password', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('cbSSH_Security_keyboard', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('cbSSH_Security_certificate', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('comboSSH_security_Certificate', InternetProtocolSetRegistryList, 'SSH');
          LoadRegistryItemToControlByName2('SSH_security_CertificatePassword', InternetProtocolSetRegistryList, 'SSH', 200);
          LoadRegistryItemToControlByName2('cbSSH_security_nopassword', InternetProtocolSetRegistryList, 'SSH');
        }
      }

      function InitSftpBar()
      {
        if (InternetProtSettingsTabsHTML_SFTP == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_SFTP);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 600,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }

      if (InternetProtSettingsTabsHTML_SFTP == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_SFTP.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_SFTP = client.responseText;
             InitSftpBar();
          }
        }
        client.send();
      }
      else
        InitSftpBar();

    }
    else if (GetBaseProtocolName(ProtocolName) == 'WebDAV')
    {
      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {

          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('jqxLibraryCombo', InternetProtocolSetRegistryList, 'WebDAV', 200);
          LoadRegistryItemToControlByName2('WebDAV_url', InternetProtocolSetRegistryList, 'WebDAV', 195);
          LoadRegistryItemToControlByName2('jqxWebDAVAuthenticationCombo', InternetProtocolSetRegistryList, 'WebDAV', 200);
          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'WebDAV', 195);
          LoadRegistryItemToControlByName2('WebDAV_login', InternetProtocolSetRegistryList, 'WebDAV', 195);
          LoadRegistryItemToControlByName2('inptPassword', InternetProtocolSetRegistryList, 'WebDAV', 195);
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'WebDAV');

          var Obj = GetJSONObject('parseftpurl', [RawPathURL]);
          if (Obj != undefined)
          {
            $('#WebDAV_url').jqxInput('val', Obj.prefix + Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
        }
        else if (p_index == 1)
        {
          LoadRegistryItemToControlByName2('comboWebDAV_adv_Charset', InternetProtocolSetRegistryList, 'WebDAV');
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('comboWebDAV_adv_strategyCombo', InternetProtocolSetRegistryList, 'WebDAV', 195);
          LoadRegistryItemToControlByName2('cbWebDAV_adv_use_displayname', InternetProtocolSetRegistryList, 'WebDAV');
          LoadRegistryItemToControlByName2('comboWebDAV_adv_use_expect_100_continue', InternetProtocolSetRegistryList, 'WebDAV');
          LoadRegistryItemToControlByName2('comboWebDAV_adv_TimestampsForUploads', InternetProtocolSetRegistryList, 'WebDAV');
          LoadRegistryItemToControlByName2('adv_timeout', InternetProtocolSetRegistryList, 'WebDAV');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'WebDAV');
          LoadRegistryItemToControlByName2('WebDAV_adv_http_retries', InternetProtocolSetRegistryList, 'WebDAV');

        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'WebDAV', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'WebDAV', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'WebDAV');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'WebDAV', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'WebDAV', 195);

        }
        else if (p_index == 3)
        {

          $("#ftpTLS11plus").jqxRadioButton(
          {
            groupName: "WebDAV_Version_Group"
          });
          $("#ftpTLS12plus").jqxRadioButton(
          {
            groupName: "WebDAV_Version_Group"
          });
          $("#ftpTLS13plus").jqxRadioButton(
          {
            groupName: "WebDAV_Version_Group"
          });
          LoadRegistryItemToControlByName2('WebDAV_Version_GroupWidget', InternetProtocolSetRegistryList, 'WebDAV');
        }

      };

      function InitWebDavBar()
      {
        if (InternetProtSettingsTabsHTML_WebDAV == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_WebDAV);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 600,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }

      if (InternetProtSettingsTabsHTML_WebDAV == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_WebDav.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_WebDAV = client.responseText;
             InitWebDavBar();
          }
        }
        client.send();
      }
      else
        InitWebDavBar();

    }
    else if (GetBaseProtocolName(ProtocolName) == 'Amazon S3')
    {

      function OnInitNavBarContent(p_index)
      {
        if (p_index == 0)
        {
          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('AmazonS3_bucket', InternetProtocolSetRegistryList, 'Amazon S3', 195);
          LoadRegistryItemToControlByName2('comboS3StorageClass', InternetProtocolSetRegistryList, 'Amazon S3', 200);
          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'Amazon S3', 195);
          LoadRegistryItemToControlByName2('AmazonS3_access_id', InternetProtocolSetRegistryList, 'Amazon S3', 195);
          LoadRegistryItemToControlByName2('inptPassword', InternetProtocolSetRegistryList, 'Amazon S3', 195);
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'Amazon S3');

          var Obj = GetJSONObject('parseftpurl', [RawPathURL]);
          if (Obj != undefined)
          {
            $('#AmazonS3_bucket').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }

        }
        else if (p_index == 1)
        {
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('cbAmazonS3_make_uploaded_files_pub_available', InternetProtocolSetRegistryList, 'Amazon S3');
          LoadRegistryItemToControlByName2('cbrecursive_listing', InternetProtocolSetRegistryList, 'Amazon S3');
          LoadRegistryItemToControlByName2('cbAmazonS3_use_server_side_encryption', InternetProtocolSetRegistryList, 'Amazon S3');
          LoadRegistryItemToControlByName2('cbAmazonS3_use_transfer_acceleration', InternetProtocolSetRegistryList, 'Amazon S3');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'Amazon S3', 195);
        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'Amazon S3', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'Amazon S3', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'Amazon S3');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'Amazon S3', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'Amazon S3', 195);

        }
      };

      function InitAmazonS3Bar()
      {
        if (InternetProtSettingsTabsHTML_AmazonS3 == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_AmazonS3);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 600,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }

      if (InternetProtSettingsTabsHTML_AmazonS3 == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_AmazonS3.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_AmazonS3 = client.responseText;
             InitAmazonS3Bar();
          }
        }
        client.send();
      }
      else
        InitAmazonS3Bar();

    }
    else if (GetBaseProtocolName(ProtocolName) == 'Google Drive')
    {

      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {
          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'Google Drive', 195);
          LoadRegistryItemToControlByName2('inptAccountID', InternetProtocolSetRegistryList, 'Google Drive', 195);
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'Google Drive');

          var Obj = GetJSONObject('parseftpurl', [RawPathURL]);
          if (Obj != undefined)
          {
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
        }
        else if (p_index == 1)
        {
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('cbGDrive_adv_enable_doc_convercion', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDrive_create_links', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'Google Drive', 195);
          LoadRegistryItemToControlByName2('cbrecursive_listing', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbAvoidChangesAPIInitialListing', InternetProtocolSetRegistryList, 'Google Drive');
        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'Google Drive', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'Google Drive', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'Google Drive', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'Google Drive', 195);

        }
        else if (p_index == 3)
        {
          $("#rbGDocs_Spread_xlsx").jqxRadioButton(
          {
            groupName: 'GDocs_Spreads_Group'
          });
          $("#rbGDocs_Spread_csv").jqxRadioButton(
          {
            groupName: 'GDocs_Spreads_Group'
          });
          $("#rbGDocs_Spread_pdf").jqxRadioButton(
          {
            groupName: 'GDocs_Spreads_Group'
          });

          LoadRegistryItemToControlByName2('GDocs_Spreads_Group', InternetProtocolSetRegistryList, 'Google Drive');

          $("#rbGDocs_TextDocs_docx").jqxRadioButton(
          {
            groupName: 'GDocs_Docs_Group'
          });
          $("#rbGDocs_TextDocs_odt").jqxRadioButton(
          {
            groupName: 'GDocs_Docs_Group'
          });
          $("#rbGDocs_TextDocs_rtf").jqxRadioButton(
          {
            groupName: 'GDocs_Docs_Group'
          });
          $("#rbGDocs_TextDocs_html").jqxRadioButton(
          {
            groupName: 'GDocs_Docs_Group'
          });
          $("#rbGDocs_TextDocs_pdf").jqxRadioButton(
          {
            groupName: 'GDocs_Docs_Group'
          });
          $("#rbGDocs_TextDocs_txt").jqxRadioButton(
          {
            groupName: 'GDocs_Docs_Group'
          });

          LoadRegistryItemToControlByName2('GDocs_Docs_Group', InternetProtocolSetRegistryList, 'Google Drive');

          $("#rbGDocs_Pres_pptx").jqxRadioButton(
          {
            groupName: 'GDocs_Pres_Group'
          });
          $("#rbGDocs_Pres_txt").jqxRadioButton(
          {
            groupName: 'GDocs_Pres_Group'
          });
          $("#rbGDocs_Pres_pdf").jqxRadioButton(
          {
            groupName: 'GDocs_Pres_Group'
          });

          LoadRegistryItemToControlByName2('GDocs_Pres_Group', InternetProtocolSetRegistryList, 'Google Drive');

          $("#rbGDocs_Draw_jpg").jqxRadioButton(
          {
            groupName: 'GDocs_Draw_Group'
          });
          $("#rbGDocs_Draw_png").jqxRadioButton(
          {
            groupName: 'GDocs_Draw_Group'
          });
          $("#rbGDocs_Draw_pdf").jqxRadioButton(
          {
            groupName: 'GDocs_Draw_Group'
          });
          $("#rbGDocs_Draw_xml").jqxRadioButton(
          {
            groupName: 'GDocs_Draw_Group'
          });

          LoadRegistryItemToControlByName2('GDocs_Draw_Group', InternetProtocolSetRegistryList, 'Google Drive');

          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_csv', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_html', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_pdf', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_pptx', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_txt', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_doc', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_ods', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_pps', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_rtf', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_xls', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_docx', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_odt', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_ppt', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_tsv', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDocs_ftconvert_xlsx', InternetProtocolSetRegistryList, 'Google Drive');
          LoadRegistryItemToControlByName2('cbGDrive_clenup_in_folder', InternetProtocolSetRegistryList, 'Google Drive');

        }

      };

      function InitGoogleDriveBar()
      {
        if (InternetProtSettingsTabsHTML_GoogleDrive == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_GoogleDrive);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 1000,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }

      if (InternetProtSettingsTabsHTML_GoogleDrive == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_GoogleDrive.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_GoogleDrive = client.responseText;
             InitGoogleDriveBar();
          }
        }
        client.send();
      }
      else
        InitGoogleDriveBar();

    }
    else if (GetBaseProtocolName(ProtocolName) == 'Azure')
    {

      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {

          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('Azure_container', InternetProtocolSetRegistryList, 'Azure', 195);
          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'Azure', 195);
          LoadRegistryItemToControlByName2('Azure_account_id', InternetProtocolSetRegistryList, 'Azure', 195);
          LoadRegistryItemToControlByName2('inptPassword', InternetProtocolSetRegistryList, 'Azure', 195);
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'Azure');

          var Obj = GetJSONObject('parseftpurl', [RawPathURL]);
          if (Obj != undefined)
          {
            $('#Azure_container').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
        }
        else if (p_index == 1)
        {
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('cbrecursive_listing', InternetProtocolSetRegistryList, 'Azure');
          LoadRegistryItemToControlByName2('Azure_adv_cache_control', InternetProtocolSetRegistryList, 'Azure');
          LoadRegistryItemToControlByName2('adv_timeout', InternetProtocolSetRegistryList, 'Azure');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'Azure');
        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'Azure', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'Azure', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'Azure');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'Azure', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'Azure', 195);

        }
      };

      function InitAzureBar()
      {
        if (InternetProtSettingsTabsHTML_Azure == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_Azure);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 1000,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }
      if (InternetProtSettingsTabsHTML_Azure == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_Azure.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_Azure = client.responseText;
             InitAzureBar();
          }
        }
        client.send();
      }
      else
        InitAzureBar();

    }
    else if (GetBaseProtocolName(ProtocolName) == 'GDriveAlike')
    {

      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {
          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'GDriveAlike', 195);
          LoadRegistryItemToControlByName2('inptAccountID', InternetProtocolSetRegistryList, 'GDriveAlike', 195);
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'GDriveAlike', 195);
          var Obj = GetJSONObject('parseftpurl', [RawPathURL]);
          if (Obj != undefined)
          {
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
        }
        else if (p_index == 1)
        {
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'GDriveAlike');
          LoadRegistryItemToControlByName2('cbrecursive_listing', InternetProtocolSetRegistryList, 'GDriveAlike');
        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'GDriveAlike', 195);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'GDriveAlike', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'GDriveAlike');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'GDriveAlike', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'GDriveAlike', 195);
        }
      }

      function InitGDriveAlikeBar()
      {
        if (InternetProtSettingsTabsHTML_GDriveRelevant == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_GDriveRelevant);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 1000,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }
      if (InternetProtSettingsTabsHTML_GDriveRelevant == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_GDriveRelevant.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_GDriveRelevant = client.responseText;
             InitGDriveAlikeBar();
          }
        }
        client.send();
      }
      else
        InitGDriveAlikeBar();
    }
    else if (GetBaseProtocolName(ProtocolName) == 'Glacier')
    {

      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {
          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('Glacier_Vault', InternetProtocolSetRegistryList, 'Glacier', 195);
          LoadRegistryItemToControlByName2('comboGlacier_Region', InternetProtocolSetRegistryList, 'Glacier', 200);
          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'Glacier', 195);
          LoadRegistryItemToControlByName2('inpt_Glacier_account_id', InternetProtocolSetRegistryList, 'Glacier', 195);
          LoadRegistryItemToControlByName2('inptPassword', InternetProtocolSetRegistryList, 'Glacier', 195);
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'Glacier');
          var Obj = GetJSONObject('parseftpurl', [RawPathURL]);
          if (Obj != undefined)
          {
            $('#Glacier_Vault').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
        }
        else if (p_index == 1)
        {
          LoadRegistryItemToControlByName2('cbrecursive_listing', InternetProtocolSetRegistryList, 'Glacier');
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('adv_timeout', InternetProtocolSetRegistryList, 'Glacier');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'Glacier');

        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'Glacier', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'Glacier', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'Glacier');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'Glacier', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'Glacier', 195);
        }
      }

      function InitGlacierBar()
      {
        if (InternetProtSettingsTabsHTML_Glacier == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_Glacier);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 1000,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }
      if (InternetProtSettingsTabsHTML_Glacier == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_Glacier.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_Glacier = client.responseText;
             InitGlacierBar();
          }
        }
        client.send();
      }
      else
        InitGlacierBar();

    }
    else if (GetBaseProtocolName(ProtocolName) == 'HTTP')
    {
      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {
          $('#InternetSettingsOK_btn').jqxButton('disabled', false);

          LoadRegistryItemToControlByName2('HTTP_url', InternetProtocolSetRegistryList, 'HTTP', 195);
          LoadRegistryItemToControlByName2('HTTP_port', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'HTTP', 195);
          LoadRegistryItemToControlByName2('HTTP_login', InternetProtocolSetRegistryList, 'HTTP', 195);
          LoadRegistryItemToControlByName2('inptPassword', InternetProtocolSetRegistryList, 'HTTP', 195);
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'HTTP');

          var Obj = GetJSONObject('parseftpurl', [RawPathURL]);
          if (Obj != undefined)
          {
            $('#HTTP_url').jqxInput('val', Obj.prefix + Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }

        }
        else if (p_index == 1)
        {
          LoadRegistryItemToControlByName2('cbHTTP_HTML_download_and_parse', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('HTTP_HTML_parsing_limit', InternetProtocolSetRegistryList, 'HTTP', 195);
          LoadRegistryItemToControlByName2('cbHTTP_HTML_enquire_timestamp', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('cbHTTP_HTML_enquire_precise_info', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('cbHTTP_HTML_download_default_pages', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('cbHTTP_HTML_consider_locally_existing_files', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('cbHTTP_HTML_assume_local_files', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('cbHTTP_HTML_avoid_re_downloading', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('jqxLinksAboveCombo', InternetProtocolSetRegistryList, 'HTTP', 100);
          LoadRegistryItemToControlByName2('jqxLinksToOtherDomainsCombo', InternetProtocolSetRegistryList, 'HTTP', 100);
        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
          LoadRegistryItemToControlByName2('adv_timeout', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('adv_retries', InternetProtocolSetRegistryList, 'HTTP');
        }
        else if (p_index == 3)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'HTTP', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'HTTP', 195);
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'HTTP');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'HTTP', 195);
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'HTTP', 195);
        }
        else if (p_index == 4)
        {
          $("#ftpTLS11plus").jqxRadioButton(
          {
            groupName: 'HTTP_Version_Group'
          });
          $("#ftpTLS12plus").jqxRadioButton(
          {
            groupName: 'HTTP_Version_Group'
          });
          $("#ftpTLS13plus").jqxRadioButton(
          {
            groupName: 'HTTP_Version_Group'
          });
          LoadRegistryItemToControlByName2('HTTP_Version_Group', InternetProtocolSetRegistryList, 'HTTP', 195);

        }

      }

      function InitHTTPBar()
      {
        if (InternetProtSettingsTabsHTML_HTTP == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_HTTP);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 1000,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');

        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }
      if (InternetProtSettingsTabsHTML_HTTP == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_HTTP.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_HTTP = client.responseText;
             InitHTTPBar();
          }
        }
        client.send();
      }
      else
        InitHTTPBar();

    }
    else if (GetBaseProtocolName(ProtocolName) == 'Sharepoint')
    {

      function OnInitNavBarContent(p_index)
      {

        if (p_index == 0)
        {
          $('#InternetSettingsOK_btn').jqxButton('disabled', false);
          LoadRegistryItemToControlByName2('Sharepoint_domain', InternetProtocolSetRegistryList, 'Sharepoint', 225);
          LoadRegistryItemToControlByName2('inptInternetFolder', InternetProtocolSetRegistryList, 'Sharepoint', 195);
          LoadRegistryItemToControlByName2('Sharepoint_account_id', InternetProtocolSetRegistryList, 'Sharepoint', 195);
          LoadRegistryItemToControlByName2('cballow_ipv6', InternetProtocolSetRegistryList, 'Sharepoint');

          var Obj = GetJSONObject('parseftpurl', [RawPathURL]);
          if (Obj != undefined)
          {
            $('#Sharepoint_domain').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
        }
        else if (p_index == 1)
        {
          LoadRegistryItemToControlByName2('cbadv_replace_characters', InternetProtocolSetRegistryList, '*');
        }
        else if (p_index == 2)
        {
          LoadRegistryItemToControlByName2('comboproxy_type', InternetProtocolSetRegistryList, 'Sharepoint', 200);
          LoadRegistryItemToControlByName2('proxy_host', InternetProtocolSetRegistryList, 'Sharepoint');
          LoadRegistryItemToControlByName2('proxy_port', InternetProtocolSetRegistryList, 'Sharepoint');
          LoadRegistryItemToControlByName2('proxy_login', InternetProtocolSetRegistryList, 'Sharepoint');
          LoadRegistryItemToControlByName2('proxy_password', InternetProtocolSetRegistryList, 'Sharepoint');
        }

      }

      function InitSharepointBar()
      {
        if (InternetProtSettingsTabsHTML_Sharepoint == '') return;
        $("#internet_settings_navigationbar_div").html(InternetProtSettingsTabsHTML_Sharepoint);
        $("#jqx_internet_settings_navigationbar").jqxNavigationBar(
        {
          width: '100%',
          height: 1000,
          toggleMode: "dblclick",
          expandMode: "toggle",
          initContent: OnInitNavBarContent
        });

        $("div.first").replaceWith('<div class="inner first"><br/>' + ProtocolName + ' Settings<br/></div>');
        GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
      }
      if (InternetProtSettingsTabsHTML_Sharepoint == '')
      {
        var client = new XMLHttpRequest();
        client.open('GET', '/m_InternetSettingsNavigationBar_Sharepoint.html');
        client.onreadystatechange = function()
        {
          if (client.readyState == XMLHttpRequest.DONE)
          {
             InternetProtSettingsTabsHTML_Sharepoint = client.responseText;
             InitSharepointBar();
          }
        }
        client.send();
      }
      else
        InitSharepointBar();

    }
    else if (GetBaseProtocolName(ProtocolName) == '???')
    {
      /*
              function InitAzureBar()
              {
                   $("#internet_settings_navigationbar_div").html( InternetProtSettingsTabsHTML_Azure );
                   $("#jqx_internet_settings_navigationbar").jqxNavigationBar({ width: '100%', height: 1000, toggleMode: "dblclick",
                     expandMode: "toggle", initContent: OnInitNavBarContent });
                   GInternetProtSettingsBars = $("#jqx_internet_settings_navigationbar");
              }
              if(InternetProtSettingsTabsHTML_Azure == '')
                {
                  var client = new XMLHttpRequest();
                  client.open( 'GET', '/m_InternetSettingsNavigationBar_Azure.html' );
                  client.onreadystatechange = function()
                  {
                     if (client.readyState == XMLHttpRequest.DONE)
                     {
                        InternetProtSettingsTabsHTML_Azure = client.responseText;
                        InitAzureBar();
                     }
                  }
                   client.send();
                }
                else
                  InitAzureBar();
                */
    }

  }
  catch (err)
  {
    alert(err.message + ' function:  OnProtocolComboItem');
  }
}

var GInternetSettingsForm = null;

function m_InitProtocolSettingsForm(ProfileName, InternetProtocolSetRegistryList, LeftOrRight, ProtocolName, CurrentLeftRightEdit, RawPathURL)
{

  if (GInternetSettingsForm != null) // to avoid glitches when posting data
    GInternetSettingsForm.jqxWindow('destroy');
  CheckError(CurrentLeftRightEdit != undefined, "param CurrentLeftRightEdit is undefined");

  //GCurrentInternetProtocolSetRegistryList = InternetProtocolSetRegistryList;
  $("#ProtocolSettingsForm_div").html(ProtocolSettingsFormHTML);

  $('#jqxInternetSettingsForm').jqxWindow(
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
  GInternetSettingsForm = $('#jqxInternetSettingsForm');

  $('#InternetSettingsCancel_btn').jqxButton(
  {
    width: 100,
    height: 30
  });

  $('#InternetSettingsCancel_btn').click(function()
  {

    $('#jqxInternetSettingsForm').jqxWindow('close');
    $('#jqxInternetSettingsForm').jqxWindow('destroy');
  });

  $('#InternetSettingsOK_btn').jqxButton(
  {
    width: 100,
    height: 30,
    disabled: true
  });

  $('#InternetSettingsOK_btn').click(function()
  {
    var aProtocolName = $("#jqxProtocolCombo").jqxDropDownList('val');

    CheckError(CurrentLeftRightEdit != undefined, "param CurrentLeftRightEdit is undefined");

   if (GLeftOrRight == "left")
   {
      //in synapp_profile_editor_form
      GLeftStoredPath = StoragePathFromControls(aProtocolName,ignoreerrors);
      GLeftProtocolName = aProtocolName;
      if (GLeftStoredPath==undefined)
         ContainerEmptyError=true;
      else
         CurrentLeftRightEdit.jqxInput('val', GLeftStoredPath );
   }
   else if (GLeftOrRight == "right")
   {
      //in synapp_profile_editor_form
      GRightStoredPath = StoragePathFromControls(aProtocolName,ignoreerrors);
      GRightProtocolName = aProtocolName;
      if (GRightStoredPath==undefined)
         ContainerEmptyError=true;
      else
         CurrentLeftRightEdit.jqxInput('val', GRightStoredPath );
   }

    ControlValuesToRegistryList(InternetProtocolSetRegistryList, GetBaseProtocolName(aProtocolName));
    InternetProtocolSetRegistryList[indexOfListChanged].ListChanged = true;
    $('#jqxInternetSettingsForm').jqxWindow('close');
    $('#jqxInternetSettingsForm').jqxWindow('destroy');
  });

  var ProtocolComboSource = ['FTP', 'SSH', 'WebDAV', 'Amazon S3', 'HTTP', 'Azure', 'Glacier', 'Box', 'Google Drive', 'Google Cloud Storage',
    'DropBoxV2', 'Rackspace', 'OneDrvNew', 'OneDrive for Business', 'Sharepoint', 'Graph', 'SugarSync', 'MediaFire', 'B2',
    'Hubic', 'PCloud' ];

  // Create a jqxDropDownList
  $("#jqxProtocolCombo").jqxDropDownList(
  {
    source: ProtocolComboSource,
    selectedIndex: 0,
    width: 150,
    height: 30,
    itemHeight: 50
  });

  $("#jqxProtocolCombo").find('input').attr('readonly', 'readonly');

  $('#jqxProtocolCombo').on('change', function(event)
  {
    var args = event.args;
    if (args != undefined)
    {
      var item = event.args.item;

      if (item != null)
      {
        $('#InternetSettingsOK_btn').jqxButton('disabled', true);
        m_OnProtocolComboItem(ProfileName, InternetProtocolSetRegistryList, item.label, RawPathURL);
      }

    }
  });
  $("#jqxProtocolCombo").jqxDropDownList('val', ProtocolName);

  // assign jqxNavigationBar
  GInternetProtSettingsBars = null;

  $('#jqxInternetSettingsForm').jqxWindow('open');

  if (GetBaseProtocolName($("#jqxProtocolCombo").jqxDropDownList('val')) == ProtocolName)
    m_OnProtocolComboItem(ProfileName, InternetProtocolSetRegistryList, ProtocolName, RawPathURL);
  else
    $("#jqxProtocolCombo").jqxDropDownList('val', ProtocolName); // to cause onSelect event  //

  //m_OnProtocolComboItem( GSelectedProfileName, GCurrentInternetProtocolSetRegistryList, ProtocolName );
  /*var LCurrentProtoVal = $("#jqxProtocolCombo").jqxDropDownList('val');

         if (LCurrentProtoVal == GProtocolName)
            m_OnProtocolComboItem( GSelectedProfileName, GCurrentInternetProtocolSetRegistryList, GProtocolName );
         else
            $("#jqxProtocolCombo").jqxDropDownList( 'val', GProtocolName ); // to cause onSelect event  //
          */

}
