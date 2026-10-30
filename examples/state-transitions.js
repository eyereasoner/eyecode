// An ordered event log defines a relation between successive account states.

fact(opening_balance(100))
fact(event(1, 'deposit', 25))
fact(event(2, 'withdraw', 40))
fact(event(3, 'withdraw', 20))
implied_by(balance(0, Amount), opening_balance(Amount))
implied_by(
  balance(N, Amount),
  [
    gt(N, 0),
    event(N, 'deposit', Value),
    is(Before, sub(N, 1)),
    balance(Before, Previous),
    is(Amount, add(Previous, Value)),
  ],
)
implied_by(
  balance(N, Amount),
  [
    gt(N, 0),
    event(N, 'withdraw', Value),
    is(Before, sub(N, 1)),
    balance(Before, Previous),
    is(Amount, sub(Previous, Value)),
  ],
)
query(balance(3, Amount))
