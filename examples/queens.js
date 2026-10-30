// N queens: list position is the row, list value is the column (both 1-based).

implied_by(
  queens(N, Columns),
  [is_int(N), ge(N, 0), columns(1, N, Available), place(Available, [], Columns)],
)
implied_by(columns(I, N, []), gt(I, N))
implied_by(columns(I, N, [I, ...Rest]), [le(I, N), is(Next, add(I, 1)), columns(Next, N, Rest)])
fact(select(X, [X, ...Rest], Rest))
implied_by(select(X, [Y, ...Rest], [Y, ...Remaining]), select(X, Rest, Remaining))
fact(place([], _, []))
implied_by(
  place(Available, Placed, [Column, ...Rest]),
  [
    select(Column, Available, Remaining),
    safe(Column, Placed, 1),
    place(Remaining, [Column, ...Placed], Rest),
  ],
)
fact(safe(_, [], _))
implied_by(
  safe(Column, [Other, ...Rest], Distance),
  [
    ne(Column, add(Other, Distance)),
    ne(Column, sub(Other, Distance)),
    is(Next, add(Distance, 1)),
    safe(Column, Rest, Next),
  ],
)
query(once(queens(8, Columns)))
