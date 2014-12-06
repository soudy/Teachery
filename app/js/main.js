window.onload = function(){
    var clocks = [];
    var clockCount = 0;

    document.querySelector('.addTimer').onclick = function(e){
        e.preventDefault();

        clocks[clockCount] = new Clock({
            appendTo: document.querySelector('main'),
            id: clockCount,
            name: 'Clock'+clockCount,
        });
        clockCount++;
    }

    document.querySelector('.removeTimers').onclick = function(e){
        e.preventDefault();
        if (!clockCount) {
            alert("You have no clocks yet.");
            return false;
        }
        if (confirm('Are you sure u want to delete all clocks?')){
            for (key in clocks){
                clocks[key].remove(true);
            }
        }
    }

    document.addEventListener('removeClock', function(e){
        clocks[e.detail] = null;
        delete clocks[e.detail];
    });
};
