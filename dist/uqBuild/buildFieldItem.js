"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFieldItem = void 0;
var tool_1 = require("../tool");
//import { FieldItem, FieldUIType } from "../../tonva-react/ui";
function buildFieldItem(field, isKey) {
    var $FieldItemType, fieldItemType, widget /*FieldUIType*/;
    var name = field.name, type = field.type;
    switch (type) {
        case 'id':
            $FieldItemType = 'FieldItemId';
            fieldItemType = 'id';
            break;
        case 'char':
            $FieldItemType = 'FieldItemString';
            fieldItemType = 'string';
            widget = 'string';
            break;
        case 'smallint':
        case 'int':
        case 'bigint':
            $FieldItemType = 'FieldItemInt';
            fieldItemType = 'integer';
            widget = 'updown';
            break;
        case 'dec':
        case 'float':
        case 'double':
            $FieldItemType = 'FieldItemNumber';
            fieldItemType = 'number';
            widget = 'number';
            break;
    }
    return {
        name: name,
        type: fieldItemType,
        isKey: isKey,
        widget: widget,
        label: (0, tool_1.capitalCase)(name),
        $FieldItemType: $FieldItemType,
    } /*as FieldItem*/;
}
exports.buildFieldItem = buildFieldItem;
//# sourceMappingURL=buildFieldItem.js.map