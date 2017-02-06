/*********
 see: http://www.pdfshareforms.com/how-to-create-nice-dialog-windows-in-pdf-form/
***********/

var sText = "Your text value";
var HelloDlg =                                                          
{                                                                       
    initialize: function (dialog)                                       
    {                                                                   
        var todayDate = dialog.store()["date"];                         
        todayDate = "Date: " + util.printd("mmmm dd, yyyy", new Date());
        dialog.load({ "date": todayDate });                             
    },                                                                  
    description:                                                        
    {                                                                   
        elements:                                                       
        [                                                               
            {                                                           
                type: "view",                                           
                elements:                                               
                [                                                       
                    {                                                   
                        item_id: "str1",                                
                        name: "Hello, this is a demo box.",             
                        type: "static_text",                            
                        font: "dialog",                                 
                        bold: true,                                     
                        alignment: "align_center",                      
                        char_width: 30,                                 
                        height: 20,                                     
                    },                                                  
                    {                                                   
                        type: "gap",                                    
                    },                                                  
                    {                                                   
                        type: "view",                                   
                        align_children: "align_row",                    
                        elements:                                       
                        [                                               
                            {                                           
                                item_id: "str2",                        
                                name: "Your text:",                     
                                type: "static_text",                    
                            },                                          
                            {                                           
                                item_id: "str3",                        
                                name: sText,                             
                                type: "static_text",                    
                                font: "dialog",                         
                                bold: true,                             
                            }                                           
                        ]                                               
                    },                                                  
                    {                                                   
                        item_id: "date",                                
                        name: "Date: ",                                 
                        type: "static_text",                            
                        char_width: 25,                                 
                    }                                                   
                ]                                                       
            },                                                          
            {                                                           
                type: "ok",                                             
                ok_name: "Ok!",                                         
                alignment: "align_right",                               
            }                                                           
        ]                                                               
    }                                                                   
};                                                                      
app.execDialog(HelloDlg);                                               

