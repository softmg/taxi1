﻿window.Taxi1 = window.Taxi1 || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    var store_data;

    var store = new DevExpress.data.LocalStore({
        name: "MyLocalData",
        key: "config"
    });
    store.load().done(function(result) {
        store_data = result;
    });

    function initPushwoosh() {
        var pushNotification = window.plugins.pushNotification;
        if(device.platform == 'android' || device.platform == 'Android')
        {
            registerPushwooshAndroid();
        }
        else
        {
            registerPushwooshIOS();
        }
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    Taxi1.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Taxi1,
        navigationType: Taxi1.config.navigationType
    });
    function onDeviceReady() {
        navigator.splashscreen.hide();
        _initData(function(){
            Taxi1.app.router.register(":view", { view: "home_unactive" });
            Taxi1.app.navigate();
        });
        initPushwoosh();
    }

    var mycallback = function(data)
    {
        alert("Here: "+data.name);
    }

    function _initData(callback_error)
    {
        var phone_url = Taxi1.config.backend_url + Taxi1.config.backend_uri_all;
        $.ajax({
            type: "get",
            dataType: 'jsonp',
            url: phone_url,
            jsonp: "mycallback",
            error: function(x,e){
                            if(x.status==0){
                                console.log('You are offline!!\n Please Check Your Network.');
                            }else if(x.status==404){
                                console.log('Requested URL not found.' + phone_url);
                            }else if(x.status==500){
                                console.log('Internel Server Error.');
                            }else if(e=='parsererror'){
                                console.log('Error.\nParsing JSON Request failed. '+x.status);
                            }else if(e=='timeout'){
                                console.log('Request Time out.');
                            }else {
                                console.log('Unknow Error.\n'+x.responseText);
                            }
                            if(typeof(callback_error) !== 'undefined')
                            {
                              callback_error();
                            }
                        },
            success: function(data){
                store.insert({
                    id: 1,
                    name: "dis_phone",
                    value: data.phone
                });
                store.insert({
                    id: 2,
                    name: "discount",
                    value: data.discount
                });
                Taxi1.config.dis_phone  = data.phone;
                Taxi1.config.discount   = data.discount;
                Taxi1.app.router.register(":view", { view: "home" });
                Taxi1.app.navigate();
            }
        })
    }

    /*function pushRegister()
    {
        pushNotification = window.plugins.pushNotification;

        if (device.platform == 'android' || device.platform == 'Android') {
        pushNotification.registerDevice({ alert:true, badge:true, sound:true,  projectid: "...your GCM project number...", appid : "CDAPP-00000" },
            function(status) {
                var pushToken = status;
                alert('push token: ' + JSON.stringify(pushToken));
            },
            function(status) {
                alert(JSON.stringify(['failed to register', status]));
            });


        } else {
            pushNotification.registerDevice({ alert:true, badge:true, sound:true,  appname: "Taxi1", pw_appid : "E18AE-FAACA" },
            function(status) {
                var pushToken = status;
                alert('push token: ' + JSON.stringify(pushToken));
            },
            function(status) {
                alert(JSON.stringify(['failed to register', status]));
            });

        }
    }*/
});


Globalize.culture(navigator.language || navigator.browserLanguage);


/*function str_replace ( search, replace, subject ) {	// Replace all occurrences of the search string with the replacement string

	if(!(replace instanceof Array)){
		replace=new Array(replace);
		if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
			while(search.length>replace.length){
				replace[replace.length]=replace[0];
			}
		}
	}

	if(!(search instanceof Array))search=new Array(search);
	while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
		replace[replace.length]='';
	}

	if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
		for(k in subject){
			subject[k]=str_replace(search,replace,subject[k]);
		}
		return subject;
	}

	for(var k=0; k<search.length; k++){
		var i = subject.indexOf(search[k]);
		while(i>-1){
			subject = subject.replace(search[k], replace[k]);
			i = subject.indexOf(search[k],i);
		}
	}

	return subject;

}*/