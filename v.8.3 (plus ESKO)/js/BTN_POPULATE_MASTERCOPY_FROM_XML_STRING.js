/*=== v.7.5 Mar 6, 2015 ===
	1) Add a MasterCopy object. Populate with MasterCopySection sections from <current-root>.MAP_SECTIONS
	2) Iterate through items of MasterCopy, for each:
		- create new form section
		- populate form section from current object
	3) Create, fill HeaderInformation in MasterCopy and copy to form
===*/

var sXMLloadedFrom, sDOMroot;
sXMLloadedFrom = m_XMLloadedFrom.value;		//=== STRING or FILE
sDOMroot = m_DOMroot.value;					//=== abap

var oMasterCopy = MasterCopy.newItem();
var oMapper = MapperWrap.newItem();
var oHI = HeaderInformation.newItem();

sOut = MapperWrap.buildMapper(m_maproot.value, oMapper);
xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.txtOutput[1]").rawValue = sOut;
var oMapperOut = {Msg:""};

MCManager.makeHeaderInfo(oMapper, oHI, oMapperOut);
MCManager.makeMasterCopy(oMapper, oMasterCopy, oMapperOut);
oMasterCopy.setHeaderInformation(oHI);

var fDataLoaded = commons.RLTrim(xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtDataLoad").rawValue);
MCManager.MasterCopyToForm(oMasterCopy, oHI, oMapperOut, fDataLoaded);
xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subHeader1.subStatus.txtView").rawValue = "built,loaded";
