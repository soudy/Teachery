<main>
     <!-- Sorting (Head) -->
    <header>
        <h1>Pickery</h1>
    </header>
    <!-- /Sorting (Head) -->

    <div class="pick">
        <div id="uploadcsv">
            <form  class="pick-form" action="" method="post">
                <label for="class"><i class="icon ion-upload"></i></label>
                <input type="file" name="class" id="class" value="" accept=".csv" style="display:none" />
            </form>
        </div>

        <!--
        <input type="checkbox" name="duplicates" id="allow_duplicates" style="" />
        <label for="allow_duplicates">Allow duplicates</label>
        -->

        <div class="clear-both"></div>
        
        <section class="section-left">
            <h3 id="students">Value</h3>
            <select size="20" id="all_names"></select>
            <input type="button" name="delete_name" id="delete_name" value="Remove" />
            <input type="button" name="clear_all" id="clear_all" value="Clear all" />
        </section>

        <section class="section-middle">
            <h2 id="random"></h2>
            <input type="button" name="post_random" id="post_random" value="RANDOM" />
        </section>

        <section class="section-right">
            <select size="20" id="chosen_names"></select>
            <input type="button" name="clear_history" id="clear_history" value="Clear history" />
        </section>
    </div>
</main>
