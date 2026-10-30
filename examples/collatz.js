// A trajectory ends at 1; parity chooses the next recursive step.

fact(trajectory(1, [1]))
implied_by(
  trajectory(N, [N, ...Rest]),
  [gt(N, 1), eq(0, mod(N, 2)), is(Next, floordiv(N, 2)), trajectory(Next, Rest)],
)
implied_by(
  trajectory(N, [N, ...Rest]),
  [gt(N, 1), eq(1, mod(N, 2)), is(Next, add(mul(3, N), 1)), trajectory(Next, Rest)],
)
// A range of starting values, enumerated by ordinary clauses.
implied_by(in_range(Low, High, Low), le(Low, High))
implied_by(
  in_range(Low, High, N),
  [lt(Low, High), is(Next, add(Low, 1)), in_range(Next, High, N)],
)
query(in_range(1, 20, N), trajectory(N, Values))
