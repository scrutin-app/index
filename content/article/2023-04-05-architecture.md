---
title: Architecture
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

Event are object creations or mutations, that need to follow specific rules

### Election events

#### Election.create

Create a new election.

Fix the admin identity through `ownerPublicKey`

#### Election.partialDecryption

Update an election's partialDecryptions.

The partialDecryptions can be verified by anyone. This event doesn't need digital signatures (but is verified).

#### Election.close

Update an election's result

The election result can be reproduced by anyone. This event doesn't need digital signatures (but is reproductible).

### Ballot events

#### Ballot.create
#### Ballot.updateCiphertext
#### Ballot.updatePublicKey