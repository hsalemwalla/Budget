
// HTTP Request Data
// *****************
var url = 'http://localhost:8080/';
var POST = 'POST';
var GET = 'GET';
var async = true;




// Application data
// ****************

// Progress Bar with JQ Plot
var progressBar;
// Holds the user points value
var points;
// While answering questions, this variable will
// hold the changing points
var runningPoints;
// Holds the question level
var level;
// Holds the question category
var category;
// Holds the current question
var question;
// An array to hold the answers fetched from the server
var answers;






function init() {
    points = 0;
    runningPoints = 0;
    level = 0;
    category = 'food';

    getUserPoints();
    // The callback after we get the question will fetch the answers
    getQuestion(category, level);
}

function postAnswer(postData) {

    var requestPOST = new XMLHttpRequest();
    requestPOST.onload = function () {      // Response callback
    }
    requestPOST.open(POST, url, async);
    requestPOST.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    requestPOST.send(postData);
}

function getUserPoints() {
    var reqGetPoints = null;

    reqGetPoints = new XMLHttpRequest();
    reqGetPoints.onreadystatechange = function() {
        alert(points);
    };
    reqGetPoints.open(GET, url, async );
    reqGetPoints.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    reqGetPoints.send( null );
}

function getQuestion(cat, level) {
    var reqGetQuest = null;
    var getData = [cat,level];

    reqGetQuest = new XMLHttpRequest();
    reqGetQuest.onreadystatechange = function() {
        alert('getQuestion()');
    };
    reqGetQuest.open(GET, url, async );
    reqGetQuest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    reqGetQuest.send( getData );
}

function getAnswers() {
    var reqGetAns = null;

    reqGetAns = new XMLHttpRequest();
    reqGetAns.onreadystatechange = function() {
        alert('getAnswers()');
    };
    reqGetAns.open(GET, url, async );
    reqGetAns.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    reqGetAns.send( null );
    alert('hi there world');
}

function answerClick(id) {
    // Determine the button that was pressed
    if (id == 'ans1') {

    } else if (id == 'ans2') {

    } else if (id == 'ans3') {

    } else {
        // Another btn pressed?
    }

    // Update progress

    // Fetch next question and answers
}

function updateProgress(progress) {
    // Update progress bar
    if (!progress) {
        progress = 0;
    }
    progressBar.series[0].data[0] = progress;
    progressBar.replot();
}

function generateProgressBar(pointValue) {
    if (!pointValue) {
        pointValue = 0;
    }

    var s1 = [pointValue];
    // Can specify a custom tick Array.
    // Ticks should match up one for each y value (category) in the series.
    var ticks = [''];
     
    progressBar = $.jqplot('progressBar', [s1], {
        // The "seriesDefaults" option is an options object that will
        // be applied to all series in the chart.
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {fillToZero: true},
            useNegativeColors: true,
        },
        // Custom labels for the series are specified with the "label"
        // option on the series option.  Here a series option object
        // is specified for each series.
        series:[
            {label:' '},
        ],
        axes: {
            // Use a category axis on the x axis and use our custom ticks.
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            },
            // Pad the y axis just a little so bars can get close to, but
            // not touch, the grid boundaries.  1.2 is the default padding.
            yaxis: {
                pad: 5,
                tickOptions: {formatString: '%d'}
            }
        }
    });
}
