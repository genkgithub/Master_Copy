//=== BEGIN: MasterCopyItem Declaration ===
//=== v.8.2 July 2, 2015 ===
//{lblEquiv, data_EN, data_FR, txtNote, editable_EN:bool, editable_FR:bool, mappedSAP: bool}
function McItem() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 
	var gs1ElementID = "";
	var subKey = "";
    var lblEquiv = "";
	var data_SAP = "";
	var data_EN = "";
	var data_FR = "";
	var txtNote = "";
	var editable_EN = false;
	var editable_FR = true;
	var mappedSAP = true;

    // Declare these functions and make them public
    this.getKey = function() {return "key:" + gs1ElementID + ":" + subKey;}
    
    // Provide accessors to private variables
	this.setGs1ElementID= function(pData) { gs1ElementID 	= pData; }
	this.setSubKey		= function(pData) { subKey 			= pData; }
	this.setLblEquiv	= function(pData) { lblEquiv 	 	= pData; }
	this.setData_SAP 	= function(pData) { data_SAP 	 	= pData; }
	this.setData_EN 	= function(pData) { data_EN 	 	= pData; }
	this.setData_FR 	= function(pData) { data_FR 	 	= pData; }
	this.setTxtNote 	= function(pData) { txtNote 	 	= pData; }
	this.setEditable_EN = function(pData) { editable_EN 	= pData; }
	this.setEditable_FR = function(pData) { editable_FR 	= pData; }
	this.setMappedSAP 	= function(pData) { mappedSAP 	 	= pData; }

	this.getGs1ElementID= function() { return gs1ElementID; }
	this.getSubKey		= function() { return subKey; }
	this.getLblEquiv	= function() { return lblEquiv; }
	this.getData_SAP 	= function() { return data_SAP ; }
	this.getData_EN 	= function() { return data_EN ; }
	this.getData_FR 	= function() { return data_FR ; }
	this.getTxtNote 	= function() { return txtNote ; }
	this.getEditable_EN = function() { return editable_EN ; }
	this.getEditable_FR = function() { return editable_FR ; }
	this.getMappedSAP 	= function() { return mappedSAP ; }
	
	this.getAsString 	= function() { return "GS1ELEMENTID:" + gs1ElementID + 
		", SUBKEY:" + subKey +
		", LBLEQUIV:" + lblEquiv +
		", DATA_SAP:" + data_SAP +
		", DATA_EN:" + data_EN +
		", DATA_FR:" + data_FR +
		", TXTNOTE:" + txtNote;
		", EDITABLE_EN:" + editable_EN +
		", EDITABLE_FR:" + editable_FR +
		", MAPPEDSAP:" + mappedSAP;
	}
	
}
{   // add braces to hide this declaration in Reader

    var Instance = new McItem();
}
function newItem() {
    return new McItem();
}

function setGs1ElementID(pData) { Instance.setGs1ElementID(pData); }
function setSubKey(pData) 		{ Instance.setSubKey(pData); }
function setLblEquiv(pData) 	{ Instance.setLblEquiv(pData); }
function setData_SAP(pData) 	{ Instance.setData_SAP(pData); }
function setData_EN(pData) 		{ Instance.setData_EN(pData); }	
function setData_FR(pData) 		{ Instance.setData_FR(pData); }	
function setTxtNote(pData) 		{ Instance.setTxtNote(pData); }	
function setEditable_EN(pData) 	{ Instance.setEditable_EN(pData); }	
function setEditable_FR(pData) 	{ Instance.setEditable_FR(pData); }	
function setMappedSAP(pData) 	{ Instance.setMappedSAP(pData)  ; }	

function getGs1ElementID() 		{ return Instance.getGs1ElementID(); }
function getSubKey() 			{ return Instance.getSubKey(); }
function getLblEquiv() 			{ return Instance.getLblEquiv(); }
function getData_SAP() 			{ return Instance.getData_SAP(); }
function getData_EN() 			{ return Instance.getData_EN(); }	
function getData_FR() 			{ return Instance.getData_FR(); }	
function getTxtNote() 			{ return Instance.getTxtNote(); }	
function getEditable_EN() 		{ return Instance.getEditable_EN(); }	
function getEditable_FR() 		{ return Instance.getEditable_FR(); }	
function getMappedSAP() 		{ return Instance.getMappedSAP()  ; }	

function getAsString() 			{ return Instance.getAsString(); }

function getKey()  { return Instance.getKey(); }
function setAll(pData)  		{
	//=== pData must be array of 10 items ===
	Instance.setGs1ElementID(pData[0]); 
	Instance.setSubKey(pData[1]); 
	Instance.setLblEquiv(pData[2]); 
	Instance.setData_SAP(pData[3]); 
	Instance.setData_EN(pData[4]); 	
	Instance.setData_FR(pData[5]);
	Instance.setTxtNote(pData[6]); 	
	Instance.setEditable_EN(pData[7]); 
	Instance.setEditable_FR(pData[8]); 
	Instance.setMappedSAP(pData[9]); 
}

//=== END: MasterCopyItem Declaration ===

