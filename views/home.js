﻿"use strict";
console.warn('load home.js');
Taxi1.home = function(params) {

    var dis_phone = Taxi1.config.dis_phone;

    return {
        phone: 'tel:' + dis_phone,
    };
};