"use strict";

Taxi1.send_email = function(params) {

    var dis_phone = Taxi1.config.dis_phone

    var name = ko.observable(''),
        datetime_departure = ko.observable(''),
        place_departure = ko.observable(''),
        destination = ko.observable(''),
        comment = ko.observable('');


    function viewShown() {
        $("#nameInput").data("dxTextBox").focus();
    }

    function sendEmail() {
       var html = ' ' + name() + ' ' + datetime_departure() + ' ' + place_departure() + ' ' + destination() + ' ' + comment();

        alert(html);
    }


    return {
        dis_phone: dis_phone,

        name: name,
        datetime_departure: datetime_departure,
        place_departure: place_departure,
        destination: destination,
        comment: comment,

        sendEmail: sendEmail,

        viewShown: viewShown
    };
};