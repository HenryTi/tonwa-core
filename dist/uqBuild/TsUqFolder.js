"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsUqFolder = void 0;
var fs_1 = __importDefault(require("fs"));
var tool_1 = require("../tool");
var TsUQ_1 = require("./TsUQ");
var buildFieldItem_1 = require("./buildFieldItem");
var tools_1 = require("./tools");
;
;
var fieldItemReplaceProps = ['label', 'placeholder', 'widget', 'type'];
var TsUqFolder = /** @class */ (function () {
    function TsUqFolder(buildContext, uq, uqsFolder, uqAlias) {
        this.buildContext = buildContext;
        this.uq = uq;
        this.uqsFolder = uqsFolder;
        this.uqAlias = uqAlias;
    }
    TsUqFolder.prototype.build = function () {
        var uqFolder = this.uqsFolder + '/' + this.uqAlias;
        if (fs_1.default.existsSync(uqFolder) === false) {
            fs_1.default.mkdirSync(uqFolder);
        }
        var tsUq = this.buildContext.tsTemplate.tsHeader;
        var tsUqBuilder = new TsUQ_1.TsUQ(this.buildContext, this.uq, this.uqAlias);
        //tsUq += buildUQ(this.uq, this.uqAlias);
        tsUq += tsUqBuilder.build();
        (0, tools_1.overrideTsFile)(uqFolder + "/" + this.uqAlias + ".ts", tsUq);
        this.saveTuidAndIDTsIndexAndRender(uqFolder);
    };
    TsUqFolder.prototype.saveTuidAndIDTsIndexAndRender = function (uqFolder) {
        var imports = '', sets = '';
        var _a = this.uq, idArr = _a.idArr, idxArr = _a.idxArr, ixArr = _a.ixArr, tuidArr = _a.tuidArr;
        var coll = {};
        for (var _i = 0, tuidArr_1 = tuidArr; _i < tuidArr_1.length; _i++) {
            var i = tuidArr_1[_i];
            var sName = i.sName;
            coll[sName.toLowerCase()] = i;
            var cName = (0, tool_1.capitalCase)(sName);
            if (cName[0] === '$')
                continue;
            imports += "\nimport * as " + cName + " from './" + cName + ".ui';";
            sets += "\n\tassign(uq, '" + cName + "', " + cName + ");";
            var tsUI = "/* eslint-disable */\n\t// eslint-disable-next-line @typescript-eslint/no-unused-vars\n\timport { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-" + this.buildContext.uiPlatform + "';\n\t// eslint-disable-next-line @typescript-eslint/no-unused-vars\n\timport { Res, uqStringify, setRes } from \"tonwa-core\";\n\timport { Tuid" + cName + " } from \"./" + this.uqAlias + "\";\n\t\n\tconst resRaw: Res<any> = {\n\t\t$zh: {\n\t\t},\n\t\t$en: {\n\t\t}\n\t};\n\tconst res: any = {};\n\tsetRes(res, resRaw);\n\t\n\texport const t:TFunc = (str:string|" + this.buildContext.element + "): string|" + this.buildContext.element + " => {\n\t\treturn res[str as string] ?? str;\n\t}\n\t\n\texport function render(item: Tuid" + cName + "):" + this.buildContext.element + " {\n\t\treturn <>{uqStringify(item)}</>;\n\t};\n\t";
            var path = uqFolder + "/" + cName + ".ui.tsx";
            (0, tools_1.saveTsFileIfNotExists)(path, tsUI);
        }
        for (var _b = 0, _c = __spreadArray(__spreadArray(__spreadArray([], idArr, true), idxArr, true), ixArr, true); _b < _c.length; _b++) {
            var i = _c[_b];
            var sName = i.sName;
            //coll[sName.toLowerCase()] = i;
            var cName = (0, tool_1.capitalCase)(sName);
            if (cName[0] === '$')
                continue;
            coll[cName.toLocaleLowerCase()] = i;
            imports += "\nimport * as " + cName + " from './" + cName + ".ui';";
            sets += "\n\tassign(uq, '" + cName + "', " + cName + ");";
            var tsUI = "// eslint-disable-next-line @typescript-eslint/no-unused-vars\n\timport { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-" + this.buildContext.uiPlatform + "';\n\t// eslint-disable-next-line @typescript-eslint/no-unused-vars\n\timport { Res, uqStringify, setRes } from \"tonwa-core\";\n\timport { " + cName + " } from \"./" + this.uqAlias + "\";\n\t\n\t/*--fields--*/\n\tconst fields = {\n\t};\n\t/*==fields==*/\n\t\n\tconst fieldArr: FieldItem[] = [\n\t];\n\t\n\texport const ui: UI = {\n\t\tlabel: \"" + cName + "\",\n\t\tfieldArr,\n\t\tfields,\n\t};\n\t\n\tconst resRaw: Res<any> = {\n\t\t$zh: {\n\t\t},\n\t\t$en: {\n\t\t}\n\t};\n\tconst res: any = {};\n\tsetRes(res, resRaw);\n\t\n\texport const t:TFunc = (str:string|" + this.buildContext.element + "): string|" + this.buildContext.element + " => {\n\t\treturn res[str as string] ?? str;\n\t}\n\t\n\texport function render(item: " + cName + "):" + this.buildContext.element + " {\n\t\treturn <>{uqStringify(item)}</>;\n\t};\n\t";
            var path = uqFolder + "/" + cName + ".ui.tsx";
            (0, tools_1.saveTsFileIfNotExists)(path, tsUI);
            var fields = this.buildFields(i);
            var tsFieldArr = this.buildFieldArr(i);
            this.replaceTsFileFields(path, fields);
            var tsImportFieldItemsBegin = 'import { FieldItem, ';
            var tsImportFieldItemsEnd = " } from \"tonwa-" + this.buildContext.uiPlatform + "\";";
            var tsImportFieldItems = 'FieldItemInt, FieldItemNumber, FieldItemString, FieldItemId';
            this.replaceTsFileString(path, {
                begin: tsImportFieldItemsBegin,
                end: tsImportFieldItemsEnd,
                content: tsImportFieldItemsBegin + tsImportFieldItems + tsImportFieldItemsEnd,
            });
            this.replaceTsFileString(path, { begin: '\nconst fieldArr: FieldItem[] = [\n', end: '\n];\n', content: tsFieldArr });
        }
        var tsIndex = "import { UqExt as Uq, assign } from './" + this.uqAlias + "';" + imports + "\n\t\t\n\texport function setUI(uq: Uq) {" + sets + "\n\t}\n\texport * from './" + this.uqAlias + "';\n\t";
        (0, tools_1.overrideTsFile)(uqFolder + "/index.ts", tsIndex);
        var files = fs_1.default.readdirSync(uqFolder);
        var suffix = '.ui.tsx';
        for (var _d = 0, files_1 = files; _d < files_1.length; _d++) {
            var file = files_1[_d];
            if (file.endsWith(suffix) === false)
                continue;
            var from = file.length - suffix.length;
            var fileEntityName = file.substring(0, from);
            var entity = coll[fileEntityName.toLocaleLowerCase()];
            if (entity === undefined || fileEntityName[0] === '$') {
                var unFile = uqFolder + "/" + file;
                fs_1.default.unlinkSync(unFile);
            }
        }
    };
    TsUqFolder.prototype.buildFields = function (i) {
        switch (i.typeName) {
            case 'id': return this.buildIDFields(i);
            case 'idx': return this.buildIDXFields(i);
            case 'ix': return this.buildIXFields(i);
        }
    };
    ;
    TsUqFolder.prototype.buildIDFields = function (ID) {
        var _a;
        var ret = {};
        var schema = ID.schema;
        var keys = schema.keys, fields = schema.fields;
        var _loop_1 = function (f) {
            var name_1 = f.name;
            var isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(function (v) { return v.name === name_1; })) >= 0;
            ret[name_1] = (0, buildFieldItem_1.buildFieldItem)(f, isKey);
        };
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var f = fields_1[_i];
            _loop_1(f);
        }
        return ret;
    };
    TsUqFolder.prototype.buildIDXFields = function (IDX) {
        var _a;
        var ret = {};
        var schema = IDX.schema;
        var keys = schema.keys, fields = schema.fields;
        var _loop_2 = function (f) {
            var name_2 = f.name;
            var isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(function (v) { return v.name === name_2; })) >= 0;
            ret[name_2] = (0, buildFieldItem_1.buildFieldItem)(f, isKey);
        };
        for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
            var f = fields_2[_i];
            _loop_2(f);
        }
        return ret;
    };
    ;
    TsUqFolder.prototype.buildIXFields = function (IX) {
        var _a;
        var ret = {};
        var schema = IX.schema;
        var keys = schema.keys, fields = schema.fields;
        var _loop_3 = function (f) {
            var name_3 = f.name;
            var isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(function (v) { return v.name === name_3; })) >= 0;
            ret[name_3] = (0, buildFieldItem_1.buildFieldItem)(f, isKey);
        };
        for (var _i = 0, fields_3 = fields; _i < fields_3.length; _i++) {
            var f = fields_3[_i];
            _loop_3(f);
        }
        return ret;
    };
    ;
    TsUqFolder.prototype.buildFieldArr = function (i) {
        var ts = '\nconst fieldArr: FieldItem[] = [\n\t';
        switch (i.typeName) {
            case 'id':
                ts += this.buildIDFieldArr(i);
                break;
            case 'idx':
                ts += this.buildIDXFieldArr(i);
                break;
            case 'ix':
                ts += this.buildIXFieldArr(i);
                break;
        }
        return ts += '\n];\n';
    };
    TsUqFolder.prototype.buildIDFieldArr = function (i) {
        var schema = i.schema;
        var ts = '';
        for (var _i = 0, _a = schema.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            var name_4 = f.name;
            if (name_4 === 'id')
                continue;
            ts += "fields." + name_4 + ", ";
        }
        return ts;
    };
    TsUqFolder.prototype.buildIDXFieldArr = function (i) {
        var schema = i.schema;
        var ts = '';
        for (var _i = 0, _a = schema.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            var name_5 = f.name;
            if (name_5 === 'id')
                continue;
            ts += "fields." + name_5 + ", ";
        }
        return ts;
    };
    TsUqFolder.prototype.buildIXFieldArr = function (i) {
        var schema = i.schema;
        var ts = '';
        for (var _i = 0, _a = schema.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            var name_6 = f.name;
            if (name_6 === 'ix')
                continue;
            if (name_6 === 'id')
                continue;
            ts += "fields." + name_6 + ", ";
        }
        return ts;
    };
    TsUqFolder.prototype.replaceTsFileFields = function (path, fields) {
        var text = fs_1.default.readFileSync(path).toString();
        var startStr = '\n/*--fields--*/';
        var endStr = '\n/*==fields==*/\n';
        var start = text.indexOf(startStr);
        if (start > 0) {
            var end = text.indexOf(endStr, start + startStr.length);
            if (end > 0) {
                var lBrace = text.indexOf('{', start + startStr.length);
                var rBrace = text.lastIndexOf('}', end);
                var oldText = text.substring(lBrace, rBrace + 1);
                var fieldsText = this.buildFieldsFromOldText(fields, oldText);
                text = text.substring(0, start)
                    + startStr + '\nconst fields = {'
                    + fieldsText
                    + '\n};'
                    + text.substring(end);
                fs_1.default.writeFileSync(path, text);
            }
        }
    };
    TsUqFolder.prototype.buildFieldsFromOldText = function (fields, oldText) {
        var ret = '';
        for (var i in fields) {
            var field = fields[i];
            this.setFieldOldProp(field, oldText);
            ret += this.buildFieldText(field);
        }
        return ret;
    };
    TsUqFolder.prototype.setFieldOldProp = function (field, text) {
        var fieldStart = field.name + ':';
        var start = text.indexOf('\t' + fieldStart);
        if (start < 0)
            start = text.indexOf('\n' + fieldStart);
        if (start < 0)
            start = text.indexOf(' ' + fieldStart);
        if (start < 0)
            return;
        ++start;
        var end = text.indexOf('}', start + fieldStart.length);
        if (end < 0)
            return;
        var fieldText = text.substring(start + fieldStart.length, end + 1);
        /* eslint no-eval: 0 */
        var obj = eval('(' + fieldText + ')');
        fieldItemReplaceProps.forEach(function (v) {
            var prop = obj[v];
            if (!prop)
                return;
            if (v === 'type')
                return; // 这个是由新的schema决定的
            field[v] = prop;
        });
    };
    TsUqFolder.prototype.buildFieldText = function (field) {
        var $FieldItemType = field.$FieldItemType;
        delete field.$FieldItemType;
        var ret = '\n\t' + field.name + ': ';
        var json = JSON.stringify(field, null, '\t\t');
        json = json.replace('}', '\t}');
        ret += json;
        return ret + ' as ' + $FieldItemType + ',';
    };
    TsUqFolder.prototype.replaceTsFileString = function (path, sec) {
        var text = fs_1.default.readFileSync(path).toString();
        var begin = sec.begin, end = sec.end, content = sec.content;
        var b = text.indexOf(begin);
        if (b < 0)
            return;
        var e = text.indexOf(end, b + begin.length - 1);
        if (e < 0)
            return;
        text = text.substring(0, b) + content + text.substr(e + end.length);
        fs_1.default.writeFileSync(path, text);
    };
    return TsUqFolder;
}());
exports.TsUqFolder = TsUqFolder;
//# sourceMappingURL=TsUqFolder.js.map