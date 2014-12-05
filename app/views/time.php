<main>
    <!-- Timer (Overlay) -->
    <div></div>
    <!-- Timer (Overlay) -->

    <!-- Timer (Head) -->
    <header>
        <h1>Clock</h1>
    </header>
    <!-- /Timer (Head) -->
    
    <!-- Timer + -->
    <div class="checkbox-plus">
        <a class="addTimer" href="#AddTimer"><i class="icon ion-plus"></i></a>
        <a class="muteSounds" href="#MuteSound"><i class="icon ion-volume-low"></i></a> <!-- <i class="icon ion-volume-high"></i> -->
        <a class="removeTimers" href="#RemoveTimers"><i class="icon ion-refresh"></i></a>
    </div>
    <!-- /Timer + -->

         <!-- Shadow Timer -->
        <div class="shadowTimer checkboxes">
            <div class="checkbox-title">
               <input placeholder="Title" type="text">
            </div>

            <div class="checkbox-input"> 
                <input maxlength="2" placeholder="HH" value="00" type="text">
                <span>:</span>
                <input maxlength="2" placeholder="MM" value="10" type="text">
                <span>:</span>
                <input maxlength="2" placeholder="SS" value="00" type="text"> 
            </div>

            <div class="checkbox-button"> 
                <a href="#Play"><i class="icon ion-play"></i></a> <!-- <i class="icon ion-pause"></i> -->
                <a href="#Fullscreen"><i class="icon ion-monitor"></i> </a>
                <a href="#Remove"><i class="icon ion-trash-b"></i></a>
                <a href="#Settings"><i class="icon ion-gear-a"></i></a>
            </div>
        </div>
        <!-- /Shadow Timer -->

</main>