window.Taxi1 = window.Taxi1 || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    document.addEventListener("deviceready", function() { navigator.splashscreen.hide(); });

    Taxi1.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Taxi1,
        navigationType: Taxi1.config.navigationType
    });

    Taxi1.app.router.register(":view", { view: "home" });
    Taxi1.app.navigate();
});

Globalize.culture(navigator.language || navigator.browserLanguage);
