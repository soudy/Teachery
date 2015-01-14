<main>
     <!-- Sorting (Head) -->
    <header>
        <h1>Pickery</h1>
    </header>
    <!-- /Sorting (Head) -->

    <div class="pick">

        <div class="upkey" id="uploadcsv">
            <form  class="pick-form" action="" method="post">
                <label for="class" class="class">
                    <div class="div-class">Upload a CSV</div>
                </label>
                <input type="file" name="class" id="class" value="" accept=".csv" style="display:none" />
            </form>
        </div>

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

        <div class="clear-both"></div>

        <!-- input -->
        <section class="section-input">
            <div class="put-result">
                <div class="input-result">
                    <p id="students">&nbsp;</p>
                </div>
            </div>
            <select size="20" id="all_names"></select>

            <div name="clear_all" id="clear_all" class="input-child input-remove-all">
                <p>Remove</p>
            </div>

            <div name="delete_name" id="delete_name" class="input-child input-remove-one">
                <p>Delete</p>
            </div>

            <div name="post_random" id="post_random" class="input-child input-random">
                <p>Random</p>
            </div>
        </section>

        <section class="section-output">
            <div class="put-result">
                <div class="output-result">
                    <p id="random">&nbsp;</p>
                </div>
            </div>

            <select size="20" id="chosen_names"></select>

            <div name="clear_history" id="clear_history" class="output-child output-clear">
                <p>Clear</p>
            </div>
        </section>

        <input style="display:none;" type="checkbox" name="duplicates" id="allow_duplicates" style="" />
        <label style="display:none;" for="allow_duplicates">Duplicates</label>
    </div>
</main>

<!-- 'remove all'
'remove selected'
'random'

'clear'
 -->
