/*=== v.7.0 Feb 24, 2015 ===
	1) Add a MasterCopy object. Populate with MasterCopySection sections from <current-root>.MAP_SECTIONS
	2) Iterate through items of MasterCopy, for each:
		- create new form section
		- populate form section from current object
	3) Create, fill HeaderInformation in MasterCopy and copy to form
===*/

var sXMLloadedFrom, sDOMroot;
sXMLloadedFrom = m_XMLloadedFrom.value;		//=== STRING or FILE
sDOMroot = m_DOMroot.value;					//=== abap

var oMasterCopy, oFormSection, oDataSection, oMCI, oMapper;
oMasterCopy = MasterCopy.newItem();

var oMapper = MapperWrap.newItem();
sOut = MapperWrap.buildMapper(m_maproot.value, oMapper);
xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.txtOutput[1]").rawValue = sOut;

//=== retrieve this from data after loading map: HeaderInformation ===
var oHI = HeaderInformation.newItem();
//var sHI = "({UPC:'123456',prodName:'Ice Cream',userRA:'Suzarra Khan',userED:'Shannaz Akbar',prodDate:'2014-09-01'})";
var sHI = "({UPC:'',prodName:'',userRA:'',userED:'',prodDate:'2014-09-01'})";
oHI.setAllJSON(sHI);

var oMapItemHdr, dataValueHdr, oLogHdr = {Msg:""};

oMapItemHdr = oMapper.getItem(MapperWrap.getItemKey("HEADER_INFO", "UPC", "_NONE_"));
dataValueHdr = XMLDAO.getDataXmlNodeValueExt(oMapItemHdr, sXMLloadedFrom, sDOMroot, oLogHdr);
if (dataValueHdr == null) {
	oHI.setUPC("ERROR: Mapping not found: " + oLog.Msg);
} else {
	oHI.setUPC(dataValueHdr);
}
oMapItemHdr = oMapper.getItem(MapperWrap.getItemKey("HEADER_INFO", "PRODUCT_NAME", "_NONE_"));
dataValueHdr = XMLDAO.getDataXmlNodeValueExt(oMapItemHdr, sXMLloadedFrom, sDOMroot, oLogHdr);
if (dataValueHdr == null) {
	oHI.setProdName("ERROR: Mapping not found: " + oLog.Msg);
} else {
	oHI.setProdName(dataValueHdr);
}

oMasterCopy.setHeaderInformation(oHI);

for (var iItemIndx=0; iItemIndx<oMapper.getItemCount(); iItemIndx++) {

	var oMapItem = oMapper.getItemByIndx(iItemIndx);

	xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.txtOutput[1]").rawValue = "item[" + iItemIndx + 
		"]=" + oMapItem.getAsString() ;
	      
	if (oMapItem.getMapUsage()!="REG") continue;
		
	oDataSection = oMasterCopy.getSection(oMapItem.getSectionID());
	if (oDataSection==null) {
	    oDataSection = MasterCopySection.newItem();
		oDataSection.setSectionID(oMapItem.getSectionID());
		oDataSection.setSectionName(oMapItem.getSectionName());
		oDataSection.setSeqN(oMapItem.getSectionSeqN() - 1);	//== SeqN in XML are 1-based
		oMasterCopy.setSection(oDataSection);
	}
    
    //=== All fields must be set ===
    oMCI = MasterCopyItem.newItem();
	oMCI.setGs1ElementID(oMapItem.getGs1ElementID());
	
    if (oMapItem.getLblEquiv() !=null && oMapItem.getLblEquiv()!="")
		oMCI.setLblEquiv(oMapItem.getLblEquiv());
	else
		oMCI.setLblEquiv(oMapItem.getGs1ElementID());


	/*  ================================================================
	*	1.	subroot =  _USER_ENTRY_ => no mapping AND field is editable
	*	2.	subroot, path1 != empty and (mapping found) => {editable = FALSE}
	*	3.	subroot, path1 != empty and !(mapping found) => {editable = FALSE and field value = ERROR: mapping not found}
	*   ================================================================
	*/
	var dataValue, oLog;
	oLog = {Msg:""};
	if (oMapItem.getXmlSubroot() == "_USER_ENTRY_") {
		dataValue = "User Entry";
		oMCI.setData_EN(dataValue);		
		oMCI.setEditable_EN(true);		
		oMCI.setMappedSAP(false);
	} else {
		dataValue = XMLDAO.getDataXmlNodeValueExt(oMapItem, sXMLloadedFrom, sDOMroot, oLog);
		if (dataValue == null) {
			oMCI.setData_EN("ERROR: Mapping not found: " + oLog.Msg);
		} else {
			oMCI.setData_EN(dataValue);
		}
		oMCI.setEditable_EN(false);				
		oMCI.setMappedSAP(true);
	}
	oMCI.setData_FR("FR-" + iItemIndx);		//=== to be later populated from data XML or left for manual editing
	oMCI.setTxtNote("Notes-" + iItemIndx);	//=== to be later populated from data XML or left for manual editing

	oMCI.setEditable_FR(true);

	var iItemCount = oDataSection.getItemCount();
	oDataSection.setItem(iItemCount, oMCI);	
	//xfa.host.messageBox("itemSectioNode:" + i + ", oDataSection=" + oDataSection.getAsString(), "",3);
	
} 

//=== Test-2: Populate sections in the data-based order from the previously loaded oMasterCopy ===
//    based on section SeqN

//=== Add n-1 form sections - so that we FormSections.count = MasterCopy.Sections.count ===
var iSectionCount = commons.getPropertyCount(oMasterCopy.getSections());
xfa.host.messageBox("oMasterCopy.sectionCount=" + iSectionCount, "", 3);

for (var iSection=0; iSection<iSectionCount-1; iSection++) {
	oFormSection = MCManager.addSection(m_root.value, "Page1", "subMain", "subSection");
}
//=== populate sections from oMasterCopy ===
for (var iSection=0; iSection<iSectionCount; iSection++) {
	oFormSection = MCManager.getSection(m_root.value, "Page1", "subMain", "subSection", iSection, "");
	var oDS = oMasterCopy.getSectionBySeqN(iSection);		//=== SeqN values in MasterCopy object are 0-based	
//	xfa.host.messageBox("iSection=" + iSection + ",oDS = " + oDS, "", 3);
	MCManager.populateSection(oFormSection, oDS, "tblSection", "rowData");
}

//=== HeaderInformation -> form ===
MCManager.populatePI(m_root.value, "Page1", "subMain", "subHeaderInfo", oHI); 
