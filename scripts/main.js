function updateOutputFields(respeccer) {
	const skills = respeccer.getSkills();
	document.getElementById("vgrOut").innerHTML = "VGR " + skills.VGR.toString();
	document.getElementById("atnOut").innerHTML = "ATN " + skills.ATN.toString();
	document.getElementById("endOut").innerHTML = "END " + skills.END.toString();
	document.getElementById("vitOut").innerHTML = "VIT" + skills.VIT.toString();
	document.getElementById("strOut").innerHTML = "STR " + skills.STR.toString();
	document.getElementById("dexOut").innerHTML = "DEX " + skills.DEX.toString();
	document.getElementById("intOut").innerHTML = "INT " + skills.INT.toString();
	document.getElementById("fthOut").innerHTML = "FTH " + skills.FTH.toString();
	document.getElementById("lckOut").innerHTML = "LCK " + skills.LCK.toString();
}

function init() {
	const respeccer = new RespecGenerator("startingClass", "level", "strScale", "dexScale", "intScale", "fthScale", "lckScale", "strMin", "dexMin", "intMin", "fthMin", "lckMin", "sorcery");
	document.getElementById("start-btn").addEventListener("click", () => {
		respeccer.createRespec();
		updateOutputFields(respeccer);
	});
}

init();
