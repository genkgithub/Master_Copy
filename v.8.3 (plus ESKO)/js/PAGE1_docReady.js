// abap::ready:form - (JavaScript, client)

xfa.resolveNode(m_root.value + ".Page1.subMain.subUnitTest").presence="visible";

var oCbxTemplate = xfa.resolveNode(m_root.value + ".Page1.subMain.subHeaderInfo.subCommands.cbxTemplate");

var oTemplateMaster = new Array();
oTemplateMaster[0] = {itemText: "1.1 Template 1.1", itemCode: "1.1"};
oTemplateMaster[1] = {itemText: "1.2 Template 1.2", itemCode: "1.2"};
oTemplateMaster[2] = {itemText: "1.3 Template 1.3", itemCode: "1.3"};
oTemplateMaster[3] = {itemText: "1.4 Template 1.4", itemCode: "1.4"};
oTemplateMaster[4] = {itemText: "1.5 Template 1.5", itemCode: "1.5"};
oTemplateMaster[5] = {itemText: "1.6 Template 1.6", itemCode: "1.6"};

oCbxTemplate.clearItems();
for (var i=0; i<6; i++) {
	oCbxTemplate.addItem(oTemplateMaster[i].itemText);
}


