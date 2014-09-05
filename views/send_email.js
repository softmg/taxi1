"use strict";

Taxi1.send_email = function(params) {

    var dis_phone = Taxi1.config.dis_phone;
    var discount = Globalize.localize('discount') + ' ' + Taxi1.config.discount;
    var taxi_type_ar = Taxi1.config.taxi_type;
    var dis_email_content = Taxi1.config.dis_email_content;

    var format_date = Globalize.culture().calendar.patterns.d;

    var name = ko.observable(''),
        datetime_departure = ko.observable(),
        place_departure = ko.observable(''),
        destination = ko.observable(''),
        comment = ko.observable(''),
        taxi_type = ko.observable(taxi_type_ar[0]);


    function viewShown() {
        $("#nameInput").data("dxTextBox").focus();
    }

    datetime_departure.optionChanged= function(e){
        alert(e);
    }

    function sendEmail() {

        var datetime_departure_loc = Globalize.format( datetime_departure(), 'd MMMM yyyy H:mm' );

        var date_dep_y = Globalize.format( datetime_departure(), 'yyyy-MM-ddTH:mm');

        var date_dep = new Date(date_dep_y);
        //var date_dep_gmt =  new Date(date_dep.valueOf() - date_dep.getTimezoneOffset() * 60000);
        var datetime_departure_loc2 = Globalize.format( date_dep, 'd MMMM yyyy H:mm' );
        navigator.globalization.getDatePattern(
            function (date) {alert('pattern: ' + date.utc_offset + '\n');},
            function () {alert('Error getting pattern\n');},
            {formatLength:'short', selector:'date and time'}
          );
        alert(datetime_departure_loc + ' ' + datetime_departure_loc2); return false;

        /*var html = str_replace(
            ['%name%', '%taxi_type%', '%datetime_departure%', '%place_departure%', '%destination%', '%comment%'],
            [name(), taxi_type().text, datetime_departure_loc, place_departure(), destination(), comment()],
            dis_email_content
        );*/

        var send_email_url = Taxi1.config.backend_url + Taxi1.config.backend_uri_send_email;

        $.ajax({
            type: "POST",
            data:{
                name: name(),
                taxi_type: taxi_type().text,
                datetime_departure: datetime_departure_loc,
                place_departure: place_departure(),
                destination: destination(),
                comment: comment(),
            },
            url: send_email_url,
            dataType: 'jsonp',
            timeout: 3000,
            jsonp: "mycallback",
            error: function(data){
                alert('Ошибка заказа. Проверьте включен ли интернет на смартфоне!');
            },
            success: function(data){
                alert('Заказ успешно отправлен!');
            }
        })
    }

    var mycallback = function(data)
    {
        alert("Here: "+data.name);
    }


    function call() {

    }


    return {
        phone: 'tel:' + dis_phone,
        discount: discount,
        call: call,
        format_date: format_date,

        name: name,
        taxi_type_ar: taxi_type_ar,
        taxi_type: taxi_type,
        datetime_departure: datetime_departure,
        place_departure: place_departure,
        destination: destination,
        comment: comment,

        sendEmail: sendEmail,

        viewShown: viewShown
    };
};
