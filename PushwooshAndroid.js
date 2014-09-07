function registerPushwooshAndroid() {
    var pushNotification = window.plugins.pushNotification;

    //set push notifications handler
    document.addEventListener('push-notification',
        function(event)
        {
            var title = event.notification.title;
            var userData = event.notification.userdata;
            //dump custom data to the console if it exists
            if(typeof(userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }
            //and show alert
            navigator.notification.alert(title);
            //stopping geopushes
            pushNotification.stopGeoPushes();
        }
    );

    //trigger pending push notifications
    pushNotification.onDeviceReady();

    //register for pushes.
    pushNotification.registerDevice({ projectid: "1033840522179", appid : "E18AE-FAACA" },
        function(token)
        {
            //alert(token);
            //callback when pushwoosh is ready
            onPushwooshAndroidInitialized(token);
        },
        function(status)
        {
            //alert("failed to register: " + status);
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}

function onPushwooshAndroidInitialized(pushToken)
{
    //output the token to the console
    console.warn('push token: ' + pushToken);
    var pushNotification = window.plugins.pushNotification;
    pushNotification.getTags(
        function(tags)
        {
            console.warn('tags for the device: ' + JSON.stringify(tags));
        },
        function(error)
        {
            console.warn('get tags error: ' + JSON.stringify(error));
        }
    );
    //set multi notificaiton mode
    //pushNotification.setMultiNotificationMode();
    //pushNotification.setEnableLED(true);
    //set single notification mode
    //pushNotification.setSingleNotificationMode();
    //disable sound and vibration
    //pushNotification.setSoundType(1);
    //pushNotification.setVibrateType(1);
    pushNotification.setLightScreenOnNotification(false);
    //goal with count
    //pushNotification.sendGoalAchieved({goal:'purchase', count:3});
    //goal with no count
    //pushNotification.sendGoalAchieved({goal:'registration'});
    //setting list tags
    //pushNotification.setTags({"MyTag":["hello", "world"]});
    //settings tags
    /*pushNotification.setTags({deviceName:"hello", deviceId:10},
        function(status) {
            console.warn('setTags success');
        },
        function(status) {
            console.warn('setTags failed');
        }
    );*/
    //Pushwoosh Android specific method that cares for the battery
    pushNotification.startGeoPushes();
}