"use strict";

Taxi1.home = function(params) {

    var dis_phone = Taxi1.config.dis_phone;

    function call(){
        $('.tel_call').click();
    }

    return {
        phone: 'tel:' + dis_phone,
        call: call,
    };
};