---
draft: true
---

(_Why_) L'information est cruciale.
(_What_) Permettre aux citoyens de s'exprimer en sécurité.
(_How_) Des sondages transparents à l'initiative des citoyens.

### Purpose 1 : Surveys and elections

Permettre la participation des citoyens a la vie démocratique :

- Pour une election au sein d'une association, ville, entreprise, ...
- En sondant un echantillon representatif de la population (effective polling), ce qui permet de faire plus de sondages en parallèle. Certaines de ces questions peuvent être à l'initiative des citoyens. **Maybe not politically correct for EU funding**

### Purpose 2 : Transparence

##### Voting list management ("Innovation")

The voting list is pseudonymous but publicly availabe.
Voting addresses are decentralized identities (DID), similar to bitcoin address.

The process of adding or removing someone to an election (or later to an organisation) CAN be publicly available.

That will happen when someone register, unregister, or has lost control over his private key (lost or stolen). In this case the old identity will be revoked by the organization/election organizer and a new one will be added.

##### Helios: Summary

Voters emit encrypted ballots.

Those are homomorphically added. Only the sum of all ballots is decrypted by the election trustees.

In practice more than one trustee will be added, sometime using hardware wallet and one-time-key to increase the security. They emit turn-by-turn partial decryption of the sum of ballot until the result is in plaintext.

##### Advantages of Helios

The voting process is transparant (verifiable)
- ##### Universal verifiability
	we can verify that the result correspond to the sum of all the ballots, and that the decryption is correct.
- ##### Individual verifiability
	Voters can check if their final ballot has been accurately counted in the final tally

(mix-net will also be supported for more alternative voting)

#### State of the art secret voting

- Where we were: Helios
	(Josh Benaloh, Ben Adida, et al.)
- Where we almost are: Ballot signed by voters (decentralization)
	Helios-C (Stephane Glondu et al.)
- What the futur would be like: Coercion-resistance
	(votexx, D. Chaum et al.)

#### Peer-to-peer authentication

Help each other building a decentralized web of trust.

You may verify your contact identities if you use end-to-end encrypted messaging apps like Signal (even if most users trust blindly a identity *switch*) 

Compared to what is done with GPG, keybase and keyoxide, a new concept emerge: Organisations.

An organisation is a way to manage a list of contacts.
- An organisation organizer can organize an event to verify users decentralized identites (DID)
- Members can verify each others DID, building additional trust.

#### What is the problem organizations solves ?

As much as we would like users to be able to never loose their decentralized identity, it happens all the time and we need mechanism to deal with it.
For the moment it still rely on traditional authentication mechanism: physical meeting, phone call, email, ...

Example:

A town want to organize multiple digital elections

They choose one way to verify citizens.
They could either ask citizen to install the app and come to the city hall.
Or they could directly send credential (ie. private keys) by mail. Less secure but simpler.

This way the organization built a list of everyone's public key. The list is public. When they want to organize an election, 

After some time, someone stole Alice's phone.
Without the support of organization, we would have no mean to remove Alice stolen identity. But using organizations she can go to the town hall to remove her old identity and register a new one.

The election can continue, and we can even organize multiple organizations in a row with only little changes in the voter list.

#### Prupose 3 : Decentralized (technical)

This is still work in progress but the first version doesn't need this part to be finished

The cryptosystem (decentralized ids, signed ballots) allow for "gossip" decentralized "distributed" trustless trust.

However we host a public main pod, but you can host a pod if you want.

Some pods may whitelist public key of organization they want to mirror content to avoid spam.

Some pods may manage an organization user list and send mail, email, SMS, etc as a mean to verify users.

The data model is or isn't CRDT depending on the election rules.
For exemple, election organizer revoking a ballot conflict with a voter voting using that ballot.
For that reason it may be wise to use every member to use the same pod

**TODO: Rassurer le fait que ce projet est faisable (opensourcer et montrer la v1, une seule personne sur le projet ?, etc)**