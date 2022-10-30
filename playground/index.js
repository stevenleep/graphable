!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = "undefined" != typeof globalThis ? globalThis : e || self).RuleEngine = {}));
})(this, function (e) {
  "use strict";
  let t;
  function i() {
    return Math.random().toString(36).slice(2);
  }
  !(function (e) {
    (e.ANY = "ANY"), (e.ALL = "ALL"), (e.NONE = "NONE");
  })(t || (t = {}));
  class n {
    id = "";
    field = "";
    operator = "";
    value = "";
    fields = new Map();
    conditionsMap = new Map();
    children = [];
    context = {};
    constructor(e, t, i = {}) {
      (this.engine = e), (this.rule = t), this.init(i);
    }
    init(e) {
      (this.id = i()),
        (this.field = e.field || ""),
        (this.operator = e.operator || ""),
        (this.value = e.value || ""),
        (this.context = e.context || {});
    }
    addCondition(e = {}) {
      const t = new n(this.engine, this.rule, e);
      return (
        this.conditionsMap.set(t.id, t),
        this.children.push(t),
        this.fields.set(t.field, (this.fields.get(t.field) || 0) + 1),
        t
      );
    }
    removeCondition(e) {
      this.conditionsMap.delete(e),
        (this.children = this.children.filter((t) => t.id !== e)),
        this.fields.set(e, (this.fields.get(e) || 0) - 1),
        0 === this.fields.get(e) && this.fields.delete(e);
    }
    getConditions() {
      return this.children;
    }
    getCondition(e) {
      return this.conditionsMap.get(e);
    }
    getConditionsByField(e) {
      return this.children.filter((t) => t.field === e);
    }
    getConditionsByOperator(e) {
      return this.children.filter((t) => t.operator === e);
    }
    getMetaWithConditions() {
      return { ...this.getMeta(), conditions: this.children.map((e) => e.getMeta()) };
    }
    fieldExists(e) {
      return this.fields.has(e);
    }
    getFieldsObject() {
      return Object.fromEntries(this.fields);
    }
    getMeta() {
      return {
        id: this.id,
        field: this.field,
        operator: this.operator,
        value: this.value,
        context: this.context,
      };
    }
    fromJSON(e = {}) {
      this.addCondition(e);
    }
  }
  class s {
    id = "";
    field = "";
    operator = "";
    payload = "";
    context = {};
    dependencies = [];
    reverseDependencies = [];
    actionMaps = new Map();
    children = [];
    constructor(e, t, i = {}) {
      (this.engine = e), (this.rule = t), this.init(i);
    }
    init(e) {
      (this.id = i()),
        (this.field = e.field || ""),
        (this.operator = e.operator || ""),
        (this.payload = e.payload || ""),
        (this.context = e.context || {}),
        (this.dependencies = e.dependencies || []),
        (this.reverseDependencies = e.reverseDependencies || []);
    }
    addActions(e) {
      return e.map((e) => this.addAction(e));
    }
    addAction(e) {
      const t = new s(this.engine, this.rule, e);
      return this.actionMaps.set(t.id, t), this.children.push(t), t;
    }
    removeAction(e) {
      this.actionMaps.delete(e), (this.children = this.children.filter((t) => t.id !== e));
    }
    updateAction(e, t) {
      const i = this.actionMaps.get(e);
      i && Object.assign(i, t);
    }
    fromJSON(e) {
      this.addActions(Array.isArray(e) ? e : [e]);
    }
    getMeta() {
      return {
        id: this.id,
        field: this.field,
        operator: this.operator,
        payload: this.payload,
        context: this.context,
        dependencies: this.dependencies,
        reverseDependencies: this.reverseDependencies,
      };
    }
    getMetaWithActions() {
      return { action: this.getMeta(), actions: this.children.map((e) => e.getMeta()) };
    }
  }
  const r = new Map();
  class o {
    condition = null;
    action = null;
    id = "";
    children = [];
    rulesMap = new Map();
    conditionOperator = t.NONE;
    constructor(e, t = {}) {
      (this.engine = e), (this.options = t), this.prepare(), this.init();
    }
    prepare() {
      (this.condition = new n(this.engine, this)), (this.action = new s(this.engine, this));
    }
    init() {
      (this.conditionOperator = this.options.operator || t.NONE), (this.id = i());
    }
    addNewRule(e = { operator: t.ANY }) {
      const i = new o(this.engine, e);
      return this.children.push(i), this.rulesMap.set(i.id, i), r.set(i.id, i), i;
    }
    removeRule(e) {
      const t = "string" == typeof e ? e : e.id;
      (this.children = this.children.filter((e) => e.id !== t)),
        this.rulesMap.delete(t),
        r.delete(t);
    }
    getRule(e) {
      return r.get(e);
    }
    getAllRules() {
      return r;
    }
    getAllRulesArray() {
      return Array.from(r.values());
    }
    getAllRulesWithMeta() {
      return this.getAllRulesArray().map((e) => ({
        rule: e.getMeta(),
        rules: e.children.map((e) => e.getMeta()),
      }));
    }
    getRulesWithMeta() {
      return this.children.map((e) => e.getMeta());
    }
    getMeta() {
      return {
        id: this.id,
        operator: this.conditionOperator,
        condition: this.condition?.getMetaWithConditions().conditions,
        conditionFields: this.condition?.getFieldsObject(),
        action: this.action?.getMetaWithActions().actions,
        children:
          Array.isArray(this.children) && this.children.length > 0
            ? this.getRulesWithMeta.bind(this)()
            : [],
      };
    }
    fromJSON() {
      this.addNewRule({ operator: t.ANY }), this.condition?.fromJSON({});
    }
  }
  class d {
    rule = new o(this, { operator: t.NONE });
  }
  (e.Engine = d), (e.default = d), Object.defineProperty(e, "__esModule", { value: !0 });
});
