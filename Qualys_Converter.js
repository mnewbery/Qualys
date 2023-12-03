/******************************************************
 * This section is the vocabulary of the XML node names
 *****************************************************/
const javaScript_file_version = "1.0.3"
/******************************************************
 * This section is the vocabulary of the XML node names
 *****************************************************/
const attribute_Total_Name = "total";
const node_Control_Name = "CONTROL";
const node_Controls_Name = "CONTROLS";
const node_CTRL_Name = "CTRL";
const node_Criticality_Label_Name = "LABEL";
const node_Criticality_Name = "CRITICALITY";
const node_Criticality_Value_Name = "VALUE";
const node_IS_Control_Disable_Name = "IS_CONTROL_DISABLE";
const node_Evaluate_Name = "EVALUATE";
const node_Heading_Name = "HEADING";
const node_ID_Name = "ID";
const node_Name_Name = "NAME";
const node_NUMBER_Name = "NUMBER";
const node_Policy_Name = "POLICY";
const node_Preamble_Name = "PREAMBLE"
const node_Title_Name = "TITLE";
const node_Exported_Name = "EXPORTED";
const node_Cover_Page_Name = "COVER_PAGE";
const node_Reference_Name = "REFERENCE";
const node_Remediation_Name = "REMEDIATION";
const node_Section_Name = "SECTION";
const node_Sections_Name = "SECTIONS";
const node_Status_Name = "STATUS";
const node_Technologies_Name = "TECHNOLOGIES";
const node_Technology_Name = "TECHNOLOGY";

const node_Number_Enumerator = 0;
const node_Heading_Enumerator = 1;
const node_Control_ID_Enumerator = 2;
const node_Criticality_Label_Enumerator = 3;
const node_Criticality_Value_Enumerator = 4;
const node_Is_Control_Disable_Enumerator = 5;
const node_Technology_ID_Enumerator = 6;
const node_Technology_Name_Enumerator = 7;
const node_Evaluate_Enumerator = 8;
const node_Remediate_Enumerator = 9;

/**
 * This command will fire when the HTML page finishes loading
 */
document.addEventListener("DOMContentLoaded",function() { document.getElementById("code_file_version").innerHTML=javaScript_file_version;});

/**
 * Return the version of this file
 * @returns a constant string
 */
function display_javascript_version(){
    return javaScript_file_version;
}
/******************************************
 * Function called by webpage button click
 *****************************************/
/**
 * Load the file from the web page, write the CSV file as an array. If the checkbox is checked, save to file system.
 * Populate the output_div with the results for viewing.
 * @param {*} input_file_value 
 * @param {*} save_file_checked 
 * @returns nothing
 */
function convert_xml_to_csv(input_file_value,save_file_checked){
    hide_output_elements();
    if (input_file_value === undefined){
        alert ("No file selected!")
        return;
    }
    // Show the result. If the check box is ticked then save the file
    csv_output_file = xml_to_csv(input_file_value, save_file_checked);
}

function hide_output_elements(){
    table_html = document.getElementById("csv_output");
    table_html.hidden = true;
    table_html.innerHTML = ''; // empty the table
    output_div = document.getElementById("output_div");
    output_div.hidden = true;
}

/******************************************
 * Function called by webpage button click
 *****************************************/
/**
 * Load the file from the web page, write the CSV file as an array. If the checkbox is checked, save to file system.
 * Populate the output_div with the results for viewing.
 * @param {string} input_file_value 
 * @param {boolean} save_file_checked 
 * @returns nothing
 */
function convert_csv_to_xml(input_file_value, save_file_checked){
    hide_output_elements();
    if (input_file_value === undefined){
        alert ("No file selected!")
        return;
    }
    // Show the result. If the check box is ticked then save the file
    xml_output_file = csv_to_xml(input_file_value, save_file_checked);  
}
/**
 * Read an XML file then convert it to CSV
 * This function loads the file from the file system
 * in to a reader which then raises an event to pass the content to 
 * an XML parser 
 * @param {string} input_file_name 
 * @param {boolean} save_file_checked 
 */
function xml_to_csv(input_file_name,save_file_checked){
    var reader = new FileReader(); 
    var xml_string = "";
    var csv_output_file = "";
    reader.addEventListener(
        "load",
        () => {
            process_xml_to_csv_request(reader.result,save_file_checked);
        },
        false
      );
    reader.readAsText(input_file_name);
}
/**
 * Does what it says on the tin
 */
function add_header_to_table(){
    table_html = document.getElementById("csv_output");
    table_html.innerHTML = ''; // Clear out the table jsut in case it wasn't already done
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row_header = table_html.insertRow(0);
    var header_cell_section_number = row_header.insertCell(node_Number_Enumerator);
    var header_cell_section_heading = row_header.insertCell(node_Heading_Enumerator);
    var header_cell_control = row_header.insertCell(node_Control_ID_Enumerator);
    var header_cell_criticality_label = row_header.insertCell(node_Criticality_Label_Enumerator);
    var header_cell_criticality_value = row_header.insertCell(node_Criticality_Value_Enumerator);
    var header_cell_control_is_disable = row_header.insertCell(node_Is_Control_Disable_Enumerator);
    var header_cell_technology_id = row_header.insertCell(node_Technology_ID_Enumerator);
    var header_cell_technology_name = row_header.insertCell(node_Technology_Name_Enumerator);
    var header_cell_evaluate_name = row_header.insertCell(node_Evaluate_Enumerator);
    var header_cell_remediation_name = row_header.insertCell(node_Remediate_Enumerator);

    header_cell_section_number.innerHTML = node_Section_Name + '<br>' + node_ID_Name;
    header_cell_section_heading.innerHTML = node_Section_Name + '<br>' + node_Heading_Name;
    header_cell_control.innerHTML = node_Control_Name + '<br>' + node_ID_Name;
    header_cell_criticality_label.innerHTML = node_Criticality_Label_Name + '<br>' + node_Criticality_Label_Name;
    header_cell_criticality_value.innerHTML = node_Criticality_Label_Name + '<br>' + node_Criticality_Value_Name;
    header_cell_control_is_disable.innerHTML = node_Control_Name + '<br>' + node_IS_Control_Disable_Name;
    header_cell_technology_id.innerHTML = node_Technology_Name + '<br>' + node_ID_Name;
    header_cell_technology_name.innerHTML = node_Technology_Name + '<br>' + node_Name_Name;
    header_cell_evaluate_name.innerHTML = node_Control_Name + '<br>' + node_Evaluate_Name;
    header_cell_remediation_name.innerHTML = node_Control_Name + '<br>' + node_Remediation_Name;
    table_html.hidden = false;
    return table_html;
}

/**
 *  * Parse the XML file
 * @param {string} xml_string 
 * @param {boolean} save_file_checked 
 */
function process_xml_to_csv_request(xml_string,save_file_checked){
    // start showing the output as a table
    table_html = add_header_to_table();
     
    // Begin the CSV file creation as an array of string
    var csv_file = get_csv_preamble(xml_string, table_html);
    // If the checkbox was checked save to the file system here
    if (save_file_checked){
        save_file(csv_file);
    }
    /* Find the HTML element to show on the screen and populate it
     output_text = document.getElementById("output_text");
    const keys = csv_file.keys();
    output_text.value = "";
    for (let item of csv_file){
        output_text.value += item + '\n';
    }
    output_div.hidden = false;    
    */
}
/**
 * Save the CSV file as an array of lines terminated with \n
 * @param {*} csv_file An array of lines
 */
async function save_file(csv_file){
    const newHandle = await window.showSaveFilePicker();
    const writableStream = await newHandle.createWritable();
    for (let item of csv_file){
        await writableStream.write(item +'\n', "write");
    }
    await writableStream.close();
}
/**
 * Save the CSV file as an array of lines terminated with \n
 * @param {*} csv_file An array of lines
 */
async function save_file_xml(xmlDoc){
    const newHandle = await window.showSaveFilePicker();
    const writableStream = await newHandle.createWritable();
    //result = formatXml(xmlDoc.documentElement.outerHTML, 2);
    result = xmlDoc.documentElement.outerHTML;
    await writableStream.write(result, "write");
    await writableStream.close();
}
/**
 * Create the first five lines of the CSV output file
 * @param {*} xml_string The content of the file loaded from the web page
 * @returns a header for the CSV file output
 */
function get_csv_preamble(xml_string, table_html){
    var parser;
    var xmlDoc;
    var csv_file = [];
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml_string,"text/xml");
    var title = xmlDoc.getElementsByTagName(node_Title_Name)[0].childNodes[0].data;
    var exported = xmlDoc.getElementsByTagName(node_Exported_Name)[0].childNodes[0].data;
    var cover_page = xmlDoc.getElementsByTagName(node_Cover_Page_Name)[0].childNodes[0].data;
    var status = xmlDoc.getElementsByTagName(node_Status_Name)[0].childNodes[0].data;
    var technologies_row = xmlDoc.getElementsByTagName(node_Technologies_Name)[0];
    // var technologies_count = technologies_row.getAttribute('total');
    var technology = technologies_row.innerHTML.replaceAll('    ','').replaceAll('\n','');
    // Add new rows to the output
    csv_file = csv_file.concat(`"${node_Title_Name}"="${title}"`);
    csv_file = csv_file.concat(`"${node_Exported_Name}"="${exported}"`);
    csv_file = csv_file.concat(`"${node_Cover_Page_Name}"="${cover_page}"`);    
    csv_file = csv_file.concat(`"${node_Status_Name}"="${status}"`);
    csv_file = csv_file.concat(`"${technology}"`);
  
    // put these values at the start of the table
    table_first_row = table_html.insertRow(0);
    first_cell = table_first_row.insertCell(0)
    // Make a copy of the data before moving on
    first_cell.innerHTML = csv_file;
    first_cell.colSpan = node_Remediate_Enumerator-1;
    // Then finish adding it to the output
    csv_file = csv_file.concat(''); // empty line
    csv_file = csv_file.concat(get_csv_header());     
        
    // Get the sections
    var sections =  xmlDoc.getElementsByTagName(node_Sections_Name)[0].getElementsByTagName(node_Section_Name);
    for (let section of sections){
        var section_Id = section.getElementsByTagName(node_NUMBER_Name)[0].innerHTML; // NUMBER
        var section_heading = section.getElementsByTagName(node_Heading_Name)[0].childNodes[0].data; // NUMBER
        var controls = section.getElementsByTagName(node_Control_Name);
        var control_Id = "";
        var criticality_Label = "";
        var criticality_Value = "";
        var is_control_disable = "";
        var technology_id = "";
        var technology_name = "";
        var evaluate = ""
        var remediate = "";
        for (let control of controls){
            control_Id = control.getElementsByTagName(node_ID_Name)[0].innerHTML;
            criticality_Label = control.getElementsByTagName(node_Criticality_Name)[0].getElementsByTagName(node_Criticality_Label_Name)[0].childNodes[0].data;
            criticality_Value = control.getElementsByTagName(node_Criticality_Name)[0].getElementsByTagName(node_Criticality_Value_Name)[0].innerHTML;
            is_control_disable = control.getElementsByTagName(node_IS_Control_Disable_Name)[0].childNodes[0].data;
            technology_id = control.getElementsByTagName(node_Technologies_Name)[0].getElementsByTagName(node_Technology_Name)[0].getElementsByTagName(node_ID_Name)[0].innerHTML;
            technology_name = control.getElementsByTagName(node_Technologies_Name)[0].getElementsByTagName(node_Technology_Name)[0].getElementsByTagName(node_Name_Name)[0].innerHTML;
            evaluate = control.getElementsByTagName(node_Evaluate_Name)[0].innerHTML.replaceAll('    ','').replaceAll('\n','');
            remediate = control.getElementsByTagName(node_Remediation_Name)[0].innerHTML.replaceAll('    ','').replaceAll('\n','');
            // Add the control to the array
            csv_file = csv_file.concat(`"${section_Id}","${section_heading}","${control_Id}","${criticality_Label}","${criticality_Value}","${is_control_disable}","${technology_id}","${technology_name}","${evaluate}","${remediate}"`);            
            // Add the control to the table
            add_control_to_table(table_html,section_Id,section_heading,control_Id,criticality_Label,criticality_Value,is_control_disable,technology_id,technology_name,evaluate,remediate);
        }
    }
    return csv_file;
}

function add_control_to_table(table_html,section_Id,section_heading,control_Id,criticality_Label,criticality_Value,is_control_disable,technology_id,technology_name,evaluate,remediate){
    var row = table_html.insertRow(table_html.rows.length); // insert the row at the end
    var cell_section_number = row.insertCell(node_Number_Enumerator);
    var cell_section_heading = row.insertCell(node_Heading_Enumerator);
    var cell_control = row.insertCell(node_Control_ID_Enumerator);
    var cell_criticality_label = row.insertCell(node_Criticality_Label_Enumerator);
    var cell_criticality_value = row.insertCell(node_Criticality_Value_Enumerator);
    var cell_control_is_disable = row.insertCell(node_Is_Control_Disable_Enumerator);
    var cell_technology_id = row.insertCell(node_Technology_ID_Enumerator);
    var cell_technology_name = row.insertCell(node_Technology_Name_Enumerator);
    var cell_evaluate_name = row.insertCell(node_Evaluate_Enumerator);
    var cell_remediation_name = row.insertCell(node_Remediate_Enumerator);

    cell_section_number.innerHTML = section_Id;
    cell_section_heading.innerHTML = section_heading;
    cell_control.innerHTML = control_Id;
    cell_criticality_label.innerHTML = criticality_Label;
    cell_criticality_value.innerHTML = criticality_Value;
    cell_control_is_disable.innerHTML = is_control_disable;
    cell_technology_id.innerHTML = technology_id;
    cell_technology_name.innerHTML = technology_name;
    cell_evaluate_name.innerHTML = evaluate.replaceAll('<','&lt;').replaceAll('>','&gt;');
    cell_remediation_name.innerHTML = remediate;
}

function get_csv_header(){
    var line1 = `"${node_Section_Name}","${node_Section_Name}","${node_Control_Name}","${node_Criticality_Name}","${node_Criticality_Name}","${node_Control_Name}","${node_Technology_Name}","${node_Technology_Name}","${node_Control_Name}"`;
    var line2 = `"${node_NUMBER_Name}","${node_Heading_Name}","${node_ID_Name}","${node_Criticality_Label_Name}","${node_Criticality_Value_Name}","${node_IS_Control_Disable_Name}","${node_ID_Name}","${node_Name_Name}","${node_Evaluate_Name}","${node_Remediation_Name}"`
    return [line1, line2];
}
/**
 * Take the CSV text file then turn it back in to XML
 * @param {*} input_file_name 
 * @param {*} save_file_checked 
 * @returns 
 */
function csv_to_xml(input_file_name, save_file_checked){
    var reader = new FileReader(); 
    var xml_string = "";
    var csv_output_file = "";
    reader.addEventListener(
        "load",
        () => {
            xmlDoc = process_csv_to_xml_request(reader.result,save_file_checked);
        },
        false
      );
    reader.readAsText(input_file_name)
}
/**
 * 
 * @param {*} input_file_content 
 * @param {*} save_file_checked 
 * @returns live XML document
 */
function process_csv_to_xml_request(input_file_content, save_file_checked){
    var file_lines = input_file_content.split('\n');
    var header_title = null;
    var header_exported = null;
    var header_cover_page = null;
    var header_status = null;
    var line_counter = 0;
    var excel_edited_format = false; // this flag is used for when Excel strips off the quotes in the CSV because it thinks its awesome

    // Create new XML object
    var xmlDoc = create_root();
    // loop through the csv lines
    for (let line of file_lines){
        if (line.startsWith(`"${node_Title_Name}"`)){
            header_title = get_line_value_equals(line,1);
            xmlDoc = create_with_cdata(xmlDoc,node_Title_Name,header_title);            
        } else if (line.startsWith(`"${node_Exported_Name}"`)){
            header_exported = get_line_value_equals(line,1);
            xmlDoc = create_with_cdata(xmlDoc, node_Exported_Name, header_exported);            
        }
        else if (line.startsWith(`"${node_Status_Name}"`)){
            header_status = get_line_value_equals(line,1);
            xmlDoc = create_with_cdata(xmlDoc, node_Status_Name, header_status);    
        }
        else if (line.startsWith(`"${node_Cover_Page_Name}"`)){
            header_cover_page = get_line_value_equals(line,1);
            xmlDoc = create_with_cdata(xmlDoc, node_Cover_Page_Name, header_cover_page);    
        }        
        if(header_title !== null && header_exported !== null && header_cover_page !== null && header_status !== null){
            line_counter += 1;
            break;
        }
        line_counter += 1;
    }
    var splitter = '=';
    if (line_counter === file_lines.length){
        excel_edited_format = true;
        line_counter = 0;
    }
    // If we got this far, Excel has changed the formatting. Do it again but this time there are no quotes
    if (excel_edited_format){
        for (let line of file_lines){
            if (line.includes(`${node_Title_Name}`)){
                header_title = get_line_value_equals(line,1,splitter);
                xmlDoc = create_with_cdata(xmlDoc,node_Title_Name,header_title);            
            } else if (line.includes(`${node_Exported_Name}`)){
                header_exported = get_line_value_equals(line,1,splitter);
                xmlDoc = create_with_cdata(xmlDoc, node_Exported_Name, header_exported);            
            }
            else if (line.includes(`${node_Status_Name}`)){
                header_status = get_line_value_equals(line,1,splitter);
                xmlDoc = create_with_cdata(xmlDoc, node_Status_Name, header_status);    
            }
            else if (line.includes(`${node_Cover_Page_Name}`)){
                header_cover_page = get_line_value_equals(line,1,splitter);
                xmlDoc = create_with_cdata(xmlDoc, node_Cover_Page_Name, header_cover_page);    
                if (header_cover_page === ''){
                    header_cover_page = ' ' ; // because this is how we trick it in to staying blank, which occasionally it is
                }                
            }        
            if(header_title !== null && header_exported !== null && header_cover_page !== null && header_status !== null){
                line_counter += 1;
                break;
            }
            line_counter += 1;
        }
    }
    // use the object to create child nodes
    // Add child nodes to root, in order
    // Technologies is added here and will be blank until the different technology nodes are enumerated
    var node_Technologies = xmlDoc.createElement(node_Technologies_Name);
    xmlDoc.childNodes[0].appendChild(node_Technologies);
    xmlDoc = populate_sections(xmlDoc, file_lines, line_counter);
    output_text = document.getElementById("output_text");
    result = '<pre>' + xmlDoc.documentElement.outerHTML + '</pre>'; 
    output_text.value = result;
    output_div.hidden = false; 
    // save to file
    if (save_file_checked){
        save_file_xml(xmlDoc);
    }
    return xmlDoc;
}

function create_root(){
    parser = new DOMParser();
    // Clunky but it works. Could try new XmlHttpRequest
    xmlDoc = parser.parseFromString(`<${node_Policy_Name}></${node_Policy_Name}>`,"text/xml");
    return xmlDoc;
}

function create_with_cdata(xmlDoc,node_name,data_value){
    var node = xmlDoc.createElement(node_name);
    var newCDATA = xmlDoc.createCDATASection(data_value);
    node.appendChild(newCDATA);
    xmlDoc.childNodes[0].appendChild(node);
    return xmlDoc;
}
 
function create_xml_node(xmlDoc,node_name,data_value){
    var node = xmlDoc.createElement(node_name);
    node.innerHTML = data_value;
    xmlDoc.childNodes[0].appendChild(node);
    return xmlDoc;
}

function populate_sections(xmlDoc, file_lines, line_counter_start){
    root_node = xmlDoc.childNodes[0];
    // Sections is added here and will be blank until the different technology nodes are enumerated
    var node_Sections = xmlDoc.createElement(node_Sections_Name);
    // Add Sections to POLICY
    root_node.appendChild(node_Sections);
    // Sections contain "section"
    // Section contains Number heading and controls
    // xmlDoc contains Sections node
    current_section = 0;
    var node_Section = null;
    var node_Controls = null;
    for (var counter1 = line_counter_start+1; counter1 < file_lines.length; counter1++){
        line = file_lines[counter1];
        //Handle the case where Excel messed with the formatting - blank lines start with a few commas
        if (line !== "" 
                && !line.startsWith(`"${node_Section_Name}"`) && !line.startsWith(`${node_Section_Name}`)
                && !line.startsWith(`"${node_NUMBER_Name}"`) && !line.startsWith(`${node_NUMBER_Name}`)
                && !line.startsWith(`,,`)){
            var read_section = get_line_value_comma(line, node_Number_Enumerator);
            // Create a new section only of the section number changes
            if (node_Section === null || current_section !== read_section){
                node_Section = xmlDoc.createElement(node_Section_Name);
                // Increment the attribute "total" in the parent node
                increment_attribute(xmlDoc, node_Sections, attribute_Total_Name);
                // Add Node "Number"
                var node_Number = xmlDoc.createElement(node_NUMBER_Name);
                node_Number.setHTML(read_section); // the section being processed is "1" as noted above
                node_Section.appendChild(node_Number);
                // Add Node "Heading"
                var node_Heading = xmlDoc.createElement(node_Heading_Name);
                var newCDATA = xmlDoc.createCDATASection(get_line_value_comma(line, node_Heading_Enumerator)); // Section heading is "Access Control"
                node_Heading.appendChild(newCDATA);
                node_Section.appendChild(node_Heading);  
                // Add Node Controls          
                node_Controls = xmlDoc.createElement(node_Controls_Name);
                node_Section.appendChild(node_Controls);
                node_Sections.appendChild(node_Section);
                current_section = read_section;
            }
            var node_Control = xmlDoc.createElement(node_Control_Name);
            var node_ID = xmlDoc.createElement(node_ID_Name);
            var node_Criticality = xmlDoc.createElement(node_Criticality_Name);
            var node_Criticality_Label = xmlDoc.createElement(node_Criticality_Label_Name);
            var node_Criticality_Value = xmlDoc.createElement(node_Criticality_Value_Name);
            var newCDATA_Label = xmlDoc.createCDATASection(get_line_value_comma(line, node_Criticality_Label_Enumerator)); // Section heading is "Access Control"
            var node_IS_Control_Disable = xmlDoc.createElement(node_IS_Control_Disable_Name);
            var newCDATA_Control_Disable = xmlDoc.createCDATASection(get_line_value_comma(line, node_Is_Control_Disable_Enumerator)); // Section heading is "Access Control"
            var node_Technologies = xmlDoc.createElement(node_Technologies_Name);
            var node_Technology = xmlDoc.createElement(node_Technology_Name);
            var node_Technology_ID = xmlDoc.createElement(node_ID_Name);
            var node_Technology_Title = xmlDoc.createElement(node_Name_Name); // we already have node technology name
            var node_Evaluate = xmlDoc.createElement(node_Evaluate_Name);
            var node_Remediate = xmlDoc.createElement(node_Remediation_Name);
            var technology_ID = get_line_value_comma(line,node_Technology_ID_Enumerator);
            // now add the child nodes together
            node_ID.innerHTML = get_line_value_comma(line,node_Control_ID_Enumerator);            
            node_Criticality_Value.setHTML(get_line_value_comma(line,node_Criticality_Value_Enumerator));
            node_Criticality_Label.appendChild(newCDATA_Label);
            node_Criticality.appendChild(node_Criticality_Label);
            node_Criticality.appendChild(node_Criticality_Value);
            node_IS_Control_Disable.appendChild(newCDATA_Control_Disable)
            node_Technology_ID.innerHTML = technology_ID
            node_Technology_Title.innerHTML = get_line_value_comma(line,node_Technology_Name_Enumerator);
            node_Evaluate.innerHTML = get_line_value_comma(line,node_Evaluate_Enumerator);
            node_Remediate.innerHTML = get_line_value_comma(line,node_Remediate_Enumerator);
            node_Technology.appendChild(node_Technology_ID);
            node_Technology.appendChild(node_Technology_Title);
            cloned_node_Technology = node_Technology.cloneNode(true); //need a copy at this point fo the root
            node_Technology.appendChild(node_Evaluate); // evaluate lives inside technology
            node_Technology.appendChild(node_Remediate);
            node_Technologies.appendChild(node_Technology);
            increment_attribute(xmlDoc,node_Technologies,attribute_Total_Name)
            node_Control.appendChild(node_ID);
            node_Control.appendChild(node_Criticality)
            node_Control.appendChild(node_IS_Control_Disable)
            node_Control.appendChild(node_Technologies);
            
            // Add the control to the controls parent
            node_Controls.appendChild(node_Control);
            // Increment the control count
            increment_attribute(xmlDoc,node_Controls,attribute_Total_Name);

            // Guard Code - don't go past here if the technology node is not populated because something has gone wrong
            if (technology_ID === null || technology_ID === ''){
                throw "Fatal error: Technology ID is blank and needs to be populated!" 
            }

            // Also note the technology is in the //POLICY//TECHNOLOGIES node
            // The path looks at the content of /POLICY/TECHNOLOGIES/TECHNOLOGY[ID=]
            var path = `/${node_Policy_Name}/${node_Technologies_Name}/${node_Technology_Name}[${node_ID_Name}=${technology_ID}]`;
            var nodes = xmlDoc.evaluate(path,xmlDoc, null, XPathResult.ANY_TYPE,null);
            var current_technology_node = nodes.iterateNext(); 
            if (current_technology_node === null){
                path = `/${node_Policy_Name}/${node_Technologies_Name}`;
                nodes = xmlDoc.evaluate(path,xmlDoc,null,XPathResult.ANY_TYPE,null);
                var current_technologies_node = nodes.iterateNext(); // we know there is only one in the root
                increment_attribute(xmlDoc,current_technologies_node,attribute_Total_Name);
                current_technologies_node.appendChild(cloned_node_Technology);
            }

        }
    }
    return xmlDoc;
}

function increment_attribute(xmlDoc, node, attribute_name){
    var counter1 = 0;
    var attribute_value = node.getAttribute(attribute_name);
    // If the attribute doesn't exist, crete it now and start with zero
    if (attribute_value === null){
        attribute = xmlDoc.createAttribute(attribute_name);
        attribute_value = "0";
    }
    // Create a replacement attribute
    // Make the var a number so it can be incremented
    counter1 = parseInt(attribute_value);
    attribute = xmlDoc.createAttribute(attribute_name);
    attribute.value = (counter1 + 1).toString();    
    node.setAttributeNode(attribute);
}
/**
 * Try to split with "x","y" then if that doesn't work try split values as x,y 
 * @param {*} line the string of the line
 * @param {*} element_number the number element in the zero based array of comma delimited strinf
 * @returns the value in the element position of the array
 */
function get_line_value_comma(line, element_number){
    // ',' works for excel edited CSV - don't need to clip the double quotes
    var splitter = line.startsWith('"')? '","' : ',';
    if (line.split(splitter)[element_number] !== null){
        // The line below means Excel is stupid
        if (element_number === node_Evaluate_Enumerator) {
            // <CTRL><DP><K>auth.general.logintext</K><OP>re</OP><V><![CDATA[ blah blah blah blah ]]></V></DP></CTRL>'
            var ctrl_start = '<CTRL>';
            var ctrl_end = '</CTRL>';            
            var ctrl_start_count = line.indexOf(ctrl_start);
            var ctrl_end_count = line.indexOf(ctrl_end);
            var padding = ctrl_end.length;
            return line.substring(ctrl_start_count,ctrl_end_count + padding);
        }
        // This means Excel is stupid too!
        // Remediate is always the last element
        if (element_number === node_Remediate_Enumerator){
            var sample = line.split(splitter)[line.split(splitter).length-1];
            if (sample === '\n' || sample ===' ' || sample === '\r' || sample === '"'){
                return '';
            }
            return sample;
        }
        // Default
        return line.split(splitter)[element_number].replaceAll('"','');
    }
    return 'error unknown. check input line';
}
function get_line_value_equals(line, element_number, splitter = '"="'){
    if (line.split(splitter)[element_number] !== null){
        return line.split(splitter)[element_number].replaceAll('"','').replaceAll(',\r','').replaceAll(',,','');
    }
    return 'error unknown. check input line';
}