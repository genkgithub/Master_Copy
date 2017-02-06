//=== v.8.0 Mar 20, 2015 ===

load_MasterCopy();

function load_MasterCopy() {

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


	var XMLloadedFrom, DOMroot;
	var oLog = {Msg:""};
	var oMapperOut = {Msg:""};

	XMLloadedFrom = m_XMLloadedFrom.value;		//=== STRING or FILE
	DOMroot = m_DOMroot.value;					//=== abap
	
	var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
	var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
	var sOut;
	
	var oMasterCopy = MasterCopy.newItem();
	var oMapper = MapperWrap.newItem();
	var oHI = HeaderInformation.newItem();
	
	var mbxChoice = xfa.host.messageBox("The Map and the primary data XML will now be loaded. " + 
		"Please select the primary data XML file. Click YES to continue or NO to cancel.", "Attention!","2","2");
		//=== YES ('3'=No, '4'=Yes) ===
	
	if (mbxChoice=="4") {
		//m_xmlMapSections.value = MapperWrap.loadMapString();
		MapperWrap.loadFromXML("", "MAP.xml", oDiag);
		if (oDiag.XmlTypeOK) {
			var oTemplRoot = xfa.datasets.resolveNode("mastercopy_mapping"); 
			if (oTemplRoot==null) {
				xfa.host.messageBox("The MAP node not found in the MAP.XML.", "",3);
			} else {
				//xfa.host.messageBox("The NFT_TEMPLATES node found in the XML.", "",3);	
				oDiag.Output1.rawValue = "Map loaded. Root:" + oTemplRoot.name + ", # of child nodes:" + oTemplRoot.nodes.length;
			}
			if (m_debug.value == "DEBUG") {
				xfa.host.messageBox("Map loaded from mapping XML.", "",3);
			}			
			
		} else {
			xfa.host.messageBox("The MAP.XML is not a valid mapping XML.", "",3);
			return;
		}	
				
		//=== Read MAP_SECTION elements and display contents of all fields to OUTPUT ===
		sOut = MapperWrap.buildMapper(DOMroot, m_maproot.value, oMapper, false, -1, -1);
		oOutput2.rawValue = sOut;
		
		//=== load data XML into to string ===
		var stmFileData = util.readFileIntoStream();
		
		// Convert data into a String
		var strTextData = util.stringFromStream(stmFileData);
	
		xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]").rawValue = strTextData;
		m_loadedDataXml.value = strTextData;
	
		var oAbapNode = xfa.datasets.resolveNode("abap"); 
		if (oAbapNode==null) {
			//=== save dataload status ===
			xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue = "load-0";
		} else {
			xfa.datasets.nodes.remove(oAbapNode);
			//=== save dataload status ===
			xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue = "load-1";
		}
		xfa.datasets.loadXML(strTextData, false, false);                                   
		xfa.datasets.saveXML();                                                       
	
		xfa.host.messageBox("Data loaded from the data XML.", "",3);
		
		//=== reload the mapper with multi-VATs discovered and listed ===
		sOut = MapperWrap.buildMapper(DOMroot, m_maproot.value, oMapper, true, -1, -1);
		oOutput2.rawValue = sOut;
		xfa.host.messageBox("Map reloaded with VAT keys resolved. Now starting to build MasterCopy object.", "",3);
		
	/*	//=== build MasterCopy object ===
		MCManager.makeHeaderInfo(oMapper, oHI, oMapperOut);
		MCManager.makeMasterCopy(oMapper, oMasterCopy, oMapperOut, oLog, true);
		oMasterCopy.setHeaderInformation(oHI);
	
		oOutput2.rawValue = oLog.Msg;
		if (m_debug=="DEBUG") {
			xfa.host.messageBox("Completed step: built MasterCopy object with all sections and header.","",3);
		}
		var fDataLoaded = commons.RLTrim(xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subStatus.txtDataLoad").rawValue);
		MCManager.MasterCopyToForm(oMasterCopy, oHI, oMapperOut, fDataLoaded, true);
		xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subStatus.txtView").rawValue = "built,loaded";
		if (m_debug=="DEBUG") {
			xfa.host.messageBox("View created (main sections only - no NFT).", "",3);
		}
	*/	
		//=== Create and load NFTSection: ===
		var oNFTSection = NFTSection.newItem();
		
		NFTManager.makeNFTSection(oMapper, oNFTSection, oMapperOut);
		if (m_debug=="DEBUG")
			xfa.host.messageBox("Completed step: loaded oNFTSection object from data XML.","",3);
	
		if (oMapperOut.Msg != "") {
			xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.txtOutput[1]").rawValue = oMapperOut.Msg;
			console.println(oMapperOut.Msg);
		}
		//=== populate section from oDataSection ===
		oFormSection = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_SOLD", -1, "");
		NFTManager.populateSection(oFormSection, oNFTSection, "subNFTbody", "tblNFTbody", "rowData");
		xfa.host.messageBox("Completed step: built view populated with data. All steps completed","",3);
		
	} else {
		xfa.host.messageBox("Operation canceled by user.", "",3);	
	}
}