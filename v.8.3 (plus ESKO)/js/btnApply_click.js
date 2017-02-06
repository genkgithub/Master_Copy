=== abap.Page1.subMain.subNFT[0].subNFTheader.subTop.btnApply::click - (JavaScript, client) ===
//=== BEGIN: ApplyTemplate ===
//=== v.8.2 July 2, 2015 ===
var loadStatus = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue;
var viewStatus = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtView").rawValue;
var myDoc = event.target;

//=== check load status of data and NFT_TEMPLATES ===
var fDataOK = false, fTemplateOK = false;
if (loadStatus =="load-0" || loadStatus =="load-1") {
//if ((loadStatus =="load-0" || loadStatus =="load-1") && (myDoc.dirty == false || m_debug.value=="DEBUG")) {
	fDataOK = true;
}
if (xfa.datasets.resolveNode("NFT_TEMPLATES")!=null) {
	fTemplateOK = true;
}

if (fDataOK && fTemplateOK) {
	var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
	var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
	var oProgress = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subProgress.txtProgress");
	var oDiag = commons.getDiag();
	oDiag.Output1 = oOutput1;
	oDiag.Output2 = oOutput2;
	oDiag.Progress = oProgress;
	
	var sSelectedID = m_SELECTED_TEMPLATE_ID.value;
	
	var oTemplate = NFTTemplate.newItem();
	NFTTemplateManager.buildFromXML(sSelectedID, oTemplate);
	oOutput2.rawValue = oTemplate.getAsString();
	
	//=== for SOLD ===
	var sTableSub = "subNFTbody",
		sTable = "tblNFTbody",
		sRow = "rowData";
	var sSOLDPREP = "SOLD";
	var oFormSection = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + sSOLDPREP, -1, ""); 
	NFTTemplateManager.applyTemplate(oTemplate, oFormSection, sTableSub, sTable, sRow, sSOLDPREP, oDiag);
	oOutput2.rawValue = oOutput2.rawValue + "\r\n" + oDiag.Log;

	m_APPLIED_TEMPLATE_ID.value = m_SELECTED_TEMPLATE_ID.value;
	
	//=== for PREP ===
	sSOLDPREP = "PREP";
	var oFormSection = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + sSOLDPREP, -1, ""); 
	if (oFormSection.presence=="visible") {
		NFTTemplateManager.applyTemplate(oTemplate, oFormSection, sTableSub, sTable, sRow, sSOLDPREP, oDiag);
		xfa.resolveNode(m_root.value + ".Page1.subMain.subNFT_PREP.subNFTheader.subTop.cbxTemplate").rawValue = oTemplate.getDescr();
		oOutput2.rawValue = oOutput2.rawValue + "\r\n" + oDiag.Log;
	}
	xfa.host.messageBox("Selected template [" + 
		oTemplate.getTemplateID() + "-" + oTemplate.getDescr() + 
		"] applied - please review NFT.", "", 3);
	if (m_debug.value == "DEBUG") {
		var myDoc = event.target;
		commons.writeToTxtAttachment(myDoc, "log.txt", oOutput2.rawValue);
	}
		
} else {
	var sMsg = "";
	if (!fDataOK) {
		sMsg = "Please make sure that MAIN data file is loaded. ";	
	}
	if (!fTemplateOK) {
		sMsg = sMsg + "Please make sure that NFT TEMPLATES are loaded. ";
	}
	xfa.host.messageBox(sMsg + "Then you can apply NFT template.", "",3);	
}		
