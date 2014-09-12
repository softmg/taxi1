var onNotificationGCM;

function registerPushAndroid() {
    var pushNotification = window.plugins.pushNotification;

    //set push notifications handler
    document.addEventListener('push-notification',
        function(event)
        {
            console.warn('push-notification event')

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

    onNotificationGCM = function (e) {
        //$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
        console.warn('push notification: ' + e.event);
        switch( e.event )
        {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.warn("regID = " + e.regid);
            }
        break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if ( e.foreground )
            {
                console.warn('push notification foreground: ' + e.soundname);
                //$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                // if the notification contains a soundname, play it.
                //var my_media = new Media("/android_asset/www/"+e.soundname);
                //my_media.play();
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
                if ( e.coldstart )
                {
                    //$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                    console.warn('COLDSTART NOTIFICATION');
                }
                else
                {
                    //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                    console.warn('BACKGROUND NOTIFICATION');
                }
            }

             navigator.notification.alert(e.payload.message);
            //$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            console.warn('push notification message count: ' + e.payload.msgcnt);
        break;

        case 'error':
            //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            console.warn('push notification error: ' + e.msg);
        break;

        default:
            //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            console.warn('push notification: Unknown, an event was received and we do not know what it is');
        break;
      }
    }

    //trigger pending push notifications
    //pushNotification.onDeviceReady();

    pushNotification.register(
    function(token)
    {
        //alert(token);
        //callback when pushwoosh is ready
        onPushAndroidInitialized(token);
    },
    function(status)
    {
        //alert("failed to register: " + status);
        console.warn('failed to register: ' + status);
    },
    {
        "senderID":"1033840522179",
        "ecb":"onNotificationGCM"
    });
}

function onPushAndroidInitialized(pushToken)
{
    alert(pushToken);
    //output the token to the console
    console.warn('push token: ' + pushToken);
    store.insert({
        name: "push_token",
        value: pushToken
    });

    _sendToken(pushToken);

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