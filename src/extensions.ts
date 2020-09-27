interface String {
  left: (pad: number, formatted?: boolean) => string;

  right: (pad: number, formatted?: boolean) => string;
}

String.prototype.left = _left;
String.prototype.right = _right;

interface Number {
  left: (pad: number, formatted?: boolean) => string;

  right: (pad: number, formatted?: boolean) => string;

  format: () => string;
}

Number.prototype.left = _left;
Number.prototype.right = _right;
Number.prototype.format = _format;

function _left(this: String | Number, pad: number, formatted: boolean = true): string {
  const value = (this as Number).format ? (this as Number).format() : this;
  return formatted ? `\`${value.toString().padEnd(pad).substring(0, pad)}\`` : value.toString().padEnd(pad).substring(0, pad);
}

function _right(this: String | Number, pad: number, formatted: boolean = true): string {
  const value = (this as Number).format ? (this as Number).format() : this;
  return formatted ? `\`${value.toString().padStart(pad).substring(0, pad)}\`` : value.toString().padStart(pad).substring(0, pad);
}

function _format(this: Number) {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
