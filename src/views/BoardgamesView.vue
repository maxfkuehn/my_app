<template>
    <div v-if="searchQuery && search_result.length > 0 && search_performed == true ">
        <h1>Boardames</h1>
        <h2>Search Results</h2>
    <div class = "search_parameter">
        <h3>Sorted By:</h3>
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
        
        <SingleBoardgame
            v-for="(game, index) in search_result"
            :key="index"
            :label="game.name"
            :rating="game.bgg_rating"
            :id ="game.id"
            :real-image-src="game.image"
        />
        <button @click="clearSearch">Clear Search</button>

    </div>

    <div v-else-if="searchQuery.length > 0 && search_result.length == 0 && search_performed == true ">
        <h3> No Boardgames with "{{searchQuery}}" found</h3>
        <button @click="clearSearch">Clear Search</button>
    </div>
    
    <div v-else id="app">
        
        <div class="header_sort">

            <h1>Boardames</h1>

            <div class = "search_parameter">
                <h3>Sorted By:</h3>
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
                Alphabet
                </label>



            </div>

        </div>
        
        
        <div class="search-container">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for a board game..."
                class="search-input"
                @keyup.enter="boardgameSearch" 
            />
            <button @click="boardgameSearch" class="search-button">Search</button>
        </div>
        <div class="add_boardgame">
            <button @click="addBoardgame" class="add_button">Add boardgame</button>
        </div>
        <div class="boardgames">
        

            <SingleBoardgame
            v-for="(game, index) in boardgames"
                :key="index"
                :label="game.name"
                :rating="game.bgg_rating"
                :id ="game.id"
            />
        </div>
    </div>
</template>


<script>
    import SingleBoardgame from '@/components/SingleBoardgame.vue'
    
    export default {
        name: 'BoardgamesView',
        components:{SingleBoardgame

        },
        data() {
            return {
            boardgames: [], 
            searchQuery: "",
            search_result: [],
            search_performed: false,
            selectedSortOption: "bgg_rating" ,
            };
        },
      
        methods: {

            addBoardgame(){
                this.$router.push('/boardgames/add'); // function to push router to create boardgame site
            },

            // This method ensures only one sort option can be selected at a time
            updateSelected(option) {
                this.selectedSortOption = option;
                if (this.searchQuery && this.searchQuery.length > 0) {
                this.boardgameSearch();  // Call search with the new sort option
                } else {
                this.getBoardgames();  // Fetch boardgames with the updated sort option
            }
            },

            async getBoardgames() { 
                const url = `http://127.0.0.1:8002/boardgames?order=${this.selectedSortOption}`;
                let resp = await fetch(url);
                this.boardgames = await resp.json();
                console.log(this.boardgames);
            },
            async boardgameSearch(){
                const url = `http://127.0.0.1:8002/boardgames?search=${this.searchQuery}&order=${this.selectedSortOption}`;
                let resp = await fetch(url);
                this.search_result = await resp.json();
                console.log("Search Results:",this.search_result);
                this.search_performed = true;
            },
            clearSearch() {
                this.searchQuery = '';
                this.selectedSortOption = "bgg_rating" ;
                this.getBoardgames(); 
                this.search_result = [];
                this.search_performed = false;    
            }    
        },
        mounted(){
            this.getBoardgames();
        }
    }
</script>

<style>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
  border-color: #fdfdfd;
}

.search-button{
    cursor: pointer;
}

.add_boardgame{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    margin-top: 5px;
    font-size: large
    
}

.add_button{
    font-size: large;
    cursor: pointer;
}
</style>
