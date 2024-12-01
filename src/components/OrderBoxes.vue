<template>
    <div class = "search_parameter">
        <h3>Sort By:</h3>
        <label>
        <input
            type="checkbox"
            value="'bgg_rating'"
            :checked="selectedSortOption === 'bgg_rating'"
            @change="updateSelected('bgg_rating')"
        />
        Bgg Rating
        </label>
        <label>
        <input
            type="checkbox"
            :value="'rating'"
            :checked="selectedSortOption === 'rating'"
            @change="updateSelected('rating')"
        />
        User Rating
        </label>
        <label>
        <input
            type="checkbox"
            value="'name'"
            :checked="selectedSortOption === 'name'"
            @change="updateSelected('name')"
        />
        Alphabetical
        </label>



    </div>

</template>

<script>
export default{
    methods: {
        
        updateSelected(option) {
            this.selectedSortOption = option;
            if (this.searchQuery && this.searchQuery.length > 0) {
            this.boardgameSearch();  
            } else {
            this.getBoardgames();  
            }
        }
    }
}

</script>

