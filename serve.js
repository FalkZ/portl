export const val = (a) => a + "test worked";

var enc = new TextEncoder();

export const sub = async function*() {
  var array = [1, 3424, 3];

  while (array.length) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve(array.shift()), 1000)
    );
  }
};
