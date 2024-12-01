<template>
    <div class="add_header">
        Add a new boardgame.
    </div>
    <div class="user_input" >
        <div class = input_box>
            Boardgame Name:
            <input
            type="text"
            v-model="boardgameName"
            placeholder="..........."
            class="input-bar"
            />

        </div>

        <div class="input_box">
            Bgg Rating:
            <input
            type="text"
            v-model="bggRating"
            placeholder="Optional .."
            class="input-bar"
            min="1"
            max="10"
            />
            <p class="description">
                whole number between 1-10
            </p>

        </div>
        

      <div class="input_box">
            Upload image:
            <input
            type="text"
            v-model="image"
            placeholder="Optional ....."
            class="input-bar"
            />
        </div>  
    <div class ='buttons'>
        <button @click="addGame">Add</button>
        <button @click="cancel">Cancel</button>
    </div>


    </div>
</template>


<script>
export default {
    name: 'BoardgameAdd',
    data() {
        return {
            boardgameName: '',
            bggRating: '',
            image: '',
            successMessage:'',
        };
    },
    methods: {
        async cancel() {
        // Navigate to the boardgames route
        this.$router.push('/boardgames');
        },

        async addGame() {
        // Validate boardgameName
        if (this.boardgameName.trim() === '') {
            alert('Cannot add Boardgame, no input for name');
            return;
        }

        // Validate bggRating if provided
        if (this.bggRating) {
            const rating = parseFloat(this.bggRating); // Convert to a number
            if (isNaN(rating) || rating < 1 || rating > 10) {
            alert('BGG Rating must be a number between 1 and 10');
            return;
            }
        }

        // Prepare game data
        const gameData = {
            name: this.boardgameName,
            rating: this.bggRating ? parseFloat(this.bggRating) : "",
            image: this.image ? this.image : "",
        };

        // Make POST request to the server
        const requestOptions ={
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        };

        const response = await fetch(`http://127.0.0.1:8002/boardgames`,requestOptions);
        const data = await response.json();

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
            return;

        }


        this.successMessage = 'Boardgame added successfully!'; 
        console.log(data);
        alert(this.successMessage)

        
        this.$router.push('/boardgames')

        },
    },
};


</script>

<style>

.user_input{
    margin-top: 30px;
    display: flex;
    justify-content:space-around; 
    align-items: center;
    flex-direction: column;
}

.input_box{
    margin-bottom: 20px;
    font-size: 200%;
}

.input-bar{
    font-size: 100%;
}

.description{
    font-size: 40%;
}

.buttons{
    display: flex;
    margin-right: 0%;
}

</style>