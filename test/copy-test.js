var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.copy() returns a copy of this binarytree", function(test) {
  var q0 = d3_binarytree.binarytree().addAll([[0], [1]]);
  test.deepEqual(q0.copy(), q0);
  test.end();
});

tape("binarytree.copy() isolates changes to the extent", function(test) {
  var q0 = d3_binarytree.binarytree().extent([[0], [1]]),
      q1 = q0.copy();
  q0.add([2]);
  test.deepEqual(q1.extent(), [[0], [2]]);
  q1.add([-1]);
  test.deepEqual(q0.extent(), [[0], [4]]);
  test.end();
});

tape("binarytree.copy() isolates changes to the root when a leaf", function(test) {
  var q0 = d3_binarytree.binarytree().extent([[0], [1]]),
      q1 = q0.copy(),
      p0 = [2];
  q0.add(p0);
  test.equal(q1.root(), undefined);
  q1 = q0.copy();
  test.deepEqual(q0.root(), {data: [2]});
  test.deepEqual(q1.root(), {data: [2]});
  test.equal(q0.remove(p0), q0);
  test.equal(q0.root(), undefined);
  test.deepEqual(q1.root(), {data: [2]});
  test.end();
});

tape("binarytree.copy() isolates changes to the root when not a leaf", function(test) {
  var p0 = [1],
      p1 = [2],
      p2 = [3],
      q0 = d3_binarytree.binarytree().extent([[0], [4]]).addAll([p0, p1]),
      q1 = q0.copy();
  q0.add(p2);
  test.deepEqual(q0.extent(), [[0], [8]]);
  test.deepEqual(q0.root(), [[{data: [1]}, [{data: [2]}, {data: [3]}]], ]);
  test.deepEqual(q1.extent(), [[0], [8]]);
  test.deepEqual(q1.root(), [[{data: [1]}, {data: [2]}], ]);
  q1 = q0.copy();
  q0.remove(p2);
  test.deepEqual(q1.extent(), [[0], [8]]);
  test.deepEqual(q1.root(), [[{data: [1]}, [{data: [2]}, {data: [3]}]], ]);
  test.end();
});
