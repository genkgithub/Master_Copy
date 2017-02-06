//=== BEGIN: NFTItem Declaration ===
//=== v.8.2 July 2, 2015 ===

//NFTItem { posNr,nutrInt,specId, nutrText, flgShowItem, nv_set, flgInitialDecl} 

function NFTItem() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 
    
	//=== values loaded from data XML ===
	var posNr = "";
	var nutrInt = "";	//=== this used as alt. key ===
	var specId = "";	//=== this used as key ===
	var nutrText = "";
	var flgShowItem = "";
	var nv_set = new Object();
	var flgInitialDecl = "";
	//=== values calculated based on loaded - TODO ===
    var pdvPerct = 0;

	nv_set["STD_CALC"] = {val: "", dec: "", unit: "", unitTxt: ""};
	nv_set["STD_DECL"] = {val: "", dec: "", unit: "", unitTxt: ""};
	nv_set["RDA_CALC"] = {val: "", dec: "", unit: "", unitTxt: ""};
	nv_set["RDA_DECL"] = {val: "", dec: "", unit: "", unitTxt: ""};

	//=== aspect=STD_CALC, STD_DECL, RDA_CALC, RDA_DECL
	//=== nv_set[aspect] {value, decimal, unit, unitTxt};

    // Declare these functions and make them public
    this.getKey = function() {return specId;}
    this.getAltKey = function() {return nutrInt;}
    
    // Provide accessors to private variables
    this.setPosNr      			= function(pData) { posNr    	= pData; }
    this.setNutrInt    			= function(pData) { nutrInt  	= pData; }
    this.setSpecId    			= function(pData) { specId  	= pData; }
    this.setNutrText   			= function(pData) { nutrText  	= pData; }
    this.setFlgShowItem	     	= function(pData) { flgShowItem	  = pData; }
    this.setNv_set 		     	= function(aspect, pData) { 
	    //nv_set[aspect] = pData; 
	    nv_set[aspect].val = pData.val; 
	    nv_set[aspect].dec = pData.dec; 
	    nv_set[aspect].unit = pData.unit; 
	    nv_set[aspect].unitTxt = pData.unitTxt; 
	}	//=== pData = {val: "", dec: "", unit: "", unitTxt: ""}
    this.setFlgInitialDecl    	= function(pData) { flgInitialDecl = pData; }
	this.setPdvPerct  			= function(pData) { pdvPerct 	= pData; }

	this.getPosNr               = function() { return posNr  ;   }
	this.getNutrInt             = function() { return nutrInt;   }
	this.getSpecId             = function() { return specId;   }
	this.getNutrText   			= function() { return nutrText;   }
	this.getFlgShowItem      	= function() { return flgShowItem   ;   }
	this.getNv_set 				= function(aspect) { return nv_set[aspect] ; } //=== returns {val: "", dec: "", unit: "", unitTxt: ""}
	this.getFlgInitialDecl   	= function() { return flgInitialDecl;   }
	this.getPdvPerct 			= function() { return pdvPerct; }
			
	this.setAll		= function(pData)	{
	//=== pData must be array of 8 items ===
		posNr 		= pData[0];
		nutrInt 	= pData[1];
		specId 		= pData[2];		
		nutrText 	= pData[3];
		flgShowItem = pData[4];
		nv_set 		= pData[5];		//=== pData[5] = {val: "", dec: "", unit: "", unitTxt: ""}
		flgInitialDecl = pData[6];
	    pdvPerct 	= pData[7];
	}	
	
	this.setAllJSON 	= function(pData) 	{ 
		//=== set values using JSON string ===
		var oTmp = eval(pData);
		posNr 		= oTmp.posNr 		;    
		nutrInt 	= oTmp.nutrInt 	    ;
		specId 		= oTmp.specId 	    ;
		nutrText 	= oTmp.nutrText 	;  
		flgShowItem = oTmp.flgShowItem  ;
		nv_set 		= oTmp.nv_set;		//=== must be = {val: "", dec: "", unit: "", unitTxt: ""}
		flgInitialDecl = oTmp.flgInitialDecl;
	    pdvPerct 	= oTmp.pdvPerct;
	}
	
	this.getNvSetAsString = function(aspect) {
		return commons.getAllPropertiesAndValues(nv_set[aspect]);
	}
		
	this.getAsString 		= function() 		{ 
		return "\r\nNFTItem. POS:" + posNr + "," +
			"INT:" + nutrInt + "," +
			"EXT:" + specId + "," +		
			"TEXT:" + nutrText + "," +
			"FLG_SHOW_ITEM:" + flgShowItem + "," +
			"\r\nSTD_CALC:" + commons.getAllPropertiesAndValues(nv_set["STD_CALC"], false) + "," +
			"\r\nSTD_DECL:" + commons.getAllPropertiesAndValues(nv_set["STD_DECL"], false) + "," +
			"\r\nRDA_CALC:" + commons.getAllPropertiesAndValues(nv_set["RDA_CALC"], false) + "," +
			"\r\nRDA_DECL:" + commons.getAllPropertiesAndValues(nv_set["RDA_DECL"], false) + "," +
			"\r\nFLG_INDCL:" + flgInitialDecl + "," +
			"\r\PDV:" + pdvPerct;
	}	
}

{   // add braces to hide this declaration in Reader

    var Instance = new NFTItem();
}
function newItem() {
    return new NFTItem();
}

function setPosNr      		(pData) { Instance.setPosNr      		(pData); }   
function setNutrInt    		(pData) { Instance.setNutrInt    		(pData); }   
function setSpecId    		(pData) { Instance.setSpecId    		(pData); }   
function setNutrText   		(pData) { Instance.setNutrText   		(pData); }   
function setFlgShowItem	    (pData) { Instance.setFlgShowItem	    (pData); }
function setNv_set 		    (aspect, pData) { Instance.setNv_set 	(aspect, pData); }	//=== pData = {val: "", dec: "", unit: "", unitTxt: ""}
function setFlgInitialDecl  (pData) { Instance.setFlgInitialDecl   	(pData); }
function setPdvPerct  		(pData) { Instance.setPdvPerct  		(pData); }   

function getPosNr               () { return  Instance.getPosNr      (); }
function getNutrInt             () { return  Instance.getNutrInt    (); }
function getSpecId             	() { return  Instance.getSpecId    (); }
function getNutrText   			() { return  Instance.getNutrText   (); }
function getFlgShowItem      	() { return  Instance.getFlgShowItem(); }
function getNv_set		  (aspect) { return  Instance.getNv_set(aspect) ; } //=== returns {val: "", dec: "", unit: "", unitTxt: ""}
function getFlgInitialDecl   	() { return  Instance.getFlgInitialDecl  (); }
function getPdvPerct 			() { return  Instance.getPdvPerct 	(); }	    

function getKey()  				{ return Instance.getKey(); }
function getAltKey()  			{ return Instance.getAltKey(); }
function setAll(pData)  		{ Instance.setAll (pData); }
function setAllJSON (pJSON) 	{ Instance.setAllJSON (pJSON); }
//NFTItem { posNr,nutrInt,specId, nutrText, flgShowItem, nv_set, flgInitialDecl} 

function getAsString () 				{ return Instance.getString(); }

function getItemKey(pID, pType) {
	//=== Dummy - in all cases retrun just pID but can customized if format of MAIN!=ALT === 
	if (pType=="MAIN")
		return pID;
	else if (pType=="ALT")
		return pID;
	else 
		return pID;
}


//=== END: NFTItem Declaration ===
