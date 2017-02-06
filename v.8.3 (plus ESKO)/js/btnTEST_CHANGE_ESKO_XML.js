//=== abap.Page1.subMain.subHeaderInfo.btnTEST_READ_LOADED_ESKO_XML.js::click - (JavaScript, client) ===
//=== v.8.3 Dec 27, 2016 ===
var oDiag = commons.getDiag();
commons.setDiagOuts(oDiag);
oDiag.Debug = true;

var oMasterCopy = MasterCopy.newItem();
var fMode = "TEST";
var oEskoInput = ESKOManager.MasterCopyToEskoInput(oMasterCopy, fMode);
for (var i=0; i<oEskoInput.length; i++) {
	var sMsg = "{" + "GS1Element:" + oEskoInput[i].GS1Element + "," + "TextValue:" + oEskoInput[i].TextValue + "}";
	commons.addToProgress(oDiag, sMsg, false);
}

ESKOManager.buildEskoXML_OUT(oDiag, oEskoInput);


