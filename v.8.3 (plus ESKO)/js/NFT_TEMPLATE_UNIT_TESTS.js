=== abap.Page1.subMain.subUnitTest.subNFTTemplates.btnXMLfileToDatasets::click - (JavaScript, client) ===

var DOMroot;
var oLog = {Msg:""};
var oMapperOut = {Msg:""};

DOMroot = m_DOMroot.value;					//=== abap
var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
var sOut;

var oDiag = commons.getDiag();
oDiag.Output1 = oOutput1;
oDiag.Output2 = oOutput2;
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
		xfa.host.messageBox("The NFT_TEMPLATES node found in the XML.", "",3);	
		oDiag.Output1.rawValue = "Root:" + oTemplRoot.name + ", # of child nodes:" + oTemplRoot.nodes.length;
	}
	xfa.host.messageBox("Data loaded from the template XML.", "",3);
} else {
	xfa.host.messageBox("This is not valid XML.", "",3);
}	



=== abap.Page1.subMain.subUnitTest.subNFTTemplates.btnXMLtoCbx::click - (JavaScript, client) ===

var DOMroot;
var oLog = {Msg:""};
var oMapperOut = {Msg:""};

DOMroot = m_DOMroot.value;					//=== abap
var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
var sOut;

var oDiag = commons.getDiag();
oDiag.Output1 = oOutput1;
oDiag.Output2 = oOutput2;
oDiag.LogErrorInNote = false;
// AbapNodeReplaced: false,
//	ViewState: "", 
// XmlTypeOK: true
// AllVatShowEmpty: false

//=== check datasets.NFT_TEMPLATES exists, if not - load here ===
var fNeedLoad = false;
var oTemplRoot = xfa.datasets.resolveNode("NFT_TEMPLATES"); 
if (oTemplRoot==null) fNeedLoad = true;

if (fNeedLoad) {
	NFTTemplateManager.loadFromXML("", "NFT_TEMPLATES.xml", oDiag);
	if (oDiag.XmlTypeOK) {
		var oTemplRoot = xfa.datasets.resolveNode("NFT_TEMPLATES"); 
		if (oTemplRoot==null) {
			xfa.host.messageBox("The NFT_TEMPLATES node not found in the XML.", "",3);
		}
	} else {
		xfa.host.messageBox("This is not valid XML.", "",3);
	}	
}
xfa.host.messageBox("The NFT_TEMPLATES node found in the XML. Data loaded from the template XML.", "",3);	
oDiag.Output1.rawValue = "Root:" + oTemplRoot.name + ", # of child nodes:" + oTemplRoot.nodes.length;

//=== build list of templates ===
var oTemplateList = new Object();
oDiag.Output2.rawValue = NFTTemplateManager.makeSelectListFromXML(oTemplateList);

//=== load in to cbx ===
var oCbxNFTT = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subNFTTemplates.cbxTemplate");

//oCbxNFTT.commitOnSelChange = true;

commons.loadCbxFromDict(oCbxNFTT, oTemplateList, "ID-DESC");
//var sListItems = "===============";
//for(var index=0;index<oCbxNFTT.nodes.length;index++) {
//	sListItems = sListItems + "\r\n" + oCbxNFTT.nodes.item(index).value; 
//}
//oDiag.Output2.rawValue = oDiag.Output2.rawValue + sListItems;

xfa.host.messageBox("Completed.", "",3);	


=== abap.Page1.subMain.subUnitTest.subNFTTemplates.cbxTemplate::change - (JavaScript, client) ===
// xfa.event.newText - use it to access selected value 
var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
var sOut;
var oCbxNFTT = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subNFTTemplates.cbxTemplate");
var sSelectedItem = xfa.event.newText; 
var sEventChange = xfa.event.change; 
var sBoundItemValue = oCbxNFTT.boundItem(sSelectedItem);

xfa.host.messageBox("sSelectedItem =" + sSelectedItem +
					", sEventChange =" + sEventChange +
					", sBoundItemValue=" + sBoundItemValue
, "", 3);

var sSelectedID = commons.getIDfromCbxSelection(oCbxNFTT , "ID-DESC");
xfa.host.messageBox("sSelectedID=" + sSelectedID, "", 3);

var oTemplate = NFTTemplate.newItem();
NFTTemplateManager.buildFromXML(sSelectedID, oTemplate);
xfa.host.messageBox("oTemplate.getItemCount()=" + oTemplate.getItemCount() +
					"oTemplate.getAsString()=" + oTemplate.getAsString(),"",3);
oOutput2.rawValue = oTemplate.getAsString();


=== abap.Page1.subMain.subUnitTest.subNFTTemplates.btnBuildTemplate::click - (JavaScript, client) ===

var DOMroot;
var oLog = {Msg:""};
var oMapperOut = {Msg:""};

DOMroot = m_DOMroot.value;					//=== abap
var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
var sOut;

var oDiag = commons.getDiag();
oDiag.Output1 = oOutput1;
oDiag.Output2 = oOutput2;
oDiag.LogErrorInNote = false;
// AbapNodeReplaced: false,
//	ViewState: "", 
// XmlTypeOK: true
// AllVatShowEmpty: false
var oTemplate = NFTTemplate.newItem();
NFTTemplateManager.buildFromXML(sTemplateID, oTemplate);
xfa.host.messageBox("oTemplate.getItemCount()=" + oTemplate.getItemCount() , "",3);

