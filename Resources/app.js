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
	top:100,
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
	top:150,
	left:20
});
view.add(interestRateLabel);

var loanLengthLabel = Titanium.UI.createLabel({
	color:'#232',
	text:'Loan length (' + numberMonths + ' months):',
	font:{fontSize:14,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	textAlign:'left',
	width:'auto',
	height:30,
	top:200,
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

var amountTextField = Titanium.UI.createTextField({
	hintText: '1000.00',
	width:140,
	height:30,
	top:100,
	right:20,
	keyboardToolbar: [flexSpace,doneButton],
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD
})
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
})

interestRateTextField.addEventListener('focus',function(e){
	if(Ti.Platform.osname == 'iPhone'){
		interestRateTextField.top = 100;
		interestRateLable.top = 100;
		amountTextField.visible = false;
		amountLabel.visible = false;
	}
})
view.add(interestRateTextField);

//click event listener
doneButton.addEventListener('click',function(e){
	Ti.API.info("Available memory: " + Ti.Platform.availableMemory);
    
	amountTextField.blur();
	interestRateTextField.blur();
	
/*
	interestRateTextField.top = 150;
	interestRateLabel.top = 150;
	interestRate = interestRateTextField.value;
	amountTextField.visible = true;
	amountLabel.visible = true;*/
	Ti.API.info("Available memory: " + Ti.Platform.availableMemory);
   
})



win1.add(view);

//add the first tab and attach window object (win1) to it
var tab1 = Ti.UI.createTab({
    icon:'icon_calculator.png',
    title:'Calculate',
    window: win1
});
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

