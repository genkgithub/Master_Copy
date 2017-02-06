//=== Work with NFT sections - subforms ===
//=== v.8.2 July 2, 2015 ===

//1) NFT sections are subforms wrapped into one flowing subform: 
//    subMain { subNFT[0], subNFT[1], ...}. They are placed after all subMain[...]
//2) each subNFT is matched by an object NFTSection:
//   unique subNFT.subNFTHeader.txtLabelFormat  = NFTSection.getKey()
//3) In this script block we have methods to:
//   - count sections
//   - add section
//   - get section by number or key
//   - populate section from NFTSection object
//4) v.7: using NFT templates and reloading NFT after data editing
//========================================================================

function getSectionCount(pForm, pPage, pSubForm1, pSubForm2) {
	/*===============================================
	PARAMS:
		psForm, psPage, psSubForm - NAMES of form, page, subform (all subforms of the same name)
	RETURNS:
		Row count.
	==================================================*/
	var sFullName = pForm + "." + pPage + "." + pSubForm1 + "." + pSubForm2;
	var oNode = xfa.resolveNode(sFullName);
	return oNode.instanceManager.count;	
}

function addSection(pForm, pPage, pSubForm1, pSubForm2) {
//===============================================
//PARAMS:
//	psForm, psPage, psSubForm - NAMES of form, page, subform
//ACTIONS:
//	Add 1 section at end. 
//RETURNS:
//	Newly added section.
//==================================================
	var sFullName = pForm + "." + pPage + "." + pSubForm1 + "." + pSubForm2;
	var oNode = xfa.resolveNode(sFullName);
	var oNewSection = oNode.instanceManager.addInstance(true);	
	xfa.form.recalculate(true);
	return oNewSection;
}

function getSection(pForm, pPage, pSubForm1, pSubForm2, piSectionNumber, psSectionKey) {
	//===============================================
	//PARAMS:
	//	psForm, psPage, psSubForm, - NAMES of form, page, subform
	//	piSectionNumber - if >=0, use as section index
	//	psSectionKey - if <>"", use it as section key (SectionName)
	//  psSectionKey="" AND piSectionNumber=-1 ===> use pForm, pPage, pSubForm1, pSubForm2 as unique path
	//ACTIONS:
	//	Locate section with number piSectionNumber or key psSectionKey and return. 
	//RETURNS:
	//	Located section.
	//==================================================
	var sFullName = pForm + "." + pPage + "." + pSubForm1 + "." + pSubForm2;
	var oNode = xfa.resolveNode(sFullName);

	if (psSectionKey!="") {
		//=== locate section by SectionName field ===
		for (var i=0; i < oNode.instanceManager.count; i++) {
			var oSectionItem = oNode.resolveNode(pSubForm2 + "[" + i + "]");
			if (oSectionItem.txtLabelFormat.rawValue == psSectionKey) {
				return oSectionItem;
			}
		}
		return null;
	} else if (piSectionNumber>=0) {
		//=== locate section by piSectionNumber ===
		var oSectionItem = oNode.resolveNode(pSubForm2 + "[" + piSectionNumber + "]");
		return oSectionItem;
	} else if (piSectionNumber=-1) {
		var oSectionItem = oNode;
		return oSectionItem;
	}	
	return null;
}

function removeSection(pForm, pPage, pSubForm1, pSubForm2, piSectionNumber, psSectionKey) {
//===============================================
//PARAMS:
//	psForm, psPage, psSubForm - NAMES of form, page, subform
//	piSectionNumber - if >=0, use as section index
//	psSectionKey - if <>"", use it as section key (SectionName)
//ACTIONS:
//	Locate section with number piSectionNumber or key psSectionKey and remove. 
//RETURNS:
//	true if found, false if not.
//==================================================
	var sFullName = pForm + "." + pPage + "." + pSubForm1 + "." + pSubForm2;
	var oNode = xfa.resolveNode(sFullName);

	if (psSectionKey!="") {
		//=== locate section by SectionName field ===
		for (var i=0; i < oNode.instanceManager.count; i++) {
			var oSectionItem = oNode.resolveNode(pSubForm2 + "[" + i + "]");
			if (oSectionItem.txtLabelFormat.rawValue == psSectionKey) {
				oNode.instanceManager.removeInstance(i);
				return true;
			}
		}
		return false;
	} else {
		//=== locate section by piSectionNumber ===
		var oSectionItem = oNode.resolveNode(pSubForm2 + "[" + piSectionNumber + "]");
		if (oSectionItem != undefined && oSectionItem!=null) {
			oNode.instanceManager.removeInstance(piSectionNumber);
			return true;
		} else {
			return false;
		}
	}	
}

function getSectionRowCount(pSection, psTableSub, psTable, psRow) {
	/*===============================================
	PARAMS:
		pSection - section object
		psTable, psRow - NAMES of table and row nodes
	ACTIONS:
		Locate table in the section and get row count. 
	RETURNS:
		Row count.
	==================================================*/
	var oTableSub = pSection[psTableSub];
	
	var oTableNode = oTableSub.resolveNode(psTable);
	var oRowNode = oTableNode.resolveNode(psRow);

	var oRowItems = oRowNode.resolveNodes(psRow + "[*]");
	return oRowItems.length;
}

function getSectionRow(pSection, psTableSub, psTable, psRow, piRowNumber, psRowKey) {
	/*===============================================
	PARAMS:
		pSection - section object
		psTable, psRow - NAMES of table and row nodes
		piRowNumber - if >=0, use as row index
		psRowKey - if <>"", use it as row tag
	ACTIONS:
		Locate row with number psRowTag or psRowLblEquiv. 
	RETURNS:
		Located row.
	==================================================*/
	var oTableSub = pSection[psTableSub];
//	var oTableNode = oTableSub[psTable];
//	var oRowNode = oTableNode[psRow];
	
	var oTableNode = oTableSub.resolveNode(psTable);
	var oRowNode = oTableNode.resolveNode(psRow);

	if (psRowKey!="") {
		//=== locate row by LblEquiv field ===
		for (var i=0; i < oRowNode.instanceManager.count; i++) {
			var oRowItem = oRowNode.resolveNode(psRow + "[" + i + "]");
			if (oRowItem.rowKey.rawValue == psRowKey) {
				return oRowItem;
			}
		}
		return null;
	} else {
		//=== locate row by piRowNumber ===
		var oRowItem = oRowNode.resolveNode(psRow + "[" + piRowNumber + "]");
		return oRowItem;
	}	
}

function addSectionRow(pSection, psTableSub, psTable, psRow) {
	/*===============================================
	PARAMS:
		pSection - section object - the subNFT
		psTable, psRow - NAMES of table and row nodes
	ACTIONS:
		Add empty row after at the end. 
	RETURNS:
		Newly added row.
	==================================================*/
	var oTableSub = pSection[psTableSub];
	var oTableNode = oTableSub[psTable];
	var oRowNode = oTableNode[psRow];
	var oNewRow = oRowNode.instanceManager.addInstance(true);	
	return oNewRow;
}

function moveSectionRow(pSection, psTableSub, psTable, psRow, piFrom, piTo) {
	/*===============================================
	PARAMS:
		pSection - section object - the subNFT
		psTable, psRow - NAMES of table and row nodes
	ACTIONS:
		Move row from piFrom to piTo. 
	RETURNS:
		void.
	==================================================*/
	var oTableSub = pSection[psTableSub];
	var oTableNode = oTableSub[psTable];
	var oRowNode = oTableNode[psRow];
	oRowNode.instanceManager.moveInstance(piFrom, piTo);	
	return;
}

function insertSectionRow(pSection, psTableSub, psTable, psRow, piPosition) {
	/*===============================================
	PARAMS:
		pSection - section object - the subNFT
		psTable, psRow - NAMES of table and row nodes
	ACTIONS:
		Add empty row after at the end. 
	RETURNS:
		Newly added row.
	==================================================*/
	var oTableSub = pSection[psTableSub];
	var oTableNode = oTableSub[psTable];
	var oRowNode = oTableNode[psRow];
	var oNewRow = oRowNode.instanceManager.insertInstance(piPosition, true);	
	return oNewRow;
}

function removeSectionRow(pSection, psTableSub, psTable, psRow, piRowNumber, psRowKey) {
	/*===============================================
	PARAMS:
		pSection - section object
		psTable, psRow - NAMES of table and row nodes
		piRowNumber - if >=0, use as row index
		psRowKey - if <>"", use it as row tag
	ACTIONS:
		Locate row with number psRowTag or psRowLblEquiv and remove it.
	RETURNS:
		true if found and false if not.
	==================================================*/
	var oTableSub = pSection[psTableSub];
	var oTableNode = oTableSub[psTable];
	var oRowNode = oTableNode[psRow];
	if (psRowKey!="") {
		//=== locate row by LblEquiv field ===
		for (var i=0; i < oRowNode.instanceManager.count; i++) {
			var oRowItem = oRowNode.resolveNode(psRow + "[" + i + "]");
			if (oRowItem.rowKey.rawValue == psRowKey) {
				oRowNode.instanceManager.removeInstance(i);
				return true;
			}
		}
		return false;
	} else {
		//=== locate row by piRowNumber ===
		var oRowItem = oRowNode.resolveNode(psRow + "[" + piRowNumber + "]");
		if (oRowItem != undefined && oRowItem!=null) {
			oRowNode.instanceManager.removeInstance(piRowNumber);
			return true;
		} else {
			return false; 
		}
	}	
}

function populateSection(pFormSection, pDataSection, psTableSub, psTable, psRow, pFirstLoad, pCommonLog) {
	/*===============================================
	PARAMS:
		pFormSection - section object on form (subForm)
		pDataSection - NFTSection object (data)
		psTable, psRow - names of section, table and row in form
		pFirstLoad = true: 1st load of data, false: re-load
	ACTIONS:
		Populate given section with data from given object pDataSection. 
	==================================================*/

	//=== show/hide columns in debug mode ===
	var oTableNode = pFormSection[psTableSub][psTable];
	var oHeaderRow = oTableNode.HeaderRow;
	if (m_debug.value=="DEBUG") {
		oTableNode.columnWidths="20.37mm 40.982mm 21.43mm 25.93mm 16.669mm 18.12mm 18.12mm 18.12mm 18.12mm 18.12mm ";
		oTableNode.HeaderRow.nutrInt.presence="visible";
		oTableNode.HeaderRow.rcdType.presence="visible";
		oTableNode.HeaderRow.qtyHdn.presence="visible";
		oTableNode.HeaderRow.pdvHdn.presence="visible";
	} else {
		//=== Make visible columns wider for non-DEBUG ===
		oTableNode.columnWidths="20.37mm 40.75mm 21.43mm 25.93mm 16.669mm 18.12mm 0mm 0mm 0mm 0mm";
		oTableNode.HeaderRow.nutrInt.presence="hidden";
		oTableNode.HeaderRow.rcdType.presence="hidden";
		oTableNode.HeaderRow.qtyHdn.presence="hidden";
		oTableNode.HeaderRow.pdvHdn.presence="hidden";
	}
	var sLog = "";	
	if (pFirstLoad) {
		//========================================================
		// 1st load: 
		// - remove all rows, then go by the data items and keep adding rows 
		//   and copy data to each row
		//========================================================
		
		sLog = sLog + "=== 1st load of NFT data ===";
		
		pFormSection.subNFTheader.subTop.txtLabelFormat.rawValue = pDataSection.getLblFormat();
		pFormSection.subNFTheader.subSrvSize.txtSrvSize1.rawValue = pDataSection.getSrvSizeForOutput ();
		//pFormSection.subNFTheader.subSrvSize.txtSrvSize2.rawValue = pDataSection.getSrvSizeForOutput ();
		
		//=== These 2 fields are actually loaded from the NFT template and should not be overwritten ===
		//    More: the pDataSection.getHeaderRW()fields are actually not loaded from data XML, so they are empty
		//    So in all cases we just leave the values loaded from the template and possible edited by user
		//pFormSection.subNFTheader.subRWhdr.txtHeader_EN.rawValue = pDataSection.getHeaderRW ("EN");	
		//pFormSection.subNFTheader.subRWhdr.txtHeader_FR.rawValue = pDataSection.getHeaderRW ("FR");	
		
		pFormSection.subNFTfooter.txtFooterRO.rawValue = pDataSection.getFooterRO ();
		pFormSection.subNFTfooter.txtFooter_EN.rawValue = pDataSection.getFooterRW ("EN");	
		pFormSection.subNFTfooter.txtFooter_FR.rawValue = pDataSection.getFooterRW ("FR");	
		//=== remove all rows except [0] ===
		for (var i=pDataSection.getItemCount()-1; i>0; i--) {
			var oRow = removeSectionRow(pFormSection, psTableSub, psTable, psRow, i, "");
		}
		var iRow=0;
		for (var iItem=0; iItem < pDataSection.getItemCount(); iItem++) {
			var oDataItem = pDataSection.getItemBySeqN(iItem);
			sLog = sLog + "\r\n=== oDataItem[" + iItem + "], key=" + oDataItem.getKey() + oDataItem.getAsString();
			
			if (oDataItem.getFlgShowItem()!="X") {
				continue;
			}
			var oRow;
			if (iRow>0) {
				oRow = addSectionRow(pFormSection, psTableSub, psTable, psRow);
			} else {
				oRow = getSectionRow(pFormSection, psTableSub, psTable, psRow, iRow, "");
			}
			NFTItemToRow(oRow, oDataItem);
			sLog = sLog + "\r\n=== DataItem copied to FormRow [" + iRow + "], key=" + oRow.rowKey.rawValue + " ===";
			iRow++;
		}
	} else {
		//========================================================
		// re-load
		// - go by the data items, for each locate already existing row in form section
		// - use specId(SpecID) to locate form section row 
		//   then copy data to each row
		//========================================================

		sLog = sLog + "=== Re-load of NFT data ===";
		var iRow=0;
		for (var iItem=0; iItem < pDataSection.getItemCount(); iItem++) {
			var oDataItem = pDataSection.getItemBySeqN(iItem);
			sLog = sLog + "\r\n=== oDataItem[" + iItem + "], key=" + oDataItem.getKey() + oDataItem.getAsString();
			if (oDataItem.getFlgShowItem()!="X") {
				continue;
			}
			var oRow, sRowKey;
			sRowKey = oDataItem.getKey();
			oRow = getSectionRow(pFormSection, psTableSub, psTable, psRow, -1, sRowKey);
			NFTItemToRow(oRow, oDataItem);
			sLog = sLog + "\r\n=== DataItem copied to FormRow [" + iRow + "], key=" + oRow.rowKey.rawValue + " ===";
			iRow++;
		}
	}
	if (sLog!="") {
		pCommonLog.Msg = pCommonLog.Msg + "\r\n" + 
			"Populate NFT Section log:" + "\r\n" + "===========================\r\n" + sLog;
	}
}

function NFTItemToRow(pFormRow, pDataRow) {
	pFormRow.rowKey 	= pDataRow.getKey	();	   
	pFormRow.nutrInt 	= pDataRow.getNutrInt	();	   
	pFormRow.rcdType 	= "DAT";
	
	//=== strip off (NAM;PROD) from the description ===
	var sTmp = pDataRow.getNutrText();
	pFormRow.nutrText	= sTmp.replace("(NAM;PROD)","");
	
//	var v1=pDataRow.getNv_set("STD_DECL");
//	xfa.host.messageBox("pDataRow.getNv_set("STD_DECL")=" + 
//		commons.getAllPropertiesAndValues(pDataRow.getNv_set("STD_DECL")) ,"",3);
		
	pFormRow.nutrMsr	= pDataRow.getNv_set("STD_DECL").val + " " + pDataRow.getNv_set("STD_DECL").unit;
	pFormRow.nutrPDV	= pDataRow.getNv_set("RDA_DECL").val + " " + pDataRow.getNv_set("RDA_DECL").unit;
	//=== copy data columns in the hidden cols - for template re-application ===
	pFormRow.qtyHdn.rawValue = pFormRow.nutrMsr.rawValue;
	pFormRow.pdvHdn.rawValue = pFormRow.nutrPDV.rawValue;

	if (m_debug.value=="DEBUG") {
		pFormRow.nutrInt.presence="visible";
		pFormRow.rcdType.presence="visible";
		pFormRow.qtyHdn.presence="visible";
		pFormRow.pdvHdn.presence="visible";
	} else {
		//=== Make visible columns wider for non-DEBUG ===
		pFormRow.nutrInt.presence="hidden";
		pFormRow.rcdType.presence="hidden";
		pFormRow.qtyHdn.presence="hidden";
		pFormRow.pdvHdn.presence="hidden";
	}
		
}

function RowToNFTItem(pFormRow, pDataRow) {
	pDataRow.setNutrInt		(pFormRow.rowKey.rawValue);	
	pDataRow.setNutrText	(pFormRow.nutrText.rowKey.rawValue);		
	// TODO: pDataRow.setNv_set		("", pFormRow.nutrMsr.rowKey.rawValue);		
	pDataRow.setPdvPerct	(pFormRow.nutrPDV.rawValue);		
}


function makeNFTSection(oMapper, oNFTSection, pMapperOutput) {
	makeNFTSectionHdrFtr(oMapper, oNFTSection, pMapperOutput);
	var itemsSTD = loadItemsFromXML(oMapper, "STD", pMapperOutput);
	var itemsRDA = loadItemsFromXML(oMapper, "RDA", pMapperOutput);
	if (itemsSTD==null || itemsRDA==null) {
		xfa.host.messageBox("itemsSTD or itemsRDA == null, see log for details","Info",3);
		return;
	}
	if (m_debug.value=="DEBUG") {
		xfa.host.messageBox("itemsSTD.length = " + itemsSTD.length + "itemsRDA.length = " + itemsRDA.length,"Info",3);
	}
//	pMapperOutput.Msg = "";
	makeNFTSectionItems(oNFTSection, itemsSTD, itemsRDA, pMapperOutput);
}

//=== BEGIN: loadItemsFromXML ===
function loadItemsFromXML(oMapper, pItemType, pMapperOutput) {
/*================================================================
	1) Use referenced oMapper (Mapper must be built by caller). 
	2) load data from dataXML loaded previously, use NFT filter to find proper data
	3) Fills array of anonymos types (fields for further creating NFTI objects) based on pItemType:
	   - for STD load from GS1_ELEMENT=NFT_NUTRIENT_STD
	   - for RDA load from GS1_ELEMENT=NFT_NUTRIENT_RDA
	4) Return data in form of array[] {POSNR, NUTRIENT_INT, NUTRIENT_EXT, NUTRIENT_TXT, FLG_SHOW_ITEM, 
			VALUE_CALC, DECIMALS[_CALC], UNIT_CALC, UNIT_CALC_TXT, 
			VALUE_DECL, DECIMALS_DECL, UNIT_DECL, UNIT_DECL_TXT}
================================================================*/
	var sXMLloadedFrom, sDOMroot;
	sXMLloadedFrom = m_XMLloadedFrom.value;		//=== STRING or FILE
	sDOMroot = m_DOMroot.value;					//=== abap

	var sGs1Element = "";
	if (pItemType=="STD") sGs1Element = "NFT_NUTRIENT_STD";
	if (pItemType=="RDA") sGs1Element = "NFT_NUTRIENT_RDA";
			
	var oNFTI;
	for (var iItemIndx=0; iItemIndx<oMapper.getItemCount(); iItemIndx++) {
		var oMapItem = oMapper.getItemByIndx(iItemIndx);
		if (oMapItem.getMapUsage()!="NFT") continue;
		
		if (oMapItem.getMapUsage()=="NFT" && oMapItem.getGs1ElementID() == sGs1Element && oMapItem.getProcType()=="ALL_NFTS") {
			/*=============================================================
			oMapItem.getMapUsage()=="NFT" AND .getProcType()=="ALL_NFTS" is one MapItem
			It points to REPEAT element in XML which contains all values needed for one nutrient, i.e. one NFTI.
			XMLDAO.getDataXmlNodeValueExt(oMapItem, sXMLloadedFrom, sDOMroot, oLog) for such item will return 
			an array of objects, each with all these values:
			{POSNR, NUTRIENT_INT, NUTRIENT_EXT, NUTRIENT_TXT, FLG_SHOW_ITEM, 
			VALUE_CALC, DECIMALS[_CALC], UNIT_CALC, UNIT_CALC_TXT, 
			VALUE_DECL, DECIMALS_DECL, UNIT_DECL, UNIT_DECL_TXT}
			=============================================================*/
			pMapperOutput.Msg = pMapperOutput.Msg + "\r\n" + "item[" + iItemIndx + "]=" + oMapItem.getAsString();
			
			var dataValue, oLog;
			oLog = {Msg:""};
			dataValue = XMLDAO.getDataXmlNodeValueExt(oMapItem, sXMLloadedFrom, sDOMroot, oLog);
			if (dataValue == null) {
				dataValue = "ERROR: Mapping not found. " + oLog.Msg;
				pMapperOutput.Msg = pMapperOutput.Msg + "\r\n" + "ERROR: Mapping not found. " + oLog.Msg;
				break;
			}
			return dataValue;
		}
	}
}
//=== END: loadItemsFromXML ===

//=== BEGIN: makeNFTSectionItems ===
function makeNFTSectionItems(oNFTSection, pItemsSTD, pItemsRDA, pMapperOutput) {
/*================================================================
	1) Use referenced NFTSection and previously populated 2 arrays pItemsSTD, pItemsRDA - 
	   objects of type {POSNR, NUTRIENT_INT, NUTRIENT_EXT, NUTRIENT_TXT, FLG_SHOW_ITEM, 
			VALUE_CALC, DECIMALS[_CALC], UNIT_CALC, UNIT_CALC_TXT, 
			VALUE_DECL, DECIMALS_DECL, UNIT_DECL, UNIT_DECL_TXT} 
	2) Fill NFTSEction with NFTitems based on pItemsSTD, then add data from pItemsRDA
================================================================*/
		
	var oNFTI;
	var sLogMatch = "", sLogAll = "";
	//=== For each element of STD array we build NFTI object and add it to the section ===
	for (var iItem=0; iItem<pItemsSTD.length; iItem++) {
		oNFTI = NFTItem.newItem();
		oItem = pItemsSTD[iItem];
		
		oNFTI.setPosNr      		(oItem.POSNR        );    
		oNFTI.setNutrInt    		(oItem.NUTRIENT_INT );    
		oNFTI.setSpecId    			(oItem.NUTRIENT_EXT );    
		oNFTI.setNutrText   		(oItem.NUTRIENT_TXT );    
		oNFTI.setFlgShowItem	    (commons.RLTrim(oItem.FLG_SHOW_ITEM).toUpperCase()); 
		
		var oTemp = {val: "", dec: "", unit: "", unitTxt: ""};
		oTemp.val = oItem.VALUE_CALC;
		oTemp.dec = oItem.DECIMALS;
		oTemp.unit = oItem.UNIT_CALC;
		oTemp.unitTxt = oItem.UNIT_CALC_TXT;
		oNFTI.setNv_set("STD_CALC", oTemp); 

		oTemp.val = oItem.VALUE_DECL;
		oTemp.dec = oItem.DECIMALS_DECL;
		oTemp.unit = oItem.UNIT_DECL;
		oTemp.unitTxt = oItem.UNIT_DECL_TXT;
		oNFTI.setNv_set("STD_DECL", oTemp); 

		oNFTI.setFlgInitialDecl   	(oItem.FLG_INITIAL_DECL); 
		oNFTI.setPdvPerct	  		(0);    //=== oNFTI.setNv_set("STD_CALC"
	
		oNFTSection.setItem(iItem, oNFTI);	
	} 

	//=== Now for each element of RDA array we locate NFTI item in section and add fields to the NV_SET for RDA only ===
	for (var iItem=0; iItem<pItemsRDA.length; iItem++) {
		oItem = pItemsRDA[iItem];
		//=== getItemByAltKey ===
		//oNFTI = oNFTSection.getItemByAltKey(NFTItem.getItemKey(oItem.NUTRIENT_INT));
		oNFTI = oNFTSection.getItemByAltKey(NFTItem.getItemKey(oItem.NUTRIENT_INT, "ALT"));
		if (oNFTI == null || oNFTI == undefined) {
			sLogMatch = sLogMatch + "\r\n" + "key = " + oItem.NUTRIENT_INT;
			continue;
		}
		var oTemp = {val: "", dec: "", unit: "", unitTxt: ""};
		oTemp.val = oItem.VALUE_CALC;
		oTemp.dec = oItem.DECIMALS;
		oTemp.unit = oItem.UNIT_CALC;
		oTemp.unitTxt = oItem.UNIT_CALC_TXT;
		oNFTI.setNv_set("RDA_CALC", oTemp); 
		
		oTemp.val = oItem.VALUE_DECL;
		oTemp.dec = oItem.DECIMALS_DECL;
		oTemp.unit = oItem.UNIT_DECL;
		oTemp.unitTxt = oItem.UNIT_DECL_TXT;
		oNFTI.setNv_set("RDA_DECL", oTemp); 
	} 
	//=== Now for each item define AS-SOLD values TODO: this must be done according to business rules ===
	sLogAll = "\r\n" + "NFT items loaded into NFTSection:" + "\r\n" + "===========================";
	iItemCount = oNFTSection.getItemCount();
	for (var iItem=0; iItem<iItemCount; iItem++) {
		oNFTI = oNFTSection.getItemBySeqN(iItem);
		//oNFTI.setSoldAdult(oNFTI.getNv_set("STD_CALC").val);    
		//oNFTI.setSoldChild(oNFTI.getNv_set("STD_DECL").val);    
		sLogAll = sLogAll + "\r\n=== NFTItem[" + iItem + "], key=" + oNFTI.getKey() + oNFTI.getAsString();
	}
	if (sLogMatch!="") {
		pMapperOutput.Msg = pMapperOutput.Msg + "\r\n" + 
			"RDA elements not found in STD items:" + "\r\n" + "===========================" + sLogMatch;
	}
	pMapperOutput.Msg = pMapperOutput.Msg + sLogAll;
	
}
//=== END: makeNFTSectionItems ===
	

//=== BEGIN: makeNFTSectionHdrFtr ===
function makeNFTSectionHdrFtr(oMapper, oNFTSection, pMapperOutput) {
/*================================================================
	1) Use referenced NFTSection and the oMapper (Mapper must be built by caller). 
	2) Create, fill HeaderFooter in NFTSection, use NFT filter to find proper data 
	3) Populate with data from dataXML loaded previously
================================================================*/

	var sXMLloadedFrom, sDOMroot;
	sXMLloadedFrom = m_XMLloadedFrom.value;		//=== STRING or FILE
	sDOMroot = m_DOMroot.value;					//=== abap
		
	var oNFTI;
	for (var iItemIndx=0; iItemIndx<oMapper.getItemCount(); iItemIndx++) {
		var oMapItem = oMapper.getItemByIndx(iItemIndx);
		pMapperOutput.Msg = pMapperOutput.Msg + "\r\n" + "item[" + iItemIndx + "]=" + oMapItem.getAsString();
			      
		if (oMapItem.getMapUsage()!="NFT") continue;
		
		if (oMapItem.getMapUsage()=="NFT" && oMapItem.getProcType()=="SINGLE_NODE") {
			/*=============================================================
			oMapItem.getMapUsage()=="NFT" AND .getProcType()=="NONE" is several MapItem records
			These individual MapItem objects map to XML nodes below. 
			They  must be loaded into specific NFTSection fields (not NFI): 
			BASE_QTY, UNIT_BASE_QTY, UNIT_BASE_QTY_TXT
			ALTER_BASE_QTY, UNT_ALT_BASE_QTY, SERVS_PER_CONT
			=============================================================*/
			var dataValue, oLog;
			oLog = {Msg:""};
			dataValue = XMLDAO.getDataXmlNodeValueExt(oMapItem, sXMLloadedFrom, sDOMroot, oLog);
			if (dataValue == null) {
				dataValue = "ERROR: Mapping not found. " + oLog.Msg;
				oNFTSection.setErrorLog(oNFTSection.getErrorLog() + "\r\n" + oLog.Msg);
				continue;
			} 
			if (oMapItem.getGs1ElementID()=="BASE_QTY") {
				oNFTSection.setBaseQty(dataValue);
			} else if (oMapItem.getGs1ElementID()=="UNIT_BASE_QTY") {
				oNFTSection.setBaseQtyUnit(dataValue);
			} else if (oMapItem.getGs1ElementID()=="UNIT_BASE_QTY_TXT") {
				oNFTSection.setBaseQtyUnitTxt(dataValue);
			} else if (oMapItem.getGs1ElementID()=="ALTER_BASE_QTY") {
				oNFTSection.setBaseAltQtyUnit(dataValue);
			} else if (oMapItem.getGs1ElementID()=="UNT_ALT_BASE_QTY") {
				oNFTSection.setBaseAltQtyUnitTxt(dataValue);
			} else if (oMapItem.getGs1ElementID()=="SERVS_PER_CONT") {
				oNFTSection.setSrvSizeCont(dataValue);
			}
		}
	} 
}
//=== END: makeNFTSectionHdrFtr ===

//=== BEGIN: loadNFT ===
function loadNFT(poDiag, poMapper, poNFTSection, poFormSectionNFT, poCommonLog, pSoldPrep, pFirstLoad) {
	
	//=== Create and load NFTSection: ===
	//  IN:  pSoldPrep = SOLD/PREP
	//	OUT: poNFTSection, poFormSectionNFT
	
	NFTManager.makeNFTSection(poMapper, poNFTSection, poCommonLog);
	if (m_debug.value=="DEBUG")	{
		xfa.host.messageBox("Completed step: loaded oNFTSection object from data XML.","",3);
		
	}
	if (poCommonLog.Msg != "") {
		if (m_debug.value == "DEBUG") poDiag.Output1.rawValue = poCommonLog.Msg;
		//console.println(oCommonLog.Msg);
	}
	
	//=== populate section from oDataSection ===
	if (pSoldPrep=="SOLD") {
		poFormSectionNFT = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + pSoldPrep, -1, "");
	} else  {
		poFormSectionNFT = NFTManager.getSection("abap", "Page1", "subMain", "subNFT_" + pSoldPrep, -1, "");
		poFormSectionNFT.presence = "visible";
	}
	NFTManager.populateSection(poFormSectionNFT, poNFTSection, "subNFTbody", "tblNFTbody", "rowData", pFirstLoad, poCommonLog);
	
	var sMsg = "Completed step: built view populated with data. All steps completed";
	commons.addToProgress(poDiag, sMsg);
	//xfa.host.messageBox(sMsg, "",3);
	
}
//=== END: loadNFT ===