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
            <span>#</span>
            <input maxlength="6" type="text" id="base_color">
            <span><i class="ion ion-refresh" id="base_reset"></i></span>
            <div class="clear-both"></div>
                
            <h2>Background color</h2>
            <div class="background_color_box color_box"></div>
            <span>#</span>
            <input maxlength="6" type="text" id="background_color">
            <span><i class="ion ion-refresh" id="background_reset"></i></span>
            <div class="clear-both"></div>
                
            <h2>Text color</h2>
            <div class="text_color_box color_box"></div>
            <span>#</span>
            <input maxlength="6" type="text" id="text_color">
            <span><i class="ion ion-refresh" id="text_reset"></i></span>
            <div class="clear-both"></div>
        </div>

        <div class="setting-clock">
            <h1>Clock</h1>
            
            <h2>Default start time</h2>
        </div>
    </div>
</main>

<script src="js/settings.js" type="text/javascript" charset="utf-8"></script>
