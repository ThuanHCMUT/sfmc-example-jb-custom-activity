// JOURNEY BUILDER CUSTOM ACTIVITY - discount-code ACTIVITY
// ````````````````````````````````````````````````````````````
// SERVER SIDE IMPLEMENTATION
//
// This example demonstrates
// * Configuration Lifecycle Events
//    - save
//    - publish
//    - validate
// * Execution Lifecycle Events
//    - execute
//    - stop

// const express = require('express');
// const configJSON = require('../config/config-json');

// // setup the discount-code example app
// module.exports = function discountCodeExample(app, options) {
//     const moduleDirectory = `${options.rootDirectory}/modules/discount-code`;

//     // setup static resources
//     const staticOptions = {
//         setHeaders: (res) => {
//             res.setHeader('Access-Control-Allow-Origin', '*');
//             res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://*.exacttarget.com https://*.marketingcloudapps.com https://*.salesforce.com");
//         }
//     };
//     app.use('/modules/discount-code/dist', express.static(`${moduleDirectory}/dist`, staticOptions));
//     app.use('/modules/discount-code/images', express.static(`${moduleDirectory}/images`, staticOptions));

//     // setup the index redirect
//     app.get('/modules/discount-code/', function(req, res) {
//         return res.redirect('/modules/discount-code/index.html');
//     });

//     // setup index.html route
//     app.get('/modules/discount-code/index.html', function(req, res) {
//         // you can use your favorite templating library to generate your html file.
//         // this example keeps things simple and just returns a static file
//         res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://*.exacttarget.com https://*.marketingcloudapps.com https://*.salesforce.com");
//         res.removeHeader('X-Frame-Options'); 
//         return res.sendFile(`${moduleDirectory}/html/index.html`);
//     });

//     // setup config.json route
//     app.get('/modules/discount-code/config.json', function(req, res) {
//         // Journey Builder looks for config.json when the canvas loads.
//         // We'll dynamically generate the config object with a function
//         return res.status(200).json(configJSON(req));
//     });

//     // ```````````````````````````````````````````````````````
//     // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
//     //
//     // CONFIGURATION
//     // ```````````````````````````````````````````````````````
//     // Reference:
//     // https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/interaction-operating-states.htm

//     /**
//      * Called when a journey is saving the activity.
//      * @return {[type]}     [description]
//      * 200 - Return a 200 iff the configuraiton is valid.
//      * 30x - Return if the configuration is invalid (this will block the publish phase)
//      * 40x - Return if the configuration is invalid (this will block the publish phase)
//      * 50x - Return if the configuration is invalid (this will block the publish phase)
//      */
//     app.post('/modules/discount-code/save', function(req, res) {
//         console.log('debug: /modules/discount-code/save');
//         return res.status(200).json({});
//     });

//     /**
//      * Called when a Journey has been published.
//      * This is when a journey is being activiated and eligible for contacts
//      * to be processed.
//      * @return {[type]}     [description]
//      * 200 - Return a 200 iff the configuraiton is valid.
//      * 30x - Return if the configuration is invalid (this will block the publish phase)
//      * 40x - Return if the configuration is invalid (this will block the publish phase)
//      * 50x - Return if the configuration is invalid (this will block the publish phase)
//      */
//     app.post('/modules/discount-code/publish', function(req, res) {
//         console.log('debug: /modules/discount-code/publish');
//         return res.status(200).json({});
//     });

//     /**
//      * Called when Journey Builder wants you to validate the configuration
//      * to ensure the configuration is valid.
//      * @return {[type]}
//      * 200 - Return a 200 iff the configuraiton is valid.
//      * 30x - Return if the configuration is invalid (this will block the publish phase)
//      * 40x - Return if the configuration is invalid (this will block the publish phase)
//      * 50x - Return if the configuration is invalid (this will block the publish phase)
//      */
//     app.post('/modules/discount-code/validate', function(req, res) {
//         console.log('debug: /modules/discount-code/validate');
//         return res.status(200).json({});
//     });


//     // ```````````````````````````````````````````````````````
//     // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
//     //
//     // EXECUTING JOURNEY
//     // ```````````````````````````````````````````````````````

//     /**
//      * Called when a Journey is stopped.
//      * @return {[type]}
//      */
//     app.post('/modules/discount-code/stop', function(req, res) {
//         console.log('debug: /modules/discount-code/stop');
//         return res.status(200).json({});
//     });

//     /**
//      * Called when a contact is flowing through the Journey.
//      * @return {[type]}
//      * 200 - Processed OK
//      * 3xx - Contact is ejected from the Journey.
//      * 4xx - Contact is ejected from the Journey.
//      * 5xx - Contact is ejected from the Journey.
//      */
//     app.post('/modules/discount-code/execute', function(req, res) {
//         console.log('debug: /modules/discount-code/execute');

//         const request = req.body;

//         console.log(" req.body", JSON.stringify(req.body));

//         // Find the in argument
//         function getInArgument(k) {
//             if (request && request.inArguments) {
//                 for (let i = 0; i < request.inArguments.length; i++) {
//                     let e = request.inArguments[i];
//                     if (k in e) {
//                         return e[k];
//                     }
//                 }
//             }
//         }

//         /**
//          * Generate a random discount code.
//          *
//          * Note: This function is for demonstration purposes only and is not designed
//          * to generate real random codes. The first digit is always A, B, C, D, or E.
//          *
//          * @returns {Object}
//          *
//          * Example Response Object
//          * {
//          *    "discount":"15",
//          *    "discountCode":"ADUXN-96454-15%"
//          * }
//          */
//         function generateRandomCode() {
//             let toReturn = String.fromCharCode(65+(Math.random() * 5));
//             for(let i = 0; i < 4; i++) {
//                 toReturn += String.fromCharCode(65+(Math.random() * 25));
//             }
//             return toReturn + "-" + Math.round(Math.random() * 99999, 0);
//         }

//         // example: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/example-rest-activity.htm
//         const discountInArgument = getInArgument('discount') || 'nothing';
//         const responseObject = {
//             discount: discountInArgument,
//             discountCode: generateRandomCode() + `-${discountInArgument}%`
//         };

//         console.log('Response Object', JSON.stringify(responseObject));

//         return res.status(200).json(responseObject);
//     });

// };










const express = require('express');
const configJSON = require('../config/config-json');

// setup the discount-code example app
module.exports = function discountCodeExample(app, options) {
    const moduleDirectory = `${options.rootDirectory}/modules/discount-code`;

    const moduleBasePath = '/modules/discount-code';

    /**
     * Common security headers for static resources and html.
     * Salesforce Marketing Cloud Journey Builder loads Custom Activity inside iframe,
     * so we need to allow frame ancestors from SFMC / Salesforce domains.
     */
    const setSecurityHeaders = (res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Content-Security-Policy',
            "frame-ancestors 'self' https://*.exacttarget.com https://*.marketingcloudapps.com https://*.salesforce.com"
        );
        res.removeHeader('X-Frame-Options');
    };

    // setup static resources
    const staticOptions = {
        setHeaders: (res) => {
            setSecurityHeaders(res);
        }
    };

    app.use(`${moduleBasePath}/dist`, express.static(`${moduleDirectory}/dist`, staticOptions));
    app.use(`${moduleBasePath}/images`, express.static(`${moduleDirectory}/images`, staticOptions));

    // setup the index redirect
    app.get(`${moduleBasePath}/`, function(req, res) {
        return res.redirect(`${moduleBasePath}/index.html`);
    });

    // setup index.html route
    app.get(`${moduleBasePath}/index.html`, function(req, res) {
        setSecurityHeaders(res);
        return res.sendFile(`${moduleDirectory}/html/index.html`);
    });

    // setup config.json route
    app.get(`${moduleBasePath}/config.json`, function(req, res) {
        // Journey Builder looks for config.json when the canvas loads.
        // We'll dynamically generate the config object with a function.
        return res.status(200).json(configJSON(req));
    });

    /**
     * Helper: Get value from inArguments array.
     *
     * Journey Builder sends payload like:
     * {
     *   "inArguments": [
     *      { "discount": "15" },
     *      { "emailAddress": "abc@example.com" }
     *   ]
     * }
     */
    function getInArgument(request, key) {
        if (!request || !Array.isArray(request.inArguments)) {
            return undefined;
        }

        for (let i = 0; i < request.inArguments.length; i++) {
            const item = request.inArguments[i];

            if (item && Object.prototype.hasOwnProperty.call(item, key)) {
                return item[key];
            }
        }

        return undefined;
    }

    /**
     * Helper: Validate discount value.
     *
     * You can modify this rule depending on your business requirement.
     * Currently valid examples:
     * - "10"
     * - "15"
     * - 20
     */
    function isValidDiscount(discount) {
        if (discount === undefined || discount === null || discount === '') {
            return false;
        }

        const discountNumber = Number(discount);

        if (Number.isNaN(discountNumber)) {
            return false;
        }

        return discountNumber > 0 && discountNumber <= 100;
    }

    /**
     * Helper: Generate random discount code.
     *
     * Example:
     * ABCDE-12345
     */
    function generateRandomCode() {
        let code = '';

        for (let i = 0; i < 5; i++) {
            code += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }

        const numberPart = String(Math.floor(Math.random() * 100000)).padStart(5, '0');

        return `${code}-${numberPart}`;
    }

    /**
     * Helper: Validate configuration payload from Journey Builder.
     *
     * This is used by save / publish / validate lifecycle endpoints.
     */
    function validateConfigurationPayload(req) {
        const request = req.body || {};
        const discount = getInArgument(request, 'discount');

        if (!isValidDiscount(discount)) {
            return {
                valid: false,
                message: 'Invalid discount. Discount must be a number between 1 and 100.'
            };
        }

        return {
            valid: true,
            message: 'Configuration is valid.'
        };
    }

    // ---------------------------------------------------------------------
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    //
    // CONFIGURATION
    // ---------------------------------------------------------------------

    /**
     * Called when a journey is saving the activity.
     *
     * 200 - Return if the configuration is valid.
     * 30x / 40x / 50x - Return if the configuration is invalid.
     */
    app.post(`${moduleBasePath}/save`, function(req, res) {
        console.log(`debug: ${moduleBasePath}/save`);
        console.log('save req.body:', JSON.stringify(req.body));

        const validation = validateConfigurationPayload(req);

        if (!validation.valid) {
            console.error('save validation failed:', validation.message);

            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        return res.status(200).json({
            success: true,
            message: validation.message
        });
    });

    /**
     * Called when a Journey has been published.
     * This is when a journey is being activated and eligible for contacts
     * to be processed.
     */
    app.post(`${moduleBasePath}/publish`, function(req, res) {
        console.log(`debug: ${moduleBasePath}/publish`);
        console.log('publish req.body:', JSON.stringify(req.body));

        const validation = validateConfigurationPayload(req);

        if (!validation.valid) {
            console.error('publish validation failed:', validation.message);

            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        return res.status(200).json({
            success: true,
            message: validation.message
        });
    });

    /**
     * Called when Journey Builder wants you to validate the configuration
     * to ensure the configuration is valid.
     */
    app.post(`${moduleBasePath}/validate`, function(req, res) {
        console.log(`debug: ${moduleBasePath}/validate`);
        console.log('validate req.body:', JSON.stringify(req.body));

        const validation = validateConfigurationPayload(req);

        if (!validation.valid) {
            console.error('validate failed:', validation.message);

            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        return res.status(200).json({
            success: true,
            message: validation.message
        });
    });

    // ---------------------------------------------------------------------
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    //
    // EXECUTING JOURNEY
    // ---------------------------------------------------------------------

    /**
     * Called when a Journey is stopped.
     */
    app.post(`${moduleBasePath}/stop`, function(req, res) {
        console.log(`debug: ${moduleBasePath}/stop`);
        console.log('stop req.body:', JSON.stringify(req.body));

        return res.status(200).json({
            success: true,
            message: 'Journey stopped.'
        });
    });

    /**
     * Called when a contact is flowing through the Journey.
     *
     * 200 - Processed OK
     * 3xx / 4xx / 5xx - Contact is ejected from the Journey.
     */
    app.post(`${moduleBasePath}/execute`, function(req, res) {
        console.log(`debug: ${moduleBasePath}/execute`);
        console.log('execute req.body:', JSON.stringify(req.body));

        const request = req.body || {};

        const discountInArgument = getInArgument(request, 'discount');
        const contactKey = request.contactKey || request.keyValue || null;
        const activityId = request.activityId || null;
        const journeyId = request.journeyId || null;

        if (!isValidDiscount(discountInArgument)) {
            const errorResponse = {
                success: false,
                message: 'Invalid discount. Discount must be a number between 1 and 100.',
                discount: discountInArgument || null,
                discountCode: null,
                contactKey,
                activityId,
                journeyId
            };

            console.error('execute validation failed:', JSON.stringify(errorResponse));

            return res.status(400).json(errorResponse);
        }

        const discountCode = `${generateRandomCode()}-${discountInArgument}%`;

        const responseObject = {
            success: true,
            discount: discountInArgument,
            discountCode,
            contactKey,
            activityId,
            journeyId
        };

        console.log('execute response:', JSON.stringify(responseObject));

        return res.status(200).json(responseObject);
    });
};