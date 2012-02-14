// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//
// create base UI tab and root window
//
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({  
    width:pWidth,
    height:pHeight,
    top:0,
    left:0,
    backgroundImage:'background.jpg'
});

//create the view
var view = Titanium.UI.createView({
     width: pWidth - 20,
     height: win1.height - 40 - 20,
     left: 10,
     top: 20,
     backgroundColor: '#fff',
     borderRadius: 5,
     
});

//logo left margin
var _logoWidth  = 255
var _logoHeight = 200
var _logoMarginLeft = (view.width - _logoWidth)/2
var _logoMarginTop = (view.height - _logoHeight)/2

var logo = Titanium.UI.createImageView({
		image: 'logo.png',
		width:  _logoWidth,
		height: _logoHeight,
		left:   _logoMarginLeft,
		top: 	_logoMarginTop
});

view.add(logo);

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Learson One',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});
view.add(label1);

var label2 = Titanium.UI.createLabel({
	color:'#232',
	text:'Titanium Cook Book',
	font:{fontSize:16,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	top:220,
	width:'auto'
});
view.add(label2);

win1.add(view);

win1.open();

