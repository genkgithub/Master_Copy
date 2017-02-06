//=== Work with MC section (table) rows ===
function addRow(psForm, psPage, psSubForm1, psSubForm2, psTable, psRow) {
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

function getRow(psForm, psPage, psSubForm1, psSubForm2, psTable, psRow, piRowNumber) {
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

function getRowCount(psForm, psPage, psSubForm1, psSubForm2, psTable, psRow) {
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

//=== Work with MC sections - subforms ===
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
		//=== locate row by LblEquiv field ===
		for (var i=0; i < oNode.instanceManager.count; i++) {
			var oSectionItem = oNode.resolveNode(pSubForm2 + "[" + i + "]");
			if (oSectionItem.lblSectionName.rawValue == psSectionKey) {
				return oSectionItem;
			}
		}
		return null;
	} else {
		//=== locate row by piRowNumber ===
		var oSectionItem = oNode.resolveNode(pSubForm2 + "[" + piSectionNumber + "]");
		return oSectionItem;
	}	
	return oSection;
}

function getRowInSection(pSection, psTable, psRow, piRowNumber, psRowKey) {
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
			if (oRowItem.LblEquiv.rawValue == psRowKey) {
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





