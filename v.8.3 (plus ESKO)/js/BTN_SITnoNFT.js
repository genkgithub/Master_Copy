/*=== v.7.5 Mar 6, 2015 ===
	1) Add a MasterCopy object. Populate with MasterCopySection sections from <current-root>.MAP_SECTIONS
	2) Iterate through items of MasterCopy, for each:
		- create new form section
		- populate form section from current object
	3) Create, fill HeaderInformation in MasterCopy and copy to form
===*/

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

var fOK = xfa.host.messageBox("Map and data will be loaded. Please select the data file.", "Attention!","2","1");

m_xmlMapSections.value = MapperWrap.loadMapString();
	
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

//=== list nodes in datasets.abap.values.LABELDATA ===                                                       
var sPath = "xfa.datasets.abap.values.LABELDATA";
var sOut = XMLDAO.getNodeList(sPath);
	
xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]").rawValue = sOut;
xfa.host.messageBox("Data loaded from the data XML.", "",3);

//=== reload the mapper with multi-VATs discovered and listed ===
sOut = MapperWrap.buildMapper(DOMroot, m_maproot.value, oMapper, true, -1, -1);
oOutput2.rawValue = sOut;
xfa.host.messageBox("Map reloaded with VAT keys resolved. Now starting to build MasterCopy object.", "",3);

//=== build MasterCopy object ===
MCManager.makeHeaderInfo(oMapper, oHI, oMapperOut);
MCManager.makeMasterCopy(oMapper, oMasterCopy, oMapperOut, oLog, true);
oMasterCopy.setHeaderInformation(oHI);

oOutput2.rawValue = oLog.Msg;
xfa.host.messageBox("MasterCopy object built. View not created." + oLog.Msg, "",3);

var fDataLoaded = commons.RLTrim(xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue);
MCManager.MasterCopyToForm(oMasterCopy, oHI, oMapperOut, fDataLoaded, true);
xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtView").rawValue = "built,loaded";
xfa.host.messageBox("View created.", "",3);
