<main>
     <!-- Sorting (Head) -->
    <header>
        <h1>Pickery</h1>
    </header>
    <!-- /Sorting (Head) -->

    <div class="pick">
        <div id="uploadcsv">
            <form action="" method="post">
                <h4>Import class (Max 1MB)</h4>
                <input type="file" name="class" id="class" value="" accept=".csv"/>
            </form>
        </div>

        <input type="checkbox" name="duplicates" id="allow_duplicates" />
        <label for="allow_duplicates">Allow duplicates</label>

        <h2 id="random"></h2>
        <input type="button" name="post_random" id="post_random" value="RANDOM" />
        
        <h3 id="students"></h3>
        <select size="10" id="all_names"></select>
        <input type="button" name="delete_name" id="delete_name" value="Remove" />
        <input type="button" name="clear_all" id="clear_all" value="Clear all" />
        <input type="button" name="clear_history" id="clear_history" value="Clear history" />

        <select size="10" id="chosen_names"></select>
    </div>
</main>
