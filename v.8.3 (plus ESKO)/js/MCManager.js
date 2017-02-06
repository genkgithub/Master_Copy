//=== Work with MC sections - subforms ===
//=== v.8.3 Feb 4, 2017 ===

//1) MC sections are subforms wrapped into one flowing subform: 
//    subMain { subSection[0], subSection[1], ...} 
//2) each subSection is matched by an object MasterSection:
//   unique subSection.lblSectioCode = MasterCopySection.getKey()
//3) In this script block we have methods to:
//   - count sections
//   - add section
//   - get section by number or key
//   - populate section from MasterCopySection object
// v.8.3.1 - Feb 4, 2017: adding USER_ENTRY with default value (in the TitleEN field)
//========================================================================

function getDataRowKey (pDataRow) {
	return "key:" + pDataRow.Gs1ElementID.rawValue + ":" + pDataRow.SubKey.rawValue;
}

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
			if (oSectionItem.lblSectionName.rawValue == psSectionKey) {
				return oSectionItem;
			}
		}
		return null;
	} else {
		//=== locate section by piSectionNumber ===
		var oSectionItem = oNode.resolveNode(pSubForm2 + "[" + piSectionNumber + "]");
		return oSectionItem;
	}	
	return oSection;
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
			if (oSectionItem.lblSectionName.rawValue == psSectionKey) {
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

function getSectionRow(pSection, psTable, psRow, piRowNumber, psRowKey) {
	/*===============================================
	PARAMS:
		pSection - section object
		psTable, psRow - NAMES of table and row nodes
		piRowNumber - if >=0, use as row index
		psRowKey - if <>"", use it as row tag
	ACTIONS:
		Locate row with number psRowTag or psLblEquiv. 
	RETURNS:
		Located row.
	==================================================*/
	var oTableNode = pSection[psTable];
	var oRowNode = oTableNode[psRow];
	if (psRowKey!="") {
		//=== locate row by LblEquiv field ===
		for (var i=0; i < oRowNode.instanceManager.count; i++) {
			var oRowItem = oRowNode.resolveNode(psRow + "[" + i + "]");
			//xfa.host.messageBox("getSectionRow.i=" + i + 
			//	", oRowItem.Gs1ElementID.rawValue=" + oRowItem.Gs1ElementID.rawValue + "psRowKey=" + psRowKey, "",3);
			
			if (getDataRowKey(oRowItem) == psRowKey) {
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

function addSectionRow(pSection, psTable, psRow) {
	/*===============================================
	PARAMS:
		pSection - section object
		psTable, psRow - NAMES of table and row nodes
	ACTIONS:
		Add empty row after at the end. 
	RETURNS:
		Newly added row.
	==================================================*/
	var oTableNode = pSection[psTable];
	var oRowNode = oTableNode[psRow];
	var oNewRow = oRowNode.instanceManager.addInstance(true);	
	return oNewRow;
}

function removeSectionRow(pSection, psTable, psRow, piRowNumber, psRowKey) {
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
	var oTableNode = pSection[psTable];
	var oRowNode = oTableNode[psRow];
	
	if (psRowKey!="") {
		//=== locate row by LblEquiv field ===
		for (var i=0; i < oRowNode.instanceManager.count; i++) {
			var oRowItem = oRowNode.resolveNode(psRow + "[" + i + "]");
			if (oRowItem.LblEquiv.rawValue == psRowKey) {
				oRowNode.instanceManager.removeInstance(i);
				return true;
			}
		}
		return false;
	} else {
		//=== locate row by piRowNumber ===
		var oRowItem = oRowNode.resolveNode(psRow + "[" + piRowNumber + "]");
		if (oRowItem != undefined && oRowItem!=null) {
			oRowNode.instanceManager.removeInstance(piRowNumber );
			return true;
		} else {
			return false; 
		}
	}	
}

function populateSection(pFormSection, pDataSection, psTable, psRow, pDataLoaded, poDiag) {
	/*===============================================
	PARAMS:
		pFormSection - section object on form (subForm)
		pDataSection - MasterCopySection object (data)
		pSection, psTable, psRow - names of section, table and row in form
	ACTIONS:
		Populate given section with data from given object pDataSection. 
	==================================================*/

	var oTableNode = pFormSection[psTable];
	if (m_debug.value=="DEBUG") {
		oTableNode.columnWidths="18.151mm 20.756mm 39.285mm 45.209mm 47.436mm 40.027mm 44.103mm";
	} else {
		//=== Make visible columns wider for non-DEBUG ===
		oTableNode.columnWidths="0mm 0mm 51.5mm 55mm 55mm 50mm 50mm";
	}
	
	if (pFormSection.subSectionName.lblSectionCode.rawValue=="Section Code") {
		//=== 1st load of data, section is still empty ===
		pFormSection.subSectionName.lblSectionCode.rawValue = pDataSection.getSectionID();
		pFormSection.subSectionName.lblSectionName.rawValue = pDataSection.getSectionName();
				
		for (var i=0; i < pDataSection.getItemCount(); i++) {
			if (i==0) {
				var oRow = getSectionRow(pFormSection, psTable, psRow, 0, "");
				MCItemToRow(oRow, pDataSection.getItem(i), pDataLoaded, poDiag);
			} else {
				var oRow = addSectionRow(pFormSection, psTable, psRow);
				MCItemToRow(oRow, pDataSection.getItem(i), pDataLoaded, poDiag);	
			}
		}
	} else if (pFormSection.subSectionName.lblSectionCode.rawValue==pDataSection.getSectionID()) {
		//=== repeated load of primary data, section is already populated: populate all rows, all values ===
		//=== on 1st /repeated load of secondary loaded data: populate all rows but not all values - only coming from SAP
		//    this is done in MCItemToRow() based on pDataLoaded
		for (var i=0; i < pDataSection.getItemCount(); i++) {
			var oDataItem = pDataSection.getItem(i);
			var oRow = getSectionRow(pFormSection, psTable, psRow, -1, oDataItem.getKey());
			if (oRow==null) {
				xfa.host.messageBox("populateSection.oRow=null for oDataItem" + oDataItem.getAsString(),"",3);
			}
			MCItemToRow(oRow, oDataItem, pDataLoaded, poDiag);
		}
	} else {		
		xfa.host.messageBox("populateSection.lblSectionCode (" + 
			pFormSection.subSectionName.lblSectionCode.rawValue + ") <> pDataSection.getSectionID (" +
			pDataSection.getSectionID(),"",3);
		return false;
	}
}

function MCItemToRow(pFormRow, pDataRow, pDataLoaded, poDiag) {
	pFormRow.Gs1ElementID = pDataRow.getGs1ElementID();
	pFormRow.SubKey = pDataRow.getSubKey();
	pFormRow.LblEquiv = pDataRow.getLblEquiv();
	pFormRow.Value_SAP.rawValue = pDataRow.getData_SAP();
	
	var fDataUnchanged = true;
	
	if (pDataLoaded=="load-0") {
		pFormRow.Value_EN.rawValue = pDataRow.getData_EN();
		pFormRow.Value_FR.rawValue = pDataRow.getData_FR();
		pFormRow.Note.rawValue = pDataRow.getTxtNote();
	} else if (pDataLoaded=="load-1") {
		if (pDataRow.getData_EN()=="ERROR: Mapping not found") {
			pFormRow.Value_EN.rawValue = pDataRow.getData_EN();
			if (poDiag.LogErrorInNote==true)
				pFormRow.Note.rawValue = pFormRow.Note.rawValue + "ERROR TEXT:" + pDataRow.getTxtNote();
			else
				pFormRow.Note.rawValue = pFormRow.Note.rawValue;			
		} else {
			/*if (pDataRow.getEditable_EN()==false) {
				fDataUnchanged = (pFormRow.Value_EN.rawValue == pDataRow.getData_EN());
				pFormRow.Value_EN.rawValue = pDataRow.getData_EN();
			} else {
				//=== nothing - leave values entered by user
			}
			*/
			//=== nothing - leave values entered by user
		}
	} else {
		xfa.host.messageBox("MCItemToRow. pDataLoaded=" + pDataLoaded + ": must be only loaded-0 or loaded-1","",3);
	}
	//=== force Editable to OPEN - to keep code intact ===
	pDataRow.setEditable_EN(true);
	
	//=== Apply access rules and colors ===
	if (pDataRow.getEditable_EN()==true) {
		pFormRow.Value_EN.access = "open";
		pFormRow.resolveNode("Value_EN.border.fill.color").value = getRGBcolor("OPEN");
	} else if (pDataRow.getData_EN()=="ERROR: Mapping not found") {
		pFormRow.Value_EN.access = "readOnly";
		pFormRow.resolveNode("Value_EN.border.fill.color").value = getRGBcolor("ERROR");
	} else {
		pFormRow.Value_EN.access = "readOnly";
		//pFormRow.Value_EN.access = "open";
		if (pDataLoaded=="load-0") {
			pFormRow.resolveNode("Value_EN.border.fill.color").value = getRGBcolor("READONLY");
			//pFormRow.resolveNode("Value_EN.border.fill.color").value = getRGBcolor("OPEN");
		} else {
			if (fDataUnchanged)
				//pFormRow.resolveNode("Value_EN.border.fill.color").value = getRGBcolor("OPEN");
				pFormRow.resolveNode("Value_EN.border.fill.color").value = getRGBcolor("READONLY");
			else
				pFormRow.resolveNode("Value_EN.border.fill.color").value = getRGBcolor("RELOADED");
		}
	}
	//=== Show/hide code columns and set column width for DEBUG/RELEASE - to accomodate hidden columns ===
	if (m_debug.value=="DEBUG") {
		pFormRow.Gs1ElementID.presence="visible";
		pFormRow.SubKey.presence="visible";
	} else {
		pFormRow.Gs1ElementID.presence="hidden";
		pFormRow.SubKey.presence="hidden";
	}
	//=== Show/hide the whole row if data empty and this row is one of ALL_VAT set ===
	if (poDiag.AllVatShowEmpty==false && (pDataRow.getSubKey() !=="" && (commons.ifNullEmpty(pDataRow.getData_EN())==""))) {
		pFormRow.presence="hidden";
	}
}

function getRGBcolor(pType) {
	// RGB color code chart: http://www.rapidtables.com/web/color/RGB_Color.htm
	// pType=ERROR: 255,255,51
	// pType=READONLY: 224,224,224
	// pType=OPEN: 102,255,102
	// pType=RELOADED: Loaded from re-generated data XML: 255,255,153
	//
	//=== How to set color to text box
	//	pFormRow.resolveNode("Value_EN.border.fill.color").value = "102,255,102";  --- complete widget 
	//	//xfa.resolveNode("TextField.ui.#textEdit.border.fill.color").value = "0,255,0";		--- only textbox portion
	//	//TextField1.ui.oneOfChild.border.fill.color.value = "0,200,0"; // green		

	if (pType=="ERROR") return "255,255,51";
	if (pType=="READONLY") return "224,224,224";
	if (pType=="OPEN") return "102,255,102";
	if (pType=="RELOADED") return "255,255,153";
		
}

function MCToRowItem(pFormRow, pDataRow) {
	pDataRow.setGs1ElementID(pFormRow.Gs1ElementID.rawValue);
	pDataRow.setSubKey(pFormRow.SubKey.rawValue);
	pDataRow.setLblEquiv(pFormRow.LblEquiv.rawValue);
	pDataRow.setData_SAP(pFormRow.Value_SAP.rawValue);
	pDataRow.setData_EN(pFormRow.Value_EN.rawValue);
	pDataRow.setData_FR(pFormRow.Value_FR.rawValue);
	pDataRow.setTxtNote(pFormRow.Note.rawValue);
}

function populatePI(psForm, psPage, psSubMain, psSubPI, pPI) {
	/*===============================================
	PARAMS:
		psForm, psPage, psSubMain, psSubPI - names of form, page, subMain, subProdId
	ACTIONS:
		Populate given section with data from given object pPI. 
	==================================================*/
	var sPIFullName = psForm + "." + psPage + "." + psSubMain + "." + psSubPI;
	var oPINode = xfa.resolveNode(sPIFullName)
	oPINode.Row1.UPC.rawValue = pPI.getUPC();
	oPINode.Row1.ProdName.rawValue = pPI.getProdName();
	oPINode.Row2.UserRA.rawValue = pPI.getUserRA();
	oPINode.Row2.UserED.rawValue = pPI.getUserED();
	oPINode.Row2.ProdDate.rawValue = pPI.getProdDate();
}

function populatePI_OLD(psForm, psPage, psSubMain, psSubPI, pPI) {
	/*===============================================
	PARAMS:
		psForm, psPage, psSubMain, psSubPI - names of form, page, subMain, subProdId
	ACTIONS:
		Populate given section with data from given object pPI. 
	==================================================*/
	var sPIFullName = psForm + "." + psPage + "." + psSubMain + "." + psSubPI;
	var oPINode = xfa.resolveNode(sPIFullName)
	oPINode.UPC.rawValue = pPI.getUPC();
	oPINode.ProdName.rawValue = pPI.getProdName();
	oPINode.UserRA.rawValue = pPI.getUserRA();
	oPINode.UserED.rawValue = pPI.getUserED();
	oPINode.ProdDate.rawValue = pPI.getProdDate();
}

//========================================================================
// Old methods - not for repeated sections 
//========================================================================
//=== Work with MC section (table) rows ===
function addTableRow(psForm, psPage, psSubForm1, psSubForm2, psTable, psRow) {
//===============================================
//PARAMS:
//	psForm, psPage, psSubForm, psTable, psRow - NAMES of form, page, subform, table and row nodes
//ACTIONS:
//	Add 1 row at end of table, clear all cells. 
//RETURNS:
//	Newly added row.
//==================================================

	var sTableFullName = psForm + "." + psPage + "." + psSubForm1 + "." + psSubForm2 + "." + psTable;
	var oTableNode = xfa.resolveNode(sTableFullName);
	var oRowNode = xfa.resolveNode(sTableFullName  + "." + psRow);
	var oNewRow = oRowNode.instanceManager.addInstance(true);	
	oNewRow = oRowNode.instanceManager.addInstance(true);
	return oNewRow;
}

function getTableRow(psForm, psPage, psSubForm1, psSubForm2, psTable, psRow, piRowNumber) {
	/*===============================================
	PARAMS:
		psForm, psPage, psSubForm, psTable, psRow - NAMES of form, page, subform, table and row nodes
	ACTIONS:
		Locate row with number piRow and return. 
	RETURNS:
		Newly added row.
	==================================================*/
	var sTableFullName = psForm + "." + psPage + "." + psSubForm1 + "." + psSubForm2 + "." + psTable;
	var oTableNode = xfa.resolveNode(sTableFullName);
	var oRowNode = xfa.resolveNode(sTableFullName  + "." + psRow);	
	var oRow = oRowNode.resolveNode("rowData[" + piRowNumber + "]");			
	return oRow;
}

function getTableRowCount(psForm, psPage, psSubForm1, psSubForm2, psTable, psRow) {
	/*===============================================
	PARAMS:
		psForm, psPage, psSubForm, psTable, psRow - NAMES of form, page, subform, table and row nodes
	RETURNS:
		Row count.
	==================================================*/
	var sTableFullName = psForm + "." + psPage + "." + psSubForm1 + "." + psSubForm2 + "." + psTable;
	var oTableNode = xfa.resolveNode(sTableFullName);
	var oRowNode = xfa.resolveNode(sTableFullName  + "." + psRow);	
	return oRowNode.instanceManager.count;	
}


//=== BEGIN: makeMasterCopy ===
function makeMasterCopy(oMapper, oMasterCopy, pMapperOut, pLog, poDiag) {
/*================================================================
	1) Use referenced MasterCopy and the oMapper (Mapper must be built by caller). 
	2) Make full set of MasterCopySection sections from oMapper.
	3) Populate with data from dataXML loaded in file/string
	4) Create, fill HeaderInformation in MasterCopy 
	5) no NFT work here yet
	6) pMapperOut{Msg} = print out all MapItem[i]
	7) pLog{Msg} = print out all Sections[i] and MCI[j]
================================================================*/

	var sXMLloadedFrom, sDOMroot;
	sXMLloadedFrom = m_XMLloadedFrom.value;		//=== STRING or FILE
	sDOMroot = m_DOMroot.value;					//=== abap
	
	var oDataSection, oMCI;
	for (var iItemIndx=0; iItemIndx<oMapper.getItemCount(); iItemIndx++) {
		var oMapItem = oMapper.getItemByIndx(iItemIndx);
	
	//	xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest.txtOutput[1]").rawValue = "item[" + iItemIndx + 
	//		"]=" + oMapItem.getAsString() ;
		
		pMapperOut.Msg = pMapperOut.Msg + "\r\n" + "item[" + iItemIndx + "]=" + oMapItem.getAsString();
			      
		if (oMapItem.getMapUsage()!="BODY") continue;
			
		oDataSection = oMasterCopy.getSection(oMapItem.getSectionID());
		if (oDataSection==null) {
		    oDataSection = MasterCopySection.newItem();
			oDataSection.setSectionID(oMapItem.getSectionID());
			oDataSection.setSectionName(oMapItem.getSectionName());
			oDataSection.setSeqN(oMapItem.getSectionSeqN());	//== SeqN in XML are 1-based
			oMasterCopy.setSection(oDataSection);
			pLog.Msg = pLog.Msg + "\r\n" + "=== Section[" + oDataSection.getSectionID() + "]===";
		}
	    
	    //=== All fields must be set ===
	    oMCI = MasterCopyItem.newItem();
		oMCI.setGs1ElementID(oMapItem.getGs1ElementID());
		oMCI.setSubKey(oMapItem.getVatKeyValue());
		
	    if (oMapItem.getLblEquiv() !=null && oMapItem.getLblEquiv()!="") {
			oMCI.setLblEquiv(oMapItem.getLblEquiv());
		} else {
			oMCI.setLblEquiv(oMapItem.getGs1ElementID());
		}
	
		/*  ================================================================
		*	1.	subroot =  USER_ENTRY => no mapping AND field is editable
		*	    v.8.3.1 - Feb 4, 2017: adding USER_ENTRY with default value:
		*				  if getTitleEN<>"" copy to dataValue.
		*	2.	subroot, path1 != empty and (mapping found) => {editable = FALSE}
		*	3.	subroot, path1 != empty and !(mapping found) => {editable = FALSE and field value = ERROR: mapping not found}
		*   ================================================================
		*/
		var dataValue, oLog;
		oLog = {Msg:""};
		if (oMapItem.getProcType() == "USER_ENTRY") {
			if (oMapItem.getPath1()=="") {
				dataValue = "User Entry";
			} else {
				dataValue = oMapItem.getPath1();
			}
			oMCI.setData_SAP("");		
			oMCI.setData_EN(dataValue);		
			oMCI.setEditable_EN(true);		
			oMCI.setMappedSAP(false);
			oMCI.setTxtNote("Notes-" + iItemIndx);	//=== to be later populated from data XML or left for manual editing
		} else {
			dataValue = XMLDAO.getDataXmlNodeValueExt(oMapItem, sXMLloadedFrom, sDOMroot, oLog);
			if (dataValue == null) {
				oMCI.setData_EN("ERROR: Mapping not found");
				if (poDiag.LogErrorInNote==true)
					oMCI.setTxtNote(oLog.Msg);
				else
					oMCI.setTxtNote("ERROR: Mapping not found");
					
			} else if ((dataValue=="") && 
				(oMapItem.getProcType()=="ALL_VATS_BY_KEYS" || oMapItem.getProcType()=="ALL_VATS_BY_TAGS")) {
				//=== For ALLVATS_ map item: skip if data value is empty ===
				continue;
					
			} else {
				oMCI.setData_SAP(dataValue);
				oMCI.setData_EN(dataValue);
				oMCI.setTxtNote("Notes-" + iItemIndx);	//=== to be later populated from data XML or left for manual editing
			}
			oMCI.setEditable_EN(false);				
			oMCI.setMappedSAP(true);
		}
		//=== titles to the TxtNote ===
		addTitles(oMapItem, oMCI);
		oMCI.setData_FR("FR-" + iItemIndx);		//=== to be later populated from data XML or left for manual editing
		oMCI.setEditable_FR(true);
	
		var iItemCount = oDataSection.getItemCount();
		oDataSection.setItem(iItemCount, oMCI);	
		pLog.Msg = pLog.Msg + "\r\n" + "=== MasterCopyItem[" + oMCI.getGs1ElementID() + ":" + oMCI.getSubKey() + "]===";
	} 
}
//=== END: makeMasterCopy ===

function addTitles(pMapItem, pMCI) {
	//=== If titles present in pMapCopyItem - add them at top of pMCI.TxtNote ===
	var sOut = "";
	if (pMapItem.getTitleEN()!="" && pMapItem.getTitleEN()!=null) {
		sOut = "Title EN:" + pMapItem.getTitleEN() + "\r\n" +
			"Title FR:" + pMapItem.getTitleFR() + "\r\n" +
			sOut;
		pMCI.setTxtNote(sOut + pMCI.getTxtNote());
	}
}

//=== BEGIN: makeHeaderInfo ===
function makeHeaderInfo(oMapper, oHI, pMapperOut) {
/*================================================================
	1) Use referenced HeaderInfo object and the oMapper (Mapper must be built by caller). 
	2) Fill HeaderInformation
================================================================*/

	var sXMLloadedFrom, sDOMroot;
	sXMLloadedFrom = m_XMLloadedFrom.value;		//=== STRING or FILE
	sDOMroot = m_DOMroot.value;					//=== abap
	
	//=== retrieve this from data after loading map: HeaderInformation ===
	//var sHI = "({UPC:'123456',prodName:'Ice Cream',userRA:'Suzarra Khan',userED:'Shannaz Akbar',prodDate:'2014-09-01'})";
	var sHI = "({UPC:'',prodName:'',userRA:'',userED:'',prodDate:'2014-09-01'})";
	oHI.setAllJSON(sHI);
	
	var oMapItemHdr, dataValueHdr, oLogHdr = {Msg:""};
	
	oMapItemHdr = oMapper.getItem(MapperWrap.getItemKey("HEADER_INFO", "UPC", "_NONE_"));
	dataValueHdr = XMLDAO.getDataXmlNodeValueExt(oMapItemHdr, sXMLloadedFrom, sDOMroot, oLogHdr);
	if (dataValueHdr == null) {
		oHI.setUPC("ERROR: Mapping not found: " + oLog.Msg);
	} else {
		oHI.setUPC(dataValueHdr);
	}
	oMapItemHdr = oMapper.getItem(MapperWrap.getItemKey("HEADER_INFO", "PRODUCT_NAME", "_NONE_"));
	dataValueHdr = XMLDAO.getDataXmlNodeValueExt(oMapItemHdr, sXMLloadedFrom, sDOMroot, oLogHdr);
	if (dataValueHdr == null) {
		oHI.setProdName("ERROR: Mapping not found: " + oLog.Msg);
	} else {
		oHI.setProdName(dataValueHdr);
	}
}
//=== END: makeHeaderInfo ===

//=== BEGIN: MasterCopyToForm ===
function MasterCopyToForm(oMasterCopy, oHI, pMapperOut, pDataLoaded, poDiag) {
/*================================================================
	1) Use referenced MasterCopy object and HeaderInformation object. 
	2) Populate form sections in the data-based order from the previously loaded oMasterCopy based on section SeqN.
	3) no NFT work here yet
================================================================*/

	var oFormSection;
	
	var iSectionCount = commons.getPropertyCount(oMasterCopy.getSections());
	if (m_debug.value=="DEBUG") {
		xfa.host.messageBox("oMasterCopy.sectionCount=" + iSectionCount, "", 3);
	}
	
	var iFormSectionCount = MCManager.getSectionCount(m_root.value, "Page1", "subMain", "subSection");
	var sMsg = "";
	if (pDataLoaded=="load-1") {
		//=== section counts must be >1 and equal in form and MasterCopy ===
		if (iSectionCount != iFormSectionCount && iFormSectionCount >1) {
			//=== problem: section counts not equal in form and MasterCopy and data already loaded
			sMsg = "Problem: section counts not equal in form(" + iFormSectionCount + ") and MasterCopy(" + iSectionCount + ") and data is reloaded";
			xfa.host.messageBox(sMsg,"",3);
			return false;
		} else {
			//=== no action: no need to add sections, just repopulate ===
		}		
	} else if (pDataLoaded=="load-0") {
		//=== section count in form must be =1 ===
		if (iFormSectionCount == 1) {
			//=== Add n-1 form sections - so that: FormSections.count = MasterCopy.Sections.count ===
			for (var iSection=0; iSection<iSectionCount-1; iSection++) {
				oFormSection = MCManager.addSection(m_root.value, "Page1", "subMain", "subSection");
			}
		} else {
			//=== problem: section count in MasterCopy already > 1
			sMsg = "Problem: section count in MasterCopy(" + iFormSectionCount + ") already > 1 and data is loaded as primary";
			xfa.host.messageBox(sMsg,"",3);
			return false;
		}		
	} else {
		//=== problem: section count in MasterCopy already > 1
		sMsg = "Problem: data NOT loaded: sections cannot be populated";
		xfa.host.messageBox(sMsg,"",3);
		return false;
	}
	
	//=== populate sections from oMasterCopy (SeqN values in MasterCopy object are 1-based) ===
	for (var iSection=1; iSection<=iSectionCount; iSection++) {
		//=== sections in the form are 0-based	
		oFormSection = MCManager.getSection(m_root.value, "Page1", "subMain", "subSection", iSection-1, "");
		var oDS = oMasterCopy.getSectionBySeqN(iSection);		
	//	xfa.host.messageBox("iSection=" + iSection + ",oDS = " + oDS, "", 3);
		MCManager.populateSection(oFormSection, oDS, "tblSection", "rowData", pDataLoaded, poDiag);
	}
	
	//=== HeaderInformation -> form ===
	MCManager.populatePI(m_root.value, "Page1", "subMain", "subHeaderInfo.subHeader1.subHdrAll.tblHdrAll", oHI); 
	//MCManager.populatePI(m_root.value, "Page1", "subMain", "subHeaderInfo.subHeader1.subHeader2.", oHI); 
}
//=== END: MasterCopyToForm ===

//=== BEGIN: loadMasterCopy ===
function loadMasterCopy(pfLoadStage, pfSoldPrep, poDiag, poMapper, poMasterCopy, poCommonLog, pSpecTypeAttrs) {
	/*==============================================================
	* pLoadStage="1": primary load - 1st time load in template,
	*            "2": any 2ndary load with form filled with data.
	* pfSoldPrep = SOLD/PREP
	* Diag = Object {Output1: field, Output2: field, LogErrorInNote: bool, AbapNodeReplaced:bool, ViewState:string}
	* poMapper, poMasterCopy must be created by caller and will be populated 
	*
	* DESCRIPTION:
	* - load MAP from XML (without ALL-VATs)
	* - load data from XML 
	* - check data XML:
	*   pfSoldPrep="SOLD": must contain .....
	*   pfSoldPrep="PREP": must contain .....
	*   if OK oDiag.XmlTypeOK=true, else oDiag.XmlTypeOK=false and return
	*
	* - re-load MAP with ALL-VATs discovery
	* - if primary: 
	*   - built MasterCopy, load with data, build form sections, show
	* - if 2ndary: 
	*   - built MasterCopy, load with data, no override of _EN, _FR, note fields, 
	*     use already existing form sections, populate only SAP data fields.
	* - log in poDiag{}
	* - return Mapper, MasterCopy objects.
	================================================================*/
	
	var XMLloadedFrom, DOMroot;
	var oLog = {Msg:""};
	
	XMLloadedFrom = m_XMLloadedFrom.value;		//=== STRING or FILE
	DOMroot = m_DOMroot.value;					//=== abap
	var sOut;
	var oHI = HeaderInformation.newItem();
	
	var mbxChoice = "", mbxMessage = "";
	if (pfSoldPrep=="SOLD") {
		mbxMessage = "The Map and the primary data XML will now be loaded. " + 
		"Please select the primary data XML file. Click YES to continue or NO to cancel.";
	} else {
		mbxMessage = "The Map and the AS PREPARED data XML will now be loaded. " + 
		"Please select the AS PREPARED data XML file. Click YES to continue or NO to cancel.";
	}
	mbxChoice = xfa.host.messageBox(mbxMessage, "Attention!","2","2");
	if (mbxChoice=="4") {		//=== YES ('3'=No, '4'=Yes) ===
		
		commons.addToProgress(poDiag, "loadMasterCopy:" + pfSoldPrep + " - START");
		//=== v7.7 changes ===
		//m_xmlMapSections.value = MapperWrap.loadMapString();
		MapperWrap.loadFromXML("", "MAP.xml", poDiag);
		if (poDiag.XmlTypeOK) {
			var oTemplRoot = xfa.datasets.resolveNode("mastercopy_mapping"); 
			if (oTemplRoot==null) {
				xfa.host.messageBox("The MAP node not found in the MAP.XML.", "",3);
			} else {
				//xfa.host.messageBox("The NFT_TEMPLATES node found in the XML.", "",3);	
				poDiag.Output1.rawValue = "Map loaded. Root:" + oTemplRoot.name + ", # of child nodes:" + oTemplRoot.nodes.length;
				commons.addToProgress(poDiag, "Map Loaded");
			}
			if (m_debug.value == "DEBUG") {
				xfa.host.messageBox("Map loaded from mapping XML.", "",3);
			}			
		} else {
			xfa.host.messageBox("The MAP.XML is not a valid mapping XML.", "",3);
			commons.addToProgress(poDiag, "Map not valid");
			return;
		}	
			
		//=== Read MAP_SECTION elements and display contents of all fields to OUTPUT ===
		sOut = MapperWrap.buildMapper(DOMroot, m_maproot.value, poMapper, false, -1, -1);
		if (m_debug.value == "DEBUG") poDiag.Output2.rawValue = sOut;
		commons.addToProgress(poDiag, ".buildMapper() completed");
		
		//=== load data XML ===
		var stmFileData; 
		var strTextData = "";
		try {
			//=== load data XML into to stream ===
			stmFileData = util.readFileIntoStream();
			// Convert stream data into a String
			strTextData = util.stringFromStream(stmFileData);
			poDiag.UserAction = "OK";
		} catch(err) {
			//=== Exception if user clicks CANCEL in OPEN dialog
			mbxMessage = "Data file could not be loaded." + err;
			xfa.host.messageBox(mbxMessage, "Attention!","3");		
			poDiag.UserAction = "CANCEL";
			poDiag.XmlTypeOK=false;
			return;
		}
		commons.addToProgress(poDiag, "Data file loaded.");
		
		var sAbapNodeName;
		var oAbapNode; 
		
		//=== For PREP: replace abap with asprep ===
		if (pfSoldPrep=="PREP") {
			strTextData = strTextData.replace("<asx:abap","<asx:asprep");
			strTextData = strTextData.replace("</asx:abap","</asx:asprep");
		}
		if (m_debug.value == "DEBUG") poDiag.Output1.rawValue = strTextData;
		
		//=== now load the data XML as xfa.datasets.abap or xfa.datasets.asprep ===
		//    save dataload status - for SOLD only (check if this is reload or 1st load)
		if (pfSoldPrep=="SOLD") {
			oAbapNode = xfa.datasets.resolveNode("abap"); 
			if (oAbapNode==null) {
				poDiag.AbapNodeReplaced = false;		//=== save dataload status ===
				commons.addToProgress(poDiag, "Data was NOT loaded before.");
			} else {
				xfa.datasets.nodes.remove(oAbapNode);
				poDiag.AbapNodeReplaced = true;			//=== save dataload status ===
				commons.addToProgress(poDiag, "Data WAS loaded before.");
			}
		}
		xfa.datasets.loadXML(strTextData, false, false);                                   
		commons.addToProgress(poDiag, ".datasets.loadXML() completed");

		/*
		* Define specID here, fill out specTypeAttrs{} object, then define if SOLD or PREP this file, then
		* decide OK, NOK: specType matching loaded XML 
		* also need to send to caller the specTypeAttrs{}
		*/
		sAbapNodeName = (pfSoldPrep=="SOLD" ? "abap" : "asprep");
		
		var checkSubrootPath = sAbapNodeName +  ".values.LABELDATA.INGREDIENT_LABEL";
		var specType = XMLDAO.getDataNodeValue_ByPath(checkSubrootPath, "RMSLS_XML_INGR_LISTS_WUI.DATA_SOURCE_TYPE", poCommonLog);
		var specTypeTxt = XMLDAO.getDataNodeValue_ByPath(checkSubrootPath, "RMSLS_XML_INGR_LISTS_WUI.DATA_SOURCE_TYPE_TXT", poCommonLog);
		var specId = XMLDAO.getDataNodeValue_ByPath(checkSubrootPath, "RMSLS_XML_INGR_LISTS_WUI.DATA_SOURCE_EXT", poCommonLog);

		var specTypeAttrs = MCManager.getSpecAttrsByType(specType);
		commons.addToProgress(poDiag, "specTypeAttrs = " + MCManager.getSpecAttrsAsString(specTypeAttrs, "TXT"));
		
		specTypeAttrs.SpecId = specId;		//=== add this to the object ===
		if (specTypeAttrs.SpecType == "Z_ZZZ_ZZZ") {
			specTypeAttrs.SpecText = specTypeAttrs.SpecText + ":" + specTypeTxt;
		} else {
			specTypeAttrs.SpecText = specTypeTxt;		//=== overwrite from XML
		}
		//=== return this to caller (must be done via copy properties as params are by VALUE ===
		copySpecAttrsObject (specTypeAttrs, pSpecTypeAttrs);

		if (pfLoadStage="2" && m_SpecTypeAttrs.value !="") {
			//=== if this is re-load and SpecFood != previous.SpecFood - block === 
			var specTypeAttrs_OLD = eval('(' + m_SpecTypeAttrs.value + ')');
			if (specTypeAttrs_OLD.SpecFood != specTypeAttrs.SpecFood) {
				if (specTypeAttrs_OLD.SpecFood == "FOOD") {
					poDiag.UserAction = "INCOMPATIBLE (FOOD TO NONFOOD)";
				} else {
					poDiag.UserAction = "INCOMPATIBLE (NONFOOD TO FOOD)";
				}
				poDiag.XmlTypeOK=false;
				return;
			}
		}
		
		//=== specType matching loaded XML? ===
		if (pfSoldPrep != specTypeAttrs.SpecUse) {
			//=== not matching: remove node from xfa.datasets (abap or asprep), clear m_loadedDataXml ===
			commons.addToProgress(poDiag, "specType NOT matching loaded XML:" + pfSoldPrep + " - " + specTypeAttrs.SpecUse);
			oAbapNode = xfa.datasets.resolveNode(sAbapNodeName); 
			if (oAbapNode!=null) {
				xfa.datasets.nodes.remove(oAbapNode);
			}
			if (pfSoldPrep=="SOLD") {
				m_loadedDataXml.value = "";
			} else {
				m_loadedDataXml2.value = "";
			}
			poDiag.XmlTypeOK=false;
			return;
		}
		//=== SpecType of loaded XML is matching requested: store in  m_loadedDataXml/m_loadedDataXml2
		commons.addToProgress(poDiag, "specType matching loaded XML:" + pfSoldPrep + " - " + specTypeAttrs.SpecUse);
		if (pfSoldPrep=="SOLD")
			m_loadedDataXml.value = strTextData;
		else
			m_loadedDataXml2.value = strTextData;
		
		poDiag.XmlTypeOK=true;
		
		//=== this actually is not needed - it simply outputs the value of xfa.datasets node as string
		//=== xfa.datasets.saveXML();           
		//=== xfa.datasets.saveXML('pretty');
	
		var sMsg = "Data loaded from the data XML.";
		commons.addToProgress(poDiag, sMsg);
		//xfa.host.messageBox(sMsg, "",3);
		
		if (pfSoldPrep=="SOLD") {
			//=== reload the mapper with multi-VATs discovered and listed ===
			sOut = MapperWrap.buildMapper(DOMroot, m_maproot.value, poMapper, true, -1, -1);
			if (m_debug.value == "DEBUG") poDiag.Output2.rawValue = sOut;
			
			var sMsg = "Map reloaded with VAT keys resolved. Now starting to build MasterCopy object.";
			commons.addToProgress(poDiag, sMsg);
			//xfa.host.messageBox(sMsg, "",3);
			
			//=== build MasterCopy object ===
			MCManager.makeHeaderInfo(poMapper, oHI, poCommonLog);
			MCManager.makeMasterCopy(poMapper, poMasterCopy, poCommonLog, oLog, poDiag);
			poMasterCopy.setHeaderInformation(oHI);

			commons.addToProgress(poDiag, "Header and MakeMasterCopy completed.");
			
			if (m_debug.value == "DEBUG") poDiag.Output2.rawValue = oLog.Msg;
			if (m_debug.value == "DEBUG") xfa.host.messageBox("Completed step: built MasterCopy object with all sections and header.","",3);
			
			var fDataLoaded = (poDiag.AbapNodeReplaced==false ? "load-0" : "load-1");
			MCManager.MasterCopyToForm(poMasterCopy, oHI, poCommonLog, fDataLoaded, poDiag);
			commons.addToProgress(poDiag, "MakeMasterCopy to Form completed.");
			
			poDiag.Viewstate = "built,loaded";
			if (m_debug.value == "DEBUG") xfa.host.messageBox("View created (main sections only - no NFT).", "",3);
		}

		//=== Save specTypeAttrs object in form variable ===		
		m_SpecTypeAttrs.value = getSpecAttrsAsString(specTypeAttrs, "JSON");
		
	} else {
		xfa.host.messageBox("Operation cancelled by user.", "",3);	
		poDiag.UserAction = "CANCEL";
		poDiag.XmlTypeOK=false;
	}
	return;	
}
//=== END: loadMasterCopy ===

//=== BEGIN: getSpecType-related functions ===
function getSpecAttrsByType(pSpecType) {
	//=== Locates spec attr. object in the table of spec ID/Text/Use ===
	//    if argument =null, return empty new object
	var specTable = MCManager.getSpecAttrTable();
	
	if (pSpecType==null) {
		return {SpecType: "Z_ZZZ", SpecText: "Empty", SpecFood: "___", SpecUse: "___"};
	}
	
	var specRow = specTable[pSpecType];
	if (specRow==null) {
		return {SpecType: "Z_ZZZ_ZZZ", SpecText: "Spec attrs. not found for: " + pSpecType, SpecFood: "NFOOD", SpecUse: "SOLD"};
	} else {
		return specRow;
	}
}
function getSpecAttrTable() {
	//=== Prepares the table of spec ID/Text/Use as hash ===
	var specAttrTable = new Object();
	specAttrTable["Z_CON_RCP"] = {SpecType: "Z_CON_RCP", SpecText: "Consumer Recipe", SpecFood: "FOOD", SpecUse: "PREP"};
	specAttrTable["Z_PROD"] = {SpecType: "Z_PROD", SpecText: "Loblaw Food Product Spec", SpecFood: "FOOD", SpecUse: "SOLD"};
	specAttrTable["Z_NFPRD"] = {SpecType: "Z_NFPRD", SpecText: "Loblaw Non-Food Product Spec", SpecFood: "NFOOD", SpecUse: "SOLD"};
	//=== TODO ===
	//specAttrTable[""] = {SpecType: "", SpecText: "", SpecFood: "FOOD", SpecUse: "SOLD"};
	//specAttrTable[""] = {SpecType: "", SpecText: "", SpecFood: "NFOOD", SpecUse: "SOLD"};
	//specAttrTable[""] = {SpecType: "", SpecText: "", SpecFood: "NFOOD", SpecUse: "SOLD"};
	
	return specAttrTable;
}
function getSpecAttrsAsString(pSpecAttrs, pMode) {
	//===================================================================
	//	pMode=TXT: returns  {MapVersion, ScriptVersion, SoldFile, PrepFile} formatted for text output with newlines 
	//	pMode=JSON: returns  {MapVersion, ScriptVersion, SoldFile, PrepFile} formatted for as JSON ready for eval('('+ xxx + ')');
	//===================================================================
	if (pMode == "TXT") {
		return "SpecType: " + pSpecAttrs.SpecType + "," + "\r\n" + 
			"SpecText: " + pSpecAttrs.SpecText + "," + "\r\n" + 
			"SpecFood: " + pSpecAttrs.SpecFood + "," + "\r\n" + 
			"SpecUse: " + pSpecAttrs.SpecUse;
	} else if (pMode == "JSON") {
		return "{SpecType: '" + pSpecAttrs.SpecType + "'," +
			"SpecText: '" + pSpecAttrs.SpecText + "'," + 
			"SpecFood: '" + pSpecAttrs.SpecFood + "'," +
			"SpecUse: '" + pSpecAttrs.SpecUse + "'}"; 
	}
}

function copySpecAttrsObject(pSpecAttrsSrc, pSpecAttrsDst) {
	pSpecAttrsDst.SpecType 	= pSpecAttrsSrc.SpecType;
	pSpecAttrsDst.SpecText 	= pSpecAttrsSrc.SpecText;
	pSpecAttrsDst.SpecFood 	= pSpecAttrsSrc.SpecFood;
	pSpecAttrsDst.SpecUse 	= pSpecAttrsSrc.SpecUse;
	pSpecAttrsDst.SpecId 	= pSpecAttrsSrc.SpecId;
	return; 
}

//=== END: getSpecType-related functions ===