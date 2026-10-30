// The date of Easter Sunday, by the anonymous Gregorian algorithm (Meeus/Jones/
// Butcher). Every step is integer arithmetic on the year; the result is a
// [Month, Day] pair.

implied_by(
  computus(Year, [Month, Day]),
  [
    is(A, mod(Year, 19)),
    is(B, floordiv(Year, 100)),
    is(C, mod(Year, 100)),
    is(
      D,
      mod(
        add(
          sub(
            sub(add(mul(19, A), B), floordiv(B, 4)),
            floordiv(add(sub(B, floordiv(add(B, 8), 25)), 1), 3),
          ),
          15,
        ),
        30,
      ),
    ),
    is(
      E,
      mod(sub(sub(add(add(32, mul(2, mod(B, 4))), mul(2, floordiv(C, 4))), D), mod(C, 4)), 7),
    ),
    is(F, add(sub(add(D, E), mul(7, floordiv(add(add(A, mul(11, D)), mul(22, E)), 451))), 114)),
    is(Month, floordiv(F, 31)),
    is(Day, add(mod(F, 31), 1)),
  ],
)

implied_by(in_range(Low, High, Low), le(Low, High))
implied_by(
  in_range(Low, High, N),
  [lt(Low, High), is(Next, add(Low, 1)), in_range(Next, High, N)],
)

implies([in_range(2021, 2050, Year), computus(Year, Date)], easter(Year, Date))
