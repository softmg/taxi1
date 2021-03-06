﻿var onNotificationGCM;

function registerPushAndroid() {
    var pushNotification = window.plugins.pushNotification;

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
                onPushAndroidInitialized(e.regid);
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
        console.warn(token);
        //onPushAndroidInitialized(token);
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
    //output the token to the console
    console.warn('push token: ' + pushToken);
    store.insert({
        name: "push_token",
        value: pushToken
    });

    _sendToken(pushToken);

    //var pushNotification = window.plugins.pushNotification;
}