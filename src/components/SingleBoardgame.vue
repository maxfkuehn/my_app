<template>
<router-link :to="'/boardgames/' + String(id)" class="singleBoardgameContainer">
    <div class="right-side">
      <div class="image">
        <img :src="imageSrc" alt="Image" />
      </div>
      <div class="name">
        {{ label }}
      </div>
      <div class="stats">
        <div>Bgg Rating {{ rating }}</div>
        <div>Max Rating {{ max_rating }}</div>
        <div>Played {{ plays }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'SingleBoardgame',
  props: {
    label: {
      type: String,
      required: true,  
    },
    rating: {
      type: Number,
      required: true,  
    },
    plays: {
      type: Number,
      required: false, 
    },
    max_rating: {
      type: Number,
      required: false
    },
    realImageSrc: {
      type: String,
      required: false,  
    },
    id:{
        type: Number,
        required: true
    }

    },
    data() {
        return {
        imageSrc: ''  
        };
    },
    mounted() {
        
        if (this.realImageSrc) {
        const realImage = new Image();
        realImage.src = this.realImageSrc;

        // If real image loads successfully
        realImage.onload = () => {
            this.imageSrc = realImage.src;
        };

        // If real image fails to load, use a random image
        realImage.onerror = () => {
            this.imageSrc = `https://picsum.photos/100/80?random=${Math.floor(Math.random() * 1000)}`;
        };
        } else {
        // If no `realImageSrc` is provided, use a random image
        this.imageSrc = `https://picsum.photos/100/80?random=${Math.floor(Math.random() * 1000)}`;
        }
  }
}
</script>

<style scoped>

.router-style{
    text-decoration: none;
    display: block;
}

.singleBoardgameContainer {
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 8px;
    border-radius: 8px;
    margin: 1px auto;
    display: flex;
    justify-content:center; 
    align-items: center;
    gap: 120px;
    cursor: crosshair;
    width: 60%;
    height: 100px;
    max-width: 1000px;
    text-decoration: none;
}   

.singleBoardgameContainer:hover {
    background-color: rgb(0, 0, 0, 0.2);
}

.recipe-image {
    height: 60px;
}

.right-side {
    flex: 1;                  /* Allow the name to take up available space */
    text-align: center;       /* Center the name */
    font-weight: bold;        /* Make the name bold */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0%;
}

.stats{
    display: flex;
    flex-direction: column;   /* Stack stats vertically */
    align-items: flex-start;    /* Align the stats to the right */
    color: rgb(77, 16, 77);
    font-size: 12px;
    
}

.name{
    color: rgb(61, 60, 60);
    font-size: 22px;
    font-weight: bold;
}

.image{
    align-items: flex-start;
}
</style>