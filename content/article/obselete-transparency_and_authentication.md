---
title: "Real-world decentralized authentication (Privacy and transparency)"
date: 2023-02-21T17:34:45+05:45
draft: true
---

Every election is represented as an append-only log of authenticated action.

Because every vote is encrypted, the action log can be made public during or after the election.

Using the log you can verify:
- That your vote has been taken into account
- That the encrypted total is the sum of all votes
- That the decrypted total is the decryption of the encrypted total

## Actors

**Users** authenticates their vote using a cryptographic digital signature.

They uses the _ballot_set_ciphertext_ action

**Organisations** manages the member's public keys, also using digital signatures.

They uses the _ballot_create_, _ballot_update_user_public_key_ and _ballot_delete_ actions

## Process

- Election creation
- Adding voters
- Votes
- Changing voters credentials when necessary
- More votes
- Closing a tallying

_TODO: Add d2 diagram_

# More on authentication

## Decentralized IDentities (DID)

Users should be able to interact to the network without the need for a central authority.

When selecting a good decentralized authentication scheme, bitcoin-like cryptography is the first thing that came to mind.

In bitcoin people can directly interact with the network without the need of a third party, using only the knowledge of their wallet's secret key.

**The ballot.cipertext events are managed by users**

## Authentication Organisations (AO)

By definition Decentralized Identities can be generated at will.

We need a mechanism to manage the member list, so every real-world member has exactly one identity, one voice.

Autentication organisation are also necessaries when someone loose access to his DID (by loosing access to his device for exemple).

**The ballot.create and ballot.pubkey events are managed by organisations**

## Decentralized Authenticaton

Different organisations can co-organize an election.

Each AO add their own members to the election (**ballot** event).

The election rules could set a maximum to the number of ballot an organisation could provide.

If the election rules allows it, the AO is able to help a user recover his identity if necessary (using the **ballot.pubkey** event), by verifing him by email/phone-number for exemple, or by having him coming to the registration office with his ID card.
