var sqlite3 = require('sqlite3').verbose();
var db = "/BudgetMotivator.db";


function PromptAnswer(level, category, code) {
    var table = "question";
    var column = "question";
    var joins = ["category"];
    var condition = "WHERE level = " + level + " AND category = " + category + " AND code = " + code;
    var question = GetData(table, column, joins, condition);

    if (question == null)
        return question; //string value
    else
        alert("questions not found");
}

function GetAnswerChoices(question) {
    var table = "answer";
    var column = "answer";
    var joins = ["question"];
    var condition = "WHERE question = " + question;

    var choices = GetData(table, column, joins, condition);

    if (choices != null && choice.length > 0)
        return choices;
    else
        alert("alternatives not found");
    //returns associated choices with the question (array)
}

function GetAnswerPoints(answer) {
    var table = "answer";
    var column = "points";
    var joinTables = null;
    var condition = "WHERE answer = " + answer;

    var points = GetData(table, column, joinTables, condition);

    if (points != null && points.length > 0)
        return points;
    else
        alert("points not found"); //returns points integer
}

function GetUserPoints() {
    var query = "SELECT TOP 1 points FROM points ORDER BY date, time desc";
    var currentPoints = null;

        db.serialize(function () {
            db.each(query, function (err, row) {
                if (!err)
                    getResults.push(row.value);
            });
        });

    if (currentPoints!=null)
        return currentPoints[0];
    return 0;
}


function UpdateUserPoints(totalPoints) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    var hh = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    var min = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    var sec = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();

    var table = "points";
    var columnArray = ["date","time", "points"];
    var valueArray = [yyyy + "" + mm + "" + dd, hh + "" + min + "" + sec, totalPoints];
    InsertData(table, columnArray, valueArray);
}


function InsertData(table, columnArray, valueArray) {
    var insertStatement = "INSERT INTO " + table + "(" + columnArray.join(",") + ") VALUES(" + valueArray.join(",") + ")";

    db.serialize(function () {
        db.run(insertStatement);
    });

    db.close();
}

//table = table name to select from, column = required values, joinTables = array of table names that need to be linked to get required result, condition = data filtering where clause
function GetData(table,column,joinTables,condition) {
    
    var selectQuery = "SELECT " + column + "AS value FROM " + table;
    
    var fullQuery = null;
    var previousTable = table;
    var previousAlias = "T0";

    if (joinTables.length != 0 && joinTables != null) {
        joinStatements = [];

        for (var i = 0; i < joinTables.length;i++){
            var currentAlias = "T" + i + 1;

            var joinQuery = "JOIN " + joinTables[i]
                                + "AS " + currentAlias
                                + "ON " + currentAlias + "." + joinTables[i] + "id="
                                + previousAlias + "." + previousTable + "id";

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

    var getResults = [];

    db.serialize(function () {
        db.each(fullQuery, function (err, row) {
            if (!err)
                getResults.push(row.value);
        });
    });

    db.close();

    return getResults;
}

