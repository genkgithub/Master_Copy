//=== BEGIN: MasterCopy Declaration ===
//=== v.8.2 July 2, 2015 ===
//MasterCopy {HI: HeaderInformation, sections{}: MasterCopySection}
function MC() {
	//=== see: ===
	//http://blogs.adobe.com/formfeed/2009/09/script_objects_deep_dive.html
	
    // Declare these variables and keep them private 
	var sections = new Object();
	var headerInformation;
	var sectionBySeqN = new Array();
	
    // Declare these functions and make them public
    
    // Provide accessors to private variables
	this.getHeaderInformation = function() { return headerInformation; }
	this.getSections 		= function() { return sections; }
	this.getSection 		= function(pKey) { return sections[pKey]; }

	this.getSectionBySeqN 	= function(seqN) { 
		if (sectionBySeqN.length>0) {
			var key = sectionBySeqN[seqN];
			//xfa.host.messageBox("===getSectionBySeqN("  + seqN + "): key=" + key,"",3);
			return sections[key];
		} else {
			return null;
		}
	}
	
	this.setHeaderInformation = function(pData) { headerInformation = pData; }
	this.setSection			= function(pData) { 
		sections[pData.getKey()] = pData;
		sectionBySeqN[pData.getSeqN()] = pData.getKey();
		var seqN = pData.getSeqN();
		//xfa.host.messageBox("===setSection("  + seqN + "): key=" + pData.getKey() + ", sectionBySeqN[seqN]=" + sectionBySeqN[seqN],"",3);	
	}
	this.getAsString 		= function(pFull) {
		var sOut = "=========== MasterCopy contents ===========";		
		for (var iSeqN = 1; iSeqN <= sectionBySeqN.length; iSeqN++) {
			var key = sectionBySeqN[iSeqN];
			if (pFull==true) {
				sOut = sOut + "\r\n" + this.getSection(key).getAsString();
			} else {
				sOut = sOut + "\r\n=== Section[" + iSeqN + "]. key=" + key;
			}
		}
	}
}
{   // add braces to hide this declaration in Reader

    var Instance = new MC();
}
function newItem() {
    return new MC();
}

function getHeaderInformation() 	{ return Instance.getHeaderInformation(); }
function getSections() 				{ return Instance.getSections() ; }	
function getSection(pKey) 			{ return Instance.getSection(pKey) ; }	
function getSectionBySeqN(seqN) 	{ return Instance.getSectionBySeqN(seqN) ;} 

function setHeaderInformation(pData) 		{ Instance.setHeaderInformation(pData); }
function setSection(pData) 		{ Instance.setSection(pData) ; }	
function getAsString(pFull)  	{return Instance.getAsString(pFull); }


//=== END: MasterCopy Declaration ===
