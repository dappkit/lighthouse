"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var powergate_client_1 = require("@textile/powergate-client");
var Powergate = /** @class */ (function () {
    function Powergate(config) {
        this.pow = powergate_client_1.createPow(config.host);
        // this.token = this.getUserToken();
        this.setUserToken();
    }
    Powergate.prototype.getUserToken = function () {
        var _this = this;
        return new Promise(function (resolve) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pow.admin.users.create()]; // save this token for later use!
                        case 1:
                            user = (_a.sent()) // save this token for later use!
                            .user;
                            resolve(user.token);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    Powergate.prototype.setUserToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('setUserToken called:', process.env.POW_TOKEN);
                this.pow.setToken(process.env.POW_TOKEN);
                return [2 /*return*/];
            });
        });
    };
    Powergate.prototype.store = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            var jobId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pow.storageConfig.apply(cid)];
                    case 1:
                        jobId = (_a.sent()).jobId;
                        return [2 /*return*/, jobId];
                }
            });
        });
    };
    Powergate.prototype.watchJob = function (jobId, callback) {
        return this.pow.storageJobs.watch(function (job) {
            callback(job);
            if (job.status === powergate_client_1.powTypes.JobStatus.JOB_STATUS_CANCELED) {
                console.log("job canceled");
            }
            else if (job.status === powergate_client_1.powTypes.JobStatus.JOB_STATUS_FAILED) {
                console.log("job failed");
            }
            else if (job.status === powergate_client_1.powTypes.JobStatus.JOB_STATUS_SUCCESS) {
                console.log("job success!");
                console.log("The job is:", job);
            }
        }, jobId);
    };
    Powergate.prototype.watchLogs = function (cid, callback) {
        // watch all FFS events for a cid
        return this.pow.data.watchLogs(function (logEvent) {
            console.log("received event for cid " + logEvent.cid);
            callback(logEvent);
        }, cid);
    };
    Powergate.prototype.getStorageInfo = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // store the data using the default storage configuration
                // const storageInfo = await this.pow.storageInfo.get(cid);
                // return storageInfo;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(_this.pow.storageInfo.get(cid));
                    })];
            });
        });
    };
    return Powergate;
}());
exports["default"] = Powergate;
