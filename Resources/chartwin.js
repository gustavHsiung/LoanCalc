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

webview.addEventListener('beforeload',function(e)
{
	webview.evalJS("var totalInterest=" + chartWin.totalInterest + "; var principalRepayments=" + chartWin.principalRepayments + "; var chartTitleInterest='" + chartTitleInterest + "'; var chartTitleRepayments='" + chartTitleRepayments + "'; ");
	Ti.API.info(webview.html);
	
});

chartWin.add(webview);