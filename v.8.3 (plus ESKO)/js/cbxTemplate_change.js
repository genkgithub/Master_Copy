=== abap.Page1.subMain.subNFT[0].subNFTheader.subTop.cbxTemplate::change - (JavaScript, client) === 
//=== v.8.2 July 2, 2015 ===
// xfa.event.newText - use it to access selected value 
var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
var sOut;
var oCbxNFTT = xfa.resolveNode(m_root.value + ".Page1.subMain.subNFT_SOLD.subNFTheader.subTop.cbxTemplate");

var sSelectedItem = xfa.event.newText; 
var sEventChange = xfa.event.change; 
var sBoundItemValue = oCbxNFTT.boundItem(sSelectedItem);

/* xfa.host.messageBox("sSelectedItem =" + sSelectedItem +
					", sEventChange =" + sEventChange +
					", sBoundItemValue=" + sBoundItemValue
, "", 3);
*/

var sSelectedID = commons.getIDfromCbxSelection(oCbxNFTT , "ID-DESC");
m_SELECTED_TEMPLATE_ID.value = sSelectedID;
// xfa.host.messageBox("sSelectedID=" + sSelectedID, "", 3);

var oTemplate = NFTTemplate.newItem();
NFTTemplateManager.buildFromXML(sSelectedID, oTemplate);
//xfa.host.messageBox("oTemplate.getItemCount()=" + oTemplate.getItemCount() +
//					"oTemplate.getAsString()=" + oTemplate.getAsString(),"",3);
oOutput2.rawValue = oTemplate.getAsString();

