window.Taxi1 = $.extend(true, window.Taxi1, {
    "config": {
        "navigationType": "simple",
        "dis_email": "o4kan@ya.ru",
        "dis_phone": "+79099057651",
        "taxi_type": [{text : "vip"}, {text : "бизнес"}, {text : "эконом"}],
        "dis_email_content" :   'Пришёл новый заказ от клиента: <b>%name%</b><br /> \
                                Уровень комфорта: %taxi_type%<br /> \
                                Дата и время выезда: %datetime_departure%<br /> \
                                Место оправления: %place_departure%<br /> \
                                Пункт назначения: %destination%<br /> \
                                Комментарий: %comment%'
    }
});
