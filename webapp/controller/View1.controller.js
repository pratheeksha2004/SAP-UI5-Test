sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.northwind.app.northwindapp.controller.View1", {

        onNavToEmployees: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteEmployees");
        },

        onNavToOrders: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteOrders");
        }
    });
});