// Alternative clauses, disjunction and once provide goal-directed choices.

fact(train('paris', 'brussels'))
fact(bus('paris', 'lille'))
implied_by(route(From, To), train(From, To))
implied_by(route(From, To), bus(From, To))
query(route('paris', To))
query(or(train('paris', 'brussels'), bus('paris', 'lille')))
query(once(route('paris', To)))
