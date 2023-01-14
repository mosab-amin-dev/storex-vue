<template>
  <br/>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="movie.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          required
          v-model="movie.description"
          name="description"
          rows="5"
        />
      </div>

      <div class="form-group">
        <label for="category_id">Category </label>
        <select v-model="movie.category_id" class="form-control" >
          <option value=0 selected>select category</option>
        <option v-for="(category, index) in categories" :value="category.id" :key="index">{{ category.name }}</option>
    </select>

      </div>
      <label for="image">Image</label>
      <div class="form-group">
      <input type="file" id="image" name="image" v-on:change="uploadImage">
    </div>
    
      <button @click="saveMovie" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newMovie">Add</button>
    </div>
  </div>
</template>

<script>
import MovieDataService from "../services/MovieDataService";

export default {
  name: "add-movie",
  data() {
    return {
      movie: {
        id: null,
        name: "",
        description: "",
        category_id: '0',
        image:''
      },
      submitted: false,
      categories:null
    };
  },

  methods: {
    saveMovie() {
      var data = {
        name: this.movie.name,
        description: this.movie.description,
        category_id: this.movie.category_id,
        image      : this.movie.image
      };

      

      MovieDataService.create(data)
        .then(response => {
          this.movie.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCategories(){
      MovieDataService.getCategories().then((categories) => {
                this.categories = categories.data.message;
              console.log(this.categories)
              });
    },
    
    newMovie() {
      this.submitted = false;
      this.movie = {};
    },
    uploadImage(e){
      this.movie.image=e.target.files[0]
      },
  },

  mounted() {
    this.getCategories();
  }
};

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>