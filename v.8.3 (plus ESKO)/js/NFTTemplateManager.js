//=== BEGIN: NFTTemplateManager ===
//=== v.8.2 July 2, 2015 ===

function loadFromXML(pTemplatePath, pFileXML, poDiag) {
	/***********************************************************
	* The file is a complete XML of all NFT templates as built by utility from EXCEL file (in EXCEL VB code o via ACCESS)
	* The file is loaded and saved as string in this var without any validation/parsing.
	* Then it's saved in xfa.datasets and becomes part od XML DOM: xfa.datasets.NFT_TEMPLATES
	* Later it is used by makeSelectList() and buildFromXML()
	*
	* Diag = Object {Output1: field, Output2: field, LogErrorInNote: bool, AbapNodeReplaced:bool, ViewState:string, XmlTypeOK:bool}
	***********************************************************/
	
	//=== load data XML into to string, use trusted function (folder scripts) ===
	var strTextData = trustedReadFileToString(pTemplatePath, pFileXML);
	//m_NFTT_XML.value = strTextData;
	if (m_debug.value == "DEBUG") poDiag.Output1.rawValue = strTextData;
	
	/* === check data XML: must contain NFT_TEMPLATES === */
	if (strTextData.indexOf("<NFT_TEMPLATES ") < 0) {
		poDiag.XmlTypeOK=false;
		return;
	}
	xfa.datasets.loadXML(strTextData, false, false);                                   
	xfa.datasets.saveXML();
	if (m_debug.value == "DEBUG") {                                                      
		xfa.host.messageBox("Data loaded from the template XML.", "",3);
	}
}

function makeSelectListFromXML(pTemplateList) {
//===========================================================
// Use xfa.datasets.NFT_TEMPLATES, iterate on 1st level, use HDR node and subnodesID, Descr
// build object as dictionary [ID, Descr]
//===========================================================

	var xmlTemplates = xfa.datasets.resolveNode("NFT_TEMPLATES");
	if (xmlTemplates==null) {
		sOut = "NFT_TEMPLATES not found in XML";
		pTemplateList = null;
		return;
	}
	var numberOfNodes = xmlTemplates.nodes.length;  
//	xfa.host.messageBox("numberOfNodes =" + numberOfNodes , "",3);
	
	var templateNodes = xmlTemplates.resolveNodes("NFT_TEMPLATE[*]");
//	xfa.host.messageBox("templateNodes.length = " + templateNodes.length, "",3);

	var aFldNames = getFldNames("HDR");
	
	var sOut = "";
	for (var i=0; i < templateNodes.length; i++) {
	    var templateNode = xmlTemplates.resolveNode("NFT_TEMPLATE[" + i + "]");
	    var hdrNode = templateNode.resolveNode("HDR");
	    var oFieldMap = MapperWrap.itemFieldsFromXML(hdrNode, aFldNames);
	    
	    if (oFieldMap["TEMPLATE_ID"]==null || oFieldMap["TEMPLATE_ID"]=="_NA") continue;
	    var key, val;
	    key = oFieldMap["TEMPLATE_ID"];
	    val = oFieldMap["TEMPLATE_DESCRIPTION"];
	    pTemplateList[key] = val;
	
	    if (i>0) sOut = sOut + "\r\n";
	    sOut = sOut + "=== Template [" + i + "] ===" + "[" + key + "] = " + val + "\r\n";
	}
	key="ZZZ"; val="Remove template"; i++;
	pTemplateList[key] = val;
	sOut = sOut + "\r\n=== Template [" + i + "] ===" + "[" + key + "] = " + val + "\r\n";
	
	return sOut;
}

function buildFromXML(pTemplateId, pTemplateOut) {
	//================================================================
	// Using XML DOM locate xfa.datasets.NFT_TEMPLATES nodes of type NFT_TEMPLATE where HDR.ID = 'templateId')
	// Build NFTTemplate object - populate fields from current subtree.
	// Iterate by DETS.NUTRIENT nodes of the current subtree.
	// For each build one NFTTemplateItem object and push it into NFTTemplate.items[]
	// Return NFTTemplate objectin the pTemplate OUT parameter.
	// Retrun Template.AsString() if success, "" if failure.
	//================================================================
	
	var xmlTemplates = xfa.datasets.resolveNode("NFT_TEMPLATES");
	if (xmlTemplates==null) {
		pTemplateOut = null;
		return "";
	}
	
	if (pTemplateId=="ZZZ") {
		pTemplateOut.setTemplateID("ZZZ"); 
		pTemplateOut.setDescr("REMOVE TEMPLATE"); 
		//=== leave the rest of pTemplateOut as new() with empty fields;
		return "ZZZ-REMOVE TEMPLATE";
	}
		
	var numberOfNodes = xmlTemplates.nodes.length;  
//	xfa.host.messageBox("numberOfNodes =" + numberOfNodes , "",3);
	
	var templateNodes = xmlTemplates.resolveNodes("NFT_TEMPLATE[*]");
//	xfa.host.messageBox("templateNodes.length = " + templateNodes.length, "",3);

	var aHdrFldNames = getFldNames("HDR");
	var aDetFldNames = getFldNames("DET");
	
	var sOut = "", fFound = false;
	var sErrorLog = "";
	var templateNode, hdrNode;
	for (var i=0; i < templateNodes.length; i++) {
	    templateNode = xmlTemplates.resolveNode("NFT_TEMPLATE[" + i + "]");
	    hdrNode = templateNode.resolveNode("HDR");
	    var idNode = templateNode.resolveNode("HDR.TEMPLATE_ID");
	    if (idNode.value==pTemplateId) {
		    fFound = true;
		    break;
	    }
	} 
	if (!fFound) {
		pTemplateOut = null;
		sOut = "Template " + pTemplateId + " not found in the NFT_TEMPLATES XML";
		return sOut;
	}

	//========================================================================
	// Build NFTTemplate object - populate fields from current subtree.
	// Iterate by DETS.NUTRIENT nodes of the current subtree.
	// For each build one NFTTemplateItem object and push it into NFTTemplate.items[]
	//========================================================================
	
//	pTemplateOut = NFTTemplate.newItem();
    
    //=== Load all values from the subnodes of hdrNode into HashMap for convinience ===
	var oFieldMap = MapperWrap.itemFieldsFromXML(hdrNode, aHdrFldNames);

	//=== Set fields ===
	pTemplateOut.setTemplateID(oFieldMap['TEMPLATE_ID']); 
	pTemplateOut.setDescr(oFieldMap['TEMPLATE_DESCRIPTION']); 
	pTemplateOut.setHeaderMain (oFieldMap['HEADER_MAIN']); 
	
	var oNote;
	oNote = {EN: oFieldMap['HEADER_EN'], FR: oFieldMap['HEADER_FR']};
	pTemplateOut.setHeaderNote('SOLD', oNote); 
	oNote = {EN: oFieldMap['HEADER_EN_PREP'], FR: oFieldMap['HEADER_FR_PREP']};
	pTemplateOut.setHeaderNote('PREP',oNote); 
	oNote = {EN: oFieldMap['FOOTER_EN'], FR: oFieldMap['FOOTER_FR']};
	pTemplateOut.setFooterNote('SOLD',oNote); 
	oNote = {EN: oFieldMap['FOOTER_EN_PREP'], FR: oFieldMap['FOOTER_FR_PREP']};
	pTemplateOut.setFooterNote('PREP',oNote); 
	pTemplateOut.setErrorLog(sErrorLog);

	var oColHdr;
	oColHdr = {QTY: oFieldMap['COLHDR_QTY_SOLD'], PDV: oFieldMap['COLHDR_PDV_SOLD']};
	pTemplateOut.setColHdr('SOLD', oColHdr); 
	oColHdr = {QTY: oFieldMap['COLHDR_QTY_PREP'], PDV: oFieldMap['COLHDR_PDV_PREP']};
	pTemplateOut.setColHdr('PREP', oColHdr); 
	
	var nutrientNodes = templateNode.resolveNodes("NUTRIENTS.NUTRIENT[*]");	
	for (var i=0; i < nutrientNodes.length; i++) {
	    var nutrientNode = nutrientNodes.item(i);
	    //=== Current node is the NUTRIENT node of current the current template ===
	    //=== Load all values from the subnodes of hdrNode into HashMap for convinience ===
		oFieldMap = MapperWrap.itemFieldsFromXML(nutrientNode, aDetFldNames);

		//=== Now build new NFTTemplateItem and add it to the template object ===
		var oTemplateItem = NFTTemplateItem.newItem();
		oTemplateItem.setSpecId(oFieldMap['SPEC_ID']);
		var oData = {qty: oFieldMap['QTY_SOLD'], pdv: oFieldMap['PDV_SOLD'], unit: oFieldMap['UOM_SOLD']};
		oTemplateItem.setFlag_set('SOLD', oData);
		var oData = {qty: oFieldMap['QTY_PREP'], pdv: oFieldMap['PDV_PREP'], unit: oFieldMap['UOM_PREP']};
		oTemplateItem.setFlag_set('PREP', oData);
		
		var iSeqN = parseInt(oFieldMap['SEQ_N'],10);
		pTemplateOut.setItem(iSeqN, oTemplateItem);
	    
	} 
    sOut = sOut + pTemplateOut.getAsString();
	return sOut;
}

function getFldNames(pType) {
/*=====================================================	
* Return keys for the map and matching the columns 
* of the template EXCEL and tags of XML
=======================================================*/
	var aFldNames = new Object();
	if (pType == "HDR") {
		aFldNames = ['TEMPLATE_ID','TEMPLATE_DESCRIPTION',
		'HEADER_EN','HEADER_FR','HEADER_EN_PREP','HEADER_FR_PREP','FOOTER_EN','FOOTER_FR',
		'FOOTER_EN_PREP','FOOTER_FR_PREP','HEADER_MAIN',
		'COLHDR_QTY_SOLD','COLHDR_PDV_SOLD','COLHDR_QTY_PREP','COLHDR_PDV_PREP'];
	} else if (pType == "DET") {
		aFldNames = ['TEMPLATE_ID','SEQ_N','NUTRIENT_NAME','SPEC_ID','QTY_SOLD','PDV_SOLD','UOM_SOLD',
					'QTY_PREP','PDV_PREP','UOM_PREP'];
	} 
	return aFldNames;
}
function applyTemplate(pTemplate, pFormSection, psTableSub, psTable, psRow, pSOLDPREP, poDiag) {
	//================================================================
	// 0. This must be prepared before call 
	//    pFormSection = NFTManager.getSection("abap", "Page1", "subMain", "subNFT", 0, ""); - for SOLD, 1, "" - for PREP
	// Description (Apply selected template): 
	// 1. Using NFTtemplate locate the NFT table (already displayed),
	//    adjust headers and footers, if needed - col.headers.
	// 2. Walk over the NFT table (rows), for each row use SPEC_ID to locate template.item(SPEC)ID) and adjust:
	//    Hide row if not in template, Hide QTY, RDV based on flags, Replace UOM if specified.
	//================================================================
	var sLog = "=== Apply Template Log ===";
	//=== adjust headers and footers, if needed - col.headers. ===
	sLog = sLog + "\r\n" + "Template:" + pTemplate.getDescr() + ", Section:" + pSOLDPREP;
	var sTmp = pTemplate.getHeaderMain();
	var aTmp = sTmp.split("$BREAK");
	if (aTmp.length==1) {
		pFormSection.subNFTheader.subTop.txtMainHeader.rawValue = sTmp;
	} else {
		pFormSection.subNFTheader.subTop.txtMainHeader.rawValue = commons.RLTrim(aTmp[0]) + "\r\n" + commons.RLTrim(aTmp[1]);
	}

	if (pTemplate.getHeaderNote(pSOLDPREP)["EN"] != "")
		pFormSection.subNFTheader.subRWhdr.txtHeader_EN.rawValue = pTemplate.getHeaderNote(pSOLDPREP)["EN"];	
	if (pTemplate.getHeaderNote(pSOLDPREP)["FR"] != "")
		pFormSection.subNFTheader.subRWhdr.txtHeader_FR.rawValue = pTemplate.getHeaderNote(pSOLDPREP)["FR"];	
	if (pTemplate.getFooterNote(pSOLDPREP)["EN"] != "")
		pFormSection.subNFTfooter.txtFooter_EN.rawValue = pTemplate.getFooterNote(pSOLDPREP)["EN"];	
	if (pTemplate.getFooterNote(pSOLDPREP)["FR"] != "")
		pFormSection.subNFTfooter.txtFooter_FR.rawValue = pTemplate.getFooterNote(pSOLDPREP)["FR"];	
		
	var oTableNode = pFormSection[psTableSub][psTable];
	var oColHeaderRow = oTableNode.HeaderRow;

	if (pTemplate.getColHdr(pSOLDPREP)["QTY"] != "")
		oColHeaderRow.txtQtyHdr.rawValue = pTemplate.getColHdr(pSOLDPREP)["QTY"];
	if (pTemplate.getColHdr(pSOLDPREP)["PDV"] != "")
		oColHeaderRow.txtPdvHdr.rawValue = pTemplate.getColHdr(pSOLDPREP)["PDV"];

	//===================================================================
	// Walk over the NFT table (rows), for each row use SPEC_ID 
	// to locate template.item(SPEC_ID) and adjust:
	// - Hide row if not in template, Hide QTY, RDV based on flags, Replace UOM if specified.
	//===================================================================
	var iSectionIdx
	/*if (pSOLDPREP=="SOLD")
		iSectionIdx = 0;
	else
		iSectionIdx = 1;
	*/
	var oFormNFTSection = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + pSOLDPREP, -1, "");
	//var sTableSub = "subNFTbody", sTable = "tblNFTbody", sRow = "rowData";
	
	var iRowCount = NFTManager.getSectionRowCount(pFormSection, psTableSub, psTable, psRow);
	var oRow, oNFTTitem;
	for (var iRow=0; iRow < iRowCount; iRow++) {
		oRow = NFTManager.getSectionRow(pFormSection, psTableSub, psTable, psRow, iRow, "");
		if (pTemplate.getTemplateID()=="ZZZ") {
			oNFTTitem = NFTTemplateItem.newItem();
			oNFTTitem.setSpecId("ZZZ");
			sLog = sLog + "\r\n" + "Row:" + iRow + ", FormRow:" + oRow.rowKey.rawValue;
			sLog = sLog + ", ===> Template ZZZ - REMOVE - No Item required";
		} else {
			oNFTTitem = pTemplate.getItemByKey(oRow.rowKey.rawValue);
			if (oNFTTitem==null) {
				sLog = sLog + "\r\n" + "Row:" + iRow + ", FormRow:" + oRow.rowKey.rawValue;
				sLog = sLog + ", ===> Template Item NOT FOUND";
			} else {
				sLog = sLog + "\r\n" + "Row:" + iRow + ", FormRow:" + oRow.rowKey.rawValue + ", qtyHdn:" + oRow.qtyHdn.rawValue;
				sLog = sLog + ", ===> Template Item:" + oNFTTitem.getAsString();
			}
		}
		var oRowDiag = {Log:""};
		applyNFTTitemToRow(oRow, oNFTTitem, pSOLDPREP, oRowDiag);		
		sLog = sLog + oRowDiag.Log
	}
	poDiag.Log = sLog;
}

function applyNFTTitemToRow(pFormRow, pTemplateItem, pSOLDPREP, poDiag) {
	var sLog = "";
	// Hide row if not in template, Hide qty, pdv based on flags, Replace UOM if specified.
	if (pTemplateItem==null) {
		//=== hide the row ===
		pFormRow.presence = "hidden";
	} else if (pTemplateItem.getSpecId()!="ZZZ") {
		pFormRow.presence = "visible";
		//=== copy data columns from the hidden cols - for template re-application ===
		pFormRow.nutrMsr.rawValue = commons.tryStringAsIntegerWithUOM(pFormRow.qtyHdn.rawValue);
		pFormRow.nutrPDV.rawValue =  commons.tryStringAsIntegerWithUOM(pFormRow.pdvHdn.rawValue);
		
		sLog = sLog + "\r\n" + "After tryInteger" + 
							". nutrMsr=" + pFormRow.nutrMsr.rawValue + 
							", nutrPDV:" + pFormRow.nutrPDV.rawValue ;
		
		var flag_set = pTemplateItem.getFlag_set(pSOLDPREP);
		if (flag_set.qty!="Y") {
			pFormRow.nutrMsr.rawValue = "";
		}
		if (flag_set.pdv!="Y") {
			pFormRow.nutrPDV.rawValue = "";
		}
		if (commons.ifNullEmpty(flag_set.unit)!="") {
			//=== Split nutrMsr by " " and replace 2nd part ===
			//pFormRow.nutrMsr = pDataRow.getNv_set("STD_DECL").val + " " + pDataRow.getNv_set("STD_DECL").unit;			
			var sQty = pFormRow.nutrMsr.rawValue;
			if (commons.ifNullEmpty(sQty) != "") {
				var aTmp = sQty.split(" ");
				pFormRow.nutrMsr.rawValue = aTmp[0] + " " + flag_set.unit;
				sLog = sLog + "\r\n" + "UOM REPLACED:" + aTmp[1] + " by " + flag_set.unit;
			}
		}
	} else {		//=== pTemplateItem.getSpecId()=="ZZZ" - remove template
		pFormRow.presence = "visible";
		//=== copy data columns from the hidden cols - for template re-application ===
		pFormRow.nutrMsr.rawValue = pFormRow.qtyHdn.rawValue;
		pFormRow.nutrPDV.rawValue =  pFormRow.pdvHdn.rawValue;
		
	}
	poDiag.Log = poDiag.Log + sLog;
}

function loadFromFlatFiles(pTemplatePath, pFileHdr, pFileDet, poDiag) {
	// Load 2 specified files into 2 form variables: m_NFTT_HDR, m_NFTT_DET
	// Both files are loaded and simple saved as string in these vars without any validation/parsing.
	// Later they are used by makeSelectList() and buildFromXML()
	//
	/***********************************************************
	* Load 2 specified files into 2 form variables: m_NFTT_HDR, m_NFTT_DET
	* Both files are loaded and simple saved as string in these vars without any validation/parsing.
	* Both files are loaded and simple saved as string in these vars without any validation/parsing.
	* Later it is used by makeSelectList() and buildFromFlat()
	*
	* Diag = Object {Output1: field, Output2: field, LogErrorInNote: bool, AbapNodeReplaced:bool, ViewState:string, XmlTypeOK:bool}
	***********************************************************/
	//=== load data XML into to string, use trusted function (folder scripts) ===
	m_NFTT_HDR.value = trustedReadFileToString(pTemplatePath, pFileHdr);
	m_NFTT_DET.value = trustedReadFileToString(pTemplatePath, pFileDet);
	
	/* === no checks done here === */
	if (m_debug.value == "DEBUG") {
		poDiag.Output1.rawValue = m_NFTT_HDR.value;
		xfa.host.messageBox("Data loaded from the template HDR file.", "",3);
	}
}
function makeSelectListFromFlat(cbx) {
	//=== TODO ==
	// Parse the m_NFTT_HDR variable, split newlines, then split ",", build array (ID-Descr), load in to cbx
	//
	//
}
function buildFromFlat(pTemplateId, pDOMroot, pRootValue) {
	//=== TODO ==
	// Parse the m_NFTT_HDR variable, split newlines, then split ","
	// Iterate and select only record with 'templateId'
	// Build NFTTemplate object - populate fields from current record.
	// Parse the m_NFTT_DET variable, split newlines, then split ","
	// Iterate and select only records with 'templateId'
	// For each build one NFTTemplateItem object and push it into NFTTemplate.items[]
	// Return NFTTemplate object.
	
}

//=== END: NFTTemplateManager ===

