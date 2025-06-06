sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "../model/formatter"
], function (Controller, JSONModel, History, MessageToast, formatter) {
    "use strict";

    return Controller.extend("com.northwind.app.northwindapp.controller.View3", {
        formatter: formatter,

        onInit: function () {
            const oViewModel = new JSONModel({
                busy: false
            });
            this.getView().setModel(oViewModel, "view");

            // *** CHANGE: Attach to the router's "pattern matched" event ***
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteOrders").attachPatternMatched(this._onRouteMatched, this);
        },

        // *** NEW FUNCTION: This function will run every time the "RouteOrders" is navigated to ***
        _onRouteMatched: function () {
            const oList = this.byId("ordersList");
            const oBinding = oList.getBinding("items");

            if (oBinding) {
                oBinding.attachEvents({
                    dataRequested: () => this.getView().getModel("view").setProperty("/busy", true),
                    dataReceived: () => this.getView().getModel("view").setProperty("/busy", false)
                });
            }
        },

        onPressOrderItem: function (oEvent) {
            const oItem = oEvent.getSource();
            const sOrderId = oItem.getBindingContext().getProperty("OrderID");
            MessageToast.show("Order " + sOrderId + " was pressed.");
        },

        onNavBack: function () {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView1", {}, true);
            }
        }
    });
});