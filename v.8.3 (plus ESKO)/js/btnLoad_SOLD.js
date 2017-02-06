//=== abap.Page1.subMain.subHeaderInfo.btnLoad_SOLD::click - (JavaScript, client) ===
//=== v.8.3 Dec 31, 2016 ===
call_loadMasterCopy();
ESKOManager.loadEskoXML(oDiag);

function call_loadMasterCopy() {
	var myDoc = event.target;
	if (m_debug.value == "DEBUG") {
		xfa.host.messageBox("myDoc.dirty=" + myDoc.dirty, "",3);	
	}

	var oDiag = commons.getDiag();
	commons.setDiagOuts(oDiag);
	oDiag.Debug = (m_debug.value == "DEBUG");
	
	var oMasterCopy = MasterCopy.newItem();
	var oMapper = MapperWrap.newItem();
	var oCommonLog = {Msg:""};

	var fLoadStage = "1";
	var loadStageTxt = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad");
	if (loadStageTxt.rawValue=="" || loadStageTxt.rawValue==null) {
		fLoadStage = "1";
	} else {
		fLoadStage = "2";
	}
	var sMsg = "Executing data load:" + fLoadStage;
	commons.addToProgress(oDiag, sMsg);
//	xfa.host.messageBox(sMsg,"",3);

	var specTypeAttrs = MCManager.getSpecAttrsByType(null);
	MCManager.loadMasterCopy(fLoadStage, "SOLD", oDiag, oMapper, oMasterCopy, oCommonLog, specTypeAttrs);

	if (oDiag.UserAction == "CANCEL") {
		xfa.host.messageBox("User selected CANCEL - data XML was not loaded.", "", 3);
		return;
	}
	var msg = "";
	var iPos = oDiag.UserAction.indexOf("INCOMPATIBLE");
	if (iPos==0) {
		var sWhat = oDiag.UserAction.substring(12);	//=== take the rest of string
		msg = "You're trying to re-load a " + sWhat + " spec data into the form. " + 
			"Re-loading is possible only with compatible spec. types (FOOD-FOOD or NONFOOD-NONFOOD";
		xfa.host.messageBox(msg, "", 3);
		return;
	}
	if (specTypeAttrs.SpecUse!="SOLD" || oDiag.XmlTypeOK==false) {
		xfa.host.messageBox("The XML you selected is not a valid AS SOLD file. The spec.type = " + specTypeAttrs.SpecType + ". Please locate correct XML data file - AS SOLD.", "", 3);
		return;
	}
	
	//=== save dataload status ===
	var sLoadStatus = "";
	if (oDiag.AbapNodeReplaced==false) {
		sLoadStatus = "load-0";
	} else {
		sLoadStatus = "load-1";
	}
	xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue = sLoadStatus;
	xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtView").rawValue = oDiag.ViewState;
	
	var oNFTSection = NFTSection.newItem();
	var oFormSectionNFT;
	
	/***********************************************************************************
	* check if this is food or non-food using table of spec attrs created in MCManager
	* The spec type/text are located in:
	*  { m_root/INGREDIENT_LABEL/RMSLS_XML_INGR_LISTS_WUI/DATA_SOURCE_TYPE = ...}
	*
	* for non-food: 	skip NFTManager.loadNFT() and disable buttons PREP and NFT templates
	* for food: 		execute NFTManager.loadNFT() and enable buttons PREP and NFT templates
	*
	***********************************************************************************/
	
	var oBtnPrep = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subCommands.btnLoad_PREP");	
	var oBtnLoadNFTT = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subCommands.btnXMLfileToDatasets");	
	var oLblSpecType = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subHdrAll.tblHdrAll.Row1.lblSpecType");	
	var oTxtNonFoodMsg = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subCommands.txtNonFoodMsg");

	oLblSpecType.rawValue = specTypeAttrs.SpecType;				//specTypeTxt;
	oLblSpecType.assist.toolTip.value = specTypeAttrs.SpecText;
	
	if (specTypeAttrs.SpecFood=="FOOD") {
		NFTManager.loadNFT(oDiag, oMapper, oNFTSection, oFormSectionNFT, oCommonLog, "SOLD", (sLoadStatus=="load-0"));
		oBtnPrep.presence = "visible";
		oBtnLoadNFTT.presence = "visible";
		oTxtNonFoodMsg.presence = "hidden";
	} else if (specTypeAttrs.SpecFood=="NFOOD") {
		oBtnPrep.presence = "hidden";
		oBtnLoadNFTT.presence = "hidden";
		oTxtNonFoodMsg.presence = "visible";		
		oTxtNonFoodMsg.rawValue = "Non-Food: NFT templates and AS PREP disabled.";
	} else if (specTypeAttrs.SpecFood==null) {
		xfa.host.messageBox(oCommonLog.Msg,"",3);
	}
	
	var oUnitTestPage = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest");
	if (m_debug.value == "DEBUG") {
		oUnitTestPage.presence="visible";
		oUnitTestPage.h="152.4mm";
	} else {
		oUnitTestPage.presence="hidden";
		//oUnitTestPage.h="0mm";		
	}
	var myDoc = event.target;
	commons.writeToTxtAttachment(myDoc, "log-SOLD.txt", oDiag.Progress.rawValue + "\r\n" +  oCommonLog.Msg);
	
	//=== Get empty object {MapVersion, ScriptVersion, SoldFile, PrepFile} ===
	var scriptInfoBlock = commons.getScriptInfoBlock();
	if (m_ScriptInfoBlock.value=="") {
		scriptInfoBlock.MapVersion = commons.getMapVersion(m_maproot.value);
		scriptInfoBlock.ScriptVersion = commons.getScriptVersion();
		scriptInfoBlock.SoldFile = specTypeAttrs.SpecId;
		scriptInfoBlock.PrepFile = "";
		
	} else {
		//=== script block was loaded and saved before - now need to unformat ===
		scriptInfoBlock = commons.unformatScriptInfoBlock(m_ScriptInfoBlock.value);
		//=== and load only spec ID, the rest - leave as is ===
		scriptInfoBlock.SoldFile = specTypeAttrs.SpecId;
	}	
	//=== need to store scriptblockinfo m_var - between executions of btn SOLD and PREP ===
	m_ScriptInfoBlock.value = commons.formatScriptInfoBlock(scriptInfoBlock, "JSON");
	
	//=== and show it in text block at botton of form ===
	var oTxtInfo = xfa.resolveNode(m_root.value + ".Page1.subMain.subInfo.txtInfo");
	oTxtInfo.rawValue = commons.formatScriptInfoBlock(scriptInfoBlock, "TXT");

}

