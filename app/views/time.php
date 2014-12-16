<main>
    <!-- Timer (Overlay) -->
    <div class="checkbox-overlay">
        <div class="checkbox-texts">
            <p class="checkbox-message"></p>
        </div>

        <div class="checkbox-bool">
            <div class="checkbox-confirm">
                YES
            </div>
            <div class="checkbox-cancel">
                NO
            </div>
        </div>
    </div>
    <!-- Timer (Overlay) -->

    <div class="settings-overlay">
        <div class="settings-group">
            <div class="settings-texts">
                <p class="settings-message">Direction</p>
            </div>

            <div class="settings-bool">
                <div data-name="direction" data-value="up">
                    UP
                </div>
                <div data-name="direction" data-value="down">
                    DOWN
                </div>
            </div>
        </div>
        <div class="settings-group">
            <div class="settings-texts">
                <p class="settings-message">Muted</p>
            </div>

            <div class="settings-bool">
                <div data-name="muted" data-value="TRUE">
                    TRUE
                </div>
                <div data-name="muted" data-value="FALSE">
                    FALSE
                </div>
            </div>
        </div>
    </div>

    <!-- Timer (Head) -->
    <header>
        <h1>Timery</h1>
    </header>
    <!-- /Timer (Head) -->
    
    <!-- Timer + -->
    <div class="checkbox-plus">
        <a class="addTimer" href="#AddTimer"><i class="icon ion-plus"></i></a>
        <a class="muteSounds muted" href="#MuteSound"><i class="icon ion-volume-mute"></i></a> <!-- <i class="icon ion-volume-high"></i> -->
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
