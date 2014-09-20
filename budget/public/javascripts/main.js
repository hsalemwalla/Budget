var http = require('http');
http.createServer(function (req, res) {
    console.log('Method: '+ req.method);
    res.end();  
   
  
    if (req.method == "GET") {
        if (req.data == "question")
            PromptAnswer(level, category);
        else if (req.data == "answer")
            GetAnswerChoices(question);
        else if (req.data == "points")
            GetAnswerPoints(answer);
    }

    else {
        if (req.data == "update")
            UpdateUserPoints(totalPoints);
    }
        
}).listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888/');


function PromptAnswer(level, category) {
    var table = "Questions";
    var column = "Question";
    var joins = ["Category"];
    var condition = "WHERE level = " + level + " AND Category = " + category;
    var question = GetData(table, column, joins, condition);

    return question; //string value
}

function GetAnswerChoices(question) {
    var table = "Answers";
    var column = "Answer";
    var joins = ["Questions"];
    var condition = "WHERE question = " + question;

    var choices = GetData(table, column, joins, condition);

    return choices;
    //returns associated choices with the question (array)
}


function GetAnswerPoints(answer) {
    var table = "Answers";
    var column = "Points";
    var joinTables = null;
    var condition = "WHERE Answer = " + answer;

    var points = GetData(table, column, joinTables, condition);

    return points; //returns points integer
}

function UpdateUserPoints(totalPoints) {
    var table = "Points";
    var columnArray = ["DateTime", "Points"];
    var valueArray = ["GETDATE()", totalPoints];
    InsertData(table, columnArray, valueArray);
}




function InsertData(table, columnArray, valueArray) {
    
    var insertStatement = "INSERT INTO " + table + "(" + columnArray.join(",") + ") VALUES(" + valueArray.join(",") + ")";

    //execute insert statement
}


//table = table name to select from, column = required values, joinTables = array of table names that need to be linked to get required result, condition = data filtering where clause
function GetData(table,column,joinTables,condition) {
    
    var selectQuery = "SELECT " + column + " FROM " + table;
    
    var fullQuery = null;
    var previousTable = table;
    var previousAlias = "T0";

    if (joinTables.length != 0 && joinTables != null) {
        joinStatements = [];

        for (var i = 0; i < joinTables.length;i++){
            var currentAlias = "T" + i + 1;

            var joinQuery = "JOIN " + joinTables[i]
                                + "AS " + currentAlias
                                + "ON " + currentAlias + "." + joinTables[i] + "ID="
                                + previousAlias + "." + previousTable + "ID";

            previousTable = joinTables[i];
            previousAlias = currentAlias;
            joinStatements.push(joinQuery);
        }

       fullQuery = selectQuery
                      + joinStatements.join(" ")
                      + " " + condition;
    }

    else {
        fullQuery = selectQuery
                     + " " + condition;
    }

 
    //call to sql lite with full query, return result

}

