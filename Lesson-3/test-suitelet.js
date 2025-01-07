/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(["N/record", "SuiteScripts/Utils/util"], function (record, util) {

    function onRequest(context) {
        try {

            if (context.request.method == "GET") {

                const test_so = "3913";

                var soRec = record.load({
                    type: "salesorder",
                    id: test_so
                })

                var itemsFromSo = util.getLines(soRec, "item",
                    ["item", "rate", "quantity", "description", "amount"])

                context.response.write(JSON.stringify(itemsFromSo, null, 1));

                context.response.write('<br/><br/>')

                var item_ids = util.pick(itemsFromSo, "item")


                context.response.write(JSON.stringify(item_ids, null, 1));
                context.response.write('<br/><br/>')

                var total = util.sum(itemsFromSo, "amount")
                var totalQty = util.sum(itemsFromSo, "quantity");

                context.response.write(`total:${total}`);
                context.response.write('<br/><br/>')

                context.response.write(`totalQty:${totalQty}`);
                context.response.write('<br/><br/>')



                var altTotal = util.pick(itemsFromSo, "amount");
                var altTotalNew = util.sum(altTotal);

                context.response.write(`altTotal:${altTotal}`);
                context.response.write('<br/><br/>')

                context.response.write(`altTotalNew:${altTotalNew}`);
                context.response.write('<br/><br/>')



            }


        } catch (e) {
            log.error("suitelet error", e);
        }
    }

    return {
        onRequest: onRequest
    }
});
