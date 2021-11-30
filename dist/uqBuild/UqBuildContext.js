"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UqBuildContext = void 0;
var TsTemplate_1 = require("./TsTemplate");
var UqBuildContext = /** @class */ (function () {
    function UqBuildContext(uqsLoader, uqTsSrcPath) {
        this.uqsLoader = uqsLoader;
        this.uqTsSrcPath = uqTsSrcPath;
        this.tsTemplate = new TsTemplate_1.TsTemplate(this);
    }
    return UqBuildContext;
}());
exports.UqBuildContext = UqBuildContext;
//# sourceMappingURL=UqBuildContext.js.map