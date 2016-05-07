var cdv1 = [];
var cdv2 = [];
var a = [];
var b = [];
var common = []; //(cla(CDA) && cla(CDA’)
var clarv = [];
var claad = [];
var clamv = [];
var similar = 0;

function count_element(xml) {
    var count = 0;
    $(xml).find('schema > element').each(function(i, key) {
        count++;
    });
    alert(count);
}

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        var xsd_data = [];

        reader.onload = function(e) {
            //fileDisplayArea.innerText = reader.result;
            xml = reader.result;
            var count = $(xml).find('element').filter(function() {
                return $(this).parent('schema').length === 1
            }).length;
            var count_localelement = $(xml).find('element').filter(function() {
                return $(this).parent('schema').length === 0
            }).length;
            var count_attribute = $(xml).find('attribute').filter(function() {
                return $(this).parent('attributeGroup').length === 1
            }).length;
            // $(xml).find('element').filter(function() {
            //     return $(this).parent('schema').length === 1
            //   }).each(function(){console.log($(this).attr('name'))})
            xsd_data.push({"XML schema component":"Cpp-cpa-2.0 schema"},{"Global Element":count},{"Global Attribute":count_attribute},{"Local Element":count_localelement});
            makeTable($('#fileDisplayArea'), xsd_data);
            //fileDisplayArea.innerText = 'Global Element = ' + count;
        }

        reader.readAsText(file);

    });
}

function load_file(file_url) {
    $.ajax({
        type: "GET",
        url: "file_url",
        dataType: "text xml",
        success: function(xml) {
            count_element(xml);
        },
        error: function() {
            alert("The XML File could not be processed correctly.");
        }
    });
}

$.ajax({
    type: "GET",
    url: "CDv1.xmi",
    dataType: "text xml",
    success: function(xml) {
        //preserve html tag in class name
        function HtmlEncode(s) {
            var el = document.createElement("div");
            el.innerText = el.textContent = s;
            s = el.innerHTML;
            return s;
        }
        // Parse the file and get data
        // Find class name and save into array a
        // CDv1 { Class : "class 1, class 2, class 3"}
        $(xml).find('logicalClassDesignerModelHasTypes').each(function(i, key) {
            var className = $(this).find('class').attr('name');
            className = HtmlEncode(className);
            a.push(className);

            var data = [];
            // loop into attribute
            $(key).find('property').each(function(j) {
                var attrName = $(this).attr('name');
                data.push(attrName);
            });
            var data2 = [];
            // loop into attribute
            $(key).find('association').each(function() {
                var assoName = $(this).attr('targetEndRoleName');
                data2.push(assoName);
            });
            cdv1.push({
                name: className,
                attribute: data,
                associate: data2
            });
        });
    },
    error: function() {
        alert("The XML File could not be processed correctly.");
    }
});
$.ajax({
    type: "GET",
    url: "CDv2.xmi",
    dataType: "xml",
    success: function(xml) {
        function HtmlEncode(s) {
            var el = document.createElement("div");
            el.innerText = el.textContent = s;
            s = el.innerHTML;
            return s;
        }
        // Parse the xml file and get data
        $(xml).find('logicalClassDesignerModelHasTypes').each(function(i, key) {
            var className = $(this).find('class').attr('name');
            className = HtmlEncode(className);
            b.push(className);

            var data = [];
            // loop into attribute
            $(key).find('property').each(function(j) {
                var attrName = $(this).attr('name');
                data.push(attrName);
            });
            var data2 = [];
            // loop into attribute
            $(key).find('association').each(function() {
                var assoName = $(this).attr('targetEndRoleName');
                data2.push(assoName);
            });

            cdv2.push({
                name: className,
                attribute: data,
                associate: data2
            });
        });

        //find common
        var common = $.grep(a, function(element) {
            return $.inArray(element, b) !== -1;
        });

        clarv = $(a).not(common).get();

        claad = $(b).not(common).get();

        //class moved
        clamv = $.grep(claad, function(element) {
            return $.inArray(element, clarv) !== -1;
        });

        function find_similarity() {
            $.each(clarv, function(index, valueclarv) {
                $.each(claad, function(index, valueclaad) {
                    similar = similar_text(valueclarv, valueclaad, 70);
                    if (similar >= 70) {
                        // $table.append("<tr><td>" + valueclarv + "</td><td>" + valueclaad + "</td></tr>");
                    }
                });
            });
        }

        function create_numbered_list() {
            var classcounter = 4;
            $.each(cdv2, function(i) {
                $('ol.main').append('<li class="' + i + '">7.' + classcounter + ' ' + cdv2[i].name + ' class</li>');
                $('li.' + i).append('<ol></ol>');
                var elementcounter = 1;
                $.each(cdv2[i].attribute, function(j) {
                    $('.' + i + ' > ol').append('<li>7.' + classcounter + '.' + elementcounter + ' ' + cdv2[i].attribute[j] + ' attribute</li>');
                    elementcounter++;
                })
                $.each(cdv2[i].associate, function(j) {
                    $('.' + i + ' > ol').append('<li>7.' + classcounter + '.' + elementcounter + ' ' + cdv2[i].associate[j] + ' associate</li>');
                    elementcounter++;
                })
                classcounter++;
            })
        }



    },
    error: function() {
        alert("The XML File could not be processed correctly.");
    }
});

//preserve html tag in class name
function HtmlEncode(s) {
    var el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
}

function makeTable(container, data) {
    var table = $("<table/>").addClass('table-bordered');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
            row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(colIndex));
            row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
        });
        table.append(row);
    });
    return container.append(table);
}

function makeTableNoColumn(container, data, columnName) {
    var table = $("<table/>").addClass('CSSTableGenerator');
    table.append('<tr><th>' + columnName + '</th></tr>');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        row.append($("<td/>").text(r));
        table.append(row);
    });
    return container.append(table);
}
