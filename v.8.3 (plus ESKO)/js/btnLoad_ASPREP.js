//=== abap.Page1.subMain.subHeaderInfo.btnLoad_PREP::click - (JavaScript, client) ===
//=== v.8.2 July 2, 2015 ===
call_loadMasterCopy();

function call_loadMasterCopy() {
	var myDoc = event.target;
	if (m_debug.value == "DEBUG") {
		xfa.host.messageBox("myDoc.dirty=" + myDoc.dirty, "",3);	
	}
	var oDiag = new Object();
	oDiag.Output1 = null;
	oDiag.Output2 = null;
	oDiag.LogErrorInNote = false;
	oDiag.AbapNodeReplaced = false;
	oDiag.ViewState = "";
	oDiag.XmlTypeOK = true;
	oDiag.AllVatShowEmpty = false;
	oDiag.UserAction = "";
	
	//m_root.value = "abap";
	if (xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.chkLogInNotes").rawValue == "0") {
		oDiag.LogErrorInNote = false;
	}
	if (xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.chkAllVatShowEmpty").rawValue == "1") {
		oDiag.AllVatShowEmpty = true;
	}		
	
	var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
	var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
	var oProgress = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subProgress.txtProgress");
	oDiag.Output1 = oOutput1;
	oDiag.Output2 = oOutput2;
	oDiag.Progress = oProgress;

	var oMasterCopy = MasterCopy.newItem();
	var oMapper = MapperWrap.newItem();
	var oCommonLog = {Msg:""};

	//=== Make sure form saved after 1st load - do not proceed if not ===
	var loadStatus = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue;
	var viewStatus = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtView").rawValue;

	if ((loadStatus =="load-0" || loadStatus =="load-1") && myDoc.dirty == false) {
		
		var fLoadStage = "2";
		
		var specTypeAttrs = MCManager.getSpecAttrsByType(null);
		MCManager.loadMasterCopy(fLoadStage, "PREP", oDiag, oMapper, oMasterCopy, oCommonLog, specTypeAttrs);
		if (oDiag.UserAction == "CANCEL") {
			xfa.host.messageBox("User selected CANCEL - data XML was not loaded.", "", 3);
			return;
		}
		if (specTypeAttrs.SpecUse!="PREP" || oDiag.XmlTypeOK==false) {
			xfa.host.messageBox("The XML you selected is not a valid AS PREPARED file. The spec.type = " + specTypeAttrs.SpecType + ". Please locate correct XML data file - AS PREPARED.", "", 3);
			return;
		}
		
		//=== get dataload status ===
		var sLoadStatus = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue;
		
		var oNFTSection = NFTSection.newItem();
		var oFormSectionNFT;
		NFTManager.loadNFT(oDiag, oMapper, oNFTSection, oFormSectionNFT, oCommonLog, "PREP", (sLoadStatus=="load-0"));
	
		var oUnitTestPage = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest");
		if (m_debug.value == "DEBUG") {
			oUnitTestPage.presence="visible";
			oUnitTestPage.h="152.4mm";
		} else {
			oUnitTestPage.presence="hidden";
			//oUnitTestPage.h="0mm";		
		}		
		var myDoc = event.target;
		commons.writeToTxtAttachment(myDoc, "log-PREP.txt", oDiag.Progress.rawValue + "\r\n" +  oCommonLog.Msg);
		
		//=== Get empty object {MapVersion, ScriptVersion, SoldFile, PrepFile} ===
		var scriptInfoBlock = commons.getScriptInfoBlock();
		if (m_ScriptInfoBlock.value=="") {
			scriptInfoBlock.MapVersion = commons.getMapVersion(m_maproot.value);
			scriptInfoBlock.ScriptVersion = commons.getScriptVersion();
			scriptInfoBlock.SoldFile = "";
			scriptInfoBlock.PrepFile = specTypeAttrs.SpecId;
			xfa.host.messageBox("WRONG calling sequence: m_ScriptInfoBlock EMPTY for AS PREP fiel load: must be non-empty.", "",3);	
						
		} else {
			//=== script block was loaded and saved before - now need to unformat ===
			scriptInfoBlock = commons.unformatScriptInfoBlock(m_ScriptInfoBlock.value);
			//=== and load only spec ID, the rest - leave as is ===
			scriptInfoBlock.PrepFile = specTypeAttrs.SpecId;
		}	
		//=== need to store scriptblockinfo m_var - between executions of btn SOLD and PREP ===
		m_ScriptInfoBlock.value = commons.formatScriptInfoBlock(scriptInfoBlock, "JSON");
		
		//=== and show it in text block at botton of form ===
		var oTxtInfo = xfa.resolveNode(m_root.value + ".Page1.subMain.subInfo.txtInfo");
		oTxtInfo.rawValue = commons.formatScriptInfoBlock(scriptInfoBlock, "TXT");
		
	} else {
		xfa.host.messageBox("Please make sure that MAIN data file (left button) is loaded and the form is saved. Then you can load the AS PREP file.", "",3);	
	}
}
