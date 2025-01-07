/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(["N/record", "SuiteScripts/Utils/util"], function (record, util) {

    function onRequest(context) {
        try {

            if (context.request.method == "GET") {

                const test_so = "3913";

                const test_po = "217";

                const test_customer = "8260";


                var soRec = record.load({
                    type: "salesorder",
                    id: test_so
                })

                var itemsFromSo = util.getLines(soRec, "item", ["item", "rate", "quantity", "description", "amount"])

                context.response.write("SO ITEMS")

                context.response.write(JSON.stringify(itemsFromSo, null, 1))

                context.response.write('<br/>')

                var poRec = record.load({
                    type: "purchaseorder",
                    id: test_po
                })

                var itemsFromPo = util.getLines(poRec, "item", ["item", "rate", "quantity", "amount"])

                context.response.write("PO ITEMS")

                context.response.write(JSON.stringify(itemsFromPo, null, 1))

                context.response.write('<br/>')

                var cusRec = record.load({
                    type: "customer",
                    id: test_customer
                })

                var addressBook = util.getLines(cusRec, "addressbook", ["addressid", "defaultbilling", "defaultshipping", "label"])

                context.response.write("Addressbook")

                context.response.write(JSON.stringify(addressBook, null, 1))

                context.response.write('<br/>')


            }


        } catch (e) {
            log.error("suitelet error", e);
        }
    }

    return {
        onRequest: onRequest
    }
});
