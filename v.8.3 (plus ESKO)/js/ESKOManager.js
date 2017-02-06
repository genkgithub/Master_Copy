//=== BEGIN: ESKO-XML-related utility methods ===
//=== v.8.3 Dec 29, 2016 ===

function loadEskoXML(poDiag) {
	/******************************************************
	  ESKO XML loading: 
		a. Make 2 roots: xfa.datasets.ESKO_TEMPLATE and xfa.datasets.ESKO_OUT
		b. Load ESKO file from the program folder using MapperWrapper.loadFromXML()
		   into xfa.datasets.ESKO_TEMPLATE.
		d.	Place a copy under xfa.datasets.ESKO_TEMPLATE 
			(use another call of loadFromXML or try using clone()). 
			Try to change value of top node to reflect that it’s a copy).
		e.	Use try-catch as needed. Check .nodes!=null before using nodes.item(i)
		f.	Use .somExpression()
		d. Show loaded - only root - in txtOutput - both TEMPLATE and OUT.
			oXXXnode = xfa.datasets.ESKO_xxx.resolveNode(“artworkContentMessage”)
	******************************************************/	
	
	var sMsg = "Executing ESKO XML load. Started.";
	//commons.addToProgress(poDiag, sMsg);
	commons.addToProgress(poDiag, sMsg, false);

	//=== Make 2 roots: xfa.datasets.ESKO_TEMPLATE and xfa.datasets.ESKO_OUT ===
	try {
		xfa.datasets.assignNode("ESKO_TEMPLATE.TEST", "ESKO template XML", 0);
		xfa.datasets.assignNode("ESKO_OUT.TEST", "ESKO output XML", 0);
	} catch (err) {
		commons.addToProgress(poDiag, "Error assignNode:" + err.message, true);
		//xfa.host.messageBox("Error assignNode:" + err.message, "",3);		
	}
	//=== check created nodes
	var oNode1, oNode2 = null;
	try {
		oNode1 = xfa.datasets.resolveNode("ESKO_TEMPLATE.TEST");
		oNode2 = xfa.datasets.resolveNode("ESKO_OUT.TEST");
	} catch (err) {
		//xfa.host.messageBox("Error resolveNode:" + err.message, "",3);
		commons.addToProgress(poDiag, "Error assignNode:" + err.message, true);
	}
	commons.addToProgress(poDiag, "oNode1.name:" + oNode1.name + ", oNode2.name:" + oNode2.name, true);
	commons.addToProgress(poDiag, "oNode1.value:" + oNode1.value + ", oNode2.value:" + oNode2.value, true);
	
	//=== Load ESKO file from the program folder using MapperWrapper.loadFromXML()
	//=== Place a copy under xfa.datasets.ESKO_TEMPLATE 
	//		(use another call of loadFromXML or try using clone()). 
	//		Try to change value of top node to reflect that it’s a copy).
	MapperWrap.loadFromXML("", "ESKO_TEMPLATE.xml", poDiag, 
		"<artwork_content:artworkContentMessage", 
		xfa.datasets.ESKO_TEMPLATE); 
	if (!poDiag.XmlTypeOK) {
		commons.addToProgress(poDiag, "The ESKO_TEMPLATE.XML is not a valid ESKO template XML.", true);
		return;
	}
	MapperWrap.loadFromXML("", "ESKO_TEMPLATE.xml", poDiag, 
		"<artwork_content:artworkContentMessage", 
		xfa.datasets.ESKO_OUT); 
	if (!poDiag.XmlTypeOK) {
		commons.addToProgress(poDiag, "The ESKO_TEMPLATE.XML is not a valid ESKO template XML.", true);
		return;
	}

	//=== Show loaded - only root - in txtOutput - both TEMPLATE and OUT.
	var oTemplRoot = xfa.datasets.ESKO_TEMPLATE.resolveNode("artworkContentMessage"); 
	var oOutRoot = xfa.datasets.ESKO_OUT.resolveNode("artworkContentMessage"); 
	
	if (oTemplRoot==null) {
		commons.addToProgress(poDiag, "The root node 'artwork_content:artworkContentMessage' node not found in loaded ESKO_TEMPLATE.", true);
		return;
	}
	if (oOutRoot==null) {
		commons.addToProgress(poDiag, "The root node 'artwork_content:artworkContentMessage' node not found in loaded ESKO_TEMPLATE.", true);
		return;
	}

	sMsg = 
		"ESKO_TEMPLATE loaded. Root:" + commons.formatNode(oTemplRoot, true) + "\r\n" + 
		"ESKO_OUT loaded. Root:" + commons.formatNode(oOutRoot, true);
	
	poDiag.Output1.rawValue = sMsg;
	commons.addToProgress(poDiag, "ESKO_TEMPLATE and OUT Loaded", false);

	sMsg = 
		XMLDAO.getNodeList("datasets.ESKO_TEMPLATE.artworkContentMessage.artworkContent.artworkContentPieceOfArt") + "\r\n" +
		XMLDAO.getNodeList("datasets.ESKO_OUT.artworkContentMessage.artworkContent.artworkContentPieceOfArt");
	poDiag.Output2.rawValue = "artworkContent.artworkContentPieceOfArt: subnodes:" + "\r\n" + sMsg;
	
	sMsg = "Executing ESKO XML load. Completed.";
	commons.addToProgress(poDiag, sMsg, false);
	
	//var myDoc = event.target;
	//commons.writeToTxtAttachment(myDoc, "log-ESKO.txt", poDiag.Progress.rawValue);
}

function buildEskoXML_OUT(poDiag, poEskoInput) {
	/******************************************************
	a)	Work with xfa.datasets.ESKO_OUT
	b)	Locate node: 
			artworkContentMessage.artworkContent.artworkContentPieceOfArt
		Only one item must exist.
	c)	Add n-1 nodes of the same type (artworkContentPieceOfArt) with test data, fill with data
		from MasterCopy	(pfMode=MASTERCOPY, form (=FORM) or 3 test values (=TEST).
		Use poEskoInput = MasterCopyToEskoInput(poMasterCopy, pfMode);
			poEskoInput = {GS1Element, TextValue}[]
		Use this code: 
			xfa.datasets.ESKO_OUT.xxxxx.clone(true); - see reference
			if not working – try this as low level:
			xfa.datasets.data.<form1>.assignNode(“custom.message”, “Hello World!”, 0);
			see http://forms.stefcameron.com/2009/06/01/creating-and-loading-data-nodes/
	d)	Show loaded data in Output[2].
	******************************************************/	
	var sMsg = "Executing ESKO XML change. Started.";
	commons.addToProgress(poDiag, sMsg, true);
	
	//=== Work with xfa.datasets.ESKO_OUT ===
	var oTemplRoot = xfa.datasets.ESKO_TEMPLATE.resolveNode("artworkContentMessage"); 
	var oOutRoot = xfa.datasets.ESKO_OUT.resolveNode("artworkContentMessage"); 

	var sMsg = "";
	if (oTemplRoot==null) {
		sMsg = "The root node 'artwork_content:artworkContentMessage' node not found in loaded ESKO_TEMPLATE.";
	}
	if (oOutRoot==null) {
		if (sMsg!="") {
			sMsg = sMsg + "\r\n";
			sMsg = sMsg + "The root node 'artwork_contnt:artworkContentMessage' node not found in loaded ESKO_OUT.";
		}
	}
	if (sMsg!="") {
		commons.addToProgress(poDiag, sMsg, true);
		return;
	}
	sMsg = "ESKO_TEMPLATE loaded. Root:" + commons.formatNode(oTemplRoot, true) + "\r\n" + 
		"ESKO_OUT loaded. Root:" + commons.formatNode(oOutRoot, true);
	
	poDiag.Output1.rawValue = sMsg;
	commons.addToProgress(poDiag, "ESKO_TEMPLATE and OUT loaded to internal objects", false);
	//xfa.host.messageBox("ESKO_TEMPLATE and OUT loaded internal objects.", "",3);

	sMsg = 
		XMLDAO.getNodeList("datasets.ESKO_TEMPLATE.artworkContentMessage.artworkContent.artworkContentPieceOfArt") + "\r\n" +
		XMLDAO.getNodeList("datasets.ESKO_OUT.artworkContentMessage.artworkContent.artworkContentPieceOfArt");
	poDiag.Output2.rawValue = "artworkContent.artworkContentPieceOfArt: subnodes:" + "\r\n" + sMsg;
	
	//=== Locate node: artworkContentMessage.artworkContent.artworkContentPieceOfArt
	//	  Only one item must exist - so it should be of type 'node', not 'nodes' and have no 'length'.
	var sRootNodePath = "datasets.ESKO_OUT.artworkContentMessage.artworkContent.artworkContentPieceOfArt";
	var rootNode =  xfa.resolveNode(sRootNodePath);
	var oArtwCopyNodes =  rootNode.resolveNodes("artworkContentCopyElement[*]");
	var oBaseArtwCopyNode = null
	try {
		if ('length' in oArtwCopyNodes) {
			commons.addToProgress(poDiag, "Error :artworkContentPieceOfArt.length=" + oArtwCopyNodes.length + ". Must be =1", true);			
			return;
		}
		//=== now re-point to the single node
		oBaseArtwCopyNode = rootNode.resolveNode("artworkContentCopyElement");
	} catch (err) {
		commons.addToProgress(poDiag, "oArtwCopyNodes.length.error:" + err.message, true);			
	}
	
	//=== Locate node: artworkContentMessage.artworkContent.artworkContentPieceOfArt.artworkContentGraphicElement
	//    We'll be inserting our elements before this one
	var oArtwGraphicElement = rootNode.resolveNode("artworkContentGraphicElement");
	if (oArtwGraphicElement==null) {
		commons.addToProgress(poDiag, "Error :artworkContentGraphicElement not found in the template.", true);			
		return;
	}
	
	//=== Add n-1 nodes of the same type (artworkContentPieceOfArt) with test data. 
	/*	Use this code: 
			xfa.datasets.ESKO_OUT.xxxxx.clone(true); - see reference
			if not working – try this as low level:
			xfa.datasets.data.<form1>.assignNode(“custom.message”, “Hello World!”, 0);
			see http://forms.stefcameron.com/2009/06/01/creating-and-loading-data-nodes/
	*/
	commons.addToProgress(poDiag, "Before cloning loop", false);			

	var oNewArtwCopyNode = null, oValNode = null, oLocaleNode = null;
	//=== poEskoInput = {GS1Element, TextValue}[] ===
	for (var i=0; i<poEskoInput.length; i++) {
		try {
			if (i==0) {
				//=== load 1st element into single existing base node ===
				oBaseArtwCopyNode
				oValNode = oBaseArtwCopyNode.resolveNode("copyElementTypeCode");
				oValNode.value = poEskoInput[i].GS1Element;
				oLocaleNode = oBaseArtwCopyNode.resolveNode("localeSequence");
				oLocaleNode.value = "0";
				
				oValNode = oBaseArtwCopyNode.resolveNode("textContent.html.body.p");
				oValNode.value = poEskoInput[i].TextValue_EN;
				
				//Add node for FR - Locale=1
				oNewArtwCopyNode = oBaseArtwCopyNode.clone(1);
				commons.addToProgress(poDiag, "Cloned object copyElementTypeCode (FR)." + oNewArtwCopyNode.name, false);
				
				oValNode = oNewArtwCopyNode.resolveNode("copyElementTypeCode");
				oValNode.value = poEskoInput[i].GS1Element;
				oLocaleNode = oBaseArtwCopyNode.resolveNode("localeSequence");
				oLocaleNode.value = "1";
				
				oValNode = oNewArtwCopyNode.resolveNode("textContent.html.body.p");
				oValNode.value = poEskoInput[i].TextValue_FR;
				
				//rootNode.nodes.append(oNewArtwCopyNode);
				rootNode.nodes.insert(oNewArtwCopyNode, oArtwGraphicElement);
				commons.addToProgress(poDiag, "Appended clone.", false);
				
			} else {
				//EN=localeSequence=0
				oNewArtwCopyNode = oBaseArtwCopyNode.clone(1);
				commons.addToProgress(poDiag, "Cloned object artworkContentCopyElement (EN)." + oNewArtwCopyNode.name, false);
				
				oValNode = oNewArtwCopyNode.resolveNode("copyElementTypeCode");
				oValNode.value = poEskoInput[i].GS1Element;
				oLocaleNode = oBaseArtwCopyNode.resolveNode("localeSequence");
				oLocaleNode.value = "0";
				
				oValNode = oNewArtwCopyNode.resolveNode("textContent.html.body.p");
				oValNode.value = poEskoInput[i].TextValue_EN;
				
				//rootNode.nodes.append(oNewArtwCopyNode);
				rootNode.nodes.insert(oNewArtwCopyNode, oArtwGraphicElement);
				commons.addToProgress(poDiag, "Appended clone.", false);
				
				//FR=localeSequence=1
				oNewArtwCopyNode = oBaseArtwCopyNode.clone(1);
				commons.addToProgress(poDiag, "Cloned object artworkContentCopyElement (EN)." + oNewArtwCopyNode.name, false);
				
				oValNode = oNewArtwCopyNode.resolveNode("copyElementTypeCode");
				oValNode.value = poEskoInput[i].GS1Element;
				oLocaleNode = oBaseArtwCopyNode.resolveNode("localeSequence");
				oLocaleNode.value = "1";
				
				oValNode = oNewArtwCopyNode.resolveNode("textContent.html.body.p");
				oValNode.value = poEskoInput[i].TextValue_FR;
				
				//rootNode.nodes.append(oNewArtwCopyNode);
				rootNode.nodes.insert(oNewArtwCopyNode, oArtwGraphicElement);
				commons.addToProgress(poDiag, "Appended clone.", false);
				
			}
		} catch (err) {
			commons.addToProgress(poDiag, "cloning nodes. i=" + i + ", error:" + err.message + ", at " + err.lineNumber, false);
		}
	}
	//=== Show loaded data in Output[2].
	commons.addToProgress(poDiag, "Done cloning. oArtwCopyNodes.length="+oArtwCopyNodes.length, false);

	//=== Now 'oArtwCopyNodes' should have several nodes ===
	
	//oArtwCopyNodes =  rootNode.resolveNodes("artworkContentCopyElement[*]");
	var sOut = "rootNode.nodes.length="+rootNode.nodes.length;
	var oNode = null;
	for (var i=0; i<rootNode.nodes.length; i++) {
		commons.addToProgress(poDiag, "Iterating rootNode.nodes. Start Step=" + i, false);
		try {
			oNode = rootNode.nodes.item(i);
			if (oNode.name!="artworkContentCopyElement") continue;
			if (sOut!=="") sOut = sOut + "\r\n";
			
			commons.addToProgress(poDiag, "Node[" + i + "]" + oNode.name, false);		

			var oNodeTypeCode = null, 
				oNodeTextContent = null,
				oNodeBodyP = null;
			
			oNodeTypeCode = oNode.resolveNode("copyElementTypeCode");
			oNodeTextContent = oNode.resolveNode("textContent");
			oNodeBodyP = oNode.resolveNode("textContent.html.body.p");		
			
			commons.addToProgress(poDiag, "oNodeTypeCode=" + oNodeTypeCode + "\r\n" +
				"oNodeTextContent=" + oNodeTextContent + "\r\n" +
				"oNodeBodyP=" + oNodeBodyP, false);		
				
			sOut = sOut + oNode.name +
			"{" + oNodeTypeCode.value + ":" + oNodeBodyP.value + "}";
			
		} catch (err) {
			commons.addToProgress(poDiag, "cloning nodes. i=" + i + ", error:" + err.message + ", at " + err.lineNumber, true);		
		}
		commons.addToProgress(poDiag, "Iterating oArtwCopyNodes. End Step=" + i, false);		
	}
	//=== At the end - get full XML of the modified _OUT ===
	var sXML = rootNode.saveXML("pretty");
	
	poDiag.Output2.rawValue = "artworkContent.artworkContentPieceOfArt: subnodes:" + 
		"\r\n" + sOut + "\r\n" + "===raw XML===" + "\r\n" + sXML;

	commons.addToProgress(poDiag, "ESKO_TEMPLATE change completed.", true);
		
}

function MasterCopyToEskoInput(poMasterCopy, pfMode, poDiag) {
	//=== Transform MasterCopy{Sections{Items}} to {GS1Element, TextValue}[] ===	
	//    pfMode="TEST": make dummy array of {GS1Element, TextValue}[0..2]
	//    pfMode="MASTERCOPY": use pData = oMasterCopy to make  {GS1Element, TextValue}[]
	//    pfMode="FORM": use the Form to make  array of {GS1Element, TextValue}[]
	var oEskoInput = [];
	
	if (pfMode=="TEST") {
		for (var i=0; i<3; i++) {
			oEskoInput.push(
				{GS1Element: "GS1-CODE-" + i, 
				TextValue_EN: "TEST-EN-" + i, TextValue_FR: "TEST-FR-" + i});
		}
	} else if (pfMode=="FORM") {
		var sForm = m_root.value, 
			sPage = "Page1", 
			sSubForm1 = "subMain", 
			sSubForm2 = "subSection";
		var sFullName = sForm + "." + sPage + "." + sSubForm1 + "." + sSubForm2;
		var oFormSectionNodes = xfa.resolveNodes(sFullName + "[*]");
		
		for (var iSection=0; iSection<oFormSectionNodes.length; iSection++) {
			oFormSectionNode = oFormSectionNodes.item(iSection);
			var sTable = "tblSection", sRow = "rowData";
			var oTableNode = oFormSectionNode.resolveNode(sTable);
			var oRowNodes = oTableNode.resolveNodes(sRow + "[*]");
			commons.addToProgress(poDiag, "oFormSectionNode:" + oFormSectionNode.subSectionName.lblSectionName.rawValue, false);
			
			for (var iRow=0; iRow < oRowNodes.length; iRow++) {
				//var oRow = getSectionRow(oFormSection, "tblSection", "rowData", -1, oDataItem.getKey());
				var oRowItem = oRowNodes.item(iRow);
				commons.addToProgress(poDiag, "oRowItem:" + oRowItem.Gs1ElementID.rawValue, false);
				oEskoInput.push(MCRowToEskoItem(oRowItem));
			}
		}
		
	} else if (pfMode=="MASTERCOPY") {
		var iSectionCount = commons.getPropertyCount(poMasterCopy.getSections());
		for (var iSection=1; iSection<=iSectionCount; iSection++) {
			var oDataSection = poMasterCopy.getSectionBySeqN(iSection);		
			for (var i=0; i < oDataSection.getItemCount(); i++) {
				var oDataItem = oDataSection.getItem(i);
				oEskoInput.push(MasterCopyItemToEskoItem(oDataItem));
			}
		}
	}
	return oEskoInput;
}

function MCRowToEskoItem(pFormRow) {
	//=== return {GS1Element, TextValue} ===
	var oEskoItem = {GS1Element: "", TextValue_EN: "", TextValue_FR: ""};
	oEskoItem.GS1Element = pFormRow.Gs1ElementID.rawValue;
	
	var sTmp = pFormRow.Value_EN.rawValue;
	sTmp = sTmp.replace(/--- Instance: [0-9] ---/g, "");
/*	for (var i=0;i<=9;i++) {
		sTmp = sTmp.replace("=== Instance: " + i + " ===", "");
	} */
	oEskoItem.TextValue_EN = sTmp;
	
	sTmp = pFormRow.Value_FR.rawValue;
	sTmp = sTmp.replace(/--- Instance: [0-9] ---/g, "");
/*	for (var i=0;i<=9;i++) {
		sTmp = sTmp.replace("=== Instance: " + i + " ===", "");
	} */
	oEskoItem.TextValue_FR = sTmp;
	
	//pFormRow.Value_FR.rawValue 
	//pFormRow.Note.rawValue 
	return oEskoItem;
}
function MasterCopyItemToEskoItem(pItem) {
	//=== return {GS1Element, TextValue} ===
	var oEskoItem = {GS1Element: "", TextValue_EN: "", TextValue_FR: ""};
	oEskoItem.GS1Element = pFormRow.getGs1ElementID();
	oEskoItem.TextValue_EN = pFormRow.getData_EN();
	oEskoItem.TextValue_FR = pFormRow.getData_FR();
	return oEskoItem;
}
function EskoItemToString(pEskoItem) {
	//=== return {GS1Element, TextValue} ===
	return "{GS1Element:" + pEskoItem.GS1Element + 
		",TextValue_EN:" +pEskoItem.TextValue_EN + 
		",TextValue_FR:" +pEskoItem.TextValue_FR +
		"}";
}
function EskoInputObjectToString(paEskoInput) {
	var sOut = "";
	for (var i=0; i<paEskoInput.length; i++) {
		if (sOut!="") sOut=sOut + "\r\n";
		sOut = sOut + EskoItemToString(paEskoInput[i]);
	}
	return sOut;
}

function exportEskoXML_OUT(poDiag) {
	//=== TODO ===
}
//=== END: ESKO-XML-related utility methods ===

