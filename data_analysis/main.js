
    $(document).ready(function() {
            $.ajax({
                type: "GET",
                url: "Telco-Customer-Churn.csv",
                dataType: "text",
                success: function(data) {processData(data);}
            });


      
            function processData(data){
                console.log(data);
            }

            var oFileIn = document.getElementById('my_file_input');
            var ogenderButton = document.getElementById('gender_graph');
            var oSeniorCitizenButton = document.getElementById('senior_citizen');
            var oshowPartnerGraphButton = document.getElementById('show_Partner_Button');
            var oshowPhoneServiceButton = document.getElementById('Phone_Service_Button');
            var oshowMultipleLinesButton = document.getElementById('Multiple_Lines_Button');
            var oshowInternetServiceButton = document.getElementById('Internet_Service_Button');
            var oshowPaymentMethodButton = document.getElementById('PaymentMethod_Button');
            var oshowChurnPaymentMethodgendersunBurst = document.getElementById('Churn_PaymentMethod_gender_sunBurst_Button');
            


            if(oFileIn.addEventListener) {
                oFileIn.addEventListener('change', filePicked, false);
            }
            if(ogenderButton.addEventListener) {
                ogenderButton.addEventListener('click', showGenderGraph, false);
            }
            if(oSeniorCitizenButton.addEventListener) {
                oSeniorCitizenButton.addEventListener('click', showSeniorCitizenGraph, false);
            }

            if(oshowPartnerGraphButton.addEventListener) {
                oshowPartnerGraphButton.addEventListener('click', showPartnerGraph, false);
            }
            if(oshowPhoneServiceButton.addEventListener) {
                oshowPhoneServiceButton.addEventListener('click', showPhoneServiceGraph, false);
            }
            if(oshowMultipleLinesButton.addEventListener) {
                oshowMultipleLinesButton.addEventListener('click', showMultipleLinesGraph, false);
            }
            if(oshowInternetServiceButton.addEventListener) {
                oshowInternetServiceButton.addEventListener('click', showInternetServiceGraph, false);
            }
            if(oshowPaymentMethodButton.addEventListener) {
                oshowPaymentMethodButton.addEventListener('click', showPaymentMethodGraph, false);
            }
            if(oshowChurnPaymentMethodgendersunBurst.addEventListener) {
                oshowChurnPaymentMethodgendersunBurst.addEventListener('click', showSunburstGraph, false);
            }

            function filePicked(oEvent) {
                // Get The File From The Input
                var oFile = oEvent.target.files[0];
                var sFilename = oFile.name;
                // Create A File Reader HTML5
                var reader = new FileReader();
                
                // Ready The Event For When A File Gets Selected
                reader.onload = function(e) {
                    var data = e.target.result;
                    data=CSVToArray(data);
                    customerData= prepareData(data.splice(0, 1),data);
                };
                // Tell JS To Start Reading The File.. You could delay this if desired
                reader.readAsBinaryString(oFile)
            }

            function  CSVToArray( strData, strDelimiter){
                // Check to see if the delimiter is defined. If not,
                // then default to comma.
                strDelimiter = (strDelimiter || ",");
        
                // Create a regular expression to parse the CSV values.
                var objPattern = new RegExp(
                    (
                        // Delimiters.
                        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        
                        // Quoted fields.
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        
                        // Standard fields.
                        "([^\"\\" + strDelimiter + "\\r\\n]*))"
                    ),
                    "gi"
                    );
                // Create an array to hold our data. Give the array
                // a default empty first row.
                var arrData = [[]];
                 // Create an array to hold our individual pattern
                // matching groups.
                var arrMatches = null;
                // Keep looping over the regular expression matches
                // until we can no longer find a match.
                while (arrMatches = objPattern.exec( strData )){
                    // Get the delimiter that was found.
                    var strMatchedDelimiter = arrMatches[ 1 ];       
                    // Check to see if the given delimiter has a length
                    // (is not the start of string) and if it matches
                    // field delimiter. If id does not, then we know
                    // that this delimiter is a row delimiter.
                    if (
                        strMatchedDelimiter.length &&
                        strMatchedDelimiter !== strDelimiter
                        ){
                        // Since we have reached a new row of data,
                        // add an empty row to our data array.
                        arrData.push( [] );        
                    }      
                    var strMatchedValue;        
                    // Now that we have our delimiter out of the way,
                    // let's check to see which kind of value we
                    // captured (quoted or unquoted).
                    if (arrMatches[ 2 ]){       
                        // We found a quoted value. When we capture
                        // this value, unescape any double quotes.
                        strMatchedValue = arrMatches[ 2 ].replace(
                            new RegExp( "\"\"", "g" ),
                            "\""
                            );
                    } else {        
                        // We found a non-quoted value.
                        strMatchedValue = arrMatches[ 3 ];      
                    }        
                    // Now that we have our value string, let's add
                    // it to the data array.
                    arrData[ arrData.length - 1 ].push( strMatchedValue );
                }        
                // Return the parsed data.
                return( arrData );
            }

            function prepareData(keyArr,dataArray){
                   
                var customer=prepareCustomer(keyArr[0]);
                var customerArray=[];
                dataArray.forEach((obj)=>{
                    if(obj.length===keyArr[0].length){
                        var customerObj= new customer(obj);
                        customerArray.push(customerObj)
                    }       
                });
                return customerArray;
            }

            function prepareCustomer(keys){
                var customer = function(obj){
                    keys.forEach((key,index) => {
                        this[''+key]=obj[index];
                    });
                }
                return customer;
            }

        function showGenderGraph(){


            if(customerData && customerData.length>0){
                var maleCount = 0;
                var femaleCount = 0;
                customerData.forEach((customer)=>{
                    if(customer.gender==='Female'){
                        femaleCount++;
                    }else{
                        maleCount++;
                    }
                });
                var graphData=[
                    {
                        gender:'Male',
                        count:maleCount
                    },{
                        gender:'Female',
                        count:femaleCount
                    }
                ]
            }

            var svg = d3.select("#gender_graph_svg"),
                width = svg.attr("width"),
                height = svg.attr("height"),
                radius = Math.min(width, height) / 2;
            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
            var pie = d3.pie().value(function(d) { return d.count; });
            var path = d3.arc().outerRadius(radius - 10).innerRadius(50);
            var label = d3.arc().outerRadius(radius).innerRadius(50);
            var arc = g.selectAll(".arc").data(pie(graphData)).enter().append("g").attr("class", "arc");
            arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.gender); });
                    arc.append("text").attr("transform", function(d) { 
                                return "translate(" + label.centroid(d) + ")"; 
                            }).text(function(d) { return d.data.gender+':'+d.data.count; });

        }
        function showSeniorCitizenGraph(){
            if(customerData && customerData.length>0){
                var seniorCitizen = 0;
                var youngGeneration = 0;
                customerData.forEach((customer)=>{
                    if(+customer.SeniorCitizen){
                        seniorCitizen++;
                    }else{
                        youngGeneration++;
                    }
                });
                var graphData=[
                    {
                        isSeniorCitizen:'yes',
                        count:seniorCitizen
                    },{
                        isSeniorCitizen:'no',
                        count:youngGeneration
                    }
                ]
            }

            var svg = d3.select("#senior_citizen_svg"),
                width = svg.attr("width"),
                height = svg.attr("height"),
                radius = Math.min(width, height) / 2;
            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
            var pie = d3.pie().value(function(d) { return d.count; });
            var path = d3.arc().outerRadius(radius - 10).innerRadius(50);
            var label = d3.arc().outerRadius(radius).innerRadius(50);
            var arc = g.selectAll(".arc").data(pie(graphData)).enter().append("g").attr("class", "arc");
            arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.isSeniorCitizen); });
            arc.append("text").attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
                }).text(function(d) { return d.data.isSeniorCitizen+':'+d.data.count; });
        }
        function showPartnerGraph(){
            if(customerData && customerData.length>0){
                var withPartner = 0;
                var withOutPartner = 0;
                customerData.forEach((customer)=>{
                    if(customer.Partner=='Yes'){
                        withPartner++;
                    }else{
                        withOutPartner++;
                    }
                });
                var graphData=[
                    {
                        partner:'yes',
                        count:withPartner
                    },{
                        partner:'no',
                        count:withOutPartner
                    }
                ]
            }

            var svg = d3.select("#show_Partner_svg"),
                width = svg.attr("width"),
                height = svg.attr("height"),
                radius = Math.min(width, height) / 2;
            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
            var pie = d3.pie().value(function(d) { return d.count; });
            var path = d3.arc().outerRadius(radius - 10).innerRadius(50);
            var label = d3.arc().outerRadius(radius).innerRadius(50);
            var arc = g.selectAll(".arc").data(pie(graphData)).enter().append("g").attr("class", "arc");
            arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.partner); });
            arc.append("text").attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
                }).text(function(d) { return d.data.partner+':'+d.data.count; });
        }
        function showPhoneServiceGraph(){
            if(customerData && customerData.length>0){
                var graphData= [ ];
                var phoneServiceType=[];
                var phoneServiceCount={};

                customerData.forEach((customer)=>{
                    if( customer.PhoneService && phoneServiceType.indexOf(customer.PhoneService)>-1){
                        phoneServiceCount[''+customer.PhoneService]=phoneServiceCount[''+customer.PhoneService]+1;
                    }else{
                        phoneServiceType.push(customer.PhoneService);
                        phoneServiceCount[""+customer.PhoneService]=1;     
                    }
                });
                phoneServiceType.forEach((type)=>{
                    graphData.push({'phoneService':type,'count':phoneServiceCount[''+type]});
                })
               
            }

            var svg = d3.select("#Phone_Service_svg"),
                width = svg.attr("width"),
                height = svg.attr("height"),
                radius = Math.min(width, height) / 2;
            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
            var pie = d3.pie().value(function(d) { return d.count; });
            var path = d3.arc().outerRadius(radius - 10).innerRadius(50);
            var label = d3.arc().outerRadius(radius).innerRadius(50);
            var arc = g.selectAll(".arc").data(pie(graphData)).enter().append("g").attr("class", "arc");
            arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.phoneService); });
            arc.append("text").attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
                }).text(function(d) { return d.data.phoneService+':'+d.data.count; });
        }
        function showMultipleLinesGraph(){
            if(customerData && customerData.length>0){
                var graphData= [ ];
                var multipleLinesServiceType=[];
                var multipleLinesServiceCount={};

                customerData.forEach((customer)=>{
                    if( multipleLinesServiceType.indexOf(customer.MultipleLines)>-1){
                        multipleLinesServiceCount[''+customer.MultipleLines]= multipleLinesServiceCount[''+customer.MultipleLines]+1;
                    }else{
                        multipleLinesServiceType.push(customer.MultipleLines);
                        multipleLinesServiceCount[""+customer.MultipleLines]=1;     
                    }
                });
                multipleLinesServiceType.forEach((type)=>{
                    graphData.push({'multipleLinesService':type,'count':multipleLinesServiceCount[''+type]});
                })
               
            }

            var svg = d3.select("#Multiple_Lines_svg"),
                width = svg.attr("width"),
                height = svg.attr("height"),
                radius = Math.min(width, height) / 2;
            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
            var pie = d3.pie().value(function(d) { return d.count; });
            var path = d3.arc().outerRadius(radius - 10).innerRadius(50);
            var label = d3.arc().outerRadius(radius).innerRadius(50);
            var arc = g.selectAll(".arc").data(pie(graphData)).enter().append("g").attr("class", "arc");
            arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.multipleLinesService); });
            arc.append("text").attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
                }).text(function(d) { return d.data.multipleLinesService+':'+d.data.count; });
        }
        function showInternetServiceGraph(){
            if(customerData && customerData.length>0){
                var graphData= [ ];
                var internetServiceServiceType=[];
                var internetServiceServiceCount={};

                customerData.forEach((customer)=>{
                    if( internetServiceServiceType.indexOf(customer.InternetService)>-1){
                        internetServiceServiceCount[''+customer.InternetService]= internetServiceServiceCount[''+customer.InternetService]+1;
                    }else{
                        internetServiceServiceType.push(customer.InternetService);
                        internetServiceServiceCount[""+customer.InternetService]=1;     
                    }
                });
                internetServiceServiceType.forEach((type)=>{
                    graphData.push({'InternetService':type,'count':internetServiceServiceCount[''+type]});
                })
               
            }

            var svg = d3.select("#Internet_Service_svg"),
                width = svg.attr("width"),
                height = svg.attr("height"),
                radius = Math.min(width, height) / 2;
            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
            var pie = d3.pie().value(function(d) { return d.count; });
            var path = d3.arc().outerRadius(radius - 10).innerRadius(50);
            var label = d3.arc().outerRadius(radius).innerRadius(50);
            var arc = g.selectAll(".arc").data(pie(graphData)).enter().append("g").attr("class", "arc");
            arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.InternetService); });
            arc.append("text").attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
                }).text(function(d) { return d.data.InternetService+':'+d.data.count; });
        }
        function showPaymentMethodGraph(){
            if(customerData && customerData.length>0){
                var graphData= [ ];
                var PaymentMethodType=[];
                var PaymentMethodCount={};

                customerData.forEach((customer)=>{
                    if(PaymentMethodType.indexOf(customer.PaymentMethod)>-1){
                       PaymentMethodCount[''+customer.PaymentMethod]=PaymentMethodCount[''+customer.PaymentMethod]+1;
                    }else{
                       PaymentMethodType.push(customer.PaymentMethod);
                       PaymentMethodCount[""+customer.PaymentMethod]=1;     
                    }
                });
               PaymentMethodType.forEach((type)=>{
                    graphData.push({'PaymentMethod':type,'count':PaymentMethodCount[''+type]});
                })
               
            }

            var svg = d3.select("#PaymentMethod_svg"),
                width = svg.attr("width"),
                height = svg.attr("height"),
                radius = Math.min(width, height) / 2;
            var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
            var pie = d3.pie().value(function(d) { return d.count; });
            var path = d3.arc().outerRadius(radius - 10).innerRadius(50);
            var label = d3.arc().outerRadius(radius).innerRadius(50);
            var arc = g.selectAll(".arc").data(pie(graphData)).enter().append("g").attr("class", "arc");
            arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.PaymentMethod); });
            arc.append("text").attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
                }).text(function(d) { return d.data.PaymentMethod+':'+d.data.count; });

                
        }
        function __prepareTreeGraph(keyArray,customerData,fromroot){

            var prepareTreeChildren = function(key,dataArray,totalSize){
                var childrens=[];
                if(dataArray && dataArray.length>0){
                    var type=[];
                    var count={};
                    var childObjMap={};
                    dataArray.forEach((customer)=>{
                        if(type.indexOf(customer[key])>-1){
                            count[''+customer[key]]=count[''+customer[key]]+1;
                            (childObjMap[''+customer[key]]).push(customer);
                        }else{
                            type.push(customer[key]);
                            count[""+customer[key]]=1;
                            childObjMap[''+customer[key]]=[];
                            (childObjMap[''+customer[key]]).push(customer);
                        }
                    });
                    type.forEach((ele)=>{
                        childrens.push({'name':ele,
                                        'criteria':key,
                                        'size':count[''+ele],
                                        'childObj':childObjMap[''+ele],
                                        'percent': ((count[''+ele]/totalSize)*100).toFixed(2),
                                    });
                    });
                    return childrens;
                        
                }
            }
            var prepareChildloop=function(keyArray,data,fromroot,totalSize){
                var treeSize = keyArray.length;
                var index=0;
                var treeData=(treeSize>0)?{}:[];
                while( treeSize>0 && index<2){
                    if(index===0){
                        treeData = (fromroot)?{
                            'name':keyArray[0],
                            'criteria':keyArray[0],
                            'children':prepareTreeChildren(keyArray[0],data,totalSize),
                            'childObj':data,
                            'percent': ((data.length/totalSize)*100).toFixed(2),
                            'size':data.length
                        }:prepareTreeChildren(keyArray[0],data,totalSize);
                        
                        keyArray = keyArray.slice(1,keyArray.length);
                    }else{
                        if(treeData.children && treeData.children.length>0){
                           treeData.children.forEach((child)=>{
                             child.children = prepareChildloop(keyArray,child.childObj,false,totalSize);
                           });
                        }else if(treeData.length>0){
                            treeData.forEach((child)=>{
                                child.children = prepareChildloop(keyArray,child.childObj,false,totalSize);
                            });
                        }
                    } 
                    index++;
                }
                return treeData;
            }
            var removeSizeFromNode = function(tree,nodesLength){
                    let data = tree;
                    while(nodesLength>0){
                        if(data.hasOwnProperty('size')){
                           delete data.size;
                           data = data.children;
                        }else if(data.length>0){
                            data.forEach((child)=>{
                                removeSizeFromNode(child,nodesLength);
                            });
                        }
                        nodesLength--;
                    }
                    return tree;
            }
            var data = prepareChildloop(keyArray,customerData,fromroot,customerData.length);
               data = removeSizeFromNode(data,keyArray.length)
            return data;
        }
        function showSunburstGraph(){
            var nodeData = __prepareTreeGraph(['gender','Contract','PaymentMethod'],customerData,true);

                    // Variables
                    var width = 700;
                    var height = 700;
                    var radius = Math.min(width, height) / 2;
                    var color = d3.scaleOrdinal(d3.schemeCategory20b);
                    // Create primary <g> element
                    var g = d3.select('#Churn_PaymentMethod_gender_sunBurst_svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g')
                        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

                    // Data strucure
                    var partition = d3.partition()
                        .size([2 * Math.PI, radius]);

                    // Find data root
                    var root = d3.hierarchy(nodeData)
                        .sum(function (d) { return d.size});

                    // Size arcs
                    partition(root);
                    var arc = d3.arc()
                        .startAngle(function (d) { return d.x0 })
                        .endAngle(function (d) { return d.x1 })
                        .innerRadius(function (d) { return d.y0 })
                        .outerRadius(function (d) { return d.y1 });

                    // Put it all together
                    var formatNumber = d3.format(",d");

                    g.selectAll('path')
                        .data(root.descendants())
                        .enter().append('path')
                        .attr("display", function (d) { return d.depth ? null : "none"; })
                        .attr("d", arc)
                        .style('stroke', '#fff')
                        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
                        .append("title").text(function(d) { 
                             return d.data.criteria+ " > " + d.data.name + "\n" +d.data.percent+'%' +"\n"+ formatNumber(d.value); 
                        });

        }

    }); 