// A graph of expression nodes evaluated recursively, then used by a forward rule.

fact(literal('n2', 2))
fact(literal('n3', 3))
fact(literal('n10', 10))
fact(literal('n4', 4))
fact(expression('product', 'mul', 'n2', 'n3'))
fact(expression('difference', 'sub', 'n10', 'n4'))
fact(expression('total', 'add', 'product', 'difference'))
fact(root('example', 'total'))
implied_by(value(Node, Value), literal(Node, Value))
implied_by(
  value(Node, Value),
  [
    expression(Node, Operation, Left, Right),
    value(Left, L),
    value(Right, R),
    calculate(Operation, L, R, Value),
  ],
)
implied_by(calculate('add', L, R, Value), is(Value, add(L, R)))
implied_by(calculate('sub', L, R, Value), is(Value, sub(L, R)))
implied_by(calculate('mul', L, R, Value), is(Value, mul(L, R)))
implies([root(Name, Node), value(Node, Value)], result(Name, Value))
query(result(Name, Value))
