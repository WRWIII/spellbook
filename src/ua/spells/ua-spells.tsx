const UASpells = [
    {
	"index": "psionic-blast",
	"name": "Psionic Blast",
	"desc": [
		"You unleash a destructive wave of mental power in a 30-foot cone. Each creature in the area must make a Dexterity saving throw. On a failed save, a target takes 5d8 force damage, is pushed 20 feet directly away from you, and is knocked prone. On a successful save, a target takes half as much damage and isn’t pushed or knocked prone."
	],
	"higher_level": [
		"When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd."
	],
	"range": "Self (30-foot cone)",
	"components": [
		"V",
	],
	"material": "",
	"ritual": false,
	"duration": "Instantaneous",
	"concentration": false,
	"casting_time": "1 action",
	"level": 3,
	"attack_type": "ranged",
	"damage": {
		"damage_type": {
			"index": "force",
			"name": "Force",
			"url": "/api/damage-types/force"
		},
		"damage_at_slot_level": {
			"3": "5d8",
			"4": "6d8",
			"5": "7d8",
			"6": "8d8",
			"7": "9d8",
			"8": "10d8",
			"9": "11d8"
		}
	},
	"school": {
		"index": "evocation",
		"name": "Evocation",
		"url": "/api/magic-schools/evocation"
	},
	"classes": [
		{
			"index": "wizard",
			"name": "Wizard",
			"url": "/api/classes/wizard"
		},
        {
            "index": "sorcerer",
			"name": "Sorcerer",
			"url": "/api/classes/sorcerer"
        },
        {
            "index": "warlock",
			"name": "Warlock",
			"url": "/api/classes/warlock"
        },
	],
	"subclasses": [
		{
			"index": "lore",
			"name": "Lore",
			"url": "/api/subclasses/lore"
		},
		{
			"index": "land",
			"name": "Land",
			"url": "/api/subclasses/land"
		}
	],
},
]

export default UASpells