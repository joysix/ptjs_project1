// Write a flip() function that flips a coin and returns heads or tails based on a random number.
// Write a function flipMany() that calls flip() 100 times. Recording the results of heads and tails.
// If there are record highs or record lows for each flip group. For example, 30 heads or 70 tails, record them as the the current highs/lows.
// Write a function flipManyGroups() that calls flipMany() 100,000. Each time the flipMany() is run, it might find a new high/low.

let tally = {
	heads: 0,
	tails: 0
};

let recordHigh = {
	heads: 0,
	tails: 0
};

const updateRecords = (results) => {

	if (results.heads > recordHigh.heads) {
		recordHigh.heads = results.heads;
		$('.win.heads').css('height', `${recordHigh.heads}%`);
		$('.lose.tails').css('height', `${100 - recordHigh.heads}%`);
		$('.high.heads').text(recordHigh.heads);
		$('.low.tails').text(100 - recordHigh.heads);
	}
	
	if (results.tails > recordHigh.tails) {
		recordHigh.tails = results.tails;
		$('.win.tails').css('height', `${recordHigh.tails}%`);
		$('.lose.heads').css('height', `${100 - recordHigh.tails}%`);
		$('.high.tails').text(recordHigh.tails);
		$('.low.heads').text(100 - recordHigh.tails);
	}
};

const flip = () => {
	const outcome = Math.floor(Math.random()*100) % 2;
	
	if (outcome === 1) {
		return 'heads';
	} else {
		return 'tails';
	}
};

const flipMany = () => {
	const results = {heads: 0, tails: 0};
	
	for (let i = 0; i < 100; i++) {
		const outcome = flip();
		if (outcome === 'heads') {
			results.heads++;
		} else {
			results.tails++;
		}				
	}

	updateRecords(results);

	return results;
};

const flipManyGroups = () => {
	const count = {heads: 0, tails: 0};
	
	for (let i = 0; i < 100000; i++) {
		const outcome = flipMany();
		count.heads += outcome.heads;
		count.tails += outcome.tails;
	}

	return count;
};

const events = () => {
	$('#once').on('click', function() {
		const outcome = flip();

		if (outcome === 'heads') {
			tally.heads++
			$('.results.heads').css('height', '100%');
			$('.results.tails').css('height', '0%'); 
			$('.results.heads').html(`<div class="tally heads">${tally.heads}</div>`);
			$('.results.tails').html('');
			$('.total.heads').text(tally.heads);
		} else {
			tally.tails++
			$('.results.heads').css('height', '0%');
			$('.results.tails').css('height', '100%');
			$('.results.heads').html('');
			$('.results.tails').html(`<div class="tally tails">${tally.tails}</div>`);
			$('.total.tails').text(tally.tails);
		}
	});

	$('#hundred').on('click', function() {
		const outcome = flipMany();
		
		$('.results.heads').css('height', `${outcome.heads}%`);
		$('.results.tails').css('height', `${outcome.tails}%`);
		$('.results.heads').html(`<div class="tally heads">${outcome.heads}</div>`);
		$('.results.tails').html(`<div class="tally tails">${outcome.tails}</div>`);
				
		$('.high.heads').text(recordHigh.heads);
		$('.high.tails').text(recordHigh.tails);
		$('.low.heads').text(100 - recordHigh.tails);
		$('.low.tails').text(100 - recordHigh.heads);
	});

	$('#million').on('click', function() {
		const outcome = flipManyGroups();
		
		$('.results.heads').css('height', '50%');
		$('.results.tails').css('height', '50%');
		$('.results.heads').html(`<div class="count heads">${outcome.heads.toLocaleString()}</div>`);
		$('.results.tails').html(`<div class="count tails">${outcome.tails.toLocaleString()}</div>`);
		
	});

	$('#reset').on('click', function() {
		tally.heads = 0;
		tally.tails = 0;
		recordHigh.heads = 0;
		recordHigh.tails = 0;
		
		$('.results.heads').css('height', '50%');
		$('.results.tails').css('height', '50%'); 
		$('.results.heads').html('');
		$('.results.tails').html('');
		
		$('.total.heads').text('0');
		$('.total.tails').text('0');

		$('.high.heads').text('');
		$('.high.tails').text('');
		$('.low.tails').text('');
		$('.low.heads').text('');

		$('.win').css('height', '1%');
		$('.lose').css('height', '1%');
	});

	$('#high').on('click', function() {
		$(this).addClass('selected');
		$('#low').removeClass('selected');
		$('.win').removeClass('hidden');
		$('.lose').addClass('hidden');
	});

	$('#low').on('click', function() {
		$(this).addClass('selected');
		$('#high').removeClass('selected');
		$('.win').addClass('hidden');
		$('.lose').removeClass('hidden');
	});

	$('#records').on('click', function() {
		console.log('clicked');
		$('.records').toggleClass('hide show');
		$('.reset').toggleClass('hide show');
	});
};



$(function() {
	console.log("FLIP OUT! LE FLIP, C'EST CHIP.");
	events();
});


