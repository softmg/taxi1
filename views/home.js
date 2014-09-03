"use strict";

Taxi1.home = function(params) {

    var dis_phone = Taxi1.config.dis_phone;

    function write() {

    }

    function call() {

    }


    function viewShown() {
        //$("#billTotalInput").data("dxNumberBox").focus();
    }

    function test()
    {
        var phone_url = Taxi1.config.backend_url + Taxi1.config.backend_uri_all;
        $.ajax({
            type: "get",
            dataType: 'jsonp',
            url: phone_url,
            jsonp: "mycallback",
            error: function(x,e){
                        if(x.status==0){
                            notifyAlert('You are offline!!\n Please Check Your Network.', 'Error');
                        }else if(x.status==404){
                            notifyAlert('Requested URL not found.', 'Error');
                        }else if(x.status==500){
                            notifyAlert('Internel Server Error.', 'Error');
                        }else if(e=='parsererror'){
                            notifyAlert('Error.\nParsing JSON Request failed. '+x.status, 'Error');
                        }else if(e=='timeout'){
                            notifyAlert('Request Time out.');
                        }else {
                            notifyAlert('Unknow Error.\n'+x.responseText, 'Error');
                        }
                    },
            success: function(data){
                alert('test phone:' + data.phone + '; test discount:' + data.discount);
            }
        })
    }

    return {
        phone: 'tel:' + dis_phone,

        write: write,
        call: call,
        test: test,

        viewShown: viewShown
    };
};