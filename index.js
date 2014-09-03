window.Taxi1 = window.Taxi1 || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    document.addEventListener("deviceready", function() {
        navigator.splashscreen.hide();
        //initData();
    });

    Taxi1.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Taxi1,
        navigationType: Taxi1.config.navigationType
    });

    Taxi1.app.router.register(":view", { view: "home" });
    Taxi1.app.navigate();
});

$(document).ready(function(){
    initData();
});

Globalize.culture(navigator.language || navigator.browserLanguage);

var mycallback = function(data)
{
    alert("Here: "+data.name);
}

function initData()
{
    var phone_url = Taxi1.config.backend_url + Taxi1.config.backend_uri_all;
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        url: phone_url,
        jsonp: "mycallback",
        error: function(x,e){
                        if(x.status==0){
                            alert('You are offline!!\n Please Check Your Network.');
                        }else if(x.status==404){
                            alert('Requested URL not found.' + phone_url);
                        }else if(x.status==500){
                            alert('Internel Server Error.');
                        }else if(e=='parsererror'){
                            alert('Error.\nParsing JSON Request failed. '+x.status);
                        }else if(e=='timeout'){
                            alert('Request Time out.');
                        }else {
                            alert('Unknow Error.\n'+x.responseText);
                        }
                    },
        success: function(data){
            Taxi1.config.dis_phone = data.phone;
            Taxi1.config.discount = data.discount;
        }
    })
}