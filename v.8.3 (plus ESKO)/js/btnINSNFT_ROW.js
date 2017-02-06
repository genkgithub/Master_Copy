//=== v.8.2 July 2, 2015 ===
//xfa.host.messageBox("INS button clicked.", "" ,3);
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
//2.Create new instance of NFT form row
//  - addSectionRow(pSection, psTableSub, psTable, psRow)
//3.Add this row at end of current section
//4.Move newly added (last) row to current position of insertion.
//5.TODO - Deal with row key
//6.For NFTsection data model - do nothing, i.e. leave it out of sync.
//7.Set a flag (INS, DEL) in the new/deleted row.

var pSoldPrep = "SOLD";
var poFormSectionNFT;
if (pSoldPrep=="SOLD") {
	poFormSectionNFT = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + pSoldPrep, -1, "");
} else  {
	poFormSectionNFT = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + pSoldPrep, -1, "");
}
var oNewRow = NFTManager.insertSectionRow(poFormSectionNFT, "subNFTbody", "tblNFTbody", "rowData", iRow+1);
oNewRow.nutrText.access = "open";
oNewRow.nutrMsr.access = "open";
oNewRow.nutrPDV.access = "open";
oNewRow.rcdType.rawValue = "INS";
//=== show/hide columns in DEBUG ===
if (m_debug.value=="DEBUG") {
	oNewRow.nutrInt.presence="visible";
	oNewRow.rcdType.presence="visible";
} else {
	//=== Make visible columns wider for non-DEBUG ===
	oNewRow.nutrInt.presence="hidden";
	oNewRow.rcdType.presence="hidden";
}

