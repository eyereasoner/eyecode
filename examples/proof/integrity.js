'false'

clause(2, fact(account('bob', -5)))
clause(3, contradiction(account(Owner, Balance), lt(Balance, 0)))

step('false', clause(3), {Owner: 'bob', Balance: -5}, [account('bob', -5), lt(-5, 0)])
step(account('bob', -5), clause(2), {}, [])
step(lt(-5, 0), 'builtin', {}, [])
