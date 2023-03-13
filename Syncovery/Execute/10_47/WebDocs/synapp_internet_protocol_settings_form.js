'use strict';

// globals
  
var GInternetProtSettingsTabs = null;
var GCurrentInternetProtocolSetRegistryList = null;
var GLeftOrRight = "";

function isOdd(num) { return num % 2;}

// var GThisLeftRightSideInput = null;

      
var InternetProtSettingsTabsHTML_Cloud =
    '<div id="jqxInternetProtSettingsTabs">'+
                '<ul>'+
                '    <li>Settings</li>'+
                '    <li>Advanced</li>'+
                '    <li>Proxy Settings</li>'+          
                '</ul>'+
                '<div>'+                                                                                                      
                '    <div>Folder</div><div><input type="text" id="inptInternetFolder"/></div>'+
                '    <br/><br/>'+
                '    <div>Account (optional)</div><div><input type="text" id="inptAccountID"/></div>'+
                '    <br/><br/>'+                                          
                '</div>'+                  
                '<div>'+
                '</div>'+
                '<div>'+                                                           
                '</div>'+
             '</div>';


var EncryptionAlgorithmsSource = [
      '3DES (slow)',
      'BLOWFISH',
      'TWOFISH256',
      'TWOFISH192',
      'TWOFISH128',
      'AES256',
      'AES192',
      'AES128',
      'SERPENT256',
      'SERPENT192',
      'SERPENT128',
      'ARCFOUR',
      '(unused)',
      'CAST128',
      'NONE',
      'DES (slow)',
      'AES128_CTR',
      'AES192_CTR',
      'AES256_CTR',
      '3DES_CTR',
      'BLOWFISH_CTR',
      'TWOFISH128_CTR',
      'TWOFISH192_CTR',
      'TWOFISH256_CTR',
      'SERPENT128_CTR',
      'SERPENT192_CTR',
      'SERPENT256_CTR',
      '(unused)',
      'CAST128_CTR',
      'ARCFOUR128',
      'ARCFOUR256',
      'AES128_GCM',
      'AES256_GCM',
      'AES128_GCM_OPENSSH',
      'AES256_GCM_OPENSSH',
      'CHACHA20',
      'CHACHA20_OPENSSH'];
var KeyExchangeAlgorithmsSource = [
      'DH_GROUP_EXCHANGE',
      'DH_GROUP',
      'DH_GROUP_14',
      'DH_GROUP_EXCHANGE256',
      'RSA1024_SHA1',
      'RSA2048_SHA256',
      'ECDH_NIST_P256',
      'ECDH_NIST_P384',
      'ECDH_NIST_P521',
      'ECDH_NIST_K163',
      'ECDH_NIST_P192',
      'ECDH_NIST_P224',
      'ECDH_NIST_K233',
      'ECDH_NIST_B233',
      'ECDH_NIST_K283',
      'ECDH_NIST_K409',
      'ECDH_NIST_B409',
      'ECDH_NIST_K571',
      'ECDH_CURVE25519',
      'ECDH_CURVE448'];
var PublicKeyAlgorithmsSource = [
  'DSS',
  'RSA',
  'X509_SIGN_RSA',
  'X509_SIGN_DSS',
  'SPKI_SIGN_RSA',
  'SPKI_SIGN_DSS',
  'PGP_SIGN_RSA',
  'PGP_SIGN_DSS',
  'ECDSA_NIST_P256',
  'ECDSA_NIST_P384',
  'ECDSA_NIST_P521',
  'ECDSA_NIST_K163',
  'ECDSA_NIST_P192',
  'ECDSA_NIST_P224',
  'ECDSA_NIST_K233',
  'ECDSA_NIST_B233',
  'ECDSA_NIST_K283',
  'ECDSA_NIST_K409',
  'ECDSA_NIST_B409',
  'ECDSA_NIST_K571',
  'ECDSA_CURVE25519',
  'X509_SSH_RSA',
  'X509_SSH_DSS',
  'X509_RSA2048_SHA256',
  'X509_ECDSA_SHA2_NIST_P256',
  'X509_ECDSA_SHA2_NIST_P384',
  'X509_ECDSA_SHA2_NIST_P521',
  'X509_ECDSA_SHA2_NIST_K163',
  'X509_ECDSA_SHA2_NIST_P192',
  'X509_ECDSA_SHA2_NIST_P224',
  'X509_ECDSA_SHA2_NIST_K233',
  'X509_ECDSA_SHA2_NIST_B233',
  'X509_ECDSA_SHA2_NIST_K283',
  'X509_ECDSA_SHA2_NIST_K409',
  'X509_ECDSA_SHA2_NIST_B409',
  'X509_ECDSA_SHA2_NIST_K571',
  'X509_ECDSA_SHA2_CURVE25519'
  ];
var MACAlgorithmsListSource = [
  'HMAC_SHA1',
  'HMAC_SHA1_96',
  'HMAC_MD5',
  'HMAC_MD5_96',
  'NONE',
  'HMAC_RIPEMD160',
  'HMAC_RIPEMD',
  'HMAC_RIPEMD_OPENSSH',
  'HMAC_SHA256',
  'HMAC_SHA256_96',
  'UMAC32',
  'UMAC64',
  'UMAC96',
  'UMAC128',
  'HMAC_SHA2_256',
  'HMAC_SHA2_512',
  'AES128_GCM',
  'AES256_GCM',
  'POLY1305'];
var SFTPVersionSetSource = [
  'SFTP0',
  'SFTP1',
  'SFTP2',
  'SFTP3',
  'SFTP4',
  'SFTP5',
  'SFTP6'];

function AssignURLPath()
{
 // nothing to do really?

 // var LNewPath = $("#inptInternetFolder").jqxInput( 'val' );

 // GRightStoredPath =  LNewPath;

 // GRightStoredPath =  $("#inptInternetFolder").jqxInput( 'val' );
}


function MakeAdvancedSSHDialog()
{
  EnsureSSHDefaults();
  $("#SSHOptionsDlg_div").html( HTML_SSHOptionsDlg );
  $('#jqxSSHOptionsDlg').jqxWindow({ maxWidth: 1200,  width:1200, maxHeight:650, height:650, autoOpen: false, isModal: true, theme: 'energyblue', animationType: 'slide' });

  $("#inptCompressionLevel_SSH").jqxNumberInput({ width : 40, height : 25,  inputMode: 'simple', decimalDigits: 0, min: 1, max: 9 });
  $("#inptCompressionLevel_SSH").jqxNumberInput( 'val', GCompressionLevel_SSH );
  CreateCheckBox("jqxCompressionLevel_SSH_Cb", 200, 25);
  SetCheckBoxValue("jqxCompressionLevel_SSH_Cb", $("#inptCompressionLevel_SSH").jqxNumberInput( 'val') > 0);


  $("#jqxCompressionLevel_SSH_Cb").on('click', function ()
  {
     if (GetCheckBoxValue("jqxCompressionLevel_SSH_Cb") == false )
     {
        $("#inptCompressionLevel_SSH").jqxNumberInput( 'val', 0 );
        $("#inptCompressionLevel_SSH").jqxNumberInput( 'disabled', true );
     }
     else
       $("#inptCompressionLevel_SSH").jqxNumberInput( 'disabled', false );

  });

 CreateCheckBox("jqxAutoAdjustCiphers_SSH_Cb", 600, 25);
 SetCheckBoxValue("jqxAutoAdjustCiphers_SSH_Cb", G_SSH_AutoAdjustCiphers);

 CreateCheckBox("jqxAutoAdjustTransferBlock_SSH_Cb", 600, 25);
 SetCheckBoxValue("jqxAutoAdjustTransferBlock_SSH_Cb", G_SSH_AutoAdjustTransferBlock);

 $("#inptDownloadBlockSize_SSH").jqxNumberInput({ width : 60, height : 25,  inputMode: 'simple', decimalDigits: 0, value : G_SSH_DownloadBlockSize});
 $("#inptUploadBlockSize_SSH").jqxNumberInput({ width : 60, height : 25,  inputMode: 'simple', decimalDigits: 0, value : G_SSH_UploadBlockSize });
 $("#inptSFTPBufferSize_SSH").jqxNumberInput({ width : 60, height : 25,  inputMode: 'simple', decimalDigits: 0, value : G_SSH_SFTPBufferSize });
 $("#inptPipelineLength_SSH").jqxNumberInput({ width : 60, height : 25,  inputMode: 'simple', decimalDigits: 0, value : G_SSH_PipelineLength });

  $("#jqxEncryptionAlgorithmsListBox").jqxListBox({width: 200, source: EncryptionAlgorithmsSource, checkboxes: true, height: 280});
  $("#jqxEncryptionAlgorithmsListBox").jqxListBox('uncheckAll');
  var items = $("#jqxEncryptionAlgorithmsListBox").jqxListBox('getItems');

  $.each(items,
      function (index)
      {
         if (isOdd(Math.trunc(G_SSH_EncryptionAlgorithms / (2**index))))
            $("#jqxEncryptionAlgorithmsListBox").jqxListBox('checkIndex', index )
      });

$("#jqxKeyExchangeAlgorithmsListBox").jqxListBox({width: 230, source: KeyExchangeAlgorithmsSource, checkboxes: true, height: 280});
$("#jqxKeyExchangeAlgorithmsListBox").jqxListBox('uncheckAll');
var items = $("#jqxKeyExchangeAlgorithmsListBox").jqxListBox('getItems');

$.each(items, function (index) {
  if (isOdd(Math.trunc(G_SSH_KeyExchangeAlgorithms / (2**index))))
     $("#jqxKeyExchangeAlgorithmsListBox").jqxListBox('checkIndex', index ); });

  $("#jqxPublicKeyAlgorithmsListBox").jqxListBox({width: 250, source: PublicKeyAlgorithmsSource, checkboxes: true, height: 280});

  $("#jqxPublicKeyAlgorithmsListBox").jqxListBox('uncheckAll');
  var items = $("#jqxPublicKeyAlgorithmsListBox").jqxListBox('getItems');
  $.each(items, function (index) {
    if (isOdd(Math.trunc(G_SSH_PublicKeyAlgorithms / (2**index))))
       $("#jqxPublicKeyAlgorithmsListBox").jqxListBox('checkIndex', index ); });

  $("#jqxMACAlgorithmsListBox").jqxListBox({width: 220, source: MACAlgorithmsListSource, checkboxes: true, height: 280});
  $("#jqxMACAlgorithmsListBox").jqxListBox('uncheckAll');
  var items = $("#jqxMACAlgorithmsListBox").jqxListBox('getItems');
  $.each(items, function (index) {
    if (isOdd(Math.trunc(G_SSH_MACAlgorithms / (2**index))))
       $("#jqxMACAlgorithmsListBox").jqxListBox('checkIndex', index ); });

  $("#jqxSFTPVersionSetListBox").jqxListBox({width: 100, source: SFTPVersionSetSource, checkboxes: true, height: 280});
  $("#jqxSFTPVersionSetListBox").jqxListBox('uncheckAll');
  var items = $("#jqxSFTPVersionSetListBox").jqxListBox('getItems');
  $.each(items, function (index) {
    if (isOdd(Math.trunc(G_SSH_SFTPVersionSet / (2**index))))
       $("#jqxSFTPVersionSetListBox").jqxListBox('checkIndex', index ); });

  $("#SSHOptions_Close_btn").jqxButton();
  $("#SSHOptions_Close_btn").on('click', function ()
  {

     var A_SSH_EncryptionAlgorithms = 0;
     var items = $("#jqxEncryptionAlgorithmsListBox").jqxListBox('getItems');

     $.each(items, function (index)
       {
         var item = $("#jqxEncryptionAlgorithmsListBox").jqxListBox('getItem', index );
         if (item.checked)
         {
            A_SSH_EncryptionAlgorithms = A_SSH_EncryptionAlgorithms + (2 ** index);
            //alert("Added "+item.label+" at idx "+index+", 2^idx="+ (2 ** index).toString(16) + " -> " +
            //      A_SSH_EncryptionAlgorithms.toString(16));
         }
       });

     G_SSH_EncryptionAlgorithms = A_SSH_EncryptionAlgorithms;

     //alert("SSHAlg= " + G_SSH_EncryptionAlgorithms.toString(16));

     var A_SSH_KeyExchangeAlgorithms = 0;
     var items = $("#jqxKeyExchangeAlgorithmsListBox").jqxListBox('getItems');
     $.each(items, function (index) {
         var item = $("#jqxKeyExchangeAlgorithmsListBox").jqxListBox('getItem', index );
         if (item.checked == true )
         {
             A_SSH_KeyExchangeAlgorithms = A_SSH_KeyExchangeAlgorithms + (2 ** index);
         }

       });

     G_SSH_KeyExchangeAlgorithms = A_SSH_KeyExchangeAlgorithms.toString();


     var A_SSH_PublicKeyAlgorithms = 0;
     var items = $("#jqxPublicKeyAlgorithmsListBox").jqxListBox('getItems');
     $.each(items, function (index) {
         var item = $("#jqxPublicKeyAlgorithmsListBox").jqxListBox('getItem', index );
         if (item.checked == true )
         {
             A_SSH_PublicKeyAlgorithms = A_SSH_PublicKeyAlgorithms + (2 ** index);
         }

       });

     G_SSH_PublicKeyAlgorithms = A_SSH_PublicKeyAlgorithms.toString();

     var A_SSH_MACAlgorithms = 0;
     var items = $("#jqxMACAlgorithmsListBox").jqxListBox('getItems');
     $.each(items, function (index) {
         var item = $("#jqxMACAlgorithmsListBox").jqxListBox('getItem', index );
         if (item.checked == true )
         {
             A_SSH_MACAlgorithms = A_SSH_MACAlgorithms + (2 ** index);
         }
       });

     G_SSH_MACAlgorithms = A_SSH_MACAlgorithms.toString();

     var A_SSH_SFTPVersionSet = 0;
     var items = $("#jqxSFTPVersionSetListBox").jqxListBox('getItems');
     $.each(items, function (index) {
         var item = $("#jqxSFTPVersionSetListBox").jqxListBox('getItem', index );
         if (item.checked == true )
         {
             A_SSH_SFTPVersionSet = A_SSH_SFTPVersionSet + (2 ** index);
         }
       });

     G_SSH_SFTPVersionSet = A_SSH_SFTPVersionSet.toString();
     GCompressionLevel_SSH = $("#inptCompressionLevel_SSH").jqxNumberInput( 'val' );
     G_SSH_AutoAdjustCiphers = GetCheckBoxValue('jqxAutoAdjustCiphers_SSH_Cb');
     G_SSH_AutoAdjustTransferBlock = GetCheckBoxValue('jqxAutoAdjustTransferBlock_SSH_Cb');

     G_SSH_DownloadBlockSize = $("#inptDownloadBlockSize_SSH").jqxNumberInput('val');
     G_SSH_UploadBlockSize = $("#inptUploadBlockSize_SSH").jqxNumberInput('val');
     G_SSH_SFTPBufferSize = $("#inptSFTPBufferSize_SSH").jqxNumberInput('val');
     G_SSH_PipelineLength = $("#inptPipelineLength_SSH").jqxNumberInput('val');

     $('#jqxSSHOptionsDlg').jqxWindow('close');
  });

  $('#jqxSSHOptionsDlg').jqxWindow('open');

} // MakeAdvancedSSHDialog


function OnProtocolComboItem( ProfileName, InternetProtocolSetRegistryList, ProtocolName )
{
   // alert('OnProtocolComboItem');
   try
   {
     if (GProtocolName != ProtocolName)
        LoadDefaultsToRegistryList(InternetProtocolSetRegistryList, false);
      
     GProtocolName = ProtocolName;

     if (GInternetProtSettingsTabs != null)
     {
        GInternetProtSettingsTabs.jqxTabs( 'destroy' );
        GInternetProtSettingsTabs = null;
     }
      

      /*
      ftpGUIlikeFTP          =1;+
      ftpGUIlikeSFTP         =2;
      ftpGUIlikeWebDAV       =3;+
      ftpGUIlikeAmazonS3     =4;+
      ftpGUIlikeAzure        =5;+
      ftpGUIlikeAmazonGlacier=6;
      ftpGUIlikeGoogleDrive  =7;+
      ftpGUIlikeRSync        =8;+
      ftpGUIlikeHTTP         =9;+
      ftpGUIlikeMTP          =10;
      */

      var LBaseProtocolName = GetBaseProtocolName(ProtocolName);

      if (LBaseProtocolName == 'FTP' )
      {
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_FTP );
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });
      }
      else if (LBaseProtocolName == 'SSH' )
      {
          
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_SFTP );  
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });   
      }
      else if (LBaseProtocolName == 'SMB' )
      {
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_SMB );
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });
      }
      else if (LBaseProtocolName == 'HTTP' )
      {

          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_HTTP );  
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });   
      }
      else if (LBaseProtocolName == 'Google Drive' ) 
      {
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_GoogleDrive );                       
           GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });   

          $("#ContainerBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#ContainerBrowseButton').click(
             function ()
             {
               ApplyInternetSettings(true);
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                 function()
                 {
                    InitDirTreeSelectForm(
                                  $('#Container'),
                                  AssignURLPath, GLeftOrRight,
                                  undefined, // $("#inptInternetFolder"),
                                  'ext://', // URL prefix
                                  true // browse container
                                  );
                 });
             });
          $("#FTPBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#FTPBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                 function()
                 {
                    InitDirTreeSelectForm(
                                  $('#Container'),
                                  AssignURLPath, GLeftOrRight,
                                  $("#inptInternetFolder"),
                                  'ext://', // URL prefix
                                  false,true // avoid prefix in container field
                                  );
                 });
             });

       }
       else if (LBaseProtocolName == 'GDriveAlike' || LBaseProtocolName == 'GDriveAlikeWithContainer' )
       {
           $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_GDriveRelevant );
           GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });

           if (LBaseProtocolName == 'GDriveAlikeWithContainer')
           {
              $('#lbCont').css({"display":"block"}); // unhide it
              document.getElementById('Container').type = 'text'; // unhide it, change input type from hidden to text

              $("#ContainerBrowseButton").jqxButton({ theme: 'energyblue' });
              $('#ContainerBrowseButton').click(
                 function ()
                 {
                   ApplyInternetSettings(true);
                   PostProfileEditor("***BROWSEDUMMY***", "Browse",
                         function()
                         {
                            InitDirTreeSelectForm(
                                          $('#Container'),
                                          AssignURLPath, GLeftOrRight,
                                          undefined, // $("#inptInternetFolder"),
                                          'ext://', // URL prefix
                                          true // browse container
                                          );
                         });
                 });
           }
           else
           {
              $('#lbCont').css({"display":"none"});
              $('#ContainerBrowseButton').css({"display":"none"}); // hide it
              document.getElementById('Container').type = 'hidden'; // hide it, change input type from hidden to text
           }

          $("#FTPBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#FTPBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                 function()
                 {
                    InitDirTreeSelectForm(
                                  $('#Container'),
                                  AssignURLPath, GLeftOrRight,
                                  $("#inptInternetFolder"),
                                  'ext://', // URL prefix
                                  false,true
                                  );
                 });
             });
       }
       else if (LBaseProtocolName == 'Amazon S3' )
       {          
          
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_AmazonS3 );            
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });   
          $("#ContainerBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#ContainerBrowseButton').click(
             function ()
             {
               ApplyInternetSettings(true);
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm(
                                      $('#AmazonS3_bucket'),
                                      AssignURLPath, GLeftOrRight,
                                      undefined, // $("#inptInternetFolder"),
                                      'S3://', // URL prefix
                                      true // browse container
                                      );
                     });
             });
          $("#FTPBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#FTPBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm(
                                      $('#AmazonS3_bucket'),
                                      AssignURLPath, GLeftOrRight,
                                      $("#inptInternetFolder"),
                                      'S3://', // URL prefix
                                      false,true
                                      );
                     });
             });

       }
       else if (LBaseProtocolName=='Azure')
       {
        
         $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_Azure );  
         GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });   

         if (ProtocolName=='Azure')
         {
            $('#AzureText').css({"display":"block"});
            $('#CacheControlText1').css({"display":"block"});
            $('#CacheControlText2').css({"display":"block"});
            $('#Azure_adv_cache_control').css({"display":"block"});
         }
         else
         {
            $('#AzureText').css({"display":"none"});
            $('#CacheControlText1').css({"display":"none"});
            $('#CacheControlText2').css({"display":"none"});
            $('#Azure_adv_cache_control').css({"display":"none"});
         }


          $("#ContainerBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#ContainerBrowseButton').click(
             function ()
             {
               ApplyInternetSettings(true);
               var LPrefix;
               if (ProtocolName=='Azure')
                  LPrefix = 'AZ://';
               else
                  LPrefix = 'ext://';
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm(
                                      $('#Azure_container'),
                                      AssignURLPath, GLeftOrRight,
                                      undefined, // $("#inptInternetFolder"),
                                      LPrefix, // URL prefix
                                      true // browse container
                                      );
                     });
             });
          $("#FTPBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#FTPBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        var LPrefix;
                        if (ProtocolName=='Azure')
                           LPrefix = 'AZ://';
                        else
                           LPrefix = 'ext://';
                        InitDirTreeSelectForm(
                                      $('#Azure_container'),
                                      AssignURLPath, GLeftOrRight,
                                      $("#inptInternetFolder"),
                                      LPrefix, // URL prefix
                                      false,true
                                      );
                     });
             });


       }
       else if (LBaseProtocolName == 'Sharepoint' )
       {
         $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_Sharepoint );
         GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });
          $("#ContainerBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#ContainerBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm(
                                      $('#Sharepoint_domain'),
                                      AssignURLPath, GLeftOrRight,
                                      undefined, // $("#inptInternetFolder"),
                                      'ext://', // URL prefix
                                      true // browse container
                                      );
                     });
             });
          $("#FTPBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#FTPBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm(
                                      $('#Sharepoint_domain'),
                                      AssignURLPath, GLeftOrRight,
                                      $("#inptInternetFolder"),
                                      'ext://', // URL prefix
                                      false,true
                                      );
                     });
             });

       }
       else if (LBaseProtocolName == 'WebDAV' )
       {
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_WebDAV );  
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });   
            $("#WebDAVBrowseButton").jqxButton({ theme: 'energyblue' });
            $('#WebDAVBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        var Lurl=$("#WebDAV_url").jqxInput('val');
                        var Lprefix='https://';
                        if (Lurl.includes("http://"))
                           Lprefix="http://";
                        alert("Lprefix: "+Lprefix+" because Lurl="+Lurl);
                        InitDirTreeSelectForm($("#WebDAV_url"),
                                              AssignURLPath,
                                              GLeftOrRight,
                                              $("#inptInternetFolder"),
                                              Lprefix);
                     });
             });
       }
       else if (LBaseProtocolName == 'RSync' )
       {
                    
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_RSync );  
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });        
       }
       else if (LBaseProtocolName == 'Glacier' )
       {

            $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_Glacier );  
            GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight, keyboardNavigation: false });        
                           
          $("#ContainerBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#ContainerBrowseButton').click(
             function ()
             {
               ApplyInternetSettings(true);
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm(
                                      $('#Glacier_Vault'),
                                      AssignURLPath, GLeftOrRight,
                                      undefined, // $("#inptInternetFolder"),
                                      'GL://', // URL prefix
                                      true // browse container
                                      );
                     });
             });
        }

      if (LBaseProtocolName == 'GDriveAlike' || LBaseProtocolName == 'GDriveAlikeWithContainer' )
      {
         // adjust recursive listing and AvoidChangesAPIInitialListing fields
         if (($("#cbrecursive_listing")).length)
         {
            if (HasChangesBasedListing(ProtocolName))
               ($("#recursive_listing_label")).html("Changes Based Listing (speeds up folder listing after the first run)");
            else
            {
               ($("#recursive_listing_label")).html("Recursive Listing");
               ($("#cbAvoidChangesAPIInitialListing")).css({"display":"none"});
               ($("#avoidinlabel")).css({"display":"none"});
            }
         }
      }

      LoadRegistryListToControls( GInternetProtocolRadioButtonsList, LBaseProtocolName );
      LoadRegistryListToControls( GCurrentInternetProtocolSetRegistryList, LBaseProtocolName );

      LoadRegistryListToControls( GCurrentInternetProtocolSetRegistryList, '*' );

      //LoadRegistryItemToControlByName2( 'cbadv_replace_characters', GCurrentInternetProtocolSetRegistryList, '*');

      // override storage path related controls. please note this code goes after LoadRegistryListToControls
      // alert('before 2nd big protocol specific ifelseifelseifelseif block, LBaseProtocolName='+LBaseProtocolName);
      if ( LBaseProtocolName == 'FTP' )
      {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL,GIntProtAbsolutePath]);
          if (Obj != undefined )
          {
            $('#FTP_url').jqxInput('val', 'ftp://' + Obj.server);//Obj.prefix
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }

          CreateCheckBox("cbFTP_secure",200,25,FTP_secure_onchange);
          SetCheckBoxValue("cbFTP_secure",!($("#rbFTPSnone").jqxRadioButton('checked')));

          EnableDisableFTPControls(); //from synaglobals.js

          $("#FTPBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#FTPBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm($("#FTP_url"), AssignURLPath,
                                              GLeftOrRight,
                                              $("#inptInternetFolder"),
                                              'ftp://');
                     });
             });

      }
      else if (ProtocolName == 'SMB' )
      {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL,GIntProtAbsolutePath]);

          // alert('SMB: parsing '+GCurrentLeftRightRawURL+', Result='+Obj);

          if (Obj != undefined )
          {
            $('#SMB_url').jqxInput('val', 'smb://' + Obj.server); // Obj.prefix
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }
          else
          {
            $('#SMB_url').jqxInput('val', 'smb://');
            $('#inptPassword').jqxPasswordInput('val', '' );
          }

          $("#SMBBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#SMBBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm($("#SMB_url"), AssignURLPath,
                                              GLeftOrRight,
                                              $("#inptInternetFolder"),
                                              'smb://');
                     });
             });
      }
      else if (ProtocolName=='Google Drive')
      {          
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );   
          if (Obj != undefined )
          {
            if (Obj.server=='')
               Obj.server='Google Drive'; // default container
            $('#Container').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
       }
      else if (LBaseProtocolName=='GDriveAlike')
      {
          if (GCurrentLeftRightRawURL=='')
          {
             GCurrentLeftRightRawURL = 'ext://'+ProtocolName;
             // alert('defaulted URL to '+GCurrentLeftRightRawURL);
          }

          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );
          if (Obj != undefined )
          {
            $('#Container').jqxInput('val', ProtocolName); // set invisible container field to Protocol Name
            // alert('2nd: setting container to '+ProtocolName+', result='+$('#Container').jqxInput('val'));
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
      }
      else if (LBaseProtocolName=='GDriveAlikeWithContainer')
      {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );
          if (Obj != undefined )
          {
            if (Obj.server=='')
               Obj.server='please choose bucket or container'; // default container
            $('#Container').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder);
          }
      }
       else if ( LBaseProtocolName == 'SSH' )
       {
          $("#FTPBrowseButton").jqxButton({ theme: 'energyblue' });
          $('#FTPBrowseButton').click(
             function ()
             {
               ApplyInternetSettings();
               PostProfileEditor("***BROWSEDUMMY***", "Browse",
                     function()
                     {
                        InitDirTreeSelectForm($("#SSH_url"), AssignURLPath,
                                              GLeftOrRight,
                                              $("#inptInternetFolder"),
                                              'sftp://');
                     });
             });

          if (!GisSyncoveryWindows)
          {
             $("#cbrecursive_listing").css({"display":"none"});
             $("#recursive_listing_label").css({"display":"none"});
          }

          $("#btnSSH_Security_Advanced_SSH").jqxButton({ theme: 'energyblue' });
          $("#btnSSH_Security_Advanced_SSH").on('click', MakeAdvancedSSHDialog );

          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL,GIntProtAbsolutePath] );
          if (Obj != undefined )
          {                                               // Obj.prefix
            $('#SSH_url').jqxInput('val', 'sftp://' + Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }

          EnableDisableSSHControls(); // from synappglobals
       }
       else if ( LBaseProtocolName == 'Amazon S3' )
       {

          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );  
          if (Obj != undefined )
          {
            $('#AmazonS3_bucket').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }

       }   
       else if ( LBaseProtocolName == 'WebDAV' )
       {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );
          // alert('WebDAV: parsing '+GCurrentLeftRightRawURL+', Result='+Obj);
          if (Obj != undefined )
          {
            $('#WebDAV_url').jqxInput('val', Obj.prefix + Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }
      }
      else if ( LBaseProtocolName == 'Azure' )
      {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );   
          if (Obj != undefined )
          {
            $('#Azure_container').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }

      }
      else if ( LBaseProtocolName == 'Sharepoint' )
      {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );
          if (Obj != undefined )
          {
            $('#Sharepoint_domain').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }

      }
      else if ( LBaseProtocolName == 'RSync' )
      {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );   
          if (Obj != undefined )
          {
            $('#Rsync_url').jqxInput('val', 'rsync://' + Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }
      }
      else if ( LBaseProtocolName == 'Glacier' )
      {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );   
          if (Obj != undefined )
          {
            $('#Glacier_Vault').jqxInput('val', Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }
      }
      else if ( LBaseProtocolName == 'HTTP' )
      {
          var Obj = GetJSONObject( 'parseftpurl', [GCurrentLeftRightRawURL] );
          if (Obj != undefined )
          {
            $('#HTTP_url').jqxInput('val',  Obj.prefix+ Obj.server);
            $('#inptInternetFolder').jqxInput('val', Obj.folder );
          }
      }

   if ((($("#cbrecursive_listing")).length) &&
       ((GProtocolName=="Rackspace") ||
        (GProtocolName=="Hubic") ||
        (GProtocolName=="SugarSync") ||
        (GProtocolName=="MediaFire") ||
        (GProtocolName=="Mega") ||
        (GProtocolName=="MTP") ||
        (GProtocolName=="EMail")))
   {
       $("#cbrecursive_listing").css({"display":"none"});
       $("#recursive_listing_label").css({"display":"none"});
   }

   // alert('End of OnProtocolComboItem');
   }
   catch (err)
   {
      alert(err.message + ' in function OnProtocolComboItem. Stack: ' + err.stack);
   }
}

function ApplyInternetSettings(ignoreerrors)
{
   var ContainerEmptyError = false;

   GProtocolName=$("#jqxProtocolCombo").jqxDropDownList('val');

   if (GLeftOrRight == "left")
   {
      //in synapp_profile_editor_form
      GLeftProtocolName = GProtocolName;
      GLeftStoredPath = StoragePathFromControls(GProtocolName,ignoreerrors);
      if (GLeftStoredPath==undefined)
         ContainerEmptyError=true;
      else
         GCurrentLeftRightEdit.jqxInput('val', GLeftStoredPath );
   }
   else if (GLeftOrRight == "right")
   {
      //in synapp_profile_editor_form
      GRightProtocolName = GProtocolName;
      GRightStoredPath = StoragePathFromControls(GProtocolName,ignoreerrors);
      if (GRightStoredPath==undefined)
         ContainerEmptyError=true;
      else
         GCurrentLeftRightEdit.jqxInput('val', GRightStoredPath );
   }

   if (GProtocolName!='SMB')
   {
     var theTimeoutControl = $('#adv_timeout');
     if (theTimeoutControl.length)
        GIPTimeout = theTimeoutControl.jqxFormattedInput('val');

     var theRetriesControl = $('#adv_retries');
     if (theRetriesControl.length)
        GIPRetries = theRetriesControl.jqxFormattedInput('val');
   }

   ControlValuesToRegistryList(GCurrentInternetProtocolSetRegistryList,GetBaseProtocolName(GProtocolName));
   ControlValuesToRegistryList(GCurrentInternetProtocolSetRegistryList,"*");

   GCurrentInternetProtocolSetRegistryList[indexOfListChanged].ListChanged = true;

   if (GLeftOrRight == "adddest")
   {
      GAddDestProtocolName = $("#jqxProtocolCombo").jqxDropDownList('val');
      GProtocolName = GAddDestProtocolName;
      GAddDestStoredPath = StoragePathFromControls(GProtocolName,ignoreerrors);
      if (GAddDestStoredPath==undefined)
         ContainerEmptyError=true;
      else
      {
         RegistryListToObject(GInternetProtocolSetADDDESTRegistryList,GAddDestFTPSettings,GetBaseProtocolName(GProtocolName));
         // alert("After RegistryListToObject: "+ JSON.stringify(GAddDestFTPSettings));
         ApplyAddDestInternetSettings();
      }
   }

   return !ContainerEmptyError;
}

function InitProtocolSettingsForm(ProfileName, InternetProtocolSetRegistryList, LeftOrRight, ProtocolName, LeftRightEdit, LeftRightRawURL)
{
    GCurrentInternetProtocolSetRegistryList = InternetProtocolSetRegistryList; 
    GSelectedProfileName = ProfileName;  
    GLeftOrRight = LeftOrRight;
    GProtocolName = ProtocolName;
    GCurrentLeftRightEdit = LeftRightEdit;
    GReplaceCharactersOKClicked = false;

    var LUpdatedURL = LeftRightEdit.jqxInput('val');
    if (LUpdatedURL=='')
       LUpdatedURL = LeftRightRawURL;

    LeftRightRawURL = LUpdatedURL;
    GCurrentLeftRightRawURL = LUpdatedURL;

    $("#ProtocolSettingsForm_div").html( ProtocolSettingsFormHTML );   
	   ///Internet Protocol SettingsDlg
    $("#jqxwInternetProtSettingsDlg").jqxWindow({ maxWidth: GInternetProtSettingsDialogWidth, maxHeight: GInternetProtSettingsDialogHeight, height: GInternetProtSettingsDialogHeight,  
        width: GInternetProtSettingsDialogWidth,  theme: 'energyblue',  autoOpen: false,  isModal: true,  animationType: 'slide', closeButtonAction: 'close' });



          $('#jqxwInternetProtSettingsDlg').on('close', function (event) { 
             GInternetProtDlgOpen=false;

             $('#jqxwInternetProtSettingsDlg').jqxWindow('destroy');
             $('#jqxProfileEditorForm').jqxWindow('focus');
          }); 

            $('#Cancel_btn3').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
  
            $('#Cancel_btn3').click(function () {

               $('#jqxwInternetProtSettingsDlg').jqxWindow('close');
            });

// Protocols combo

            var ProtocolComboSource;
	    if (GisSyncoveryWindows) 
	       ProtocolComboSource= ['FTP', 'SSH', 'WebDAV', 'Amazon S3', 'HTTP', 'Azure', 'Glacier', 'Box', 'Google Drive', 
                                     'Google Cloud Storage', 'DropBoxV2', 'Rackspace', 'OneDrvNew', 'OneDrive for Business', 'Sharepoint', 
                                     'Graph', 'SugarSync', 'MediaFire', 'B2','Hubic', 'PCloud'];
	    else
	       ProtocolComboSource= ['FTP', 'SSH', 'SMB', 'WebDAV', 'Amazon S3', 'HTTP', 'Azure', 'Glacier', 'Box', 'Google Drive', 
                                     'Google Cloud Storage', 'DropBoxV2', 'Rackspace', 'OneDrvNew', 'OneDrive for Business', 'Sharepoint', 
                                     'Graph', 'SugarSync', 'MediaFire', 'B2','Hubic', 'PCloud'];
            
            // Create a jqxDropDownList
            $("#jqxProtocolCombo").jqxDropDownList({ source: ProtocolComboSource, selectedIndex: 0, width: '250', height: '25px'});

            $("#jqxProtocolCombo").find('input').attr('readonly', 'readonly'); 

            $('#jqxProtocolCombo').on('select', function (event) {
                    var args = event.args;
                    if (args != undefined)
                    {
                        var item = event.args.item;

                        if (  item != null  )
                        {
                           OnProtocolComboItem( GSelectedProfileName, GCurrentInternetProtocolSetRegistryList, item.label );
                        }

                    }
            });

      $('#OK_btn3').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

      $('#OK_btn3').click(
      function ()
      {
         if (ApplyInternetSettings())
            $('#jqxwInternetProtSettingsDlg').jqxWindow('close');
         GInternetProtDlgOpen=false;
      });

      $("#jqxwInternetProtSettingsDlg").jqxWindow('open')

      var LCurrentProtoVal = $("#jqxProtocolCombo").jqxDropDownList('val');

      if (LCurrentProtoVal == GProtocolName)
         OnProtocolComboItem( GSelectedProfileName, GCurrentInternetProtocolSetRegistryList, GProtocolName );
      else
         $("#jqxProtocolCombo").jqxDropDownList( 'val', GProtocolName ); // to cause on('select',...) event

      $('#jqxwInternetProtSettingsDlg').jqxWindow('focus');
      GInternetProtDlgOpen=true;
}
