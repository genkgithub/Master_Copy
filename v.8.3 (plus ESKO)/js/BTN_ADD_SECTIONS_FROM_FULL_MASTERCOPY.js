/*=== 
	1) Add a MasterCopy object. Populate with 3 MasterCopySection sections each with rows.
	2) Iterate through items of MasterCopy, for each:
		- create new form section
		- populate form section from current object
	3) Create, fill HeaderInformation in MasterCopy and copy to form
===*/

var oMasterCopy, oFormSection, oDataSection, oMCI;
oMasterCopy = MasterCopy.newItem();
//=== HeaderInformation ===
var oPI = HeaderInformation.newItem();
var sPI = "({UPC:'123456',prodName:'Ice Cream',userRA:'Suzarra Khan',userED:'Shannaz Akbar',prodDate:'2014-09-01'})";
oPI.setAllJSON(sPI);
oMasterCopy.setHeaderInformation(oPI);

var iSectionCount = 3, iRowCount = 4;
iSectionCount = xfa.resolveNode("dataroot.Page1.subMain.subUnitTest.txtSectionCount").rawValue;
iRowCount  = xfa.resolveNode("dataroot.Page1.subMain.subUnitTest.txtRowCount").rawValue;

for (var iSection=0; iSection<iSectionCount ; iSection++) {
	oDataSection = MasterCopySection.newItem();
	oDataSection.setSectionID("TEST-" + iSection);
	for (var iRow=0; iRow<iRowCount ; iRow++) {
		oMCI = MasterCopyItem.newItem();
		oMCI.setTagGS1("TEST-" + iSection + "-" + iRow + " -QQ");
		oMCI.setData_EN("MASTER-" + iSection + "-" + iRow + " -EN");
		oMCI.setData_FR("MASTER-" + iSection + "-" + iRow + " -FR");
		oMCI.setTxtNote("Test Notes-" + iSection + "-" + iRow + "");	
		oDataSection.setItem(iRow, oMCI);
	}
	oMasterCopy.setSection(oDataSection);
}
//xfa.host.messageBox("oMasterCopy.getSections()=" + oMasterCopy.getSections(), "",3);
//xfa.host.messageBox("oMasterCopy.getSections()=" + oMasterCopy.getSections().length, "",3);

//=== HeaderInformation -> form ===
//xfa.host.messageBox("oPI=" + commons.getAllPropertiesAndValues(oPI), "", 3);
//xfa.host.messageBox("oPI=" + oPI.getString(), "", 3);

MCManager.populatePI("dataroot", "Page1", "subMain", "subProdIdentity", oPI); 

/*for (var iSection=0; iSection<3; iSection++) {
	oFormSection = MCManager.addSection("dataroot", "Page1", "subMain", "subSection");
	var oDS = oMasterCopy.getSection("TEST-" + iSection);
	MCManager.populateSection(oFormSection, oDS, "tblSection", "rowData");
}
*/
//=== Add n-1 sections ===
var iSectionCount = commons.getPropertyCount(oMasterCopy.getSections());
for (var iSection=0; iSection<iSectionCount-1; iSection++) {
	oFormSection = MCManager.addSection("dataroot", "Page1", "subMain", "subSection");
}
//=== popoulate sections from oMasterCopy ===
for (var iSection=0; iSection<iSectionCount; iSection++) {
	oFormSection = MCManager.getSection("dataroot", "Page1", "subMain", "subSection", iSection, "");
	var oDS = oMasterCopy.getSection("TEST-" + iSection);
	MCManager.populateSection(oFormSection, oDS, "tblSection", "rowData");
}

//xfa.host.messageBox("oMasterCopy.sectionCount=" + commons.getPropertyCount(oMasterCopy.getSections()), "", 3);

