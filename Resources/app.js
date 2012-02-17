//application variables
var numberMonths = 36; //loan length
var interestRate = 6.0; //interest rate



// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('background.jpg');
//
// create base UI tab and root window
//

//create tab group
var tabGroup = Ti.UI.createTabGroup();
   
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

//create the window
var win1 = Titanium.UI.createWindow({  
    title: 'LaonCalc',
    width:pWidth,
    height:pHeight,
    top:0,
    left:0,
});

//create the view
var view = Titanium.UI.createView({
     width: pWidth - 20,
     height: win1.height - 40 - 20,
     left: 10,
     top: 20,
     backgroundColor: '#fff',
     borderRadius: 5
     
});

//logo left margin
var _logoWidth  = 255
var _logoHeight = 255
var _logoMarginLeft = view.width - _logoWidth/2
var _logoMarginTop  = (view.height - _logoHeight)/2

var logo = Titanium.UI.createImageView({
		image: 'logo.png',
		width:  _logoWidth,
		height: _logoHeight,
		left:   _logoMarginLeft,
		top: 	-_logoMarginTop,
});

view.add(logo);

var amountLabel = Titanium.UI.createLabel({
	color:'#232',
	text:'Loan amount:   $',
	font:{fontSize:14,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	textAlign:'center',
	width:'auto',
	height:30,
	top:80,
	left:20
});
view.add(amountLabel);

var interestRateLabel = Titanium.UI.createLabel({
	color:'#232',
	text:'Interest Rate:  %',
	font:{fontSize:14,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	textAlign:'left',
	width:'auto',
	height:30,
	top:130,
	left:20
});
view.add(interestRateLabel);

var loanLengthLabel = Titanium.UI.createLabel({
	color:'#232',
	text:'Loan length (' + numberMonths + ' months):',
	font:{fontSize:14,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	textAlign:'left',
	width:100,
	height:'auto',
	top:180,
	left:20
});
view.add(loanLengthLabel);

//flexible space
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
})

//done system button
var doneButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.DONE,
	bottom:0
})

//click event listener
doneButton.addEventListener('click',function(e){
	amountTextField.blur();
	interestRateTextField.blur();
	interestRateTextField.top = 150;
	interestRateLabel.top = 150;
	interestRate = interestRateTextField.value;
	amountTextField.visible = true;
	amountLabel.visible = true;
})

var amountTextField = Titanium.UI.createTextField({
	hintText: '1000.00',
	width:140,
	height:30,
	top:80,
	right:20,
	keyboardToolbar: [flexSpace,doneButton],
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD
});
view.add(amountTextField);

var interestRateTextField = Titanium.UI.createTextField({
	value: interestRate,
	width:140,
	height:40,
	top:interestRateLabel.top,
	right:20,
	keyboardToolbar: [flexSpace,doneButton],
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType:Titanium.UI.RETURNKEY_DONE
});

interestRateTextField.addEventListener('focus',function(e){
	if(Ti.Platform.osname == 'iPhone'){
		interestRateTextField.top = 80;
		interestRateLable.top = 80;
		amountTextField.visible = false;
		amountLabel.visible = false;
	}
});
view.add(interestRateTextField);

//create the slider to control the loan length
var loanLengthSlider = Titanium.UI.createSlider({
	width: 	140,
	top:	loanLengthLabel.top,
	right:  20,
	min:	12,
	max:	60,
	value:	numberMonths,
	thumbImage:'sliderThumbSelected.png',
	highlightedThumbImage:'sliderThumbSelected.png'
});

loanLengthSlider.addEventListener('change',function(e){
	Ti.API.info(loanLengthSlider.value);
	//update numberMounth
	numberMonths = Math.round(loanLengthSlider.value);
	Ti.API.info('Loan length '+numberMonths);
	Ti.API.info('Loan length Math.round'+ Math.round(numberMonths));
	
	loanLengthLabel.text ='Loan length (' + numberMonths+ ' months):';
	
});

view.add(loanLengthSlider);


// calculate button for interest for this loan
var calculateInterestButton = Titanium.UI.createButton({
	title:'Calculate Total Interest',
    backgroundImage : 'cal_button_normal.png',
    backgroundSelectedImage:'cal_button_press.png',
    color:'#fff',
    id: 1,
    top: 235,
    width: 266,
	height: 42,
	left: (view.width-266)/2,
	font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'bold'},
});
//add the event listener
calculateInterestButton.addEventListener('click', calculateAndDisplayValue);
view.add(calculateInterestButton);

// calculate button for repayment for this loan
var calculateRepaymentsButton = Titanium.UI.createButton({
	title:'Calculate Total Laon Repayment',
    backgroundImage : 'cal_button_normal.png',
    backgroundSelectedImage:'cal_button_press.png',
    color:'#fff',
    id: 2,
    top: 280,
    width: 266,
	height: 42,
	left: (view.width-266)/2,
	font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'bold'},
});
//add the event listener
calculateRepaymentsButton.addEventListener('click', calculateAndDisplayValue);
view.add(calculateRepaymentsButton);

//add the first tab and attach window object (win1) to it
var tab1 = Ti.UI.createTab({
    icon:'icon_calculator.png',
    title:'Calculate',
    window: win1
});


win1.add(view);



//end of win1   

//create the second window for settings tab
var win2 = Titanium.UI.createWindow({
  width:pWidth,
  height:pHeight,
  top: 0,
  left: 0,
  backgroundImage: 'background.png',
  url: 'window2.js',
  title: 'Settings',
  barImage: 'navbar.png'
});
//setup the initial value of win2's custom property: autoShowChart
win2.autoShowChart = false;

//the second tab and attach the second window 
var tab2 = Ti.UI.createTab({
       icon:'icon_settings.png',
       title:'Settings',
       window: win2
});
//now add the tabs to the tabGroup object
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

//open the tabgroup to launch the app
tabGroup.open();


//funcrions

function calculateAndDisplayValue(e)
{
	if(amountTextField.value == '' || amountTextField.value == null)
	{
		var errorDialog = Titanium.UI.createAlertDialog({
			title:'Oops!',
			message:'You must provide a loan amount.'	
		});
		errorDialog.show();
		return;
	}
	//log the button id 
    Ti.API.info('Button id = ' + e.source.id);
    var optionsMessage;
    switch(e.source.id)
    {
    	case 1:
    		//Interest(I) = Principal(P) times Rate Per Period(r) times Number of Periods(n) / 12
    		var totalInterest = (amountTextField.value * (interestRate/100) * numberMonths) /12
    		Ti.API.info('totalInterest'+totalInterest);
    		optionsMessage = 'Total Interest on this loan to '+totalInterest;
    		break;
    	case 2:
    		//Interest(I) = Principal(P) times Rate Per Period(r) times Number of Periods(n) / 12
    		var totalInterest = (amountTextField.value * (interestRate/100) * numberMonths) /12
    		var totalRepayments = Math.round(amountTextField.value) + totalInterest;
    		Ti.API.info('totalInterest'+totalInterest);
    		Ti.API.info('totalRepayments'+totalRepayments);
    		optionsMessage = 'Total repayment on this loan to '+totalRepayments;
    		break;
    		
    	default:
    		break;
    }
    
    if(win2.autoShowChart == true)
    {
    	openChartWindow();
    }else
    {
    	var resultOptionDialog = Titanium.UI.createOptionDialog({
    		title:	optionsMessage + ' \n\nDo you want to view the result in chart?',
    		options: ['Okay','No'],
    		cancel: 1
    	});
    	resultOptionDialog.addEventListener('click',function(e){
    		Ti.API.info('Button index tapped was: ' + e.index);
    		if(e.index == 0)
    		{
    			openChartWindow();
    		}
    	});
    	resultOptionDialog.show();
    }
}

function openChartWindow(totalInterest, total)
{
	var totalInterest = (amountTextField.value * (interestRate / 100) * numberMonths) / 12;
	var totalRepayments = Math.round(amountTextField.value) + totalInterest; 
	var chartWindow = Titanium.UI.createWindow({
		url:'chartwin.js',
		title:'Loan Pie Chart',
		barImage: 'navbar.png',
		barColor: '#000',
		numberMonths: numberMonths,
		interestRate: interestRate,
		totalInterest: totalInterest,
		totalRepayments: totalRepayments,
		principalRepayments: (totalRepayments - totalInterest)
	});
	tab1.open(chartWindow);

}
