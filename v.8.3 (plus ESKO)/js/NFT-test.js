//=== TESTing if NFTSection: v.7.0 Feb 24, 2015 ===
// populate NFTSection object: header, items
// then show on form
// NO NEED to load MAP and data XML !!!
var oFormSection, oDataSection, oNFTI;

var iRowCount = xfa.resolveNode("abap.Page1.subMain.subUnitTest.txtRowCount").rawValue;

oDataSection = NFTSection.newItem();
oDataSection.setSectionID("3.1");
oDataSection.setLblFormat("3.1");
oDataSection.setSrvSize ("(100 g)");
oDataSection.setFooterRO ("Not a significant source of saturates, trans, cholesterol, " + 
"sodium, fibre, sugars, vitamin A, vitamin C, calcium or iron.");
oDataSection.setFooterRW("EN, "Not a significant source of saturates, trans, cholesterol, " + 
"sodium, fibre, sugars, vitamin A, vitamin C, calcium or iron.");
oDataSection.setFooterRW("FR, "Source négligeable de saturés, trans, cholestérol, " + 
"sodium, fibres, sucres, vitamine A, vitamine C, calcium et fer.");

for (var iRow=0; iRow<iRowCount ; iRow++) {
	oNFTI = NFTItem.newItem();
	oNFTI.setPosNr		(iRow);	
	oNFTI.setNutrInt	("Nutrient-" + iRow);	
	oNFTI.setSpecId		("Nutrient-" + iRow);	
	oNFTI.setNutrText	("Nutrient-" + iRow);		
	oNFTI.setFlgShowItem	("X");		
	
	oNFTI.setSoldAdult	(iRow * 10);		
	oNFTI.setSoldChild	(iRow * 5);		
	oNFTI.setPrepAdult	(iRow * 10+1);		
	oNFTI.setPrepChild	(iRow * 5+1);		
	
	oTemp = {val: "100", dec: "0", unit: "MG", unitTxt: "Milligram"};
	oNFTI.setNv_set("STD_CALC", oTemp); 
	oTemp = {val: "150", dec: "1", unit: "KG", unitTxt: "Kilogram"};
	oNFTI.setNv_set("STD_DECL", oTemp); 

	oNFTI.setFlgInitialDecl   	("X"); 
	oNFTI.setSoldAdult  		(0);    
	oNFTI.setSoldChild  		(0);    
	oNFTI.setPrepAdult  		(0);    
	oNFTI.setPrepChild  		(0);    
	
	oDataSection.setItem(iRow, oNFTI);
	
}

//xfa.host.messageBox("oMasterCopy.getSections()=" + oMasterCopy.getSections(), "",3);
//xfa.host.messageBox("oMasterCopy.getSections()=" + oMasterCopy.getSections().length, "",3);

//=== ProductIdentity -> form ===
//xfa.host.messageBox("oPI=" + commons.getAllPropertiesAndValues(oPI), "", 3);
//xfa.host.messageBox("oPI=" + oPI.getString(), "", 3);

//=== populate section from oDataSection ===
oFormSection = NFTManager.getSection("form1", "Page1", "subMain", "subNFT", -1, "");
NFTManager.populateSection(oFormSection, oDataSection, "subNFTbody", "tblNFTbody", "rowData");

//xfa.host.messageBox("oMasterCopy.sectionCount=" + commons.getPropertyCount(oMasterCopy.getSections()), "", 3);
