//=== v.8.2 July 2, 2015 ===

var DOMroot;
var oLog = {Msg:""};
var oMapperOut = {Msg:""};

DOMroot = m_DOMroot.value;					//=== abap
var sOut;

var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
var oProgress = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subProgress.txtProgress");
var oDiag = commons.getDiag();
oDiag.Output1 = oOutput1;
oDiag.Output2 = oOutput2;
oDiag.Progress = oProgress;

oDiag.LogErrorInNote = false;
// AbapNodeReplaced: false,
//	ViewState: "", 
// XmlTypeOK: true
// AllVatShowEmpty: false

//loadFromXML("", "NFT_TEMPLATES.xml", oDiag);
NFTTemplateManager.loadFromXML("", "NFT_TEMPLATES.xml", oDiag);
if (oDiag.XmlTypeOK) {
	var oTemplRoot = xfa.datasets.resolveNode("NFT_TEMPLATES"); 
	if (oTemplRoot==null) {
		xfa.host.messageBox("The NFT_TEMPLATES node not found in the XML.", "",3);
	} else {
		//xfa.host.messageBox("The NFT_TEMPLATES node found in the XML.", "",3);	
		oDiag.Output1.rawValue = "Root:" + oTemplRoot.name + ", # of child nodes:" + oTemplRoot.nodes.length;
	}
	//xfa.host.messageBox("Data loaded from the template XML.", "",3);
	
	//=== build list of templates ===
	var oTemplateList = new Object();
	oDiag.Output2.rawValue = NFTTemplateManager.makeSelectListFromXML(oTemplateList);

	//=== load to cbx ===
	var oCbxNFTT = xfa.resolveNode(m_root.value + ".Page1.subMain.subNFT_SOLD.subNFTheader.subTop.cbxTemplate");

	commons.loadCbxFromDict(oCbxNFTT, oTemplateList, "ID-DESC");
	xfa.host.messageBox("Completed.", "",3);	
	
} else {
	xfa.host.messageBox("This is not valid XML.", "",3);
}	
