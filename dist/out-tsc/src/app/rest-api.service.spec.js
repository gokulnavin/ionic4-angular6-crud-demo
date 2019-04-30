"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rest_api_service_1 = require("./rest-api.service");
describe('RestApiService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(rest_api_service_1.RestApiService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=rest-api.service.spec.js.map