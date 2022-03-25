alert('created by MS__LV')

let can = document.querySelector('#canvas'),
	ctx = can.getContext('2d'),
	color = document.querySelector('.color'),
	range = document.querySelector('.range'),
	mouse = false,
	coords = []
can.width = window.innerWidth;
can.height = window.innerHeight;
/*
	var grad = ctx.createLinearGradient(0, 0, 1000, 500);
	grad.addColorStop('0', 'purple');
	grad.addColorStop('.25', 'skyblue');
	grad.addColorStop('.50', 'blue');
	grad.addColorStop('1', 'darkblue')
	ctx.lineWidth = range.value;
	ctx.strokeStyle = color.value;
	ctx.fillStyle = color.value;*/

can.addEventListener('mousedown', function () {
	mouse = true;
});
can.addEventListener('mouseup', function () {
	mouse = false;
	ctx.beginPath();
	coords.push('mouseup')
})

can.addEventListener('mousemove', function (e) {
	if (mouse) {
		coords.push([e.clientX, e.clientY])
		ctx.lineWidth = range.value;
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(e.clientX, e.clientY, range.value / 2, 0, Math.PI * 2)
		ctx.fill()
		ctx.beginPath()
		ctx.moveTo(e.clientX, e.clientY)

	}
})

function save() {
	localStorage.setItem('coords', JSON.stringify(coords))
}
function reply() {
	var timer = setInterval(function () {
		if (!coords.length) {
			clearInterval(timer);
			ctx.beginPath();
			return
		}
		var crd = coords.shift(),
			e = {
				clientX: crd["0"],
				clientY: crd["1"]
			};
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(e.clientX, e.clientY, range.value / 2, 0, Math.PI * 2)
		ctx.fill()

		ctx.beginPath()
		ctx.moveTo(e.clientX, e.clientY)
	}, 20)
}
document.addEventListener('keydown', function (e) {

	if (e.keyCode == 67) {
		//clear
		ctx.clearRect(0, 0, can.width, can.height);
		console.log('cleared')
	}
	if (e.keyCode == 83) {
		//Save
		save();
		console.log('Saved')
	}
	if (e.keyCode == 82) {
		//Reply
		console.log('Replying...');
		coords = JSON.parse(localStorage.getItem('coords'));
		ctx.clearRect(0, 0, can.width, can.height);
		reply();

	}
	console.log(e.keyCode)
})


can.addEventListener('touchstart', function () {
	mouse = true;
});
can.addEventListener('touchend', function () {
	mouse = false;
	ctx.beginPath();
	coords.push('touchend')
})

can.addEventListener('touchmove', function (e) {
	if (mouse) {
		coords.push([e.clientX, e.clientY])
		ctx.lineWidth = range.value;
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(e.clientX, e.clientY, range.value / 2, 0, Math.PI * 2)
		ctx.fill()
		ctx.beginPath()
		ctx.moveTo(e.clientX, e.clientY)

	}
})