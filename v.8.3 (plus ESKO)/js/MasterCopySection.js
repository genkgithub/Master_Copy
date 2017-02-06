//=== BEGIN: MasterCopySection Declaration ===
//=== v.8.2 July 2, 2015 ===
//MasterCopySection {sectionID: String , items[]: MasterCopyItem}
function McSection() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 
	var sectionID = "";
	var sectionName = "";
	var seqN = 0;
	var items = new Array();

	// Declare these functions and make them public
    this.getKey = function() {return  sectionID;}
    
    // Provide accessors to private variables
	this.setSectionID 	= function(pData) { sectionID 	 	= pData; }
	this.setSeqN		= function(pData) { seqN 	 		= pData; }
	this.setSectionName	= function(pData) { sectionName 	 	= pData; }
	this.setItem 		= function(indx, pData) { items[indx] 	= pData; }

	this.getSectionID 	= function () 	{ return sectionID; }
	this.getSeqN		= function() 	{ return seqN; }
	this.getSectionName = function () 	{ return sectionName; }
	this.getItem 		= function(indx) { return items[indx]; }

	this.getItemCount	= function ()	 { return items.length ; }	

	this.getAsString	= function ()	 { 
		var sOut = "=== Section: " + sectionID + "/" + sectionName + " ["+ seqN +"]==="  + "\r\n";
		for (var i=0; i<items.length; i++) {
			sOut = sOut + "item[" + i + "]" + items[i].getAsString() + "\r\n";
		}
		return sOut;
	}
		
}
{   // add braces to hide this declaration in Reader

    var Instance = new McSection();
}
function newItem() {
    return new McSection();
}

function setSectionID(pData) 		{ Instance.setSectionID(pData); }
function setSeqN(pData) 			{ Instance.setSeqN(pData); }
function setSectionName(pData) 		{ Instance.setSectionName(pData); }
function setItem(indx, pData) 		{ Instance.setItem(indx, pData) ; }	

function getSectionID() 			{ return Instance.getSectionID(); }
function getSeqN() 					{ return Instance.getSeqN(); }
function getSectionName() 			{ return Instance.getSectionName(); }
function getItem(indx) 				{ return Instance.getItem(indx) ; }	

function getItemCount() 			{ return Instance.getItemCount() ; }	

function getKey()  					{ return Instance.getKey(); }

function getAsString() 				{ return Instance.getAsString(); }


//=== END: MasterCopySection Declaration ===
