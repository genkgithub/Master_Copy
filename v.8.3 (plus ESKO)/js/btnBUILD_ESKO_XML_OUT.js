//=== abap.Page1.subMain.subHeaderInfo.btnBUILD_ESKO_XML_OUT.js::click - (JavaScript, client) ===
//=== v.8.3 Dec 31, 2016 ===
var oDiag = commons.getDiag();
commons.setDiagOuts(oDiag);
oDiag.Debug = true;

var oEskoInput = ESKOManager.MasterCopyToEskoInput(null, "TEST", oDiag);

oDiag.Output2.rawValue = oDiag.Output2.rawValue + "\r\n" + 
	"ESKO_INPUT:" + ESKOManager.EskoItemToString(oEskoInput);

ESKOManager.buildEskoXML_OUT(oDiag, oEskoInput);

