// Control systems: two actuator commands computed from measurements,
// observations and a target. Actuator 1 combines a proportional part with a
// feedforward compensation for a measured disturbance; actuator 2 is a
// proportional, nonlinear differential (PND) feedback controller. A
// measurement pair whose first value is below the second contributes the
// square root of their difference, otherwise its first value.

// measurements
fact(measurement1('input1', [6, 11]))
fact(measurement1('disturbance2', [45, 39]))
fact(measurement2('input2', 'true'))
fact(measurement3('input3', 56967))
fact(measurement3('disturbance1', 35766))
fact(measurement4('output2', 24))

// observations
fact(observation1('state1', 80))
fact(observation2('state2', 'false'))
fact(observation3('state3', 22))

// targets
fact(target2('output2', 29))

// rules
implied_by(
  control1('actuator1', C),
  [
    measurement10('input1', M1),
    measurement2('input2', 'true'),
    measurement3('disturbance1', D1),
    is(C1, mul(M1, 19.6)),
    is(C2, div(log(D1), log(10))),
    is(C, sub(C1, C2)),
  ],
)

implied_by(
  control1('actuator2', C),
  [
    observation3('state3', P3),
    measurement4('output2', M4),
    target2('output2', T2),
    is(E, sub(T2, M4)),
    is(D, sub(P3, M4)),
    is(C1, mul(5.8, E)),
    is(N, div(7.3, E)),
    is(C2, mul(N, D)),
    is(C, add(C1, C2)),
  ],
)

implied_by(
  measurement10(I, M),
  [measurement1(I, [M1, M2]), lt(M1, M2), is(M3, sub(M2, M1)), is(M, sqrt(M3))],
)

implied_by(measurement10(I, M1), [measurement1(I, [M1, M2]), ge(M1, M2)])

// query
query(control1(_, _))
