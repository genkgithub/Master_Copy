//=== BEGIN: NFTTemplate Declaration ===
//=== v.8.2 July 2, 2015 ===

//NFTTemplate { id, descr, headerMain, headerNote{EN,FR}[SOLD,PREP], footerNote{EN,FR}[SOLD,PREP],
//                items[]: NFTTemplateItem}
function NFTTemplate() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 
	var templateID = "";
	var descr = "";
	var headerMain = "";
	var headerNote = {SOLD: {EN:"", FR:""}, PREP: {EN:"", FR:""}};		//[SOLD,PREP].[EN,FR]
	var footerNote = {SOLD: {EN:"", FR:""}, PREP: {EN:"", FR:""}};		//[SOLD,PREP].[EN,FR]
	var colHdr 	   = {SOLD: {QTY:"", PDV:""}, PREP: {QTY:"", PDV:""}};	//[SOLD,PREP].[QTY,PDV]
	
	var items = new Object();			//=== Dictionary<Key(SpecId)>,<NFTItem> ===
	var itemBySeqN = new Array();		//=== keys(specId) of items in SeqN sequence: Array<String>

	var errorLog = "";
			
    // Declare these functions and make them public
    this.getKey = function() {return  id;}
    
    // Provide accessors to private variables
	this.setTemplateID 	= function(pData) { templateID 	 	= pData; }
	this.setDescr		= function(pData) { descr 	 		= pData; }
	this.setHeaderMain 	= function(pData) { headerMain 	 	= pData; }

	this.setHeaderNote	= function(aspect,pData) { headerNote[aspect]	= pData; }	//=== pData = {EN:"", FR:""}
	this.setFooterNote	= function(aspect,pData) { footerNote[aspect]	= pData; }	//=== pData = {EN:"", FR:""}

	this.setColHdr	= function(aspect,pData) 	{ colHdr[aspect]	= pData; }		//=== pData = {QTY:"", PDV:""}
	
	this.setErrorLog 	   		= function(pData) { errorLog 	   	 		= pData; }
	
	this.getTemplateID 	= function () { return templateID; }
	this.getDescr 	= function () { return descr	; }
	this.getHeaderMain  	= function () { return headerMain; } 
	
	this.getHeaderNote	= function(aspect) { return headerNote[aspect]; }	//=== returns: {EN:"", FR:""}
	this.getFooterNote	= function(aspect) { return footerNote[aspect]; }	//=== returns: {EN:"", FR:""}
	this.getColHdr		= function(aspect) { return colHdr[aspect]; }		//=== returns: {QTY:"", PDV:""}
	
	this.getErrorLog 		 	 = function () { return errorLog 		         ; }     	

	this.setItem 				= function(iSeqN, pData) {
		items[pData.getKey()]= pData; 
		itemBySeqN[iSeqN] = pData.getKey();
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
	this.getItemCount	= function ()	 { return itemBySeqN.length ; }	
	
	this.getAsString	= function ()	 { 
		var sOut = "=== Template: " + templateID + "/" + descr + " ==="  + "\r\n";
		sOut = sOut + "headerMain:" + headerMain + "\r\n";
		sOut = sOut + "headerNote[SOLD].EN" + headerNote.SOLD.EN + "\r\n";
		sOut = sOut + "headerNote[SOLD].FR" + headerNote.SOLD.FR + "\r\n";
		sOut = sOut + "headerNote[PREP].EN" + headerNote.PREP.EN + "\r\n";
		sOut = sOut + "headerNote[PREP].FR" + headerNote.PREP.FR + "\r\n";
		sOut = sOut + "footerNote[SOLD].EN" + footerNote.SOLD.EN + "\r\n";
		sOut = sOut + "footerNote[SOLD].FR" + footerNote.SOLD.FR + "\r\n";
		sOut = sOut + "footerNote[PREP].EN" + footerNote.PREP.EN + "\r\n";
		sOut = sOut + "footerNote[PREP].FR" + footerNote.PREP.FR + "\r\n";
		sOut = sOut + "colHdr[SOLD].QTY" + colHdr.SOLD.QTY + "\r\n";
		sOut = sOut + "colHdr[SOLD].PDV" + colHdr.SOLD.PDV + "\r\n";
		sOut = sOut + "colHdr[PREP].QTY" + colHdr.PREP.QTY + "\r\n";
		sOut = sOut + "colHdr[PREP].PDV" + colHdr.PREP.PDV + "\r\n";
				
		for (var key in items) {
			sOut = sOut + "item[" + key + "]" + items[key].getAsString() + "\r\n";
		}
		return sOut;
	}
}
{   // add braces to hide this declaration in Reader

    var Instance = new NFTTemplate();
}
function newItem() {
    return new NFTTemplate();
}

function setTemplateID(pData) 		{ Instance.setTemplateID(pData); }
function setDescr(pData) 			{ Instance.setDescr(pData); }
function setHeaderMain (pData) 		{ Instance.setHeaderMain (pData); }
function setHeaderNote(aspect,pData){ Instance.setHeaderNote(aspect,pData); }
function setFooterNote(aspect,pData){ Instance.setFooterNote(aspect,pData); }
function setColHdr(aspect,pData)	{ Instance.setColHdr(aspect,pData); }
function setErrorLog 	 	(pData) { Instance.setErrorLog 	     (pData);}

function getTemplateID() 			{ return Instance.getTemplateID(); }
function getDescr() 				{ return Instance.getDescr(); }
function getHeaderMain () 			{ return Instance.getHeaderMain (); }
function getHeaderNote(aspect)		{ return Instance.getHeaderNote(aspect); }
function getFooterNote(aspect)		{ return Instance.getFooterNote(aspect); }
function getColHdr(aspect)			{ return Instance.getColHdr(aspect); }

function getErrorLog 	 	 ()	  { return Instance.getErrorLog 		 (); }     	

function setItem(iSeqN, pData) 		{ Instance.setItem(iSeqN, pData) ; }	
function getItemBySeqN(indx) 		{ return Instance.getItemBySeqN(indx) ; }	
function getItemByKey(key) 			{ return Instance.getItemByKey(key) ; }	
function getItemCount() 			{ return Instance.getItemCount() ; }	

function getKey()  					{ return Instance.getKey(); }
function getAsString()  			{ return Instance.getAsString(); }


//=== END: NFTTemplate Declaration ===
