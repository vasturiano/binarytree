var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.visit(callback) visits each node in a binarytree", function(test) {
  var results = [], q = d3_binarytree.binarytree()
      .addAll([[0], [1]]);
  test.equal(q.visit(function(node, x0, x1) { results.push([x0, x1]); }), q);
  test.deepEqual(results, [
    [0, 2],
    [0, 1],
    [1, 2]
  ]);
  test.end();
});

tape("binarytree.visit(callback) applies pre-order traversal", function(test) {
  var results = [], q = d3_binarytree.binarytree()
      .extent([[0], [960]])
      .addAll([[100], [200], [300]]);
  test.equal(q.visit(function(node, x0, x1) { results.push([x0, x1]); }), q);
  test.deepEqual(results, [
    [  0, 1024],
    [  0,  512],
    [  0,  256],
    [  0,  128],
    [128,  256],
    [256,  512]
  ]);
  test.end();
});

tape("binarytree.visit(callback) does not recurse if the callback returns truthy", function(test) {
  var results = [], q = d3_binarytree.binarytree()
      .extent([[0], [960]])
      .addAll([[100], [700], [800]]);
  test.equal(q.visit(function(node, x0, x1) { results.push([x0, x1]); return x0 > 0; }), q);
  test.deepEqual(results, [
    [  0, 1024],
    [  0,  512],
    [512, 1024]
  ]);
  test.end();
});

tape("binarytree.visit(callback) on an empty binarytree with no bounds does nothing", function(test) {
  var results = [], q = d3_binarytree.binarytree();
  test.equal(q.visit(function(node, x0, x1) { results.push([x0, x1]); }), q);
  test.equal(results.length, 0);
  test.end();
});

tape("binarytree.visit(callback) on an empty binarytree with bounds does nothing", function(test) {
  var results = [], q = d3_binarytree.binarytree()
      .extent([[0], [960]]);
  test.equal(q.visit(function(node, x0, x1) { results.push([x0, x1]); }), q);
  test.deepEqual(results.length, 0);
  test.end();
});
