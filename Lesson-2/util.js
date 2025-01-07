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
    return {
        getLines: getLines
    }


})