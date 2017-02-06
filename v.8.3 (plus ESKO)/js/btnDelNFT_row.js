//=== v.8.2 July 2, 2015 ===
//xfa.host.messageBox("DEL button clicked.", "" ,3);
var vEvent = event;

//=== inside this full name is: ":rowData[2]:" -- for row #2 ===
var iRow = commons.getClickedRow(vEvent, "rowData");
if (iRow>=0) {
	sMsg = "Row #: " + iRow;
} else {
	sMsg = "Cannot locate row.";
}
//xfa.host.messageBox(sMsg,"",3);	

//=== see: http://forms.stefcameron.com/2006/11/11/instance-manager-object-reference/
//    and also: http://help.adobe.com/en_US/livecycle/9.0/designerHelp/index.htm?content=000847.html

//0.Locate current section - TODO
//1.Use iRow as pointer where to insert
//2.locate NFT form row
//  - getSectionRow(pSection, psTableSub, psTable, psRow, piRowNumber, ""
//3.Make this row hidden

var pSoldPrep = "SOLD";
var poFormSectionNFT;
if (pSoldPrep=="SOLD") {
	poFormSectionNFT = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + pSoldPrep, -1, "");
} else  {
	poFormSectionNFT = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + pSoldPrep, -1, "");
}
var oThisRow = NFTManager.getSectionRow(poFormSectionNFT, "subNFTbody", "tblNFTbody", "rowData", iRow, "");
oThisRow.presence = "hidden";
oThisRow.rcdType.rawValue = "DEL";
