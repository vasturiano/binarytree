var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.addAll(data) creates new points and adds them to the binarytree", function(test) {
  var q = d3_binarytree.binarytree();
  test.deepEqual(q.add([0.0]).root(), {data: [0]});
  test.deepEqual(q.add([0.9]).root(), [{data: [0]}, {data: [0.9]}]);
  test.deepEqual(q.add([0.4]).root(), [[{data: [0]}, {data: [0.4]}], {data: [0.9]}]);
  test.end();
});

tape("binarytree.addAll(data) ignores points with NaN coordinates", function(test) {
  var q = d3_binarytree.binarytree();
  test.deepEqual(q.addAll([[NaN]]).root(), undefined);
  test.equal(q.extent(), undefined);
  test.deepEqual(q.addAll([[0], [0.9]]).root(), [{data: [0]}, {data: [0.9]}]);
  test.deepEqual(q.addAll([[NaN]]).root(), [{data: [0]}, {data: [0.9]}]);
  test.deepEqual(q.extent(), [[0], [1]]);
  test.end();
});

tape("binarytree.addAll(data) correctly handles the empty array", function(test) {
  var q = d3_binarytree.binarytree();
  test.deepEqual(q.addAll([]).root(), undefined);
  test.equal(q.extent(), undefined);
  test.deepEqual(q.addAll([[0], [1]]).root(), [{data: [0]}, {data: [1]}]);
  test.deepEqual(q.addAll([]).root(), [{data: [0]}, {data: [1]}]);
  test.deepEqual(q.extent(), [[0], [2]]);
  test.end();
});

tape("binarytree.addAll(data) computes the extent of the data before adding", function(test) {
  var q = d3_binarytree.binarytree().addAll([[0.4], [0], [0.9]]);
  test.deepEqual(q.root(), [[{data: [0]}, {data: [0.4]}], {data: [0.9]}]);
  test.end();
});
