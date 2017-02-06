//=== v.8.3 Dec 29, 2016 ===
function getScriptVersion() {
	return "v.8.3 Dec 29, 2016";
}

function getMapVersion(pMapRoot) {
	//=== pMapRoot = m_maproot ===
	var xmlMapRoot = xfa.datasets.resolveNode(pMapRoot);
	//=== get attr: script_version – value of MAP script version ===
	return xmlMapRoot.script_version.value;
}

function getAllProperties(obj) {
	//=== list all fields of object ===
	var properties = "";   
	for (property in obj) {
		properties += "\n" + property;
	}
	return "\n{" + properties + "}"; 
} 

function getAllPropertiesAndValues(obj, pfNewLine) {
	//=== list all fields of object with values ===
	var properties = "";   
	for (property in obj) {
		if (pfNewLine) {
			properties += "\n";
		} else {
			if (properties!="") properties+= ",";
		}
		properties += property + ":" + obj[property];
	}
	return "\n{" + properties + "}"; 
} 

function getPropertyCount(obj) {
	//=== list all fields of object ===
	var iCount = 0;   
	for (property in obj) {
		iCount += 1;
	}
	return iCount; 
}

function RLTrim(pString){
	var str = new String(pString);
	return str.replace(/(^\s*)|(\s*$)/g,"");
} 

function ifNullEmpty(pString){
	if (pString==null) {
		return "";
	} else {
		return pString;
	}
} 


function getClickedRow(pEvent, pFieldName) {
	//=== For a control (button) in a table returns the row number based on ======
	//    event.fileName property and the button name
	//============================================================================
	 
//	var sMsg = "event.target:" + event.target + ", event.source:" + event.source + ", \r\n event.fileName:" + event.fileName;
//	xfa.host.messageBox(sMsg,"",3);
	
	var controlFullName = pEvent.fileName;
	//=== inside this full name is: ":rowData[2]:" -- for row #2 ===
	var i1=-1, i2=-1;
	var iRow = 0;
	
	var sPtrn = ":" + pFieldName + "[";
	i1 = controlFullName.indexOf(sPtrn);
	if (i1>=0) {
		i2 = controlFullName.indexOf("]:",i1);
	}
	if (i1>=0 && i2>i1) {
		//=== now retrieve row number ===
		i1 = i1 + sPtrn.length;
		var sTmp = controlFullName.substring(i1, i2);
		iRow = parseInt(sTmp,10);
	} else {
		iRow = -1;
	}
	return iRow;
}
function addStringWithNL(psInput, psAdd) {
	//=== Add psAdd to psInput with CRLF is input not empty ===
	if (ifNullEmpty(psInput)=="") 
		return psAdd; 
	else
		return psInput + "\r\n" + psAdd; 
}

function getDiag() {
	/* Diag = Object {Progress:field, Output1: field, Output2: field, LogErrorInNote: bool, AbapNodeReplaced:bool, 
		ViewState:string, XmlTypeOK:bool, Log: string}
	*/
	var oDiag = 
	{
		Progress: null, Output1: null, Output2: null, LogErrorInNote :false, AbapNodeReplaced: false,
		ViewState: "", XmlTypeOK: true, AllVatShowEmpty: false, Log: "",
		Debug: false, ProgressActive: true,
		UserAction: ""
	};
	return oDiag;
}

function setDiagOuts(poDiag) {
	/* Diag = Object {Progress:field, Output1: field, Output2: field, LogErrorInNote: bool, AbapNodeReplaced:bool, 
		ViewState:string, XmlTypeOK:bool, Log: string}
	*/
	poDiag.Output1 = null;
	poDiag.Output2 = null;
	poDiag.LogErrorInNote = false;
	if (xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.chkLogInNotes").rawValue == "0") {
		poDiag.LogErrorInNote = false;
	}
	var oOutput1 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[0]");	
	var oOutput2 = xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.subTestOutput.txtOutput[1]");
	var oProgress = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subProgress.txtProgress");
	poDiag.Output1 = oOutput1;
	poDiag.Output2 = oOutput2;
	poDiag.Progress = oProgress;
}

function addToProgress(poDiag, psMsg, pfWithMsgBox) {
	if (!poDiag) return;
	if (poDiag.ProgressActive) {
		if (poDiag.Progress.parent.presence != "visible") poDiag.Progress.parent.presence = "visible";
		if (ifNullEmpty(poDiag.Progress)=="") 
			poDiag.Progress.rawValue = psMsg; 
		else
			poDiag.Progress.rawValue = poDiag.Progress.rawValue + "\r\n" + psMsg; 
	}
	//=== pfWithMsgBox: true=show MsgBox, false=show MsgBox if Debug=true
	if (pfWithMsgBox || this.Debug) {
		xfa.host.messageBox(psMsg, "",3);
	}
}

function loadCbxFromDict(pCbx, pDict, pMode) {
	//=== load cbx from Dictionary<key, value> ===
	//var oCbxTemplate = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subCommands.cbxTemplate");
	// pMode = "DESC": cbx = only values
	// pMode = "ID-DESC": cbx = DISPLAY:value, EXPORT:ID
	//
	pCbx.clearItems();
	for (var key in pDict) {
		if (pMode=="DESC") {
			pCbx.addItem(pDict[key]);
		} else if (pMode=="ID-DESC") {
			pCbx.addItem(pDict[key], key);
		}
	}
}

function getIDfromCbxSelection(pCbx, pMode) {
	//=== Parse ID from selected item in the cbx ===
	// pMode = "DESC": cbx = only values
	// pMode = "ID-DESC": cbx = ID-value
	// Must be called on CHANGE event  of the cbx
	var sSelectedItem = xfa.event.newText; 
	var sEventChange = xfa.event.change; 
	//var sBoundItemValue = pCbx.boundItem(sSelectedItem);
	if (pMode=="DESC") {
		return xfa.event.newText;
	} else if (pMode=="ID-DESC") {
		return pCbx.boundItem(sSelectedItem);
	}
}

function tryStringAsIntegerWithUOM(pValueWithUOM) {
	//============================================================================
	// Input: pValueWithUOM = value [+ " " + UOM]
	//        value = nnnnn.nnnn
	// Description:
	//  If value has decimal part = 0, return as whole number, otherwise return as is
	//  Keep the UOM part intact
	//============================================================================
	var aParts = pValueWithUOM.split(" ");
	if (aParts.length==2) {
		return tryStringAsInteger(aParts[0]) + " " + aParts[1];
	} else {
		return tryStringAsInteger(aParts[0]);
	}
}

function tryStringAsInteger(pValue) {
	//=== IF input string pValue is a whole number (has decimal as 0), return without any decimals ===
	//    ELSE: return as is
	//=== Remove anything that isn't a digit, decimal point, or minus sign (-):
	var sTmp = pValue.replace(/[^\d\.\-]/g, "");
	//=== Locate decimal point and if 0s after it - discard ===
	var iPointLoc = sTmp.indexOf("."); 
	var sDec = sTmp.substring(iPointLoc+1);
	if (parseInt(sDec,10)==0) {
		return sTmp.substring(0, iPointLoc);
	} else {
		return pValue;
	}
}

//=== TODO: need better handling - if attachment already exists - add text to end ===
function writeToTxtAttachment(pMyDoc, pFileName, pText) {
	//var myDoc = event.target;
	//pMyDoc.createDataObject(pFileName, pText);
	pMyDoc.createDataObject({cName: pFileName, cValue: pText});
	//see:
	//http://help.adobe.com/livedocs/acrobat_sdk/9.1/Acrobat9_1_HTMLHelp/wwhelp/wwhimpl/js/html/wwhelp.htm?href=JS_Dev_AcrobatForms.76.11.html&accessible=true
	
}

function writeToTxtAttachmentUTF8(pMyDoc, pFileName, pText) {
	//var myDoc = event.target;
	//pMyDoc.createDataObject(pFileName, pText);
	pMyDoc.createDataObject({cName: pFileName, cValue: "DUMMY"});
	//see:
	//http://help.adobe.com/livedocs/acrobat_sdk/9.1/Acrobat9_1_HTMLHelp/wwhelp/wwhimpl/js/html/wwhelp.htm?href=JS_Dev_AcrobatForms.76.11.html&accessible=true
	//http://help.adobe.com/livedocs/acrobat_sdk/9.1/Acrobat9_1_HTMLHelp/wwhelp/wwhimpl/common/html/wwhelp.htm?context=Acrobat9_HTMLHelp&file=JS_API_AcroJS.88.475.html
	try {
		var vStream = util.streamFromString(pText, "utf-8");
		// Now "update" the attachment with this file stream
		pMyDoc.setDataObjectContents({cName: pFileName, oStream: vStream});
	} catch (err) {
		xfa.host.messageBox("Problem with setDataObjectContents:" + err.message,"",3);
	}		
}

function getScriptInfoBlock() {
	//=== Returns empty object {MapVersion, ScriptVersion, SoldFile, PrepFile} ===
	var scriptInfo = new Object();
	scriptInfo = {MapVersion: "", ScriptVersion: "", SoldFile: "", PrepFile: ""};
	return scriptInfo;
}

function formatScriptInfoBlock(scriptInfo, pMode) {
	//===================================================================
	//	pMode=TXT: returns  {MapVersion, ScriptVersion, SoldFile, PrepFile} formatted for text box 
	//	pMode=JSON: returns  {MapVersion, ScriptVersion, SoldFile, PrepFile} formatted for eval
	//===================================================================
	if (pMode == "TXT") {
		return "MapVersion:    " + scriptInfo.MapVersion + "," + "\r\n" + 
			"ScriptVersion: " + scriptInfo.ScriptVersion + "," + "\r\n" +
			"SoldFile:      " + scriptInfo.SoldFile + "," + "\r\n" +
			"PrepFile:      " + scriptInfo.PrepFile;
	} else if (pMode == "JSON") {
		return "{" +
			"MapVersion:" + "\"" + scriptInfo.MapVersion + "\"" + "," +
			"ScriptVersion:" + "'" + scriptInfo.ScriptVersion + "'" + "," + 
			"SoldFile:" + "'" + scriptInfo.SoldFile + "'"  + "," +
			"PrepFile:" + "'" + scriptInfo.PrepFile + "'" + 
			"}";
	}
}
function unformatScriptInfoBlock(blockText) {
	var scriptBlock = eval('(' + blockText + ')');
	return scriptBlock;
}

function formatNode(pNode, pWithNodesLen) {
	var sMsg = pNode.name;
		
	//=== Must check for value - it exist not for all nodes ===
	if ('value' in pNode)
		sMsg = sMsg + ":" + pNode.value;
	if (pWithNodesLen && pNode.nodes!=null) {
		if (pNode.nodes.length!=null)
			sMsg = sMsg + ", nodes.length:" + pNode.nodes.length;
	}
	sMsg = sMsg + ", typeof=" + (typeof pNode);
	return "[" + sMsg + "]";
}


// var vEvent = event;
// var sMsg = "event.target:" + event.target + ", event.source:" + event.source + ", \r\n event.fileName:" + event.fileName;
// xfa.host.messageBox(sMsg,"",3);
// 
// var controlFullName = vEvent.fileName;
// //=== inside this full name is: ":rowData[2]:" -- for row #2 ===
// var i1=-1, i2=-1;
// var iRow = 0;
// i1 = controlFullName.indexOf(":rowData[");
// if (i1>=0) {
// 	i2 = controlFullName.indexOf("]:",i1);
// }
// if (i1>=0 && i2>i1) {
// 	//=== now retrieve row number ===
// 	i1 = i1 + ":rowData[".length;
// 	var sTmp = controlFullName.substring(i1, i2);
// 	sMsg = "Row #: " + parseInt(sTmp);
// } else {
// 	sMsg = "Cannot locate row."
// }
// xfa.host.messageBox(sMsg,"",3);
// 
// 


//=== HOW TOs ===
//=== HOW TO: Set color, font to fields ===
// 	oHeaderRow.resolveNode("nutrInt.border.fill.color").value = oHeaderRow.resolveNode("Cell5.border.fill.color").value;
// 	oHeaderRow.resolveNode("rcdType.border.fill.color").value = oHeaderRow.resolveNode("Cell5.border.fill.color").value;
// 	
// 	oHeaderRow.resolveNode("nutrInt.font.fill.color").value = oHeaderRow.resolveNode("Cell5.font.fill.color").value;
// 	oHeaderRow.resolveNode("nutrInt.font").typeface = oHeaderRow.resolveNode("Cell5.font").typeface;
// 	oHeaderRow.resolveNode("nutrInt.font").size = oHeaderRow.resolveNode("Cell5.font").size;
// 	oHeaderRow.resolveNode("nutrInt.font").weight = oHeaderRow.resolveNode("Cell5.font").weight;
		
//=== HOW TO: Fill CBX with items ===
//see:
//http://help.adobe.com/en_US/livecycle/10.0/DesignerScriptingRef/WS92d06802c76abadb-3e14850712a151d270d-7ffa.html#WS92d06802c76abadb-3e14850712a151d270d-74ca
//https://acrobatusers.com/tutorials/js_list_combo_livecycle

//=== HOW TO: show/hide columns in table  ===
// 1) do this for the whole table:
// 	var oTableNode = pFormSection[psTable];
// 	if (m_debug.value=="DEBUG") {
// 		oTableNode.columnWidths="18.151mm 20.756mm 39.285mm 45.209mm 47.436mm 40.027mm 44.103mm";
// 	} else {
// 		//=== Make visible columns wider for non-DEBUG ===
// 		oTableNode.columnWidths="0mm 0mm 51.5mm 55mm 55mm 50mm 50mm";
// 	}
// 
// 	// 1) do this for the each row:
// 	if (m_debug.value=="DEBUG") {
// 		pFormRow.Gs1ElementID.presence="visible";
// 		pFormRow.SubKey.presence="visible";
// 	} else {
// 		pFormRow.Gs1ElementID.presence="hidden";
// 		pFormRow.SubKey.presence="hidden";
// 	}
// 	//=== Show/hide the whole row if data empty and this row is one of ALL_VAT set ===
// 	if (poDiag.AllVatShowEmpty==false && (pDataRow.getSubKey() !=="" && (commons.ifNullEmpty(pDataRow.getData_EN())==""))) {
// 		pFormRow.presence="hidden";
// 	}
		
		
//=== HOW TO: Fill CBX with items ===
/*
NFT column widths
20.37
40.75 
21.43 
25.93 
16.669 
18.12 
18.12 
18.12
*/

/*
xfa.event.change
PartList.boundItem(xfa.event.newText)

xfa.event.newText  = to get the display value of the selected item.
oList.boundItem(pDisplayValue) returns the associated export value.

=== walking thru items: ===
var bFound = false; 
for(var index=0;index<oList.nodes.length;index++) {
	if(oList.nodes.item(index).value == cEntry) {
		bFound = true; break;
	}
}

*/



//=== END: commons ===
