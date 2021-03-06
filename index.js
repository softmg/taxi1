﻿window.Taxi1 = window.Taxi1 || {};

window.onerror = function(msg, url, line, col, error) {
   // Note that col & error are new to the HTML 5 spec and may not be
   // supported in every browser.  It worked for me in Chrome.
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;

   last_error = msg;

   // You can view the information in an alert to see things working like this:
   console.warn("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

   var suppressErrorAlert = true;
   // If you return true, then error alerts (like in older versions of
   // Internet Explorer) will be suppressed.
   return suppressErrorAlert;
};

var store;
var store_data;
var pushNotification;
var is_mobile = false;
var last_error;

if(DevExpress.devices && DevExpress.devices.current() && DevExpress.devices.current().platform !== 'generic')
{
    is_mobile = true; //set false for emulator debug
}

var mycallback = function(data)
{
    console.warn('callback jsonp ajax config');
    alert("Here: "+data.name);
}

var _initData = function(callback_error)
{
    var phone_url = Taxi1.config.backend_url + Taxi1.config.backend_uri_all;
    console.warn('url config: ' + phone_url);
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: phone_url,
        jsonp: "mycallback",
        error: function(x,e){
                        if(x.status==0){
                            console.warn('You are offline!!\n Please Check Your Network.');
                        }else if(x.status==404){
                            console.warn('Requested URL not found.' + phone_url);
                        }else if(x.status==500){
                            console.warn('Internel Server Error.');
                        }else if(e=='parsererror'){
                            console.warn('Error.\nParsing JSON Request failed. '+x.status);
                        }else if(e=='timeout'){
                            console.warn('Request Time out.');
                        }else {
                            console.warn('Unknow Error.\n'+x.responseText);
                        }
                        if(typeof(callback_error) !== 'undefined')
                        {
                          callback_error();
                        }
                    },
        success: function(data){

            dev_log('config success!');

            store.insert({
                name: "date_config",
                value: new Date().valueOf()
            });
            store.insert({
                name: "dis_phone",
                value: data.phone
            });
            store.insert({
                name: "discount",
                value: data.discount
            });
            store.update("date_config", {
                value: new Date().valueOf()
            });
            store.update("dis_phone", {
                value: data.phone
            });
            store.update("discount", {
                value: data.discount
            });

            Taxi1.config.dis_phone  = data.phone;
            Taxi1.config.discount   = data.discount;

            dev_log('navigate');

            Taxi1.app.router.register(":view", { view: "home" });
            Taxi1.app.navigate("home");
        }
    })
}

//after device push register send info to the server
var _sendToken = function(push_token)
{
    var push_token_url = Taxi1.config.backend_url + Taxi1.config.backend_uri_push_token;
    console.warn('push_token_url: ' + push_token_url + ', token: ' + push_token + ', platform: ' + device.platform);

    $.ajax({
        type: "POST",
        data:{
            token: push_token,
            platform: device.platform,
        },
        url: push_token_url,
        dataType: 'jsonp',
        //timeout: 3000,
        jsonp: "mycallback",
        error: function(x,e){
            console.warn('токен устройства не отправлен на сервер');
            if(x.status==0){
                console.warn('You are offline!!\n Please Check Your Network.');
            }else if(x.status==404){
                console.warn('Requested URL not found.' + push_token_url);
            }else if(x.status==500){
                console.warn('Internel Server Error.');
            }else if(e=='parsererror'){
                console.warn('Error.\nParsing JSON Request failed. '+x.status);
            }else if(e=='timeout'){
                console.warn('Request Time out.');
            }else {
                console.warn('Unknow Error.\n'+x.responseText);
            }
        },
        success: function(data){
            console.warn('токен устройства зарегистрирован на сервере');
        }
    });

    /*var mycallback_send_token = function(data)
    {
        console.warn('callback jsonp ajax send_push');
        alert("Here: "+data.name);
    }*/
}

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    dev_log('start init js');

    Taxi1.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Taxi1,
        navigationType: Taxi1.config.navigationType
    });

    //mobile
    document.addEventListener("deviceready", onDeviceReady, false);

    //test browser
    $(document).ready(function(){
        if(!is_mobile)
        {
            onDeviceReady();
        }
    });

    var data_init = initLocalStore();

    function onDeviceReady() {

        dev_log('device ready');

        init(data_init);

        if(is_mobile)
        {
            navigator.splashscreen.hide();
        }
    }

    function init(data_init)
    {
        dev_log('start init config');

        if(!data_init['config'] || data_init['config'] == 'non_actual')
        {
            _initData(function(){

                dev_log('config error!');

                if(!data_init['config'])
                {
                    Taxi1.app.router.register(":view", { view: "home_unactive" });
                    Taxi1.app.navigate();
                }
            });
        }
        else
        {
            //to home
            Taxi1.app.router.register(":view", { view: "home" });
            Taxi1.app.navigate("home");
        }

        if(1 || !data_init['push'])
        {
            if(is_mobile)
            {
                initPush();
            }
        }


    }

    function initLocalStore()
    {

        dev_log('start init local store');

        var config = true;
        var push = true;

        store = new DevExpress.data.LocalStore({
            name: "MyLocalData",
            key: "name"
        });

        store.byKey('date_config').done(function(date_config) {
            var now = new Date();
            if(!date_config || now.valueOf() - date_config.value > Taxi1.config.store_actual_time)
            {
                console.warn('non actual data!');
                config = 'non_actual';
            }
        });

        store.byKey('dis_phone').done(function(dis_phone) {
            if(dis_phone && dis_phone.value) Taxi1.config.dis_phone  = dis_phone.value;
            else config = false;
        });

        store.byKey('discount').done(function(discount) {
            if(discount && discount.value) Taxi1.config.discount  = discount.value;
            else config = false;
        });

        store.byKey('push_token').done(function(push_token) {
            if(push_token && push_token.value) Taxi1.config.push_token  = push_token.value;
            else push = false;
        });

        dev_log('end init local store');

        return {'config':config, 'push':push};
    }

    function initPush() {

        dev_log('start init push');

        pushNotification = window.plugins.pushNotification;

        if(device.platform == 'android' || device.platform == 'Android')
        {
            registerPushAndroid();
        }
        else
        {
            registerPushIOS();
        }

        dev_log('end init push');
    }
});


Globalize.culture(navigator.language || navigator.browserLanguage);
