(() => {

    let array = [];

    let soundPieces = document.querySelectorAll(".musicPieces img"),
        dropZone = document.querySelectorAll(".dropzone"),
        resetBtn = document.querySelector(".reset img"),
        playPause = document.querySelector("#play-pause img"),
        dragBoard = document.querySelector(".musicPieces");

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
        if (this.childElementCount > 0) {
            return;
        }
        let droppedEl = event.dataTransfer.getData('currentItem');
        console.log(droppedEl);
        this.appendChild(document.querySelector(`#${droppedEl}`));
        playSound(droppedEl);

        array.push(`a_${droppedEl}`);
        console.log("array: " + array);
    }

    function allowDropBack(event) {
        event.preventDefault();
        console.log('dropped back');
        let droppedBack = event.dataTransfer.getData('currentItem');
        console.log(droppedBack);
        let player = document.getElementById(`a_${droppedBack}`);
        player.pause();

        array = array.filter(item => (item !==`a_${droppedBack}`));
        console.log("array: " + array);

        this.appendChild(document.querySelector(`#${droppedBack}`));
    }

    function playSound(id) {
        console.log('runned clickSound1: ' + `audios/${id}.wav`);
        document.getElementById(`a_${id}`).play();
    }

    function pauseMusic() {
        array.forEach(item => {
            let player = document.getElementById(item);
            player.pause();
        })
        playPause.src = `images/play.svg`
    }



    function resetAll() {

        array.forEach(item => {
            let player = document.getElementById(item);
            player.pause();
        })

        array = [];
        console.log("array: " + array);


        dropZone.forEach(zone => {
            if (zone.childElementCount > 0) {
                dragBoard.appendChild(zone.firstElementChild);
            }
        })
    }


    soundPieces.forEach(piece => piece.addEventListener("dragstart", dragStarted));

    

    resetBtn.addEventListener("click", resetAll);

    dragBoard.addEventListener("dragover", allowDragOver);

    dragBoard.addEventListener("drop", allowDropBack);

    dropZone.forEach(zone => {
        zone.addEventListener("dragover", allowDragOver);
        zone.addEventListener("drop", allowDrop);
    });

    playPause.addEventListener("click", pauseMusic);
    //dropZone.addEventListener("dragover", allowDragOver, "drop", allowDrop)

})();
