



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
// Holds the question code
var code;




function init() {
    points = 0;
    runningPoints = 0;
    level = 0;
    category = 'food';
    code = 'BF';

    getUserPoints();
    getQuestion(level, category, code);
}

function getUserPoints() {
    fetchRequest(
        'users/userPoints' 
    );
}

function getQuestion(lev, cat, cod) {
    var json = {level: lev, category: cat, code: cod}
    fetchRequest(
        'users/question', 
        { data: JSON.stringify(json) }
    );
}

function getAnswers(quest) {
    fetchRequest(
        'users/answers', 
        { data: quest }
    );
}

function answerClick(id, text) {

    if (!text || text == '') {
        // Error
        return;
    }
    postAnswer(
        'users/postAnswer', 
        { data: JSON.stringify({t: text}) }
    );

    level++;
    getQuestion(level, 'food', 'BF');

}

function updateProgressBar(progress) {
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
