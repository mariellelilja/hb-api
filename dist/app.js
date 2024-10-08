"use strict";
//import dotenv from 'dotenv';
//dotenv.config();
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var TheService = /** @class */ (function () {
    function TheService() {
        this.apiKey = process.env.GIPHY_API_KEY;
        console.log('API Key:', this.apiKey);
        this.baseUrl = 'https://api.giphy.com/v1/gifs/random?';
    }
    TheService.prototype.fetchData = function (inputQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, gifUrl, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("".concat(this.baseUrl, "api_key=").concat(this.apiKey, "&tag=").concat(inputQuery))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response not ok.');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        gifUrl = data.data.images.original.url;
                        //return data;
                        return [2 /*return*/, gifUrl];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching the GIF:', error_1);
                        return [2 /*return*/, 'Error fetching GIF'];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TheService;
}());
//export default TheService;
var theService = new TheService();
document.getElementById('searchButton').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var inputQuery, gifUrl, outputDiv, img_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputQuery = document.getElementById('inputQuery').value;
                return [4 /*yield*/, theService.fetchData(inputQuery)];
            case 1:
                gifUrl = _a.sent();
                outputDiv = document.getElementById('outputDiv');
                if (outputDiv && gifUrl === 'Error fetching GIF') {
                    outputDiv.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
                }
                else if (outputDiv && gifUrl) {
                    outputDiv.innerHTML = '';
                    img_1 = document.createElement('img');
                    console.log('gifUrl: ' + gifUrl);
                    img_1.src = gifUrl;
                    img_1.alt = "GIF showing ".concat(inputQuery);
                    img_1.style.maxWidth = '100%';
                    //const img = `<img src="${gifUrl}" alt="GIF showing ${inputQuery}" style="max-width: 100%;">`;
                    outputDiv.appendChild(img_1);
                    //    outputDiv.style.opacity = '0';
                    //    outputDiv.style.opacity = '1';
                    img_1.onload = function () {
                        img_1.classList.add('loaded');
                    };
                }
                return [2 /*return*/];
        }
    });
}); });
