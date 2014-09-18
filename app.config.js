window.Taxi1 = $.extend(true, window.Taxi1, {
    "config": {
        "navigationType": "simple",
        "backend_url": "http://test8.softmg.ru/",
        "backend_uri_phone": "config/phone",
        "backend_uri_send_email": "send_email",
        "backend_uri_push_token": "get_token",
        "backend_uri_all": "config/all",
        "dis_email": "test@test.tt",
        "dis_phone": "+7123456789",
        "discount": "",
        "store_actual_time" : 600000,
        "push_token" : '',
        "taxi_type": [{text : "vip"}, {text : "бизнес"}, {text : "эконом"}],
        "dis_email_content" :   'Пришёл новый заказ от клиента: <b>%name%</b><br /> \
                                Уровень комфорта: %taxi_type%<br /> \
                                Дата и время выезда: %datetime_departure%<br /> \
                                Место оправления: %place_departure%<br /> \
                                Пункт назначения: %destination%<br /> \
                                Комментарий: %comment%'
    }
});
