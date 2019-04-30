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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var rest_api_service_1 = require("../rest-api.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var EditPage = /** @class */ (function () {
    function EditPage(api, loadingController, route, router, formBuilder) {
        this.api = api;
        this.loadingController = loadingController;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.getClassroom(this.route.snapshot.paramMap.get('id'));
        this.classroomForm = this.formBuilder.group({
            'class_name': [null, forms_1.Validators.required],
            'students': this.formBuilder.array([])
        });
    }
    EditPage.prototype.getClassroom = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                        //content: 'Loading'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.api.getClassroomById(id).subscribe(function (res) {
                                _this.classroomForm.controls['class_name'].setValue(res.ClassName);
                                var controlArray = _this.classroomForm.controls['students'];
                                res.Students.forEach(function (std) {
                                    controlArray.push(_this.formBuilder.group({
                                        student_name: ''
                                    }));
                                });
                                for (var i = 0; i < res.Students.length; i++) {
                                    controlArray.controls[i].get('student_name').setValue(res.Students[i].StudentName);
                                }
                                console.log(_this.classroomForm);
                                loading.dismiss();
                            }, function (err) {
                                console.log(err);
                                loading.dismiss();
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPage.prototype.createStudent = function () {
        return this.formBuilder.group({
            student_name: ''
        });
    };
    EditPage.prototype.addBlankStudent = function () {
        this.students = this.classroomForm.get('Students');
        this.students.push(this.createStudent());
    };
    EditPage.prototype.deleteStudent = function (control, index) {
        control.removeAt(index);
    };
    EditPage.prototype.updateClassroom = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.updateClassroom(this.route.snapshot.paramMap.get('id'), this.classroomForm.value)
                            .subscribe(function (res) {
                            var id = res['id'];
                            _this.router.navigate(['/detail', JSON.stringify(id)]);
                        }, function (err) {
                            console.log(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPage.prototype.ngOnInit = function () {
    };
    EditPage = __decorate([
        core_1.Component({
            selector: 'app-edit',
            templateUrl: './edit.page.html',
            styleUrls: ['./edit.page.scss'],
        }),
        __metadata("design:paramtypes", [rest_api_service_1.RestApiService,
            angular_1.LoadingController,
            router_1.ActivatedRoute,
            router_1.Router,
            forms_1.FormBuilder])
    ], EditPage);
    return EditPage;
}());
exports.EditPage = EditPage;
//# sourceMappingURL=edit.page.js.map