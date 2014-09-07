function registerPushwooshIOS() {
 	var pushNotification = window.plugins.pushNotification;

 	//set push notification callback before we initialize the plugin
	document.addEventListener('push-notification',
		function(event)
		{
			//get the notification payload
			var notification = event.notification;

			//display alert to the user for example
			navigator.notification.alert(notification.aps.alert);
			
			//to view full push payload
			//alert(JSON.stringify(notification));
			
			//clear the app badge
			pushNotification.setApplicationIconBadgeNumber(0);
		}
	);

	//trigger pending push notifications
	pushNotification.onDeviceReady();

	//register for pushes.
	pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:"E18AE-FAACA", appname:"Taxi1"},
		function(status)
		{
			var deviceToken = status['deviceToken'];
			console.warn('registerDevice: ' + deviceToken);
			onPushwooshiOSInitialized(deviceToken);
		},
		function(status)
		{
			console.warn('failed to register : ' + JSON.stringify(status));
			//alert(JSON.stringify(['failed to register ', status]));
		}
	);
	
	//reset badges on start
	pushNotification.setApplicationIconBadgeNumber(0);
}

function onPushwooshiOSInitialized(pushToken)
{
    //navigator.notification.alert(pushToken);
	/*var pushNotification = window.plugins.pushNotification;
	//retrieve the tags for the device
	pushNotification.getTags(
		function(tags) {
			console.warn('tags for the device: ' + JSON.stringify(tags));
		},
		function(error) {
			console.warn('get tags error: ' + JSON.stringify(error));
		}
	);*/
}
