//=== BEGIN: dataXML access object utility methods ===
//=== v.8.3 Dec 29, 2016 ===
function getRoot() {
	var sOut = "";
	var nodeItem_0 = xfa.datasets.data.nodes.item(0);
	sOut = sOut + "=== nodeItem_0=" + nodeItem_0.name + " ==="  + "\r\n";
	return nodeItem_0;
}
function getLabelRoot() {
	var itemLABEL = xfa.datasets.data.nodes.item(0).nodes.item(1).nodes.item(0);
	sOut = sOut + "\r\n";
	sOut = sOut + "=== For Item 0[1] ===" + "\r\n";
	sOut = sOut + "Name: " + itemLABEL.name + "," + "count: " + itemLABEL.nodes.length;
	return itemLABEL;
}
function getLabelNode(pNodeName) {
	var itemLABEL = xfa.datasets.data.nodes.item(0).nodes.item(1).nodes.item(0);
	sOut = sOut + "\r\n";
	sOut = sOut + "=== For Item 0[1] ===" + "\r\n";
	sOut = sOut + "Name: " + itemLABEL.name + "," + "count: " + itemLABEL.nodes.length;
	
	return itemLABEL;
}    
function getLBLSpecRoot(pNodeName) {
	var itemLABEL = xfa.datasets.data.nodes.item(0).nodes.item(1).nodes.item(0);
	var itemPRODSPEC = itemLABEL.resolveNode("LOBLAW_PROD_SPEC");
	return itemPRODSPEC;
}
function getLBLSpecNode(pPath) {
	var itemLABEL = xfa.datasets.data.nodes.item(0).nodes.item(1).nodes.item(0);
	var itemPRODSPEC = itemLABEL.resolveNode("LOBLAW_PROD_SPEC");
	return itemPRODSPEC.resolveNode(pPath); 
	//=== examples: ===
	// "SPEC_DETAILS.SPEC_ID",
	// "SPEC_DETAILS.SPEC_NAME"
	// "PRODUCT_CLAIMS.MARKET_CLAIMS.ZMAS_MARKET_CLAIMS.TEXT_MARKETING_CLAIMS.CHAR_VALUE"
	// "PRODUCT_CLAIMS.NUTRITION_CLAIMS.ZMAS_NUTRITION_CLAIMS.CHAR_VALUE"
	//
	//=== more examples: ===	
	//--- mapping: ---
	//Mapping Element {GS1_CAT_CODE-GS1_ELEMENT}		Mapped To
	//---------------									---------
	//MARKETING_COPY_ETC - MARKETING_CLAIM 				{PRODUCT_CLAIMS.MARKET_CLAIMS.ZMAS_MARKET_CLAIMS.TEXT_MARKETING_CLAIMS} - {CHAR_VALUE}
	//USAGE_CONS_INFO - NUTRITION_FACTS					{PRODUCT_CLAIMS.NUTRITION_CLAIMS.ZMAS_NUTRITION_CLAIMS} - {CHAR_VALUE}
	//
	//
}


function getDataXmlNodeValueExt(pMapItem, pXMLloadedFrom, pDOMroot, pLog) {
	/*=====================================================================
	 Retrieve value from data XML based on mapping item pMapItem
	 Process repeats if needed (including multi-val and multi-inst VATs),
	 return combined value as string.
	 If not found or subroot/path empty return null.
	 pXMLloadedFrom:
	   "FILE": start DOM with xfa.datasets.data
	   "STRING": start DOM with xfa.datasets - used in most cases as we load XML via string, 
	             and even when wwe use a file we load it into a stream and then make the string from stream
	 pDOMroot = actual root of data XML file (currently "abap")
	
	 pLog{Msg} - error messages
	 root: xfa.datasets.data.nodes.item(0) ---> abap.values
	
	 PROC_TYPE=SINGLE_NODE:
	 - start with root and use subroot (= LABELDATA.LOBLAW_PROD_SPEC) + path1
	 - ignore path2, use dataTag
	 - if not found return null, if found return value
	
	 PROC_TYPE=SELECT_NODES:
	 - start with root and use subroot (= LABELDATA.LOBLAW_PROD_SPEC) + path1
	 - get all instances of path2, iterate
	   - for each get ([dataTag]).value
	   - use cond1 and 2 to filter only needed nodes.
	   - collect all values, separate with newlines. Process multi-val and multi-inst VATs if specified.
	 - if not found return null, if found return collected value.
	
	 PROC_TYPE=ALL_VATS_BY_KEYS or ALL_VATS_BY_TAGS:
	 - in this case all required VATs have already been discovered and for each
	   a MapItem object has been created, so this call is dealing with only one 
	   target VAT node:
	   MAP_04 (the most comprehensive case):
		- Locate top node of the VAT:
		  - Iterate thru all instances (if available). For each instance:
		  - use PATH_CHAR to iterate thru all characteristics of this instance.
		  - for each characteristic:
		    - locate char name, value, text type, value
		    - make up one char result (text-part) = 
		    {char-name: char-value; text-value}
		   - several characteristic nodes maybe different characteriscs or the same characteristic in several values.
		   - if needed use COND(tag,value) to filter only desired characteristics
		   - join all one-char-value results (from one VAT instance) with ";"
		  - join all instance results text-parts with line-breaks.	 
	 
	 PROC_TYPE=ALL_NFTS (usage = NFT):
	 - start with root and use subroot + path1
	 - get all instances of path2, iterate
	   - for each get values from specific data nodes and populate specific fields in NFTitem objects.
	   - cond1 and 2 are ignored.
	 - if not found return null, if found return collected value.
	=====================================================================*/

	var sMethodName = "getDataXmlNodeValueExt";
	if (pMapItem==null) {
		pLog.Msg = sMethodName + ". pMapItem=null";
		return null;
	}
	
	var retValue = "";
	var xPath = "";
	var rootNode, subrootNode, targetNode;
	pLog.Msg = "";
	
	//=== define starting point of the DOM === 
	if (pDOMroot=="") pDOMroot = "abap";
	if (pXMLloadedFrom=="FILE") {
		rootNode = xfa.datasets.data.resolveNode(pDOMroot);		//--- abap
	} else if (pXMLloadedFrom=="STRING") {
		rootNode = xfa.datasets.resolveNode(pDOMroot);		//--- abap or asprep
	} else {
		pLog.Msg = sMethodName + ". Invalid parameter pXMLloadedFrom=" + pXMLloadedFrom;
		return null;
	}
	if (commons.ifNullEmpty(pMapItem.getSubroot())=="") {
		subrootNode=null;
	} else {
		var subroot = pMapItem.getSubroot();
		if (subroot.indexOf("{ASPREP}.")==0) 
			subroot = subroot.replace("{ASPREP}.", "");
		subrootNode = rootNode.resolveNode(subroot);
	}
	if (subrootNode==null) {
		pLog.Msg = sMethodName + ". subroot node not resolved. " + "\r\n" + "pMapItem=" + pMapItem.getAsString();
		var sOut = "";
		pLog.Msg = sMethodName + ". subroot node not resolved. " + "\r\n" + "pMapItem=" + pMapItem.getAsString() +
				sOut;
		return null;
	}
	if (pMapItem.getProcType()=="SINGLE_NODE") {
		// REPEAT=NONE:
		// - start with root and use subroot (= LABELDATA.LOBLAW_PROD_SPEC) + path1
		// - ignore path2, use dataTag
		// - if not found return null, if found return value
		retValue = getDataNodeValue_SINGLE_NODE(pMapItem, subrootNode, pLog);
		return retValue;
		
	} else if (pMapItem.getProcType()=="SELECT_NODES") {
		// REPEAT=SELECT:
		// - start with root and use subroot (= LABELDATA.LOBLAW_PROD_SPEC) + path1
		// - get all instances of path2, iterate
		//   - for each get ([dataTag]).value
		//   - use cond1 and 2 to filter only needed nodes.
		//   - collect all values, separate with newlines. Process multi-val and multi-inst VATs if specified.
		// - if not found return null, if found return collected value.
		retValue = getDataNodeValue_SELECT_NODES(pMapItem, subrootNode, pLog);
		return retValue;
		
	} else if (pMapItem.getProcType()=="ALL_VATS_BY_TAG" || pMapItem.getProcType()=="ALL_VATS_BY_KEY" ||
				pMapItem.getProcType()=="SINGLE_VAT") {
		/* 
		 REPEAT=ALLVATS:
		 - in case of ALL_VATS_xxx all required VATs have already been discovered and for each
		   a MapItem object has been created, so this call is dealing with only one target VAT node.
		 - for SINGLE_VAT - we just go to the specified VAT using MapItem. 
		 - Iin both cases it's case MAP_04 (the most comprehensive case for VATs):
			- Locate top node of the VAT: 
			   subroot + PATH1(To the node above the VAT or EMPTY)
			   		+ PATH2(top of VAT to top of one instance or EMPTY)
			   		+ VAT_KEY_TAG(tag name of the VAT)
			  - Iterate thru all instances (if available) - PATH_MINST=path to instance. 
			    For each instance:
			    - use PATH_CHAR (=path to characteristic) to iterate thru all characteristics of this instance.
			    - for each characteristic:
			      - locate char name, value, text type, value CHAR_NAME_TAG,CHAR_VAL_TAG, TEXT_TYPE_TAG, TEXT_VAL_TAG
			      - make up one char result (text-part) = {char-name: char-value; text-value}
			   - several characteristic nodes maybe different characteriscs or the same characteristic in several values.
			   - if needed use COND(tag,value) to filter only desired characteristics
			   - join all one-char-value results (from one VAT instance) with ";"
			  - join all instance results text-parts with line-breaks.	 
		   
		 - if not found return null, if found return collected value.
		*/
		
		retValue = getDataNodeValue_SINGLE_VAT(pMapItem, subrootNode, pLog);
		return retValue;
	
	} else if (pMapItem.getProcType()=="ALL_NFTS") {
		// REPEAT=ALL_NFTS (usage = NFT):
		// - start with root and use subroot + path1
		// - get all instances of path2, iterate
		//   - for each get values from specific data nodes and populate specific fields in NFTitem objects.
		//   - cond1 and 2 are ignored.
		// - if not found return null, if found return collected value.
		
		retValue = getDataNodeValue_ALLNFTS(pMapItem, subrootNode, pLog);
		return retValue;
	}		
}

function getDataNodeValue_SINGLE_NODE(pMapItem, pSubrootNode, pLog) {
	var retValue = "", xPath = "", sTmp = "";
	var targetNode;
	var sMethodName = "getDataNodeValue_NONE";
	
	if (pMapItem.getPath1() == "_NONE_" && pMapItem.getDataTag() == "_NONE_") {
		retValue = pSubrootNode.value;
	} else {
		if (pMapItem.getPath1() == "_NONE_" && pMapItem.getDataTag() != "_NONE_") {
			xPath = pMapItem.getDataTag();
		} else if (pMapItem.getPath1() != "_NONE_" && pMapItem.getDataTag() == "_NONE_") {
			xPath = pMapItem.getPath1();
		} else if (pMapItem.getPath1() != "_NONE_" && pMapItem.getDataTag() != "_NONE_") {
			xPath = pMapItem.getPath1() + "." + pMapItem.getDataTag();
		}
		targetNode = pSubrootNode.resolveNode(xPath);
		if (targetNode!==null) {
			retValue = commons.ifNullEmpty(targetNode.value);
		} else {
			pLog.Msg = pLog.Msg + " \r\n" + pMapItem.getAsString();
			var sTmp = sMethodName + ". path1+tag=" + xPath + " - resolves to null."
			retValue = sTmp;
		}
	}
	return retValue;
}
function getDataNodeValue_ByPath(pSubrootPath, pPath, pLog) {
	//=== Retrieve value of single node using a subroot of the main XML and relative path (from the subroot) ===
	var retValue = "", sTmp = "";
	var targetNode;
	var sMethodName = "getDataNodeValue_ByPath";
	
	if (pPath == "_NONE_" || pPath == "" || pPath == null) {
		retValue = pSubrootNode.value;
	} else {
		targetNode = xfa.datasets.resolveNode(pSubrootPath + "." + pPath);
		if (targetNode!==null) {
			 retValue = commons.ifNullEmpty(targetNode.value);
		} else {
			var sTmp = sMethodName + ". Subroot+pPath=" + pSubrootPath + "." + pPath + " - resolves to null."
			pLog.Msg = pLog.Msg + " \r\n" + sTmp;
			retValue = null;
		}
	}
	return retValue;
}

function getDataNodeValue_SELECT_NODES(pMapItem, pSubrootNode, pLog) {
	//==================================================================
	// REPEAT=SELECT:
	// - start with root and use subroot (= LABELDATA.LOBLAW_PROD_SPEC) + path1
	// - get all instances of path2, iterate
	//   - for each get ([dataTag]).value
	//   - use cond1 and 2 to filter only needed nodes.
	//   - collect all values, separate with newlines. Process multi-val and multi-inst VATs if specified.
	// - if not found return null, if found return collected value.
	//==================================================================
	
	var retValue = "", xPath = "", sTmp = "";
	var targetNode;
	var sMethodName = "getDataNodeValue_SELECT";
		
	if (pMapItem.getPath1() == "_NONE_") {
		pLog.Msg = sMethodName + ". Repeat element. XmlPath1 node = _NONE_" + pMapItem.getAsString();
		return null;
	}
	xPath = pMapItem.getPath1();
	var repeatRootNode = pSubrootNode.resolveNode(xPath);
	if (repeatRootNode==null) {
		pLog.Msg = sMethodName + ". Repeat element. Node root not found:" + xPath + ". " + pMapItem.getAsString();
		return null;
	}
	if (pMapItem.getPath2() == "_NONE_" && pMapItem.getDataTag() == "_NONE_") {
		pLog.Msg = sMethodName + ". Repeat node root specified, but path2 and tag both = NON:" + xPath + ". " + pMapItem.getAsString();
		return null;
	}
	if (pMapItem.getMapUsage()!="BODY" && pMapItem.getMapUsage()!="HDR") {
		pLog.Msg = sMethodName + ". Repeat node root specified (SELECT), but usage!=BODY or HDR: " + pMapItem.getAsString();
		return null;
	}
	
	var sMsg = sMethodName + ". Repeat element. XmlPath1 node = " + xPath + "\r\n";
	
	for (var iNode=0; iNode<repeatRootNode.nodes.length; iNode++) {
		var repeatNode = repeatRootNode.nodes.item(iNode);
		
		//=== if a condition is specified for the repeat - test it and use the only only if TRUE ===
		var oStepMessage = {Msg:""};
		if (!checkRepeatItemCondition(repeatNode, pMapItem, oStepMessage)) continue;
		
		if (pMapItem.getPath2() != "_NONE_" && pMapItem.getDataTag() != "_NONE_") {
			xPath = pMapItem.getPath2() + "." + pMapItem.getDataTag();
		} else if (pMapItem.getPath2() != "_NONE_" && pMapItem.getDataTag() == "_NONE_") {
			xPath = pMapItem.getPath2();
		} else if (pMapItem.getPath2() == "_NONE_" && pMapItem.getDataTag() != "_NONE_") {
			xPath = pMapItem.getDataTag();
		}
		sMsg = sMsg + ". Repeat element. subnode = " + xPath + "\r\n";
		
		targetNode = repeatNode.resolveNode(xPath);
		if (retValue!="") retValue = retValue + "\r\n";
		if (targetNode!==null) {
			retValue = retValue + targetNode.value;
		} else {
			var sTmp = sMethodName + ". Repeat node root specified, but on iteration[" + iNode + "] " +
				"path2+tag=" + xPath + " - resolves to null."
			sMsg = sMsg + "\r\n" + sTmp;
			retValue = retValue + sTmp;
		}
	}
	pLog.Msg = sMsg + "\r\n" + pMapItem.getAsString();
	return retValue;
}

function getDataNodeValue_SINGLE_VAT(pMapItem, pSubrootNode, pLog) {
	/* ======================================================================
	 PROC_TYPE==ALL_VATS_xxx or SINGLE_VAT:
	 - in case of ALL_VATS_xxx all required VATs have already been discovered and for each
	   a MapItem object has been created, so this call is dealing with only one target VAT node.
	 - for SINGLE_VAT - we just go to the specified VAT using MapItem. 
	 - In both cases it's case MAP_04 (the most comprehensive case for VATs):
		- Locate top node of the VAT: 
		   subroot + PATH1(To the node above the VAT or EMPTY)
		   		+ PATH2(top of VAT to top of one instance or EMPTY)
		   		+ VAT_KEY_TAG(tag name of the VAT)
		  - Iterate thru all instances (if available) - PATH_MINST=path to instance. 
		    For each instance:
		    - use PATH_CHAR (=path to characteristic) to iterate thru all characteristics of this instance.
		    - for each characteristic:
		      - locate char name, value, text type, value CHAR_NAME_TAG,CHAR_VAL_TAG, TEXT_TYPE_TAG, TEXT_VAL_TAG
		      - make up one char result (text-part) = {char-name: char-value; text-value}
		   - several characteristic nodes maybe different characteriscs or the same characteristic in several values.
		   - if needed use COND(tag,value) to filter only desired characteristics
		   - join all one-char-value results (from one VAT instance) with ";"
		  - join all instance results text-parts with line-breaks.	 
	   
	 - if not found return null, if found return collected value.
	====================================================================== */
		
	var retValue = "", xPath = "", sTmp = "";
	var targetNode;
	var sMethodName = "getDataNodeValue_SINGLE_VAT";
	pLog.Msg = "";
	
	var sPath1, sPath2, sVatKeyTag;
	sPath1 = commons.ifNullEmpty(pMapItem.getPath1());
	sPath2 = commons.ifNullEmpty(pMapItem.getPath2());
	sVatKeyTag = commons.ifNullEmpty(pMapItem.getVatKeyTag());
	
	if (sPath1 == "_NONE_") sPath1 = "";
	if (sPath2 == "_NONE_") sPath2 = "";
	if (sVatKeyTag == "_NONE_") sVatKeyTag = "";
	if (sPath1!="") xPath = sPath1;
	if (sPath2!="") {
		if (xPath!="") xPath = xPath + ".";
		xPath = xPath + sPath2;
	}
	if (sVatKeyTag!="") {
		if (xPath!="") xPath = xPath + ".";
		xPath = xPath + sVatKeyTag;
	}
	
	var vatRootNode = pSubrootNode.resolveNode(xPath);
	if (vatRootNode==null) {
		pLog.Msg = sMethodName + ". VAT node not found: (Path1+Path2+vatKeyTag) = " + xPath + ". " + pMapItem.getAsString();
		return null;
	}
	if (pMapItem.getMapUsage()!="BODY") {
		pLog.Msg = sMethodName + ". VAT (SINGLE or ALL) node root specified, but usage!=BODY" + pMapItem.getAsString();
		return null;
	}

//xfa.host.messageBox("===> DIAG.getDataNodeValue_ONEVAT. " +
//	"pSubrootNode=" + pSubrootNode.name +
//	", pMapItem.getPath1()=" + pMapItem.getPath1() +
//	", pMapItem.getVatKeyTag()=" + pMapItem.getVatKeyTag(), "", 3);		
		
	var sMsg = sMethodName + ". VAT node. Path = " + xPath + "\r\n";
	var sInstValue = "";
	
	//=== Iterate thru all instances (if available) - PATH_MINST=path to instance, or simple next level down. ===
	for (var iNode=0; iNode<vatRootNode.nodes.length; iNode++) {
		var vatInstNode = vatRootNode.nodes.item(iNode);
		
		if (m_debug.value=="DEBUG") 
			sMsg  = sMsg  + "\r\n===> DIAG. instance:" + iNode + ",vatInstNode.name="+vatInstNode.name;	
		
		//==================================================================================== 
		//     For each instance:
		//     - use PATH_CHAR (=path to characteristic) to iterate thru all characteristics of this instance.
		//     - for each characteristic:
		//       - locate char name, value, text type, value CHAR_NAME_TAG,CHAR_VAL_TAG, TEXT_TYPE_TAG, TEXT_VAL_TAG
		//       - make up one char result (text-part) = {char-name: char-value; text-value}
		//    - several characteristic nodes maybe different characteriscs or the same characteristic in several values.
		//    - if needed use COND(tag,value) to filter only desired characteristics
		//    - join all one-char-value results (from one VAT instance) with ";"
		//   - join all instance results text-parts with line-breaks.	 
		//==================================================================================== 
		
		//=== FIX for MC-001: ===
		//sInstValue = getCharsAndTexts(vatInstNode, pMapItem, "; ", pLog);
		sInstValue = getCharsAndTexts(vatInstNode, pMapItem, pMapItem.getMCharSep(), pLog);
		if (m_debug.value=="DEBUG" )
			sMsg = sMsg + "\r\n===> DIAG. instance value:" + sInstValue;			
		
		if (sInstValue=="") {
			sMsg = sMsg + "\r\n===> DIAG.getDataNodeValue_ONEVAT. sInstValue=''\r\n";			
		} else if (sInstValue==null){
			sMsg = sMsg + "\r\n===> DIAG.getDataNodeValue_ONEVAT. sInstValue=null\r\n";			
			sInstValue="";
		}
		if (vatRootNode.nodes.length>0) {
			if (m_debug.value=="DEBUG") {
				retValue = retValue + "\r\n--- Instance: " + iNode + " ---\r\n";
			}
		}
		//=== keep building output from INstValue-s with separators ===
		if (sInstValue != "") {
			if (retValue=="")
				retValue = retValue + sInstValue;
			else
				retValue = retValue + pMapItem.getMInstSep() + sInstValue;
		}
	}
	pLog.Msg = pLog.Msg + (pLog.Msg.length==0 ? "" : "\r\n===========\r\n") + sMsg + "\r\n" + pMapItem.getAsString();
	return retValue;
}

function getDataNodeValue_ALLNFTS(pMapItem, pSubrootNode, pLog) {
	var retValue = "", xPath = "", sTmp = "";
	var targetNode;
	var sMethodName = "getDataNodeValue_ALLVATS";

	//=================================================================
	// REPEAT=ALL_NFTS (usage = NFT):
	// - start with root and use subroot + path1
	// - get all instances of path2, iterate
	//   - for each get values from specific data nodes and populate specific fields in NFTitem objects.
	//   - cond1 and 2 are ignored.
	// - if not found return null, if found return collected value.
	//=================================================================
	
	if (pMapItem.getPath1() == "_NONE_") {
		pLog.Msg = sMethodName + ". Repeat element. XmlPath1 node = _NONE_" + pMapItem.getAsString();
		return null;
	}
	xPath = pMapItem.getPath1();
	var repeatRootNode = pSubrootNode.resolveNode(xPath);
	if (repeatRootNode==null) {
		pLog.Msg = sMethodName + ". Repeat element. Node root not found:" + xPath + ". " + pMapItem.getAsString();
		return null;
	}
	if (pMapItem.getPath2() == "_NONE_" && pMapItem.getDataTag() == "_NONE_") {
		pLog.Msg = sMethodName + ". Repeat node root specified, but path2 and tag both = NON:" + xPath + ". " + pMapItem.getAsString();
		return null;
	}
	if (pMapItem.getMapUsage()!="NFT") {
		pLog.Msg = sMethodName + ". Repeat node root specified (ALL_NFTS), but usage!=NFT:" + pMapItem.getAsString();
		return null;
	}
		
	var sMsg = sMethodName + ". Repeat element. XmlPath1 node = " + xPath + "\r\n";
		
	//=================================================================================
	// For NFT repeat element we find all repeated nodes and make up an array of:
	// an array of objects, each with all these values:
	// {POSNR, NUTRIENT_INT, NUTRIENT_EXT, NUTRIENT_TXT, FLG_SHOW_ITEM, 
	// VALUE_CALC, DECIMALS[_CALC], UNIT_CALC, UNIT_CALC_TXT, 
	// VALUE_DECL, DECIMALS_DECL, UNIT_DECL, UNIT_DECL_TXT}
	//=================================================================================
	var retObject = new Array();
	for (var iNode=0; iNode<repeatRootNode.nodes.length; iNode++) {
		var repeatNode = repeatRootNode.nodes.item(iNode);
		
		//=== if a condition is specified for the repeat - test it and use the only only if TRUE ===
		var oStepMessage = {Msg:""};
		//if (!checkRepeatItemCondition(repeatNode, pMapItem, oStepMessage)) continue;
		
		if (pMapItem.getPath2() != "_NONE_" && pMapItem.getDataTag() != "_NONE_") {
			xPath = pMapItem.getPath2() + "." + pMapItem.getDataTag();
		} else if (pMapItem.getPath2() != "_NONE_" && pMapItem.getDataTag() == "_NONE_") {
			xPath = pMapItem.getPath2();
		} else if (pMapItem.getPath2() == "_NONE_" && pMapItem.getDataTag() != "_NONE_") {
			xPath = pMapItem.getTagData();
		}
		sMsg = sMsg + ". Repeat element. subnode = " + xPath + "\r\n";
		
		targetNode = repeatNode.resolveNode(xPath);

		var oNode = new Object();
		oNode.POSNR = "";
		oNode.NUTRIENT_INT = "";   
		oNode.NUTRIENT_EXT = "";   
		oNode.NUTRIENT_TXT = "";   
		oNode.FLG_SHOW_ITEM = "";  
		oNode.VALUE_CALC = "";     
		oNode.DECIMALS = "";       
		oNode.UNIT_CALC = "";      
		oNode.UNIT_CALC_TXT = "";  
		oNode.VALUE_DECL = "";     
		oNode.DECIMALS_DECL = "";  
		oNode.UNIT_DECL = "";      
		oNode.UNIT_DECL_TXT = ""; 
		oNode.FLG_INITIAL_DECL = "";
								
		if (targetNode!==null) {
			if (pMapItem.getGs1ElementID() == "NFT_NUTRIENT_STD") {
				oNode.POSNR			= commons.ifNullEmpty(targetNode.POSNR.value); 
				oNode.NUTRIENT_INT 	= commons.ifNullEmpty(targetNode.NUTRIENT_INT.value);  
				oNode.NUTRIENT_EXT 	= commons.ifNullEmpty(targetNode.NUTRIENT_EXT.value);
				oNode.NUTRIENT_TXT 	= commons.ifNullEmpty(targetNode.NUTRIENT_TRANSL.RMSLS_XML_TRANSL_NUTR_WUI.NUTRIENT_TXT.value);
				oNode.FLG_SHOW_ITEM = commons.ifNullEmpty(targetNode.FLG_SHOW_ITEM.value);
				oNode.FLG_INITIAL_DECL = commons.ifNullEmpty(targetNode.FLG_INITIAL_DECL.value);
			} else if (pMapItem.getGs1ElementID() == "NFT_NUTRIENT_RDA") {
				oNode.POSNR			= ""; 
				oNode.NUTRIENT_INT 	= commons.ifNullEmpty(targetNode.NUTRIENT.value); 
				oNode.NUTRIENT_EXT 	= "";
				oNode.NUTRIENT_TXT 	= "";
				oNode.FLG_SHOW_ITEM = "";
			}
			oNode.VALUE_CALC 	= commons.ifNullEmpty(targetNode.VALUE_CALC.value);
			oNode.DECIMALS 		= commons.ifNullEmpty(targetNode.DECIMALS.value);
			oNode.UNIT_CALC 	= commons.ifNullEmpty(targetNode.UNIT_CALC.value);
			oNode.UNIT_CALC_TXT = commons.ifNullEmpty(targetNode.UNIT_CALC_TXT.value);
			oNode.VALUE_DECL 	= commons.ifNullEmpty(targetNode.VALUE_DECL.value);
			oNode.DECIMALS_DECL = commons.ifNullEmpty(targetNode.DECIMALS_DECL.value);
			oNode.UNIT_DECL 	= commons.ifNullEmpty(targetNode.UNIT_DECL.value);
			oNode.UNIT_DECL_TXT = commons.ifNullEmpty(targetNode.UNIT_DECL_TXT.value);
		} else {
			var sTmp = sMethodName + ". Repeat node root specified, but on iteration[" + iNode + "] " +
				"path2+tag=" + xPath + " - resolves to null.";
			sMsg = sMsg + "\r\n" + sTmp;
			oNode.POSNR			= "ERROR"; 
			oNode.NUTRIENT_INT 	= "ERROR";  
			oNode.NUTRIENT_EXT 	= "ERROR";
			oNode.NUTRIENT_TXT 	= sTmp;
			oNode.FLG_SHOW_ITEM = "";
			oNode.VALUE_CALC 	= "";
			oNode.DECIMALS 		= "";
			oNode.UNIT_CALC 	= "";
			oNode.UNIT_CALC_TXT = "";
			oNode.VALUE_DECL 	= "";
			oNode.DECIMALS_DECL = "";
			oNode.UNIT_DECL 	= "";
			oNode.UNIT_DECL_TXT = "";
		}
		retObject[iNode] = oNode;
	}
	pLog.Msg = sMsg + "\r\n" + pMapItem.getAsString();
	return retObject;
}	

function checkRepeatItemCondition(repeatNode, pMapItem, pMessage) {
	var condTag1, condTag2, condVal1, condVal2;
	condTag1=pMapItem.getCondTag1();
	condTag2=pMapItem.getCondTag2();
	condVal1=pMapItem.getCondVal1();
	condVal2=pMapItem.getCondVal2();
	if (!(condTag1=="_NONE_" || condTag1=="" || condTag1==null) && !(condVal1=="_NONE_" || condVal1=="" || condVal1==null)) {
		//=== Check cond.1 ===
		if (!checkCond(repeatNode, condTag1, condVal1, pMessage)) return false;
	}
	if (!(condTag2=="_NONE_" || condTag2=="" || condTag2==null) && !(condVal2=="_NONE_" || condVal2=="" || condVal2==null)) {
		//=== Check cond.2 ===
		if (!checkCond(repeatNode, condTag2, condVal2, pMessage)) return false;
	}
	//=== none of cond. specified - return true
	return true;
}

function checkCond(repeatNode, condTag, condVal, pMessage) {
	//=== both condTag, condVal non empty.  ===
	// check repeatNode.condTag = condVal 
	//=========================================
	var condNode = repeatNode.resolveNode(condTag);
	if (condNode!==null) {
		return checkValueInCSV(condNode.value, condVal)
	} else {
		pMessage.Msg = "checkCond. Cond. specified, but repeatNode+condTag=" + condTag + " - resolves to null.";
		return false;
	}
}
function checkValueInCSV(pValue, pCSV) {
	//=== pCSV is either single value or CS-list of values ===
	// returns TRUE if pValue is found in pCSV, FALSE if not
	pValue = commons.RLTrim(pValue).toUpperCase();
	var aCondParts = pCSV.toUpperCase().split(",");	
	for (var i=0; i<aCondParts.length; i++) {
		if (commons.RLTrim(aCondParts[i]) == pValue) return true;
	}
	return false;
}

function getNodeList(pRootNodePath) {
	//=====================================================================
	// Retrieve all sub-nodes from specified node and return names as string.
	//=====================================================================
	var sMethodName = "getNodeList";
	var rootNode;
	var sOut = "";
	rootNode =  xfa.resolveNode(pRootNodePath);
	if (rootNode==null) {
		sOut = "NOT FOUND:" + pRootNodePath;
	} else {
		if (rootNode.nodes) {
			for (var i=0; i<rootNode.nodes.length; i++) {
				sOut = sOut + "\r\n" + rootNode.nodes.item(i).name;
			}
		} else {
			sOut = "(No subnodes)";
		}
	}
	return sOut;
}

function getVatRootNode(pDOMroot, pSubroot, pPath1) {
	// pDOMroot = "abap" or "asprep" - according to the loaded data file.
	// Using DOMroot+subroot+path1 as root locate this node and return to caller.

	var sMethodName = "getVatRootNode";
	var rootNode, vatRootNode;
	
	rootNode = xfa.datasets.resolveNode(pDOMroot);	
	vatRootNode =  rootNode.resolveNode(pSubroot + "." + pPath1);
	return vatRootNode;
}

function getVATnode(pDOMroot, pSubroot, pPath1, pPath2, pKeyTag, pKeyValue, pSeqN) {
	//=============================================================================
	// Locate and return a specific VAT node:
	// - By a given value of key tag (pPath2, pKeyTag, pKeyValue specified, pSeqN=-1)
	// - By SeqN (pSeqN>=0))
	// - By VAT tag name (pPath2="", pKeyTag!="", pKeyValue=="" , pSeqN=-2)
	//
	// pDOMroot = "abap" or "asprep" - according to the loaded data file.
	// Use DOMroot+subroot+path1 as root
	// pSeqN=-1:
	//   go over all instances of <path2>.
	//   locate 1st instance of <path2> where pKeyTag.value=pKeyValue
	//
	// pSeqN>=0:
	//   go over all instances of <path2>.
	//   locate 1st instance of <path2> where [pSeqN]
	//
	// pSeqN=-2:
	//   go over all instances of .nodes
	//   locate 1st instance where .name=pKeyTag
	//
	//=============================================================================

	var sMethodName = "getVATnode";
	var rootNode, vatRootNode;
	pSeqN = parseInt(pSeqN,10);
	
	rootNode = xfa.datasets.resolveNode(pDOMroot);
	if (pPath1=="" || pPath1=="_NONE_")
		vatRootNode = rootNode.resolveNode(pSubroot);
	else
		vatRootNode = rootNode.resolveNode(pSubroot + "." + pPath1);
	
	var sOut = "";
	var aVatKeys = new Array();

	var aVatNodes; 
	if (pPath2!="") {
		aVatNodes = vatRootNode.resolveNodes(pPath2 + "[*]");
	} else {
		aVatNodes = vatRootNode.nodes;
	}
	
	var oVatNode, oVatKeyNode, j=0;
	if (pSeqN=-1 && pKeyValue!="" && pKeyTag!="") {
		for (var i=0; i<aVatNodes.length; i++) {
			oVatNode = aVatNodes.item(i); 		
			oVatKeyNode = oVatNode.resolveNode(pKeyTag);
			if (oVatKeyNode != null && oVatKeyNode.value == pKeyValue) {
				return oVatNode;
			}
		}
	} else if (pSeqN=-2 && pKeyTag!="") {
		for (var i=0; i<aVatNodes.length; i++) {
			oVatNode = aVatNodes.item(i); 		
			if (oVatNode.name==pKeyTag) {
				return oVatNode;
			}
		}
	} else if (pSeqN>=0 ) {
		if (pSeqN<aVatNodes.length) {
			oVatNode = aVatNodes.item(pSeqN); 		
			return oVatNode;
		} else {
			xfa.host.messageBox("getVATnode: pSeqN > aVatNodes.length: " + pSeqN,"",3);
			return null;
		}
	} else {
		xfa.host.messageBox("getVATnode: Incorrect set of parameters","",3);
		return null;
	}
	xfa.host.messageBox("getVATnode: could not find node: " + 
		"pPath1, pPath2, pKeyTag, pKeyValue, pSeqN=" + 
		pPath1 + "/" + pPath2 + "/" + pKeyTag + "/" + pKeyValue + "/" + pSeqN,"",3);
	return null;
}

function getVatInstanceNode(pVat, pVatInstPath, pSeqN, pLog) {
	//===============================================================================	
	//     Work for current node (assumed VAT node above instances):
	//     - return 1st instance with <INSTANCE>=pSeqN
	//	   - if not found return null.
	//===============================================================================	

	var sMethodName = "getVatInstanceNode";
	var oRetVal = null;
	var oInstNode;

	var aInstNodes = pVat.resolveNodes(pVatInstPath + "[*]");
	
	if (aInstNodes==null) {
		pLog.Msg = "=== Inst nodes not found: (aInstNodes=null) ===\r\n";
	} else if (aInstNodes.length==0) {
		pLog.Msg = "=== Inst nodes not found: (aInstNodes.length==0) ===\r\n";
	} else {
		pLog.Msg = "=== Inst nodes. count=" + aInstNodes.length + " ===\r\n";
	}
	pSeqN = parseInt(pSeqN,10);
	for (var i=0; i<aInstNodes.length; i++) {
		oInstNode = aInstNodes.item(i); 	
		var instN = oInstNode.resolveNode("INSTANCE");
		if (instN==null) {
			pLog.Msg = "--- INSTANCE (number) node not found: ---\r\n";
		} else {
			if (parseInt(instN.value,10)!=pSeqN) {
				continue;
			} else {
				//=== this is our actual INST node ===
				oRetVal = oInstNode;
				break;
			}
		}
	}
	//("Subform2[*].NumericField4")
	return oRetVal;
}

function getVATkeys(pDOMroot, pSubroot, pPath1, pPath2, pKeyTag) {
	// pDOMroot = "abap" or "asprep" - according to the loaded data file.
	// Using DOMroot+subroot+path1 as root go over all instances of <path2>.
	// For each collect value from the node <keyTag> and return all these values as string[].

	var sMethodName = "getVATkeys";
	var rootNode, subRootNode;

	//xfa.host.messageBox("getVATkeys("+pDOMroot+","+pSubroot+","+pPath1+","+pPath2+","+pKeyTag+")","",1);
		
	rootNode = xfa.datasets.resolveNode(pDOMroot);	
	subRootNode =  rootNode.resolveNode(pSubroot + "." + pPath1);
	
	var sOut = "";
	var aVatKeys = new Array();

	var aVatNodes = subRootNode.resolveNodes(pPath2 + "[*]");
	var oVatNode, oVatKeyNode, j=0;
	for (var i=0; i<aVatNodes.length; i++) {
		oVatNode = aVatNodes.item(i); 		
		oVatKeyNode = oVatNode.resolveNode(pKeyTag);
		if (oVatKeyNode != null) {
			aVatKeys[j] = oVatKeyNode.value;
			//sOut = sOut + "\r\n" + aVatKeys[j];
			j++;
		}
	}
	//xfa.host.messageBox("aVatKeys="+aVatKeys,"",1);
	
	return aVatKeys;
}

function getVATtags(pDOMroot, pSubroot, pPath1, pPath2) {
	// pDOMroot = "abap" or "asprep" - according to the loaded data file.
	// Using DOMroot+subroot+path1+path2 as root go over all instances of child-nodes.
	// For each collect the name of the node and return all these values as string[].

	var sMethodName = "getVATtags";
	var rootNode, subRootNode;

	//xfa.host.messageBox("getVATkeys("+pDOMroot+","+pSubroot+","+pPath1+","+pPath2+","+pKeyTag+")","",1);
		
	rootNode = xfa.datasets.resolveNode(pDOMroot);	
	
	var sPath1, sPath2;
	sPath1 = pPath1;
	sPath2 = pPath2;
	xPath = "";
	if (sPath1 == "_NONE_") sPath1 = "";
	if (sPath2 == "_NONE_") sPath2 = "";
	if (sPath1!="") xPath = sPath1;
	if (sPath2!="") {
		if (xPath!="") xPath = xPath + ".";
		xPath = xPath + sPath2;
	}
	if (xPath=="") {
		subRootNode = rootNode;
	} else {
		subRootNode = rootNode.resolveNode(pSubroot + "." + xPath);
	}
	if (subRootNode==null)
		xfa.host.messageBox("subRootNode=null, pSubroot=" + pSubroot + ",sPath1=" + sPath1 + "sPath2=" + sPath2,"",3);
		
	var sOut = "";
	var aVatTags = new Array();

	var aVatNodes = subRootNode.nodes;
	var j=0;
	for (var i=0; i<aVatNodes.length; i++) {
		aVatTags[j] = aVatNodes.item(i).name;
		//sOut = sOut + "\r\n" + aVatKeys[j];
		j++;
	}
	//xfa.host.messageBox("aVatKeys="+aVatKeys,"",1);
	return aVatTags;
}

function getCharsAndTexts(pVatInstNode, pMapItem, pSep, pLog) {
	//===============================================================================	
	//     Work for current instance (pVatInstNode):
	//     - use PATH_CHAR (=path to characteristic) to iterate thru all characteristics of this instance.
	//     - for each characteristic:
	//       - locate char name, value, text type, value CHAR_NAME_TAG,CHAR_VAL_TAG, TEXT_TYPE_TAG, TEXT_VAL_TAG
	//       - make up one char result (text-part) = {char-name: char-value; text-value}
	//    - several characteristic nodes maybe different characteriscs or the same characteristic in several values.
	//    - if needed use COND(tag,value) to filter only desired characteristics
	//    - join all one-char-value results (from one VAT instance) with {pSep}
	//===============================================================================	

	var sMethodName = "getCharsAndTexts";
	var sOut = "";
	var aCharNodes, oCharNode;
	var sTextPart;
	var pTDformat = {fmt: ""};
		
	if (pMapItem.getPathChar() == null || pMapItem.getPathChar()=="" ) {
		//=== Special case when char values are not enclosed in CHAR-NODE ===
		oCharNode = pVatInstNode;
		sTextPart = getCharValueAndText(oCharNode, pMapItem, pTDformat);
		return sTextPart;
		
	} else {
		aCharNodes = pVatInstNode.resolveNodes(pMapItem.getPathChar() + "[*]");
		if (aCharNodes==null) {
			pLog.Msg = "=== Char nodes " + pMapItem.getPathChar() + " not found: (aCharNodes=null) ===\r\n";
		} else if (aCharNodes.length==0) {
			pLog.Msg = "=== Char nodes " + pMapItem.getPathChar() + " not found: (aCharNodes.length==0) ===\r\n";
		} else {
			pLog.Msg = "=== Char nodes. " + pMapItem.getPathChar() + ", count=" + aCharNodes.length + 
				", pSep=" + pSep + " ===\r\n";
		}
		
		for (var i=0; i<aCharNodes.length; i++) {
			oCharNode = aCharNodes.item(i); 		
			//    - if needed use COND(tag,value) to filter only desired characteristics
			var oStepMessage = {Msg:""};
			if (!checkRepeatItemCondition(oCharNode, pMapItem, oStepMessage)) {
				pLog.Msg = pLog.Msg + "=== node[" + i + "] skipped by condition ===\r\n";
				continue;
			}
	
			//== locate char name, value, text type, value and get result (text-part) = {char-name: char-value; text-value}
			sTextPart = getCharValueAndText(oCharNode, pMapItem, pTDformat);
			pLog.Msg = pLog.Msg + "=== node[" + i + "]. sTextPart=" + sTextPart + ". pTDformat=" + pTDformat.fmt + " ===\r\n";
			
			if (sTextPart != "") {
				if (sOut=="") {
					sOut = sOut + sTextPart;
				} else {
					//=== TDFORMAT controls break-down of long texts in XML: 
					//    "*": start of text, "=": line broken inside word - no blank required, line broken on a word or empty - blank reqiuired
					if (pTDformat.fmt=="_NONE_") {
						sOut = sOut + pSep + sTextPart;
					} else if (pTDformat.fmt=="=" || pTDformat.fmt=="*") {
						sOut = sOut + sTextPart;
					} else if (pTDformat.fmt=="") {
						sOut = sOut + " " + sTextPart;
					}
				}
			}
		}
		return sOut;
	}
}

function getCharValueAndText(pCharNode, pMapItem, pTDformat) {
	var retValue = "", sTmp;
	var aValNode;

	pTDformat.fmt = "_NONE_";	
	
	if (commons.ifNullEmpty(pMapItem.getCharNameTag())!="") {
		aValNode = pCharNode.resolveNode(pMapItem.getCharNameTag());
		if (aValNode!=null) {
			sTmp = commons.ifNullEmpty(aValNode.value);
			if (sTmp!="" && pMapItem.getCharNameTag() != "TDFORMAT") {
				retValue = sTmp;
			} else  if (sTmp!="" && pMapItem.getCharNameTag() == "TDFORMAT") {
				//=== TDFORMAT controls break-down of long texts in XML: 
				//    "*": start of text, "=": line broken inside word - no blank required, line broken on a word or empty - blank reqiuired
				//    All processing done outside in the caller, here just return result code				
				//pTDformat = sTmp;	
				pTDformat.fmt = sTmp;	
				retValue = "";
			}
		}
	}
	if (commons.ifNullEmpty(pMapItem.getCharValTag())!="") {
		aValNode = pCharNode.resolveNode(pMapItem.getCharValTag());
		if (aValNode!=null) {
			sTmp = commons.ifNullEmpty(aValNode.value);
			if (retValue!="") retValue = retValue + ": ";
			retValue = retValue + sTmp;
		}	
	}
	if (commons.ifNullEmpty(pMapItem.getTextValTag())!="") {
		aValNode = pCharNode.resolveNode(pMapItem.getTextValTag());
		if (aValNode!=null) {
			sTmp = commons.ifNullEmpty(aValNode.value);
			if (retValue!="") retValue = retValue + ":: ";
			retValue = retValue + sTmp;
		}
	}
	return retValue;
}

function getDataXmlNodeValueNFT(pMapItem) {
	//=== TODO: ===
	// Retrieve value from data XML for NFT item based on mapping item pMapItem
	// For NFT items only
}

function getVATnode_OLD(pDOMroot, pSubroot, pPath1, pPath2, pKeyTag, pKeyValue, pSeqN) {
	// pDOMroot = "abap" or "asprep" - according to the loaded data file.
	// Using DOMroot+subroot+path1 as root go over all instances of <path2>.
	// Locate 1st instance of <path2> where:
	// - if pKeyValue!="": pKeyValue = pKeyTag.value
	// - if pSeqN>=0     : [pSeqN]

	var sMethodName = "getVATnode";
	var rootNode, vatRootNode;
	
	rootNode = xfa.datasets.resolveNode(pDOMroot);	
	vatRootNode =  rootNode.resolveNode(pSubroot + "." + pPath1);
	
	var sOut = "";
	var aVatKeys = new Array();

	var aVatNodes; 
	if (pPath2!="") {
		aVatNodes = vatRootNode.resolveNodes(pPath2 + "[*]");
	} else {
		aVatNodes = vatRootNode.nodes;
	}
	var oVatNode, oVatKeyNode, j=0;
	if (pKeyValue!="" && pSeqN==-1) {
		for (var i=0; i<aVatNodes.length; i++) {
			oVatNode = aVatNodes.item(i); 		
			oVatKeyNode = oVatNode.resolveNode(pKeyTag);
			if (oVatKeyNode != null && oVatKeyNode.value == pKeyValue) {
				return oVatNode;
			}
		}
	} else if (pSeqN>-1) {
		oVatNode = aVatNodes.item(pSeqN); 		
		return oVatNode;
	} 
	return null;
}

//=== END: dataXML access object utility methods ===