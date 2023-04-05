---
title: Architecture
description: Data structures and state mutations (events) of the app
date: 2023-04-05
---

## Philosophy

An append-only log of signed events.

## Objects

Objects have a `type` key, and are casted accordingly.

```json
{
	"type": "election", // or ballot
	"previousId": null,
	// ...
}
```

Objects are immutables, to update them we provide a new object and fill `previousId` with the id of the replaced object.

### Election object

```json
{
	"type": "election",
	"previousId": "...", // Id of the replaced object (can be null)

	"ownerPublicKey": "fcf7bad8b79c...", // Admin
	"params": "...", // Belenios election structure
	"trustees": "...", // Election public keys
	"result": "...", // Election result
	"partialDecryptions": [
		// Paritial decryptions
	],
	/* Voter list */
	"voterPublicKeys": [
		"fcf7bad8b79c...",
		"2a1bbcc2a744...",
		// ...
	]
}
```

### Ballot object

```json
{
	"electionId": "fcf7bad8b79c...", // eventHash of the election
	"previousId": "...", // Id of the replaced object (can be null)

	"voterPublicKey": "...", // Voter identity
	"electionPublicKey": "...", // Should be a copy of the ownerPublicKey of the election

	"ciphertext": "", // Encrypted vote content
	"pubcred": "", // Used to interface with Belenios
}
```

## Events

Event are object creations or mutations, that need to follow specific rules.

Exemple:

```json
{
	"type": "election.create",
	"object": {
		// Election or Ballot object.
		// Stringified, to have the hash reproducible
	},
	// objectId is the hash of the object.
	// Used in electionId, previousId, ...
	"objectId": "fcf7bad8b79c...",
	// Array of signatures (depending of the type of event)
	"signatures": [{
		"publicKey": "3a9ccf1fc...",
		"signature": "a9b0391f9c2..."
	}]
}
```

#### Election.create

```json
{
	"type": "election.create",
	// ...
}
```
Create a new election.

Set the admin identity through `ownerPublicKey`

This event is signed by `ownerPublicKey`.


#### Ballot.create

Create a ballot.

Create a voter identity through `voterPublicKey`.

`electionPublicKey = election.ownerPublicKey`

The event is signed by `electionPublicKey`.

#### Ballot.updateCiphertext

Voting action. Update the ciphertext field.

The event is signed by `voterPublicKey`.

#### Ballot.updatePublicKey

(Only for malleable elections)

Update a voter identity.

Allow the administrators to amend the voting list

The event is signed by `electionPublicKey`.

#### Election.partialDecryption

Update an election's partialDecryptions.

The partialDecryptions can be verified by anyone.

This event is unsigned (but is verifiable).

#### Election.close

Update an election's result

The election result can be reproduced by anyone.

This event is unsigned (but is reproductible).