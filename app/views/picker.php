<main>
     <!-- Sorting (Head) -->
    <header>
        <h1>Pickery</h1>
    </header>
    <!-- /Sorting (Head) -->

    <div class="pick">
        <div id="uploadcsv">
            <form action="" method="post">
                <h4>Import values (.csv)</h4>
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
        <input type="button" name="reset_all" id="reset_all" value="Reset" />

        <select size="10" id="chosen_names"></select>
    </div>
</main>
