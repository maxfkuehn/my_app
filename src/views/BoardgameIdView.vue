<template>
    <div class="image_name_header">
        <div class="boardgame_image">
            <img :src="imageSrc" alt=""
            width="200" height="200" />
        </div>
        <div class="boardgame_name">
            <div class="header_name">
                {{ boardgame_stats.name }}
            </div>
            <div class="header_rating">
                <div>Rating {{ boardgame_stats.bgg_rating }}</div> 
                <div>User Rating kommt noch</div>
            </div>
            
        </div>

    </div>

    <div class="buttons">
      <button @click="deleteGame">Delete Boardgame Entrie</button>
      <button @click="returnButton">Return</button>
    </div>

    <div class="display">
      <div class = "box plays">
        Plays
      </div>
      <div class = "box user_ratings"> 
        User Ratings
        <div>
          <SingleUserRating
            v-for="(name,index) in user_names"
            :key="index"
            :user_name="name"
            v-bind:user_rating="user_ratings[index]"
          >

          </SingleUserRating>
        </div>
        

      </div>
    </div>

</template>

<script>
import SingleUserRating from '@/components/SingleUserRating.vue';


export default {
  name: 'BoardgameIdView',

  components:{SingleUserRating
  },

  props: {
    id: {
      type: String,
      required: true
    },
  },
  data(){
    return{
    average_rating: "",
    user_ratings: [],  
    user_names: [],     
    boardgame_stats: [],
    imageSrc: 'https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0=' 
    }
  },
  methods:{
    async getUserRatings() {
      const url = `http://127.0.0.1:8002/ratings/boardgame/${this.id}`;
      let resp = await fetch(url)
      const user_id_stats = await resp.json()
      console.log(this.user_id_stats)

      this.user_names = user_id_stats.username;
      this.user_ratings = user_id_stats.user_ratings;
    },

    async getsingleboardgame() {
        const url = `http://127.0.0.1:8002/boardgames/${this.id}`;
        let resp = await fetch(url);
        this.boardgame_stats = await resp.json();
        console.log(this.boardgame_stats);

    },
    async returnButton(){
      this.$router.push('/boardgames');
    },
    
    async deleteGame(){
      const url = `http://127.0.0.1:8002/boardgames/${this.id}`;

       try {
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Item deleted successfully", data);
        alert('Boardgame sucesfully deleted!')

        this.$router.push('/boardgames');

      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  },
  mounted() {
    console.log(this.id);
    this.getsingleboardgame();
    this.getUserRatings()
  }
}
</script>

<style>

.image_name_header{
    border-radius: 8px;
    margin: 1px auto;
    display: flex;
    justify-content:center; 
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    }

.boardgame_name{
    color: rgb(61, 60, 60);
    font-size: 50px;
    text-align: left;
}

.header_rating{
    color:rgb(207, 185, 175);
    font-size: 15px;
    flex-direction: column;
}

.display{
  margin-top: 30 px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;


}

.box{
  flex:1;
  border: 1px solid #3d3838;
  border-radius: 5%;
  padding: 10px;
  font-size: xx-large;
  
}
</style>