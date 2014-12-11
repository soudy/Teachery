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
            <span class="hash">#</span>
            <input maxlength="6" type="text" id="base_color">
            <span class="ref"><i class="ion ion-refresh" id="base_reset"></i></span>
            <div class="clear-both"></div>
                
            <h2>Background color</h2>
            <div class="background_color_box color_box"></div>
            <span class="hash">#</span>
            <input maxlength="6" type="text" id="background_color">
            <span class="ref"><i class="ion ion-refresh" id="background_reset"></i></span>
            <div class="clear-both"></div>
                
            <h2>Text color</h2>
            <div class="text_color_box color_box"></div>
            <span class="hash">#</span>
            <input maxlength="6" type="text" id="text_color">
            <span class="ref"><i class="ion ion-refresh" id="text_reset"></i></span>
            <div class="clear-both"></div>
        </div>

        <div class="setting-clock">
            <h1>Clock</h1>
            
            <h2>Default start time</h2>
            <input maxlength="2" placeholder="HH" type="text" name="" id="">
            <span class="semi">:</span>
            <input maxlength="2" placeholder="MM" type="text" name="" id="">
            <span class="semi">:</span>
            <input maxlength="2" placeholder="SS" type="text" name="" id="">
            <span class="ref"><i class="ion ion-refresh" id="text_reset"></i></span>
            <div class="clear-both"></div>

            <div class="boolcont">
                <h2 class="h2bool">Auto mute</h2>
                <span class="bool">YES</span>
                <span class="bool">NO</span>
            </div>

            <div class="optcont">
                <h2 class="h2opt">Sound per second</h2>
                <span class="opt">Sound 1</span>
                <span class="opt">Sound 2</span>
                <span class="opt">Sound 3</span>
                <span class="opt">Sound 4</span>
                <span class="opt">Sound 5</span>
                <span class="opt">Sound 6</span>
            </div>

            <div class="optcont">
                <h2 class="h2opt">Sound finish</h2>
                <span class="opt">Sound 1</span>
                <span class="opt">Sound 2</span>
                <span class="opt">Sound 3</span>
                <span class="opt">Sound 4</span>
                <span class="opt">Sound 5</span>
                <span class="opt">Sound 6</span>
            </div>
        </div>

        <div class="setting-general">
            <h1>General</h1>

            <div class="boolcont">
                <h2 class="h2bool">Enable cookies</h2>
                <span class="bool">YES</span>
                <span class="bool">NO</span>
            </div>
        </div>
    </div>
</main>
