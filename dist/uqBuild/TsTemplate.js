"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsTemplate = void 0;
var TsTemplate = /** @class */ (function () {
    function TsTemplate(buildContext) {
        this.buildContext = buildContext;
        this.tsHeader = "//=== UqApp builder created on " + new Date() + " ===//";
    }
    Object.defineProperty(TsTemplate.prototype, "tsApp", {
        get: function () {
            return this.tsHeader + "\nimport { NavView, start, nav } from 'tonwa-" + this.buildContext.uiPlatform + "';\nimport { CApp } from './CApp';\nimport { appConfig } from './appConfig';\n\nexport const App: React.FC = () => {\n    nav.setSettings(appConfig);\n    const onLogined = async (isUserLogin?:boolean) => {\n        await start(CApp, appConfig, isUserLogin);\n    }\n    return <NavView onLogined={onLogined} />;\n}\n\n";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TsTemplate.prototype, "tsCApp", {
        get: function () {
            return this.tsHeader + "\nimport { CUqApp } from \"./CBase\";\nimport { res } from \"./res\";\nimport { VMain } from \"./VMain\";\nimport { setUI } from \"./uqs\";\n\nconst gaps = [10, 3,3,3,3,3,5,5,5,5,5,5,5,5,10,10,10,10,15,15,15,30,30,60];\n\nexport class CApp extends CUqApp {\n    protected async internalStart(isUserLogin: boolean) {\n        this.setRes(res);\n        setUI(this.uqs);\n        \n        this.openVPage(VMain, undefined, this.dispose);\n    }\n\n    private timer:any;\n    protected onDispose() {\n        clearInterval(this.timer);\n        this.timer = undefined;\n    }\n\n    private tick = 0;\n    private gapIndex = 0;\n    private callTick = async () => {\n        try {\n            if (!this.user) return;\n            ++this.tick;\n            if (this.tick<gaps[this.gapIndex]) return;\n            this.tick = 0;\n            if (this.gapIndex < gaps.length - 1) ++this.gapIndex;\n            let ret = await this.uqs.BzHelloTonwa.$poked.query(undefined, false);\n            let v = ret.ret[0];\n            if (v === undefined) return;\n            if (!v.poke) return;\n            this.gapIndex = 1;\n\n            // \u6570\u636E\u670D\u52A1\u5668\u63D0\u9192\u5BA2\u6237\u7AEF\u5237\u65B0\uFF0C\u4E0B\u9762\u4EE3\u7801\u91CD\u65B0\u8C03\u5165\u7684\u6570\u636E\n            //this.cHome.refresh();\n        }\n        catch {\n        }\n    }\n}\n";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TsTemplate.prototype, "tsCBase", {
        get: function () {
            return this.tsHeader + "\nimport { CSub, CBase, CAppBase, IConstructor } from 'tonwa-" + this.buildContext.uiPlatform + "';\nimport { UQs } from './uqs';\nimport { CApp } from './CApp';\n\nexport abstract class CUqBase extends CBase<CApp, UQs> {\n    protected async internalStart(param?:any, ...params:any[]):Promise<void> {}\n}\n\nexport abstract class CUqSub<A extends CAppBase<U>, U, T extends CBase<A,U>> extends CSub<A, U, T> {\n}\n\nexport abstract class CUqApp extends CAppBase<UQs> {\n    protected newC<T extends CUqBase>(type: IConstructor<T>, ...param:any[]): T {\n        let c = new type(this);\n        c.internalInit(...param);\n        return c;\n    }\n}\n";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TsTemplate.prototype, "tsIndex", {
        get: function () {
            return this.tsHeader + "\nexport { CUqApp, CUqBase, CUqSub } from './CBase';\nexport { CApp } from './CApp';\nexport * from './uqs';\nexport * from './App';\nexport * from './startApp';\n";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TsTemplate.prototype, "tsVMain", {
        get: function () {
            return this.tsHeader + "\nimport { VPage, Page } from 'tonwa-" + this.buildContext.uiPlatform + "';\nimport { CApp } from './CApp';\n\nexport class VMain extends VPage<CApp> {\n    header() { return 'TEST'; }\n    content() {\n        return <div className=\"m-3\">\n            <div>{this.renderMe()}</div>\n            <div className=\"mb-5\">\u540C\u82B1\u6837\u4F8B\u4E3B\u9875\u9762</div>\n        </div>;\n    }\n}\n";
        },
        enumerable: false,
        configurable: true
    });
    return TsTemplate;
}());
exports.TsTemplate = TsTemplate;
//# sourceMappingURL=TsTemplate.js.map