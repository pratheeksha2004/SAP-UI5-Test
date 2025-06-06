sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * Determines the highlight state of a list item based on stock quantity.
         * @param {int} iStock The stock quantity of the product.
         * @returns {sap.ui.core.ValueState} "Error" for low stock, "None" otherwise.
         */
        stockState: function (iStock) {
            if (iStock < 10) {
                return "Error"; // "Error" state gives a red background
            } else {
                return "None";
            }
        }
    };
});