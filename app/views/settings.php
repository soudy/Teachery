<main>
    <!-- Timer (Head) -->
    <header>
        <h1>Settings</h1>
    </header>
    <!-- /Timer (Head) -->

    <div class="settings">
        <div class="setting-color">
            <h1>Colorscheme</h1>

            <h2>Primary color</h2>
            <div class="base_color_box color_box"></div>
            <label for="base_color_hash"><i class="icon ion-edit"></i></label><input type="color" id="base_color_hash" style="display:none">
            <input maxlength="6" type="text" id="base_color">
            <span class="ref"><i class="ion ion-refresh" id="base_reset"></i></span>
            <div class="clear-both"></div>
                
            <h2>Background color</h2>
            <div class="background_color_box color_box"></div>
            <label for="background_color_hash"><i class="icon ion-edit"></i></label><input type="color" id="background_color_hash" style="display:none">
            <input maxlength="6" type="text" id="background_color">
            <span class="ref"><i class="ion ion-refresh" id="background_reset"></i></span>
            <div class="clear-both"></div>
                
            <h2>Text color</h2>
            <div class="text_color_box color_box"></div>
            <label for="text_color_hash"><i class="icon ion-edit"></i></label><input type="color" id="text_color_hash" style="display:none">
            <input maxlength="6" type="text" id="text_color">
            <span class="ref"><i class="ion ion-refresh" id="text_reset"></i></span>
            <div class="clear-both"></div>
        </div>

        <div class="setting-clock">
            <h1>Clock</h1>
            
            <h2>Default start time</h2>
            <input class="clock_default" value="00" maxlength="2" placeholder="HH" type="text" name="" id="">
            <span class="semi">:</span>
            <input class="clock_default" value="10" maxlength="2" placeholder="MM" type="text" name="" id="">
            <span class="semi">:</span>
            <input class="clock_default" value="00" maxlength="2" placeholder="SS" type="text" name="" id="">
            <span class="ref"><i class="ion ion-refresh" id="time_reset"></i></span>
            <div class="clear-both"></div>

            <div class="boolcont auto-mute">
                <h2 class="h2bool">Auto mute</h2>
                <span class="bool auto-mute">YES</span>
                <span class="bool auto-mute">NO</span>
            </div>

            <div class="optcont">
                <h2 class="h2opt">Sound finish</h2>
                <span class="opt finish" id="airhorn">Airhorn</span>
                <span class="opt finish" id="bomb">Bomb</span>
                <span class="opt finish" id="inception">Inception</span>
                <span class="opt finish" id="pacman">Pacman</span>
                <span class="opt finish" id="sadtrombone">Trombone</span>
                <span class="opt finish" id="victory">Victory</span>
            </div>
        </div>
    </div>
</main>
