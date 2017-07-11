
// tslint:disable-next-line:interface-name
interface Array<T> {
    // tslint:disable-next-line:array-type
    fill(value: T): Array<T>;
}

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    // tslint:disable-next-line:object-literal-shorthand
    value: function(value: any): any {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      const O = Object(this);

      // Steps 3-5.
      // tslint:disable-next-line:no-bitwise
      const len = O.length >>> 0;

      // Steps 6-7.
      const start = arguments[1];
      // tslint:disable-next-line:no-bitwise
      const relativeStart = start >> 0;

      // Step 8.
      let k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      const end = arguments[2];
      const relativeEnd = end === undefined ?
        // tslint:disable-next-line:no-bitwise
        len : end >> 0;

      // Step 11.
      const final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    },
  });
}
