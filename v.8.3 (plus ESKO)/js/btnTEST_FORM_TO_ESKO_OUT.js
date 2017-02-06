//=== abap.Page1.subMain.subHeaderInfo.btnTEST_FORM_TO_ESKO_OUT.js::click - (JavaScript, client) ===
//=== v.8.3 Jan 2, 2017 ===
var oDiag = commons.getDiag();
commons.setDiagOuts(oDiag);
oDiag.Debug = true;
var myDoc = event.target;
oDiag.ProgressActive = false;
var oEskoInput = ESKOManager.MasterCopyToEskoInput(null, "FORM", oDiag);

oDiag.Output2.rawValue = oDiag.Output2.rawValue + "\r\n" + 
	"ESKO_INPUT:" + ESKOManager.EskoInputObjectToString(oEskoInput);

ESKOManager.buildEskoXML_OUT(oDiag, oEskoInput);

var sRootNodePath = "datasets.ESKO_OUT.artworkContentMessage";
var rootNode =  xfa.resolveNode(sRootNodePath);
var sXML = rootNode.saveXML("pretty");

//<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
/*
while (sXML.indexOf("<html>") != -1) {
	sXML = sXML.replace("<html>", "<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'>");
}
*/
sXML = sXML.replace(/<html>/g, "<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'>");




//commons.writeToTxtAttachment(myDoc, "ESKO_OUT.xml", sXML);
commons.writeToTxtAttachmentUTF8(myDoc, "ESKO_OUT.xml", sXML);
