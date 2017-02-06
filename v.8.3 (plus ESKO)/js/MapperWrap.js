//=== BEGIN: Mapper Declaration ===
//=== v.8.3 Dec 27, 2016 ===
//    fixed comment in loadFromXML()
//Mapper {items[]: MapItem}
function Mapper() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 
	var seqN = 0;
	var items = new Array();
	var itemKeys = new Array();

	// Declare these functions and make them public
	this.setItem 		= function(key, indx, pData) 	{
		 key = commons.RLTrim(key).toUpperCase();
		 items[key] 	= pData;
		 itemKeys[indx] = key;
	}
	this.getItem 		= function(key) 		{ return items[commons.RLTrim(key).toUpperCase()]; }
	this.getItemCount	= function ()	 		{ 
		//return items.length ; 	
		//=== items becomes object, not Array after assigning itmes[key] = value, so we can't return .length
		return commons.getPropertyCount(items);
	}	

	this.getItemByIndx  = function(indx) {
		if (itemKeys.length>0) {
			var key = itemKeys[indx];
			return items[key];
		} else {
			return null;
		}
	}
	
	this.getAsString	= function (pOutFrom, pOutTo, pKeyOnly)	 { 
		var sOut = "======= Mapper contents: =======\r\n";
		sOut = sOut + "=== itemKeys.length=" + itemKeys.length + "\r\n";
		sOut = sOut + "=== .getItemCount=" + commons.getPropertyCount(items) + "\r\n";
		sOut = sOut + "==============================\r\n"
		for (var i=0; i<itemKeys.length; i++) {
			if ((pOutFrom>=0 && pOutTo>=0 && i>=pOutFrom && i<=pOutTo) || (pOutFrom<0 && pOutTo<0)) {
				var oMapItem = items[itemKeys[i]];
			    sOut = sOut + "\r\n=== MapItem [" + i + "] ==="  + "\r\n";
			    sOut = sOut + "itemKeys[i]      =" + itemKeys[i] + "\r\n";
			    sOut = sOut + "MapItem.getKey   =" + oMapItem.getKey() + "\r\n";
			    sOut = sOut + "Mapper.getItemKey=" + MapperWrap.getItemKey(oMapItem.getSectionID(), oMapItem.getGs1ElementID(), oMapItem.getVatKeyValue()) + "\r\n";
				if (pKeyOnly==false) {
					sOut = sOut + oMapItem.getAsString() + "\r\n";
				}
			}
				
		}
		return sOut;
	}

}
{   // add braces to hide this declaration in Reader

    var Instance = new Mapper();
}
function newItem() {
    return new Mapper();
}

function setItem(key, indx, pData) 	{ Instance.setItem(key, indx, pData) ; }	

function getItem(key) 				{ return Instance.getItem(key) ; }	
function getItemByIndx(indx) 		{ return Instance.getItemByIndx(indx) ; }	

function getItemCount() 			{ return Instance.getItemCount() ; }	
function getAsString(pOutFrom, pOutTo, pKeyOnly)	{ return Instance.getAsString(pOutFrom, pOutTo, pKeyOnly); }

function getItemKey(sectionID, gs1ElementID, vatKey) {
	return "key:" + commons.RLTrim(sectionID).toUpperCase() + ":" + commons.RLTrim(gs1ElementID).toUpperCase() +
	":" + commons.RLTrim(vatKey).toUpperCase();
}

function loadFromXML(pPath, pFileXML, poDiag, pCheck, pRefObject) {
	/***********************************************************
	* Description:
	* - Load specified XML file (Path,name) and places it under the specified ref. object.
	*	This can be any XML file.
	* - The file is loaded into string, then string loaded into XML structure
	*   and saved in xfa.datasets or specified subtree and becomes part od XML DOM: 
	*	- xfa.datasets.XXX, where XXX - root of the XML
	*	or
	*	- <pRefObject>.XXX, where XXX - root of the XML
	* Params:
	* - pPath, pFileXML - file location and name. If path is empty, use current folder.
	* - poDiag = Object {Output1: field, Output2: field, LogErrorInNote: bool, AbapNodeReplaced:bool, ViewState:string, XmlTypeOK:bool}
	* - [pCheck] = root node: 
	*   <MAP_SECTIONS for MAP.xml (default)
	*   <artwork_content:artworkContentMessage for ESKO.XML
	* - [pRefObject] - the object of type Node - normally somewhere in xfa.datasets hierarchy.
	*   default = xfa.datasets
	***********************************************************/
	
	//=== load data XML into to string, use trusted function (folder scripts) ===
	var strTextData = trustedReadFileToString(pPath, pFileXML);
	//m_xmlMapSections.value = strTextData;
	if (m_debug.value == "DEBUG") poDiag.Output1.rawValue = strTextData;
	
	// use this to set b to a default value (using truthy comparison)
	// b = b || "default value";
	pCheck = pCheck || "<MAP_SECTIONS";
	pRefObject = pRefObject || xfa.datasets;
	
	var XMLtype = "";
	if (pCheck=="<MAP_SECTIONS")
		XMLtype="MAP";
	else
		XMLtype="ESKO";
	
	/* === check data XML: must contain MAP_SECTIONS === */
	if (strTextData.indexOf(pCheck) < 0) {
		poDiag.XmlTypeOK=false;
		return;
	}
	poDiag.XmlTypeOK=true;
	pRefObject.loadXML(strTextData, false, false);                                   
	//xfa.datasets.saveXML(); -- not needed, it simply formats string
	if (m_debug.value == "DEBUG") {                                                      
		xfa.host.messageBox("Data loaded from the " + XMLtype + " XML.", "",3);
	}
}

function buildMapper(pDOMroot, pRootValue, poMapper, pDoAllVats, piOutFrom, piOutTo) {
//============================================================
// 1) Read the XML from pRootValue + ".MAP_SECTIONS (xfa.datasets.mastercopy_mapping.MAP_SECTIONS)
// 2) Build the hashmap of MapItem objects, indexed by .getKey = functin(SectionID, Gs1ElementID, vatKey) 
// 3) pDoAllVats=TRUE:  For each MapItem object that has repeat=ALLVATS:
//    - discover all VAT keys using poDataXML
//    - create as many additional MapItem objects as needed and assign vatKey value to each
//============================================================
	
	var xmlSections = xfa.datasets.resolveNode(pRootValue + ".MAP_SECTIONS");
	
	var numberOfNodes = xmlSections.nodes.length;  
//	xfa.host.messageBox("numberOfNodes =" + numberOfNodes , "",3);
	
	var itemSectioNodes = xmlSections.resolveNodes("MAP_SECTION[*]");
//	xfa.host.messageBox("itemSectioNodes.length = " + itemSectioNodes.length, "",3);

	var aFldNames = getFldNames();
	var oMapItem;

	var sOut = "";
	var iIndx = 0;
	for (var i=0; i < itemSectioNodes.length; i++) {
	    var itemSection = xmlSections.resolveNode("MAP_SECTION[" + i + "]");
	    
	    var aFldNames = MapperWrap.getFldNames();
	    var oFieldMap = MapperWrap.itemFieldsFromXML(itemSection, aFldNames);
	    
	    if (oFieldMap['GS1_CAT_CODE']==null || oFieldMap['GS1_CAT_SEQN']==null || oFieldMap['GS1_ELEMENT']==null) continue;
	    if (oFieldMap['GS1_CAT_CODE']=="_NA" || oFieldMap['GS1_CAT_SEQN']=="_NA" || oFieldMap['GS1_ELEMENT']=="_NA") continue;

	    if (oFieldMap['LBL_EQUIV']==null) oFieldMap['LBL_EQUIV']=="";
	    
	    var aVatKeys = null, 
	    	aVatTags = null;
	    if (oFieldMap['PROC_TYPE']=="ALL_VATS_BY_KEY" && pDoAllVats==true) {			
			//============================================================
			// For each MapItem object that has repeat=ALL_VATS_BY_KEY:
			// - discover all VAT keys using poDataXML
			// - create as many additional MapItem objects as needed and assign vatKey value to each
			//============================================================
			aVatKeys = XMLDAO.getVATkeys(pDOMroot, oFieldMap['XML_SUBROOT'], oFieldMap['XML_PATH1'], oFieldMap['XML_PATH2'], oFieldMap['VAT_KEY_TAG']);
			
	    } else if (oFieldMap['PROC_TYPE']=="ALL_VATS_BY_TAG" && pDoAllVats==true) {			
			//============================================================
			// For each MapItem object that has repeat=ALL_VATS_BY_TAG:
			// - discover all VAT tags using poDataXML
			// - create as many additional MapItem objects as needed and assign vatKeyTag value to each
			//============================================================
			aVatTags = XMLDAO.getVATtags(pDOMroot, oFieldMap['XML_SUBROOT'], oFieldMap['XML_PATH1'], oFieldMap['XML_PATH2']);
			
	    }
	
	    if (i>0) sOut = sOut + "\r\n";
	    
	    if (piOutFrom>=0 && i < piOutFrom) continue;
	    if (piOutTo>=0 && i > piOutTo) continue;
		    	
		oMapItem = MapItemWrap.newItem();
		//=== Set all fields of new item except: VatKeyValue and dealing with multiple items for VATS ===
		oMapItem.setAllFromHash(oFieldMap);

		if (oMapItem.getProcType()!="ALL_VATS_BY_KEY" && oMapItem.getProcType()!="ALL_VATS_BY_TAG") {
			oMapItem.setVatKeyValue ("_NONE_");    
		}	//=== for ALLVATS this will be set in code below
			    	
	    sOut = sOut + "=== MapItem [" + i + "] ==="  + "\r\n";
	    //sOut = sOut + oMapItem.getAsString();
	    sOut = sOut + ".getKey=" + oMapItem.getKey()  + "\r\n";
	    sOut = sOut + "Mapper.getItemKey=" + MapperWrap.getItemKey(oMapItem.getSectionID(), oMapItem.getGs1ElementID(), oMapItem.getVatKeyValue());

		if (oMapItem.getProcType()=="ALL_VATS_BY_KEY" && pDoAllVats==true) {
			if (aVatKeys==null || aVatKeys.length==0) {
				sOut = sOut + "\r\n======> ERROR: cannot locate list of VATs for ALL_VATS_BY_KEY mapping element! Element ignored!";
				continue;
			} else if (aVatKeys!=null && aVatKeys.length>0) {
				sOut = sOut + "\r\n\===VAT-KEYS: " + aVatKeys.join(",");
			}
		} else if (oMapItem.getProcType()=="ALL_VATS_BY_TAG" && pDoAllVats==true) {
			if (aVatTags==null || aVatTags.length==0) {
				sOut = sOut + "\r\n======> ERROR: cannot locate list of VATs for ALL_VATS_BY_TAG mapping element! Element ignored!";
				continue;
			} else if (aVatTags!=null && aVatTags.length>0) {
				sOut = sOut + "\r\n\===VAT-TAGS: " + aVatTags.join(",");
			}
		}
	
		if (oMapItem.getProcType()!="ALL_VATS_BY_KEY" && oMapItem.getProcType()!="ALL_VATS_BY_TAG") {
			poMapper.setItem(oMapItem.getKey(), iIndx, oMapItem); 		
			iIndx++;

		} else if(oMapItem.getProcType()=="ALL_VATS_BY_KEY" && pDoAllVats==true) {
			//=== use MapItem.vatKey field to store actual VAT key in XML ===
			//    create as many additional MapItem objects as needed and copy all fields except vatKey
			
			oMapItem.setVatKeyValue (aVatKeys[0]);    
			var commonLblEquiv = oMapItem.getLblEquiv();
			oMapItem.setLblEquiv (commonLblEquiv + " - " + aVatKeys[0]);
			
			poMapper.setItem(oMapItem.getKey(), iIndx, oMapItem); 		
			iIndx++;
			
			if (aVatKeys.length>1) {
				for (var j=1; j<aVatKeys.length; j++) {
					var oMapVatItem = MapItemWrap.newItem();
					
					oMapVatItem.setAllFromMapItem(oMapItem);
					oMapVatItem.setLblEquiv (commonLblEquiv + " - " + aVatKeys[j]);
					oMapVatItem.setVatKeyValue (aVatKeys[j] );                        	     
					poMapper.setItem(oMapVatItem.getKey(), iIndx, oMapVatItem); 		
					iIndx++;
				}
			}
		} else if(oMapItem.getProcType()=="ALL_VATS_BY_TAG" && pDoAllVats==true) {
			//=== use MapItem.vatKey field to store actual VAT tag in XML ===
			//    create as many additional MapItem objects as needed and copy all fields except vatKey
			
			oMapItem.setVatKeyTag (aVatTags[0]);    
			oMapItem.setVatKeyValue (aVatTags[0]);    		//=== need this to have .getKey() working properly
			var commonLblEquiv = oMapItem.getLblEquiv();
			oMapItem.setLblEquiv (commonLblEquiv + " - " + aVatTags[0]);
			
			poMapper.setItem(oMapItem.getKey(), iIndx, oMapItem); 		
			iIndx++;
			
			if (aVatTags.length>1) {
				for (var j=1; j<aVatTags.length; j++) {
					var oMapVatItem = MapItemWrap.newItem();

					oMapVatItem.setAllFromMapItem(oMapItem);
					oMapVatItem.setLblEquiv (commonLblEquiv + " - " + aVatTags[j]);
					oMapVatItem.setVatKeyTag (aVatTags[j]);    
					oMapVatItem.setVatKeyValue (aVatTags[j] );                        	     
					poMapper.setItem(oMapVatItem.getKey(), iIndx, oMapVatItem); 		
					iIndx++;
				}
			}
		}
	} 
	return sOut;

}
function itemFieldsFromXML(pXMLitemFields, aFldNames) {
/*=====================================================	
* Using the pXMLitemFields (set of mapping fields in the mapping XML row)
* return  hashMap object with all these values - later to populate MapItem object
* The keys of the map are matching the columns of the mapping EXCEL and tags of mapping XML
*
=======================================================*/
    var oMap = new Object();
    var oXMLnode;
	for (var i=0; i<aFldNames.length; i++) {
		oXMLnode = pXMLitemFields.resolveNode(aFldNames[i]);
		oMap[aFldNames[i]] = commons.ifNullEmpty(oXMLnode.value);
	}
	return oMap;
}

function getFldNames() {
/*=====================================================	
* Return keys for the map and matching the columns 
* of the mapping EXCEL and tags of mapping XML
=======================================================*/
	var aFldNames = ['ID', 'GS1_CAT_CODE', 'GS1_CAT_NAME', 'GS1_CAT_SEQN', 'GS1_ELEMENT', 'LBL_EQUIV', 'GS1_EL_SEQN', 
	    'MAP_USAGE', 'PROC_TYPE', 'XML_SUBROOT', 'XML_PATH1', 'XML_PATH2', 'VAT_KEY_TAG', 'DATA_TAG',
		'COND1_TAG', 'COND1_VAL', 'COND2_TAG', 'COND2_VAL',
		'PATH_MINST', 'PATH_CHAR', 
		'CHAR_NAME_TAG', 'CHAR_VAL_TAG', 'TEXT_NAME_TAG', 'TEXT_VAL_TAG',
		'TITLE_EN', 'TITLE_FR', 'IPC_ELEMENT', 'M_INST_SEP', 'M_CHAR_SEP'];
	return aFldNames;
}

//=== END: Mapper Declaration ===
