var assert = require('assert');
var HashRouter = require('..');

describe('HashRouter()', function () {
  it('should work with multiple urls', function () {
    var router = HashRouter();
    router.set('/foo', function foo() {
      return 'foo';
    });

    router.set('/bar', function bar() {
      return 'bar';
    });

    assert.equal(router('/foo'), 'foo');
    assert.equal(router('/bar'), 'bar');
  });

  it('should pass in opts', function () {
    var router = HashRouter();
    router.set('/foo/:bar', function foo(opts) {
      assert.deepEqual(opts, {
        params: { bar: 'buzz' },
        splat: null
      });
    });

    router('/foo/buzz');
  });

  it('should work with any number of arguments', function () {
    var router = HashRouter();
    router.set('/foo/:bar', function foo(req, res, opts) {
      assert.equal(req, 'req');
      assert.equal(res, 'res');
      assert.deepEqual(opts, {
        params: { bar: 'buzz' },
        splat: null
      });
    });

    router('/foo/buzz', 'req', 'res');

    router.set('/beep/:fuzz', function foo(ctx, opts) {
      assert.equal(ctx, 'ctx');
      assert.deepEqual(opts, {
        params: { fuzz: 'buzz' },
        splat: null
      });
    });

    router('/beep/buzz', 'ctx');
  });

  it('should throw 404', function () {
    var router = HashRouter();
    router.set('/foo/:bar', function foo() {});

    try {
      router('/beep/:buzz');
    } catch (err) {
      assert.equal(err.status, 404);
    }
  });
});