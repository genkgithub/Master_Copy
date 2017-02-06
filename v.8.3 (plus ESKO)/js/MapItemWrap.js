//=== BEGIN: MapItem Declaration ===
//=== v.8.2 July 2, 2015 ===
/*

{mapRcdID, sectionID,  sectionName, sectionSeqN, gs1ElementID, itemSeqN, lblEquiv, mapUsage,
	procType,
	subroot,path1,path2,
	vatKeyTag,      === either tag of the VAT root node (ALL_VATS_BY_TAG) or tag holding the key of VAT (ALL_VATS_BY_KEY)

	MapItem - done, Mapper - done
--	vatKeyValue,    === used only for ALL_VATS_BY_TAG/ALL_VATS_BY_KEY - holds the actual key value after "discovery", not loaded from Mapping XML
	dataTag,		=== used only for SINGLE_NODE and SELECT_NODES - tag of actual data 
	condTag1,condVal1,condTag2,condVal2,
	pathMinst, pathChar,

--	charNameTag,		MapItem - done, Mapper - done, XMLDAO - later
--	charValTag, 
--	textNameTag,
--	textValTag,   
	
	titleEN,titleFR,ipcElement,
	mInstSep, mCharSep
}

=== Column names in mapping XML ===
PROC_TYPE
XML_SUBROOT
XML_PATH1
XML_PATH2
VAT_KEY_TAG
DATA_TAG
COND1_TAG
COND1_VAL
COND2_TAG
COND2_VAL
PATH_MINST
PATH_CHAR
CHAR_NAME_TAG
CHAR_VAL_TAG
TEXT_NAME_TAG
TEXT_VAL_TAG
TITLE_EN
TITLE_FR
M_INST_SEP
M_CHAR_SEP
*/
function MapItem() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
		
    // Declare these variables and keep them private 
    var mapRcdID 		= "";		
    var sectionID 		= "";		
    var sectionName 	= "";		
    var sectionSeqN 	= "";		 
    var gs1ElementID	= "";		
    var itemSeqN 		= "";		
    var lblEquiv 		= "";		
    var mapUsage	 	= "";		
    var procType	 	= "";		
    var subroot 		= "";		
    var path1  			= "";		
    var path2  			= "";		
    var vatKeyTag  		= "";
	var vatKeyValue		= "";    
    var dataTag 		= "";
    var condTag1		= "";		
    var condVal1		= "";		
    var condTag2		= "";		
    var condVal2		= "";		
    	
    var pathMinst		= "";		
    var pathChar		= "";

	var charNameTag		= "";
	var charValTag		= ""; 
	var textNameTag		= "";
	var textValTag		= "";   
    
    var titleEN 		= "";
	var titleFR 		= "";
	var titleFR 		= "";
    var mInstSep 		= "";
    var mCharSep 		= "";

/*        		
    var sapObject 		= "";		
    var vatKey 			= "";		//this is used to load vat keys in case of LIST map item
    var sapcharKey 		= "";		
    var dataType 		= "";		
*/	
    // Declare these functions and make them public
    this.getKey = function() {
	    return "key:" + commons.RLTrim(sectionID).toUpperCase() + ":" + commons.RLTrim(gs1ElementID).toUpperCase() +
	    		":" + commons.RLTrim(vatKeyValue).toUpperCase();
	}
    
    // Provide accessors to private variables
    this.setMapRcdID 		= function(pData) {mapRcdID 		= pData; }
    this.setSectionID 		= function(pData) {sectionID 		= commons.RLTrim(pData).toUpperCase(); }
    this.setSectionName 	= function(pData) {sectionName 		= pData; }
    this.setSectionSeqN 	= function(pData) {sectionSeqN 	  	= pData; }
    this.setGs1ElementID	= function(pData) {gs1ElementID	  	= commons.RLTrim(pData).toUpperCase(); }
    this.setItemSeqN 		= function(pData) {itemSeqN 	   	= pData; }
    this.setLblEquiv 		= function(pData) {lblEquiv 	   	= pData; }
    this.setMapUsage 		= function(pData) {mapUsage			= pData; }
    this.setProcType 		= function(pData) {procType			= pData; }
    this.setSubroot  		= function(pData) {subroot  	   	= pData; }
    this.setPath1  			= function(pData) {path1  	   		= pData; }
    this.setPath2  			= function(pData) {path2  	   		= pData; }
    this.setVatKeyTag  		= function(pData) {vatKeyTag 	   	= pData; }
    this.setVatKeyValue 	= function(pData) {vatKeyValue 	   	= pData; }
    this.setDataTag  		= function(pData) {dataTag	   		= pData; }
    
    this.setCondTag1		= function(pData) {condTag1	   		= pData; }
    this.setCondVal1		= function(pData) {condVal1	   		= pData; }
    this.setCondTag2		= function(pData) {condTag2	   		= pData; }
    this.setCondVal2		= function(pData) {condVal2	   		= pData; }
    
    this.setPathMinst		= function(pData) {pathMinst	   	= pData; }
    this.setPathChar		= function(pData) {pathChar	   		= pData; }

    this.setCharNameTag		= function(pData) {charNameTag 		= pData; }
    this.setCharValTag		= function(pData) {charValTag  		= pData; }
    this.setTextNameTag		= function(pData) {textNameTag 		= pData; }
    this.setTextValTag		= function(pData) {textValTag  		= pData; }
    
    this.setTitleEN 		= function(pData) { titleEN 	 	= pData; }
	this.setTitleFR 		= function(pData) { titleFR 	 	= pData; }
    this.setIpcElement 		= function(pData) {ipcElement 	 	= pData; }
    this.setMInstSep 		= function(pData) {mInstSep 	 	= pData; }
    this.setMCharSep 		= function(pData) {mCharSep 	 	= pData; }
    
    this.getMapRcdID 		= function() { return mapRcdID; }
    this.getSectionID 		= function() { return sectionID;}
    this.getSectionName 	= function() { return sectionName;}
    this.getSectionSeqN 	= function() { return sectionSeqN; }
    this.getGs1ElementID	= function() { return gs1ElementID; }
    this.getItemSeqN 		= function() { return itemSeqN ; }
    this.getLblEquiv 		= function() { return lblEquiv; }
    this.getMapUsage 		= function() { return mapUsage; }
    this.getProcType 		= function() { return procType; }
    this.getSubroot 		= function() { return subroot; }
    this.getPath1  			= function() { return path1; }
    this.getPath2  			= function() { return path2; }
    this.getVatKeyTag  		= function() { return vatKeyTag; }
    this.getVatKeyValue		= function() { return vatKeyValue; }
    this.getDataTag 		= function() { return dataTag; }

    this.getCondTag1  		= function() { return condTag1; }
    this.getCondVal1  		= function() { return condVal1; }
    this.getCondTag2  		= function() { return condTag2; }
    this.getCondVal2  		= function() { return condVal2; }
   		
    this.getPathMinst  		= function() { return pathMinst   ; }
    this.getPathChar    	= function() { return pathChar    ; }

    this.getCharNameTag	   	= function() { return charNameTag	; }
    this.getCharValTag	   	= function() { return charValTag    ; }
    this.getTextNameTag   	= function() { return textNameTag   ; }
    this.getTextValTag	   	= function() { return textValTag    ; }
    
	this.getTitleEN 		= function() { return titleEN ; }
	this.getTitleFR 		= function() { return titleFR ; }
    this.getIpcElement 		= function() { return ipcElement; }

    this.getMInstSep 		= function() { return mInstSep; }
    this.getMCharSep 		= function() { return mCharSep; }
    
	this.getAsString 	= function() { return "RCDID:" + mapRcdID +
	     ",SECTION_ID:" + sectionID 	 +			
	     ",SECTION_NAME," + sectionName  +			
	     ",SECTION_SEQN:" + sectionSeqN  +			 
	     ",GS1_ELEMENT_ID:" + gs1ElementID +			
	     ",GS1_ELEMENT_SEQN:" + itemSeqN 	 +			
	     ",LBL_EQUIV:" + lblEquiv 	 +			
	     ",MAP_USAGE:" + mapUsage  +			
	     ",PROC_TYPE:" + procType  +			
	     ",XML_SUBROOT:" + subroot +
	     ",XML_PATH1:" + path1 +
	     ",XML_PATH2:" + path2 +
	     ",DATA_TAG:" + dataTag +
	     ",VAT_KEY_TAG:" + vatKeyTag +
	     ",VAT_KEY_VALUE:" + vatKeyValue +
	     ",COND_TAG1:" + condTag1 +
	     ",COND_VAL1:" + condVal1 +
	     ",COND_TAG2:" + condTag2 +
	     ",COND_VAL2:" + condVal2 + 
	     ",PATH_MINST:" + pathMinst + 
	     ",PATH_CHAR:" + pathChar + 
	     ",CHAR_NAME_TAG:" + charNameTag + 
	     ",CHAR_VAL_TAG:" + charValTag  + 
	     ",TEXT_NAME_TAG:" + textNameTag + 
	     ",TEXT_VAL_TAG:" + textValTag  + 
	     ",VAT_KEY_VALUE:" + vatKeyValue + 
	     (titleEN=="" ? "" : ", TITLE_EN:" + titleEN + ", TITLE_FR:" + titleFR);
	}
	
	this.setAllFromArray = function(pData)  {		
		//=== pData must be array of 29 items ===
		this.setMapRcdID		(pData[0]);
		this.setSectionID 		(commons.RLTrim(pData[1]).toUpperCase());
		this.setSectionName 	(pData[2]);
		this.setSectionSeqN 	(pData[3]);
		this.setGs1ElementID	(commons.RLTrim(pData[4]).toUpperCase());
		this.setItemSeqN 		(pData[5]);  
		this.setLblEquiv 		(pData[6]);   
		this.setMapUsage		(pData[7]);
		this.setProcType		(pData[8]);
		this.setSubroot  		(pData[9]);   		
		this.setPath1  			(pData[10]);   		
		this.setPath2  			(pData[11]);   		
		this.setVatKetTag  		(pData[12]);    
		this.setVatKetValue		(pData[13]);    
		this.setDataTag		  	(pData[14]);    
		this.setCondTag1		(pData[15]);    
		this.setCondVal1		(pData[16]);    
		this.setCondTag2		(pData[17]);    
		this.setCondVal2		(pData[18]);    
	
		this.setPathMinst		(pData[19]);    
		this.setPathChar		(pData[20]);    
	
		this.setCharNameTag		(pData[21]);    
		this.setCharValTag	 	(pData[22]);    
		this.setTextNameTag		(pData[23]);    
		this.setTextValTag	 	(pData[24]);    
		
		this.setTitleEN			(pData[25]); 
		this.setTitleFR			(pData[26]); 
		this.setMInstSep		(pData[27]); 
		this.setMCharSep		(pData[28]); 
		
	}
	this.setAllFromHash = function(pData)  {		
		//=== pData must be hashMap (associative array) with following keys: ===
		// ID, GS1_CAT_CODE, GS1_CAT_NAME, GS1_CAT_SEQN, GS1_ELEMENT, LBL_EQUIV, GS1_EL_SEQN, MAP_USAGE
		// PROC_TYPE, XML_SUBROOT, XML_PATH1, XML_PATH2, VAT_KEY_TAG, DATA_TAG
		// COND1_TAG, COND1_VAL, COND2_TAG, COND2_VAL
		// PATH_MINST, PATH_CHAR, 
		// CHAR_NAME_TAG, CHAR_VAL_TAG, TEXT_NAME_TAG, TEXT_VAL_TAG
		// TITLE_EN, TITLE_FR, IPC_ELEMENT, M_INST_SEP, M_CHAR_SEP
		//======================================================================
	
		this.setMapRcdID		(pData['ID']);
		this.setSectionID 		(commons.RLTrim(pData['GS1_CAT_CODE']).toUpperCase());
		this.setSectionName 	(pData['GS1_CAT_NAME']);
		this.setSectionSeqN 	(pData['GS1_CAT_SEQN']);
		this.setGs1ElementID	(commons.RLTrim(pData['GS1_ELEMENT']).toUpperCase());
		this.setItemSeqN 		(pData['GS1_EL_SEQN']);  
		this.setLblEquiv 		(pData['LBL_EQUIV']);   
		this.setMapUsage		(pData['MAP_USAGE']);
		this.setProcType		(pData['PROC_TYPE']);
		this.setSubroot  		(pData['XML_SUBROOT']);   		
		this.setPath1  			(pData['XML_PATH1']);   		
		this.setPath2  			(pData['XML_PATH2']);   		
		this.setVatKeyTag  		(pData['VAT_KEY_TAG']);    
		this.setVatKeyValue		('');    
		this.setDataTag		  	(pData['DATA_TAG']);    
		this.setCondTag1		(pData['COND1_TAG']);    
		this.setCondVal1		(pData['COND1_VAL']);    
		this.setCondTag2		(pData['COND2_TAG']);    
		this.setCondVal2		(pData['COND2_VAL']);    
	
		this.setPathMinst		(pData['PATH_MINST']);    
		this.setPathChar		(pData['PATH_CHAR']);    
	
		this.setCharNameTag		(pData['CHAR_NAME_TAG']);    
		this.setCharValTag	 	(pData['CHAR_VAL_TAG']);    
		this.setTextNameTag		(pData['TEXT_NAME_TAG']);    
		this.setTextValTag	 	(pData['TEXT_VAL_TAG']);    
		
		this.setTitleEN			(pData['TITLE_EN']); 
		this.setTitleFR			(pData['TITLE_FR']); 
		
		this.setIpcElement		(pData['IPC_ELEMENT']); 
		
		var sTmp = pData['M_INST_SEP'];
	    if (sTmp.indexOf("SEP")==0) 
	    	sTmp = sTmp.replace("SEP", "").replace("SEP", "");
		this.setMInstSep		(sTmp); 
		
		var sTmp = pData['M_CHAR_SEP'];
	    if (sTmp.indexOf("SEP")==0) 
	    	sTmp = sTmp.replace("SEP", "").replace("SEP", "");
		this.setMCharSep		(sTmp); 
		
	}
	this.setAllFromMapItem = function(pMapItemSrc)  {		
		//=== copy all fields from the MapItemSrc ===
		this.setMapRcdID		 (   pMapItemSrc.getMapRcdID		());   
		this.setSectionID 		 (   pMapItemSrc.getSectionID 		()); 
		this.setSectionName 	 (   pMapItemSrc.getSectionName 	());
		this.setSectionSeqN 	 (   pMapItemSrc.getSectionSeqN 	());
		this.setGs1ElementID	 (   pMapItemSrc.getGs1ElementID	());
		this.setItemSeqN 		 (   pMapItemSrc.getItemSeqN 		());  
		this.setLblEquiv 		 (   pMapItemSrc.getLblEquiv 		());  
		this.setMapUsage		 (   pMapItemSrc.getMapUsage		());   
		this.setProcType		 (   pMapItemSrc.getProcType		());   
		this.setSubroot  		 (   pMapItemSrc.getSubroot  		());  
		this.setPath1  			 (   pMapItemSrc.getPath1  			());   
		this.setPath2  			 (   pMapItemSrc.getPath2  			());   
		this.setVatKeyTag  		 (   pMapItemSrc.getVatKeyTag  		());
		this.setVatKeyValue		 (   pMapItemSrc.getVatKeyValue		());
		this.setDataTag		  	 (   pMapItemSrc.getDataTag		  	()); 
		this.setCondTag1		 (   pMapItemSrc.getCondTag1		 ());  
		this.setCondVal1		 (   pMapItemSrc.getCondVal1		 ());  
		this.setCondTag2		 (   pMapItemSrc.getCondTag2		 ());  
		this.setCondVal2		 (   pMapItemSrc.getCondVal2		 ());  
	                                                                   
		this.setPathMinst		 (   pMapItemSrc.getPathMinst		 ()); 
		this.setPathChar		 (   pMapItemSrc.getPathChar		 ());  
	                                                                    
		this.setCharNameTag		 (   pMapItemSrc.getCharNameTag		 ());
		this.setCharValTag	 	 (   pMapItemSrc.getCharValTag	 	 ());
		this.setTextNameTag		 (   pMapItemSrc.getTextNameTag		 ());
		this.setTextValTag	 	 (   pMapItemSrc.getTextValTag	 	 ());
		                                                                 
		this.setTitleEN			 (   pMapItemSrc.getTitleEN			 ());  
		this.setTitleFR			 (   pMapItemSrc.getTitleFR			 ());  
		                                                         
		this.setIpcElement		 (   pMapItemSrc.getIpcElement		 ());
		this.setMInstSep		 (   pMapItemSrc.getMInstSep		 ());
		this.setMCharSep		 (   pMapItemSrc.getMCharSep		 ());
		
	}
}
{   // add braces to hide this declaration in Reader

    var Instance = new MapItem();
}
function newItem() {
    return new MapItem();
}

function setMapRcdID		(pData) {Instance.setMapRcdID		(pData);}
function setSectionID 		(pData) {Instance.setSectionID 		(pData);}
function setSectionName 	(pData) {Instance.setSectionName 	(pData);}
function setSectionSeqN 	(pData) {Instance.setSectionSeqN 	(pData);}
function setGs1ElementID	(pData) {Instance.setGs1ElementID	(pData);}
function setItemSeqN 		(pData) {Instance.setItemSeqN 		(pData);}  
function setLblEquiv 		(pData) {Instance.setLblEquiv 		(pData);}   
function setMapUsage		(pData)	{Instance.setMapUsage		(pData);}
function setProcType		(pData)	{Instance.setProcType		(pData);}
function setSubroot 		(pData) {Instance.setSubroot		(pData);}   
function setPath1  			(pData) {Instance.setPath1  		(pData);}   
function setPath2  			(pData) {Instance.setPath2  		(pData);}   
function setVatKeyTag  		(pData) {Instance.setVatKeyTag  	(pData);}    
function setVatKeyValue 	(pData) {Instance.setVatKeyValue  	(pData);}    
function setDataTag 		(pData) {Instance.setDataTag 	 	(pData);}    
function setCondTag1  		(pData) {Instance.setCondTag1 		(pData);}    
function setCondVal1  		(pData) {Instance.setCondVal1 		(pData);}    
function setCondTag2  		(pData) {Instance.setCondTag2 		(pData);}    
function setCondVal2  		(pData) {Instance.setCondVal2 		(pData);}

function setPathMinst		(pData)	{Instance.setPathMinst		(pData); }
function setPathChar		(pData)	{Instance.setPathChar		(pData); }

function setCharNameTag		(pData)	{Instance.setCharNameTag	(pData); }
function setCharValTag		(pData)	{Instance.setCharValTag	 	(pData); }
function setTextNameTag		(pData)	{Instance.setTextNameTag	(pData); }
function setTextValTag		(pData)	{Instance.setTextValTag	 	(pData); }

function setTitleEN			(pData)	{Instance.setTitleEN		(pData);}	
function setTitleFR			(pData)	{Instance.setTitleFR		(pData);}	
function setIpcElement 		(pData) {Instance.setIpcElement 	(pData);}	 
function setMInstSep 		(pData) {Instance.setMInstSep 		(pData);}	 
function setMCharSep 		(pData) {Instance.setMCharSep 		(pData);}	 

function getMapRcdID 		(){ return Instance.getMapRcdID		(); }
function getSectionID 		(){ return Instance.getSectionID 	();	}
function getSectionName 	(){ return Instance.getSectionName 	();	}
function getSectionSeqN 	(){ return Instance.getSectionSeqN 	(); }
function getGs1ElementID	(){ return Instance.getGs1ElementID	(); }
function getItemSeqN 		(){ return Instance.getItemSeqN 	(); }
function getLblEquiv 		(){ return Instance.getLblEquiv 	(); }
function getMapUsage 		(){ return Instance.getMapUsage 	(); }
function getProcType	 	(){ return Instance.getProcType		(); }
function getSubroot 		(){ return Instance.getSubroot  	(); }
function getPath1  			(){ return Instance.getPath1  		(); }
function getPath2  			(){ return Instance.getPath2  		(); }
function getVatKeyTag  		(){ return Instance.getVatKeyTag  	(); }
function getVatKeyValue		(){ return Instance.getVatKeyValue 	(); }
function getDataTag 		(){ return Instance.getDataTag  	(); }
function getCondTag1 		(){ return Instance.getCondTag1 	(); }
function getCondVal1 		(){ return Instance.getCondVal1 	(); }
function getCondTag2 		(){ return Instance.getCondTag2		(); }
function getCondVal2 		(){ return Instance.getCondVal2 	(); }

function getPathMinst 		(){ return Instance.getPathMinst 	(); }
function getPathChar 		(){ return Instance.getPathChar 	(); }

function getCharNameTag		(){ return Instance.getCharNameTag	(); }
function getCharValTag	 	(){ return Instance.getCharValTag	(); }
function getTextNameTag		(){ return Instance.getTextNameTag (); }
function getTextValTag	 	(){ return Instance.getTextValTag	(); }

function getTitleEN			(){ return Instance.getTitleEN		(); }	
function getTitleFR			(){ return Instance.getTitleFR		(); }	
function getIpcElement 		(){ return Instance.getIpcElement 	();	}
function getMInstSep 		(){ return Instance.getMInstSep 	();	}
function getMCharSep 		(){ return Instance.getMCharSep 	();	}

function getAsString() 			{ return Instance.getAsString(); }

function getKey()  { return Instance.getKey(); }

function setAllFromArray(pData)  {		
	//=== pData must be array of 27 items ===
	Instance.setAllFromArray(pData);
}
function setAllFromHash(pData)  {		
	//=== pData must be hashMap (associative array) with following keys: ===
	// ID, GS1_CAT_CODE, GS1_CAT_NAME, GS1_CAT_SEQN, GS1_ELEMENT, LBL_EQUIV, GS1_EL_SEQN, MAP_USAGE
	// PROC_TYPE, XML_SUBROOT, XML_PATH1, XML_PATH2, VAT_KEY_TAG, DATA_TAG
	// COND1_TAG, COND1_VAL, COND2_TAG, COND2_VAL
	// PATH_MINST, PATH_CHAR, 
	// CHAR_NAME_TAG, CHAR_VAL_TAG, TEXT_NAME_TAG, TEXT_VAL_TAG
	// TITLE_EN, TITLE_FR, IPC_ELEMENT,M_INST_SEP,M_CHAR_SEP
	//======================================================================
	Instance.setAllFromHash(pData);
}
function setAllFromMapItem(pMapItemSrc)  {		
	//=== copy all fields from the MapItemSrc ===
	Instance.setAllFromMapItem(pMapItemSrc);   
}

//=== END: MapItem Declaration ===

