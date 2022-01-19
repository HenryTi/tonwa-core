"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsUQ = void 0;
var tool_1 = require("../tool");
var tools_1 = require("./tools");
var fieldTypeMap = {
    "char": "string",
    "text": "string",
    "id": "number",
    "textid": "string",
    "int": "number",
    "bigint": "number",
    "smallint": "number",
    "tinyint": "number",
    "dec": "number",
    "float": "number",
    "double": "number",
};
var sysFields = ['id', 'main', 'row', 'no', '$create', '$update', '$owner'];
var TsUQ = /** @class */ (function () {
    function TsUQ(buildContext, uq, uqAlias) {
        var _this = this;
        this.buildTuid = function (tuid) {
            var ts = "\t".concat((0, tools_1.entityName)(tuid.sName), ": UqTuid<Tuid").concat((0, tool_1.capitalCase)(tuid.sName), ">&{tv:(id:number, render?:Render<any>)=>").concat(_this.buildContext.element, "};");
            return ts;
        };
        this.buildTuidInterface = function (tuid) {
            var ts = "export interface Tuid".concat((0, tool_1.capitalCase)(tuid.sName), " {");
            ts += "\n\tid?: number;";
            ts += _this.buildFields(tuid.fields);
            ts += '\n}';
            return ts;
        };
        this.buildAction = function (action) {
            var ts = "\t".concat((0, tools_1.entityName)(action.sName), ": UqAction<Param").concat((0, tool_1.capitalCase)(action.sName), ", Result").concat((0, tool_1.capitalCase)(action.sName), ">;");
            return ts;
        };
        this.buildActionInterface = function (action) {
            var ts = "export interface Param".concat((0, tool_1.capitalCase)(action.sName), " {");
            ts += _this.buildFields(action.fields);
            ts += _this.buildArrs(action.arrFields);
            ts += '\n}\n';
            ts += _this.buildReturns(action, action.returns);
            return ts;
        };
        this.buildEnumInterface = function (enm) {
            var schema = enm.schema;
            if (!schema)
                return;
            var values = schema.values;
            var ts = "export enum ".concat((0, tool_1.capitalCase)(enm.sName), " {");
            var first = true;
            for (var i in values) {
                if (first === false) {
                    ts += ',';
                }
                else {
                    first = false;
                }
                var v = values[i];
                ts += '\n\t' + i + ' = ';
                if (typeof v === 'string') {
                    ts += '"' + v + '"';
                }
                else {
                    ts += v;
                }
            }
            return ts += '\n}';
        };
        this.buildQuery = function (query) {
            var sName = query.sName;
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqQuery<Param").concat((0, tool_1.capitalCase)(sName), ", Result").concat((0, tool_1.capitalCase)(sName), ">;");
            return ts;
        };
        this.buildQueryInterface = function (query) {
            var ts = "export interface Param".concat((0, tool_1.capitalCase)(query.sName), " {");
            ts += _this.buildFields(query.fields);
            ts += '\n}\n';
            ts += _this.buildReturns(query, query.returns);
            return ts;
        };
        this.buildSheet = function (sheet) {
            var sName = sheet.sName, verify = sheet.verify;
            var cName = (0, tool_1.capitalCase)(sName);
            var v = verify ? "Verify".concat(cName) : 'any';
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqSheet<Sheet").concat(cName, ", ").concat(v, ">;");
            return ts;
        };
        this.buildSheetInterface = function (sheet) {
            var sName = sheet.sName, fields = sheet.fields, arrFields = sheet.arrFields, verify = sheet.verify;
            var ts = "export interface Sheet".concat((0, tool_1.capitalCase)(sName), " {");
            ts += _this.buildFields(fields);
            ts += _this.buildArrs(arrFields);
            ts += '}';
            if (verify) {
                var returns = verify.returns;
                ts += "\nexport interface Verify".concat((0, tool_1.capitalCase)(sName), " {");
                for (var _i = 0, returns_1 = returns; _i < returns_1.length; _i++) {
                    var item = returns_1[_i];
                    var arrName = item.name, fields_1 = item.fields;
                    ts += '\n\t' + arrName + ': {';
                    ts += _this.buildFields(fields_1, false, 2);
                    ts += '\n\t}[];';
                }
                ts += '\n}';
            }
            return ts;
        };
        this.buildBook = function (book) {
            var sName = book.sName;
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqBook<Param").concat((0, tool_1.capitalCase)(sName), ", Result").concat((0, tool_1.capitalCase)(sName), ">;");
            return ts;
        };
        this.buildBookInterface = function (book) {
            var sName = book.sName, fields = book.fields, returns = book.returns;
            var ts = "export interface Param".concat((0, tool_1.capitalCase)(sName), " {");
            ts += _this.buildFields(fields);
            ts += '\n}\n';
            ts += _this.buildReturns(book, returns);
            return ts;
        };
        this.buildMap = function (map) {
            var sName = map.sName;
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqMap;");
            return ts;
        };
        this.buildMapInterface = function (map) {
            /*
            let {sName, fields, returns} = map;
            let ts = `export interface Param${capitalCaseString(sName)} {`;
            ts += this.buildFields(fields);
            ts += '\n}\n';
            ts += buildReturns(map, returns);
            return ts;
            */
            return '';
        };
        this.buildHistory = function (history) {
            var sName = history.sName;
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqHistory<Param").concat((0, tool_1.capitalCase)(sName), ", Result").concat((0, tool_1.capitalCase)(sName), ">;");
            return ts;
        };
        this.buildHistoryInterface = function (history) {
            var sName = history.sName, fields = history.fields, returns = history.returns;
            var ts = "export interface Param".concat((0, tool_1.capitalCase)(sName), " {");
            ts += _this.buildFields(fields);
            ts += '\n}\n';
            ts += _this.buildReturns(history, returns);
            return ts;
        };
        this.buildPending = function (pending) {
            var sName = pending.sName;
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqPending<any, any>;");
            return ts;
        };
        this.buildPendingInterface = function (pending) {
            /*
            let {sName, fields, returns} = pending;
            let ts = `export interface Param${capitalCaseString(sName)} {`;
            ts += this.buildFields(fields);
            ts += '\n}\n';
            ts += buildReturns(pending, returns);
            return ts;
            */
            return '';
        };
        this.buildID = function (id) {
            var sName = id.sName;
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqID<any> & IDXEntity<any>;");
            return ts;
        };
        this.buildIDX = function (idx) {
            var sName = idx.sName;
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqIDX<any>;");
            return ts;
        };
        this.buildIX = function (ix) {
            var sName = ix.sName;
            var ts = "\t".concat((0, tools_1.entityName)(sName), ": UqIX<any>;");
            return ts;
        };
        this.buildIDInterface = function (idEntity) {
            var sName = idEntity.sName, fields = idEntity.fields, schema = idEntity.schema;
            var schemaKeys = schema.keys;
            var keys = [], others = [];
            var _loop_1 = function (f) {
                var name_1 = f.name;
                if (name_1 === 'id')
                    return "continue";
                if (schemaKeys.find(function (v) { return v.name === name_1; }))
                    keys.push(f);
                else
                    others.push(f);
            };
            for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
                var f = fields_2[_i];
                _loop_1(f);
            }
            var ts = "export interface ".concat((0, tool_1.capitalCase)(sName), " {");
            ts += "\n\tid?: number;";
            ts += _this.buildFields(keys, true);
            ts += _this.buildFields(others, true);
            ts += '\n}';
            return ts;
        };
        this.buildIDXInterface = function (idx) {
            var sName = idx.sName, fields = idx.fields, schema = idx.schema;
            var exFields = schema.exFields;
            var ts = "export interface ".concat((0, tool_1.capitalCase)(sName), " {");
            var indent = 1;
            for (var _i = 0, fields_3 = fields; _i < fields_3.length; _i++) {
                var field = fields_3[_i];
                var name_2 = field.name, type = field.type;
                var s = fieldTypeMap[type];
                if (!s)
                    s = 'any';
                ts += "\n".concat('\t'.repeat(indent)).concat(name_2);
                if (name_2 !== 'id')
                    ts += '?';
                ts += ": ".concat(s, ";");
            }
            ts += "\n\t$act?: number;";
            var hasTrack = false;
            var hasMemo = false;
            if (exFields) {
                for (var _a = 0, exFields_1 = exFields; _a < exFields_1.length; _a++) {
                    var exField = exFields_1[_a];
                    var track = exField.track, memo = exField.memo;
                    if (track === true)
                        hasTrack = true;
                    if (memo === true)
                        hasMemo = true;
                }
            }
            if (hasTrack === true) {
                ts += "\n\t$track?: number;";
            }
            if (hasMemo === true) {
                ts += "\n\t$memo?: string;";
            }
            ts += '\n}';
            return ts;
        };
        this.buildIDXActParamInterface = function (idx) {
            var sName = idx.sName, fields = idx.fields, schema = idx.schema;
            var exFields = schema.exFields;
            var ts = "export interface ActParam".concat((0, tool_1.capitalCase)(sName), " {");
            var indent = 1;
            for (var _i = 0, fields_4 = fields; _i < fields_4.length; _i++) {
                var field = fields_4[_i];
                var name_3 = field.name, type = field.type;
                var s = fieldTypeMap[type];
                if (!s)
                    s = 'any';
                ts += "\n".concat('\t'.repeat(indent)).concat(name_3);
                if (name_3 !== 'id')
                    ts += '?';
                ts += ": ".concat(s, "|IDXValue;");
            }
            ts += "\n\t$act?: number;";
            var hasTrack = false;
            var hasMemo = false;
            if (exFields) {
                for (var _a = 0, exFields_2 = exFields; _a < exFields_2.length; _a++) {
                    var exField = exFields_2[_a];
                    var track = exField.track, memo = exField.memo;
                    if (track === true)
                        hasTrack = true;
                    if (memo === true)
                        hasMemo = true;
                }
            }
            if (hasTrack === true) {
                ts += "\n\t$track?: number;";
            }
            if (hasMemo === true) {
                ts += "\n\t$memo?: string;";
            }
            ts += '\n}';
            return ts;
        };
        this.buildIXInterface = function (ix) {
            var sName = ix.sName, fields = ix.fields;
            var ts = "export interface ".concat((0, tool_1.capitalCase)(sName), " {");
            ts += _this.buildFields(fields);
            ts += '\n}';
            return ts;
        };
        this.buildContext = buildContext;
        this.uq = uq;
        this.uqAlias = uqAlias;
    }
    TsUQ.prototype.build = function () {
        var _this = this;
        var tsImport = "\n// eslint-disable-next-line @typescript-eslint/no-unused-vars\nimport { IDXValue, Uq";
        var ts = "\n\n";
        ts += '\n//===============================';
        ts += "\n//======= UQ ".concat(this.uq.name, " ========");
        ts += '\n//===============================';
        ts += '\n';
        var _a = this.uq, enumArr = _a.enumArr, tuidArr = _a.tuidArr, actionArr = _a.actionArr, sheetArr = _a.sheetArr, queryArr = _a.queryArr, bookArr = _a.bookArr, mapArr = _a.mapArr, historyArr = _a.historyArr, pendingArr = _a.pendingArr, idArr = _a.idArr, idxArr = _a.idxArr, ixArr = _a.ixArr;
        enumArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildEnumInterface); });
        tuidArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildTuidInterface); });
        actionArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildActionInterface); });
        sheetArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildSheetInterface); });
        queryArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildQueryInterface); });
        bookArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildBookInterface); });
        mapArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildMapInterface); });
        historyArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildHistoryInterface); });
        pendingArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildPendingInterface); });
        idArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildIDInterface); });
        idxArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildIDXInterface); });
        idxArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildIDXActParamInterface); });
        ixArr.forEach(function (v) { return ts += _this.uqEntityInterface(v, _this.buildIXInterface); });
        ts += this.buildActsInterface(this.uq);
        ts += "\n\nexport interface UqExt extends Uq {\n\tActs(param:ParamActs): Promise<any>;\n\tSQL: Uq;\n\tIDRender(id:number):".concat(this.buildContext.element, ";\n\tIDLocalRender(id:number):").concat(this.buildContext.element, ";\n");
        function appendArr(arr, type, tsBuild) {
            if (arr.length === 0)
                return;
            var tsLen = ts.length;
            arr.forEach(function (v) { return ts += tsBuild(v); });
            if (ts.length - tsLen > 0) {
                tsImport += ', Uq' + type;
            }
        }
        appendArr(tuidArr, 'Tuid', function (v) { return _this.uqBlock(v, _this.buildTuid); });
        appendArr(actionArr, 'Action', function (v) { return _this.uqBlock(v, _this.buildAction); });
        appendArr(sheetArr, 'Sheet', function (v) { return _this.uqBlock(v, _this.buildSheet); });
        appendArr(bookArr, 'Book', function (v) { return _this.uqBlock(v, _this.buildBook); });
        appendArr(queryArr, 'Query', function (v) { return _this.uqBlock(v, _this.buildQuery); });
        appendArr(mapArr, 'Map', function (v) { return _this.uqBlock(v, _this.buildMap); });
        appendArr(historyArr, 'History', function (v) { return _this.uqBlock(v, _this.buildHistory); });
        appendArr(pendingArr, 'Pending', function (v) { return _this.uqBlock(v, _this.buildPending); });
        appendArr(idArr, 'ID', function (v) { return _this.uqBlock(v, _this.buildID); });
        appendArr(idxArr, 'IDX', function (v) { return _this.uqBlock(v, _this.buildIDX); });
        appendArr(ixArr, 'IX', function (v) { return _this.uqBlock(v, _this.buildIX); });
        ts += '\n}\n';
        ts += "\nexport function assign(uq: any, to:string, from:any): void {\n\tlet hasEntity = uq.hasEntity(to);\n\tif (hasEntity === false) {\n\t\treturn;\n\t}\n\tObject.assign((uq as any)[to], from);\n}\n";
        tsImport += " } from \"tonwa-core\";\n// eslint-disable-next-line @typescript-eslint/no-unused-vars\nimport { Render, IDXEntity } from \"tonwa-".concat(this.buildContext.uiPlatform, "\";");
        return tsImport + ts;
    };
    TsUQ.prototype.uqEntityInterface = function (entity, buildInterface) {
        var name = entity.name;
        if (name.indexOf('$') > 0)
            return '';
        var entityCode = buildInterface(entity);
        if (!entityCode)
            return '';
        return '\n' + entityCode + '\n';
    };
    TsUQ.prototype.uqBlock = function (entity, build) {
        var name = entity.name;
        if (name.indexOf('$') > 0)
            return '';
        var entityCode = build(entity);
        if (!entityCode)
            return '';
        return '\n' + entityCode;
    };
    TsUQ.prototype.buildFields = function (fields, isInID, indent) {
        if (isInID === void 0) { isInID = false; }
        if (indent === void 0) { indent = 1; }
        if (!fields)
            return '';
        var ts = '';
        for (var _i = 0, fields_5 = fields; _i < fields_5.length; _i++) {
            var f = fields_5[_i];
            ts += this.buildField(f, isInID, indent);
        }
        return ts;
    };
    TsUQ.prototype.buildField = function (field, isInID, indent) {
        if (indent === void 0) { indent = 1; }
        var name = field.name, type = field.type;
        var s = fieldTypeMap[type];
        if (!s)
            s = 'any';
        var q = (isInID === true && sysFields.indexOf(name) >= 0) ? '?' : '';
        return "\n".concat('\t'.repeat(indent)).concat(name).concat(q, ": ").concat(s, ";");
    };
    TsUQ.prototype.buildArrs = function (arrFields) {
        if (!arrFields)
            return '';
        var ts = '\n';
        for (var _i = 0, arrFields_1 = arrFields; _i < arrFields_1.length; _i++) {
            var af = arrFields_1[_i];
            ts += "\t".concat((0, tool_1.camelCase)(af.name), ": {");
            ts += this.buildFields(af.fields, false, 2);
            ts += '\n\t}[];\n';
        }
        return ts;
    };
    TsUQ.prototype.buildReturns = function (entity, returns) {
        if (!returns)
            return;
        //let {typeName} = entity;
        //let type = typeMap[typeName] || typeName;
        var sName = entity.sName;
        sName = (0, tool_1.capitalCase)(sName);
        var ts = '';
        for (var _i = 0, returns_2 = returns; _i < returns_2.length; _i++) {
            var ret = returns_2[_i];
            var retName = (0, tool_1.capitalCase)(ret.name);
            ts += "export interface Return".concat(sName).concat(retName, " {");
            ts += this.buildFields(ret.fields);
            ts += '\n}\n';
        }
        ts += "export interface Result".concat(sName, " {\n");
        for (var _a = 0, returns_3 = returns; _a < returns_3.length; _a++) {
            var ret = returns_3[_a];
            var retName = (0, tool_1.capitalCase)(ret.name);
            ts += "\t".concat(ret.name, ": Return").concat(sName).concat(retName, "[];\n");
        }
        ts += '}';
        return ts;
    };
    TsUQ.prototype.buildActsInterface = function (uq) {
        var ts = "\nexport interface ParamActs {";
        uq.idArr.forEach(function (v) {
            var sName = v.sName;
            ts += "\n\t".concat((0, tool_1.camelCase)(sName), "?: ").concat((0, tool_1.capitalCase)(sName), "[];");
        });
        uq.idxArr.forEach(function (v) {
            var sName = v.sName;
            ts += "\n\t".concat((0, tool_1.camelCase)(sName), "?: ActParam").concat((0, tool_1.capitalCase)(sName), "[];");
        });
        uq.ixArr.forEach(function (v) {
            var sName = v.sName;
            ts += "\n\t".concat((0, tool_1.camelCase)(sName), "?: ").concat((0, tool_1.capitalCase)(sName), "[];");
        });
        ts += '\n}\n';
        return ts;
    };
    return TsUQ;
}());
exports.TsUQ = TsUQ;
//# sourceMappingURL=TsUQ.js.map