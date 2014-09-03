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
                            alert('You are offline!!\n Please Check Your Network.');
                        }else if(x.status==404){
                            alert('Requested URL not found.');
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