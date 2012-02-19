//include the chart library
//Titanium.include('charts/chart.js');

var chartWin = Titanium.UI.currentWindow;
chartWin.backgroundColor = '#8C1';
//create the chart title using the variables we passed in from app.js
var chartTitleInterest = 'Total Interest: $' + Math.round (chartWin.totalInterest);
var chartTitleRepayments = 'Total Repayment: $' +  Math.round (chartWin.totalRepayments);

Ti.API.info(chartTitleInterest +'  '+ chartTitleRepayments);
 
//add a webview to contain chart
var webview = Titanium.UI.createWebView({
	width: 320,
	height: 367, 
	top: 0,
	url: 'chart.htm'//
}); 

webview.addEventListener('load',function(e)
{
	 Ti.App.fireEvent('pageReady',{
	 	chartTitleInterest:chartTitleInterest,
	 	chartTitleRepayments:chartTitleRepayments,
	 	interestTitle:'Interest',
	 	principalTitle:'Principal Repayments',
	 	interestPercentage:Math.round ((chartWin.totalInterest/chartWin.totalRepayments)*10),
	 	pincipalPercentage:Math.round ((chartWin.principalRepayments/chartWin.totalRepayments)*10)
	 	});
		
});

chartWin.add(webview);