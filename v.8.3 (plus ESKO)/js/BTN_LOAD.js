var vLogErrorInNote = true;
if (xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTests_3.chkLogInNotes").rawValue == 0)
	vLogErrorInNote = false;

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

m_xmlMapSections.value = MapperWrap.loadMapString();
	
//=== Read MAP_SECTION elements and display contents of all fields to OUTPUT ===
sOut = MapperWrap.buildMapper(DOMroot, m_maproot.value, oMapper, false, -1, -1);
oOutput2.rawValue = sOut;

var fOK = xfa.host.messageBox("Please select the MAIN data XML file.", "Attention!","2","1");

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

/*================================================
	1) Add a MasterCopy object. Populate with MasterCopySection sections from <current-root>.MAP_SECTIONS
	2) Iterate through items of MasterCopy, for each:
		- create new form section
		- populate form section from current object
	3) Create, fill HeaderInformation in MasterCopy and copy to form
===================================================*/

//=== reload the mapper with multi-VATs discovered and listed ===
sOut = MapperWrap.buildMapper(DOMroot, m_maproot.value, oMapper, true, -1, -1);
oOutput2.rawValue = sOut;
xfa.host.messageBox("Map reloaded with VAT keys resolved. Now starting to build MasterCopy object.", "",3);

var oMasterCopy = MasterCopy.newItem();
var oHI = HeaderInformation.newItem();

var oMapperOut = {Msg:""};
MCManager.makeHeaderInfo(oMapper, oHI, oMapperOut);
MCManager.makeMasterCopy(oMapper, oMasterCopy, oMapperOut, oLog, true);
oMasterCopy.setHeaderInformation(oHI);
if (m_debug=="DEBUG")
	xfa.host.messageBox("Completed step: built MasterCopy object with all sections and header.","",3);

var fDataLoaded = commons.RLTrim(xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue);
MCManager.MasterCopyToForm(oMasterCopy, oHI, oMapperOut, fDataLoaded, vLogErrorInNote);
xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtView").rawValue = "built,loaded";
if (m_debug=="DEBUG")
	xfa.host.messageBox("Completed step: built main sections view populated with data.","",3);

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
oFormSection = NFTManager.getSection("abap", "Page1", "subMain", "subNFT", -1, "");
NFTManager.populateSection(oFormSection, oNFTSection, "subNFTbody", "tblNFTbody", "rowData");

xfa.host.messageBox("Completed step: built view populated with data. All steps completed","",3);



