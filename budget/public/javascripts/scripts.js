

function fetchRequest(url, data) {
    $.ajax({
        url: url,
        type: 'GET',
        data: data,
        dataType: 'json',
        success: successfulFetch
    });
}

function postAnswer (url, data) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: successfulPostAnswer
    });
}

function postPoints (url, data) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: successfulPostPoints
    });
}


function successfulFetch(oData) {
    console.log(oData.body.data);
    if (/* question */ true) {
        getAnswers(/* question */);
    } else {

    }
}

function successfulPostAnswer(oData) {
    console.log(oData.body.data);
}

function successfulPostPoints(oData) {
    console.log(oData.body.data);
}











/*
 *function sendRequest(url, data) {
 *    $.ajax({
 *        url: url,
 *        type: 'PUT',
 *        data: data,
 *        dataType: 'json',
 *        success: successfulRequest
 *    });
 *}
 *function successfulRequest(oData) {
 *    console.log(oData.body.data);
 *}
 */
