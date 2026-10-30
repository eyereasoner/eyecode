// Peasant multiplication and exponentiation, as in ancient Egyptian arithmetic:
// halve one operand, double (or square) the other, and add (or multiply) in the
// rows where the halved operand was odd. Only halving, doubling and addition
// are needed, and the integers stay exact however large they grow.

fact(prod([0, _], 0))
implied_by(
  prod([X, Y], Z),
  [ne(X, 0), eq(0, mod(X, 2)), is(S, floordiv(X, 2)), is(T, add(Y, Y)), prod([S, T], Z)],
)
implied_by(
  prod([X, Y], Z),
  [
    ne(X, 0),
    eq(1, mod(X, 2)),
    is(S, floordiv(X, 2)),
    is(T, add(Y, Y)),
    prod([S, T], R),
    is(Z, add(R, Y)),
  ],
)

fact(pow([_, 0], 1))
implied_by(
  pow([X, Y], Z),
  [ne(Y, 0), eq(0, mod(Y, 2)), is(S, mul(X, X)), is(T, floordiv(Y, 2)), pow([S, T], Z)],
)
implied_by(
  pow([X, Y], Z),
  [
    ne(Y, 0),
    eq(1, mod(Y, 2)),
    is(S, mul(X, X)),
    is(T, floordiv(Y, 2)),
    pow([S, T], R),
    is(Z, mul(R, X)),
  ],
)

query(prod([3, 0], _))
query(prod([5, 6], _))
query(prod([238, 13], _))
query(prod([8367238, 27133], _))
query(prod([62713345408367238n, 40836723862713345n], _))
query(prod([4083672386271334562713345408367238n, 4083672386271334562713345408367238n], _))
query(pow([3, 0], _))
query(pow([5, 6], _))
query(pow([238, 13], _))
query(pow([8367238, 2713], _))
