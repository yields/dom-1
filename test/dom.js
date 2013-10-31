
var assert = require('assert')
  , domify = require('domify')
  , dom = require('dom')

describe('dom()', function(){
  describe('with a selector', function(){
    it('should return a list', function(){
      var list = dom('<ul><li id="one">foo</li><li id="two">bar</li></ul>');
      list = dom('#two', list);
      assert(1 == list.length(), 'expected length of 1');
      assert('bar' == list.get(0).textContent);
      assert('Hello' == dom('.foo').text())
    })
  })

  describe('with html', function(){
    it('should return a list', function(){
      var list = dom('<em>Hello</em>');
      assert('Hello' == list.get(0).textContent);
    })
  })

  describe('with dirty html', function(){
    it('should remove whitespace from the left', function(){
      var list = dom(' \
            <em>Hello</em>');
      assert('Hello' == list.get(0).textContent);
    })

    it('should not clean the right', function(){
      var list = dom('  <em>Hello  ');
      assert('Hello  ' == list.get(0).textContent);
    })
  })

  describe('with a List', function(){
    it('should return the same list', function(){
      var list = dom('<p>Hello</p>');
      assert(list == dom(list));
    })
  })

  describe('with a dom node', function(){
    it('should return a list', function(){
      var p = document.createElement('p');
      var list = dom(p);
      assert(p == list.get(0));
    })
  })
})

describe('.val()', function(){
  it('should be an alias of .value()', function(){
    var list = dom('<input>');
    assert(list.val == list.value);
  })
})

describe('.value()', function(){
  it('should get values', function(){
    var list = dom('<input type="text" value="tobi">');
    assert('tobi' == list.value());
  })
})

describe('.value(obj)', function(){
  it('should set values', function(){
    var list = dom('<input type="text">');
    assert('' == list.value());
    list.value('hello');
    assert('hello' == list.value());
  })
})

describe('.prepend()', function(){
  it('should return the new list', function(){
    var list = dom('<div></div>');
    assert(list != list.prepend('<p></p>'));
  })

  it('should prepend the element(s)', function(){
    var list = dom('<div></div>');
    list.prepend('<p>One</p>');
    assert('<p>One</p>' == list.html());

    list.prepend(dom('<p>Two</p>'));
    assert('<p>Two</p><p>One</p>' == list.html());

    list.prepend(dom('<p>Three</p>'));
    assert('<p>Three</p><p>Two</p><p>One</p>' == list.html());
  })
})

describe('.append()', function(){
  it('should return the new list', function(){
    var list = dom('<div></div>');
    assert(list != list.append('<p></p>'));
  })

  it('should append the element(s)', function(){
    var list = dom('<div></div>');
    list.append('<p>One</p>');
    assert('<p>One</p>' == list.html());

    list.append(dom('<p>Two</p>'));
    assert('<p>One</p><p>Two</p>' == list.html());
  })
})

describe('.fragment()', function(){
  it('should return a document fragment', function(){
    var list = dom('<em>a</em><em>b</em>');
    var els = list.fragment();
    assert('a' == dom(els.childNodes[0]).text());
    assert('b' == dom(els.childNodes[1]).text());
  })
})

describe('.after()', function(){
  it('should return itself for chaining', function(){
    var list = dom('<div>');
    assert(list == list.after('<em>'));
  })

  it('should insert the element(s)', function(){
    var list = dom('<div>');
    var a = dom('<em>a');
    list.append(a);
    a.after('<em>b');
    assert('<em>a</em><em>b</em>' == list.html());
  })
})

describe('.before()', function(){
  it('should return itself for chaining', function(){
    var list = dom('<div>');
    assert(list == list.before('<em>'));
  })

  it('should insert the element(s)', function(){
    var list = dom('<div>');
    var b = dom('<em>b');
    list.append(b);
    b.before('<em>a');
    assert('<em>a</em><em>b</em>' == list.html());
  })
})

describe('.insertAfter()', function(){
  it('should return itself for chaining', function(){
    var list = dom('<div></div>');
    assert(list == list.insertAfter('<p></p>'));
  })

  it('should insert the element(s)', function(){
    var container = dom('<div></div>')
      , one = domify('<p>One</p>');
    container.append(one);
    dom('<p>Two</p>').insertAfter(one);

    assert('<p>One</p><p>Two</p>' == container.html());
  })
})

describe('.insertBefore()', function(){
  it('should return itself for chaining', function(){
    var list = dom('<div>');
    assert(list == list.insertBefore('<p>'));
  })

  it('should insert the element(s)', function(){
    var el = dom('<div>');
    var b = dom('<em>b</em>');
    el.append(b);
    dom('<em>a').insertBefore(b);
    assert('<em>a</em><em>b</em>' == el.html());
  })
})

describe('.appendTo()', function(){
  it('should return itself for chaining', function(){
    var list = dom('<p>')
    var parent = document.createElement('div');
    assert(list == list.appendTo(parent))
  })

  it('should append elements to parent', function(){
    var list = dom('<p>');
    var p1 = dom('<div>');
    list.appendTo(p1);
    assert('<p></p>' == p1.html());

    var p2 = document.createElement('div');
    list.appendTo(p2);
    assert('<p></p>' == p2.innerHTML);
  })
})

describe('.length()', function(){
  it('should return the number of elements', function(){
    var list = dom('<em>Hello</em>');
    assert(1 == list.length());
  })
})

describe('.html()', function(){
  it('should return an html string', function(){
    var a = dom('<p>Hello <em>World</em></p>');
    assert('Hello <em>World</em>' == a.html());
  })
})

describe('.html(str)', function(){
  it('should set inner html', function(){
    var a = dom('<p>Hello <em>World</em><p>');
    a.html('<em>whoop</em>');
    assert('<em>whoop</em>' == a.html());
  })
})

describe('.text()', function(){
  it('should return the text content', function(){
    var a = dom('<p>Hello <em>World</em><p>');
    assert('Hello World' == a.text());
  })
})

describe('.text(str)', function(){
  it('should set text content', function(){
    var a = dom('<p>Hello <em>World></em><p>');
    a.text('Hello');
    assert('Hello' == a.text());
  })
})

describe('.clone()', function(){
  it('should clone the list and nodes', function(){
    var a = dom('<p>Hello</p>');
    var b = a.clone();
    assert(a != b);
    assert('Hello' == b.text());
    assert(a.get(0) != b.get(0));
  })
})

describe('.get(i)', function(){
  it('should return the element at i', function(){
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.get(0).textContent);
  })

  it('should return the first element if index is not specified', function(){
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.get().textContent);
  })
})

describe('.at(i)', function(){
  it('should return the element at i as a List', function(){
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.at(0).get(0).textContent);
  })
})

describe('.first()', function(){
  it('should return the first element in the List', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');
    assert('foo' == list.first().text());
  })
})

describe('.last()', function(){
  it('should return the last element in the List', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');
    assert('bar' == list.last().text());
  })
})

describe('.addClass(name)', function(){
  it('should add the given class name', function(){
    var list = dom('<em>Hello</em>');
    list.addClass('foo').addClass('bar');
    assert('foo bar' == list.get(0).className);
  })
})

describe('.removeClass(name)', function(){
  it('should remove the given class name', function(){
    var list = dom('<em>Hello</em>');
    list.addClass('foo').addClass('bar').removeClass('foo');
    assert('bar' == list.get(0).className);
  })

  it('should remove with regexp', function(){
    var list = dom('<em>Hello</em>');
    list.addClass('foo');
    list.addClass('bar');
    list.addClass('baz');
    list.removeClass(/^b/);
    assert('foo' == list.get(0).className);
  })
})

describe('.toggleClass(name, [bool])', function(){
  it('should toggle the given class name', function(){
    var list = dom('<em>Hello</em>');

    list.toggleClass('show');
    assert('show' == list.get(0).className);

    list.toggleClass('show');
    assert('' == list.get(0).className);
  })

  describe('when a bool is given', function(){
    it('should add the class when truthy', function(){
      var list = dom('<em>Hello</em>');

      list.toggleClass('show', 0);
      assert('' == list.get(0).className);

      list.toggleClass('show', 1);
      assert('show' == list.get(0).className);
    })
  })
})

describe('.hasClass(name)', function(){
  it('should return true when the classname is present', function(){
    var list = dom('<em>Hello</em>').addClass('show');
    assert(true === list.hasClass('show'));
  })

  it('should return false when the classname is not present', function(){
    var list = dom('<em>Hello</em>').addClass('show');
    assert(false === list.hasClass('hide'));
  })
})

describe('.find(selector)', function(){
  it('should return descendants matching the selector', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>');
    list = list.find('li');
    assert(2 == list.length());
  })
})

describe('.each(fn)', function(){
  it('should iterate passing (list, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var indexes = [];
    var values = [];
    var ret = list.each(function(el, i){
      indexes.push(i);
      values.push(el);
    });

    assert(ret == list, 'should return self for chaining');
    assert(0 == indexes[0]);
    assert(1 == indexes[1]);
    assert(values[0] instanceof dom.List, 'values should be dom lists');
    assert(list.get(0) == values[0].get(0));
    assert(list.get(1) == values[1].get(0));
  })
})

describe('.forEach(fn)', function(){
  it('should iterate passing (el, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var indexes = [];
    var values = [];
    var ret = list.forEach(function(el, i){
      indexes.push(i);
      values.push(el);
    });

    assert(ret == list, 'should return self for chaining');
    assert(0 == indexes[0]);
    assert(1 == indexes[1]);
    assert(!(values[0] instanceof dom.List), 'values should be elements');
    assert(list.get(0) == values[0]);
    assert(list.get(1) == values[1]);
  })
})

describe('.map(fn)', function(){
  it('should map passing (list, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var ret = list.map(function(el, i){
      return el.text();
    }).join('|');

    assert('foo|bar' == ret);
  })
})

describe('.select(fn)', function(){
  it('should filter passing (list, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var selected = list.select(function(el){
      return el.text() == 'bar';
    });

    assert(1 == selected.length(), 'invalid length');
    assert(selected.get(0) == list.get(1));
  })
})

describe('.filter(fn)', function(){
  it('should alias .select', function(){
    assert(dom.List.prototype.filter == dom.List.prototype.select);
  })
})

describe('.reject(fn)', function(){
  it('should reject passing (list, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var selected = list.reject(function(el){
      return el.text() == 'bar';
    });

    assert(1 == selected.length(), 'invalid length');
    assert(selected.get(0) == list.get(0));
  })
})

describe('.empty()', function(){
  it('should return itself for chaining', function(){
    var list = dom('<div></div>');
    assert(list == list.empty());
  })

  it('should empty the element(s)', function(){
    var list = dom('<div><a href="/meow.html">cute kitty</a></div>');
    assert('' == list.empty().html());
  })
})

describe('.removeAttr(name)', function(){
  it('should remove an attribute', function(){
    var list = dom('<div><a href="/something"></a></div>').find('a');
    list.removeAttr('href');
    assert(null == list.get(0).getAttribute('href'));
  })
})

describe('.attr()', function(){
  describe('with null', function(){
    it('should remove the attribute', function(){
      var list = dom('<div><a href="/something"></a></div>').find('a');
      list.attr('href', null);
      assert(null == list.get(0).getAttribute('href'));
    })
  })

  describe('with a key and value', function(){
    it('should set the attribute', function(){
      var list = dom('<div><a></a><a></a></div>').find('a');
      var ret = list.attr('href', '#');
      assert(ret == list);
      assert('#' == list.get(0).getAttribute('href'));
      assert('#' == list.get(1).getAttribute('href'));
    })
  })

  describe('with a key', function(){
    it('should return the attribute', function(){
      var list = dom('<div id="logo"></div>');
      assert('logo' == list.attr('id'));
    })
  })
})

describe('.prop()', function(){
  describe('with a key and value', function(){
    it('should set the property', function(){
      var list = dom('<div><a href="#"></a><a href="#"></a></div>').find('a');
      var ret = list.prop('hash', '#foo');
      assert(ret == list);
      assert('#foo' == list.get(0).hash);
      assert('#foo' == list.get(1).hash);
    })
  })

  describe('with a key', function(){
    it('should return the property', function(){
      var list = dom('<a href="#foo">');
      assert('#foo' == list.prop('hash'));
    })
  })
})

describe('.css()', function(){
  describe('with a key and value', function(){
    it('should set a style value', function(){
      var list = dom('<em>Hello</em>');
      list.css('display', 'none');
      assert('none' == list.get(0).style.display);
    })
  })

  describe('with a key', function(){
    it('should get a style value', function(){
      var list = dom('<em>Hello</em>');
      list.css('display', 'none');
      assert('none' == list.css('display'));
    })
  })

  describe('with an object', function(){
    it('should return itself for chaining', function(){
      var list = dom('<em>Hello</em>');
      assert(list == list.css({ display: 'none' }));
    })

    it('should apply all given values', function(){
      var list = dom('<em>Hello</em>');
      list.css({ display: 'none', 'font-weight': 'bold' });

      assert('none' == list.css('display'));
      assert('bold' == list.css('font-weight'));
    })

    it('should add "px" to pixel values', function(){
      var list = dom('<p>Hello</p>');
      list.css({ top: 5, left: 10 });
      assert('5px' == list.css('top'));
      assert('10px' == list.css('left'));
    })
  })
})

describe('.is()', function(){
  it('should return true if matches', function(){
    assert(dom('<p></p>').is('p'));
  })

  it('should return false otherwise', function(){
    assert(false == dom('<p></p>').is('span'));
  })
})

describe('.parent()', function(){
  describe('without arguments', function(){
    it('should return a single parent', function(){
      assert(1 == dom('<p><em><i>baz</i></em></p>').find('i').parent().els.length);
    })
  })

  describe('with selector', function(){
    it('should return all matching elements', function(){
      var parent = dom('<p><em><i></i></em></p>').find('i').parent('p');
      assert(1 == parent.els.length);
      assert('<em><i></i></em>' == parent.els[0].innerHTML);
    })
  })

  describe('with limit', function(){
    it('should return all parent within limit', function(){
      assert(2 == dom('<p><em><i></i></em></p>').find('i').parent('*', Infinity).els.length);
    })
  })
})

describe('.next()', function(){
  describe('without arguments', function(){
    it('should return the next element', function(){
      assert(dom('<p></p><i></i><em></em>').find('p').next().is('i'));
    })
  })

  describe('with selector', function(){
    it('should return the next element matching selector', function(){
      assert(dom('<p></p><i></i><em></em>').find('p').next('em').is('em'));
    })
  })

  describe('with limit', function(){
    it('should return all elements within limit', function(){
      assert(2 == dom('<p></p><i></i><em></em>').find('p').next(null, Infinity).els.length);
    })
  })
})

describe('.previous()', function(){
  describe('without arguments', function(){
    it('should return the previous element', function(){
      assert(dom('<p></p><i></i><em></em>').find('em').previous().is('i'));
    })
  })

  describe('with selector', function(){
    it('should return the previous element matching selector', function(){
      assert(dom('<p></p><i></i><em></em>').find('em').previous('p').is('p'));
    })
  })

  describe('with limit', function(){
    it('should return all elements within limit', function(){
      assert(2 == dom('<p></p><i></i><em></em>').find('em').previous(null, Infinity).els.length);
    })
  })
})

describe('.prev()', function(){
  it('should alias .previous()', function(){
    var proto = dom.List.prototype;
    assert(proto.prev == proto.previous);
  })
})

dom.attrs.forEach(function(name){
  describe('.' + name + '()', function(){
    it('should return the attribute value', function(){
      var list = dom('<a></a>');
      list.attr(name, 'tobi');
      assert('tobi' == list[name]());
    })

    describe('with a value', function(){
      it('should set the attribute value', function(){
        var list = dom('<a></a>');
        list[name]('tobi');
        assert('tobi' == list[name]());
      })
    })
  })
})
