export function construct(constructor, args) {
    var c: any = function() {
        return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
}
