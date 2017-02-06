//=== BEGIN: On doc READY: apply template if: data loaded, templates loaded, template selected ===
//=== v.8.2 July 2, 2015 ===
m_root.value = "abap";

var oUnitTestPage = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest");
var oSubProgress = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subProgress");

//xfa.host.messageBox("oUnitTestPage.presence=" + oUnitTestPage.presence + "m_debug.value="+m_debug.value, "",3);
if (m_debug.value == "DEBUG") {
	oUnitTestPage.presence="visible";
	oUnitTestPage.h="152.4mm";
} else {
	oUnitTestPage.presence="hidden";
	//oUnitTestPage.h="0mm";		
}
//oSubProgress.presence = "hidden";

var oTemplateTxt = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtTEMPL")

xfa.host.messageBox("This form is:" + oTemplateTxt.rawValue , "",3);
if (oTemplateTxt.rawValue == "TEMPLATE") {
	//=== This is the TEMPLATE: rename the file and put DATA in the field ===
	var myDoc = event.target;
	//xfa.host.messageBox("BEFORE SAVE. myDoc:" + myDoc.path + ". dirty=" + myDoc.dirty, "",3);
	oTemplateTxt.rawValue = "DATA";
	var sNewFname = "MC_" + getCurrentDateString("-") + "_" + getCurrentTimeString("-") + ".pdf";
	trustedSaveAs(myDoc, "./", sNewFname );
	//xfa.host.messageBox("AFTER SAVE. myDoc:" + myDoc.path + ". dirty=" + myDoc.dirty, "",3);
	
} else {
	//=== This is the a DATA file: continue ===
	//checkApplyTemplate();
}


function checkApplyTemplate() {
	var loadStatus = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue;
	var viewStatus = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtView").rawValue;
	
	var sSelectedID = xfa.resolveNode(m_root.value + ".Page1.subMain.subNFT_PREP.subNFTheader.subTop.cbxTemplate").rawValue;
	
	//=== check load status of data and NFT_TEMPLATES ===
	var fDataLoaded = false, fTemplateLoaded = false;
	if (loadStatus =="load-0" || loadStatus =="load-1") {
		fDataLoaded = true;
	}
	if (xfa.datasets.resolveNode("NFT_TEMPLATES")!=null) {
		fTemplateLoaded = true;
	}
	
	xfa.host.messageBox("loadStatus=" + loadStatus + ",viewStatus=" + viewStatus + ",sSelectedID=" + sSelectedID +
		",fTemplateLoaded=" + fTemplateLoaded
		,"",3);	
	
	var oDiag = commons.getDiag();
	if (fDataLoaded && fTemplateLoaded && commons.ifNullEmpty(sSelectedID)!="") {
		//=== Build selected template and Re-apply it to loaded NFT data ===
		var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
		var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
		var oProgress = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subProgress.txtProgress");
		oDiag.Output1 = oOutput1;
		oDiag.Output2 = oOutput2;
		oDiag.Progress = oProgress;
		
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
	
		m_SELECTED_TEMPLATE_ID.value = m_APPLIED_TEMPLATE_ID.value;
		
		//=== for PREP ===
		sSOLDPREP = "PREP";
		var oFormSection = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + sSOLDPREP, -1, ""); 
		if (oFormSection.presence=="visible") {
			NFTTemplateManager.applyTemplate(oTemplate, oFormSection, sTableSub, sTable, sRow, sSOLDPREP, oDiag);
			xfa.resolveNode(m_root.value + ".Page1.subMain.subNFT_PREP.subNFTheader.subTop.cbxTemplate").rawValue = oTemplate.getDescr();
			oOutput2.rawValue = oOutput2.rawValue + "\r\n" + oDiag.Log;
		}
		commons.addToProgress(oDiag, "NFT template applied.");
	
	} else {
		var sMsg = "";
		if (fDataLoaded && (!fTemplateLoaded || commons.ifNullEmpty(sSelectedID)=="")) {
			sMsg = "Please load NFT templates and apply selected template to NFT.";	
			commons.addToProgress(oDiag, sMsg);
			xfa.host.messageBox(sMsg, "",3);	
		}
	}		
}

//===========
//var oAbapNode = xfa.datasets.resolveNode("abap"); 
//xfa.host.messageBox("oAbapNode =" + oAbapNode, "",3);	
//===========



