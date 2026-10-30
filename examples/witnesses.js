// A structured witness identifies the rule and the binding that created it.

fact(person('alice'))
fact(person('bob'))
implies(
  person(Name),
  [
    has_record(Name, record('person_rule', Name)),
    record_owner(record('person_rule', Name), Name),
  ],
)
