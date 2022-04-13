(() => {
    let soundPieces = document.querySelectorAll(".musicPieces img"),
        dropZone = document.querySelectorAll(".dropzone"),
        audioEl = document.querySelector("audio");

    function dragStarted(event) {
        console.log('started dragging a piece');
        event.dataTransfer.setData('currentItem', event.target.id);
    }

    function allowDragOver(event) {
        event.preventDefault();
        console.log('dragged over me');
    }


    function allowDrop(event) {
		event.preventDefault();
		console.log('dropped on me');
		let droppedEl = event.dataTransfer.getData('currentItem');
		console.log(droppedEl);
		this.appendChild(document.querySelector(`#${droppedEl}`));
        playSound(droppedEl);
	}

    function playSound(id) {
        // event.preventDefault();
        const player = document.getElementById(`a_${id}`);
        console.log('runned clickSound1: ' + `audios/${id}.wav`);
        player.src = `audios/${id}.wav`;
        player.play();
    }

    
    soundPieces.forEach(piece => piece.addEventListener("dragstart", dragStarted));



    dropZone.forEach(zone => {
		zone.addEventListener("dragover", allowDragOver);
		zone.addEventListener("drop", allowDrop);
	});


    //dropZone.addEventListener("dragover", allowDragOver, "drop", allowDrop)

})();
