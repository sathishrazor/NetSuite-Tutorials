define([], function () {

    /**
     * Description returns the list of sublist data in a array format
     * @param {record} rec
     * @param {String} sublistId
     * @param {Array} columns
     * @returns {Array}
     */

    function getLines(rec, sublistId, columns) {
        try {
            var count = rec.getLineCount(sublistId);
            var results = [];
            for (let i = 0; i < count; i++) {
                var row = {};

                for (var j = 0; j < columns.length; j++) {
                    row[columns[j]] = rec.getSublistValue({
                        sublistId: sublistId,
                        fieldId: columns[j],
                        line: i
                    })
                    try {
                        row[columns[j] + "_txt"] = rec.getSublistText({
                            sublistId: sublistId,
                            fieldId: columns[j],
                            line: i
                        })
                    } catch (e) {
                        log.error("sublist fetch text failed", e);
                    }
                }
                results.push(row);
            }
            return results;
        } catch (e) {
            log.error("getLines failed", e);
            return [];
        }
    }


    function pick(arr, key) {
        try {
            if (Array.isArray(arr)) {
                return arr.map(function (c) {
                    return c[key];
                })
            }
            return [];
        } catch (error) {
            log.error('pick failed', e);
        }

    }


    function sum(arr, key) {

        var valuesToSum = arr;

        if (key) {

            valuesToSum = arr.map(function (c) {

                return toNum(c[key]);
            })
        }


        return valuesToSum.reduce(function (a, b) {
            return a + b
        }, 0)
    }


    function toNum(s) {
        s = parseFloat(s);

        if (isNaN(s)) {
            return 0;
        }
        return s;
    }


    return {
        getLines: getLines,
        pick: pick,
        sum: sum,
        toNum: toNum
    }


})