---
title: Voting list (legacy)
description: An attempt at decentralized credential authorities
draft: true
date: 2023-03-01
---

In our first approach, the organizer of the election generate the credentials and send them to voters.
The voter informations are not stored anywhere, thus cannot leak.

If he wants, he can maintain a local database of user identities to only send credentials once.

```mermaid
flowchart TD
	O[Organizer of the election]
	E{Exist}
	SendInvite{Send invite}
	UseCached([Use cached identity])

    O -->|Add voter| E
    E -->|yes| UseCached
    UseCached -->|notify| Voter
	E -->|no| SendInvite

    SendInvite --> M([By email])
    subgraph .
    M --> M1[scrutin.app relay server]
    M1 --> M2[sendgrid.com]
    M2 --> M3[mail.google.com]
    end
    M3 -->|read by| Voter


    SendInvite --> S([By SMS])
    subgraph ..
    S --> S1[scrutin.app relay server]
    S1 --> S2[twilio.com]
    S2 --> S3[cellular network]
    end
    S3 -->|read by| Voter

    SendInvite --> D([Copy invite code])
    subgraph ...
    D --> D1[Messaging app]

    end
    D1 -->|read by| Voter
```
