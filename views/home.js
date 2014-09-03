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
            error: function(data){
                  alert('test error');
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