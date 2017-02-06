// === Read MAP_SECTION elements and display contents of all fields to OUTPUT ===
// see: http://forms.stefcameron.com/2009/06/01/creating-and-loading-data-nodes/
// http://www.adobepress.com/articles/article.asp?p=1021020&seqNum=4

var xmlSections = xfa.datasets.resolveNode("dataroot.MAP_SECTIONS");

var numberOfNodes = xmlSections.nodes.length;  
xfa.host.messageBox("numberOfNodes =" + numberOfNodes , "",3);

/*for (var i=0; i < numberOfNodes ; i++) {
    var item = xmlSections.nodes.item(i).nodes.item(2);
    cbxItems.addItem(item.value); // this can change according to what you retrieve in your xml
} 
*/     
var itemSectioNodes = xmlSections.resolveNodes("MAP_SECTION[*]");
xfa.host.messageBox("itemSectioNodes.length = " + itemSectioNodes.length, "",3);

var sOut = "";
for (var i=0; i < itemSectioNodes.length; i++) {
    var itemSection = xmlSections.resolveNode("MAP_SECTION[" + i + "]");
    var itemID = itemSection.resolveNode("ID");
    var itemCatCode = itemSection.resolveNode("GS1_CAT_CODE");    
    var itemCatName = itemSection.resolveNode("GS1_CAT_NAME");    
    var itemCatNameSeqN = itemSection.resolveNode("GS1_CAT_SEQN");    
    var itemGs1Element = itemSection.resolveNode("GS1_ELEMENT");    
    var itemSortOrder = itemSection.resolveNode("SORT_ORDER");    
    var itemIpcElement = itemSection.resolveNode("IPC_ELEMENT");    
    var itemLblEquiv = itemSection.resolveNode("LBL_EQUIV");    
    var itemSapObject = itemSection.resolveNode("SAP_OBJECT");    
    var itemVatKey = itemSection.resolveNode("VAT_KEY");    
    var itemCharKey = itemSection.resolveNode("CHAR_KEY");    
    var itemDataType = itemSection.resolveNode("DATA_TYPE");    
    var itemRepeatElement = itemSection.resolveNode("REPEAT_ELEMENT");    
    var itemXmlTagKey = itemSection.resolveNode("XML_TAG_KEY");    
    var itemXmlTagData = itemSection.resolveNode("XML_TAG_DATA");    
    var itemXmlPath = itemSection.resolveNode("XML_PATH");    

    if (i>0) sOut = sOut + "\r\n";
    sOut = sOut + "=== Section [" + i + "] ==="  + "\r\n";
    sOut = sOut + "ID: " + itemID.value + ",";
	sOut = sOut + "GS1_CAT_CODE: " + 	itemCatCode.value+ ",";	 
	sOut = sOut + "GS1_CAT_NAME: " + 	itemCatName.value  + ",";	 
	sOut = sOut + "GS1_CAT_SEQN: " + 	itemCatNameSeqN.value  + ",";	 
	sOut = sOut + "GS1_ELEMENT: " + 	itemGs1Element.value	+ ","; 	
	sOut = sOut + "SORT_ORDER: " + 		itemSortOrder.value		+ ","; 	
	sOut = sOut + "IPC_ELEMENT: " + 	itemIpcElement.value	+ ",";	 	
	sOut = sOut + "LBL_EQUIV: " + 		itemLblEquiv.value		+ ","; 	
	sOut = sOut + "SAP_OBJECT: " + 		itemSapObject.value		+ ","; 	
	sOut = sOut + "VAT_KEY: " + 		itemVatKey.value		+ ",";
	sOut = sOut + "IDCHAR_KEY " + 		itemCharKey.value		+ ",";
	sOut = sOut + "DATA_TYPE: " + 		itemDataType.value		+ ","; 	
	sOut = sOut + "REPEAT_ELEMENT: " + 	itemRepeatElement.value	+ ",";  
	sOut = sOut + "XML_TAG_KEY: " + 	itemXmlTagKey.value		+ ","; 		  
	sOut = sOut + "XML_TAG_DATA: " + 	itemXmlTagData.value		+ ","; 		  	
	sOut = sOut + "XML_PATH: " + 		itemXmlPath.value; 	
} 
xfa.resolveNode("dataroot.Page1.subMain.subUnitTest.txtOutput[0]").rawValue = sOut;
xfa.host.messageBox("Completed.", "",3);
