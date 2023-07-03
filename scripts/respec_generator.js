class RespecGenerator {
	#weaponType;
	#startingClass;
	#level;
	#totalSkillPoints;
	#skills;
	contructor(weaponTypeId, startingClassId, levelId) {
		this.#weaponType = new HtmlPageAccessor(weaponTypeId);
		this.#startingClass = new HtmlPageAccessor(startingClassId);
		this.#level = new HtmlPageAccessor(levelId);
		this.#totalSkillPoints = 0;
		this.#skills = { VGR: 0, ATN: 0, END: 0, VIT: 0, STR: 0, DEX: 0, INT: 0, FTH: 0, LCK: 0 };
	}

	createRespec() {
		this.#totalSkillPoints = this.#getTotalSkillPoints();
		const skills = ["VGR", "ATN", "END", "VIT", "STR", "DEX", "INT", "FTH", "LCK"];
		for (const skill of skills) {
			this.#skills[skill] = this.#allocatePointsForSkill(skill);
		}
	}

	#getTotalSkillPoints() {
		const classes = {
			Knight: { LV: 9, VGR: 12, ATN: 10, END: 11, VIT: 15, STR: 13, DEX: 12, INT: 9, FTH: 9, LCK: 7 },
			Mercenary: { LV: 8, VGR: 11, ATN: 12, END: 11, VIT: 10, STR: 10, DEX: 16, INT: 10, FTH: 8, LCK: 9 },
			Warrior: { LV: 7, VGR: 14, ATN: 6, END: 12, VIT: 11, STR: 16, DEX: 9, INT: 8, FTH: 9, LCK: 11 },
			Herald: { LV: 9, VGR: 12, ATN: 10, END: 9, VIT: 12, STR: 12, DEX: 11, INT: 8, FTH: 13, LCK: 11 },
			Thief: { LV: 5, VGR: 10, ATN: 11, END: 10, VIT: 9, STR: 9, DEX: 13, INT: 10, FTH: 8, LCK: 14 },
			Assassin: { LV: 10, VGR: 10, ATN: 14, END: 11, VIT: 10, STR: 10, DEX: 14, INT: 11, FTH: 9, LCK: 10 },
			Sorcerer: { LV: 6, VGR: 9, ATN: 16, END: 9, VIT: 7, STR: 7, DEX: 12, INT: 14, FTH: 14, LCK: 7 },
			Pyromancer: { LV: 8, VGR: 11, ATN: 12, END: 10, VIT: 8, STR: 12, DEX: 9, INT: 14, FTH: 14, LCK: 7 },
			Cleric: { LV: 7, VGR: 10, ATN: 14, END: 9, VIT: 7, STR: 12, DEX: 8, INT: 7, FTH: 16, LCK: 13 },
			Deprived: { LV: 1, VGR: 10, ATN: 10, END: 10, VIT: 10, STR: 10, DEX: 10, INT: 10, FTH: 10, LCK: 10 },
		};
		this.#skills = classes[this.#startingClass.getInputField()];
		if (this.#level > this.#skills.LV) return this.#level - this.#skills.LV;
		alert("Level of character ", this.#level, " cannot be below base level ", this.#skills.LV, ".");
		return 0;
	}

	#allocatePointForSkill(skill) {
		// 4:3:2:1:1:1:1:1:1
		// 1 2 3 everything else unless ignored.
		
	}
}
