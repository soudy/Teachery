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

        <div class="clear-both"></div>
        
        <section class="section-left">
        <h3 id="students">&nbsp;</h3>
        <select size="20" id="all_names"></select>
        </section>

        <section class="section-middle">    
        <input type="checkbox" name="duplicates" id="allow_duplicates" style="" />
        <label for="allow_duplicates">Duplicates</label>
            <div name="post_random" id="post_random" ><i class="icon ion-shuffle"></i></div>
            <div name="delete_name" id="delete_name" value="Remove" /><i class="icon ion-trash-a"></i></div>
            <div name="clear_all" id="clear_all" value="Clear all" /><i class="icon ion-close"></i></div>
            <div name="clear_history" id="clear_history" value="Clear history" /><i class="icon ion-refresh"></i></div>
        </section>

        <section class="section-right">
            <h3 id="random">&nbsp;</h2>
            <select size="20" id="chosen_names"></select>
        </section>
    </div>
</main>
