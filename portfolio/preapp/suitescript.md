# Suitescript
[Suitescript](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_163726005075.html#subsect_164988373340) is a scripting language for Oracle Netsuite. It allows you extend Netsuite in multiple different ways, and can help automate a lot of the laborious business processes that might otherwise bog you down.

At Preapp, Netsuite was our source truth and all of our critical business information ran through it. We extended it in multiple ways, adding chatbots notifications and user alerts, to mass update scripts, built in custom search forms, and even exposed API endpoints that our other applications could connect to.

While this isn't all of them, here's a few choice scripts that demonstrate some of my Suitescript experience.

The main tools and technologies used are:
- Suitescript 2.X

## User Events/Alerts
Here's a few examples for Users Events/Alert Messages

Here's a simple Chatbot Notification Script for launching after you create a certain type of record (some of this is truncated):
```js
/**
 */
define(["N/record", "N/https", "N/log"], function(r,https,log) {

  /**
   */
  function afterSubmit(context) {
    // Get Data you want to send through the chatbot
    var currentRecord = context.newRecord;
    ...

    // Chatbot Message parameters
    var ChatbotUrl, ChatBotToken, header, body, url;
    ...

    // Chatbot message Send and Response
    var updatestatus = https.post({
      url: url,
      body: body,
      headers: headers
    });
    var updateresults = JSON.parse(updatestatus.getBody());
  }

  // What event to attach this script to
  return {
    afterSubmit: afterSubmit
  };
});
```

## Mass Update 
Here's a Mass Update script that transforms data on all records passed to it. This one was used to update Transactional Record Departments based on if Sales Orders or related records were created after an input date. The Use Case for this is as follows: Same inventory items; however, Fiscal Year has changed department names due to restructuring. 

This is edited for readability.

```js
/**
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 */
define(['N/record', 'N/runtime', 'N/log', 'N/error'], function (record, runtime, log, error) {
    // Main Function
    function processRecord(context) {
        // You should always log
        log.debug({...});

        // Get outside inputs (you can set these in Netsuite)
        var departmentId = runtime.getCurrentScript().getParameter({ name: 'custscript_new_department' });
        var datechange = runtime.getCurrentScript().getParameter({ name: 'custscript_date_change' });

        // Load and do your transformations
        var currentRecord = record.load({ type: context.type, id: context.id });
        if (context.type === record.Type.SALES_ORDER) {
            updateDepartment(currentRecord, departmentId);
            updateItemSublistDepartment(currentRecord, departmentId);
            currentRecord.save();
            updateRelatedRecords(currentRecord, departmentId, datechange);
        }
        else if (context.type === record.Type.ITEM_FULFILLMENT) {
            var createdFromRecord = record.load({ type: record.Type.SALES_ORDER, id: currentRecord.getValue({ fieldId: 'createdfrom' }) });
            updateRelatedRecords(createdFromRecord, departmentId, datechange);
        }
        else {
            throw error.create({...});
        }
    }

    // Helper Functions
    function updateDepartment(currentRecord, departmentId) {
        // Update the department of the Record your're looking at
        ...
    }

    function updateItemSublistDepartment(currentRecord, departmentId) {
        // Loop through sublist items and update
        var numitems = currentRecord.getLineCount({ sublistId: 'item' });
        for (var i = 0; i < numitems; i++) {...}
    }

    function updateRelatedRecords(currentRecord, departmentId, datechange) {
        // Go through all related records and update
        ...
    }

    // Function Call
    function each(context) {
        // The actually function called while doing this mass update
        processRecord(context);
    }

    return {
        each: each
    };
});
```

## Custom Search for Item Shipments by Purchase Order
The use case for this is that Netsuite's custom searches cannot easily do multiple `createdfrom.poastext` searches. This Suitelet takes in a number of Purchase Orders, and then finds all Item Shipment records related to those and format them in a table.

```js
define(["N/search", "N/ui/serverWidget", "N/url", "N/record", "N/log"], function (search, ui, url, record, log) {
    /**
     * Input Sales Orders Reference Numbers and Search.
     */
    var exports = {};

    /**
     */
    function onRequest(context) {
        log.audit({ title: "Request Received." });

        // Fill out Form
        if (context.request.method === 'GET') {
            ...
        }
        // Form Submitted
        else {
            ...
            context.response.writePage({
                pageObject: renderList(translate(itemShipSearch(refNumbers)))
            });
        }
    }

    // Form Builder
    function renderForm() {
        var form = ui.createForm({ title: "Multiple PO Reference Number Search" });

        // Quick Links for UI
        form.addPageLink({
            ...
        });
        form.addPageLink({
            ...
        });

        // Main Form Field
        form.addField({
            id: 'orderrefnumbers',
            label: 'PO Ref Numbers',
            type: ui.FieldType.TEXTAREA
        });

        form.addSubmitButton({
            label: 'Search'
        });

        return form;
    }

    // List Builder
    function renderList(results) {
        var list = ui.createList({ title: "Multi PO Number Item Shipping Search Results" });

        // Quick Links for UI
        list.addPageLink({...});
        list.addPageLink({...});

        // Build Table Columns and add
        list.addColumn({...});
        ...
        list.addRows({ rows: results });
        return list;
    }

    // Search Builder
    function itemShipSearch(refNumbers) {
        // Build Multi PO Filter
        var filters = [];
        for (var index = 0; index < refNumbers.length; index++) {
            if (filters.length > 0) {filters.push("OR")}
            filters.push(["createdfrom.poastext", "is", refNumbers[index]])
        }

        return search.create({
            type: search.Type.TRANSACTION,
            columns: [
                search.createColumn({ name: "tranid", label: "Ref. No" }),
                ....
            ],
            filters: [
                ...
            ]
        }).run().getRange({ start: 0, end: 1000 });
    }

    ...

    exports.onRequest = onRequest;
    return exports;
});
```

## Create Sales Order API Endpoint
This is a simple Restlet that acts as a custom API enpoint that generates and saves a new Sales Order. 

```js
/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(['N/error', 'N/record', 'N/log'], function(error, record, log) {
    // Do Validation for Parameters
    function doValidation(args, argNames, methodName) {
        for (var i = 0; i < args.length; i++){
            if (!args[i] && args[i] !== 0){
                throw error.create({
                    name: 'MISSING_REQ_ARG',
                    message: 'Missing a required argument: [' + argNames[i] + '] for method: ' + methodName
                });
            }
        }
    }

    // Sales Order
    function createSalesOrder(context) {
        var salesOrder = record.create({
            type: record.Type.SALES_ORDER,
            isDynamic: true,
            defaultValues: {
                customform: context.customform,
                entity: context.customer_id
            }
        });

        salesOrder.setValue({ fieldId: 'department', value: context.department });

        for (var i = 0; i < context.itemlist.length; i++)
        {
            //add a line to a sublist
            salesOrder.selectNewLine({
                sublistId: 'item'
            });

            //set item fields
            salesOrder.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                value: context.itemlist[i]['itemid']
            });

            salesOrder.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                value: context.itemlist[i]['quantity']
            });

            //writes the line entry into the loaded record
            salesOrder.commitLine({
                sublistId: 'item'
            });
        }

        salesOrder.save({
            ignoreMandatoryFields: false
        });

        return salesOrder;
    }

    // Get parameters and return appropriate data
    function _post(context) {
        doValidation([context.customer_id, context.customform,context.department, context.itemlist], ['customer_id', 'customform', 'department', 'itemlist'], 'POST');
        return createSalesOrder(context);
    }

    return {
        post: _post
    };
});
```

## Github Link
Here's a link to the Github Repository that has all of these example scripts, un-truncated.

[Link to Github](https://github.com/ahirota/suitescript-examples)


<ContactCard />