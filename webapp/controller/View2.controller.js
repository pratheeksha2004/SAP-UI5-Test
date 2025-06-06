sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History"
], function (Controller, JSONModel, Filter, FilterOperator, History) {
    "use strict";

    return Controller.extend("com.northwind.app.northwindapp.controller.View2", {

        onInit: function () {
            // Create a view model to control the busy indicator (this is fine in onInit)
            const oViewModel = new JSONModel({
                busy: false
            });
            this.getView().setModel(oViewModel, "view");

            // *** CHANGE: Attach to the router's "pattern aatched" event instead of doing it directly ***
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteEmployees").attachPatternMatched(this._onRouteMatched, this);
        },

        // *** NEW FUNCTION: This function will run every time the "RouteEmployees" is navigated to ***
        _onRouteMatched: function () {
            // Now we can safely get the binding and attach events
            const oTable = this.byId("employeesTable");
            const oBinding = oTable.getBinding("items");

            if (oBinding) {
                 oBinding.attachEvents({
                    dataRequested: () => this.getView().getModel("view").setProperty("/busy", true),
                    dataReceived: () => this.getView().getModel("view").setProperty("/busy", false)
                });
            }
        },

        onFilterEmployees: function (oEvent) {
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");

            if (sQuery && sQuery.length > 0) {
                const oCombinedFilter = new Filter({
                    filters: [
                        new Filter("FirstName", FilterOperator.Contains, sQuery),
                        new Filter("LastName", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                });
                aFilter.push(oCombinedFilter);
            }

            const oTable = this.byId("employeesTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
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