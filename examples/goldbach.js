// Goldbach's conjecture: every even number greater than 2 is the sum of two
// primes. For each power of two from 4 to 2^25, find the split whose smaller
// prime is the least, testing primality by trial division.
// See https://en.wikipedia.org/wiki/Goldbach%27s_conjecture

fact(split(4, [2, 2]))
implied_by(split(N, Pair), [eq(0, mod(N, 2)), gt(N, 4), once(split_from(N, Pair, 3))])

implied_by(split_from(N, [P, Q], P), [is(Q, sub(N, P)), is_prime(Q)])
implied_by(
  split_from(N, Pair, P),
  [lt(P, N), once(next_prime(P, Next)), split_from(N, Pair, Next)],
)

implied_by(next_prime(P, Next), [is(Next, add(P, 2)), is_prime(Next)])
implied_by(next_prime(P, Next), [is(Q, add(P, 2)), next_prime(Q, Next)])

fact(is_prime(2))
fact(is_prime(3))
implied_by(is_prime(P), [gt(P, 3), eq(1, mod(P, 2)), not(has_factor(P, 3))])

implied_by(has_factor(N, L), eq(0, mod(N, L)))
implied_by(has_factor(N, L), [lt(mul(L, L), N), is(M, add(L, 2)), has_factor(N, M)])

implied_by(in_range(Low, High, Low), le(Low, High))
implied_by(
  in_range(Low, High, N),
  [lt(Low, High), is(Next, add(Low, 1)), in_range(Next, High, N)],
)

implies([in_range(2, 25, I), is(N, pow(2, I)), split(N, Pair)], goldbach(N, Pair))
