google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
    var spreadsheetId = '1xYKtAkgA0FGbsVNqqf7wCCdTdriJIYUrKSZMMpcs4TU';

    var range1 = 'Sales by City and Category!A2:E6';
    var query1 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range1);
    query1.send(function(response1) {
        handleQueryResponse(response1, 'chart1');
    });

    var range2 = 'Sales by Year!A1:B3';
    var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=1234567890&range=' + range2);
    query2.send(function(response2) {
        handleQueryResponse(response2, 'chart2');
    });

    var range3 = 'Sales Comparison by Month!A1:C13';
    var query3 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0987654321&range=' + range3);
    query3.send(function(response3) {
        handleQueryResponse(response3, 'chart3');
    });

    var range4 = 'Product Quantity Tabulation by Month!A1:C13';
    var query4 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=2468135790&range=' + range4);
    query4.send(function(response4) {
        handleQueryResponse(response4, 'chart4');
    });
}

function handleQueryResponse(response, chartId) {
    if (response.isError()) {
        console.error('Error: ' + response.getMessage());
        return;
    }

    var data = response.getDataTable();
    drawChart(data, chartId);
}

function drawChart(data, chartId) {
    var options = {
        width: 500,
        height: 300
    };

    var chartDiv = document.getElementById(chartId);
    var chartType = chartDiv.dataset.chartType;
    var chartTitle = chartDiv.dataset.chartTitle;

    options.title = chartTitle;

    var chart;
    if (chartType === 'column') {
        chart = new google.visualization.ColumnChart(chartDiv);
    } else if (chartType === 'pie') {
        chart = new google.visualization.PieChart(chartDiv);
    } else if (chartType === 'bar') {
        chart = new google.visualization.BarChart(chartDiv);
    } else if (chartType === 'line') {
        chart = new google.visualization.LineChart(chartDiv);
    }

    chart.draw(data, options);
}
