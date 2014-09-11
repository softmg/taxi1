var onNotificationAPN;

function registerPushIOS() {
 	//var pushNotification = window.plugins.pushNotification;

    // iOS
    onNotificationAPN = function(event) {

        console.warn('onNotificationAPN');

        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound )
        {
            //var snd = new Media(event.sound);
            //snd.play();
        }

        if ( event.badge )
        {
            pushNotification.setApplicationIconBadgeNumber(function(x){}, function(x){}, event.badge);
        }
    }
 	//set push notification callback before we initialize the plugin
	document.addEventListener('push-notification',
		function(event)
		{
		    console.warn('get push notification');

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
	//pushNotification.onDeviceReady();

	//register for pushes.
	pushNotification.register(
            function(deviceToken)
            {
                console.warn('registerDevice: ' + deviceToken);
                onPushiOSInitialized(deviceToken);
            },
            function(status)
            {
                console.warn('failed to register : ' + status);
                //alert(JSON.stringify(['failed to register ', status]));
            },
            {
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb":"onNotificationAPN"
            });
	//reset badges on start
	//pushNotification.setApplicationIconBadgeNumber(0);
	pushNotification.setApplicationIconBadgeNumber(function(x){
	        console.warn('success reset push badget')
	    }, function(x){
	        console.warn('error reset push badget: ' + x)
	    }, 0);
}

function onPushiOSInitialized(pushToken)
{
    store.insert({
        name: "push_token",
        value: pushToken
    });

    _sendToken(pushToken);

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
