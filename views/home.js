"use strict";

Taxi1.home = function(params) {

    var dis_phone = Taxi1.config.dis_phone;

    return {
        phone: 'tel:' + dis_phone,
    };
};