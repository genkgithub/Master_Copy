//=== BEGIN: NFTTemplateItem Declaration ===
//=== v.8.2 July 2, 2015 ===

//NFTTemplateItem { specId,flag_set{qty,pdv,unit}[SOLD,PREP]} 

function NFTTemplateItem() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 
    
	//=== values loaded from data XML ===
	var specId = "";	//=== this used as key ===
	var flag_set = new Object();

	flag_set["SOLD"] = {qty: "Y", pdv: "Y", unit: ""};
	flag_set["PREP"] = {qty: "Y", pdv: "Y", unit: ""};

	//=== flag_set[aspect] {qty, pdv, uom};   where aspect=SOLD,PREP

    // Declare these functions and make them public
    this.getKey = function() {return specId;}
    
    // Provide accessors to private variables
    this.setSpecId    			= function(pData) { specId  	= pData; }
    this.setFlag_set 		     	= function(aspect, pData) { 
	    flag_set[aspect].qty = pData.qty; 
	    flag_set[aspect].pdv = pData.pdv; 
	    flag_set[aspect].unit = pData.unit; 
	}	//=== pData = {qty: "", pdv: "", unit: ""}

	this.getSpecId              = function() { return specId;   }
	this.getFlag_set 			= function(aspect) { return flag_set[aspect] ; } //=== returns {qty: "", pdv: "", unit: ""}
			
	this.setAll		= function(pData)	{
	//=== pData must be array of 2 items ===
		specId 		= pData[0];		
		flag_set 	= pData[1];		//=== pData[1] = {"SOLD":{qty: "", pdv: "", unit: ""}, "PREP":{qty: "", pdv: "", unit: ""}}
	}	
	
	this.setAllJSON 	= function(pData) 	{ 
		//=== set values using JSON string ===
		var oTmp = eval(pData);
		specId 		= oTmp.specId;
		flag_set 	= oTmp.flag_set;	//=== must be = {"SOLD":{qty: "", pdv: "", unit: ""}, "PREP":{qty: "", pdv: "", unit: ""}}
	}
	
	this.getFlagSetAsString = function(aspect) {
		return commons.getAllPropertiesAndValues(flag_set[aspect]);
	}
		
	this.getAsString 		= function() 		{ 
		return "\r\nNFTTemplateItem. " +
			"SPECID:" + specId + "," +		
			"\r\nSOLD:" + commons.getAllPropertiesAndValues(flag_set["SOLD"], false) + "," +
			"\r\nPREP:" + commons.getAllPropertiesAndValues(flag_set["PREP"], false);
	}	
}

{   // add braces to hide this declaration in Reader

    var Instance = new NFTTemplateItem();
}
function newItem() {
    return new NFTTemplateItem();
}

function setSpecId    			(pData) { Instance.setSpecId    		(pData); }   
function setFlag_set 		    (aspect, pData) { Instance.setFlag_set 	(aspect, pData); }	//=== pData = {qty: "", pdv: "", unit: ""}

function getSpecId             	() { return  Instance.getSpecId    (); }
function getFlag_set		  	(aspect) { return  Instance.getFlag_set(aspect) ; } 		//=== returns {qty: "", pdv: "", unit: ""}

function getKey()  				{ return Instance.getKey(); }
function setAll(pData)  		{ Instance.setAll (pData); }
function setAllJSON (pJSON) 	{ Instance.setAllJSON (pJSON); }
//NFTTemplateItem { specId,flag_set{qty,pdv,unit}[SOLD,PREP]} 

function getAsString () 				{ return Instance.getString(); }

function getItemKey(pID) { return pID; }

//=== END: NFTTemplateItem Declaration ===
