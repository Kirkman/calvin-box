load('sbbsdefs.js');
load('helper-functions.js');
load('igs.js');

// Change this if you want debugWriteLine() to write to the debug.text file.
var DEBUG_MODE = true;
var FAST = false;

function cleanup() {
	// If this is an IGS user, make sure we exit in the correct resolution.
	if (bbs.mods.user_ig_ver && bbs.mods.user_ig_res) {
		console.writeln('G#R>' + bbs.mods.user_ig_res + ',1:');
	}

}

// Stores the output in our DEBUG file, but also outputs it to the console.
function debugWriteLn(s) {
	if (DEBUG_MODE) {
		debug(s);
	}
	console.writeln(s);
}

function padNumber(n) {
	return '   '.slice(n.toString().length)+n;
}

function checkRequirements(USER_IG_VER, required_ver) {
	var r_pieces = required_ver.split('.');
	var v_pieces = USER_IG_VER.split('.');
	if (parseInt(v_pieces[0]) < parseInt(r_pieces[0]) || parseInt(v_pieces[1] < parseInt(r_pieces[1]))) {
		console.writeln('\nSorry! This experiment requires IGS v'+required_ver+' or higher.')
		console.pause();
		return false;
	}
	return true;
}



// This is a naive function. Assumes text color is 1, and background color is 0.
function dialog(x, y, w, str, size, syllables, mouth_closed, mouth_open, dx, dy) {
	// 	writeTextWrap: function(x, y, w, str, color, size, attr, deg)
	// Includes built-in word-wrap, constraining text to the specified width

	igs.writeTextWrap(x, y, w, str, 1, size, 0, 0);

	if (!FAST) {
		igs.vsyncWait(0.25)
	}

	if (mouth_closed !== undefined) {
		// // We're going to write a loop command. Since we'll flash the two mouth states
		// // during each loop iteration, we need to cut the syllables in half.
		// // We also need to make sure this remains a whole number, so we'll round.
		// syllables = Math.round(syllables / 2);

		debugWriteLn('G#&>1,'+syllables+',1,0,>Gq@,22,0G3,3,'+mouth_open+','+dx+','+dy+':1q10:0G3,3,'+mouth_closed+','+dx+','+dy+':1q10:');

		// for (var s=0; s<syllables; s++) {
		// 	if (s % 2 == 0) {
		// 		debugWriteLn('G#G>3,3,'+mouth_open+','+dx+','+dy+':');
		// 	}
		// 	else {
		// 		debugWriteLn('G#G>3,3,'+mouth_closed+','+dx+','+dy+':');
		// 	}
		// 	igs.vsyncWait(0.1666666667)
		// }
		// debugWriteLn('G#G>3,3,'+mouth_closed+','+dx+','+dy+':');
	}
	else {
		if (!FAST) {
			igs.vsyncWait(syllables * 0.1666666667);
		}
	}

	if (!FAST) {
		igs.vsyncWait(0.25)
	}

	igs.writeTextWrap(x, y, w, str, 0, size, 0, 0);

}


function alterSounds() {
	// Alter SOUND 3 to become DINO ROAR (from type3.igs)
	console.writeln('G#b>20,0,3,0,0,0,60:b>20,0,3,1,0,0,477:b>20,0,3,2,1,0,1:b>20,0,3,3,0,0,10:b>20,0,3,4,0,0,1:');
	console.writeln('G#b>20,0,3,5,0,0,0:b>20,0,3,6,1,13,797:b>20,0,3,7,1,0,1:b>20,0,3,8,1,0,983:b>20,0,3,9,0,0,14:');
	console.writeln('G#b>20,0,3,10,1,19,661:b>20,0,3,11,1,0,1:b>20,0,3,12,1,17,203:b>20,0,3,13,0,0,6:b>20,0,3,14,0,0,0:');
	console.writeln('G#b>20,0,3,15,0,0,5:b>20,0,3,16,1,15,729:b>20,0,3,17,0,0,0:b>20,0,3,18,0,0,1:b>20,0,3,19,1,0,26:');
	console.writeln('G#b>20,0,3,20,0,4,487:b>20,0,3,21,1,3,372:b>20,0,3,22,1,6,516:b>20,0,3,23,0,0,751:b>20,0,3,24,0,2,363:');
	console.writeln('G#b>20,0,3,25,1,1,118:b>20,0,3,26,0,0,572:b>20,0,3,27,0,0,5:b>20,0,3,28,1,7,591:b>20,0,3,29,0,3,871:');
	console.writeln('G#b>20,0,3,30,0,2,885:b>20,0,3,31,1,1,433:b>20,0,3,32,0,16,83:b>20,0,3,33,0,2,787:b>20,0,3,34,0,9,942:');
	console.writeln('G#b>20,0,3,35,1,1,990:b>20,0,3,36,0,4,133:b>20,0,3,37,1,1,433:b>20,0,3,38,0,16,83:b>20,0,3,39,0,0,0:');
	console.writeln('G#b>20,0,3,40,0,0,0:b>20,0,3,41,0,0,0:b>20,0,3,42,0,0,0:b>20,0,3,43,0,0,0:b>20,0,3,44,0,0,0:');
	console.writeln('G#b>20,0,3,45,0,0,0:b>20,0,3,46,0,0,0:b>20,0,3,47,0,0,0:b>20,0,3,48,0,0,0:b>20,0,3,49,0,0,0:');
	console.writeln('G#b>20,0,3,50,0,0,0:b>20,0,3,51,0,0,0:b>20,0,3,52,0,0,0:b>20,0,3,53,0,0,0:b>20,0,3,54,0,0,0:');
	console.writeln('G#b>20,0,3,55,0,0,0:');


	// Based on fooling around with GIST .C outputs,
	// I believe PARAMETER 3 is VOLUME.

	// Alter SOUND 5 to become JoshDrum-D2
	igs.alterSound(0, 5,  0, 0, 0, 200);
	igs.alterSound(0, 5,  1, 0, 1, 689);
	igs.alterSound(0, 5,  2, 0, 0, 1);
	igs.alterSound(0, 5,  3, 0, 0, 15);
	igs.alterSound(0, 5,  4, 0, 0, 1); // Possibly can comment out.
	igs.alterSound(0, 5,  5, 0, 0, 15);
	igs.alterSound(0, 5,  6, 0, 0, 0);
	igs.alterSound(0, 5,  7, 1, 0, 1);
	igs.alterSound(0, 5,  8, 1, 12, 767);
	igs.alterSound(0, 5,  9, 0, 0, 0);
	igs.alterSound(0, 5, 10, 0, 0, 0);
	igs.alterSound(0, 5, 11, 1, 0, 1); // Possibly can comment out.
	igs.alterSound(0, 5, 12, 1, 12, 767);
	igs.alterSound(0, 5, 13, 0, 0, 0);
	igs.alterSound(0, 5, 14, 0, 0, 0);
	igs.alterSound(0, 5, 15, 0, 0, 0);
	igs.alterSound(0, 5, 16, 0, 0, 0);
	igs.alterSound(0, 5, 17, 0, 0, 0);
	igs.alterSound(0, 5, 18, 0, 0, 1); // Possibly can comment out.
	igs.alterSound(0, 5, 19, 1, 4, 80); // Possibly can comment out.
	igs.alterSound(0, 5, 20, 1, 0, 256); // Possibly can comment out.
	igs.alterSound(0, 5, 21, 1, 4, 80); // Possibly can comment out.
	igs.alterSound(0, 5, 22, 1, 0, 256); // Possibly can comment out.
	igs.alterSound(0, 5, 23, 0, 0, 782);
	igs.alterSound(0, 5, 24, 0, 28, 711);
	igs.alterSound(0, 5, 25, 1, 0, 167);
	igs.alterSound(0, 5, 26, 0, 12, 227);
	igs.alterSound(0, 5, 27, 0, 0, 166);
	igs.alterSound(0, 5, 28, 1, 12, 227);
	igs.alterSound(0, 5, 29, 0, 0, 0);
	igs.alterSound(0, 5, 30, 0, 0, 0);
	igs.alterSound(0, 5, 31, 0, 0, 0);
	igs.alterSound(0, 5, 32, 0, 0, 0);
	igs.alterSound(0, 5, 33, 0, 0, 0);
	igs.alterSound(0, 5, 34, 0, 0, 0);
	igs.alterSound(0, 5, 35, 0, 0, 0);
	igs.alterSound(0, 5, 36, 0, 0, 0);
	igs.alterSound(0, 5, 37, 0, 0, 0);
	igs.alterSound(0, 5, 38, 0, 0, 0);
	igs.alterSound(0, 5, 39, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 40, 0, 0, 1);
	igs.alterSound(0, 5, 41, 1, 0, 3);
	igs.alterSound(0, 5, 42, 0, 11, 916);
	igs.alterSound(0, 5, 43, 1, 0, 31);
	igs.alterSound(0, 5, 44, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 45, 0, 0, 31);
	igs.alterSound(0, 5, 46, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 47, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 48, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 49, 0, 0, 31);
	igs.alterSound(0, 5, 50, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 51, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 52, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 53, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 54, 0, 0, 0); // Possibly can comment out.
	igs.alterSound(0, 5, 55, 0, 0, 0); // Possibly can comment out.

	mswait(3000);
}

function calvinAnim(USER_IG_VER, USER_IG_RES) {
	var SKIP_FIRST_PART = false;
	FAST = false;
	bbs.mods.calvin_loaded = false;

	// Make sure internal double-stepping is off.
	console.writeln('G#q>9999:');

	if (!checkRequirements(USER_IG_VER, '2.19')) { return false; }

	alterSounds();

	var duplicator = {
		sprite: { x0: 142, y0: 5, x1: 224, y1: 67 },
		positions: [
			{ x: 255, y: 130, name: 'right side of screen during hobbes intro' },
			{ x: 151, y: 130, name: 'middle of screen after boink. Hobbes at left, but still visible.' },
			{ x: 50, y: 130, name: 'left side of screen at end.' }
		],
		getWidth: function() {
			return this.sprite.x1 - this.sprite.x0;
		},
		getHeight: function() {
			return this.sprite.y1 - this.sprite.y0;
		},
		getSprite: function(left_buf, right_buf) {
			left_buf = left_buf || 0;
			right_buf = right_buf || 0;
			return [this.sprite.x0 - left_buf, this.sprite.y0, this.sprite.x1 + right_buf, this.sprite.y1].join();
		}
	};

	var transmog = {
		sprite: { x0: 229, y0: 5, x1: 316, y1: 73 },
		positions: [
			{ x: 180, y: 130, name: 'right side of screen with dupe' }
		],
		getWidth: function() {
			return this.sprite.x1 - this.sprite.x0;
		},
		getHeight: function() {
			return this.sprite.y1 - this.sprite.y0;
		},
		getSprite: function(left_buf, right_buf) {
			left_buf = left_buf || 0;
			right_buf = right_buf || 0;
			return [this.sprite.x0 - left_buf, this.sprite.y0, this.sprite.x1 + right_buf, this.sprite.y1].join();
		}
	};

	var dino = {
		sprite: { x0: 149, y0: 40, x1: 315, y1: 193 },
		positions: [
			{ x: 320, y: 40, name: 'Off screen' },
			{ x: 260, y: 40, name: 'Barely poking into screen from the right.' },
			{ x: 200, y: 40, name: 'Position after first jump' },
			{ x: 140, y: 40, name: 'Position after second jump' }
		],
		getWidth: function() {
			return this.sprite.x1 - this.sprite.x0;
		},
		getHeight: function() {
			return this.sprite.y1 - this.sprite.y0;
		},
		getSprite: function(top_buf, right_buf, bot_buf, left_buf) {
			top_buf = top_buf || 0;
			right_buf = right_buf || 0;
			bot_buf = bot_buf || 0;
			left_buf = left_buf || 0;
			return [this.sprite.x0 - left_buf, this.sprite.y0 - top_buf, this.sprite.x1 + right_buf, this.sprite.y1 + bot_buf].join();
		}
	};

	var dino_box_top = {
		sprite: { x0: 236, y0: 5, x1: 304, y1: 48 },
		positions: [
			{ x: 149, y: 38, name: 'Top of box that\'s on dinosaur\'s head.' }
		],
		getWidth: function() {
			return this.sprite.x1 - this.sprite.x0;
		},
		getHeight: function() {
			return this.sprite.y1 - this.sprite.y0;
		},
		getSprite: function(top_buf, right_buf, bot_buf, left_buf) {
			top_buf = top_buf || 0;
			right_buf = right_buf || 0;
			bot_buf = bot_buf || 0;
			left_buf = left_buf || 0;
			return [this.sprite.x0 - left_buf, this.sprite.y0 - top_buf, this.sprite.x1 + right_buf, this.sprite.y1 + bot_buf].join();
		}
	};


	var calvin = {
		positions: [
			{ x: 206, y: 122, name: 'Beside duplicator with Hobbes visible' },
			{ x: 102, y: 122, name: 'Beside duplicator with Hobbes and Dupe visible' },
			{ x: 4, y: 122, name: 'Beside duplicator with nobody visible. Final scene' },
		]
	};

	var dupe = {
		positions: [
			{ x: 235, y: 122, name: 'Beside duplicator after boink with Calvin and Hobbes visible' },
			{ x: 270, y: 122, name: 'Beside transmogrifier on right side of screen by himself' }
		]
	};

	var hobbes = {
		positions: [
			{ x:106, y:132, name: 'Under the bed initial' },
			{ x:2, y:132, name: 'Under the bed initial' }
		]
	};


	var calvinWalk = {
		steps: [
			{x0:4, y0:0, x1:45, y1:71},
			{x0:50, y0:0, x1:91, y1:71},
			{x0:96, y0:0, x1:137, y1:71}
		],
		maskSteps: [
			{x0:0, y0:79, x1:45, y1:150},
			{x0:50, y0:79, x1:91, y1:150},
			{x0:96, y0:79, x1:137, y1:150}
		],
		getSprite: function(i, left_buf, right_buf) {
			left_buf = left_buf || 0;
			right_buf = right_buf || 0;
			return [this.steps[i].x0 - left_buf, this.steps[i].y0, this.steps[i].x1 + right_buf, this.steps[i].y1].join();
		},
		getMaskSprite: function(i, left_buf, right_buf) {
			left_buf = left_buf || 0;
			right_buf = right_buf || 0;
			return [this.maskSteps[i].x0 - left_buf, this.maskSteps[i].y0, this.maskSteps[i].x1 + right_buf, this.maskSteps[i].y1].join();
		}
	};


	var hobbesStill = {
		views: [
			{x0:106, y0:133, x1:160, y1:176},
		],
		eyes: {
			left: {},
			right: {
				offset: {x: 25, y: 19},
				normal: {x0:105, y0:84, x1:116, y1:91},
				closed: {x0:105, y0:76, x1:116, y1:82}
			}
		},
		mouth: {
			left: {},
			right: {
				offset: {x: 28, y: 35},
				open: {x0:96, y0:76, x1:103, y1:78},
				closed: {x0:96, y0:80, x1:103, y1:82}
	 		}
 		},
		getWidth: function(i) {
			return this.views[i].x1 - this.views[i].x0;
		},
		getHeight: function(i) {
			return this.views[i].y1 - this.views[i].y0;
		},
		getPart: function(part, orientation, f) {
			return [this[part][orientation][f].x0, this[part][orientation][f].y0, this[part][orientation][f].x1, this[part][orientation][f].y1].join();
		}
 	}


	var calvinStand = {
		views: [
			{x0:50, y0:102, x1:91, y1:173},
			{x0:96, y0:102, x1:137, y1:173}
		],
		eyes: {
			left: {
				offset: {x: 12, y: 19},
				normal: {x0:22, y0:102, x1:42, y1:112},
				upset: {x0:22, y0:114, x1:42, y1:124},
				sinister: {x0:22, y0:126, x1:42, y1:136},
				closed: {x0:22, y0:138, x1:42, y1:148}
	 		},
			right: {
				offset: {x: 17, y: 19},
				normal: {x0:22, y0:151, x1:42, y1:161},
				upset: {x0:22, y0:163, x1:42, y1:173},
				sinister: {x0:22, y0:175, x1:42, y1:185},
				closed: {x0:22, y0:187, x1:42, y1:197}
			}
		},
		nose: {
			left: {
				offset: {x: 12, y: 28},
				normal: {x0:0, y0:137, x1:20, y1:142},
				sinister: {x0:0, y0:144, x1:20, y1:149}
	 		},
			right: {
				offset: {x: 17, y: 28},
				normal: {x0:0, y0:186, x1:20, y1:191},
				sinister: {x0:0, y0:193, x1:20, y1:198}
			}
		},
		mouth: {
			left: {
				offset: {x: 12, y: 34},
				open_small: {x0:0, y0:102, x1:20, y1:107},
				closed: {x0:0, y0:109, x1:20, y1:114},
				open_big: {x0:0, y0:116, x1:20, y1:121},
				open_upset: {x0:0, y0:123, x1:20, y1:128},
				open_sinister: {x0:0, y0:130, x1:20, y1:135}
	 		},
			right: {
				offset: {x: 17, y: 34},
				open_small: {x0:0, y0:151, x1:20, y1:156},
				closed: {x0:0, y0:158, x1:20, y1:163},
				open_big: {x0:0, y0:165, x1:20, y1:170},
				open_upset: {x0:0, y0:172, x1:20, y1:177},
				open_sinister: {x0:0, y0:179, x1:20, y1:184}
			}
		},
		body: {
			left: {
				offset: {x: 4, y: 41},
				normal: {x0:50, y0:143, x1:91, y1:163},
				open_wide: {x0:4, y0:76, x1:45, y1:96},
				sinister: {x0:50, y0:76, x1:91, y1:96}
			},
			// We're reusing the open_wide and sinister bodies from left.
			right: {
				offset: {x: 4, y: 41},
				normal: {x0:96, y0:143, x1:137, y1:163},
				// normal: {x0:50, y0:143, x1:91, y1:163},
				open_wide: {x0:4, y0:76, x1:45, y1:96},
				sinister: {x0:50, y0:76, x1:91, y1:96}
			}
		},
		getWidth: function(i) {
			return this.views[i].x1 - this.views[i].x0;
		},
		getHeight: function(i) {
			return this.views[i].y1 - this.views[i].y0;
		},
		getSprite: function(i, left_buf, right_buf) {
			left_buf = left_buf || 0;
			right_buf = right_buf || 0;
			return [this.views[i].x0 - left_buf, this.views[i].y0, this.views[i].x1 + right_buf, this.views[i].y1].join();
		},
		getPart: function(part, orientation, f) {
			return [this[part][orientation][f].x0, this[part][orientation][f].y0, this[part][orientation][f].x1, this[part][orientation][f].y1].join();
		}
	};


	console.writeln('G#R>0,0:');

	// Ensure text colors are correct for title
	console.writeln('G#S>0,6,6,6:S>9,3,3,3:S>15,7,3,0:');


	if (!SKIP_FIRST_PART) {
		igs.writeTextGrfx( 1,  62, 'WHAT IF CALVIN', 1, 18, 0, 0);
		igs.writeTextGrfx( 1,  80, 'HAD OWNED', 1, 18, 0, 0);
		igs.writeTextGrfx( 1,  80, '          TWO', 15, 18, 0, 0);
		igs.writeTextGrfx( 1,  98, 'CARDBOARD BOXES?', 1, 18, 0, 0);

		igs.writeTextGrfx( 1, 134, 'This animation takes a while to start.', 9, 9, 0, 0);
		igs.writeTextGrfx( 1, 145, 'You may want to grab a coffee.', 9, 9, 0, 0);

		// After executing, writeTextGrfx() changes back to M>1. We need to un-do that.
		console.writeln('G#M>2:');


		if (!FAST) {
			igs.wait(5);
		}

	}


	// Avoid reloading the initial spritesheet if we've loaded it before.
	if (bbs.mods.calvin_loaded === undefined || bbs.mods.calvin_loaded === false) {
		var igFile = null;
		var f = new File(js.exec_dir + 'graphics' + '/' + 'CALVIN11.IG');
		f.open('r');
		var igFile = f.read();
		f.close();

		var lines = igFile.split('\r\n');

		for (var i=0; i<lines.length; i++) {
			console.writeln(lines[i]);
			// We need to print this to the screen after all colors have been set.
			if (i<23 && lines[i].indexOf('G#C>') == 0) {
				// WAIT MESSAGE
				// Set color 4 to dark gray. 
				// (Color 4 is not used in spritesheet, only in Hobbes drawing)
				console.writeln('G#S>4,3,3,3:');

				// writeTextGrfx: function(x, y, str, color, size, attr, deg)
				igs.writeTextGrfx(270, 175, 'please', 4, 8, 0, 0);
				igs.writeTextGrfx(270, 183, 'wait...', 4, 8, 0, 0);
				console.writeln('G#M>2:');

			}

			// Build in an intentional delay every 100 lines to allow the Atari buffer to clear out.
			if (i%100 == 0) {
				mswait(1500);
			}
		}

		// We need a good, long wait right here to let the Atari buffer catch up
		// to the instantaneous transfers from the BBS.
		if (!FAST) {
			mswait(45000);
		}
		else {
			mswait(12000);
		}

		// Add a button to the cardboard duplicator. This is NOT in the sprite sheet
		// since we need an unadorned carboard box later
		console.writeln('G#C>2,1:B>148,43,152,45,0:B>149,42,151,46,0:C>2,2:B>149,43,151,45,0:');

		// Blit the entire screen (spritesheet) to memory
		igs.scrnToMem(0,0,319,199);

		bbs.mods.calvin_loaded = true;
	}
	// If spritesheet is loaded, we still need to re-initialize screen parameters and color palette.
	// To do that, we'll load the IG file and execute only until we hit first color change command.
	else {
		var igFile = null;
		var f = new File(js.exec_dir + 'graphics' + '/' + 'CALVIN11.IG');
		f.open('r');
		var igFile = f.read();
		f.close();

		var lines = igFile.split('\r\n');

		for (var i=0; i<lines.length; i++) {
			if (lines[i].indexOf('G#C>') == 0) {
				break;
			}
			else {
				console.writeln(lines[i]);
			}
		}
	}


	// Erase the entire screen
	console.writeln('G#C>2,0:');
	console.writeln('G#Z>0,0,319,199,0:');



	// Only load Hobbes if we're showing the first part.
	if (!SKIP_FIRST_PART) {


		var igFile = null;
		var f = new File(js.exec_dir + 'graphics' + '/' + 'HOBBES.IG');
		f.open('r');
		var igFile = f.read();
		f.close();

		var lines = igFile.split('\r\n');

		// WAIT MESSAGE
		// Set color 3 to dark gray, and set color 4 to white.
		// (Color 3 is not used in Hobbes drawing, only in dino on spritesheet)
		console.writeln('G#S>3,3,3,3:S>4,6,6,6:');
		// writeTextGrfx: function(x, y, str, color, size, attr, deg)
		igs.writeTextGrfx(270, 175, 'please', 3, 8, 0, 0);
		igs.writeTextGrfx(270, 183, 'wait...', 3, 8, 0, 0);
		// After executing, writeTextGrfx() changes back to M>1. We need to un-do that.
		console.writeln('G#M>2:');

		for (var i=0; i<lines.length; i++) {
			console.writeln(lines[i]);
			// Build in an intentional delay every 100 lines to allow the Atari buffer to clear out.
			if (i%100 == 0) {
				mswait(1500);
			}
		}

		// We need a good, long wait right here to let the Atari buffer catch up
		// to the instantaneous transfers from the BBS.
		if (!FAST) {
			mswait(18000);
		}
		else {
			mswait(5000);
		}

	}


	// ALTER SOUND EFFECTS
	// -------------------


	// Hobbes really only has one state, but it's looking to the right.
	var hobbesEyesX = hobbes.positions[0].x + hobbesStill.eyes.right.offset.x;
	var hobbesEyesY = hobbes.positions[0].y + hobbesStill.eyes.right.offset.y;

	var hobbesMouthX = hobbes.positions[0].x + hobbesStill.mouth.right.offset.x;
	var hobbesMouthY = hobbes.positions[0].y + hobbesStill.mouth.right.offset.y;


	// Calvin begins looking to the left. But later we'll recalculate these
	// when he turns to look to the right.

	var calvinEyesX = calvin.positions[0].x + calvinStand.eyes.left.offset.x;
	var calvinEyesY = calvin.positions[0].y + calvinStand.eyes.left.offset.y;

	var calvinNoseX = calvin.positions[0].x + calvinStand.nose.left.offset.x;
	var calvinNoseY = calvin.positions[0].y + calvinStand.nose.left.offset.y;

	var calvinMouthX = calvin.positions[0].x + calvinStand.mouth.left.offset.x;
	var calvinMouthY = calvin.positions[0].y + calvinStand.mouth.left.offset.y;

	var calvinBodyX = calvin.positions[0].x + calvinStand.body.left.offset.x;
	var calvinBodyY = calvin.positions[0].y + calvinStand.body.left.offset.y;


	// The dupe begins looking to the left, at Calvin.

	var dupeEyesX = dupe.positions[0].x + calvinStand.eyes.left.offset.x;
	var dupeEyesY = dupe.positions[0].y + calvinStand.eyes.left.offset.y;

	var dupeNoseX = dupe.positions[0].x + calvinStand.nose.left.offset.x;
	var dupeNoseY = dupe.positions[0].y + calvinStand.nose.left.offset.y;

	var dupeMouthX = dupe.positions[0].x + calvinStand.mouth.left.offset.x;
	var dupeMouthY = dupe.positions[0].y + calvinStand.mouth.left.offset.y;

	var dupeBodyX = dupe.positions[0].x + calvinStand.body.left.offset.x;
	var dupeBodyY = dupe.positions[0].y + calvinStand.body.left.offset.y;



	if (!SKIP_FIRST_PART) {
		// Blit the cardboard duplicator back to the screen, using mode 3 (Replace)
		igs.memToScrn(duplicator.sprite.x0, duplicator.sprite.y0, duplicator.sprite.x1, duplicator.sprite.y1, duplicator.positions[0].x, duplicator.positions[0].y, 3);

		// Blit the standing Calvin sprite to the screen in Replace mode, facing left toward Hobbes
		console.writeln('G#G>3,3,'+calvinStand.getSprite(0,4)+','+calvin.positions[0].x+','+calvin.positions[0].y+':');

		// // Experimental: Blit the Calvin sprite to the screen in replace mode, using a loop to flip the sprite horizontally.
		// console.writeln('G#&>0,41,1,0,G,8,3,3,!91,0,!91,71,+200,122:');


		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'closed')+','+calvinMouthX+','+calvinMouthY+':');

		console.writeln('G#G>3,3,'+hobbesStill.getPart('eyes', 'right', 'closed')+','+hobbesEyesX+','+hobbesEyesY+':');
	}


	igs.vsyncWait(0.016666666667);

	// Bring in the colors
	console.writeln('G#S>0,6,6,6:S>1,3,3,3:S>2,5,0,0:S>3,1,1,0:');
	console.writeln('G#S>4,5,5,7:S>5,7,6,5:S>6,6,6,3:S>7,5,5,3:');
	console.writeln('G#S>8,5,5,5:S>9,7,5,6:S>10,7,7,7:S>11,2,2,1:');
	console.writeln('G#S>12,5,5,7:S>13,7,6,3:S>14,6,6,4:S>15,7,5,2:');

	igs.vsyncWait(0.016666666667);

	console.writeln('G#S>0,6,6,6:S>1,0,0,0:S>2,5,0,0:S>3,2,2,0:');
	console.writeln('G#S>4,3,3,7:S>5,7,6,5:S>6,6,4,0:S>7,5,3,0:');
	console.writeln('G#S>8,5,5,5:S>9,7,4,5:S>10,7,7,7:S>11,3,3,2:');
	console.writeln('G#S>12,5,5,7:S>13,7,6,0:S>14,6,5,3:S>15,7,3,0:');



	if (!SKIP_FIRST_PART) {
		// function dialog(x, y, w, str, size, wait)
		// Includes built-in word-wrap, constraining text to the specified width

		// Calvin dialog
		dialog(
			200, // x
			78,  // y
			14,  // w (chars)
			'Hobbes, want to see my latest invention?', //str
			9, // font size
			10, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_small'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		console.writeln('G#G>3,3,'+hobbesStill.getPart('eyes', 'right', 'normal')+','+hobbesEyesX+','+hobbesEyesY+':');

		if (!FAST) {
			igs.vsyncWait(0.5);
		}


		// console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'closed')+','+calvinMouthX+','+calvinMouthY+':');

		// Hobbes dialog
		dialog(
			50, // x
			64,  // y
			16,  // w
			'What is it?', //str
			9, // font size
			3, // num syllables
			hobbesStill.getPart('mouth', 'right', 'closed'), // mouth_closed
			hobbesStill.getPart('mouth', 'right', 'open'), // mouth_open
			hobbesMouthX, // mouth dx
			hobbesMouthY // mouth dy
		);

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'open_wide')+','+calvinBodyX+','+calvinBodyY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'open_big')+','+calvinMouthX+','+calvinMouthY+':');

		// Calvin dialog
		dialog(
			200, // x
			78,  // y
			14,  // w
			"It's a duplicator.", //str
			9, // font size
			6, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_big'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		if (!FAST) {
			igs.vsyncWait(1);
		}

		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'sinister')+','+calvinBodyX+','+calvinBodyY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'sinister')+','+calvinEyesX+','+calvinEyesY+':');

		// Calvin dialog
		dialog(
			200, // x
			78,  // y
			14,  // w
			"I can duplicate myself, and make the dupe do all my chores!", //str
			9, // font size
			15, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_big'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);


		console.writeln('G#G>3,3,'+calvinStand.getPart('nose', 'left', 'sinister')+','+calvinNoseX+','+calvinNoseY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'open_sinister')+','+calvinMouthX+','+calvinMouthY+':');

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		// Calvin dialog, no moving mouth
		dialog(
			200, // x
			78,  // y
			14,  // w
			"Heh heh heh!", //str
			9, // font size
			15 // num syllables
		);

		console.writeln('G#G>3,3,'+calvinStand.getPart('nose', 'left', 'normal')+','+calvinNoseX+','+calvinNoseY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'closed')+','+calvinMouthX+','+calvinMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'normal')+','+calvinBodyX+','+calvinBodyY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'closed')+','+calvinEyesX+','+calvinEyesY+':');

		if (!FAST) {
			igs.vsyncWait(0.25);
		}

		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'normal')+','+calvinEyesX+','+calvinEyesY+':');

		// Hobbes dialog
		dialog(
			50, // x
			64,  // y
			16,  // w
			"Are you sure that's a good idea?", //str
			9, // font size
			9, // num syllables
			hobbesStill.getPart('mouth', 'right', 'closed'), // mouth_closed
			hobbesStill.getPart('mouth', 'right', 'open'), // mouth_open
			hobbesMouthX, // mouth dx
			hobbesMouthY // mouth dy
		);

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'upset')+','+calvinEyesX+','+calvinEyesY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'open_upset')+','+calvinMouthX+','+calvinMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'open_wide')+','+calvinBodyX+','+calvinBodyY+':');

		// Calvin dialog
		dialog(
			200, // x
			78,  // y
			16,  // w
			"Of course!", //str
			9, // font size
			2 // num syllables
		);

		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'closed')+','+calvinEyesX+','+calvinEyesY+':');

		if (!FAST) {
			igs.vsyncWait(0.25);
		}

		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'normal')+','+calvinEyesX+','+calvinEyesY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'closed')+','+calvinMouthX+','+calvinMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'normal')+','+calvinBodyX+','+calvinBodyY+':');

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		// Hobbes dialog
		dialog(
			50, // x
			64,  // y
			16,  // w
			"I'm staying here, just in case.", //str
			9, // font size
			7, // num syllables
			hobbesStill.getPart('mouth', 'right', 'closed'), // mouth_closed
			hobbesStill.getPart('mouth', 'right', 'open'), // mouth_open
			hobbesMouthX, // mouth dx
			hobbesMouthY // mouth dy
		);

		if (!FAST) {
			igs.vsyncWait(0.5);
		}


		// Calvin dialog
		dialog(
			200, // x
			78,  // y
			16,  // w
			"You doubting Thomases.", //str
			9, // font size
			6, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_small'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		// Calvin dialog
		dialog(
			200, // x
			78,  // y
			16,  // w
			"Here goes...", //str
			9, // font size
			2, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_small'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		// Close Hobbes eyes
		console.writeln('G#G>3,3,'+hobbesStill.getPart('eyes', 'right', 'closed')+','+hobbesEyesX+','+hobbesEyesY+':');

		// Blit the standing Calvin sprite to the screen in Replace mode, facing right toward box
		console.writeln('G#G>3,3,'+calvinStand.getSprite(1,4)+','+calvin.positions[0].x+','+calvin.positions[0].y+':');

		if (!FAST) {
			igs.wait(1);
		}


		// Blit the side-view walking Calvin sprite to the screen in Replace mode, facing right toward box
		console.writeln('G#G>3,3,'+calvinWalk.getSprite(1,4)+','+calvin.positions[0].x+','+calvin.positions[0].y+':');

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		// Blit pointy finger
		igs.memToScrn(121, 77, 137, 85, 234, 166, 3);

		// EXTEND FINGER
		// 0. Blit most of bottom part of the screen and move it left 2px.
		// 1. Blit cardboard box from memory to screen.
		console.writeln('G#&>0,4,1,2,G,8,3,3,127,77,137,85,+240,166:');

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		// Blit the "BOINK" to the screen, using mode 3 (Replace)
		igs.memToScrn(50, 181, 86, 199, 270, 85, 3);
		igs.stopSound();
		igs.playSound(11);


		// RETRACT FINGER
		console.writeln('G#&>0,4,1,2,G,8,3,3,127,77,138,85,!244,166:');
		
		if (!FAST) {
			igs.vsyncWait(0.25);
		}

		// Blit the side-view walking Calvin sprite to the screen in Replace mode, facing right toward box
		console.writeln('G#G>3,3,'+calvinWalk.getSprite(1,4)+','+calvin.positions[0].x+','+calvin.positions[0].y+':');

		// Open Hobbes eyes
		console.writeln('G#G>3,3,'+hobbesStill.getPart('eyes', 'right', 'normal')+','+hobbesEyesX+','+hobbesEyesY+':');

		if (!FAST) {
			igs.vsyncWait(0.75);
		}

		// Erase the "BOINK" by XOR blitting
		igs.memToScrn(50, 181, 86, 199, 270, 85, 6);

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		// SCROLL TO THE LEFT PARTWAY, KEEPING HOBBES IN VIEW.
		// NEW ROUTINE THAT OMITS MASKS
		// 0. Blit most of bottom part of the screen and move it left 2px.
		// 1. Blit cardboard box from memory to screen.
		console.writeln('G#&>0,102,2,2,G,16,0,3,2,70,!319,199,0,70:3,3,'+duplicator.getSprite(0,2)+',!'+(duplicator.positions[0].x-2)+','+duplicator.positions[0].y+':');


		if (!FAST) {
			igs.vsyncWait(0.25);
		}

		// Blit the standing Calvin sprite to the screen in Replace mode, facing right toward Dupe
		console.writeln('G#G>3,3,'+calvinStand.getSprite(1,4)+','+calvin.positions[1].x+','+calvin.positions[1].y+':');

		// Blit the standing Dupe sprite to the screen in Replace mode, facing left toward Calvin and Hobbes
		console.writeln('G#G>3,3,'+calvinStand.getSprite(0,4)+','+dupe.positions[0].x+','+dupe.positions[0].y+':');

		if (!FAST) {
			igs.wait(1);
		}

		calvinEyesX -= 104;
		calvinNoseX -= 104;
		calvinMouthX -= 104;
		calvinBodyX -= 104;

		hobbesEyesX -= 104;
		hobbesMouthX -= 104;


		// Hobbes dialog
		dialog(
			4, // x
			64,  // y
			16,  // w
			"Did it work?", //str
			9, // font size
			3, // num syllables
			hobbesStill.getPart('mouth', 'right', 'closed'), // mouth_closed
			hobbesStill.getPart('mouth', 'right', 'open'), // mouth_open
			hobbesMouthX, // mouth dx
			hobbesMouthY // mouth dy
		);

		if (!FAST) {
			igs.wait(1);
		}

		// Blit the standing Calvin sprite to the screen in Replace mode, facing left toward Hobbes
		console.writeln('G#G>3,3,'+calvinStand.getSprite(0,4)+','+calvin.positions[1].x+','+calvin.positions[1].y+':');

		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'open_big')+','+calvinMouthX+','+calvinMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'open_wide')+','+calvinBodyX+','+calvinBodyY+':');

		// Calvin dialog
		dialog(
			110, // x
			80,  // y
			12,  // w
			"YES!", //str
			9, // font size
			1, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_small'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		if (!FAST) {
			igs.vsyncWait(0.5);
		}
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'normal')+','+calvinBodyX+','+calvinBodyY+':');

		// Calvin dialog
		dialog(
			110, // x
			80,  // y
			12,  // w
			"I'm a genius!", //str
			9, // font size
			5, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_big'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		if (!FAST) {
			igs.vsyncWait(0.5);
		}


		// Recalculate positions based on RIGHT offset, since Calvin is now facing right.
		calvinMouthX = calvin.positions[1].x + calvinStand.mouth.right.offset.x;
		calvinMouthY = calvin.positions[1].y + calvinStand.mouth.right.offset.y;

		calvinEyesX = calvin.positions[1].x + calvinStand.eyes.right.offset.x;
		calvinEyesY = calvin.positions[1].y + calvinStand.eyes.right.offset.y;

		calvinNoseX = calvin.positions[1].x + calvinStand.nose.right.offset.x;
		calvinNoseY = calvin.positions[1].y + calvinStand.nose.right.offset.y;

		calvinBodyX = calvin.positions[1].x + calvinStand.body.right.offset.x;
		calvinBodyY = calvin.positions[1].y + calvinStand.body.right.offset.y;


		// Blit the standing Calvin sprite to the screen in Replace mode, facing right toward Dupe
		console.writeln('G#G>3,3,'+calvinStand.getSprite(1,4)+','+calvin.positions[1].x+','+calvin.positions[1].y+':');

		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'right', 'open_big')+','+calvinMouthX+','+calvinMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'open_wide')+','+calvinBodyX+','+calvinBodyY+':');



		// Calvin dialog
		dialog(
			110, // x
			80,  // y
			12,  // w
			"OK, dupe! Time to clean my room.", //str
			9, // font size
			8, // num syllables
			calvinStand.getPart('mouth', 'right', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'right', 'open_big'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'closed')+','+calvinEyesX+','+calvinEyesY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'sinister')+','+calvinBodyX+','+calvinBodyY+':');

		// Dupe reaction
		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'upset')+','+dupeEyesX+','+dupeEyesY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'open_upset')+','+dupeMouthX+','+dupeMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'open_wide')+','+dupeBodyX+','+dupeBodyY+':');

		// Calvin dialog
		dialog(
			110, // x
			80,  // y
			12,  // w
			"When you finish, you can do my homework.", //str
			9, // font size
			10, // num syllables
			calvinStand.getPart('mouth', 'right', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'right', 'open_big'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		// Put Calvin's arms down
		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'normal')+','+calvinEyesX+','+calvinEyesY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'right', 'closed')+','+calvinMouthX+','+calvinMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'normal')+','+calvinBodyX+','+calvinBodyY+':');

		// Dupe reaction
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'normal')+','+dupeBodyX+','+dupeBodyY+':');


		// Dupe dialog
		dialog(
			220, // x
			80,  // y
			12,  // w
			"Forget it, sucker.", //str
			9, // font size
			5, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_small'), // mouth_open
			dupeMouthX, // mouth dx
			dupeMouthY // mouth dy
		);

		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'sinister')+','+dupeEyesX+','+dupeEyesY+':');

		// Dupe dialog
		dialog(
			220, // x
			80,  // y
			12,  // w
			"I've got a better idea!", //str
			9, // font size
			5, // num syllables
			calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'left', 'open_big'), // mouth_open
			dupeMouthX, // mouth dx
			dupeMouthY // mouth dy
		);

		console.writeln('G#G>3,3,'+calvinStand.getPart('nose', 'left', 'sinister')+','+dupeNoseX+','+dupeNoseY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'open_sinister')+','+dupeMouthX+','+dupeMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'sinister')+','+dupeBodyX+','+dupeBodyY+':');

		// Dupe dialog
		dialog(
			220, // x
			80,  // y
			12,  // w
			"Heh heh heh!", //str
			9, // font size
			3 // num syllables
		);

		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'closed')+','+dupeEyesX+','+dupeEyesY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('nose', 'left', 'normal')+','+dupeNoseX+','+dupeNoseY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'closed')+','+dupeMouthX+','+dupeMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'normal')+','+dupeBodyX+','+dupeBodyY+':');

		if (!FAST) {
			igs.vsyncWait(0.25);
		}

		// Blit the standing Dupe sprite to the screen in Replace mode, facing right away from Calvin and Hobbes
		console.writeln('G#G>3,3,'+calvinStand.getSprite(1,4)+','+dupe.positions[0].x+','+dupe.positions[0].y+':');

		if (!FAST) {
			igs.vsyncWait(0.1);
		}

		// Blit the walk Calvin sprite to the screen in Replace mode, facing away from Calvin
		console.writeln('G#G>3,3,'+calvinWalk.getSprite(1,4)+','+dupe.positions[0].x+','+dupe.positions[0].y+':');


		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'upset')+','+calvinEyesX+','+calvinEyesY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'right', 'open_upset')+','+calvinMouthX+','+calvinMouthY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'normal')+','+calvinBodyX+','+calvinBodyY+':');


		// igs.wait(1);

		var start_x = dupe.positions[0].x;
		// var start_x = 126;
		var start_y = dupe.positions[0].y;

		var end_x = 322;
		// var end_x = 320;
		var end_y = dupe.positions[0].y;

		var num_frames = (end_x - start_x);
		var num_steps = 2;
		var move_amt = 4;

		var sprite_w = 44;
		var sprite_h = 71;

		// Step array. These values will rotate.
		var evenSteps = [0,2];

		// Set fill and line color to match the background color
		console.writeln('G#C>2,0:');
		console.writeln('G#C>1,0:');

		// I have three "frames" for Calvin's walk: a,b,c.
		// The 2nd frame (b) will always be the second step.
		// But we need to rotate the first step between 
		// the 1st frame (a, right foot back) and 3rd frame (c, right foot forward).
		//
		// The sequence should go back and forth:  a,b, c,b, a,b, c,b.
		//
		// The sequence should NOT be repeating:   a,b,c, a,b,c, a,b,c.


		for (var f=0; f<num_frames; f+=(num_steps*move_amt)) {

			for (var s=0; s<num_steps; s++) {
				// Figure out which evenStep we need for the walk.
				var i = 1;
				if (s == 0) {
					i = evenSteps[0];
					// Rotate the step array
					evenSteps.push(evenSteps.shift());
				}

				var x1 = start_x + f + (s * move_amt);
				var x2 = start_x + f + (s * move_amt) + sprite_w;

				var y1 = start_y;
				var y2 = start_y + sprite_h;

				var prev_x1 = x1;
				if (f>0) {
					prev_x1 = x1 - 2;
				}

				// // !!! ORIGINAL BLIT ROUTINE THAT WORKED WITH MASK STEPS !!!
				// console.writeln('G#&>0,1,1,0,>ZGGG@,28,0Z180,108,319,199,1G3,3,190,0,317,91,53,106:2G3,4,'+calvin.maskSteps[i]+','+x1+','+y1+':3G3,7,'+calvin.steps[i]+','+x1+','+y1+':');

				// NEW ROUTINE THAT OMITS MASKS
				// 1. Blit cardboard box from memory to screen.
				// 2. Blit Calvin sprite at given step at new position.
				console.writeln('G#&>0,1,1,4,>G@,16,0G3,3,'+duplicator.getSprite(0,4)+','+duplicator.positions[1].x+','+duplicator.positions[1].y+':0G3,3,'+calvinWalk.getSprite(i,4)+','+x1+','+y1+':');
			}

		}


		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'closed')+','+calvinEyesX+','+calvinEyesY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'right', 'closed')+','+calvinMouthX+','+calvinMouthY+':');

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'upset')+','+calvinEyesX+','+calvinEyesY+':');

		if (!FAST) {
			igs.vsyncWait(0.5);
		}


		// Hobbes dialog
		dialog(
			4, // x
			64,  // y
			16,  // w
			"Gee, who would've predicted that?", //str
			9, // font size
			8, // num syllables
			hobbesStill.getPart('mouth', 'right', 'closed'), // mouth_closed
			hobbesStill.getPart('mouth', 'right', 'open'), // mouth_open
			hobbesMouthX, // mouth dx
			hobbesMouthY // mouth dy
		);

		igs.vsyncWait(0.25);


		// Calvin dialog
		dialog(
			110, // x
			80,  // y
			20,  // w
			"Wait! Come back!", //str
			9, // font size
			3, // num syllables
			calvinStand.getPart('mouth', 'right', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'right', 'open_big'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		if (!FAST) {
			igs.vsyncWait(1);
		}

		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'open_wide')+','+calvinBodyX+','+calvinBodyY+':');
		console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'normal')+','+calvinEyesX+','+calvinEyesY+':');


		// Calvin dialog
		dialog(
			110, // x
			80,  // y
			20,  // w
			"What are you ... ?", //str
			9, // font size
			3, // num syllables
			calvinStand.getPart('mouth', 'right', 'closed'), // mouth_closed
			calvinStand.getPart('mouth', 'right', 'open_upset'), // mouth_open
			calvinMouthX, // mouth dx
			calvinMouthY // mouth dy
		);

		console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'normal')+','+calvinBodyX+','+calvinBodyY+':');

		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		// We'll put a good long wait here to let the Atari buffer catch up.
		mswait(20000);


		// SCROLL TO THE LEFT, TAKING CALVIN OFF SCREEN.
		// 0. Blit most of bottom part of the screen and move it left 2px.
		console.writeln('G#&>0,236,2,2,G,8,0,3,2,80,!238,199,!0,80:');

	} // end of if-statement enclosing the first part.


	// SCROLL TRANSMOGRIFIER AND DUPE INTO VIEW FROM THE RIGHT.
	var transmog_dist = 319 - transmog.positions[0].x;
	var dupe_dist_from_transmog = 319 + (dupe.positions[1].x - transmog.positions[0].x);
	console.writeln('G#&>0,'+transmog_dist+',2,2,G,16,3,3,'+transmog.getSprite(0,2)+',!319,'+transmog.positions[0].y+':3,3,'+calvinStand.getSprite(0,0,2)+',!'+dupe_dist_from_transmog+','+dupe.positions[1].y+':');

	// // Blit Transmog and Dupe to final positions.
	// console.writeln('G#&>0,1,0,0,G,16,3,3,'+transmog.getSprite(0,2)+','+transmog.positions[0].x+','+transmog.positions[0].y+':3,3,'+calvinStand.getSprite(0,0,2)+','+dupe.positions[1].x+','+dupe.positions[1].y+':');

	// Recalculate Dupe offsets now that we've moved him.
	dupeEyesX = dupe.positions[1].x + calvinStand.eyes.left.offset.x - 5;
	dupeEyesY = dupe.positions[1].y + calvinStand.eyes.left.offset.y;

	dupeNoseX = dupe.positions[1].x + calvinStand.nose.left.offset.x - 5;
	dupeNoseY = dupe.positions[1].y + calvinStand.nose.left.offset.y;

	dupeMouthX = dupe.positions[1].x + calvinStand.mouth.left.offset.x - 5;
	dupeMouthY = dupe.positions[1].y + calvinStand.mouth.left.offset.y;

	dupeBodyX = dupe.positions[1].x + calvinStand.body.left.offset.x - 5;
	dupeBodyY = dupe.positions[1].y + calvinStand.body.left.offset.y;

	if (!FAST) {
		mswait(20000);
	}

	console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'left', 'sinister')+','+dupeEyesX+','+dupeEyesY+':');
	console.writeln('G#G>3,3,'+calvinStand.getPart('nose', 'left', 'sinister')+','+dupeNoseX+','+dupeNoseY+':');
	console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'open_sinister')+','+dupeMouthX+','+dupeMouthY+':');
	console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'left', 'sinister')+','+dupeBodyX+','+dupeBodyY+':');


	// Dupe dialog
	dialog(
		220, // x
		100,  // y
		12,  // w
		"Heh heh heh!", //str
		9, // font size
		10 // num syllables
	);

	if (!FAST) {
		igs.vsyncWait(0.5);
	}

	console.writeln('G#G>3,3,'+calvinStand.getPart('nose', 'left', 'normal')+','+dupeNoseX+','+dupeNoseY+':');
	console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'left', 'open_upset')+','+dupeMouthX+','+dupeMouthY+':');


	// Dupe dialog
	dialog(
		220, // x
		80,  // y
		12,  // w
		"Thanks, Calvin!", //str
		9, // font size
		3, // num syllables
		calvinStand.getPart('mouth', 'left', 'closed'), // mouth_closed
		calvinStand.getPart('mouth', 'left', 'open_upset'), // mouth_open
		dupeMouthX, // mouth dx
		dupeMouthY // mouth dy
	);

	if (!FAST) {
		igs.vsyncWait(1.5);
	}


	var scroll_start = transmog.positions[0].x - 4;
	var scroll_amt = 320 - scroll_start;

	// SCROLL TO THE RIGHT, TAKING DUPE OFF SCREEN.
	console.writeln('G#&>0,'+scroll_amt+',2,2,G,8,0,3,+'+scroll_start+',80,319,199,+'+(scroll_start+2)+',80:');

	if (!FAST) {
		igs.vsyncWait(0.5);
	}


	// SCROLL DUPLICATOR AND CALVIN INTO VIEW FROM THE LEFT.
	var duplicator_w = duplicator.getWidth() + 4; // 4px buffer on left
	var duplicator_h = duplicator.getHeight();
	var calvin_w = calvinStand.getWidth(1) + 4; // 4px buffer on left

	// Scroll in the duplicator
	debugWriteLn('G#&>0,'+duplicator_w+',2,2,G,8,3,3,!'+duplicator.sprite.x1+','+duplicator.sprite.y0+','+duplicator.sprite.x1+','+duplicator.sprite.y1+',0,'+duplicator.positions[2].y+':');

	// Scroll in Calvin while also moving the duplicator
	debugWriteLn('G#&>0,'+calvin_w+',2,2,G,16,0,3,0,'+duplicator.positions[2].y+','+(duplicator_w+calvin_w+2)+','+(duplicator.positions[2].y+duplicator_h)+',2,'+duplicator.positions[2].y+':3,3,!'+calvinStand.views[1].x1+','+calvinStand.views[1].y0+','+calvinStand.views[1].x1+','+calvinStand.views[1].y1+',0,'+calvin.positions[2].y+':');


	// Blit Transmog and Dupe to final positions.
	console.writeln('G#&>0,1,0,0,G,16,3,3,'+duplicator.getSprite(0,2)+','+duplicator.positions[2].x+','+duplicator.positions[2].y+':3,3,'+calvinStand.getSprite(1,0,0)+','+calvin.positions[2].x+','+calvin.positions[2].y+':');


	// Recalculate Calvin's positions.
	calvinEyesX = calvin.positions[2].x + calvinStand.eyes.left.offset.x + 1;
	calvinEyesY = calvin.positions[2].y + calvinStand.eyes.left.offset.y;

	calvinNoseX = calvin.positions[2].x + calvinStand.nose.left.offset.x + 1;
	calvinNoseY = calvin.positions[2].y + calvinStand.nose.left.offset.y;

	calvinMouthX = calvin.positions[2].x + calvinStand.mouth.left.offset.x + 1;
	calvinMouthY = calvin.positions[2].y + calvinStand.mouth.left.offset.y;

	calvinBodyX = calvin.positions[2].x + calvinStand.body.left.offset.x - 4;
	calvinBodyY = calvin.positions[2].y + calvinStand.body.left.offset.y;

	console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'open_wide')+','+calvinBodyX+','+calvinBodyY+':');
	console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'upset')+','+calvinEyesX+','+calvinEyesY+':');
	console.writeln('G#G>3,3,'+calvinStand.getPart('nose', 'right', 'normal')+','+calvinNoseX+','+calvinNoseY+':');


	// Calvin dialog
	dialog(
		4, // x
		80,  // y
		16,  // w
		"Stay away from my transmogrifier!", //str
		9, // font size
		10, // num syllables
		calvinStand.getPart('mouth', 'right', 'closed'), // mouth_closed
		calvinStand.getPart('mouth', 'right', 'open_upset'), // mouth_open
		calvinMouthX, // mouth dx
		calvinMouthY // mouth dy
	);


	// Dupe dialog
	dialog(
		244, // x
		80,  // y
		10,  // w
		"Too late, Calvin!", //str
		9, // font size
		4 // num syllables
	);


	if (!FAST) {
		igs.vsyncWait(0.5);
	}


	console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'closed')+','+calvinEyesX+','+calvinEyesY+':');
	console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'normal')+','+calvinBodyX+','+calvinBodyY+':');


	igs.vsyncWait(0.5);


	// Blit the "ZAP" to the screen, using mode 3 (Replace)
	igs.memToScrn(99, 181, 136, 199, 270, 100, 3);
	igs.stopSound();
	igs.playSound(7);


	igs.vsyncWait(0.25);

	// Open Calvin eyes
	console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'normal')+','+calvinEyesX+','+calvinEyesY+':');
	console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'normal')+','+calvinBodyX+','+calvinBodyY+':');

	if (!SKIP_FIRST_PART) {
		// Alter the center CalvinWalk sprite to have a curious/uncertain look by making a memory-to-memory blit.
		console.writeln('G#G>4,3,147,145,162,153,67,33:G>4,3,147,137,161,141,70,17:')
	}

	if (!FAST) {
		igs.vsyncWait(1);
	}

	// Erase the "ZAP" by XOR blitting
	igs.memToScrn(99, 181, 136, 199, 270, 100, 6);

	if (!FAST) {
		igs.vsyncWait(0.5);
	}


	// His reaction immediately after the "zap" should be "What...?" with a confused face

	// Blit the side-view walking Calvin sprite to the screen in Replace mode, facing right toward dino
	console.writeln('G#G>3,3,'+calvinWalk.getSprite(1,0,4)+','+calvin.positions[2].x+','+calvin.positions[2].y+':');

	// These blits are only necessary the first time we run this.
	if (!SKIP_FIRST_PART) {
		// Alter all the CalvinWalk sprites to a scared pose by making memory-to-memory blits.
		console.writeln('G#G>4,3,277,149,319,199,4,2:G>4,3,277,149,319,199,50,0:G>4,3,277,149,319,199,96,1:');
		console.writeln('G#G>4,3,121,88,130,96,64,43:G>4,3,132,88,140,96,110,44:');

		// Now that we've copied all the Calvin bits floating around the dino, 
		// we need to delete them so we can blit the entire Dino.
		console.writeln('G#G>4,3,163,137,178,153,147,137:G>4,3,134,124,184,174,269,149:');
	}

	// console.writeln('G#G>3,3,'+calvinStand.getPart('eyes', 'right', 'upset')+','+calvinEyesX+','+calvinEyesY+':');
	// console.writeln('G#G>3,3,'+calvinStand.getPart('mouth', 'right', 'open_upset')+','+calvinMouthX+','+calvinMouthY+':');
	// console.writeln('G#G>3,3,'+calvinStand.getPart('body', 'right', 'open_wide')+','+calvinBodyX+','+calvinBodyY+':');

	// Calvin dialog
	dialog(
		4, // x
		80,  // y
		16,  // w
		"What...?", //str
		9, // font size
		4 // num syllables
	);


	if (!SKIP_FIRST_PART) {
		// Alter the sprite sheet: Remove the duplicator
		console.writeln('G#&>0,70,10,0,G,8,4,3,141,68,225,80,141,x:');

		// Alter the sprite sheet: Copy top of transmogrifier and put on top of dino.
		console.writeln('G#G>4,3,236,5,304,48,149,40:');

		// Alter the sprite sheet: Remove the original transmogrifier
		console.writeln('G#&>0,50,10,0,G,8,4,3,138,0,228,35,229,x:');
	}



	function dino_jump(p) {

		// Dino roar
		igs.stopSound();
		igs.playSound(3);
		if (!FAST) {
			igs.vsyncWait(0.5);
		}

		// Dino jump.
		// First, push down by cutting 4 rows
		console.writeln('G#&>0,1,1,0,G,16,0,3,149,0,319,168,149,2:0,3,149,0,319,156,149,2:');

		if (!FAST) {
			igs.vsyncWait(0.01666666667);
		}

		// Restore original sprite
		console.writeln('G#G>3,3,'+dino.getSprite(4,4,4,4)+','+dino.positions[p].x+','+dino.positions[p].y+':');


		if (!FAST) {
			igs.vsyncWait(0.01666666667);
		}

		// DINO RISE
		console.writeln('G#&>0,30,2,0,G,8,3,3,'+dino.getSprite(4,4,4,4)+',!'+(dino.positions[p].x)+',!'+(dino.positions[p].y)+':');

		// DINO RETURN
		console.writeln('G#&>0,30,2,0,G,8,3,3,'+dino.getSprite(4,4,4,4)+',!'+(dino.positions[p].x - 30)+',+'+(dino.positions[p].y - 30)+':');

		// Restore original dino sprite
		console.writeln('G#G>3,3,'+dino.getSprite(4,4,4,4)+','+dino.positions[p+1].x+','+dino.positions[p+1].y+':');

		// Boom sound
		igs.playSound(5);

		// BOX RISE
		console.writeln('G#&>0,5,1,3,G,8,0,3,0,100,139,199,0,!100:');
		if (!FAST) {
			igs.vsyncWait(0.2);
		}
		// BOX RETURN
		console.writeln('G#&>0,5,1,1,G,8,0,3,0,90,139,199,0,+90:');

	}

	// Invoke first dino jump, onto the screen
	dino_jump(0);



	// Blit the side-view walking Calvin sprite to the screen in Replace mode, facing right toward dino
	console.writeln('G#G>3,3,'+calvinWalk.getSprite(1,0,4)+','+calvin.positions[2].x+','+calvin.positions[2].y+':');

	// Calvin dialog
	dialog(
		4, // x
		80,  // y
		16,  // w
		"AUGH!!!!!!", //str
		18, // font size
		10 // num syllables
	);

	if (!FAST) {
		igs.vsyncWait(0.75);
	}

	// Calvin dialog
	dialog(
		4, // x
		80,  // y
		14,  // w
		"Hobbes, quick! Make room for me!", //str
		9, // font size
		10 // num syllables
	);

	if (!FAST) {
		igs.vsyncWait(1.25);
	}


	// !!!!!!!!!!!!!!!!!!!!!
	// ANIMATE CALVIN WALKING BACKWARDS OFF SCREEN
	//
	// I don't think I'll write this in a js loop. I'll just write each G> command separately
	// since there won't be that many steps. I'll have to determine the sprite cuts by hand
	// but it shouldn't be too much work.
	// !!!!!!!!!!!!!!!!!!!!!


	// console.writeln(
	// 	'G#&>0,48,16,4,G,32,'+
	// 	'3,3,+'+(calvinWalk.steps[0].x0 + 0)+','+calvinWalk.steps[0].y0+','+(calvinWalk.steps[0].x1 + 4)+','+calvinWalk.steps[0].y1+',0,'+calvin.positions[2].y+':'+
	// 	'3,3,+'+(calvinWalk.steps[1].x0 + 4)+','+calvinWalk.steps[1].y0+','+(calvinWalk.steps[1].x1 + 4)+','+calvinWalk.steps[1].y1+',0,'+calvin.positions[2].y+':'+
	// 	'3,3,+'+(calvinWalk.steps[2].x0 + 8)+','+calvinWalk.steps[2].y0+','+(calvinWalk.steps[2].x1 + 4)+','+calvinWalk.steps[2].y1+',0,'+calvin.positions[2].y+':'+
	// 	'3,3,+'+(calvinWalk.steps[1].x0 + 12)+','+calvinWalk.steps[1].y0+','+(calvinWalk.steps[1].x1 + 4)+','+calvinWalk.steps[1].y1+',0,'+calvin.positions[2].y+':'
	// );


	console.writeln('G#G>3,3,'+(calvinWalk.steps[0].x0 + 0)+','+calvinWalk.steps[0].y0+','+(calvinWalk.steps[0].x1 + 4)+','+calvinWalk.steps[0].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[1].x0 + 4)+','+calvinWalk.steps[1].y0+','+(calvinWalk.steps[1].x1 + 4)+','+calvinWalk.steps[1].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[2].x0 + 8)+','+calvinWalk.steps[2].y0+','+(calvinWalk.steps[2].x1 + 4)+','+calvinWalk.steps[2].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[1].x0 + 12)+','+calvinWalk.steps[1].y0+','+(calvinWalk.steps[1].x1 + 4)+','+calvinWalk.steps[1].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}

	console.writeln('G#G>3,3,'+(calvinWalk.steps[0].x0 + 16)+','+calvinWalk.steps[0].y0+','+(calvinWalk.steps[0].x1 + 4)+','+calvinWalk.steps[0].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[1].x0 + 20)+','+calvinWalk.steps[1].y0+','+(calvinWalk.steps[1].x1 + 4)+','+calvinWalk.steps[1].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[2].x0 + 24)+','+calvinWalk.steps[2].y0+','+(calvinWalk.steps[2].x1 + 4)+','+calvinWalk.steps[2].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[1].x0 + 28)+','+calvinWalk.steps[1].y0+','+(calvinWalk.steps[1].x1 + 4)+','+calvinWalk.steps[1].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}

	console.writeln('G#G>3,3,'+(calvinWalk.steps[0].x0 + 32)+','+calvinWalk.steps[0].y0+','+(calvinWalk.steps[0].x1 + 4)+','+calvinWalk.steps[0].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[1].x0 + 36)+','+calvinWalk.steps[1].y0+','+(calvinWalk.steps[1].x1 + 4)+','+calvinWalk.steps[1].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[2].x0 + 40)+','+calvinWalk.steps[2].y0+','+(calvinWalk.steps[2].x1 + 4)+','+calvinWalk.steps[2].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}
	console.writeln('G#G>3,3,'+(calvinWalk.steps[1].x0 + 42)+','+calvinWalk.steps[1].y0+','+(calvinWalk.steps[1].x1 + 3)+','+calvinWalk.steps[1].y1+',0,'+calvin.positions[2].y+':');
	if (!FAST) {
		igs.vsyncWait(0.08333333333);
	}


	if (!FAST) {
		igs.vsyncWait(1);
	}


	// Invoke first dino jump, onto the screen
	dino_jump(1);

	// Dino dialog
	dialog(
		96, // x
		64,  // y
		12,  // w
		"I'll get you, Calvin ...", //str
		9, // font size
		9 // num syllables
	);


	if (!FAST) {
		igs.vsyncWait(1);
	}

	// Invoke first dino jump, onto the screen
	dino_jump(2);


	// Dino dialog
	dialog(
		36, // x
		64,  // y
		12,  // w
		"... if I ever get this box off my head!", //str
		9, // font size
		16 // num syllables
	);

	igs.wait(1);


	// Bring down the curtain
	console.writeln('G#C>2,1:');
	console.writeln('G#&>0,200,4,0,>AB@,40,0)2,8,0:1)0,+0,319,+3,0:0)2,6,0:1)0,+4,319,+7,0:0)2,4,0:1)0,+8,319,+12,0:0)2,2,0:1)0,+13,319,+16,0:');


	// writeTextGrfx: function(x, y, str, color, size, attr, deg)
	igs.writeTextGrfx(24, 80,  'Animation:', 4, 9, 0, 0);
	igs.writeTextGrfx(24, 80,  '           Kirkman', 12, 9, 0, 0);
	
	igs.writeTextGrfx(24, 104, 'Thanks:', 4, 9, 0, 0);
	igs.writeTextGrfx(24, 104, '           Bill Watterson (C&H)', 12, 9, 0, 0);
	igs.writeTextGrfx(24, 116, '           Steve Turnbull (dino snd)', 12, 9, 0, 0);
	igs.writeTextGrfx(24, 128, '           Yoli, Ludi,', 12, 9, 0, 0);
	igs.writeTextGrfx(24, 140, '           Josie and Joseph', 12, 9, 0, 0);

	igs.wait(5);

	// Clear screen and reset user's terminal to normal
	console.writeln('G#t>1:R>'+USER_IG_RES+',1:I>0:s>5:k>1:');
	// Reset sounds to defaults
	console.writeln('G#b>22');
	mswait(50);

}







function main_loop() {
	// If the user somehow had IGS disabled on login, check to see if it's activated now.
	// If not, kick them back to the BBS so they aren't inundated with weird code.
	if (bbs.mods.user_ig_ver == undefined) {
		var ig_flag = igs.checkForIG();
		if (ig_flag == false) {
			cleanup();
			exit();
		}
	}

	// Fetch the user's IG version and resolution details from bbs.mods.
	// (set by igs.checkForIG() )
	var USER_IG_VER = bbs.mods.user_ig_ver;
	var USER_IG_RES = bbs.mods.user_ig_res;

	// Check that the user's current resolution matches what they logged in with.
	// If not, then an IGS script probably crashed, leaving them stuck in low.
	// Let's fix that, if needed.
	var curr_res = igs.askRes();
	if (curr_res != USER_IG_RES) {
		console.writeln('G#R>'+USER_IG_RES+',1:');
	}


	calvinAnim(USER_IG_VER, USER_IG_RES);


	cleanup();
	exit();
}


try {
	// Launch the script
	main_loop();
} catch (error) {
	cleanup();
	console.writeln(error.name);
	console.writeln(error.message);
	console.writeln(error.fileName + ', line ' + error.lineNumber.toString());
	console.writeln(error.stack);
	exit();
}


