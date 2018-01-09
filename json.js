var io = require("jsonio");

io.read("data/con-list.json", function (json) {
    var result = json;
    var data = json.data;
    for(var i=0;i<data.length;i++){
        data[i].dept_name+="分公司"; 
    }
    result.data = data;
    io.write("data/con-list.json", result);
});