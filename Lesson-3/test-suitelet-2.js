/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(["N/record", "SuiteScripts/Utils/util", "N/search"], function (record, util, search) {

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

                var itemSer = {
                    type: "item",
                    filters: [
                        ["internalid", "anyof", util.pick(itemsFromSo, "item")]
                    ],
                    columns: ["displayname", "itemid"]
                }


                var itemRes = search.create(itemSer).run().getRange({ start: 0, end: 999 });


                var results = [];

                itemRes.forEach(function (c) {
                    results.push({
                        itemName: c.getValue("displayname"),
                        itemId: c.getValue("itemid")
                    })
                })


                context.response.write(JSON.stringify(results, null, 1))


            }


        } catch (e) {
            log.error("suitelet error", e);
        }
    }

    return {
        onRequest: onRequest
    }
});
