/**
 * @author Chia-Yuan Hsiung
 */
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.currentWindow;

//create the view
var view = Titanium.UI.createView({
     width: pWidth - 20,
     height: win1.height - 40 - 20,
     left: 10,
     top: 20,
     backgroundColor: '#fff',
     borderRadius: 5
     
});

//create switch label
var switchLabel = Titanium.UI.createLabel({
    width: 'auto',
    height: 30,
    top: 20,
    left: 20,
    font: {fontSize: 14, fontFamily: 'Helvetica Neue', fontWeight: 'bold'},
    text: 'Auto Show Chart?'
});
view.add(switchLabel);

//create switch object
var chartOptionSwitch = Titanium.UI.createSwitch({
	right: 20,
	top: 20,
	value: false
})
view.add(chartOptionSwitch);

win1.add(view);
