// The Ackermann function, computed through the hyperoperation sequence:
// addition, multiplication, exponentiation, tetration, and so on.
// A(X, Y) = hyper(X, Y+3, 2) - 3, and every level above exponentiation is the
// previous level iterated. Integers are exact, so A(4, 2) - a number with 19,729
// digits - is computed in full rather than approximated.

implied_by(ackermann([X, Y], A), [is(B, add(Y, 3)), hyper(X, B, 2, C), is(A, sub(C, 3))])

// The first four levels have closed forms in ordinary arithmetic.
implied_by(hyper(0, Y, _, A), is(A, add(Y, 1)))
implied_by(hyper(1, Y, Z, A), is(A, add(Y, Z)))
implied_by(hyper(2, Y, Z, A), is(A, mul(Y, Z)))
implied_by(hyper(3, Y, Z, A), is(A, pow(Z, Y)))
// Above them, level X applied Y times is level X-1 applied to the result of
// level X applied Y-1 times.
implied_by(hyper(X, 0, _, 1), gt(X, 3))
implied_by(
  hyper(X, Y, Z, A),
  [gt(X, 3), gt(Y, 0), is(B, sub(Y, 1)), hyper(X, B, Z, C), is(D, sub(X, 1)), hyper(D, C, Z, A)],
)

query(ackermann([0, 6], _))
query(ackermann([1, 2], _))
query(ackermann([1, 7], _))
query(ackermann([2, 2], _))
query(ackermann([2, 9], _))
query(ackermann([3, 4], _))
query(ackermann([3, 14], _))
query(ackermann([4, 0], _))
query(ackermann([4, 1], _))
query(ackermann([4, 2], _))
query(ackermann([5, 0], _))
