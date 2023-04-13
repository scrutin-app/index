---
draft: true
---

### Org root

```json
{
	"name": "Scrutin",
	"users": [
		"V1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
	],
	"rights": {
		"admins": [

		],
		"createOrg": true,
		"addUser": true,
		"sigRequired": 1,
		"type": ["condorcet","majority"]
	},
}
```

Every transaction will be allowed but some:

- add new root org (unlimited) that can flood
- add new org (child - cannot create new org) but can add users with a certain limit

- add new user (once)
- add new user (multiple - limited by time)

### Transaction

Une transaction est un message valide signé par sigRequired admins.

La validité d'un message dépend des règle de la freechain

Type 1: Création ou modification d'une organisation
Type 2: Ajout ou suppression d'user ou d'organisations
Type 3: Vote

#### Mutation regles

Regle 0: sigRequired > 0

Regle 1: Une organisation peut émettre une transaction pour ajouter un admin

Regle 2: Une organisation peut émettre une transaction pour changer le sigRequired 

org {admin:[arju],sigRequired:1}

arju signe org devient {admin:[arju,max],sigRequired:2}

arju et max signe org devient {admin:[arju,max,someone], sigRequired:2}

#### Consensus

Freechain can reach consensus by using "bigger the better" rule. We always choose the chain with the most actions.

Transactions could add a pointer to the latest block to avoid attacks, for transactions to verify the chain.

**We are aware that attacks could still take place. So for now only trusted servers (trusted publicKeys/addresses) are allowed to generate new blocks**