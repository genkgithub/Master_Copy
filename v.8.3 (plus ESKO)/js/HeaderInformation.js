//=== v.8.2 July 2, 2015 ===
//HeaderInformation {UPC: String, ProductName: String, RA: String, ED: String, ProdDate: String}
function HI() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 

	var sUPC = "";
	var prodName = "";
	var userRA = "";
	var userED = "";
	var prodDate = "";

    // Declare these functions and make them public
    //this.getKey = function() {return  "key:" + sectionID;}
 
	// Provide accessors to private variables
	this.setUPC 		= function(pData) 	{ sUPC 	 	= pData; }
	this.setProdName	= function(pData) 	{ prodName 	= pData; }
	this.setUserRA 		= function(pData) 	{ userRA  	= pData; }
	this.setUserED 		= function(pData) 	{ userED 	= pData; }
	this.setProdDate 	= function(pData) 	{ prodDate 	= pData; }

	this.getUPC 		= function() 		{ return sUPC; }
	this.getProdName	= function() 		{ return prodName; }
	this.getUserRA 		= function() 		{ return userRA; }
	this.getUserED 		= function() 		{ return userED; }
	this.getProdDate 	= function() 		{ return prodDate; }
	
	this.getString 		= function() 		{ 
			return sUPC + "," + prodName + "," + userRA + "," + userED + "," + prodDate; 
		}
	
	this.setAllJSON 	= function(pData) 	{ 
		var oTmp = eval(pData);
		sUPC 	 	= oTmp.UPC; 
		prodName 	= oTmp.prodName;
		userRA  	= oTmp.userRA;  
		userED 		= oTmp.userED; 	
		prodDate 	= oTmp.prodDate;
	}
}
{   // add braces to hide this declaration in Reader

    var Instance = new HI();
}
function newItem() {
    return new HI();
}

function setUPC (pData) 				{ Instance.setUPC(pData); }
function setProdName (pData) 			{ Instance.setProdName (pData); }
function setUserRA (pData) 				{ Instance.setUserRA (pData); }
function setUserED (pData) 				{ Instance.setUserED (pData); }
function setProdDate (pData) 			{ Instance.setProdDate (pData); }

function getUPC () 				{ return Instance.getUPC(); }
function getProdName () 		{ return Instance.getProdName(); }
function getUserRA () 			{ return Instance.getUserRA(); }
function getUserED () 			{ return Instance.getUserED(); }
function getProdDate () 		{ return Instance.getProdDate(); }

// pJSON must be "({UPC:'xxxx',ProdName:'xxxxxx',UserRA:'xxxxx',UserED:'xxxxx',ProdDate:'xxxxx'})"
function setAllJSON (pJSON) 			{ Instance.setAllJSON (pJSON); }

function getString () 				{ return Instance.getString(); }


//=== END: HeaderInformation Declaration ===
