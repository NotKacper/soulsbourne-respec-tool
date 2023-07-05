class RespecGenerator {
	#startingClass;
	#level;
	#totalSkillPoints;
	#scalingSkills;
	#minimumSkills;
	#sorcery;
	#skills;
	constructor(startingClassId, levelId, strScaleId, dexScaleId, intScaleId, fthScaleId, lckScale, strMinId, dexMinId, intMinId, fthMinId, lckMin, sorcery) {
		this.#startingClass = new HtmlPageAccessor(startingClassId);
		this.#level = new HtmlPageAccessor(levelId);
		this.#totalSkillPoints = 0;
		this.#scalingSkills = { STR: new HtmlPageAccessor(strScaleId), DEX: new HtmlPageAccessor(dexScaleId), INT: new HtmlPageAccessor(intScaleId), FTH: new HtmlPageAccessor(fthScaleId), LCK: new HtmlPageAccessor(lckScale) };
		this.#minimumSkills = { STR: new HtmlPageAccessor(strMinId), DEX: new HtmlPageAccessor(dexMinId), INT: new HtmlPageAccessor(intMinId), FTH: new HtmlPageAccessor(fthMinId), LCK: new HtmlPageAccessor(lckMin) };
		this.#sorcery = new HtmlPageAccessorCheckBox(sorcery);
		this.#skills = {};
	}

	createRespec() {
		this.#totalSkillPoints = this.#getTotalSkillPoints();
		const skills = ["VGR", "ATN", "END", "VIT", "STR", "DEX", "INT", "FTH", "LCK"];
		const setOfValidScales = new Set(["S", "A", "B"]);
		const scaleSkills = Object.keys(this.#scalingSkills)
		let n = 0;
		let changed;
		let pointsAdded;
		while (this.#totalSkillPoints > 0) {
			changed = false;
			for (const skill of skills) {
				pointsAdded = this.#allocatePointsForSkill(skill);
				this.#skills[skill] += pointsAdded;
				this.#totalSkillPoints -= pointsAdded;
				if (pointsAdded > 0) changed = true;
			}
			if (changed == false) {
				// finds how many skills to spread leftover points to
				for (const skill of scaleSkills) {
					if (setOfValidScales.has(this.#scalingSkills[skill].getInputFieldStr())) {
						n++;
					}
				}
				const pointsPerSkill = Math.floor(this.#totalSkillPoints / n);
				let leftOver = this.#totalSkillPoints - n*pointsPerSkill;
				for (const skill of scaleSkills) {
					if (setOfValidScales.has(this.#scalingSkills[skill].getInputFieldStr())) {
						this.#skills[skill]+=pointsPerSkill;
					}
					if (this.#skills[skill] > 100) {
						leftOver += this.#skills[skill] - 99;
						this.#skills[skill] = 99;
					}
				}
				// need to implement a redistribution of the leftover points over all other skills and adding only up to 99.
				this.#skills.VGR += leftOver;
				this.#totalSkillPoints = 0;
			}
		}
	}

	getSkills() {
		return this.#skills;
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
		this.#skills = classes[this.#startingClass.getInputFieldStr()];
		if (this.#level.getInputFieldInt() > this.#skills.LV) return (this.#level.getInputFieldInt() - this.#skills.LV);
		alert("Level of character ", this.#level, " cannot be below base level ", this.#skills.LV, ".");
		return 0;
	}

	#allocatePointsForSkill(skill) {
		const softCaps = { VGR: 44, ATN: 40, END: 40, VIT: 40, STR: 60, DEX: 50, INT: 50, FTH: 60, LCK: 99 };
		const setOfValidScales = new Set(["S", "A", "B"]);
		switch (skill) {
			case "VGR":
				if (this.#skills[skill] < 20 && this.#totalSkillPoints >=2) {
					return 2;
				} else if (this.#skills[skill] < 30 && this.#totalSkillPoints >=1) {
					return 1;
				}
				return 0;
			case "ATN":
				if (this.#sorcery.getInputField() && this.#skills[skill] < 30  && this.#totalSkillPoints >=1) {
					return 1;
				}
				return 0;
			case "END":
				if (this.#skills[skill] < 20  && this.#totalSkillPoints >=2) {
					return 2;
				} else if (this.#skills[skill] < 30  && this.#totalSkillPoints >=1) {
					return 1;
				}
				return 0;
			case "VIT":
				if (this.#skills[skill] < 30  && this.#totalSkillPoints >=1) {
					return 1;
				}
				return 0;
			case "STR":
				// min skil req. + scaling and soft cap
				if ((this.#skills[skill] < this.#minimumSkills[skill].getInputFieldInt() || setOfValidScales.has(this.#scalingSkills[skill].getInputFieldStr())) && this.#skills[skill] < softCaps.STR  && this.#totalSkillPoints >=3) {
					return 3;
				}
				return 0;
			case "DEX":
				// min skil req. + scaling and soft cap
				if ((this.#skills[skill] < this.#minimumSkills[skill].getInputFieldInt() || setOfValidScales.has(this.#scalingSkills[skill].getInputFieldStr()) || this.#sorcery.getInputField()) && this.#skills[skill] < softCaps.STR && this.#totalSkillPoints >=3) {
					return 3;
				}
				return 0;
			case "INT":
				// min skil req. + scaling and soft cap
				if ((this.#skills[skill] < this.#minimumSkills[skill].getInputFieldInt() || setOfValidScales.has(this.#scalingSkills[skill].getInputFieldStr())) && this.#skills[skill] < softCaps.STR && this.#totalSkillPoints >=3) {
					return 3;
				}
				return 0;
			case "FTH":
				// min skil req. + scaling and soft cap
				if ((this.#skills[skill] < this.#minimumSkills[skill].getInputFieldInt() || setOfValidScales.has(this.#scalingSkills[skill].getInputFieldStr())) && this.#skills[skill] < softCaps.STR && this.#totalSkillPoints >=3) {
					return 3;
				}
				return 0;
			case "LCK":
				// min skil req. + scaling and soft cap
				if ((this.#skills[skill] < this.#minimumSkills[skill].getInputFieldInt() || setOfValidScales.has(this.#scalingSkills[skill].getInputFieldStr())) && this.#skills[skill] < softCaps.STR && this.#totalSkillPoints >=3) {
					return 3;
				}
				return 0;
			default:
				break;
		}
	}
}
