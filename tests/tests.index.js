/// <reference path="../node_modules/inversify-binding-decorators/type_definitions/inversify-binding-decorators/inversify-binding-decorators.d.ts" />

var testsContext = require.context(".", true, /\.ts(x?)$/);
testsContext.keys().forEach(testsContext);

