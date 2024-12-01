

<template>
    
        <div class="full_rating">
        
          <div class="namePlayer">
             {{ user_name}}:
          </div>
          <div class="rating">
            <div>Rating {{ user_rating }}</div>
          </div>
        </div>
</template>

<script>
export default {
    name: 'SingleUserRating',
    props: {
      user_name: {
        type: String,
        required: true,  
      },
      user_rating: {
        type: Number,
        required: false
      },
    }
};
</script>

<style>
.full_rating{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    border-color: chocolate ;
    padding: 10px;
    margin-top: 10px
    
}

.namePlayer{
    font-size: x-large;
    color: black;

}

.rating{
    font-size: x-large;
    color: rgb(170, 76, 38);


}
</style>