//=== v.7.3 Mar 4, 2015 ===
/***************************************************************
*  Path to FOLDER SCRIPTS: app.getPath("app","javascript")
*  C:\Program Files\Adobe\Acrobat 11.0\Acrobat\Javascripts
*
***************************************************************/


//=== see this: https://acrobatusers.com/tutorials/how-save-pdf-acrobat-javascript
// also see this below:
// Look in the Acrobat JavaScript reference for the functions “doc.closeDoc()” and “app.openDoc()”. 
//
// Read this article:
// http://acrobatusers.com/tutorials/splitting-and-rebuilding-strings


var trustedSaveAs = app.trustedFunction(
	function(oDoc, pPath, pNewFname)
	{
		app.beginPriv();
		var sSaveAsFname;		// = pPath + "/" + pNewFname;
		
		//sSaveAsFname = pPath + pNewFname;
		//=== We ALWAYS save in current folder ===
		sSaveAsFname = "./" + pNewFname;
		try{
			oDoc.saveAs(sSaveAsFname);
		}catch(e){
			app.alert("Error During Save. " + e + ". sSaveAsFname=" + sSaveAsFname);
		}
		app.endPriv();
	}
);

var trustedReadFileToString = app.trustedFunction(
	function(pPath, pFname)
	{
		app.beginPriv();
		
		//=== We ALWAYS load from current folder ===
		var sFullName = "";
		if (pPath=="") {
			sFullName = "./" + pFname;
		} else {
			sFullName = pPath + pFname;
		}
		var strTextData = "";
		try{
			var stmFileData = util.readFileIntoStream(sFullName);
			// Convert data into a String
			strTextData = util.stringFromStream(stmFileData, "utf-8");
		}catch(e){
			app.alert("Error During readFileIntoStream. " + e + ".sFullName =" + sFullName);
		}
		return strTextData;
		app.endPriv();
	}
);

function getNewPathAndFname(pPathAndFname, pNewFname) {
	//=== pPathAndFname must be path in ADOBE form: /c/dir1/dir2/.../filename ===
	// Split Path into an array so it is easy to work with
	var aParts = pPathAndFname.split("/");
	// Remove old file name
	aParts.pop();
	// Add new file name
	aParts.push(pNewFname);
	// Put path back together and save
	return aParts.join("/");
}

function getCurrentDateString(pSepar) {
	var currentdate = new Date();
    return currentdate.getDate() + pSepar +(currentdate.getMonth()+1) + pSepar + currentdate.getFullYear();
}
function getCurrentTimeString(pSepar) {
	var currentdate = new Date();
    return currentdate.getHours() + pSepar + currentdate.getMinutes() + pSepar + currentdate.getSeconds();
}
