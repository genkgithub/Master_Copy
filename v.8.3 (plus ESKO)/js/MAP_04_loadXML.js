// === Use XML with full set of fields and 5 records ===
var strXML = 
"<dataroot xmlns:od='urn:schemas-microsoft-com:officedata' generated='2014-08-27T13:05:35'>" +
"<MAP_SECTIONS>" + 
	"<MAP_SECTION>" + 
		"<ID>1</ID>" + 
		"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" + 
		"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" + 
		"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" + 
		"<GS1_ELEMENT>BRAND_NAME</GS1_ELEMENT>" + 
		"<SORT_ORDER>1</SORT_ORDER>" + 
		"<IPC_CAT>Product Identity</IPC_CAT>" + 
		"<IPC_ELEMENT>BrandName</IPC_ELEMENT>" + 
		"<LBL_EQUIV>Brand</LBL_EQUIV>" + 
		"<SAP_OBJECT>test object 1</SAP_OBJECT>" + 
		"<VAT_KEY>test VAT 1</VAT_KEY>" + 
		"<CHAR_KEY>test CHAR 1</CHAR_KEY>" + 
		"<DATA_TYPE>TEXT</DATA_TYPE>" + 
		"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" + 
		"<XML_TAG>test1</XML_TAG>" + 
		"<XML_PATH>test1</XML_PATH>" + 
	"</MAP_SECTION>" + 
	"<MAP_SECTION>" + 
		"<ID>2</ID>" + 
		"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" + 
		"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" + 
		"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" + 
		"<GS1_ELEMENT>SUB_BRAND_NAME</GS1_ELEMENT>" + 
		"<SORT_ORDER>2</SORT_ORDER>" + 
		"<IPC_ELEMENT>SubBrandName</IPC_ELEMENT>" + 
		"<LBL_EQUIV>Sub Brand</LBL_EQUIV>" + 
		"<SAP_OBJECT>test object 2</SAP_OBJECT>" + 
		"<VAT_KEY>test VAT 2</VAT_KEY>" + 
		"<CHAR_KEY>test CHAR 2</CHAR_KEY>" + 
		"<DATA_TYPE>TEXT</DATA_TYPE>" + 
		"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" + 
		"<XML_TAG>test2</XML_TAG>" + 
		"<XML_PATH>test2</XML_PATH>" + 
	"</MAP_SECTION>" + 
	"<MAP_SECTION>" + 
		"<ID>3</ID>" + 
		"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" + 
		"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" + 
		"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" + 
		"<GS1_ELEMENT>FUNCTIONAL_NAME</GS1_ELEMENT>" + 
		"<SORT_ORDER>3</SORT_ORDER>" + 
		"<IPC_ELEMENT>Product</IPC_ELEMENT>" + 
		"<LBL_EQUIV>Product (Primary)</LBL_EQUIV>" + 
		"<SAP_OBJECT>test object 3</SAP_OBJECT>" + 
		"<VAT_KEY>test VAT 3</VAT_KEY>" + 
		"<CHAR_KEY>test CHAR 3</CHAR_KEY>" + 
		"<DATA_TYPE>TEXT</DATA_TYPE>" + 
		"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" + 
		"<XML_TAG>test3</XML_TAG>" + 
		"<XML_PATH>test3</XML_PATH>" + 
	"</MAP_SECTION>" + 
	"<MAP_SECTION>" + 
		"<ID>4</ID>" + 
		"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" + 
		"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" + 
		"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" + 
		"<GS1_ELEMENT>STATEMENT_OF_IDENTITY</GS1_ELEMENT>" + 
		"<SORT_ORDER>4</SORT_ORDER>" + 
		"<IPC_ELEMENT>StatementOfIdentity</IPC_ELEMENT>" + 
		"<LBL_EQUIV>Legal Name</LBL_EQUIV>" + 
		"<SAP_OBJECT>test object 4</SAP_OBJECT>" + 
		"<VAT_KEY>test VAT 4</VAT_KEY>" + 
		"<CHAR_KEY>test CHAR 4</CHAR_KEY>" + 
		"<DATA_TYPE>TEXT</DATA_TYPE>" + 
		"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" + 
		"<XML_TAG>test4</XML_TAG>" + 
		"<XML_PATH>test4</XML_PATH>" + 
	"</MAP_SECTION>" + 
	"<MAP_SECTION>" + 
		"<ID>5</ID>" + 
		"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" + 
		"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" + 
		"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" + 
		"<GS1_ELEMENT>TRADE_ITEM_FORM_DESCRIPTION</GS1_ELEMENT>" + 
		"<SORT_ORDER>5</SORT_ORDER>" + 
		"<IPC_ELEMENT>ProductForm</IPC_ELEMENT>" + 
		"<LBL_EQUIV>Pack Size</LBL_EQUIV>" + 
		"<SAP_OBJECT>test object 5</SAP_OBJECT>" + 
		"<VAT_KEY>test VAT 5</VAT_KEY>" + 
		"<CHAR_KEY>test CHAR 5</CHAR_KEY>" + 
		"<DATA_TYPE>TEXT</DATA_TYPE>" + 
		"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" + 
		"<XML_TAG>test5</XML_TAG>" + 
		"<XML_PATH>test5</XML_PATH>" + 
	"</MAP_SECTION>" + 
	"<MAP_SECTION>" + 
		"<ID>6</ID>" + 
		"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" + 
		"<GS1_CAT_NAME>Marketing Copy, Claims, Endorsements</GS1_CAT_NAME>" + 
		"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" + 
		"<GS1_ELEMENT>MARKETING_CLAIM</GS1_ELEMENT>" + 
		"<SORT_ORDER>1</SORT_ORDER>" + 
		"<IPC_ELEMENT>Claim</IPC_ELEMENT>" + 
		"<LBL_EQUIV>Claim</LBL_EQUIV>" + 
		"<SAP_OBJECT>test object 6</SAP_OBJECT>" + 
		"<VAT_KEY>test VAT 6</VAT_KEY>" + 
		"<CHAR_KEY>test CHAR 6</CHAR_KEY>" + 
		"<DATA_TYPE>TEXT</DATA_TYPE>" + 
		"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" + 
		"<XML_TAG>test6</XML_TAG>" + 
		"<XML_PATH>test6</XML_PATH>" + 
	"</MAP_SECTION>" + 
	"<MAP_SECTION>" + 
		"<ID>7</ID>" + 
		"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" + 
		"<GS1_CAT_NAME>Marketing Copy, Claims, Endorsements</GS1_CAT_NAME>" + 
		"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" + 
		"<GS1_ELEMENT>VIOLATOR</GS1_ELEMENT>" + 
		"<SORT_ORDER>2</SORT_ORDER>" + 
		"<IPC_ELEMENT>Violator</IPC_ELEMENT>" + 
		"<LBL_EQUIV>Flash</LBL_EQUIV>" + 
		"<SAP_OBJECT>test object 7</SAP_OBJECT>" + 
		"<VAT_KEY>test VAT 7</VAT_KEY>" + 
		"<CHAR_KEY>test CHAR 7</CHAR_KEY>" + 
		"<DATA_TYPE>TEXT</DATA_TYPE>" + 
		"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" + 
		"<XML_TAG>test7</XML_TAG>" + 
		"<XML_PATH>test7</XML_PATH>" + 
	"</MAP_SECTION>" + 
"</MAP_SECTIONS>" + 
"</dataroot>";

xfa.datasets.loadXML(strXML, false, false);
xfa.datasets.saveXML(); 

m_xmlMapSections.value = strXML;

xfa.host.messageBox("Completed.", "",3);
