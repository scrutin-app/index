---
title: Accounts
description: Simple decentralized identitites
date: 2023-04-05
---

Accounts are simple keypairs.

```ts
type account = {
  userId: string,
  secret: string,
}
```

The secret allow `userId` to authenticate data using digital signatures.

We use accounts in two case:
- For voters
- For election administrators

<!--
### Multi-devices/Switching device

If absolutely needed you will be able to move private keys from one device to another (and even share private keys between devices).

### Suggestion: Deterministic hierarchical account

We would like to be able to generate as many identities as desired from a random seed.

That would allow to import all the user's identities as once.

Using a new identity will automatically be displayed in every devices, as they will all share the same seed.

The downside is that when the account seed is compromised, every child identity is compromised. 

### Suggestion: Hardware wallet

Hardware wallet are secondary devices that keep the private keys secure while still allowing to sign transactions.

They have various forms, from a air-gapped phone to usb keys or even shaped as credit card (through NFC).

It makes it almost impossible to compromise account without being physically in possession of the device.

### Suggestion: Lost and stolen accounts (Revocation certificates)

Would be a way to users to revokate their identity, without the organisations administrator having to do anything.

When someone loose possession of his account (the private key is lost), or if the private key has been exposed to the risk of being stolen, one need to revocate his account.
To revocate his account, on would use a "revocation certificate" (as with PGP)

As it may happen for someone loosing his seed to also loose his revocation certificate, our server will keep a copy of the revocation certificate for every registered account, to be able to publish them after verifiying the user's email address.
-->