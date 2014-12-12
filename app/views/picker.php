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

        <h3 id="classes"></h3>
        <h3 id="students"></h3>
        <select size="10" id="all_names"></select>
        <input type="button" name="delete_name" id="delete_name" value="Remove" />
    </div>
</main>
