//=== abap.Page1.subMain.subHeaderInfo.btnLoad_SOLD::click - (JavaScript, client) ===
//=== v.8.3 Dec 27, 2016 ===
var oDiag = commons.getDiag();
commons.setDiagOuts(oDiag);
oDiag.Debug = true;

ESKOManager.loadEskoXML(oDiag);

