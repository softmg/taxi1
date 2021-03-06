﻿"use strict";

Taxi1.send_email = function(params) {

    var dis_phone = Taxi1.config.dis_phone;
    var discount = Globalize.localize('discount') + ' ' + Taxi1.config.discount;
    var taxi_type_ar = Taxi1.config.taxi_type;
    var dis_email_content = Taxi1.config.dis_email_content;

    var format_date = Globalize.culture().calendar.patterns.d;

    var name = ko.observable(''),
        user_phone = ko.observable(''),
        datetime_departure = ko.observable(),
        place_departure = ko.observable(''),
        destination = ko.observable(''),
        comment = ko.observable(''),
        taxi_type = ko.observable(taxi_type_ar[0]);

    datetime_departure.optionChanged= function(e){
        alert(e);
    }

    function sendEmail() {

        if(typeof(datetime_departure()) != 'undefined')
        {
            var date_dep_y = Globalize.format( datetime_departure(), 'yyyy-MM-ddTHH:mm');

            console.warn('дата отправки: ' + date_dep_y);

            var date_dep = new Date(date_dep_y);
            //var date_dep_gmt =  new Date(date_dep.valueOf() - date_dep.getTimezoneOffset() * 60000);
            var datetime_departure_loc2;

            //fixed ios incorrect offset
            if(DevExpress.devices.current().platform == 'ios')
            {
                datetime_departure_loc2 = Globalize.format( date_dep, 'd MMMM yyyy H:mm' );
            }
            else
            {
                datetime_departure_loc2 = Globalize.format( datetime_departure(), 'd MMMM yyyy H:mm');
            }
        }
        else
        {
            datetime_departure_loc2 = '';
        }

        console.warn('дата отправки скорректированная: ' + datetime_departure_loc2);

        var send_email_url = Taxi1.config.backend_url + Taxi1.config.backend_uri_send_email;

        $.ajax({
            type: "POST",
            data:{
                name: name(),
                user_phone: user_phone(),
                taxi_type: taxi_type().text,
                datetime_departure: datetime_departure_loc2,
                place_departure: place_departure(),
                destination: destination(),
                comment: comment(),
            },
            url: send_email_url,
            dataType: 'jsonp',
            jsonp: "mycallback",
            error: function(x,e){
                console.warn('токен устройства не отправлен на сервер');
                if(x.status==0){
                    console.warn('You are offline!!\n Please Check Your Network.');
                }else if(x.status==404){
                    console.warn('Requested URL not found.' + send_email_url);
                }else if(x.status==500){
                    console.warn('Internel Server Error.');
                }else if(e=='parsererror'){
                    console.warn('Error.\nParsing JSON Request failed. '+x.status);
                }else if(e=='timeout'){
                    console.warn('Request Time out.');
                }else {
                    console.warn('Unknow Error.\n'+x.responseText);
                }
                alert('Ошибка заказа. Проверьте включен ли интернет на смартфоне!');
            },
            success: function(data){
                alert('Заказ успешно отправлен!');
            }
        })
    }

    /*var mycallback = function(data)
    {
        console.warn('callback jsonp ajax sendEmail');
        alert("Here: "+data.name);
    }*/


    function call() {

    }

    function androidInputScroll(idScrollView) {
        if (DevExpress.devices.real().platform === 'android') {
            $(".dx-scrollview-content").attr('data-height', $(".dx-scrollview-content").closest(".dx-scrollview-content").height());
            $("input[type='text']").focusin(function () {
                var input = $(this);
                /*var interval = setInterval(function () {
                    var base = input.closest(".dx-scrollview-content").offset();

                    $("#" + idScrollView).dxScrollView("instance").scrollTo(input.offset().top - base.top);
                }, 200);
                setTimeout(function () { clearInterval(interval); }, 1000);*/

                input.closest(".dx-scrollview-content").height(parseInt(input.closest(".dx-scrollview-content").attr('data-height')) + 100);

                setTimeout(function(){
                    var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                    scroller.update().then(function(){
                        var base = input.closest(".dx-scrollview-content").offset();

                        scroller.scrollTo(input.offset().top - base.top);
                    });
                }, 399);
            });
            $("input[type='text']").focusout(function () {
                var input = $(this);
                input.closest(".dx-scrollview-content").height(input.closest(".dx-scrollview-content").attr('data-height'));

                var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                scroller.update().then(function(){
                    var base = input.closest(".dx-scrollview-content").offset();

                    scroller.scrollTo(input.offset().top + base.top);
                });
            });
            $("textarea").focusin(function () {
                var input = $(this);
                setTimeout(function(){
                    /*var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                    var base = input.closest(".dx-scrollview-content").offset();

                    $("#" + idScrollView).dxScrollView("instance").scrollTo(input.offset().top - base.top)*/

                    input.closest(".dx-scrollview-content").height(parseInt(input.closest(".dx-scrollview-content").attr('data-height')) + 100);

                    var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                    scroller.update().then(function(){
                         var base = input.closest(".dx-scrollview-content").offset();

                         scroller.scrollTo(input.offset().top - base.top);
                    });
                }, 399);
            });

            $("textarea").focusout(function () {
                var input = $(this);
                input.closest(".dx-scrollview-content").height(input.closest(".dx-scrollview-content").attr('data-height'));

                var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                scroller.update().then(function(){
                    var base = input.closest(".dx-scrollview-content").offset();

                    scroller.scrollTo(input.offset().top + base.top);
                });
            });
        }
    }

    function onFormInput()
    {

    }

    function viewShown() {
        $("#nameInput").data("dxTextBox").focus();

       var els = document.getElementsByTagName("input");
       //var els = document.getElementsByClassName("at-textbox");
       for (var i = 0; i < els.length; ++i) {
           els[i].addEventListener("input", onFormInput);
       }
       androidInputScroll("newLogScrollView");
       //appInsights.logPageView("NewLog");
    }

    return {
        phone: 'tel:' + dis_phone,
        discount: discount,
        call: call,
        format_date: format_date,

        name: name,
        user_phone: user_phone,
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
