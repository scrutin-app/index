---
draft: true
---

## voting right = address = public key

Decentralized identities are empowered by knowledge of the secret (called the private key).
This knowledge m1ake them the possessors of the power of emitting authenticated messages (called signed messages).
This is the basic mechanism for cryptocurrency transactions.
We use it in two way:
- For a voter to autenticate his ballot
- For an organisation to add(and revoke) voters to the voting list

Like bitcoin addresses are prefixed by 1 or 3, and litecoin address by L, etc,
Voting addresses are prefixed by V, like V for vendetta.
(encoding of these kind of addresses is Base58Check)

We kind find a good explanation from the "Keys and identities" chapter from SecureScuttlebutt. (But we don't do anything like SSB)
https://ssbc.github.io/scuttlebutt-protocol-guide/ 

## On liquid democracy

Liquid democracy incorpore both aspects of direct democracy and representative democracy

### New implication: Vote delegation is trivial on such a system.

Some rules may allow it, for example to model a framework for liquid democracy.
In our system it is modeled as a signed transaction for an election where voterAddr -> deletagate -> otherVoterAddr.
When tallying, otherVoterAddr stack up voting rights and now his ballot is either counted n times or he can emit n ballots.

### Conclusion: A mix of secret and public voting is desirable

Public (elected) figure should vote publicaly, so that we know that they are no cheating.
This is why the respresentative system is made for.
But at any moment we could choose to vote by ourself instead of delegating, we could do so by removing the weight of the representative by 1 and casting a seperate encrypted ballot.

## On web-of-trust

Building the trust bottom-up (like wobbly)
Incorpore supernodes, maybe modeled as DAO (ex: ethereum smart contract)
OR make a reciprocate link from user to org (user --(trust)--> org) (simpler)

## Trust organisation

Could we make one to verify that people are of our country (let's say we want to verify id card and stamp that DID as verified as citoyen).
If doable according to the law we could start now, giving credit to our poll results

## On being blockchain ready

With the new datamodel of v0.2, every transmormative operation is ready to be put on a decentralized database, (now added to an append-only-log)

Alternative to blockchin is Matrix-like merging using CRDT. Similar to Berty lamport clock merging to resolve the order of messages.

Also possible. but for operation to resolve in the same state given any order, much restrictive rules should be added to the system. For us it would probably be this one: "Org operation always have priority over user operations, given a specific ballot(=voting right)".

Blockchain also have the propriety of asserting the public state of the system at every epoch (with some lag as it could be an orphan block).
This solve the issue that no one can say "i never hear this operating, nobody told me Alice voted, ..."