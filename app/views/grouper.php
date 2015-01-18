<main>
     <!-- Sorting (Head) -->
    <header>
        <h1>Groupery</h1>
    </header>
    <!-- /Sorting (Head) -->

    <div class="pick">

        <div class="upkey" id="uploadcsv">
            <form  class="pick-form" action="" method="post">
                <label for="groupery_class" class="class">
                    <div class="div-class">Upload a CSV</div>
                </label>
                <input type="file" name="groupery_class" id="groupery_class" value="" accept=".csv" style="display:none" />
            </form>
        </div>
<!--
        <form class="hashkey">
            <div class="hashtag">
                <i class="icon ion-locked"></i>
            </div>

            <div class="hashtext">
                <input type="password">
            </div>

            <div class="hashbutton">
                <button><i class="icon ion-checkmark"></i></button>
            </div>
        </form>
-->
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
                    <p>Options</p>
                </div>
            </div>

            <div id="group_options">
                sdhjggksd
            </div>


            <div name="generate_groups" id="generate_groups" class="output-child output-clear">
                <p>Generate groups</p>
            </div>
        </section>
    </div>
</main>
