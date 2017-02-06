//=== BEGIN: NFTSection Declaration ===
//=== v.8.2 July 2, 2015 ===

//NFTSection { lblFormat, srvSize, items[]: NFTItem, footerRO, footerRW }
function NFTSection() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 
	var sectionID = "";
	var lblFormat = "";
	var srvSize = "";
	var items = new Object();			//=== Dictionary<Key(SpecId)>,<NFTItem> ===
	var itemBySeqN = new Array();		//=== keys(specId) of items in SeqN sequence: Array<String>
	var itemByAltKey = new Object();	//=== Dictionary<Key(altKey)>,<Key(SpecId)> - keys of items by AltKey = .nutrInt
	
	var footerRO = "";
	
/*	var footerRW = new Object();				//{EN:"", FR:""};		//=== [EN, FR]
	footerRW["EN"] = ""; footerRW["FR"] = "";
	var headerRW = new Object(); 				//{EN:"", FR:""};		//=== [EN, FR]
	headerRW["EN"] = ""; headerRW["FR"] = "";
*/	
	footerRW = {EN:"", FR:""};		//=== [EN, FR]
	headerRW = {EN:"", FR:""};		//=== [EN, FR]

	var baseQty = "";
	var baseQtyUnit = "";
	var baseQtyUnitTxt = "";
	var baseAltQty = "";
	var baseAltQtyUnit = "";
	var baseAltQtyUnitTxt = "";
	var srvSizeCont = "";
	var errorLog = "";
			
    // Declare these functions and make them public
    this.getKey = function() {return  sectionID;}
    
    // Provide accessors to private variables
	this.setSectionID 	= function(pData) { sectionID 	 	= pData; }
	this.setLblFormat	= function(pData) { lblFormat 	 	= pData; }
	this.setSrvSize 	= function(pData) { srvSize  	 	= pData; }

	this.setFooterRO 	= function(pData) { footerRO  	 	= pData; }
	this.setFooterRW	= function(lang,pData) { footerRW[lang]	= pData; }
	this.setHeaderRW	= function(lang,pData) { headerRW[lang]	= pData; }
	
	this.setBaseQty 		    = function(pData) { baseQty 		   	 	= pData; }
	this.setBaseQtyUnit 	   	= function(pData) { baseQtyUnit 	   	 	= pData; }
	this.setBaseQtyUnitTxt 		= function(pData) { baseQtyUnitTxt 	 	 	= pData; }
	this.setBaseAltQty 		   	= function(pData) { baseAltQty 		   	 	= pData; }
	this.setBaseAltQtyUnit 		= function(pData) { baseAltQtyUnit 	 	 	= pData; }
	this.setBaseAltQtyUnitTxt	= function(pData) { baseAltQtyUnitTxt 	 	= pData; }
	this.setSrvSizeCont 	   	= function(pData) { srvSizeCont 	   	 	= pData; }
	this.setErrorLog 	   		= function(pData) { errorLog 	   	 		= pData; }
	
	this.getSectionID 	= function () { return sectionID; }
	this.getLblFormat 	= function () { return lblFormat	; }
	this.getSrvSize  	= function () { return srvSize; } 
	
	this.getSrvSizeForOutput  	= function () { 
		if (baseAltQty!="0" && baseAltQty!="") {
			return baseAltQty + " " + baseAltQtyUnit;
		} else {
			return baseQty + " " + baseQtyUnit;
		}
	}
	this.getFooterRO  	= function (lang) { return footerRO[lang]; }
	this.getFooterRW 	= function (lang) { return footerRW[lang]; }
	this.getHeaderRW 	= function (lang) { return headerRW[lang]; }

	this.getBaseQty 			 = function () { return baseQty 			         ; }          	
	this.getBaseQtyUnit 		 = function () { return baseQtyUnit 		         ; }     	
	this.getBaseQtyUnitTxt 		 = function () { return baseQtyUnitTxt 		     ; }   		
	this.getBaseAltQty 			 = function () { return baseAltQty 			     ; }         	
	this.getBaseAltQtyUnit 		 = function () { return baseAltQtyUnit 		     ; }   		
	this.getBaseAltQtyUnitTxt 	 = function () { return baseAltQtyUnitTxt 	     ; }		
	this.getSrvSizeCont 		 = function () { return srvSizeCont 		         ; }     	
	this.getErrorLog 		 	 = function () { return errorLog 		         ; }     	

	this.setItem 				= function(iSeqN, pData) {
		items[pData.getKey()]= pData; 
		itemBySeqN[iSeqN] = pData.getKey();
		itemByAltKey[pData.getAltKey()] = pData.getKey();
	}
	this.getItemBySeqN 		= function(seqN) { 
		if (itemBySeqN.length>0) {
			var key = itemBySeqN[seqN];
			return items[key];
		} else {
			return null;
		}
	}
	this.getItemByKey 		= function(key) { return items[key];}
	this.getItemByAltKey	= function(altKey) { 
		key = itemByAltKey[altKey];
		return items[key];
	}
	
	this.getItemCount	= function ()	 { return itemBySeqN.length ; }	
	
}
{   // add braces to hide this declaration in Reader

    var Instance = new NFTSection();
}
function newItem() {
    return new NFTSection();
}

function setSectionID(pData) 		{ Instance.setSectionID(pData); }
function setLblFormat(pData) 		{ Instance.setLblFormat(pData); }
function setSrvSize (pData) 		{ Instance.setSrvSize (pData); }

function setFooterRO (pData) 		{ Instance.setFooterRO (pData); }
function setFooterRW(lang,pData)	{ Instance.setFooterRW(lang,pData); }
function setHeaderRW(lang,pData)	{ Instance.setHeaderRW(lang,pData); }

function setBaseQty 		 (pData) { Instance.setBaseQty 		 (pData);}
function setBaseQtyUnit 	 (pData) { Instance.setBaseQtyUnit 	     (pData);}
function setBaseQtyUnitTxt 	 (pData) { Instance.setBaseQtyUnitTxt 	 (pData);}
function setBaseAltQty 		 (pData) { Instance.setBaseAltQty 		 (pData);}
function setBaseAltQtyUnit 	 (pData) { Instance.setBaseAltQtyUnit 	 (pData);}
function setBaseAltQtyUnitTxt(pData) { Instance.setBaseAltQtyUnitTxt (pData);}
function setSrvSizeCont 	 (pData) { Instance.setSrvSizeCont 	     (pData);}
function setErrorLog 	 	(pData) { Instance.setErrorLog 	     (pData);}

function getSectionID() 			{ return Instance.getSectionID(); }
function getLblFormat() 			{ return Instance.getLblFormat(); }
function getSrvSize () 				{ return Instance.getSrvSize (); }
function getFooterRO () 			{ return Instance.getFooterRO (); }

function getFooterRW(lang)			{ return Instance.getFooterRW(lang); }
function getHeaderRW(lang)			{ return Instance.getHeaderRW(lang); }

function getBaseQty 		 ()	  { return Instance.getBaseQty 			 (); }          	
function getBaseQtyUnit 	 ()	  { return Instance.getBaseQtyUnit 		 (); }     	
function getBaseQtyUnitTxt 	 ()	  { return Instance.getBaseQtyUnitTxt 	 (); }   		
function getBaseAltQty 		 ()	  { return Instance.getBaseAltQty 		 (); }         	
function getBaseAltQtyUnit 	 ()	  { return Instance.getBaseAltQtyUnit 	 (); }   		
function getBaseAltQtyUnitTxt()	  { return Instance.getBaseAltQtyUnitTxt (); }		
function getSrvSizeCont 	 ()	  { return Instance.getSrvSizeCont 		 (); }     	
function getErrorLog 	 	 ()	  { return Instance.getErrorLog 		 (); }     	

function setItem(iSeqN, pData) 		{ Instance.setItem(iSeqN, pData) ; }	
function getItemBySeqN(indx) 		{ return Instance.getItemBySeqN(indx) ; }	
function getItemByKey(key) 			{ return Instance.getItemByKey(key) ; }	
function getItemByAltKey(altKey) 		{ return Instance.getItemByAltKey(altKey) ; }	

function getItemCount() 			{ return Instance.getItemCount() ; }	

function getKey()  { return Instance.getKey(); }
function getSrvSizeForOutput()		{ return Instance.getSrvSizeForOutput(); }

//=== END: NFTSection Declaration ===
