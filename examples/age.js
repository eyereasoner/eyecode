// Age checker with an explicit reference date, so proofs remain reproducible.
// Change as_of/1 or query age_above(Person, years(N), date(Y, M, D)).
// Thresholds are strictly exceeded; a leap-day anniversary falls on February
// 28 in a non-leap year. days(N) instead measures exact elapsed whole days.

fact(birth_date('pat_h', date(1944, 8, 21)))
fact(as_of(date(2026, 10, 1)))

implied_by(age_above(Person, Duration), [as_of(Date), age_above(Person, Duration, Date)])
implied_by(
  age_above(Person, years(Years), Date),
  [
    is_int(Years),
    ge(Years, 0),
    birth_date(Person, Birth),
    date_day(Birth, Born),
    date_day(Date, Today),
    ge(Today, Born),
    anniversary(Birth, Years, Anniversary),
    date_day(Anniversary, Threshold),
    gt(Today, Threshold),
  ],
)
implied_by(
  age_above(Person, days(Days), Date),
  [is_int(Days), ge(Days, 0), age_days(Person, Date, Age), gt(Age, Days)],
)
implied_by(
  age_days(Person, Date, Days),
  [
    birth_date(Person, Birth),
    date_day(Birth, Born),
    date_day(Date, Today),
    ge(Today, Born),
    is(Days, sub(Today, Born)),
  ],
)
implied_by(
  anniversary(date(Y, M, D), Years, date(Year, M, Day)),
  [is(Year, add(Y, Years)), month_days(Year, M, Maximum), is(Day, min(D, Maximum))],
)

// Proleptic Gregorian calendar; dates have integer years >= 1.
implied_by(
  date_day(date(Y, M, D), Ordinal),
  [
    is_int(Y),
    is_int(M),
    is_int(D),
    ge(Y, 1),
    month_days(Y, M, Maximum),
    ge(D, 1),
    le(D, Maximum),
    month_offset(M, Offset),
    leap_extra(Y, M, Extra),
    is(Previous, sub(Y, 1)),
    is(
      Ordinal,
      add(
        add(
          add(
            add(
              sub(add(mul(365, Previous), floordiv(Previous, 4)), floordiv(Previous, 100)),
              floordiv(Previous, 400),
            ),
            Offset,
          ),
          Extra,
        ),
        D,
      ),
    ),
  ],
)
implied_by(month_days(Y, 2, 29), leap_year(Y))
implied_by(month_days(Y, 2, 28), common_year(Y))
implied_by(month_days(_, M, Days), ordinary_month(M, Days))
fact(ordinary_month(1, 31))
fact(ordinary_month(3, 31))
fact(ordinary_month(4, 30))
fact(ordinary_month(5, 31))
fact(ordinary_month(6, 30))
fact(ordinary_month(7, 31))
fact(ordinary_month(8, 31))
fact(ordinary_month(9, 30))
fact(ordinary_month(10, 31))
fact(ordinary_month(11, 30))
fact(ordinary_month(12, 31))
implied_by(leap_year(Y), eq(0, mod(Y, 400)))
implied_by(leap_year(Y), [eq(0, mod(Y, 4)), ne(0, mod(Y, 100))])
implied_by(common_year(Y), ne(0, mod(Y, 4)))
implied_by(common_year(Y), [eq(0, mod(Y, 100)), ne(0, mod(Y, 400))])
implied_by(leap_extra(_, M, 0), le(M, 2))
implied_by(leap_extra(Y, M, 1), [gt(M, 2), leap_year(Y)])
implied_by(leap_extra(Y, M, 0), [gt(M, 2), common_year(Y)])
fact(month_offset(1, 0))
fact(month_offset(2, 31))
fact(month_offset(3, 59))
fact(month_offset(4, 90))
fact(month_offset(5, 120))
fact(month_offset(6, 151))
fact(month_offset(7, 181))
fact(month_offset(8, 212))
fact(month_offset(9, 243))
fact(month_offset(10, 273))
fact(month_offset(11, 304))
fact(month_offset(12, 334))

query(age_above(Person, years(80)))
