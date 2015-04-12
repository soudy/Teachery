<main>
    
    <div id="csv_overlay" class="csv-overlay hidden">
        <section class="fields">
            <h4 class="csv-title" id="pickery_all_fields_info">Please select the fields to use:</h4>
            <ul id="pickery_all_fields"></ul>
            <div id="pickery_fields_submit" class="div-class">
                Go!
            </div>
        </section>
    </div>    

     <!-- Sorting (Head) -->
    <header>
        <h1>Pickery</h1>
    </header>
    <!-- /Sorting (Head) -->

    <div id="chosen_name">
        <p></p>
    </div>

    <div class="pick">

        <div class="upkey" id="uploadcsv">
            <h3>Upload CSV</h3>
            <form  class="pick-form" action="" method="post">
                <label for="pickery_class_magister" class="class">
                    <div class="div-class">Magister</div>
                </label>
                <input type="file" name="pickery_class_magister" id="pickery_class_magister" value="" accept=".csv" style="display:none" />
            </form>

            <form  class="pick-form" action="" method="post">
                <label for="pickery_class" class="class">
                    <div class="div-class">Custom</div>
                </label>
                <input type="file" name="pickery_class" id="pickery_class" value="" accept=".csv" style="display:none" />
            </form>
        </div>

        <div class="hashkey">
            <h3>Actions</h3>
            <label class="dupes-cont" id="label_duplicates" for="allow_duplicates">
                <div class="dupes">
                    Duplicate
                </div>
            </label>
            <input style="display:none" type="checkbor" name="duplicates" id="allow_duplicates" style="" />

            <label class="random-cont" for="">
                <div name="post_random" id="pickery_post_random" class="random">
                    Random
                </div>
            </label>
        </div>

        <div class="clear-both"></div>

        <!-- input -->
        <section class="section-input">
            <div class="put-result">
                <div class="input-result">
                    <p id="pickery_students">&nbsp;</p>
                </div>
            </div>

            <select size="20" id="pickery_all_names"></select>

            <div name="clear_all" id="pickery_clear_all" class="input-child input-remove-all">
                <p>Reset</p>
            </div>

            <div name="delete_name" id="pickery_delete_name" class="input-child input-remove-one">
                <p>Delete</p>
            </div>
        </section>

        <section class="section-output">
            <div class="put-result">
                <div class="output-result">
                    <p id="pickery_random">&nbsp;</p>
                </div>
            </div>

            <select size="20" id="pickery_chosen_names"></select>

            <div name="clear_history" id="pickery_clear_history" class="output-child output-clear">
                <p>Clear</p>
            </div>
        </section>

    </div>
</main>
