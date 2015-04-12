<main>

    <div id="csv_overlay_groupery" class="csv-overlay hidden">
        <section class="fields">
            <h4 class="csv-title" id="groupery_all_fields_info">Please select the fields to use: <br><span class="tiny">(Click in the right order)</span></h4>
            <ul id="groupery_all_fields"></ul>
            <div id="groupery_fields_submit" class="div-class">
                Go!
            </div>
        </section>
    </div>    

     <!-- Sorting (Head) -->
    <header>
        <h1>Groupery</h1>
    </header>
    <!-- /Sorting (Head) -->

    <div class="pick">

        <div class="upkey" id="uploadcsv">
            <h3>Upload CSV</h3>
            <form  class="pick-form" action="" method="post">
                <label for="groupery_class_magister" class="class">
                    <div class="div-class">Magister</div>
                </label>
                <input type="file" name="groupery_class_magister" id="groupery_class_magister" value="" accept=".csv" style="display:none" />
            </form>

            <form  class="pick-form" action="" method="post">
                <label for="groupery_class" class="class">
                    <div class="div-class">Other</div>
                </label>
                <input type="file" name="groupery_class" id="groupery_class" value="" accept=".csv" style="display:none" />
            </form>
        </div>

        <div class="clear-both"></div>

        <!-- input -->
        <section class="section-input">
            <div class="put-result">
                <div class="input-result">
                    <p id="groupery_students">&nbsp;</p>
                </div>
            </div>
            <select size="20" id="groupery_all_names"></select>

            <div name="clear_all" id="groupery_clear_all" class="input-child input-remove-all">
                <p>Reset</p>
            </div>

            <div name="delete_name" id="groupery_delete_name" class="input-child input-remove-one">
                <p>Delete</p>
            </div>
        </section>

        <section class="section-output">
            <div class="put-result">
                <div class="output-result">
                    <p id="groupery_title">Options</p>
                </div>
            </div>

            <div id="groupery_options">
                <span> Create <input type="text" name="n_groups" id="n_groups" value="" /> groups </span>


                <hr>

                Groups of
                <input type="text" name="n_students" id="n_students" value="" />
                students
            </div>

            <div id="groupery_groups"></div>

            <div id="group_buttons" class="output-child output-clear">
                <p id="generate_groups">Generate groups</p>
            </div>

            <div id="format">
                <button type="button" id="set_default">
                    <p>Default</p>
                </button>

                <button type="button" id="set_json">
                    <p>JSON</p>
                </button>

                <button type="button" id="set_plain">
                    <p>TEXT</p>
                </button>
            </div>

        </section>
    </div>
</main>
