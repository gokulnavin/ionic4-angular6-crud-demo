"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var apiUrl = "http://localhost:8201/api/classroom";
var RestApiService = /** @class */ (function () {
    function RestApiService(http) {
        this.http = http;
    }
    RestApiService.prototype.getClassroom = function () {
        return this.http.get(apiUrl, httpOptions).pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    RestApiService.prototype.getClassroomById = function (id) {
        //const url = '${apiUrl}/${id}';
        var url = apiUrl + '/' + id;
        return this.http.get(url, httpOptions).pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    RestApiService.prototype.postClassroom = function (data) {
        var url = '${apiUrl}/add_with_students';
        return this.http.post(url, data, httpOptions)
            .pipe(operators_1.catchError(this.handleError));
    };
    RestApiService.prototype.updateClassroom = function (id, data) {
        //const url = '${apiUrl}/${id}';
        var url = apiUrl + '/' + id;
        return this.http.put(url, data, httpOptions)
            .pipe(operators_1.catchError(this.handleError));
    };
    RestApiService.prototype.deleteClassroom = function (id) {
        var url = '${apiUrl}/${id}';
        return this.http.delete(url, httpOptions)
            .pipe(operators_1.catchError(this.handleError));
    };
    RestApiService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error('Backend returned code ${error.status}, ' +
                'body was: ${error.error}');
        }
        // return an observable with a user-facing error message
        return rxjs_1.throwError('Something bad happened; please try again later.');
    };
    RestApiService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    RestApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RestApiService);
    return RestApiService;
}());
exports.RestApiService = RestApiService;
//# sourceMappingURL=rest-api.service.js.map