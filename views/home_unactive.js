"use strict";

Taxi1.home_unactive = function(params) {

    function activeConf()
    {
        _initData(
            function(){
                alert(Globalize.localize('error_init') + ' ' + Globalize.localize('server_problem'));
            }
        );
    }

    return {
        activeConf: activeConf,
    };
};