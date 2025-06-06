sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * Calculates the number of items in an order.
         * Handles the OData V2 data structure where expanded items are in a 'results' array.
         * @param {object} oOrderDetails The Order_Details navigation property from the V2 OData service
         * @returns {string} A string like "x Items"
         */
        calculateItemCount: function (oOrderDetails) {
            // For OData V2, the array of items is nested inside the 'results' property.
            if (oOrderDetails && oOrderDetails.results) {
                return oOrderDetails.results.length + " Items";
            }
            
            // If there are no details or the input is invalid, return "0 Items".
            return "0 Items";
        }
    };
});