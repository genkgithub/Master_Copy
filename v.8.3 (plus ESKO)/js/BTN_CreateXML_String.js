// === Use map XML built by MS ACCESS utility from EXCEL mapping ===
var strXML = "";
var strSection = new Array(); 

var strXML = 
"<abap xmlns:od='urn:schemas-microsoft-com:officedata' generated='2014-08-27T13:05:35'>" +
"<MAP_SECTIONS>";

 strSection[0] = "" +   
"<MAP_SECTION>" +
"<ID>51</ID>" +
"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>BRAND_NAME</GS1_ELEMENT>" +
"<SORT_ORDER>1</SORT_ORDER>" +
"<IPC_CAT>Product Identity</IPC_CAT>" +
"<IPC_ELEMENT>BrandName</IPC_ELEMENT>" +
"<LBL_EQUIV>Brand</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[1] = "" +   
"<MAP_SECTION>" +
"<ID>52</ID>" +
"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>SUB_BRAND_NAME</GS1_ELEMENT>" +
"<SORT_ORDER>2</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>SubBrandName</IPC_ELEMENT>" +
"<LBL_EQUIV>Sub Brand</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[2] = "" +   
"<MAP_SECTION>" +
"<ID>53</ID>" +
"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>FUNCTIONAL_NAME</GS1_ELEMENT>" +
"<SORT_ORDER>3</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>Product</IPC_ELEMENT>" +
"<LBL_EQUIV>Product (Primary)</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[3] = "" +   
"<MAP_SECTION>" +
"<ID>54</ID>" +
"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>STATEMENT_OF_IDENTITY</GS1_ELEMENT>" +
"<SORT_ORDER>4</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>StatementOfIdentity</IPC_ELEMENT>" +
"<LBL_EQUIV>Legal Name</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[4] = "" +   
"<MAP_SECTION>" +
"<ID>55</ID>" +
"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>TRADE_ITEM_FORM_DESCRIPTION</GS1_ELEMENT>" +
"<SORT_ORDER>5</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>ProductForm</IPC_ELEMENT>" +
"<LBL_EQUIV>Pack Size</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[5] = "" +   
"<MAP_SECTION>" +
"<ID>56</ID>" +
"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>VARIANT</GS1_ELEMENT>" +
"<SORT_ORDER>6</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>ProductVariant</IPC_ELEMENT>" +
"<LBL_EQUIV>Product (Secondary)</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[6] = "" +   
"<MAP_SECTION>" +
"<ID>57</ID>" +
"<GS1_CAT_CODE>PRODUCT_IDENTITY</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Product Identity</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>1</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>ADDITIONAL_PRODUCT_VARIANT_INFORMATION</GS1_ELEMENT>" +
"<SORT_ORDER>7</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>AdditionalInformation</IPC_ELEMENT>" +
"<LBL_EQUIV>Product (Tertiary)</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[7] = "" +   
"<MAP_SECTION>" +
"<ID>58</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>MARKETING_CLAIM</GS1_ELEMENT>" +
"<SORT_ORDER>1</SORT_ORDER>" +
"<IPC_CAT>Marketing Copy, Claims and Endorsements</IPC_CAT>" +
"<IPC_ELEMENT>Claim</IPC_ELEMENT>" +
"<LBL_EQUIV>Claim</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>CHAR_VALUE</XML_TAG>" +
"<XML_PATH>PRODUCT_CLAIMS.MARKET_CLAIMS.ZMAS_MARKET_CLAIMS.TEXT_MARKETING_CLAIMS</XML_PATH>" +
"</MAP_SECTION>";
 strSection[8] = "" +   
"<MAP_SECTION>" +
"<ID>59</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>VIOLATOR</GS1_ELEMENT>" +
"<SORT_ORDER>2</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>Violator</IPC_ELEMENT>" +
"<LBL_EQUIV>Flash</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[9] = "" +   
"<MAP_SECTION>" +
"<ID>60</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>PROMOTIONAL_COPY</GS1_ELEMENT>" +
"<SORT_ORDER>3</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>PromotionalCopy</IPC_ELEMENT>" +
"<LBL_EQUIV>Brand Story / Romance Copy</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[10] = "" +   
"<MAP_SECTION>" +
"<ID>61</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>CONTENT_CLAIM </GS1_ELEMENT>" +
"<SORT_ORDER>4</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>ContentClaim</IPC_ELEMENT>" +
"<LBL_EQUIV>Content Claim</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[11] = "" +   
"<MAP_SECTION>" +
"<ID>62</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>MARKETING_COPY</GS1_ELEMENT>" +
"<SORT_ORDER>5</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>MarketingCopy</IPC_ELEMENT>" +
"<LBL_EQUIV>Marketing Copy</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[12] = "" +   
"<MAP_SECTION>" +
"<ID>63</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>WARRANTY_DESCRIPTION</GS1_ELEMENT>" +
"<SORT_ORDER>6</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>Warranty</IPC_ELEMENT>" +
"<LBL_EQUIV>Warranty Statement</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[13] = "" +   
"<MAP_SECTION>" +
"<ID>64</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>THIRD_PARTY_ENDORSEMENTS</GS1_ELEMENT>" +
"<SORT_ORDER>7</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>ThirdPartyEndorsements</IPC_ELEMENT>" +
"<LBL_EQUIV>Third Party Endorsements</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[14] = "" +   
"<MAP_SECTION>" +
"<ID>65</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>NET_CONTENT_STATEMENT</GS1_ELEMENT>" +
"<SORT_ORDER>8</SORT_ORDER>" +
"<IPC_CAT>Nominal Content</IPC_CAT>" +
"<IPC_ELEMENT>NetContentsStatement</IPC_ELEMENT>" +
"<LBL_EQUIV>Weight Statement</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[15] = "" +   
"<MAP_SECTION>" +
"<ID>66</ID>" +
"<GS1_CAT_CODE>MARKETING_COPY_ETC</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Marketing Copy, Claims and Endorsements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>2</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>PACKAGE_COUNT</GS1_ELEMENT>" +
"<SORT_ORDER>9</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>PackageCount</IPC_ELEMENT>" +
"<LBL_EQUIV>Quantity Statement</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[16] = "" +   
"<MAP_SECTION>" +
"<ID>68</ID>" +
"<GS1_CAT_CODE>GLOBAL_WARNING_ST</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Global Warning and Caution Statements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>3</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>WARNING_STATEMENTS</GS1_ELEMENT>" +
"<SORT_ORDER>1</SORT_ORDER>" +
"<IPC_CAT>Global Warning and Caution Statements</IPC_CAT>" +
"<IPC_ELEMENT>WarningStatements</IPC_ELEMENT>" +
"<LBL_EQUIV>Warning Statement - QA Driven</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[17] = "" +   
"<MAP_SECTION>" +
"<ID>69</ID>" +
"<GS1_CAT_CODE>GLOBAL_WARNING_ST</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Global Warning and Caution Statements</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>3</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>ALLERGEN_STATEMENT</GS1_ELEMENT>" +
"<SORT_ORDER>3</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>AllergyWarnings</IPC_ELEMENT>" +
"<LBL_EQUIV>Allergen Statement</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[18] = "" +   
"<MAP_SECTION>" +
"<ID>70</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>GENERAL_INSTRUCTIONS</GS1_ELEMENT>" +
"<SORT_ORDER>1</SORT_ORDER>" +
"<IPC_CAT>Usage Instructions, Recycling and Consumer Relations Info</IPC_CAT>" +
"<IPC_ELEMENT>Instructions</IPC_ELEMENT>" +
"<LBL_EQUIV>Instructions</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[19] = "" +   
"<MAP_SECTION>" +
"<ID>72</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>OPENING_INSTRUCTIONS</GS1_ELEMENT>" +
"<SORT_ORDER>2</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>OpeningInstructions</IPC_ELEMENT>" +
"<LBL_EQUIV>Opening Instructions</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[20] = "" +   
"<MAP_SECTION>" +
"<ID>73</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>STORAGE_INSTRUCTIONS</GS1_ELEMENT>" +
"<SORT_ORDER>3</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>StorageInstructions</IPC_ELEMENT>" +
"<LBL_EQUIV>Storage Instructions</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[21] = "" +   
"<MAP_SECTION>" +
"<ID>74</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>USAGE_INSTRUCTIONS</GS1_ELEMENT>" +
"<SORT_ORDER>4</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>UsageInstructions</IPC_ELEMENT>" +
"<LBL_EQUIV>Handling Instructions</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[22] = "" +   
"<MAP_SECTION>" +
"<ID>75</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>RECYCLE_STATEMENT</GS1_ELEMENT>" +
"<SORT_ORDER>5</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>RecycleStatements</IPC_ELEMENT>" +
"<LBL_EQUIV>Recycling Statements</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[23] = "" +   
"<MAP_SECTION>" +
"<ID>76</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>CONTACT_INFORMATION</GS1_ELEMENT>" +
"<SORT_ORDER>6</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>RegionalContactInformation</IPC_ELEMENT>" +
"<LBL_EQUIV>Phone Number</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[24] = "" +   
"<MAP_SECTION>" +
"<ID>77</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>WEBSITE</GS1_ELEMENT>" +
"<SORT_ORDER>7</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>Website</IPC_ELEMENT>" +
"<LBL_EQUIV>Website</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[25] = "" +   
"<MAP_SECTION>" +
"<ID>78</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>OTHER_INSTRUCTIONS</GS1_ELEMENT>" +
"<SORT_ORDER>8</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>OtherMDOSpecificRequirements</IPC_ELEMENT>" +
"<LBL_EQUIV>AAFCO Statements</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[26] = "" +   
"<MAP_SECTION>" +
"<ID>79</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>DISPOSAL_INFORMATION</GS1_ELEMENT>" +
"<SORT_ORDER>9</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>DisposalInformation</IPC_ELEMENT>" +
"<LBL_EQUIV>Disposal Instructions</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[27] = "" +   
"<MAP_SECTION>" +
"<ID>80</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>INGREDIENTS_DECLARATION </GS1_ELEMENT>" +
"<SORT_ORDER>10</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>IngredientsDeclaration</IPC_ELEMENT>" +
"<LBL_EQUIV>Ingredients</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[28] = "" +   
"<MAP_SECTION>" +
"<ID>81</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>ACTIVE_INGREDIENTS_DECLARATION</GS1_ELEMENT>" +
"<SORT_ORDER>11</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>ActiveIngredients</IPC_ELEMENT>" +
"<LBL_EQUIV>Medicinal</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[29] = "" +   
"<MAP_SECTION>" +
"<ID>82</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>INACTIVE_INGREDIENTS_DECLARATION</GS1_ELEMENT>" +
"<SORT_ORDER>12</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>InactiveIngredients</IPC_ELEMENT>" +
"<LBL_EQUIV>Non-medicinal</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[30] = "" +   
"<MAP_SECTION>" +
"<ID>83</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>NUTRITION_FACTS</GS1_ELEMENT>" +
"<SORT_ORDER>13</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>NutritionFacts</IPC_ELEMENT>" +
"<LBL_EQUIV>Nutritional Bullets</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>CHAR_VALUE</XML_TAG>" +
"<XML_PATH>PRODUCT_CLAIMS.NUTRITION_CLAIMS.ZMAS_NUTRITION_CLAIMS</XML_PATH>" +
"</MAP_SECTION>";
 strSection[31] = "" +   
"<MAP_SECTION>" +
"<ID>84</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>SHELF_LIFE_STATEMENT</GS1_ELEMENT>" +
"<SORT_ORDER>14</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>ShelfLifeStatement</IPC_ELEMENT>" +
"<LBL_EQUIV>Best Before</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[32] = "" +   
"<MAP_SECTION>" +
"<ID>85</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>NUTRITIONAL_CLAIM</GS1_ELEMENT>" +
"<SORT_ORDER>15</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>NutritionClaims</IPC_ELEMENT>" +
"<LBL_EQUIV>Nutrient Content Claim</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[33] = "" +   
"<MAP_SECTION>" +
"<ID>86</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>REGISTRATION_INFORMATION</GS1_ELEMENT>" +
"<SORT_ORDER>16</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>RegistrationNumbers</IPC_ELEMENT>" +
"<LBL_EQUIV>Meat Inspection Number and other registration numbers DIN/NPN</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[34] = "" +   
"<MAP_SECTION>" +
"<ID>87</ID>" +
"<GS1_CAT_CODE>USAGE_CONS_INFO</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Usage Instructions and Consumer Relations Info</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>4</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>QUALITY_STATEMENTS</GS1_ELEMENT>" +
"<SORT_ORDER>17</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>QualityStatements</IPC_ELEMENT>" +
"<LBL_EQUIV>Quality Statement</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[35] = "" +   
"<MAP_SECTION>" +
"<ID>88</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>DISTRIBUTION_STATEMENT</GS1_ELEMENT>" +
"<SORT_ORDER>1</SORT_ORDER>" +
"<IPC_CAT>Distribution and Manufacturing</IPC_CAT>" +
"<IPC_ELEMENT>DistributionStatement</IPC_ELEMENT>" +
"<LBL_EQUIV>Domicile</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[36] = "" +   
"<MAP_SECTION>" +
"<ID>89</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>PACKING_STATEMENT</GS1_ELEMENT>" +
"<SORT_ORDER>2</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>PackagingStatement</IPC_ELEMENT>" +
"<LBL_EQUIV>Brand Statement</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[37] = "" +   
"<MAP_SECTION>" +
"<ID>90</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>LOCATION_OF_ORIGIN</GS1_ELEMENT>" +
"<SORT_ORDER>3</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>CountryOfOrigin</IPC_ELEMENT>" +
"<LBL_EQUIV>Import Statement</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[38] = "" +   
"<MAP_SECTION>" +
"<ID>91</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>INTERNAL_PACKAGE_IDENTIFIER</GS1_ELEMENT>" +
"<SORT_ORDER>4</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>InternalPackageIdentifier</IPC_ELEMENT>" +
"<LBL_EQUIV>Project Code</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[39] = "" +   
"<MAP_SECTION>" +
"<ID>92</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>COPYRIGHT_TRADEMARK_STATEMENT</GS1_ELEMENT>" +
"<SORT_ORDER>5</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>Trademark</IPC_ELEMENT>" +
"<LBL_EQUIV>Trademark</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[40] = "" +   
"<MAP_SECTION>" +
"<ID>93</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>COPYRIGHT</GS1_ELEMENT>" +
"<SORT_ORDER>6</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>Copyright</IPC_ELEMENT>" +
"<LBL_EQUIV>Copyright Year</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[41] = "" +   
"<MAP_SECTION>" +
"<ID>94</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>UNDER_LICENSE_STATEMENT</GS1_ELEMENT>" +
"<SORT_ORDER>7</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>UnderLicenseStatement</IPC_ELEMENT>" +
"<LBL_EQUIV>Used under License</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[42] = "" +   
"<MAP_SECTION>" +
"<ID>95</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>PRODUCT_DISPLAY_DISCLAIMER</GS1_ELEMENT>" +
"<SORT_ORDER>8</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>ProductDisplayDisclaimer</IPC_ELEMENT>" +
"<LBL_EQUIV>Product Disclaimer</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[43] = "" +   
"<MAP_SECTION>" +
"<ID>96</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>CROSS_SELL</GS1_ELEMENT>" +
"<SORT_ORDER>9</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>CrossSell</IPC_ELEMENT>" +
"<LBL_EQUIV>Chef's Tip</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[44] = "" +   
"<MAP_SECTION>" +
"<ID>97</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>DIET_EXCHANGES</GS1_ELEMENT>" +
"<SORT_ORDER>10</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>DietExchanges</IPC_ELEMENT>" +
"<LBL_EQUIV>Canada's Food Guide</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[45] = "" +   
"<MAP_SECTION>" +
"<ID>98</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>CONSUMER_GUARANTEE</GS1_ELEMENT>" +
"<SORT_ORDER>11</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>ConsumerGuarantee</IPC_ELEMENT>" +
"<LBL_EQUIV>Guarantee Statement</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
 strSection[46] = "" +   
"<MAP_SECTION>" +
"<ID>99</ID>" +
"<GS1_CAT_CODE>DISTRIB_MANUF</GS1_CAT_CODE>" +
"<GS1_CAT_NAME>Distribution and Manufacturing</GS1_CAT_NAME>" +
"<GS1_CAT_SEQN>5</GS1_CAT_SEQN>" +
"<GS1_ELEMENT>RECIPE </GS1_ELEMENT>" +
"<SORT_ORDER>12</SORT_ORDER>" +
"<IPC_CAT></IPC_CAT>" +
"<IPC_ELEMENT>Recipe</IPC_ELEMENT>" +
"<LBL_EQUIV>Recipe</LBL_EQUIV>" +
"<SAP_OBJECT>test object</SAP_OBJECT>" +
"<VAT_KEY>test VAT</VAT_KEY>" +
"<CHAR_KEY>test CHAR</CHAR_KEY>" +
"<DATA_TYPE>TEXT</DATA_TYPE>" +
"<REPEAT_ELEMENT>N</REPEAT_ELEMENT>" +
"<XML_TAG>test</XML_TAG>" +
"<XML_PATH>test</XML_PATH>" +
"</MAP_SECTION>";
                                                                              
for (var i=0; i<strSection.length; i++) {                                     
	strXML = strXML + strSection[i]                                           
}                                                                             
strXML = strXML +                                                             
"</MAP_SECTIONS>" +                                                           
"</abap>";                                                                
                                                                              
xfa.datasets.loadXML(strXML, false, false);                                   
xfa.datasets.saveXML();                                                       
                                                                              
m_xmlMapSections.value = strXML;                                              
                                                                              
xfa.host.messageBox("Completed.", "",3);                                      

